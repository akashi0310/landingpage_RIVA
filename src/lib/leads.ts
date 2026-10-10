import type { Lead } from '../types';

const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';
export const isLeadFormConfigured = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint);

export async function submitLead(lead: Lead, requestId: string, website: string) {
  if (!isLeadFormConfigured) throw new Error('Form đang được thiết lập. Vui lòng quay lại sau.');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25000);
  try {
    const body = new URLSearchParams({
      request_id: requestId, website, source: window.location.origin + window.location.pathname,
      full_name: lead.full_name.trim(), email: lead.email.trim(), phone: lead.phone.trim(),
      role: lead.role, school: lead.school?.trim() || '',
      interest_competition: lead.interest_competition || '',
      interest_field: lead.interest_field || '', message: lead.message?.trim() || '',
    });
    const response = await fetch(endpoint, { method: 'POST', body, signal: controller.signal, redirect: 'follow', credentials: 'omit' });
    if (!response.ok) throw new Error('Không thể gửi thông tin. Vui lòng thử lại.');
    const result = await response.json();
    if (result.ok !== true || result.request_id !== requestId) {
      throw new Error('Chưa thể xác nhận thông tin đã được lưu. Vui lòng kiểm tra thông tin và thử lại.');
    }
  } catch (error) {
    if (error instanceof TypeError || (error instanceof DOMException && error.name === 'AbortError')) {
      throw new Error('Chưa nhận được xác nhận. Vui lòng kiểm tra kết nối và thử gửi lại.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
