import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';

interface FloatingConsultationButtonProps {
  onConsultClick: () => void;
}

export const FloatingConsultationButton: React.FC<FloatingConsultationButtonProps> = ({
  onConsultClick
}) => {
  // Xử lý click: điều hướng đến cổng tư vấn, cuộn mượt và highlight form
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onConsultClick();

    // Tự động focus vào input họ tên và tạo hiệu ứng viền vàng cho form
    setTimeout(() => {
      const formEl = document.querySelector<HTMLElement>('#register-lead .lead-consult-wrapper');
      if (formEl) {
        formEl.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        formEl.style.boxShadow = '0 0 45px rgba(255, 222, 67, 0.75), 0 20px 50px rgba(0, 0, 0, 0.8)';
        formEl.style.borderColor = 'var(--color-gold-bright)';
        setTimeout(() => {
          formEl.style.boxShadow = '';
          formEl.style.borderColor = '';
        }, 2500);
      }

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
        title="Bấm để chuyển nhanh đến Cổng Tư Vấn Tuyển Chọn RIVA (Phụ huynh & Thí sinh)"
      >
        {/* Hiệu ứng sóng radar tỏa ra phía sau nút */}
        <span className="floating-consult-radar-halo" aria-hidden="true" />

        <div className="floating-consult-icon-box">
          <Sparkles size={22} fill="#00004D" color="#00004D" />
        </div>

        <div className="floating-consult-text-group">
          <div className="floating-consult-title">TƯ VẤN HỒ SƠ 1-ON-1</div>
          <div className="floating-consult-sub">Phụ huynh & Thí sinh • Nhận tư vấn ngay</div>
        </div>

        <div className="floating-consult-arrow">
          <ArrowRight size={16} color="#00004D" strokeWidth={2.5} />
        </div>
      </button>
    </aside>
  );
};
