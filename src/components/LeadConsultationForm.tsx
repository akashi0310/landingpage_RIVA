import React, { useEffect, useRef, useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Settings, 
  X, 
  ExternalLink, 
  Check, 
  AlertCircle,
  FileSpreadsheet,
  Users,
  GraduationCap,
  School
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  isLeadFormConfigured, 
  getGoogleSheetsUrl, 
  setGoogleSheetsUrl, 
  testGoogleSheetsConnection, 
  submitLead,
  isValidScriptUrl
} from '../lib/leads';
import { Lead } from '../types';

export const LeadConsultationForm: React.FC<{ selectedCompetition?: string }> = ({ selectedCompetition }) => {
  const [formData, setFormData] = useState<Lead>({
    full_name: '',
    email: '',
    phone: '',
    role: 'parent', // Mặc định dành cho Phụ huynh
    school: '',
    interest_competition: 'SVIIF (Hoa Kỳ)',
    interest_field: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDemoSubmission, setIsDemoSubmission] = useState(false);
  const [error, setError] = useState('');
  const [website, setWebsite] = useState('');
  const request = useRef({ id: '', payload: '' });
  const submitting = useRef(false);

  // Modal cấu hình Google Sheet
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [inputUrl, setInputUrl] = useState(getGoogleSheetsUrl());
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(isLeadFormConfigured());

  useEffect(() => {
    const names: Record<string, string> = { 
      SVIIF: 'SVIIF (Hoa Kỳ)', 
      IPITEX: 'IPITEX (Thái Lan)', 
      IENA: 'iENA (Đức)', 
      GENEVA: 'Geneva (Thụy Sĩ)' 
    };
    if (selectedCompetition && names[selectedCompetition]) {
      setFormData(data => ({ ...data, interest_competition: names[selectedCompetition] }));
      setSuccess(false);
    }
  }, [selectedCompetition]);

  const handleRoleChange = (newRole: 'parent' | 'student' | 'teacher') => {
    setFormData(prev => ({ ...prev, role: newRole }));
  };

  const handleSaveConfig = () => {
    const trimmed = inputUrl.trim();
    if (trimmed && !isValidScriptUrl(trimmed)) {
      setTestResult({
        ok: false,
        message: 'URL phải có định dạng https://script.google.com/macros/s/.../exec'
      });
      return;
    }
    setGoogleSheetsUrl(trimmed);
    setIsConfigured(Boolean(trimmed));
    setTestResult({
      ok: true,
      message: trimmed ? 'Đã lưu cấu hình Google Sheets thành công!' : 'Đã xóa cấu hình URL.'
    });
    setTimeout(() => {
      setShowConfigModal(false);
      setTestResult(null);
    }, 1200);
  };

  const handleTestUrl = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await testGoogleSheetsConnection(inputUrl);
    setTesting(false);
    setTestResult(res);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setLoading(true);
    setError('');

    try {
      const payload = JSON.stringify(formData);
      if (!request.current.id || request.current.payload !== payload) {
        request.current = { id: crypto.randomUUID(), payload };
      }
      
      const result = await submitLead(formData, request.current.id, website);
      request.current = { id: '', payload: '' };
      
      setIsDemoSubmission(Boolean(result.isDemo));
      setSuccess(true);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        role: formData.role,
        school: '',
        interest_competition: formData.interest_competition,
        interest_field: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!');
    } finally {
      setLoading(false);
      submitting.current = false;
    }
  };

  return (
    <section id="register-lead" style={{ padding: '60px 0 90px', background: 'radial-gradient(circle at 50% 50%, rgba(19, 59, 190, 0.28) 0%, #03081c 85%)' }}>
      <div className="container">
        <div className="glass-card lead-consult-wrapper" style={{ position: 'relative' }}>
          
          <div className="grid-2" style={{ gap: '48px', alignItems: 'flex-start' }}>
            
            {/* Cột trái: Thông điệp đồng hành và cam kết RIVA */}
            <div>
              <div className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={14} />
                CỔNG ĐĂNG KÝ HỌC SINH & PHỤ HUYNH
              </div>

              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 900, marginBottom: '20px', lineHeight: 1.25 }}>
                ĐƯA Ý TƯỞNG CỦA HỌC SINH VIỆT RA ĐẤU TRƯỜNG QUỐC TẾ
              </h2>

              <p style={{ color: 'var(--color-text-light)', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
                Viện Nghiên Cứu Đổi Mới Sáng Tạo (RIVA) trực tiếp tư vấn, thẩm định ý tưởng và hỗ trợ toàn diện 
                đoàn Việt Nam tham dự các triển lãm sáng chế và cuộc thi khoa học lớn nhất thế giới tại Mỹ, Đức, Thụy Sĩ, Thái Lan.
              </p>

              {/* Danh sách cam kết */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--color-gold-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: 'white' }}>
                    <strong>Thẩm định miễn phí:</strong> Hội đồng chuyên gia đánh giá tính khả thi và tính mới của đề tài
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--color-gold-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: 'white' }}>
                    <strong>Bảo mật bản quyền:</strong> Hướng dẫn đăng ký sở hữu trí tuệ trước khi công bố quốc tế
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--color-gold-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: 'white' }}>
                    <strong>Đồng hành A-Z:</strong> Huấn luyện thuyết trình tiếng Anh, phản biện với giám khảo quốc tế
                  </span>
                </div>
              </div>

              {/* Khối Hotline tư vấn */}
              <div style={{
                padding: '18px 22px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 222, 67, 0.25)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ padding: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #133bbe, #146ef5)', color: 'white' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Hotline Tư Vấn Tuyển Sinh 24/7:
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold-bright)' }}>
                    0988.xxx.xxx / 024.xxxx.xxxx
                  </div>
                </div>
              </div>

              {/* Trạng thái liên kết Google Sheet */}
              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  background: isConfigured ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 222, 67, 0.12)',
                  color: isConfigured ? '#34d399' : 'var(--color-gold-bright)',
                  border: isConfigured ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 222, 67, 0.3)'
                }}>
                  <FileSpreadsheet size={14} />
                  <span>{isConfigured ? 'Google Sheets: Đã kết nối tự động lưu' : 'Google Sheets: Chế độ lưu thử nghiệm'}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setShowConfigModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}
                  title="Cài đặt liên kết Google Sheet"
                >
                  <Settings size={14} />
                  <span>Cài đặt</span>
                </button>
              </div>
            </div>

            {/* Cột phải: Form đăng ký thông tin */}
            <div className="lead-consult-form-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'white', margin: 0 }}>
                  Đăng Ký Tư Vấn Hồ Sơ
                </h3>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                Phụ huynh và thí sinh vui lòng điền thông tin bên dưới. Chuyên viên RIVA sẽ liên hệ trong 24h.
              </p>

              {/* Thanh chọn nhanh vai trò người điền (Phụ huynh / Học sinh / Giáo viên) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px',
                borderRadius: '10px',
                marginBottom: '22px'
              }}>
                <button
                  type="button"
                  onClick={() => handleRoleChange('parent')}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: formData.role === 'parent' ? 'var(--color-primary)' : 'transparent',
                    color: formData.role === 'parent' ? '#ffffff' : 'var(--color-text-muted)',
                    fontWeight: formData.role === 'parent' ? 700 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <Users size={14} />
                  <span>Phụ huynh</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: formData.role === 'student' ? 'var(--color-primary)' : 'transparent',
                    color: formData.role === 'student' ? '#ffffff' : 'var(--color-text-muted)',
                    fontWeight: formData.role === 'student' ? 700 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <GraduationCap size={14} />
                  <span>Học sinh</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('teacher')}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: formData.role === 'teacher' ? 'var(--color-primary)' : 'transparent',
                    color: formData.role === 'teacher' ? '#ffffff' : 'var(--color-text-muted)',
                    fontWeight: formData.role === 'teacher' ? 700 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  <School size={14} />
                  <span>Giáo viên</span>
                </button>
              </div>

              {success ? (
                <div style={{
                  padding: '30px 24px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '14px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={48} color="#34d399" style={{ margin: '0 auto 16px' }} />
                  <h4 style={{ fontSize: '20px', color: 'white', marginBottom: '10px', fontWeight: 800 }}>
                    {isDemoSubmission ? 'Đã ghi nhận thông tin đăng ký!' : 'Gửi thông tin thành công!'}
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {isDemoSubmission 
                      ? 'Dữ liệu đã được lưu trữ an toàn trên thiết bị. Bạn có thể bấm "Cài đặt" để dán URL Google Sheet và tự động chuyển toàn bộ dữ liệu vào trang tính online.'
                      : 'Hồ sơ đã được lưu tự động vào Google Sheets của ban tuyển sinh RIVA. Chuyên viên sẽ gọi điện hoặc gửi kết nối qua Zalo trong thời gian sớm nhất.'}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                      className="btn btn-sm btn-gold" 
                      onClick={() => setSuccess(false)}
                    >
                      Đăng ký thêm hồ sơ khác
                    </button>
                    {isDemoSubmission && (
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => { setShowConfigModal(true); }}
                      >
                        <Settings size={14} />
                        <span>Kết nối Google Sheet ngay</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      color: '#fca5a5',
                      fontSize: '13px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <AlertCircle size={16} style={{ flexShrink: 0 }} />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Honeypot field chống spam */}
                  <div className="form-honeypot" aria-hidden="true" style={{ display: 'none' }}>
                    <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
                  </div>

                  <div className="grid-2" style={{ gap: '14px' }}>
                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="form-label" htmlFor="lead-name">
                        {formData.role === 'parent' ? 'Họ và tên Phụ huynh *' : formData.role === 'teacher' ? 'Họ và tên Thầy / Cô *' : 'Họ và tên Học sinh *'}
                      </label>
                      <input 
                        id="lead-name" 
                        autoComplete="name" 
                        maxLength={120}
                        type="text" 
                        required
                        className="form-input" 
                        placeholder={formData.role === 'parent' ? 'VD: Nguyễn Thị Mai' : 'VD: Nguyễn Văn A'}
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="form-label" htmlFor="lead-phone">
                        {formData.role === 'parent' ? 'Số điện thoại / Zalo Phụ huynh *' : 'Số điện thoại / Zalo *'}
                      </label>
                      <input 
                        id="lead-phone" 
                        autoComplete="tel" 
                        maxLength={30} 
                        pattern="[+0-9() .-]{8,30}"
                        type="tel" 
                        required
                        className="form-input" 
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '14px' }}>
                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="form-label" htmlFor="lead-email">Email liên hệ *</label>
                      <input 
                        id="lead-email" 
                        autoComplete="email" 
                        maxLength={254}
                        type="email" 
                        required
                        className="form-input" 
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="form-label" htmlFor="lead-school">
                        {formData.role === 'parent' ? 'Tên con & Trường / Lớp *' : formData.role === 'teacher' ? 'Trường / Đơn vị công tác *' : 'Trường học / Lớp hiện tại *'}
                      </label>
                      <input 
                        id="lead-school" 
                        maxLength={200}
                        type="text" 
                        required
                        className="form-input" 
                        placeholder={formData.role === 'parent' ? 'VD: Bé Bảo Nam - THPT Chuyên KHTN, Lớp 10' : 'VD: THPT Chuyên Hà Nội - Amsterdam'}
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '14px' }}>
                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="form-label" htmlFor="lead-competition">Cuộc thi quốc tế quan tâm *</label>
                      <select 
                        id="lead-competition"
                        className="form-select"
                        value={formData.interest_competition}
                        onChange={(e) => setFormData({ ...formData, interest_competition: e.target.value })}
                      >
                        <option value="SVIIF (Hoa Kỳ)">🇺🇸 SVIIF (Thung Lũng Silicon, Mỹ)</option>
                        <option value="IPITEX (Thái Lan)">🇹🇭 IPITEX (Bangkok, Thái Lan)</option>
                        <option value="iENA (Đức)">🇩🇪 iENA (Nuremberg, CHLB Đức)</option>
                        <option value="Geneva (Thụy Sĩ)">🇨🇭 Geneva Inventions (Thụy Sĩ)</option>
                        <option value="Cần chuyên gia tư vấn">❓ Cần chuyên gia RIVA định hướng chọn cuộc thi</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="form-label" htmlFor="lead-field">Lĩnh vực nghiên cứu</label>
                      <select 
                        id="lead-field"
                        className="form-select"
                        value={formData.interest_field}
                        onChange={(e) => setFormData({ ...formData, interest_field: e.target.value })}
                      >
                        <option value="">-- Chọn lĩnh vực (nếu có) --</option>
                        <option value="Trí tuệ nhân tạo & CNTT">Trí tuệ nhân tạo (AI) & CNTT</option>
                        <option value="Công nghệ sinh học & Y tế">Công nghệ sinh học & Y tế</option>
                        <option value="Khoa học môi trường & Năng lượng">Môi trường & Năng lượng tái tạo</option>
                        <option value="Cơ điện tử & Robotics">Cơ điện tử, Tự động hóa & Robotics</option>
                        <option value="Chưa có ý tưởng cụ thể">Chưa có đề tài - Cần RIVA ươm tạo</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '18px' }}>
                    <label className="form-label" htmlFor="lead-message">
                      {formData.role === 'parent' ? 'Nguyện vọng của gia đình / Ý tưởng đề tài của con' : 'Tóm tắt ý tưởng nghiên cứu / Câu hỏi của bạn'}
                    </label>
                    <textarea 
                      id="lead-message" 
                      maxLength={3000}
                      className="form-textarea"
                      rows={3}
                      placeholder={formData.role === 'parent' ? 'VD: Gia đình muốn hướng cho con thi quốc tế để cộng điểm du học Mỹ, hiện con có đam mê về AI...' : 'Mô tả ngắn gọn hướng đề tài hoặc những khó khăn bạn đang gặp phải...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-gold" 
                    style={{ width: '100%', padding: '15px', fontSize: '15px', fontWeight: 800 }}
                    disabled={loading}
                  >
                    <Send size={18} />
                    <span>{loading ? 'Đang gửi dữ liệu vào hệ thống...' : 'GỬI ĐĂNG KÝ TƯ VẤN NGAY'}</span>
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--color-text-dim)' }}>
                    🔒 Thông tin của Phụ huynh và học sinh được bảo mật 100% theo chính sách RIVA.
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* MODAL CÀI ĐẶT GOOGLE SHEETS */}
      {showConfigModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#071a3a',
            border: '1px solid rgba(255, 222, 67, 0.4)',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            color: 'white',
            position: 'relative'
          }}>
            <button
              onClick={() => { setShowConfigModal(false); setTestResult(null); }}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255, 222, 67, 0.15)', color: 'var(--color-gold-bright)' }}>
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Kết Nối Google Sheet Online</h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-muted)' }}>Tự động đẩy dữ liệu đăng ký vào trang tính của bạn</p>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Web App URL của Google Apps Script (kết thúc bằng /exec):
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={inputUrl}
                onChange={e => setInputUrl(e.target.value)}
                style={{ width: '100%', fontSize: '13px' }}
              />
            </div>

            {testResult && (
              <div style={{
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                marginBottom: '16px',
                background: testResult.ok ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: testResult.ok ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                color: testResult.ok ? '#34d399' : '#fca5a5',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {testResult.ok ? <Check size={16} /> : <AlertCircle size={16} />}
                <span>{testResult.message}</span>
              </div>
            )}

            {/* Hướng dẫn 3 bước nhanh */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '12px',
              color: 'var(--color-text-light)',
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--color-gold-bright)', marginBottom: '4px' }}>
                Cách lấy link Google Apps Script trong 2 phút:
              </div>
              <ol style={{ paddingLeft: '18px', margin: 0 }}>
                <li>Tạo một Google Sheet mới tại <strong>sheets.new</strong></li>
                <li>Chọn <strong>Tiện ích mở rộng → Apps Script</strong>, dán mã từ file <code>google-apps-script/Code.gs</code></li>
                <li>Bấm <strong>Triển khai → Tùy chọn triển khai mới</strong>, chọn Ứng dụng web, phân quyền: <em>"Bất kỳ ai" (Anyone)</em>, copy link dán vào đây.</li>
              </ol>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={handleTestUrl}
                disabled={testing || !inputUrl.trim()}
              >
                {testing ? 'Đang kiểm tra...' : 'Kiểm tra URL'}
              </button>

              <button
                type="button"
                className="btn btn-sm btn-gold"
                onClick={handleSaveConfig}
              >
                Lưu kết nối
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
