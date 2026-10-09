import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Users, 
  FileText, 
  DollarSign, 
  HelpCircle, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Competition } from '../types';

interface CompetitionDetailViewProps {
  competition: Competition;
  onBack: () => void;
  onRegister: (compCode: string) => void;
}

export const CompetitionDetailView: React.FC<CompetitionDetailViewProps> = ({
  competition,
  onBack,
  onRegister
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'categories' | 'dossier' | 'timeline' | 'cost' | 'faq'>('overview');

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Top Breadcrumb & Back bar */}
      <div style={{ background: 'rgba(3, 10, 23, 0.7)', borderBottom: '1px solid var(--color-border)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button 
            className="btn btn-sm btn-ghost" 
            onClick={onBack}
            style={{ color: 'var(--color-text-muted)' }}
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang chủ</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-dim)' }}>
            <span>Trang chủ</span>
            <ChevronRight size={14} />
            <span>Cuộc thi</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-gold-bright)', fontWeight: 600 }}>{competition.code}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner for Competition Detail (matching 8.png top middle) */}
      <div style={{
        background: 'radial-gradient(ellipse at 50% 20%, rgba(19, 59, 190, 0.4) 0%, rgba(7, 21, 69, 0.96) 65%, #03081c 100%)',
        borderBottom: '1px solid var(--color-border)',
        padding: '50px 0 40px',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
            {/* Left: Flag & Title */}
            <div style={{ maxWidth: '750px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '48px', lineHeight: 1 }}>{competition.flag_emoji}</span>
                <div>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 800, 
                    color: 'var(--color-gold-bright)', 
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    {competition.country}
                  </div>
                  <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, lineHeight: 1.2 }}>
                    {competition.title}
                  </h1>
                </div>
              </div>

              {/* Meta pills */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text-light)' }}>
                  <MapPin size={16} color="#60A5FA" />
                  <span>{competition.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-gold-bright)' }}>
                  <Calendar size={16} />
                  <span>Hạn đăng ký: <strong>{competition.deadline}</strong></span>
                </div>
                <div className="badge badge-open">
                  <span className="pulse-dot" />
                  ĐANG MỞ ĐƠN SƠ TUYỂN
                </div>
              </div>
            </div>

            {/* Right: Registration Action Card */}
            <div>
              <button 
                className="btn btn-lg btn-gold"
                style={{ fontSize: '16px', padding: '16px 36px', boxShadow: '0 8px 30px var(--color-gold-glow)' }}
                onClick={() => onRegister(competition.code)}
              >
                <span>ĐĂNG KÝ THAM GIA NGAY →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Content Section with Navigation Tabs */}
      <div className="container" style={{ marginTop: '36px' }}>
        {/* Tabs Bar */}
        <div className="tabs-header" style={{ marginBottom: '32px' }}>
          <button 
            className={`tab-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            TỔNG QUAN
          </button>
          <button 
            className={`tab-item ${activeTab === 'eligibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('eligibility')}
          >
            ĐIỀU KIỆN
          </button>
          <button 
            className={`tab-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            LĨNH VỰC
          </button>
          <button 
            className={`tab-item ${activeTab === 'dossier' ? 'active' : ''}`}
            onClick={() => setActiveTab('dossier')}
          >
            HỒ SƠ
          </button>
          <button 
            className={`tab-item ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            TIMELINE
          </button>
          <button 
            className={`tab-item ${activeTab === 'cost' ? 'active' : ''}`}
            onClick={() => setActiveTab('cost')}
          >
            CHI PHÍ
          </button>
          <button 
            className={`tab-item ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid-2">
            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--color-gold-bright)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} />
                Giới thiệu cuộc thi {competition.code}
              </h3>
              <p style={{ color: 'var(--color-text-light)', lineHeight: 1.8, marginBottom: '20px' }}>
                {competition.description}
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                Đoàn Việt Nam do Viện Nghiên Cứu Đổi Mới Sáng Tạo (RIVA) trực tiếp hướng dẫn và dẫn đoàn đã liên tục 
                gặt hái nhiều Huy chương Vàng, cúp đặc biệt từ các Hiệp hội Sáng chế quốc tế và nhận được sự đánh giá cao từ 
                các giáo sư tại Đại học Stanford, UC Berkeley.
              </p>

              <div style={{ marginTop: '28px', padding: '18px', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '12px', border: '1px solid var(--color-border-gold)' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-gold-bright)', marginBottom: '6px' }}>
                  🏆 Quyền lợi khi đạt giải:
                </div>
                <ul style={{ paddingLeft: '20px', color: 'var(--color-text-light)', fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Huy chương và Bằng chứng nhận quốc tế có giá trị toàn cầu</li>
                  <li>Cộng điểm và làm đẹp hồ sơ ứng tuyển học bổng du học Mỹ, Canada, Châu Âu</li>
                  <li>Cơ hội kết nối quỹ đầu tư mạo hiểm Thung lũng Silicon</li>
                </ul>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'white' }}>
                Thông số tổ chức
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>Cơ quan bảo trợ:</div>
                  <div style={{ fontWeight: 700, color: 'white', marginTop: '4px' }}>{competition.organizer}</div>
                </div>

                <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>Địa điểm triển lãm:</div>
                  <div style={{ fontWeight: 700, color: 'white', marginTop: '4px' }}>{competition.location}</div>
                </div>

                <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>Thời gian diễn ra:</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-gold-bright)', marginTop: '4px' }}>{competition.event_date}</div>
                </div>

                <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>Quy chế đoàn Việt Nam:</div>
                  <div style={{ fontWeight: 700, color: '#60A5FA', marginTop: '4px' }}>Tập huấn trước xuất cảnh & Trực tiếp hỗ trợ xin Visa</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Eligibility */}
        {activeTab === 'eligibility' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Đối tượng & Điều kiện tham gia</h3>
            <div className="grid-3" style={{ gap: '20px' }}>
              <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>👨‍🎓</div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Học sinh THCS & THPT</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Học sinh từ 12 - 18 tuổi có đề tài sáng chế kỹ thuật, ứng dụng phần mềm hoặc nghiên cứu khoa học tự nhiên.
                </p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>🏛️</div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Sinh viên Đại học</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Sinh viên các trường đại học, viện nghiên cứu có dự án khởi nghiệp công nghệ, giải pháp kỹ thuật có nguyên mẫu.
                </p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>🌐</div>
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Hình thức tham dự</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Có thể tham gia theo hình thức <strong>Trực tiếp (On-site)</strong> tại Hoa Kỳ hoặc <strong>Trực tuyến (Online Hybrid)</strong> nếu vướng lịch học.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Categories */}
        {activeTab === 'categories' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Các lĩnh vực dự thi hợp lệ</h3>
            <div className="grid-2" style={{ gap: '16px' }}>
              {[
                { title: 'Trí tuệ nhân tạo (AI) & Máy học', desc: 'Các thuật toán thị giác máy tính, NLP, mô hình dự báo phục vụ đời sống' },
                { title: 'Robot & Tự động hóa', desc: 'Drone cứu hộ, cánh tay robot y tế, xe tự hành, thiết bị IoT điều khiển' },
                { title: 'Năng lượng xanh & Môi trường', desc: 'Xử lý rác thải, pin sinh học, vật liệu nano lọc nước, tái chế tuần hoàn' },
                { title: 'Y sinh & Chăm sóc sức khỏe', desc: 'Thiết bị hỗ trợ người khuyết tật, dược liệu sinh học, ứng dụng theo dõi sức khỏe' },
                { title: 'STEM & Công nghệ giáo dục', desc: 'Phần mềm học tập, thiết bị tương tác mô phỏng kiến thức khoa học' },
                { title: 'Nông nghiệp thông minh', desc: 'Cảm biến giám sát thổ nhưỡng, hệ thống tưới tự động vi khí hậu' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px' }}>
                  <CheckCircle2 size={20} color="var(--color-gold-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Dossier / Requirements */}
        {activeTab === 'dossier' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Hồ sơ cần chuẩn bị</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {(competition.requirements || [
                'Bản tóm tắt nghiên cứu (Abstract) bằng tiếng Anh từ 300 - 500 từ',
                'Poster kích thước A0 (RIVA hỗ trợ chuẩn hóa thiết kế quốc tế)',
                'Video giới thiệu sản phẩm tối đa 3 phút (thuyết minh tiếng Anh)',
                'Mô hình vật lý / Nguyên mẫu hoạt động / Mã nguồn phần mềm'
              ]).map((req, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>
                    {i + 1}
                  </div>
                  <span style={{ color: 'var(--color-text-light)', fontSize: '15px' }}>{req}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Timeline */}
        {activeTab === 'timeline' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '24px' }}>Lộ trình các mốc thời gian (Timeline)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(competition.timeline || [
                { step: '01', title: 'Mở cổng nộp hồ sơ sơ tuyển', desc: 'Thí sinh đăng ký qua website RIVA, hội đồng thẩm định tính mới của đề tài', date: '01/01/2027' },
                { step: '02', title: 'Cố vấn chuyên môn & Thử nghiệm', desc: 'Chuyên gia RIVA hỗ trợ tối ưu Poster, tập dượt thuyết trình tiếng Anh', date: '15/04/2027' },
                { step: '03', title: 'Hoàn tất thủ tục BTC Quốc tế & Visa', desc: 'Nộp danh sách chính thức cho ban tổ chức tại Mỹ, tập huấn phỏng vấn visa', date: '15/06/2027' },
                { step: '04', title: 'Tranh tài tại Silicon Valley', desc: 'Thuyết trình trước ban giám khảo quốc tế tại California, tham quan Đại học Stanford', date: '12/08/2027' }
              ]).map((tl, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, #FFDE43, #F0F2C0)', 
                    color: '#03081c',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0
                  }}>
                    {tl.step}
                  </div>
                  <div style={{ flex: 1, paddingBottom: '18px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '17px', color: 'white' }}>{tl.title}</h4>
                      <span className="badge badge-gold">{tl.date}</span>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>{tl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Cost */}
        {activeTab === 'cost' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>Chi phí & Chính sách học bổng</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: 1.7 }}>
              RIVA cam kết hỗ trợ tối đa thí sinh Việt Nam với chi phí minh bạch, có chính sách tài trợ theo chất lượng đề tài:
            </p>
            <div className="grid-2">
              <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ color: 'var(--color-gold-bright)', marginBottom: '8px' }}>Gói Trực tiếp (On-site tại Mỹ)</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Bao gồm: Lệ phí thi của ban tổ chức Mỹ, gian hàng triển lãm, xe đưa đón theo đoàn tại California, 
                  khách sạn tiêu chuẩn, thư mời bảo lãnh xin visa B1/B2 và chuyến thăm Đại học Stanford.
                </p>
              </div>

              <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <h4 style={{ color: '#60A5FA', marginBottom: '8px' }}>Gói Trực tuyến (Hybrid Online)</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Dành cho thí sinh không thu xếp xuất cảnh được: Trưng bày poster tại gian hàng đoàn RIVA tại Silicon Valley, 
                  phỏng vấn ban giám khảo trực tuyến qua Zoom, huy chương gửi về qua đường ngoại giao.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: FAQ */}
        {activeTab === 'faq' && (
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Câu hỏi thường gặp</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { q: 'Học sinh chưa có ý tưởng hoàn chỉnh thì có đăng ký được không?', a: 'Hoàn toàn được! RIVA có chương trình RIVA Innovation Mentoring để ươm mầm từ giai đoạn phát triển ý tưởng ban đầu.' },
                { q: 'Tiếng Anh của em ở mức cơ bản thì có thể đi thi không?', a: 'Được. RIVA có đội ngũ chuyên gia phiên dịch và tập huấn thuyết trình chuẩn quốc tế trước khi lên đường.' },
                { q: 'Đề tài có cần phải đăng ký bản quyền trước khi đi thi không?', a: 'RIVA sẽ hỗ trợ tư vấn các bước đăng ký sở hữu trí tuệ cơ sở để bảo hộ ý tưởng trước khi công bố ra quốc tế.' }
              ].map((faq, i) => (
                <div key={i} style={{ padding: '16px 20px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 700, color: 'white', marginBottom: '6px' }}>❓ {faq.q}</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>👉 {faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
