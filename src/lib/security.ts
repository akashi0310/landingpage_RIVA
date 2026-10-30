/**
 * RIVA Security & Authentication Utilities
 * Handles cryptographic hashing, brute-force protection, and input sanitization.
 */

const ADMIN_HASH_KEY = 'riva_admin_pin_hash';
const LOGIN_ATTEMPTS_KEY = 'riva_admin_login_attempts';
const LOGIN_LOCKOUT_KEY = 'riva_admin_lockout_until';

// Pre-computed Cryptographic SHA-256 Hashes for Authorized Admin Access (Irreversible)
const DEFAULT_HASHES = [
  'be61b37b9feaf91396aef8c3ce630bb4bfee50c197c1c93d2a90eecb350728cd',
  '2a93691216965d39935438f3da24ca2d8b6cc191974f182a89f9b0376d45207e',
  'eb907a56cda1ec00e833b579c2d56390978567435ace3548b687fd84158e5760',
  'd8b6ffe741790c1fb6dcef90163a306e31a21e085ca0a4312de1577a4493470e'
];

/**
 * Hash a plain text string with SHA-256
 */
export async function sha256(message: string): Promise<string> {
  if (!message) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(message.trim());
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback simple hash if Web Crypto API is unavailable
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Check if login is currently locked due to too many failed attempts
 */
export function getLoginLockoutStatus(): { isLocked: boolean; remainingSeconds: number } {
  try {
    const lockoutUntil = parseInt(localStorage.getItem(LOGIN_LOCKOUT_KEY) || '0', 10);
    const now = Date.now();
    if (lockoutUntil > now) {
      const remainingSeconds = Math.ceil((lockoutUntil - now) / 1000);
      return { isLocked: true, remainingSeconds };
    }
  } catch (_) {}
  return { isLocked: false, remainingSeconds: 0 };
}

/**
 * Record a failed login attempt and trigger a 60s lockout if attempts >= 5
 */
export function recordFailedAttempt(): { isLocked: boolean; remainingSeconds: number } {
  try {
    const current = parseInt(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0', 10) + 1;
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, current.toString());

    if (current >= 5) {
      const lockoutTime = Date.now() + 60 * 1000; // 60s
      localStorage.setItem(LOGIN_LOCKOUT_KEY, lockoutTime.toString());
      localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
      return { isLocked: true, remainingSeconds: 60 };
    }
  } catch (_) {}
  return { isLocked: false, remainingSeconds: 0 };
}

/**
 * Reset failed attempts upon successful login
 */
export function resetLoginAttempts(): void {
  try {
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    localStorage.removeItem(LOGIN_LOCKOUT_KEY);
  } catch (_) {}
}

/**
 * Verify admin password against stored hash or default hashes
 */
export async function verifyAdminPassword(inputPassword: string): Promise<{ success: boolean; error?: string }> {
  const lockout = getLoginLockoutStatus();
  if (lockout.isLocked) {
    return { 
      success: false, 
      error: `Hệ thống tạm khóa do nhập sai nhiều lần. Vui lòng thử lại sau ${lockout.remainingSeconds} giây!` 
    };
  }

  if (!inputPassword || inputPassword.trim().length === 0) {
    return { success: false, error: 'Vui lòng nhập mật khẩu quản trị!' };
  }

  const inputHash = await sha256(inputPassword);
  const customHash = localStorage.getItem(ADMIN_HASH_KEY);

  let isMatch = false;
  if (customHash) {
    isMatch = customHash === inputHash;
  } else {
    isMatch = DEFAULT_HASHES.includes(inputHash);
  }

  if (isMatch) {
    resetLoginAttempts();
    return { success: true };
  }

  const newLockout = recordFailedAttempt();
  if (newLockout.isLocked) {
    return { 
      success: false, 
      error: 'Bạn đã nhập sai 5 lần liên tiếp. Cổng đăng nhập tạm thời bị khóa 60 giây để bảo vệ an toàn!' 
    };
  }

  return { success: false, error: 'Mật khẩu quản trị viên không chính xác. Vui lòng kiểm tra lại!' };
}

/**
 * Set a new admin password (hashed before saving to localStorage)
 */
export async function setAdminPassword(newPassword: string): Promise<{ success: boolean; message: string }> {
  if (!newPassword || newPassword.trim().length < 6) {
    return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự để đảm bảo an toàn!' };
  }

  const hash = await sha256(newPassword);
  localStorage.setItem(ADMIN_HASH_KEY, hash);
  return { success: true, message: 'Đổi mật khẩu quản trị viên thành công!' };
}

/**
 * Validate and sanitize URLs to prevent javascript: or malicious protocol injection
 */
export function isSafeUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  
  // Disallowed schemes
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('vbscript:') || trimmed.startsWith('data:text/html')) {
    return false;
  }
  
  // Allowed schemes
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('mailto:')
  );
}

/**
 * Sanitize URL with safe fallback
 */
export function sanitizeUrl(url?: string, fallback: string = ''): string {
  if (!url) return fallback;
  return isSafeUrl(url) ? url.trim() : fallback;
}

/**
 * Sanitize user text to prevent XSS and tag injection
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}
