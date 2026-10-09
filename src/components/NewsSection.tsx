import React from 'react';
import { Newspaper, Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const news = [
    {
      title: 'Đoàn học sinh Việt Nam xuất sắc lập kỷ lục tại SVIIF Thung Lũng Silicon 2026',
      date: '28/09/2026',
      category: 'KẾT QUẢ THI ĐẤU',
      desc: 'Với 04 đề tài sáng tạo trong lĩnh vực AI và vật liệu mới, đoàn RIVA đã xuất sắc giành trọn 04 Huy chương Vàng và 01 Giải Đặc biệt từ WIPO.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Khởi động chương trình ươm mầm tài năng NCKH mùa giải 2027 cùng chuyên gia quốc tế',
      date: '02/10/2026',
      category: 'ĐÀO TẠO & TẬP HUẤN',
      desc: 'Hội đồng chuyên môn RIVA chính thức mở đợt tuyển chọn học sinh, sinh viên có đam mê nghiên cứu để đồng hành huấn luyện từ tháng 10.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Bí quyết xây dựng đề tài NCKH chuẩn quốc tế và kỹ năng trả lời ban giám khảo nước ngoài',
      date: '05/10/2026',
      category: 'CẨM NANG NGHIÊN CỨU',
      desc: 'Chia sẻ từ các quán quân giải Vàng: Làm thế nào để trình bày ý tưởng phức tạp một cách rõ ràng, thuyết phục ban giám khảo quốc tế trong 3 phút.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section id="news" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <Newspaper size={14} />
            <span>TIN TỨC & SỰ KIỆN (NEWS & MEDIA)</span>
          </div>
          <h2 className="section-title">
            CẬP NHẬT TỪ ĐẤU TRƯỜNG KHOA HỌC QUỐC TẾ
          </h2>
          <p className="section-desc">
            Thông tin mới nhất về các sân chơi sáng tạo, lịch thi đấu và hoạt động tập huấn của Viện RIVA.
          </p>
        </div>

        <div className="grid-3">
          {news.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-card glass-card-interactive"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="badge badge-gold" style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '10px' }}>
                  {item.category}
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-dim)', marginBottom: '8px' }}>
                    <Calendar size={13} />
                    <span>{item.date}</span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.4, marginBottom: '10px', color: 'white' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                  <button className="btn btn-sm btn-ghost" style={{ padding: 0, color: 'var(--color-sky)', gap: '6px' }}>
                    <span>Đọc chi tiết</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
