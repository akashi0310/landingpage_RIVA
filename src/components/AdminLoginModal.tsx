import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, ArrowRight, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { verifyAdminPassword, getLoginLockoutStatus } from '../lib/security';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Check lockout status upon open and setup countdown timer
  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setError('');
      return;
    }

    const checkLockout = () => {
      const status = getLoginLockoutStatus();
      if (status.isLocked) {
        setLockoutSeconds(status.remainingSeconds);
      } else {
        setLockoutSeconds(0);
      }
    };

    checkLockout();
    const interval = setInterval(() => {
      setLockoutSeconds(prev => {
        if (prev <= 1) {
          checkLockout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0 || isSubmitting) return;

    setError('');
    setIsSubmitting(true);

    try {
      const result = await verifyAdminPassword(password);
      if (result.success) {
        setPassword('');
        setError('');
        onSuccess();
        onClose();
      } else {
        setError(result.error || 'Mật khẩu quản trị không đúng!');
        const status = getLoginLockoutStatus();
        if (status.isLocked) {
          setLockoutSeconds(status.remainingSeconds);
        }
      }
    } catch (err) {
      setError('Đã xảy ra lỗi khi kiểm tra bảo mật.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1300 }}>
      <div 
        className="modal-content"
        style={{
          maxWidth: '430px',
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
          aria-label="Đóng"
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
            Xác thực bảo mật dành riêng cho Quản trị viên Viện RIVA
          </p>
        </div>

        {lockoutSeconds > 0 ? (
          <div style={{
            padding: '16px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            borderRadius: '10px',
            color: '#f87171',
            fontSize: '13px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <AlertTriangle size={24} style={{ margin: '0 auto 8px', display: 'block' }} />
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>Tạm khóa cổng quản trị</div>
            <div>Nhập sai nhiều lần. Vui lòng đợi <strong>{lockoutSeconds}s</strong> trước khi thử lại.</div>
          </div>
        ) : error ? (
          <div style={{
            padding: '10px 14px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            color: '#f87171',
            fontSize: '12px',
            marginBottom: '16px',
            textAlign: 'center',
            lineHeight: 1.5
          }}>
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label">Mật khẩu Quản trị viên</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Nhập mật khẩu quản trị..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={lockoutSeconds > 0 || isSubmitting}
                autoFocus
                style={{ paddingLeft: '38px', paddingRight: '40px' }}
              />
              <Lock size={16} color="var(--color-text-dim)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-text-dim)',
                  cursor: 'pointer'
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '6px' }}>
              🔒 Mật khẩu được mã hóa an toàn và chỉ cung cấp cho người có thẩm quyền.
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-gold" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px', opacity: lockoutSeconds > 0 ? 0.6 : 1 }}
            disabled={lockoutSeconds > 0 || isSubmitting}
          >
            <span>{isSubmitting ? 'Đang xác thực...' : 'Đăng nhập Quản Trị'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>
            🔒 Mã hóa SHA-256 an toàn & Bảo vệ chống tấn công Brute-force
          </span>
        </div>
      </div>
    </div>
  );
};
