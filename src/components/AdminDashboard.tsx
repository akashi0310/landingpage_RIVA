import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Layers,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Download,
  Search,
  Filter,
  Trash2,
  Edit,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Newspaper,
  Phone,
  Mail,
  MapPin,
  Save,
  Eye,
  Image as ImageIcon,
  Quote,
  Settings as SettingsIcon,
  RefreshCw,
  LogOut,
  Sliders,
  Lock,
  Key,
  X,
  ExternalLink,
  RotateCcw,
  HelpCircle,
  PhoneCall,
  MessageCircle,
  Globe,
  Upload,
  Copy,
  Check,
  Activity,
  Send,
  Bell
} from 'lucide-react';
import { api } from '../lib/supabase';
import {
  Competition,
  Application,
  ApplicationStatus,
  SiteSettings,
  AboutArticleData,
  NewsArticle,
  ArticleBlock,
  Lead,
  ShowcaseSectionData,
  ShowcasePhoto
} from '../types';
import { defaultSiteSettings, defaultAboutArticle, defaultNewsArticles, defaultShowcaseData } from '../lib/content';
import { ArticleModal } from './ArticleModal';
import { setAdminPassword, sanitizeUrl } from '../lib/security';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onLogout?: () => void;
}

export interface AuditLogItem {
  id: string;
  action: string;
  detail?: string;
  timestamp: string;
}

/** Nén ảnh tự động bằng HTML5 Canvas client-side để giữ dung lượng nhẹ (<150KB) mà chất lượng vẫn sắc nét */
export const compressAndReadImage = (file: File, maxWidth = 1200, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Vui lòng chọn tệp hình ảnh (.jpg, .png, .webp...)'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

/** Component ô chọn ảnh: Cho phép nhập URL hoặc Tải trực tiếp từ máy tính */
export const ImageUploadField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  height?: string;
}> = ({ label, value, onChange, placeholder = 'Dán link ảnh hoặc tải từ máy...', height = '120px' }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const dataUrl = await compressAndReadImage(file);
      onChange(dataUrl);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi đọc file ảnh');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="form-group" style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label className="form-label" style={{ marginBottom: 0 }}>{label}</label>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            className="btn btn-sm btn-outline"
            style={{ padding: '3px 8px', fontSize: '11px', gap: '4px', color: 'var(--color-gold-bright)', borderColor: 'rgba(204,153,0,0.4)' }}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Tải ảnh từ máy tính / điện thoại"
          >
            <Upload size={12} />
            <span>{uploading ? 'Đang nén ảnh...' : 'Tải từ máy tính'}</span>
          </button>
          {value && (
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              style={{ padding: '3px 6px', fontSize: '11px', color: '#ef4444' }}
              onClick={() => onChange('')}
              title="Xóa ảnh"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <input
        type="text"
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <div style={{ marginTop: '8px', borderRadius: '8px', overflow: 'hidden', height, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'about' | 'settings' | 'competitions' | 'applications' | 'showcase'>('overview');

  // Data states
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [aboutArticle, setAboutArticle] = useState<AboutArticleData>(defaultAboutArticle);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(defaultNewsArticles);
  const [showcaseData, setShowcaseData] = useState<ShowcaseSectionData>(() => {
    try {
      const saved = localStorage.getItem('riva_showcase_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultShowcaseData;
  });

  // Sub-tabs & filter states
  const [appSubTab, setAppSubTab] = useState<'leads' | 'applications'>('leads');
  const [compSearchQuery, setCompSearchQuery] = useState('');
  const [compStatusFilter, setCompStatusFilter] = useState<'all' | 'open' | 'upcoming' | 'closed'>('all');

  // Admin PIN / Password management state
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

  // Status feedback toast
  const [toastMessage, setToastMessage] = useState<string>('');

  // Editing Article State
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<NewsArticle | null>(null);

  // Competition Modal & Editing State
  const [showCompModal, setShowCompModal] = useState(false);
  const [editingComp, setEditingComp] = useState<Partial<Competition> | null>(null);

  // Quick Response Template Modal for Leads
  const [selectedLeadForTemplate, setSelectedLeadForTemplate] = useState<Lead | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Applications Filter & Search
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<'all' | 'submitted' | 'under_review' | 'approved' | 'rejected'>('all');

  // Audit Logs (Nhật ký thao tác của Quản trị viên)
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('riva_admin_audit_logs');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return [
      { id: '1', action: 'Khởi tạo hệ thống quản trị', detail: 'Hệ thống sẵn sàng vận hành an toàn', timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay' },
      { id: '2', action: 'Đồng bộ danh mục cuộc thi', detail: 'SVIIF, INTARG, AI-JAM, iENA đã kích hoạt', timestamp: new Date(Date.now() - 3600000).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay' }
    ];
  });

  const addAuditLog = (action: string, detail?: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      action,
      detail,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay'
    };
    setAuditLogs(prev => {
      const updated = [newLog, ...prev.slice(0, 29)];
      try {
        localStorage.setItem('riva_admin_audit_logs', JSON.stringify(updated));
      } catch (e) { }
      return updated;
    });
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const loadAllData = async () => {
    try {
      const [comps, apps, settings, about, news, leadList] = await Promise.all([
        api.getCompetitions(),
        api.getApplications(),
        api.getSiteSettings(),
        api.getAboutArticle(),
        api.getNewsArticles(),
        api.getLeads()
      ]);
      setCompetitions(comps);
      setApplications(apps);
      setSiteSettings(settings);
      setAboutArticle(about);
      setNewsArticles(news);
      setLeads(leadList);
    } catch (err) {
      console.error('Error loading admin data:', err);
    }
  };

  // --- SAVE SITE SETTINGS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveSiteSettings(siteSettings);
    addAuditLog('Cập nhật Hotline & Thông tin liên hệ', `${siteSettings.hotline} • ${siteSettings.email}`);
    showToast('✅ Đã lưu cấu hình thông tin liên hệ và số điện thoại thành công!');
  };

  // --- CHANGE ADMIN PASSWORD ---
  const handleChangeAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeMessage('');

    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordChangeError('Xác nhận mật khẩu mới không khớp! Vui lòng nhập lại.');
      return;
    }

    const res = await setAdminPassword(newAdminPassword);
    if (res.success) {
      setPasswordChangeMessage(res.message);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
      addAuditLog('Đổi mật khẩu Quản trị viên (Admin PIN)', 'Cập nhật mã băm SHA-256 an toàn');
      showToast('🔑 Đã cập nhật mật khẩu quản trị viên mới thành công!');
    } else {
      setPasswordChangeError(res.message);
    }
  };

  // --- SAVE ABOUT ARTICLE ---
  const handleSaveAboutArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveAboutArticle(aboutArticle);
    addAuditLog('Xuất bản bài báo phóng sự "Về RIVA"', aboutArticle.headline);
    showToast('✅ Đã cập nhật bài báo phóng sự "Về RIVA" trên trang chủ!');
  };

  // --- SAVE SHOWCASE PHOTOS & TEXT ---
  const handleSaveShowcase = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('riva_showcase_data', JSON.stringify(showcaseData));
      window.dispatchEvent(new Event('riva_showcase_updated'));
      addAuditLog('Cập nhật ảnh sân khấu & triển lãm', 'Lưu 3 ảnh và thông tin mục triển lãm');
      showToast('✅ Đã cập nhật ảnh sân khấu & triển lãm trên trang chủ!');
    } catch (err) {
      showToast('❌ Lỗi khi lưu ảnh: ' + (err as Error).message);
    }
  };

  const handleResetShowcase = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục bộ ảnh sân khấu & triển lãm về mặc định ban đầu không?')) {
      setShowcaseData(defaultShowcaseData);
      localStorage.setItem('riva_showcase_data', JSON.stringify(defaultShowcaseData));
      window.dispatchEvent(new Event('riva_showcase_updated'));
      addAuditLog('Khôi phục ảnh triển lãm', 'Khôi phục về ảnh mẫu mặc định');
      showToast('🔄 Đã khôi phục ảnh triển lãm về mặc định!');
    }
  };

  // --- SAVE NEWS ARTICLE ---
  const handleSaveNewsArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    const isEdit = Boolean(editingArticle.id);
    const updated = await api.saveNewsArticle(editingArticle);
    setNewsArticles([...updated]);
    setEditingArticle(null);
    setShowArticleModal(false);
    addAuditLog(isEdit ? 'Chỉnh sửa bài viết tin tức' : 'Thêm bài viết tin tức mới', editingArticle.title);
    showToast('✅ Đã lưu bài viết và xuất bản thành công!');
  };

  // --- DELETE NEWS ARTICLE ---
  const handleDeleteNewsArticle = async (id: string) => {
    const target = newsArticles.find(n => n.id === id);
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      const updated = await api.deleteNewsArticle(id);
      setNewsArticles([...updated]);
      addAuditLog('Xóa bài viết tin tức', target?.title || id);
      showToast('🗑️ Đã xóa bài viết thành công!');
    }
  };

  // --- ADD BLOCK TO CURRENT EDITING ARTICLE ---
  const addBlockToEditingArticle = (type: ArticleBlock['type']) => {
    if (!editingArticle) return;
    const newBlock: ArticleBlock = {
      id: `block-${Date.now()}`,
      type,
      text: type === 'paragraph' ? 'Nhập nội dung đoạn văn bản tại đây...' : type === 'subheading' ? 'Nhập đề mục con...' : '',
      imageUrl: type === 'image' ? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80' : undefined,
      imageCaption: type === 'image' ? 'Chú thích hình ảnh minh họa' : undefined,
      authorQuote: type === 'quote' ? 'Hội đồng Cố vấn Viện RIVA' : undefined
    };
    setEditingArticle({
      ...editingArticle,
      blocks: [...(editingArticle.blocks || []), newBlock]
    });
  };

  // --- ADD BLOCK TO ABOUT ARTICLE ---
  const addBlockToAboutArticle = (type: ArticleBlock['type']) => {
    const newBlock: ArticleBlock = {
      id: `ab-block-${Date.now()}`,
      type,
      text: type === 'paragraph' ? 'Nhập nội dung đoạn văn bài báo...' : type === 'subheading' ? 'Nhập đề mục...' : '',
      imageUrl: type === 'image' ? 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80' : undefined,
      imageCaption: type === 'image' ? 'Chú thích hình ảnh' : undefined,
      authorQuote: type === 'quote' ? 'Lãnh đạo Viện Nghiên Cứu RIVA' : undefined
    };
    setAboutArticle({
      ...aboutArticle,
      blocks: [...aboutArticle.blocks, newBlock]
    });
  };

  const removeBlockFromAboutArticle = (id: string) => {
    setAboutArticle({
      ...aboutArticle,
      blocks: aboutArticle.blocks.filter(b => b.id !== id)
    });
  };

  // --- STATUS CHANGE FOR APPLICATION ---
  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    const target = applications.find(a => a.id === appId);
    const updated = await api.updateApplicationStatus(appId, newStatus);
    setApplications([...updated]);
    addAuditLog(`Chuyển trạng thái hồ sơ`, `${target?.full_name || 'Hồ sơ'} -> ${newStatus}`);
    showToast(`✅ Đã cập nhật trạng thái hồ sơ sang: ${newStatus}`);
  };

  // --- DELETE COMPETITION ---
  const handleDeleteComp = async (id: string) => {
    const target = competitions.find(c => c.id === id);
    if (confirm('Bạn có chắc muốn xóa cuộc thi này?')) {
      const updated = await api.deleteCompetition(id);
      setCompetitions([...updated]);
      addAuditLog('Xóa cuộc thi khỏi danh mục', target ? `${target.code} - ${target.title}` : id);
      showToast('🗑️ Đã xóa cuộc thi!');
    }
  };

  // --- OPEN ADD COMPETITION MODAL ---
  const handleOpenAddComp = () => {
    setEditingComp({
      id: '',
      code: '',
      title: '',
      country: '',
      country_code: 'US',
      flag_emoji: '🌐',
      location: '',
      category: 'STEM & Sáng chế Đổi mới',
      status: 'open',
      deadline: '2027-06-30',
      event_date: 'Tháng 8/2027',
      fee: 'Hỗ trợ trọn gói đoàn RIVA',
      organizer: '',
      description: ''
    });
    setShowCompModal(true);
  };

  // --- OPEN EDIT COMPETITION MODAL ---
  const handleOpenEditComp = (comp: Competition) => {
    setEditingComp({ ...comp });
    setShowCompModal(true);
  };

  // --- SAVE / UPDATE COMPETITION ---
  const handleSaveCompSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComp || !editingComp.code || !editingComp.title) return;

    const isEdit = Boolean(editingComp.id);
    const fullComp: Competition = {
      id: editingComp.id || `comp-${Date.now()}`,
      code: editingComp.code.toUpperCase().trim(),
      title: editingComp.title.trim(),
      country: editingComp.country?.trim() || 'Quốc tế',
      country_code: editingComp.country_code?.trim() || 'US',
      flag_emoji: editingComp.flag_emoji?.trim() || '🌐',
      location: editingComp.location?.trim() || 'Địa điểm tổ chức',
      category: editingComp.category?.trim() || 'STEM & Sáng chế',
      status: editingComp.status || 'open',
      deadline: editingComp.deadline || '2027-06-30',
      event_date: editingComp.event_date || 'Tháng 8/2027',
      fee: editingComp.fee?.trim() || 'Hỗ trợ trọn gói đoàn RIVA',
      organizer: editingComp.organizer?.trim() || '',
      description: editingComp.description?.trim() || '',
      requirements: editingComp.requirements,
      timeline: editingComp.timeline
    };

    const updated = await api.saveCompetition(fullComp);
    setCompetitions([...updated]);
    setShowCompModal(false);
    setEditingComp(null);
    addAuditLog(isEdit ? `Cập nhật cuộc thi: ${fullComp.code}` : `Thêm cuộc thi mới: ${fullComp.code}`, fullComp.title);
    showToast(isEdit ? '✅ Đã cập nhật thông tin cuộc thi thành công!' : '✅ Đã thêm cuộc thi mới thành công!');
  };

  // --- RESET TO FACTORY DEFAULTS ---
  const handleResetToFactoryDefaults = async () => {
    if (confirm('⚠️ BẠN CÓ CHẮC CHẮN MUỐN KHÔI PHỤC DỮ LIỆU GỐC?\nToàn bộ bài viết, thông tin liên hệ và cuộc thi sẽ trở về dữ liệu mẫu chuẩn ban đầu của Viện RIVA.')) {
      localStorage.removeItem('riva_competitions');
      localStorage.removeItem('riva_site_settings');
      localStorage.removeItem('riva_about_article');
      localStorage.removeItem('riva_news_articles');
      await loadAllData();
      addAuditLog('Khôi phục toàn bộ dữ liệu gốc', 'Dữ liệu chuẩn Viện RIVA');
      showToast('🔄 Đã khôi phục dữ liệu gốc mẫu thành công!');
    }
  };

  // --- EXPORT CSV (LEADS OR APPLICATIONS) ---
  const handleExportCSV = () => {
    if (appSubTab === 'leads') {
      const headers = ['Họ tên', 'Vai trò', 'Số điện thoại', 'Email', 'Trường / Lớp', 'Cuộc thi quan tâm', 'Lĩnh vực', 'Lời nhắn / Đề tài', 'Thời gian gửi'];
      const rows = leads.map(l => [
        `"${l.full_name}"`,
        `"${l.role === 'parent' ? 'Phụ huynh' : l.role === 'student' ? 'Học sinh' : 'Giáo viên'}"`,
        `"${l.phone}"`,
        `"${l.email}"`,
        `"${l.school || ''}"`,
        `"${l.interest_competition || ''}"`,
        `"${l.interest_field || ''}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
        `"${l.created_at || new Date().toISOString()}"`
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `danh_sach_tu_van_leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📥 Đã xuất file CSV danh sách tư vấn phụ huynh / học sinh!');
      return;
    }

    const headers = ['ID', 'Họ tên', 'Trường', 'Email', 'SĐT', 'Cuộc thi', 'Tên đề tài', 'Trạng thái', 'Ngày nộp'];
    const rows = applications.map(a => [
      a.id,
      `"${a.full_name}"`,
      `"${a.school}"`,
      a.email,
      a.phone,
      `"${a.competition_title || a.competition_code}"`,
      `"${a.project_title.replace(/"/g, '""')}"`,
      a.status,
      a.created_at
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh_sach_ho_so_riva_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Đã tải xuống file CSV báo cáo hồ sơ dự thi!');
  };

  const approvedCount = applications.filter(a => a.status === 'approved').length + 321;
  const pendingCount = applications.filter(a => a.status === 'under_review' || a.status === 'submitted').length + 85;
  const totalCount = applications.length + 483;

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', background: '#050d26', padding: '32px 0 60px' }}>
      <div className="container">
        {/* Toast Notification */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'linear-gradient(135deg, #09153d, #10245e)',
            border: '1px solid var(--color-gold)',
            color: 'white',
            padding: '14px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(204, 153, 0, 0.4)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 700
          }}>
            <Sparkles size={18} color="var(--color-gold-bright)" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={`${import.meta.env.BASE_URL}logo-riva.png`}
                alt="Logo RIVA"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'white' }}>
                    RIVA ADMIN: TRUNG TÂM QUẢN TRỊ
                  </h2>
                  <span className="badge badge-gold">Quản Trị Viên</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Cập nhật bài viết, tùy biến bài báo giới thiệu, cấu hình hotline/email và quản lý hồ sơ tuyển sinh.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="btn btn-outline" onClick={onBackToHome} style={{ gap: '6px' }}>
              <Eye size={15} />
              <span>Xem Website</span>
            </button>
            {onLogout && (
              <button className="btn btn-ghost" onClick={onLogout} style={{ color: '#f87171', gap: '6px' }}>
                <LogOut size={15} />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>
        </div>

        {/* 6 Tabs Navigation */}
        <div className="tabs-header" style={{ marginBottom: '28px', overflowX: 'auto', flexWrap: 'nowrap' }}>
          <button
            className={`tab-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Tổng quan & Báo cáo
          </button>

          <button
            className={`tab-item ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            <Newspaper size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Bài viết & Tin tức ({newsArticles.length})
          </button>

          <button
            className={`tab-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <FileText size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Bài báo "Về RIVA"
          </button>

          <button
            className={`tab-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Phone size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Hotline & Thông tin liên hệ
          </button>

          <button
            className={`tab-item ${activeTab === 'competitions' ? 'active' : ''}`}
            onClick={() => setActiveTab('competitions')}
          >
            <Layers size={15} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Quản lý Cuộc thi ({competitions.length})
          </button>

          <button
            className={`tab-item ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Users size={15} />
            <span>Hồ sơ & Đăng ký</span>
            {(leads.length > 0 || applications.filter(a => a.status === 'under_review' || a.status === 'submitted').length > 0) && (
              <span className="badge badge-gold" style={{ fontSize: '10px', padding: '2px 7px', fontWeight: 800 }}>
                {leads.length + applications.filter(a => a.status === 'under_review' || a.status === 'submitted').length} mới
              </span>
            )}
          </button>

          <button
            className={`tab-item ${activeTab === 'showcase' ? 'active' : ''}`}
            onClick={() => setActiveTab('showcase')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ImageIcon size={15} />
            <span>Ảnh Sân Khấu & Triển Lãm ({showcaseData.photos.length})</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: TỔNG QUAN & BÁO CÁO (OVERVIEW)
            ========================================================================= */}
        {activeTab === 'overview' && (
          <div>
            {/* 4 Stat Widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              <div className="glass-card" style={{ padding: '22px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Cuộc thi hoạt động
                </div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#60A5FA', marginTop: '6px' }}>
                  {competitions.length > 0 ? competitions.length + 8 : 12}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Đang mở đơn & Sắp mở
                </div>
              </div>

              <div className="glass-card" style={{ padding: '22px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tổng hồ sơ đăng ký
                </div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'white', marginTop: '6px' }}>
                  {totalCount}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-success)', marginTop: '4px' }}>
                  ↑ +24% so với chu kỳ trước
                </div>
              </div>

              <div className="glass-card" style={{ padding: '22px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hồ sơ đã duyệt gia nhập đoàn
                </div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#34D399', marginTop: '6px' }}>
                  {approvedCount}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Đạt chuẩn tranh tài quốc tế
                </div>
              </div>

              <div className="glass-card" style={{ padding: '22px' }}>
                <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hồ sơ chờ hội đồng thẩm định
                </div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--color-gold-bright)', marginTop: '6px' }}>
                  {pendingCount}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-gold-bright)', marginTop: '4px' }}>
                  Cần xử lý phê duyệt
                </div>
              </div>
            </div>

            {/* Monthly Trend Registration Chart */}
            <div className="glass-card" style={{ padding: '28px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={18} color="#60A5FA" />
                    Hồ sơ đăng ký theo tháng (Registration Trends 2026 - 2027)
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Dữ liệu lượng hồ sơ nộp về từ 63 tỉnh thành tham dự các giải SVIIF, IPITEX, iENA, Geneva
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-sm btn-outline" onClick={handleExportCSV}>
                    <Download size={14} />
                    <span>Xuất CSV</span>
                  </button>
                  <span className="badge badge-gold">Mùa tuyển sinh cao điểm</span>
                </div>
              </div>

              {/* SVG Trend Line Chart */}
              <div style={{ width: '100%', height: '220px', position: 'relative' }}>
                <svg viewBox="0 0 900 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="chartGradientNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3366FF" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#3366FF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="50" y1="30" x2="880" y2="30" stroke="rgba(240,242,192,0.08)" strokeDasharray="4 4" />
                  <line x1="50" y1="80" x2="880" y2="80" stroke="rgba(240,242,192,0.08)" strokeDasharray="4 4" />
                  <line x1="50" y1="130" x2="880" y2="130" stroke="rgba(240,242,192,0.08)" strokeDasharray="4 4" />
                  <line x1="50" y1="180" x2="880" y2="180" stroke="rgba(240,242,192,0.15)" />

                  {/* Area */}
                  <polygon
                    points="80,160 160,140 240,148 320,110 400,95 480,120 560,70 640,60 720,40 800,25 800,180 80,180"
                    fill="url(#chartGradientNew)"
                  />

                  {/* Line */}
                  <polyline
                    points="80,160 160,140 240,148 320,110 400,95 480,120 560,70 640,60 720,40 800,25"
                    fill="none"
                    stroke="#75C2FA"
                    strokeWidth="3.5"
                  />

                  {/* Data points */}
                  {[
                    { x: 80, y: 160, val: '24' },
                    { x: 160, y: 140, val: '38' },
                    { x: 240, y: 148, val: '35' },
                    { x: 320, y: 110, val: '52' },
                    { x: 400, y: 95, val: '64' },
                    { x: 480, y: 120, val: '48' },
                    { x: 560, y: 70, val: '82' },
                    { x: 640, y: 60, val: '96' },
                    { x: 720, y: 40, val: '124' },
                    { x: 800, y: 25, val: '148' }
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#CC9900" stroke="#09153d" strokeWidth="2" />
                      <text x={pt.x} y={pt.y - 10} fill="#CC9900" fontSize="11" fontWeight="700" textAnchor="middle">
                        {pt.val}
                      </text>
                    </g>
                  ))}

                  {/* X Axis Labels */}
                  {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'].map((month, idx) => (
                    <text key={idx} x={80 + idx * 80} y="196" fill="#94A3B8" fontSize="11" textAnchor="middle">
                      {month}
                    </text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Quick Action Guide for New Admin */}
            <div className="glass-card" style={{ padding: '24px 28px', marginBottom: '28px', border: '1px solid rgba(204, 153, 0, 0.35)', background: 'radial-gradient(ellipse at top left, rgba(51, 102, 255, 0.12) 0%, rgba(9, 21, 61, 0.8) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(204, 153, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-bright)' }}>
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'white', margin: 0 }}>
                      Hướng dẫn nhanh cho Quản trị viên mới
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
                      Chọn nhanh tác vụ quản trị thường dùng bên dưới:
                    </p>
                  </div>
                </div>
                <span className="badge badge-gold">Trợ giúp 1-Click</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div
                  onClick={() => setActiveTab('competitions')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Layers size={16} color="var(--color-gold-bright)" />
                    <span style={{ fontWeight: 700, color: 'white', fontSize: '13px' }}>1. Quản lý Cuộc thi</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Thêm giải đấu mới, chỉnh sửa hạn nộp, cập nhật trạng thái Đang mở / Sắp mở.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('about')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <FileText size={16} color="var(--color-sky)" />
                    <span style={{ fontWeight: 700, color: 'white', fontSize: '13px' }}>2. Bài báo "Về RIVA"</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Tùy biến bài báo phóng sự trên trang chủ với hình ảnh, video và phát biểu cố vấn.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('settings')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Phone size={16} color="#34d399" />
                    <span style={{ fontWeight: 700, color: 'white', fontSize: '13px' }}>3. Hotline & Liên hệ</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Thay đổi số điện thoại 24/7, email tuyển sinh, địa chỉ văn phòng Hà Nội & TP.HCM.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('applications')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Users size={16} color="#f59e0b" />
                    <span style={{ fontWeight: 700, color: 'white', fontSize: '13px' }}>4. Duyệt Hồ sơ & Leads</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Xem phụ huynh gửi đăng ký từ trang web, gọi điện Zalo tư vấn và xuất file Excel.
                  </p>
                </div>
              </div>
            </div>

            {/* System Audit Activity Log */}
            <div className="glass-card" style={{ padding: '24px 28px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(51, 102, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-sky)' }}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'white', margin: 0 }}>
                      Nhật ký hoạt động hệ thống (System Audit Log)
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
                      Lịch sử các thao tác cập nhật bài viết, hotline, phê duyệt và chỉnh sửa cuộc thi gần nhất:
                    </p>
                  </div>
                </div>
                <span className="badge badge-blue">Ghi nhận thời gian thực</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {auditLogs.slice(0, 6).map((log) => (
                  <div
                    key={log.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold-bright)', display: 'inline-block' }} />
                      <div>
                        <span style={{ fontWeight: 700, color: 'white' }}>{log.action}</span>
                        {log.detail && (
                          <span style={{ color: 'var(--color-text-dim)', marginLeft: '8px', fontSize: '12px' }}>
                            — {log.detail}
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: QUẢN LÝ BÀI VIẾT & TIN TỨC (NEWS ARTICLES MANAGER)
            ========================================================================= */}
        {activeTab === 'articles' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
                  Danh sách bài viết & tin tức báo chí
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                  Cho phép chèn hình ảnh, văn bản, trích dẫn báo chí và hiển thị trực tiếp trên trang chủ.
                </p>
              </div>

              <button
                className="btn btn-gold"
                onClick={() => {
                  setEditingArticle({
                    id: `news-${Date.now()}`,
                    title: '',
                    category: 'KẾT QUẢ THI ĐẤU',
                    date: new Date().toLocaleDateString('vi-VN'),
                    author: 'Ban Tin Tức RIVA',
                    cover_image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80',
                    desc: '',
                    published: true,
                    blocks: [
                      {
                        id: `b-1`,
                        type: 'paragraph',
                        text: 'Nội dung chi tiết của bài viết...'
                      }
                    ]
                  });
                  setShowArticleModal(true);
                }}
              >
                <Plus size={16} />
                <span>Viết bài báo mới</span>
              </button>
            </div>

            {/* Articles List Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {newsArticles.map((art) => (
                <div key={art.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '160px', position: 'relative' }}>
                    <img
                      src={art.cover_image}
                      alt={art.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="badge badge-gold" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px' }}>
                      {art.category}
                    </span>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', marginBottom: '6px' }}>
                        {art.date} • {art.author || 'RIVA Media'}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'white', lineHeight: 1.4, marginBottom: '8px' }}>
                        {art.title}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                        {art.desc.slice(0, 110)}...
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <button
                        className="btn btn-sm btn-ghost"
                        style={{ padding: 0, color: 'var(--color-sky)', gap: '4px' }}
                        onClick={() => setPreviewArticle(art)}
                      >
                        <Eye size={13} />
                        <span>Xem trước</span>
                      </button>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => {
                            setEditingArticle({ ...art });
                            setShowArticleModal(true);
                          }}
                          title="Chỉnh sửa bài viết"
                        >
                          <Edit size={13} />
                          <span>Sửa</span>
                        </button>
                        <button
                          className="btn btn-sm btn-ghost"
                          style={{ color: '#ef4444' }}
                          onClick={() => handleDeleteNewsArticle(art.id)}
                          title="Xóa bài viết"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: THIẾT KẾ BÀI BÁO "VỀ RIVA" (NEWSPAPER EDITOR)
            ========================================================================= */}
        {activeTab === 'about' && (
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
              <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
                <Newspaper size={13} />
                THIẾT KẾ BÀI BÁO PHÓNG SỰ GIỚI THIỆU
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'white' }}>
                Tùy biến mục "Về RIVA" trên Trang Chủ theo phong cách Bài Báo
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                Bạn có thể tự do thay đổi tiêu đề phóng sự, lời dẫn (sa-pô), chèn hình ảnh, thêm các đoạn văn bản và trích dẫn lời phát biểu của ban lãnh đạo.
              </p>
            </div>

            <form onSubmit={handleSaveAboutArticle}>
              <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Tên Chuyên Đề / Nguồn Báo Chí</label>
                  <input
                    type="text"
                    className="form-input"
                    value={aboutArticle.press_source}
                    onChange={(e) => setAboutArticle({ ...aboutArticle, press_source: e.target.value })}
                    placeholder="Phóng sự Chuyên đề • Tạp chí Đổi Mới Sáng Tạo & Khoa Học Trẻ"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tác Giả / Ban Biên Tập</label>
                  <input
                    type="text"
                    className="form-input"
                    value={aboutArticle.author}
                    onChange={(e) => setAboutArticle({ ...aboutArticle, author: e.target.value })}
                    placeholder="Ban Biên Tập RIVA Media & Hội Đồng Cố Vấn"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Tiêu Đề Lớn Bài Báo (Headline) *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={aboutArticle.headline}
                  onChange={(e) => setAboutArticle({ ...aboutArticle, headline: e.target.value })}
                  placeholder="KHÔNG CHỈ LÀ TỔ CHỨC THI, MÀ LÀ CẦU NỐI QUỐC TẾ"
                  style={{ fontSize: '16px', fontWeight: 700 }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Lời Dẫn Nhập (Sa-pô Báo Chí) *</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={aboutArticle.lead_paragraph}
                  onChange={(e) => setAboutArticle({ ...aboutArticle, lead_paragraph: e.target.value })}
                  placeholder="Đoạn văn mở đầu tóm tắt ấn tượng về Viện RIVA..."
                />
              </div>

              <div className="grid-2" style={{ gap: '20px', marginBottom: '24px' }}>
                <ImageUploadField
                  label="Hình Ảnh Phóng Sự Chính (Hero Image)"
                  value={aboutArticle.hero_image}
                  onChange={(val) => setAboutArticle({ ...aboutArticle, hero_image: val })}
                  placeholder="Dán link ảnh hoặc bấm 'Tải từ máy tính'..."
                  height="140px"
                />

                <div className="form-group">
                  <label className="form-label">Chú Thích Ảnh Báo Chí (Caption)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={aboutArticle.hero_caption}
                    onChange={(e) => setAboutArticle({ ...aboutArticle, hero_caption: e.target.value })}
                    placeholder="Đoàn thí sinh Việt Nam tự hào giương cao cờ Tổ quốc..."
                  />
                  <div style={{ marginTop: '16px' }}>
                    <label className="form-label">Tiêu Đề Video Tư Liệu</label>
                    <input
                      type="text"
                      className="form-input"
                      value={aboutArticle.video_title}
                      onChange={(e) => setAboutArticle({ ...aboutArticle, video_title: e.target.value })}
                      placeholder="Phim tư liệu: Hành trình đoàn Việt Nam..."
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Article Blocks */}
              <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'white' }}>
                    Các khối nội dung chi tiết của bài báo ({aboutArticle.blocks.length} khối)
                  </h4>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToAboutArticle('paragraph')}>
                      + Đoạn văn
                    </button>
                    <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToAboutArticle('subheading')}>
                      + Tiêu đề mục
                    </button>
                    <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToAboutArticle('image')}>
                      + Chèn ảnh & chú thích
                    </button>
                    <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToAboutArticle('quote')}>
                      + Trích dẫn phát biểu
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {aboutArticle.blocks.map((block, idx) => (
                    <div key={block.id} style={{ padding: '16px', background: 'rgba(5, 13, 38, 0.7)', borderRadius: '10px', border: '1px solid rgba(117, 194, 250, 0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span className="badge badge-blue" style={{ textTransform: 'uppercase', fontSize: '11px' }}>
                          Khối {idx + 1}: {block.type === 'paragraph' ? 'Đoạn văn' : block.type === 'subheading' ? 'Đề mục con' : block.type === 'image' ? 'Hình ảnh' : 'Trích dẫn'}
                        </span>
                        <button type="button" className="btn btn-sm btn-ghost" style={{ color: '#ef4444', padding: '4px' }} onClick={() => removeBlockFromAboutArticle(block.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {block.type === 'subheading' && (
                        <input
                          type="text"
                          className="form-input"
                          value={block.text || ''}
                          onChange={(e) => {
                            const newBlocks = [...aboutArticle.blocks];
                            newBlocks[idx].text = e.target.value;
                            setAboutArticle({ ...aboutArticle, blocks: newBlocks });
                          }}
                          placeholder="Tiêu đề mục..."
                        />
                      )}

                      {block.type === 'paragraph' && (
                        <textarea
                          rows={3}
                          className="form-textarea"
                          value={block.text || ''}
                          onChange={(e) => {
                            const newBlocks = [...aboutArticle.blocks];
                            newBlocks[idx].text = e.target.value;
                            setAboutArticle({ ...aboutArticle, blocks: newBlocks });
                          }}
                          placeholder="Nội dung văn bản..."
                        />
                      )}

                      {block.type === 'quote' && (
                        <div className="grid-2" style={{ gap: '12px' }}>
                          <textarea
                            rows={2}
                            className="form-textarea"
                            value={block.text || ''}
                            onChange={(e) => {
                              const newBlocks = [...aboutArticle.blocks];
                              newBlocks[idx].text = e.target.value;
                              setAboutArticle({ ...aboutArticle, blocks: newBlocks });
                            }}
                            placeholder="Lời phát biểu hoặc trích dẫn..."
                          />
                          <input
                            type="text"
                            className="form-input"
                            value={block.authorQuote || ''}
                            onChange={(e) => {
                              const newBlocks = [...aboutArticle.blocks];
                              newBlocks[idx].authorQuote = e.target.value;
                              setAboutArticle({ ...aboutArticle, blocks: newBlocks });
                            }}
                            placeholder="Tên giáo sư / cố vấn..."
                          />
                        </div>
                      )}

                      {block.type === 'image' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <ImageUploadField
                            label="Ảnh minh họa khối nội dung"
                            value={block.imageUrl || ''}
                            onChange={(val) => {
                              const newBlocks = [...aboutArticle.blocks];
                              newBlocks[idx].imageUrl = val;
                              setAboutArticle({ ...aboutArticle, blocks: newBlocks });
                            }}
                            placeholder="Dán link ảnh hoặc bấm 'Tải từ máy tính'..."
                            height="120px"
                          />
                          <input
                            type="text"
                            className="form-input"
                            value={block.imageCaption || ''}
                            onChange={(e) => {
                              const newBlocks = [...aboutArticle.blocks];
                              newBlocks[idx].imageCaption = e.target.value;
                              setAboutArticle({ ...aboutArticle, blocks: newBlocks });
                            }}
                            placeholder="Chú thích ảnh minh họa..."
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="submit" className="btn btn-gold" style={{ padding: '12px 28px', gap: '8px' }}>
                  <Save size={16} />
                  <span>Lưu & Cập nhật bài báo lên Trang Chủ</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            TAB 4: CẤU HÌNH WEBSITE & THÔNG TIN LIÊN HỆ (SITE SETTINGS)
            ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="glass-card" style={{ padding: '32px', maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
              <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
                <SettingsIcon size={13} />
                CÀI ĐẶT HỆ THỐNG
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'white' }}>
                Thay đổi Số Điện Thoại, Email & Thông Tin Liên Hệ
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                Khi bạn thay đổi các thông tin bên dưới, toàn bộ Hotline ở Header, Footer, Thanh liên hệ nhanh trên điện thoại và Form đăng ký tư vấn sẽ tự động cập nhật ngay lập tức.
              </p>
            </div>

            <form onSubmit={handleSaveSettings}>
              <div className="grid-2" style={{ gap: '18px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} color="var(--color-gold-bright)" />
                    <span>Số điện thoại Hotline chính (24/7) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={siteSettings.hotline}
                    onChange={(e) => setSiteSettings({ ...siteSettings, hotline: e.target.value })}
                    placeholder="0988.234.567"
                  />
                  <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '4px' }}>
                    Hiển thị nổi bật tại nút gọi hotline và cổng tư vấn.
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} color="var(--color-sky)" />
                    <span>Số điện thoại phụ / Bàn</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={siteSettings.hotline_secondary || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, hotline_secondary: e.target.value })}
                    placeholder="024.3856.9999"
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '18px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} color="var(--color-gold-bright)" />
                    <span>Email Liên Hệ Chính *</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={siteSettings.email}
                    onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                    placeholder="contact@riva.info.vn"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} color="var(--color-sky)" />
                    <span>Email Ban Tuyển Sinh</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={siteSettings.email_admissions || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, email_admissions: e.target.value })}
                    placeholder="admissions@riva.info.vn"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--color-gold-bright)" />
                  <span>Địa Chỉ Trụ Sở Chính (Hà Nội) *</span>
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={siteSettings.address_hn}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address_hn: e.target.value })}
                  placeholder="Tòa nhà RIVA Innovation, Cầu Giấy, Hà Nội"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--color-sky)" />
                  <span>Địa Chỉ Văn Phòng Đại Diện (TP. Hồ Chí Minh)</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={siteSettings.address_hcm}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address_hcm: e.target.value })}
                  placeholder="Văn phòng đại diện: Quận 1, TP. Hồ Chí Minh"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Tên Cơ Quan / Viện Nghiên Cứu</label>
                <input
                  type="text"
                  className="form-input"
                  value={siteSettings.org_name}
                  onChange={(e) => setSiteSettings({ ...siteSettings, org_name: e.target.value })}
                  placeholder="VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label">Slogan Truyền Thông</label>
                <input
                  type="text"
                  className="form-input"
                  value={siteSettings.slogan}
                  onChange={(e) => setSiteSettings({ ...siteSettings, slogan: e.target.value })}
                  placeholder="Kết nối tài năng Việt Nam với đấu trường khoa học & sáng tạo quốc tế"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="submit" className="btn btn-gold" style={{ padding: '12px 28px', gap: '8px' }}>
                  <Save size={16} />
                  <span>Lưu thay đổi thông tin liên hệ</span>
                </button>
              </div>
            </form>

            {/* Divider & Admin PIN Change Section */}
            <div style={{
              margin: '36px 0 24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '24px'
            }}>
              <div className="badge badge-gold" style={{ marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={13} />
                BẢO MẬT HỆ THỐNG
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'white', marginTop: '4px' }}>
                Đổi Mật Khẩu Quản Trị Viên (Admin PIN)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                Thiết lập mật khẩu riêng để bảo vệ trang quản trị RIVA. Mật khẩu được mã hóa an toàn bằng thuật toán SHA-256 trên thiết bị của bạn.
              </p>
            </div>

            {passwordChangeMessage && (
              <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '10px', color: '#6ee7b7', fontSize: '13px', marginBottom: '18px' }}>
                {passwordChangeMessage}
              </div>
            )}

            {passwordChangeError && (
              <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '10px', color: '#fca5a5', fontSize: '13px', marginBottom: '18px' }}>
                {passwordChangeError}
              </div>
            )}

            <form onSubmit={handleChangeAdminPassword}>
              <div className="grid-2" style={{ gap: '18px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Key size={14} color="var(--color-gold-bright)" />
                    <span>Mật khẩu mới (tối thiểu 6 ký tự) *</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="form-input"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Key size={14} color="var(--color-sky)" />
                    <span>Xác nhận lại mật khẩu mới *</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="form-input"
                    value={confirmAdminPassword}
                    onChange={(e) => setConfirmAdminPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="submit" className="btn btn-gold" style={{ padding: '10px 24px', gap: '8px' }}>
                  <Lock size={15} />
                  <span>Cập nhật mật khẩu mới</span>
                </button>
              </div>
            </form>

            {/* Factory Reset Section */}
            <div style={{
              margin: '36px 0 10px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '24px'
            }}>
              <div className="badge badge-closed" style={{ marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={13} />
                VÙNG KHÔI PHỤC DỮ LIỆU
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'white', marginTop: '4px' }}>
                Khôi Phục Dữ Liệu Gốc Mẫu Viện RIVA
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                Dành cho Quản trị viên mới: Trong quá trình trải nghiệm hoặc thử nghiệm, nếu bạn muốn đưa toàn bộ bài viết tin tức, thông tin liên hệ và danh mục cuộc thi về mẫu chuẩn gốc ban đầu của Viện RIVA, hãy nhấn nút khôi phục bên dưới.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                style={{ borderColor: 'rgba(239, 68, 68, 0.5)', color: '#f87171', gap: '8px' }}
                onClick={handleResetToFactoryDefaults}
              >
                <RotateCcw size={15} />
                <span>Khôi phục dữ liệu chuẩn gốc ban đầu</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: QUẢN LÝ CUỘC THI (COMPETITIONS)
            ========================================================================= */}
        {activeTab === 'competitions' && (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
                  Danh mục cuộc thi quốc tế ({competitions.length})
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Chỉnh sửa tên cuộc thi, hạn nộp hồ sơ, quốc gia hoặc cập nhật trạng thái mở đơn trực tiếp lên trang chủ
                </div>
              </div>

              <button className="btn btn-gold" onClick={handleOpenAddComp} style={{ gap: '6px' }}>
                <Plus size={16} />
                <span>Thêm cuộc thi mới</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div style={{ padding: '14px 20px', background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', minWidth: '240px', flex: 1, maxWidth: '380px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Tìm theo tên cuộc thi, mã, quốc gia..."
                  value={compSearchQuery}
                  onChange={(e) => setCompSearchQuery(e.target.value)}
                  style={{ paddingLeft: '36px', height: '36px', fontSize: '12px' }}
                />
                <Search size={14} color="var(--color-text-dim)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              </div>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  className={`btn btn-sm ${compStatusFilter === 'all' ? 'btn-gold' : 'btn-ghost'}`}
                  style={{ fontSize: '12px', padding: '5px 12px' }}
                  onClick={() => setCompStatusFilter('all')}
                >
                  Tất cả ({competitions.length})
                </button>
                <button
                  className={`btn btn-sm ${compStatusFilter === 'open' ? 'btn-gold' : 'btn-ghost'}`}
                  style={{ fontSize: '12px', padding: '5px 12px' }}
                  onClick={() => setCompStatusFilter('open')}
                >
                  🟢 Đang mở ({competitions.filter(c => c.status === 'open').length})
                </button>
                <button
                  className={`btn btn-sm ${compStatusFilter === 'upcoming' ? 'btn-gold' : 'btn-ghost'}`}
                  style={{ fontSize: '12px', padding: '5px 12px' }}
                  onClick={() => setCompStatusFilter('upcoming')}
                >
                  🟡 Sắp mở ({competitions.filter(c => c.status === 'upcoming').length})
                </button>
                <button
                  className={`btn btn-sm ${compStatusFilter === 'closed' ? 'btn-gold' : 'btn-ghost'}`}
                  style={{ fontSize: '12px', padding: '5px 12px' }}
                  onClick={() => setCompStatusFilter('closed')}
                >
                  🔴 Đã đóng ({competitions.filter(c => c.status === 'closed').length})
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.04)', color: 'var(--color-text-dim)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '14px 20px' }}>Tên cuộc thi</th>
                    <th style={{ padding: '14px 20px' }}>Quốc gia & Địa điểm</th>
                    <th style={{ padding: '14px 20px' }}>Hạn đăng ký</th>
                    <th style={{ padding: '14px 20px' }}>Lĩnh vực</th>
                    <th style={{ padding: '14px 20px' }}>Trạng thái</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {competitions
                    .filter(c => {
                      const q = compSearchQuery.toLowerCase().trim();
                      const matchSearch = q === '' ||
                        c.title.toLowerCase().includes(q) ||
                        c.code.toLowerCase().includes(q) ||
                        c.country.toLowerCase().includes(q) ||
                        c.category.toLowerCase().includes(q);
                      const matchStatus = compStatusFilter === 'all' || c.status === compStatusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'white' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>{c.flag_emoji}</span>
                            <div>
                              <div>{c.code} — {c.title}</div>
                              {c.organizer && <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', fontWeight: 400 }}>BTC: {c.organizer}</div>}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-light)' }}>
                          <div>{c.country}</div>
                          {c.location && <div style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>{c.location}</div>}
                        </td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-gold-bright)', fontWeight: 600 }}>
                          <div>{c.deadline}</div>
                          {c.event_date && <div style={{ fontSize: '11px', color: 'var(--color-sky)' }}>Diễn ra: {c.event_date}</div>}
                        </td>
                        <td style={{ padding: '16px 20px', color: 'var(--color-text-muted)' }}>
                          {c.category}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          {c.status === 'open' && <span className="badge badge-open">🟢 Đang mở</span>}
                          {c.status === 'upcoming' && <span className="badge badge-upcoming">🟡 Sắp mở</span>}
                          {c.status === 'closed' && <span className="badge badge-closed">🔴 Đã đóng</span>}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                              className="btn btn-sm btn-outline"
                              style={{ padding: '6px 12px', fontSize: '12px', gap: '4px', color: 'var(--color-gold-bright)', borderColor: 'rgba(204, 153, 0, 0.4)' }}
                              title="Chỉnh sửa thông tin cuộc thi"
                              onClick={() => handleOpenEditComp(c)}
                            >
                              <Edit size={13} />
                              <span>Chỉnh sửa</span>
                            </button>
                            <button
                              className="btn btn-sm btn-ghost"
                              style={{ color: '#ef4444', padding: '6px 8px' }}
                              title="Xóa cuộc thi"
                              onClick={() => handleDeleteComp(c.id)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: DUYỆT HỒ SƠ ĐĂNG KÝ & LEADS TƯ VẤN (APPLICATIONS & LEADS)
            ========================================================================= */}
        {activeTab === 'applications' && (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
                  {appSubTab === 'leads' ? `Hồ sơ Phụ huynh & Thí sinh Đăng ký Tư vấn (${leads.length})` : `Hồ sơ Đăng ký Đề tài Dự thi Chính thức (${applications.length})`}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {appSubTab === 'leads' ? 'Dữ liệu trực tiếp từ biểu mẫu Landing Page, đồng bộ theo thời gian thực' : 'Thẩm định hồ sơ chính thức và phê duyệt danh sách đoàn'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.06)', padding: '3px', borderRadius: '8px' }}>
                  <button
                    className={`btn btn-sm ${appSubTab === 'leads' ? 'btn-gold' : 'btn-ghost'}`}
                    style={{ fontSize: '12px', padding: '5px 12px' }}
                    onClick={() => setAppSubTab('leads')}
                  >
                    <span>📋 Đăng ký tư vấn ({leads.length})</span>
                  </button>
                  <button
                    className={`btn btn-sm ${appSubTab === 'applications' ? 'btn-gold' : 'btn-ghost'}`}
                    style={{ fontSize: '12px', padding: '5px 12px' }}
                    onClick={() => setAppSubTab('applications')}
                  >
                    <span>🎓 Hồ sơ dự thi ({applications.length})</span>
                  </button>
                </div>

                <button className="btn btn-sm btn-outline" onClick={handleExportCSV} style={{ gap: '6px' }}>
                  <Download size={14} />
                  <span>Xuất CSV ({appSubTab === 'leads' ? 'Tư vấn' : 'Dự thi'})</span>
                </button>
              </div>
            </div>

            {/* Sub-tab 1: Leads Queue */}
            {appSubTab === 'leads' && (
              <div style={{ overflowX: 'auto' }}>
                {leads.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Chưa có hồ sơ đăng ký tư vấn mới. Khi phụ huynh/học sinh gửi form trên trang chủ, thông tin sẽ xuất hiện ngay tại đây!
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255, 255, 255, 0.04)', color: 'var(--color-text-dim)', borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '14px 20px' }}>Họ tên & Vai trò</th>
                        <th style={{ padding: '14px 20px' }}>Số điện thoại & Email</th>
                        <th style={{ padding: '14px 20px' }}>Trường học / Lớp</th>
                        <th style={{ padding: '14px 20px' }}>Cuộc thi & Lĩnh vực</th>
                        <th style={{ padding: '14px 20px' }}>Nguyện vọng / Ghi chú</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Thao tác nhanh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead, idx) => (
                        <tr key={lead.id || idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ fontWeight: 700, color: 'white' }}>{lead.full_name}</div>
                            <span className="badge badge-gold" style={{ fontSize: '10px', marginTop: '4px' }}>
                              {lead.role === 'parent' ? 'Phụ huynh' : lead.role === 'student' ? 'Học sinh' : 'Giáo viên'}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ color: 'var(--color-gold-bright)', fontWeight: 600 }}>{lead.phone}</div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{lead.email}</div>
                          </td>
                          <td style={{ padding: '16px 20px', color: 'var(--color-text-light)' }}>
                            {lead.school || 'Chưa cung cấp'}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ color: '#60A5FA', fontWeight: 600 }}>{lead.interest_competition || 'Tư vấn chung'}</div>
                            {lead.interest_field && <div style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>{lead.interest_field}</div>}
                          </td>
                          <td style={{ padding: '16px 20px', maxWidth: '240px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-light)', lineHeight: 1.5, maxHeight: '60px', overflowY: 'auto' }}>
                              {lead.message || '—'}
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                              <a
                                href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                                className="btn btn-sm btn-gold"
                                style={{ padding: '5px 10px', fontSize: '11px', gap: '4px' }}
                                title="Gọi điện tư vấn"
                              >
                                <PhoneCall size={12} />
                                <span>Gọi ngay</span>
                              </a>
                              <a
                                href={`https://zalo.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline"
                                style={{ padding: '5px 10px', fontSize: '11px', gap: '4px', borderColor: 'rgba(51, 102, 255, 0.4)', color: 'var(--color-sky)' }}
                                title="Mở Zalo tư vấn"
                              >
                                <MessageCircle size={12} />
                                <span>Zalo</span>
                              </a>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline"
                                style={{ padding: '5px 10px', fontSize: '11px', gap: '4px', borderColor: 'rgba(204, 153, 0, 0.4)', color: 'var(--color-gold-bright)' }}
                                onClick={() => setSelectedLeadForTemplate(lead)}
                                title="Mở kịch bản tin nhắn tư vấn phụ huynh / học sinh"
                              >
                                <Send size={11} />
                                <span>Mẫu tư vấn</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Sub-tab 2: Formal Applications Queue */}
            {appSubTab === 'applications' && (
              <div>
                {/* Search & Filter Bar for Applications */}
                <div style={{ padding: '14px 20px', background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ position: 'relative', minWidth: '240px', flex: 1, maxWidth: '380px' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Tìm theo tên thí sinh, trường, đề tài, cuộc thi..."
                      value={appSearchQuery}
                      onChange={(e) => setAppSearchQuery(e.target.value)}
                      style={{ paddingLeft: '36px', height: '36px', fontSize: '12px' }}
                    />
                    <Search size={14} color="var(--color-text-dim)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      className={`btn btn-sm ${appStatusFilter === 'all' ? 'btn-gold' : 'btn-ghost'}`}
                      style={{ fontSize: '12px', padding: '5px 12px' }}
                      onClick={() => setAppStatusFilter('all')}
                    >
                      Tất cả ({applications.length})
                    </button>
                    <button
                      className={`btn btn-sm ${appStatusFilter === 'submitted' ? 'btn-gold' : 'btn-ghost'}`}
                      style={{ fontSize: '12px', padding: '5px 12px' }}
                      onClick={() => setAppStatusFilter('submitted')}
                    >
                      🔵 Mới nộp ({applications.filter(a => a.status === 'submitted').length})
                    </button>
                    <button
                      className={`btn btn-sm ${appStatusFilter === 'under_review' ? 'btn-gold' : 'btn-ghost'}`}
                      style={{ fontSize: '12px', padding: '5px 12px' }}
                      onClick={() => setAppStatusFilter('under_review')}
                    >
                      🟡 Chờ duyệt ({applications.filter(a => a.status === 'under_review').length})
                    </button>
                    <button
                      className={`btn btn-sm ${appStatusFilter === 'approved' ? 'btn-gold' : 'btn-ghost'}`}
                      style={{ fontSize: '12px', padding: '5px 12px' }}
                      onClick={() => setAppStatusFilter('approved')}
                    >
                      🟢 Đã duyệt ({applications.filter(a => a.status === 'approved').length})
                    </button>
                    <button
                      className={`btn btn-sm ${appStatusFilter === 'rejected' ? 'btn-gold' : 'btn-ghost'}`}
                      style={{ fontSize: '12px', padding: '5px 12px' }}
                      onClick={() => setAppStatusFilter('rejected')}
                    >
                      🔴 Từ chối ({applications.filter(a => a.status === 'rejected').length})
                    </button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255, 255, 255, 0.04)', color: 'var(--color-text-dim)', borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '14px 20px' }}>Thí sinh</th>
                        <th style={{ padding: '14px 20px' }}>Đơn vị / Trường</th>
                        <th style={{ padding: '14px 20px' }}>Cuộc thi</th>
                        <th style={{ padding: '14px 20px' }}>Đề tài nghiên cứu</th>
                        <th style={{ padding: '14px 20px' }}>Trạng thái</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Xét duyệt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications
                        .filter(app => {
                          const q = appSearchQuery.toLowerCase().trim();
                          const matchSearch = q === '' ||
                            app.full_name.toLowerCase().includes(q) ||
                            app.school.toLowerCase().includes(q) ||
                            app.email.toLowerCase().includes(q) ||
                            app.phone.toLowerCase().includes(q) ||
                            app.competition_code.toLowerCase().includes(q) ||
                            app.project_title.toLowerCase().includes(q);
                          const matchStatus = appStatusFilter === 'all' || app.status === appStatusFilter;
                          return matchSearch && matchStatus;
                        })
                        .map((app) => (
                          <tr key={app.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '16px 20px' }}>
                              <div style={{ fontWeight: 700, color: 'white' }}>{app.full_name}</div>
                              <div style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>{app.email} • {app.phone}</div>
                            </td>
                            <td style={{ padding: '16px 20px', color: 'var(--color-text-light)' }}>
                              {app.school} ({app.city})
                            </td>
                            <td style={{ padding: '16px 20px', color: 'var(--color-gold-bright)', fontWeight: 600 }}>
                              {app.competition_code}
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                              <div style={{ color: 'white', fontWeight: 600, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {app.project_title}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{app.project_field}</div>
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                              {app.status === 'approved' && <span className="badge badge-open">Đã duyệt</span>}
                              {app.status === 'under_review' && <span className="badge badge-upcoming">Chờ duyệt</span>}
                              {app.status === 'submitted' && <span className="badge badge-blue">Mới nộp</span>}
                              {app.status === 'rejected' && <span className="badge badge-closed">Từ chối</span>}
                            </td>
                            <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <button
                                  className="btn btn-sm btn-outline"
                                  style={{ color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.4)' }}
                                  onClick={() => handleStatusChange(app.id, 'approved')}
                                  title="Duyệt hồ sơ"
                                >
                                  <CheckCircle2 size={14} />
                                  <span>Duyệt</span>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline"
                                  style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                                  onClick={() => handleStatusChange(app.id, 'rejected')}
                                  title="Từ chối"
                                >
                                  <XCircle size={14} />
                                  <span>Từ chối</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 7: QUẢN LÝ ẢNH SÂN KHẤU & TRIỂN LÃM (SHOWCASE)
            ========================================================================= */}
        {activeTab === 'showcase' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ImageIcon size={22} color="var(--color-gold-bright)" />
                  Quản Lý Ảnh Sân Khấu & Triển Lãm (Showcase)
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Tùy chỉnh 3 bức ảnh thực tế (Lễ trao giải, thuyết trình, đoàn Việt Nam) và nội dung giới thiệu ở trang chủ.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={handleResetShowcase}>
                  <RotateCcw size={15} />
                  <span>Khôi phục mặc định</span>
                </button>
                <button type="button" className="btn btn-gold" onClick={() => handleSaveShowcase()}>
                  <Save size={16} />
                  <span>Lưu tất cả thay đổi</span>
                </button>
              </div>
            </div>

            {/* Section Text Configuration */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '28px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={18} color="var(--color-sky-bright)" />
                Tiêu đề & Giới thiệu Mục Triển Lãm
              </h4>

              <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Tiêu đề lớn tiếng Anh / Quốc tế *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={showcaseData.heading}
                    onChange={(e) => setShowcaseData({ ...showcaseData, heading: e.target.value })}
                    placeholder="A TRULY GLOBAL INNOVATION PLATFORM"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nhãn phụ tiếng Việt *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={showcaseData.subheading}
                    onChange={(e) => setShowcaseData({ ...showcaseData, subheading: e.target.value })}
                    placeholder="ĐẤU TRƯỜNG KHOA HỌC & SÁNG CHẾ QUỐC TẾ HÀNG ĐẦU"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Đoạn văn giới thiệu nền tảng *</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={showcaseData.description}
                  onChange={(e) => setShowcaseData({ ...showcaseData, description: e.target.value })}
                  placeholder="Mô tả quy mô và sứ mệnh của RIVA tại các đấu trường..."
                />
              </div>
            </div>

            {/* 3 Photos Grid Configuration */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              {showcaseData.photos.map((photo, pIdx) => (
                <div key={photo.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-gold" style={{ fontWeight: 800 }}>
                      ẢNH THỨ {pIdx + 1}
                    </span>
                    <select
                      className="form-select"
                      style={{ width: 'auto', padding: '4px 10px', fontSize: '11px' }}
                      value={photo.badgeType}
                      onChange={(e) => {
                        const newPhotos = [...showcaseData.photos];
                        newPhotos[pIdx] = { ...newPhotos[pIdx], badgeType: e.target.value as any };
                        setShowcaseData({ ...showcaseData, photos: newPhotos });
                      }}
                    >
                      <option value="gold">Icon: Huy chương Vàng</option>
                      <option value="sky">Icon: Địa cầu Xanh</option>
                      <option value="success">Icon: Khiên Bảo Trợ Xanh</option>
                    </select>
                  </div>

                  <ImageUploadField
                    label={`Tải ảnh ${pIdx + 1} từ máy tính hoặc dán URL`}
                    value={photo.imageUrl}
                    onChange={(val) => {
                      const newPhotos = [...showcaseData.photos];
                      newPhotos[pIdx] = { ...newPhotos[pIdx], imageUrl: val };
                      setShowcaseData({ ...showcaseData, photos: newPhotos });
                    }}
                    placeholder="Dán link ảnh hoặc bấm 'Tải từ máy tính'..."
                    height="180px"
                  />

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Tiêu đề chú thích dưới ảnh *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={photo.title}
                      onChange={(e) => {
                        const newPhotos = [...showcaseData.photos];
                        newPhotos[pIdx] = { ...newPhotos[pIdx], title: e.target.value };
                        setShowcaseData({ ...showcaseData, photos: newPhotos });
                      }}
                      placeholder="VD: Lễ Trao Giải & Vinh Danh Huy Chương Vàng Quốc Tế"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-lg btn-gold"
                style={{ minWidth: '320px', justifyContent: 'center', gap: '8px', padding: '16px' }}
                onClick={() => handleSaveShowcase()}
              >
                <Save size={18} />
                <span>LƯU TẤT CẢ THAY ĐỔI ẢNH TRIỂN LÃM</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODAL: SOẠN THẢO BÀI BÁO MỚI HOẶC CHỈNH SỬA BÀI BÁO
            ========================================================================= */}
        {showArticleModal && editingArticle && (
          <div className="modal-overlay" onClick={() => setShowArticleModal(false)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '820px', maxHeight: '90vh' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>
                  {editingArticle.id ? 'Soạn thảo & Chỉnh sửa bài báo' : 'Viết bài báo mới'}
                </h3>
                <button className="btn btn-sm btn-ghost" onClick={() => setShowArticleModal(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveNewsArticle}>
                <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Tiêu đề bài viết *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={editingArticle.title}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      placeholder="Nhập tiêu đề ấn tượng..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Chuyên mục bài viết *</label>
                    <select
                      className="form-select"
                      value={editingArticle.category}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    >
                      <option value="KẾT QUẢ THI ĐẤU">KẾT QUẢ THI ĐẤU</option>
                      <option value="ĐÀO TẠO & TẬP HUẤN">ĐÀO TẠO & TẬP HUẤN</option>
                      <option value="CẨM NANG NGHIÊN CỨU">CẨM NANG NGHIÊN CỨU</option>
                      <option value="HOẠT ĐỘNG QUỐC TẾ">HOẠT ĐỘNG QUỐC TẾ</option>
                      <option value="TIN TỨC SỰ KIỆN">TIN TỨC SỰ KIỆN</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Tác giả / Nguồn tin</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingArticle.author || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                      placeholder="Ban Tin Tức RIVA Media"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ngày xuất bản</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editingArticle.date}
                      onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                      placeholder="Ví dụ: 30/10/2026"
                    />
                  </div>
                </div>

                <ImageUploadField
                  label="Ảnh bìa bài viết (Cover Image)"
                  value={editingArticle.cover_image}
                  onChange={(val) => setEditingArticle({ ...editingArticle, cover_image: val })}
                  placeholder="Dán link ảnh hoặc bấm 'Tải từ máy tính'..."
                  height="120px"
                />

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="form-label">Đoạn tóm tắt (Excerpt) *</label>
                  <textarea
                    rows={2}
                    required
                    className="form-textarea"
                    value={editingArticle.desc}
                    onChange={(e) => setEditingArticle({ ...editingArticle, desc: e.target.value })}
                    placeholder="Tóm tắt ngắn gọn 2-3 câu về bài viết..."
                  />
                </div>

                {/* Blocks in news article */}
                <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>
                      Khối nội dung chi tiết bài báo ({(editingArticle.blocks || []).length} khối)
                    </label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToEditingArticle('paragraph')}>
                        + Đoạn văn
                      </button>
                      <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToEditingArticle('subheading')}>
                        + Đề mục
                      </button>
                      <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToEditingArticle('image')}>
                        + Chèn ảnh
                      </button>
                      <button type="button" className="btn btn-sm btn-outline" onClick={() => addBlockToEditingArticle('quote')}>
                        + Trích dẫn
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(editingArticle.blocks || []).map((b, bIdx) => (
                      <div key={b.id} style={{ padding: '12px', background: 'rgba(5, 13, 38, 0.7)', borderRadius: '8px', border: '1px solid rgba(117, 194, 250, 0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span className="badge badge-blue" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                            {b.type === 'paragraph' ? 'Đoạn văn' : b.type === 'subheading' ? 'Đề mục con' : b.type === 'image' ? 'Ảnh minh họa' : 'Trích dẫn'}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            style={{ color: '#ef4444', padding: '2px' }}
                            onClick={() => {
                              const newBlocks = (editingArticle.blocks || []).filter((_, idx) => idx !== bIdx);
                              setEditingArticle({ ...editingArticle, blocks: newBlocks });
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        {b.type === 'paragraph' && (
                          <textarea
                            rows={3}
                            className="form-textarea"
                            value={b.text || ''}
                            onChange={(e) => {
                              const newBlocks = [...(editingArticle.blocks || [])];
                              newBlocks[bIdx].text = e.target.value;
                              setEditingArticle({ ...editingArticle, blocks: newBlocks });
                            }}
                            placeholder="Nhập nội dung đoạn văn..."
                          />
                        )}

                        {b.type === 'subheading' && (
                          <input
                            type="text"
                            className="form-input"
                            value={b.text || ''}
                            onChange={(e) => {
                              const newBlocks = [...(editingArticle.blocks || [])];
                              newBlocks[bIdx].text = e.target.value;
                              setEditingArticle({ ...editingArticle, blocks: newBlocks });
                            }}
                            placeholder="Nhập đề mục con..."
                          />
                        )}

                        {b.type === 'image' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <ImageUploadField
                              label="Ảnh minh họa khối nội dung"
                              value={b.imageUrl || ''}
                              onChange={(val) => {
                                const newBlocks = [...(editingArticle.blocks || [])];
                                newBlocks[bIdx].imageUrl = val;
                                setEditingArticle({ ...editingArticle, blocks: newBlocks });
                              }}
                              placeholder="Dán link ảnh hoặc bấm 'Tải từ máy tính'..."
                              height="120px"
                            />
                            <input
                              type="text"
                              className="form-input"
                              value={b.imageCaption || ''}
                              onChange={(e) => {
                                const newBlocks = [...(editingArticle.blocks || [])];
                                newBlocks[bIdx].imageCaption = e.target.value;
                                setEditingArticle({ ...editingArticle, blocks: newBlocks });
                              }}
                              placeholder="Chú thích ảnh minh họa..."
                            />
                          </div>
                        )}

                        {b.type === 'quote' && (
                          <div className="grid-2" style={{ gap: '10px' }}>
                            <textarea
                              rows={2}
                              className="form-textarea"
                              value={b.text || ''}
                              onChange={(e) => {
                                const newBlocks = [...(editingArticle.blocks || [])];
                                newBlocks[bIdx].text = e.target.value;
                                setEditingArticle({ ...editingArticle, blocks: newBlocks });
                              }}
                              placeholder="Trích dẫn phát biểu..."
                            />
                            <input
                              type="text"
                              className="form-input"
                              value={b.authorQuote || ''}
                              onChange={(e) => {
                                const newBlocks = [...(editingArticle.blocks || [])];
                                newBlocks[bIdx].authorQuote = e.target.value;
                                setEditingArticle({ ...editingArticle, blocks: newBlocks });
                              }}
                              placeholder="Người phát biểu..."
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowArticleModal(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-gold">
                    <Save size={16} />
                    <span>Lưu & Xuất bản bài báo</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add or Edit Competition */}
        {showCompModal && editingComp && (
          <div className="modal-overlay" onClick={() => setShowCompModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', maxHeight: '90vh' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {editingComp.id ? <Edit size={20} color="var(--color-gold-bright)" /> : <Plus size={20} color="var(--color-gold-bright)" />}
                  <span>{editingComp.id ? 'Chỉnh sửa thông tin cuộc thi' : 'Thêm cuộc thi quốc tế mới'}</span>
                </h3>
                <button type="button" className="btn btn-sm btn-ghost" onClick={() => setShowCompModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveCompSubmit}>
                <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Mã viết tắt (ví dụ: SVIIF, INTARG) *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="SVIIF"
                      value={editingComp.code || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, code: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Emoji Quốc kỳ (ví dụ: 🇺🇸, 🇵🇱, 🇲🇾)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="🇺🇸"
                      value={editingComp.flag_emoji || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, flag_emoji: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label className="form-label">Tên đầy đủ cuộc thi *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="SVIIF 2027 - Silicon Valley International Invention Festival"
                    value={editingComp.title || ''}
                    onChange={(e) => setEditingComp({ ...editingComp, title: e.target.value })}
                  />
                </div>

                <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Quốc gia *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Hoa Kỳ"
                      value={editingComp.country || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, country: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Địa điểm tổ chức</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Santa Clara Convention Center, California"
                      value={editingComp.location || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Lĩnh vực thi đấu *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="STEM, AI & Sáng chế Đổi mới"
                      value={editingComp.category || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, category: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Trạng thái tuyển sinh *</label>
                    <select
                      className="form-select"
                      value={editingComp.status || 'open'}
                      onChange={(e) => setEditingComp({ ...editingComp, status: e.target.value as any })}
                    >
                      <option value="open">🟢 Đang mở nhận hồ sơ (Open)</option>
                      <option value="upcoming">🟡 Sắp mở đăng ký (Upcoming)</option>
                      <option value="closed">🔴 Đã đóng đơn (Closed)</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Hạn chót nhận hồ sơ</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editingComp.deadline || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, deadline: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Thời gian diễn ra sự kiện</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Tháng 8/2027"
                      value={editingComp.event_date || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, event_date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Đơn vị tổ chức (Ban tổ chức)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Hiệp hội Sáng chế Quốc tế IFIA"
                      value={editingComp.organizer || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, organizer: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Lệ phí / Chính sách hỗ trợ</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Hỗ trợ trọn gói đoàn RIVA"
                      value={editingComp.fee || ''}
                      onChange={(e) => setEditingComp({ ...editingComp, fee: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label className="form-label">Mô tả tóm tắt cuộc thi</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    placeholder="Thông tin giới thiệu về cuộc thi, tiêu chí đánh giá, đối tượng tham gia..."
                    value={editingComp.description || ''}
                    onChange={(e) => setEditingComp({ ...editingComp, description: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowCompModal(false)}>
                    Hủy bỏ
                  </button>
                  <button type="submit" className="btn btn-gold" style={{ gap: '6px' }}>
                    <Save size={16} />
                    <span>{editingComp.id ? 'Lưu cập nhật cuộc thi' : 'Lưu và Công bố cuộc thi'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Mẫu phản hồi & kịch bản tư vấn nhanh 1 chạm */}
        {selectedLeadForTemplate && (
          <div className="modal-overlay" onClick={() => setSelectedLeadForTemplate(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={20} color="var(--color-gold-bright)" />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
                    Kịch Bản Tư Vấn Phụ Huynh / Học Sinh
                  </h3>
                </div>
                <button type="button" className="btn btn-sm btn-ghost" onClick={() => setSelectedLeadForTemplate(null)}>
                  <X size={18} />
                </button>
              </div>

              {/* Lead Summary Info */}
              <div style={{ padding: '14px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>
                      {selectedLeadForTemplate.full_name}
                      <span className="badge badge-gold" style={{ marginLeft: '8px', fontSize: '11px' }}>
                        {selectedLeadForTemplate.role === 'parent' ? 'Phụ huynh' : selectedLeadForTemplate.role === 'student' ? 'Học sinh' : 'Giáo viên'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', marginTop: '4px' }}>
                      {selectedLeadForTemplate.school && `Trường: ${selectedLeadForTemplate.school} • `}
                      Quan tâm: <span style={{ color: '#60A5FA', fontWeight: 600 }}>{selectedLeadForTemplate.interest_competition || 'Tư vấn cuộc thi chung'}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--color-gold-bright)', fontWeight: 700, fontSize: '14px' }}>
                      {selectedLeadForTemplate.phone}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {selectedLeadForTemplate.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call, Zalo, Email */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
                <a
                  href={`tel:${selectedLeadForTemplate.phone.replace(/[^0-9]/g, '')}`}
                  className="btn btn-gold"
                  style={{ flex: 1, minWidth: '130px', justifyContent: 'center', gap: '6px' }}
                >
                  <PhoneCall size={15} />
                  <span>Gọi Điện Ngay</span>
                </a>
                <a
                  href={`https://zalo.me/${selectedLeadForTemplate.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ flex: 1, minWidth: '130px', justifyContent: 'center', gap: '6px', borderColor: 'rgba(51, 102, 255, 0.4)', color: 'var(--color-sky)' }}
                >
                  <MessageCircle size={15} />
                  <span>Mở Zalo Chat</span>
                </a>
                <a
                  href={`mailto:${selectedLeadForTemplate.email}?subject=${encodeURIComponent(`[Viện RIVA] Tư vấn thông tin tham gia cuộc thi khoa học quốc tế`)}&body=${encodeURIComponent(
                    `Kính gửi ${selectedLeadForTemplate.role === 'parent' ? 'Quý Phụ huynh' : 'Bạn'} ${selectedLeadForTemplate.full_name},\n\nVIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA đã nhận được thông tin đăng ký tư vấn về: ${selectedLeadForTemplate.interest_competition || 'các giải đấu quốc tế'}.\n\nChuyên viên phụ trách học thuật của Viện xin liên hệ để giải đáp chi tiết thể lệ, lộ trình huấn luyện và thủ tục tham dự.\n\nTrân trọng,\nVIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA\nHotline: ${siteSettings.hotline}`
                  )}`}
                  className="btn btn-outline"
                  style={{ flex: 1, minWidth: '130px', justifyContent: 'center', gap: '6px' }}
                >
                  <Mail size={15} />
                  <span>Gửi Email</span>
                </a>
              </div>

              {/* Ready-to-copy message text */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>
                    Nội dung tin nhắn mẫu (Dán vào Zalo / SMS / Facebook)
                  </label>
                  <button
                    type="button"
                    className="btn btn-sm btn-gold"
                    style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
                    onClick={() => {
                      const msg = `Kính gửi ${selectedLeadForTemplate.role === 'parent' ? 'Quý Phụ huynh' : 'Bạn'} ${selectedLeadForTemplate.full_name},\n\nVIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA trân trọng cảm ơn bạn đã quan tâm đến chương trình ${selectedLeadForTemplate.interest_competition || 'đào tạo và dự thi quốc tế'}. \n\nEm là đại diện Ban Cố Vấn RIVA xin phép được kết nối để gửi đến Anh/Chị thông tin chi tiết về: \n1. Thể lệ và tiêu chí chấm giải của Ban Tổ chức quốc tế\n2. Lộ trình hoàn thiện đề tài và tập huấn tiếng Anh thuyết trình\n3. Lịch trình đoàn Việt Nam xuất quân\n\nAnh/Chị thuận tiện trao đổi thêm vào khung giờ nào để em hỗ trợ chu đáo nhất ạ? Em cảm ơn!`;
                      navigator.clipboard.writeText(msg);
                      setCopiedTemplate(true);
                      setTimeout(() => setCopiedTemplate(false), 3000);
                    }}
                  >
                    {copiedTemplate ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedTemplate ? 'Đã sao chép!' : 'Sao chép tin nhắn'}</span>
                  </button>
                </div>
                <textarea
                  rows={6}
                  readOnly
                  className="form-textarea"
                  style={{ fontSize: '13px', lineHeight: 1.6, background: 'rgba(5, 13, 38, 0.7)' }}
                  value={`Kính gửi ${selectedLeadForTemplate.role === 'parent' ? 'Quý Phụ huynh' : 'Bạn'} ${selectedLeadForTemplate.full_name},\n\nVIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA trân trọng cảm ơn bạn đã quan tâm đến chương trình ${selectedLeadForTemplate.interest_competition || 'đào tạo và dự thi quốc tế'}. \n\nEm là đại diện Ban Cố Vấn RIVA xin phép được kết nối để gửi đến Anh/Chị thông tin chi tiết về: \n1. Thể lệ và tiêu chí chấm giải của Ban Tổ chức quốc tế\n2. Lộ trình hoàn thiện đề tài và tập huấn tiếng Anh thuyết trình\n3. Lịch trình đoàn Việt Nam xuất quân\n\nAnh/Chị thuận tiện trao đổi thêm vào khung giờ nào để em hỗ trợ chu đáo nhất ạ? Em cảm ơn!`}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setSelectedLeadForTemplate(null)}>
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Preview Modal for News Article */}
        {previewArticle && (
          <ArticleModal
            isOpen={Boolean(previewArticle)}
            onClose={() => setPreviewArticle(null)}
            title={previewArticle.title}
            category={previewArticle.category}
            date={previewArticle.date}
            author={previewArticle.author}
            coverImage={previewArticle.cover_image}
            leadParagraph={previewArticle.desc}
            blocks={previewArticle.blocks || []}
          />
        )}
      </div>
    </div>
  );
};
