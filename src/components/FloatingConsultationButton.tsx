import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, MessageSquareCheck } from 'lucide-react';

interface FloatingConsultationButtonProps {
  onConsultClick: () => void;
}

export const FloatingConsultationButton: React.FC<FloatingConsultationButtonProps> = ({
  onConsultClick
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Xử lý click: gọi điều hướng đến cổng tư vấn và tự động focus vào input
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onConsultClick();

    // Tự động focus vào input họ tên trong form đăng ký sau khi cuộn tới
    setTimeout(() => {
      const nameInput = document.querySelector<HTMLInputElement>('#register-lead input[name="fullname"]') ||
                        document.querySelector<HTMLInputElement>('#register-lead input[type="text"]');
      if (nameInput) {
        nameInput.focus();
      }
    }, 450);
  };

  return (
    <aside 
      className="floating-consult-container"
      aria-label="Cổng tư vấn tuyển chọn và hồ sơ RIVA"
    >
      <button
        type="button"
        onClick={handleClick}
        className="floating-consult-btn"
        title="Bấm để chuyển nhanh đến Cổng Tư Vấn Tuyển Chọn RIVA"
      >
        {/* Hiệu ứng sóng radar tỏa ra phía sau nút */}
        <span className="floating-consult-radar-halo" aria-hidden="true" />

        <div className="floating-consult-icon-box">
          <Sparkles size={20} fill="#00004D" color="#00004D" />
        </div>

        <div className="floating-consult-text-group">
          <div className="floating-consult-title">TƯ VẤN HỒ SƠ</div>
          <div className="floating-consult-sub">Phụ huynh & Thí sinh</div>
        </div>

        <div className="floating-consult-arrow">
          <ArrowRight size={15} color="#00004D" />
        </div>
      </button>
    </aside>
  );
};
