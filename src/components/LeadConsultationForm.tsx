import React, { useEffect, useRef, useState } from 'react';
import {
  Send,
  CheckCircle2,
  Sparkles,
  Phone,
  AlertCircle,
  Users,
  GraduationCap,
  School,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLead } from '../lib/leads';
import { Lead } from '../types';
import { sanitizeText } from '../lib/security';

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
  const [error, setError] = useState('');
  const [website, setWebsite] = useState('');
  const request = useRef({ id: '', payload: '' });
  const submitting = useRef(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setLoading(true);
    setError('');

    try {
      const cleanedFullName = sanitizeText(formData.full_name);
      const cleanedEmail = sanitizeText(formData.email).toLowerCase();
      const cleanedPhone = sanitizeText(formData.phone).trim();
      const cleanedSchool = sanitizeText(formData.school || '');
      const cleanedMessage = sanitizeText(formData.message || '');

      // Validate phone number: must have 8 to 15 digits
      const digitsOnly = cleanedPhone.replace(/\D/g, '');
      if (digitsOnly.length < 8 || digitsOnly.length > 15) {
        setError('Số điện thoại không đúng định dạng (vui lòng nhập 9 - 11 chữ số)!');
        setLoading(false);
        submitting.current = false;
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanedEmail)) {
        setError('Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại!');
        setLoading(false);
        submitting.current = false;
        return;
      }

      const cleanedLead: Lead = {
        ...formData,
        full_name: cleanedFullName,
        email: cleanedEmail,
        phone: cleanedPhone,
        school: cleanedSchool,
        message: cleanedMessage
      };

      const payload = JSON.stringify(cleanedLead);
      if (!request.current.id || request.current.payload !== payload) {
        request.current = { id: crypto.randomUUID(), payload };
      }

      await submitLead(cleanedLead, request.current.id, website);
      request.current = { id: '', payload: '' };

      setSuccess(true);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Reset form giữ nguyên role và cuộc thi
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
    <section id="register-lead" style={{ padding: '60px 0 90px', background: 'radial-gradient(circle at 50% 50%, rgba(51, 102, 255, 0.28) 0%, #050d26 85%)' }}>
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
                VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG (RIVA) trực tiếp tư vấn, thẩm định ý tưởng và hỗ trợ toàn diện
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
                border: '1px solid rgba(204, 153, 0, 0.25)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ padding: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #3366ff, #5c85ff)', color: 'white' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Hotline Tư Vấn Tuyển Sinh 24/7:
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold-bright)' }}>
                    0988.234.567 / 024.3856.9999
                  </div>
                </div>
              </div>

              {/* Huy hiệu an tâm bảo mật */}
              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '13px' }}>
                <ShieldCheck size={16} color="var(--color-gold-bright)" />
                <span>Hệ thống bảo mật dữ liệu theo quy chuẩn thông tin tuyển sinh RIVA</span>
              </div>
            </div>

            {/* Cột phải: Form đăng ký thông tin */}
            <div className="lead-consult-form-box">
              <div style={{ marginBottom: '8px' }}>
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
                  padding: '34px 24px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '14px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={50} color="#34d399" style={{ margin: '0 auto 16px' }} />
                  <h4 style={{ fontSize: '20px', color: 'white', marginBottom: '10px', fontWeight: 800 }}>
                    Gửi thông tin thành công!
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '22px' }}>
                    Hồ sơ đăng ký đã được ghi nhận tự động vào hệ thống tuyển sinh của RIVA. Chuyên viên tư vấn sẽ liên hệ trực tiếp qua Số điện thoại / Zalo trong vòng 24 giờ làm việc.
                  </p>

                  <button
                    className="btn btn-sm btn-gold"
                    onClick={() => setSuccess(false)}
                  >
                    Đăng ký thêm hồ sơ khác
                  </button>
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

                  {/* Honeypot field chống spam bot */}
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
    </section>
  );
};
