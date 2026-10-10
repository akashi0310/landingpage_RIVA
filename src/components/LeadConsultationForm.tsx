import React, { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle2, Sparkles, Phone, Mail, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { isLeadFormConfigured, submitLead } from '../lib/leads';
import { Lead } from '../types';

export const LeadConsultationForm: React.FC<{ selectedCompetition?: string }> = ({ selectedCompetition }) => {
  const [formData, setFormData] = useState<Lead>({
    full_name: '',
    email: '',
    phone: '',
    role: 'student',
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
    const names: Record<string, string> = { SVIIF: 'SVIIF (Hoa Kỳ)', IPITEX: 'IPITEX (Thái Lan)', IENA: 'iENA (Đức)', GENEVA: 'Geneva (Thụy Sĩ)' };
    if (selectedCompetition && names[selectedCompetition]) {
      setFormData(data => ({ ...data, interest_competition: names[selectedCompetition] }));
      setSuccess(false);
    }
  }, [selectedCompetition]);

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
      await submitLead(formData, request.current.id, website);
      request.current = { id: '', payload: '' };
      setSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      // reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        role: 'student',
        school: '',
        interest_competition: 'SVIIF (Hoa Kỳ)',
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
    <section id="register-lead" style={{ padding: '90px 0', background: 'radial-gradient(circle at 50% 50%, rgba(19, 59, 190, 0.25) 0%, #03081c 80%)' }}>
      <div className="container">
        <div className="glass-card" style={{
          padding: '48px 40px',
          border: '1px solid rgba(255, 222, 67, 0.45)',
          background: 'rgba(7, 21, 69, 0.88)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div className="grid-2" style={{ gap: '48px', alignItems: 'center' }}>
            {/* Left: Final Call to Action Information (Slide 15) */}
            <div>
              <div className="badge badge-gold" style={{ marginBottom: '16px' }}>
                <Sparkles size={14} />
                ĐĂNG KÝ TƯ VẤN
              </div>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, marginBottom: '20px' }}>
                SẴN SÀNG ĐƯA Ý TƯỞNG CỦA BẠN RA THẾ GIỚI?
              </h2>
              <p style={{ color: 'var(--color-text-light)', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
                Hãy đồng hành cùng Viện Nghiên Cứu Đổi Mới Sáng Tạo (RIVA) để hiện thực hóa ước mơ nghiên cứu, 
                đoạt huy chương quốc tế và mở rộng cánh cửa vào các trường đại học hàng đầu thế giới.
              </p>

              {/* Guarantees */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--color-gold-bright)" />
                  <span style={{ fontSize: '14px', color: 'white' }}>Đánh giá tiềm năng đề tài miễn phí cùng hội đồng chuyên gia</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--color-gold-bright)" />
                  <span style={{ fontSize: '14px', color: 'white' }}>Bảo mật 100% ý tưởng và bản quyền sở hữu trí tuệ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--color-gold-bright)" />
                  <span style={{ fontSize: '14px', color: 'white' }}>Lộ trình huấn luyện thuyết trình tiếng Anh và kỹ năng phản biện</span>
                </div>
              </div>

              {/* Direct Hotline strip */}
              <div style={{
                padding: '16px 20px',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ padding: '10px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>Hotline tư vấn tuyển sinh 24/7:</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-gold-bright)' }}>0988.xxx.xxx / 024.xxxx.xxxx</div>
                </div>
              </div>
            </div>

            {/* Right: Registration & Consultation Form */}
            <div style={{
              background: 'rgba(3, 8, 28, 0.94)',
              padding: '36px',
              borderRadius: '16px',
              border: '1px solid var(--color-border)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', color: 'white' }}>
                Đăng ký nhận tư vấn đề tài
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                Điền thông tin bên dưới để chuyên viên RIVA kết nối và hỗ trợ chi tiết.
              </p>

              {success ? (
                <div style={{
                  padding: '24px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <CheckCircle2 size={42} color="var(--color-success)" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '18px', color: 'white', marginBottom: '8px' }}>Gửi thông tin thành công!</h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                    RIVA đã nhận được thông tin và sẽ liên hệ qua điện thoại hoặc email bạn cung cấp.
                  </p>
                  <button 
                    className="btn btn-sm btn-outline" 
                    onClick={() => setSuccess(false)}
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {!isLeadFormConfigured && <p role="status" style={{ color: 'var(--color-gold-bright)', marginBottom: '16px' }}>Form tư vấn đang được thiết lập. Vui lòng quay lại sau để gửi thông tin.</p>}
                  {error && <p role="alert" style={{ color: '#fca5a5', marginBottom: '16px' }}>{error}</p>}
                  <div className="form-honeypot" aria-hidden="true">
                    <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label>
                  </div>
                  <div className="grid-2" style={{ gap: '14px' }}>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" htmlFor="lead-name">Họ và tên người liên hệ *</label>
                      <input 
                        id="lead-name" autoComplete="name" maxLength={120}
                        type="text" 
                        required
                        className="form-input" 
                        placeholder="Nguyễn Văn A"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" htmlFor="lead-phone">Số điện thoại / Zalo *</label>
                      <input 
                        id="lead-phone" autoComplete="tel" maxLength={30} pattern="[+0-9() .-]{8,30}"
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
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" htmlFor="lead-email">Email liên hệ *</label>
                      <input 
                        id="lead-email" autoComplete="email" maxLength={254}
                        type="email" 
                        required
                        className="form-input" 
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" htmlFor="lead-role">Bạn là?</label>
                      <select 
                        id="lead-role"
                        className="form-select"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      >
                        <option value="student">Học sinh / Sinh viên</option>
                        <option value="parent">Phụ huynh</option>
                        <option value="teacher">Giáo viên hướng dẫn</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: '14px' }}>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" htmlFor="lead-school">Trường học / Lớp</label>
                      <input 
                        id="lead-school" maxLength={200}
                        type="text" 
                        className="form-input" 
                        placeholder="Ví dụ: THPT Chuyên KHTN, Lớp 11"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label" htmlFor="lead-competition">Cuộc thi quan tâm</label>
                      <select 
                        id="lead-competition"
                        className="form-select"
                        value={formData.interest_competition}
                        onChange={(e) => setFormData({ ...formData, interest_competition: e.target.value })}
                      >
                        <option value="SVIIF (Hoa Kỳ)">🇺🇸 SVIIF 2027 (Silicon Valley USA)</option>
                        <option value="IPITEX (Thái Lan)">🇹🇭 IPITEX 2027 (Bangkok Thái Lan)</option>
                        <option value="iENA (Đức)">🇩🇪 iENA 2027 (Nuremberg Đức)</option>
                        <option value="Geneva (Thụy Sĩ)">🇨🇭 Geneva Inventions (Thụy Sĩ)</option>
                        <option value="Cần tư vấn lựa chọn">❓ Cần chuyên gia tư vấn lựa chọn</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="form-label" htmlFor="lead-message">Tóm tắt ý tưởng nghiên cứu / Câu hỏi của bạn</label>
                    <textarea 
                      id="lead-message" maxLength={3000}
                      className="form-textarea"
                      rows={3}
                      placeholder="Mô tả ngắn gọn hướng đề tài hoặc những khó khăn bạn đang gặp phải..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-gold" 
                    style={{ width: '100%', padding: '14px' }}
                    disabled={loading || !isLeadFormConfigured}
                  >
                    <Send size={16} />
                    <span>{loading ? 'Đang gửi dữ liệu...' : 'GỬI ĐĂNG KÝ TƯ VẤN NGAY'}</span>
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--color-text-dim)' }}>
                    Khi gửi, bạn đồng ý để RIVA liên hệ tư vấn qua thông tin đã cung cấp.
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
