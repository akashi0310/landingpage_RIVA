import React, { useState } from 'react';
import { Globe2, MapPin, Award, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';

export const GlobalNetwork: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      country: '🇺🇸 Hoa Kỳ (Silicon Valley)',
      competition: 'SVIIF 2026',
      headline: 'Đoàn Việt Nam giành 02 Huy Chương Vàng tại Trung tâm Santa Clara',
      desc: 'Dự án AI phát hiện vi nhựa trong nước của học sinh THPT Chuyên Hà Nội - Amsterdam xuất sắc vượt qua hơn 300 phát minh quốc tế, nhận được thư khen ngợi từ Hội đồng IFIA.',
      stat: '02 HCV • 01 Giải WIPO',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
    },
    {
      country: '🇩🇪 CHLB Đức (Nuremberg)',
      competition: 'iENA 2026',
      headline: 'Vật liệu nano sinh học tạo tiếng vang lớn tại Triển lãm Nuremberg',
      desc: 'Nhóm học sinh THPT Chuyên Lê Hồng Phong TP.HCM mang đến giải pháp vật liệu phân hủy sinh học từ vỏ tôm, được các doanh nghiệp Đức ký biên bản ghi nhớ hợp tác thử nghiệm.',
      stat: '01 HCV • Best Green Tech',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
    },
    {
      country: '🇨🇭 Thụy Sĩ (Geneva)',
      competition: 'Geneva Inventions 2026',
      headline: 'Chiến thắng vang dội tại Đấu trường Sáng chế Lớn nhất Hành tinh',
      desc: '04 đề tài khoa học của đoàn RIVA đạt tỷ lệ giải thưởng 100%, ghi dấu ấn trí tuệ Việt Nam trên bục vinh quang Palexpo Geneva trước hàng ngàn chuyên gia toàn cầu.',
      stat: '04 HCV • 02 Đặc Biệt',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80'
    },
    {
      country: '🇹🇭 Thái Lan (Bangkok)',
      competition: 'IPITEX 2026',
      headline: 'Đoàn 15 nhà sáng chế trẻ Việt Nam hội tụ tại BITEC Bangna',
      desc: 'Các giải pháp UAV cứu hộ và mô hình pin sinh học của sinh viên Bách Khoa và học sinh chuyên Chuyên KHTN gây ấn tượng mạnh với ban giám khảo NRCT.',
      stat: '03 HCV • 05 HCB',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <Globe2 size={14} />
            <span>MẠNG LƯỚI TOÀN CẦU (GLOBAL NETWORK)</span>
          </div>
          <h2 className="section-title">
            DẤU ẤN TRÍ TUỆ VIỆT NAM TRÊN BẢN ĐỒ THẾ GIỚI
          </h2>
          <p className="section-desc">
            Từ Hà Nội và TP.HCM đến Thung lũng Silicon, Nuremberg và Geneva — RIVA đồng hành cùng thế hệ trẻ mở rộng tầm nhìn toàn cầu.
          </p>
        </div>

        {/* 2 Column Card: Global Interactive Map visual + Global Stories */}
        <div className="grid-2" style={{ gap: '28px' }}>
          {/* Left: Global Hubs Network Card */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Mạng lưới kết nối RIVA</h3>
                <span className="badge badge-blue">18+ Quốc gia đối tác</span>
              </div>

              {/* Network Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { region: 'Bắc Mỹ (North America)', hubs: 'Silicon Valley, Boston, Washington D.C.', focus: 'AI & Venture Tech' },
                  { region: 'Tây Âu (Western Europe)', hubs: 'Geneva (Thụy Sĩ), Nuremberg (Đức), Paris (Pháp)', focus: 'Invention & WIPO' },
                  { region: 'Đông Á & ASEAN', hubs: 'Bangkok (Thái Lan), Seoul (Hàn Quốc), Tokyo (Nhật Bản)', focus: 'Youth STEM' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-gold-bright)', fontSize: '14px' }}>{item.region}</span>
                      <span style={{ fontSize: '11px', color: 'var(--color-sky)' }}>{item.focus}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>
                      📍 Các điểm đến chính: {item.hubs}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(201, 162, 39, 0.1)',
              borderRadius: '10px',
              border: '1px solid var(--color-border-gold)',
              fontSize: '13px',
              color: 'var(--color-text-light)'
            }}>
              🤝 <strong>Cam kết quốc tế:</strong> 100% hồ sơ đoàn thi do RIVA dẫn đoàn đều được Ban tổ chức quốc tế cấp giấy mời chính thức và hỗ trợ thị thực ưu tiên.
            </div>
          </div>

          {/* Right: Global Stories Carousel/List */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Câu chuyện toàn cầu (Global Stories)</h3>
              <span className="badge badge-gold">Vinh danh quốc tế</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stories.map((st, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveStory(i)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activeStory === i ? 'rgba(20, 110, 245, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: activeStory === i ? '1px solid var(--color-primary)' : '1px solid transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: activeStory === i ? 'var(--color-gold-bright)' : 'white' }}>
                      {st.country} — {st.competition}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-success)' }}>
                      {st.stat}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {st.headline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
