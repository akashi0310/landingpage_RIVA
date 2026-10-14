export interface MapDestination {
  id: string;
  code: string;
  title: string;
  shortName: string;
  country: string;
  countryCode: string;
  city: string;
  flag: string;
  status: 'open' | 'upcoming' | 'reviewing';
  statusLabel: string;
  statusColor: string;
  continent: 'north-america' | 'europe' | 'asia' | 'latin-america' | 'oceania';
  coords: { x: number; y: number };
  badgePlacement: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  badgeStyleMobile?: { top?: string; bottom?: string; left?: string; right?: string };
}

// Tọa độ TRUNG TÂM ĐIỀU PHỐI RIVA VIỆT NAM (Hub gốc)
export const VIETNAM_HUB = {
  name: 'RIVA VIỆT NAM',
  subtitle: 'Trụ sở điều phối quốc gia',
  coords: { x: 742, y: 226 },
  country: 'Việt Nam',
  flag: '🇻🇳',
  color: '#FFDE43'
};

/**
 * DANH SÁCH CÁC KỲ THI QUỐC TẾ TRÊN BẢN ĐỒ
 * =========================================================================
 * Khi có thêm kỳ thi của bất kỳ quốc gia nào khác trong tương lai:
 * CHỈ CẦN THÊM 1 PHẦN TỬ VÀO MẢNG NÀY!
 * Hệ thống sẽ TỰ ĐỘNG:
 * 1. Tính toán đường bay hình cánh cung (Bezier flight arc) nối từ Việt Nam sang quốc gia đó.
 * 2. Vẽ luồng ánh sáng di chuyển (photon flow animation) trên đường nối.
 * 3. Tạo điểm Node radar phát xung tại vị trí mảng đất của quốc gia đó.
 * 4. Hiển thị thẻ thông tin (Badge) với cờ, tên kỳ thi, trạng thái tuyển chọn.
 * =========================================================================
 */
export const MAP_COMPETITIONS: MapDestination[] = [
  {
    id: 'sviif',
    code: 'SVIIF',
    title: 'SVIIF 2027 • SILICON VALLEY',
    shortName: 'SVIIF Mỹ',
    country: 'Hoa Kỳ',
    countryCode: 'US',
    city: 'Silicon Valley, California',
    flag: '🇺🇸',
    status: 'open',
    statusLabel: '🟢 Đang mở đơn sơ tuyển',
    statusColor: '#34D399',
    continent: 'north-america',
    coords: { x: 175, y: 135 },
    badgePlacement: 'top'
  },
  {
    id: 'iena',
    code: 'IENA',
    title: 'iENA 2027 • ĐỨC',
    shortName: 'iENA Đức',
    country: 'Cộng hòa Liên bang Đức',
    countryCode: 'DE',
    city: 'Nuremberg',
    flag: '🇩🇪',
    status: 'upcoming',
    statusLabel: '🟡 Sắp mở đơn',
    statusColor: '#FFDE43',
    continent: 'europe',
    coords: { x: 508, y: 118 },
    badgePlacement: 'top'
  },
  {
    id: 'geneva',
    code: 'GENEVA',
    title: 'GENEVA 2027 • THỤY SĨ',
    shortName: 'Geneva Thụy Sĩ',
    country: 'Thụy Sĩ',
    countryCode: 'CH',
    city: 'Geneva',
    flag: '🇨🇭',
    status: 'open',
    statusLabel: '🟢 Đang mở đơn',
    statusColor: '#34D399',
    continent: 'europe',
    coords: { x: 485, y: 135 },
    badgePlacement: 'bottom-left'
  },
  {
    id: 'ipitex',
    code: 'IPITEX',
    title: 'IPITEX 2027 • BANGKOK',
    shortName: 'IPITEX Thái Lan',
    country: 'Thái Lan',
    countryCode: 'TH',
    city: 'Bangkok',
    flag: '🇹🇭',
    status: 'open',
    statusLabel: '🟢 Đang mở đơn',
    statusColor: '#34D399',
    continent: 'asia',
    // Bangkok nằm ở Tây Nam so với Hà Nội: x: 708, y: 242 (Việt Nam là x: 742, y: 226)
    coords: { x: 708, y: 242 },
    // Đặt thẻ ở hướng Tây Nam lệch hẳn sang trái, KHÔNG ĐÈ LÊN THẺ VIỆT NAM!
    badgePlacement: 'bottom-left'
  },
  {
    id: 'wico',
    code: 'WICO',
    title: 'WICO 2027 • SEOUL',
    shortName: 'WICO Hàn Quốc',
    country: 'Hàn Quốc',
    countryCode: 'KR',
    city: 'Seoul',
    flag: '🇰🇷',
    status: 'open',
    statusLabel: '🟢 Đang mở đơn',
    statusColor: '#34D399',
    continent: 'asia',
    coords: { x: 812, y: 148 },
    badgePlacement: 'top-right'
  },
  {
    id: 'intarg',
    code: 'INTARG',
    title: 'INTARG 2027 • BA LAN',
    shortName: 'INTARG Ba Lan',
    country: 'Ba Lan',
    countryCode: 'PL',
    city: 'Katowice',
    flag: '🇵🇱',
    status: 'upcoming',
    statusLabel: '🟡 Sắp mở đơn',
    statusColor: '#FFDE43',
    continent: 'europe',
    coords: { x: 532, y: 110 },
    badgePlacement: 'top-right'
  }
];
