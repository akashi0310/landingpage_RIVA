import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Sparkles, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password or simple check
    if (password === 'admin' || password === '123456' || password === 'riva2027' || password.trim() === '') {
      onSuccess();
      onClose();
    } else {
      setError('Mật khẩu không đúng. Gợi ý: admin hoặc 123456');
    }
  };

  const handleInstantLogin = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1300 }}>
      <div 
        className="modal-content"
        style={{
          maxWidth: '420px',
          padding: '32px 28px',
          background: 'radial-gradient(ellipse at top, #0e205c 0%, #050d26 100%)',
          border: '1px solid rgba(204, 153, 0, 0.45)',
          borderRadius: '18px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(204, 153, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(204, 153, 0, 0.16)',
            color: 'var(--color-gold-bright)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px',
            border: '1px solid rgba(204, 153, 0, 0.35)'
          }}>
            <ShieldCheck size={28} />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'white', marginBottom: '4px' }}>
            Cổng Quản Trị RIVA
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Xác thực quyền quản trị viên để cập nhật bài viết, hotline và hồ sơ tuyển sinh
          </p>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#f87171', fontSize: '12px', marginBottom: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Mật khẩu Quản trị</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password"
                className="form-input"
                placeholder="Nhập mật khẩu (hoặc để trống)..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                style={{ paddingLeft: '38px' }}
              />
              <Lock size={16} color="var(--color-text-dim)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            <span>Đăng nhập Quản Trị</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button 
            type="button" 
            onClick={handleInstantLogin}
            className="btn btn-sm btn-ghost"
            style={{ color: 'var(--color-sky)', fontSize: '12px', gap: '4px' }}
          >
            <Sparkles size={13} />
            <span>Vào nhanh với quyền Admin (Bỏ qua mật khẩu)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
