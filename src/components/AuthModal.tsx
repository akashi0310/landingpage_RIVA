import React, { useState } from 'react';
import { X, Sparkles, Eye, EyeOff, Lock, Mail, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; role: 'student' | 'admin' }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSupabaseConfigured && supabase) {
        if (mode === 'login') {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          const isAdmin = email.includes('admin');
          onLoginSuccess({
            name: data.user?.user_metadata?.full_name || (isAdmin ? 'Ban Quản Trị RIVA' : 'Nguyễn Văn A'),
            role: isAdmin ? 'admin' : 'student'
          });
        } else {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } }
          });
          if (error) throw error;
          alert('Tạo tài khoản RIVA ID thành công! Đang chuyển hướng vào hệ thống.');
          onLoginSuccess({ name: fullName || 'Thí Sinh Mới', role: 'student' });
        }
      } else {
        // Local simulation login
        setTimeout(() => {
          const isAdmin = email.toLowerCase().includes('admin');
          onLoginSuccess({
            name: fullName || (isAdmin ? 'Ban Quản Trị RIVA' : 'Nguyễn Văn A'),
            role: isAdmin ? 'admin' : 'student'
          });
          onClose();
        }, 400);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Xác thực không thành công. Hãy thử tài khoản demo bên dưới!');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: 'student' | 'admin') => {
    if (role === 'student') {
      setEmail('nguyenvana@gmail.com');
      setPassword('riva123456');
      onLoginSuccess({ name: 'Nguyễn Văn A', role: 'student' });
      onClose();
    } else {
      setEmail('admin@riva.global');
      setPassword('admin123456');
      onLoginSuccess({ name: 'Ban Quản Trị RIVA', role: 'admin' });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        style={{ maxWidth: '440px', padding: '36px 32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header (Matching 8.png top right: Đăng nhập Portal) */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px'
          }}>
            <img 
              src={`${import.meta.env.BASE_URL}logo-riva.png`}
              alt="Logo RIVA" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 12px rgba(255, 222, 67, 0.45))'
              }}
            />
          </div>

          <div style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '0.12em', color: 'white', marginBottom: '4px' }}>
            RIVA GLOBAL
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'white' }}>
            {mode === 'login' ? 'Đăng nhập Portal' : 'Tạo tài khoản RIVA ID'}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Cổng tiếp nhận hồ sơ & quản lý nghiên cứu khoa học
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div style={{ padding: '10px 14px', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)', borderRadius: '8px', color: '#f87171', fontSize: '12px', marginBottom: '16px' }}>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Họ và tên thí sinh</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                />
                <User size={16} color="var(--color-text-dim)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                required
                className="form-input" 
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '38px' }}
              />
              <Mail size={16} color="var(--color-text-dim)" style={{ position: 'absolute', left: '12px', top: '13px' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <a href="#forgot" style={{ fontSize: '12px', color: 'var(--color-gold-bright)' }}>
                Quên mật khẩu?
              </a>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', padding: '13px', marginBottom: '16px' }}
            disabled={loading}
          >
            <span>{loading ? 'Đang xử lý...' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}</span>
          </button>
        </form>

        {/* Quick Demo Credentials Box */}
        <div style={{
          marginTop: '16px',
          padding: '14px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px dashed var(--color-border)',
          borderRadius: '10px'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--color-gold-bright)', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
            ⚡ TRẢI NGHIỆM NHANH KHÔNG CẦN NHẬP PHÍM:
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              type="button" 
              className="btn btn-sm btn-outline" 
              style={{ flex: 1, fontSize: '11px' }}
              onClick={() => fillDemo('student')}
            >
              👨‍🎓 Thí sinh Demo
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-outline" 
              style={{ flex: 1, fontSize: '11px' }}
              onClick={() => fillDemo('admin')}
            >
              🛡️ Admin Demo
            </button>
          </div>
        </div>

        {/* Switch mode */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
          {mode === 'login' ? (
            <>
              Chưa có tài khoản?{' '}
              <button 
                type="button"
                onClick={() => setMode('register')}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-gold-bright)', fontWeight: 700, cursor: 'pointer' }}
              >
                Đăng ký ngay
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?{' '}
              <button 
                type="button"
                onClick={() => setMode('login')}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-gold-bright)', fontWeight: 700, cursor: 'pointer' }}
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
