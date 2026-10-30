import React from 'react';

interface CompetitionFlagProps {
  flag?: string; // Image URL, base64 data:image, country code like "US", "DE", or emoji
  countryCode?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Component hiển thị Quốc kỳ linh hoạt:
 * - Hỗ trợ ảnh cờ tải từ máy tính (data:image/...) hoặc URL
 * - Hỗ trợ mã chữ quốc gia dạng text (US, DE, VN, TH, CH...) kết hợp cờ & badge chữ
 * - Hỗ trợ fallback emoji truyền thống
 */
export const CompetitionFlag: React.FC<CompetitionFlagProps> = ({
  flag,
  countryCode,
  size = 'md',
  className = '',
  style = {}
}) => {
  const flagVal = (flag || countryCode || '').trim();

  // Kích thước hiển thị theo size
  const dims = size === 'sm' 
    ? { w: 22, h: 15, fontSize: '13px', badgeFont: '10px' }
    : size === 'lg'
    ? { w: 48, h: 32, fontSize: '32px', badgeFont: '14px' }
    : { w: 30, h: 20, fontSize: '20px', badgeFont: '11px' };

  if (!flagVal) {
    return <span style={{ fontSize: dims.fontSize, ...style }}>🌐</span>;
  }

  // 1. Trường hợp là đường dẫn ảnh hoặc ảnh nén tải từ máy tính (Base64 data URL / HTTP URL)
  if (flagVal.startsWith('http://') || flagVal.startsWith('https://') || flagVal.startsWith('data:image/')) {
    return (
      <img
        src={flagVal}
        alt="Quốc kỳ"
        className={className}
        style={{
          width: `${dims.w}px`,
          height: `${dims.h}px`,
          objectFit: 'cover',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          display: 'inline-block',
          verticalAlign: 'middle',
          flexShrink: 0,
          ...style
        }}
      />
    );
  }

  // 2. Trường hợp là mã chữ quốc gia như US, DE, VN, TH, CH, JP, FR... (2-4 ký tự chữ)
  const isLettersOnly = /^[a-zA-Z]{2,4}$/.test(flagVal);
  if (isLettersOnly) {
    const code = flagVal.toUpperCase();
    const cdnUrl = `https://flagcdn.com/w40/${flagVal.toLowerCase()}.png`;

    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          verticalAlign: 'middle',
          ...style
        }}
      >
        <img
          src={cdnUrl}
          alt={code}
          style={{
            width: `${dims.w}px`,
            height: `${dims.h}px`,
            objectFit: 'cover',
            borderRadius: '3px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.35)',
            display: 'inline-block',
            flexShrink: 0
          }}
          onError={(e) => {
            // Khi không tải được cờ CDN, ẩn thẻ ảnh để chỉ hiển thị chữ badge
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <span
          style={{
            fontSize: dims.badgeFont,
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: 'var(--color-gold-bright)',
            background: 'rgba(204, 153, 0, 0.16)',
            border: '1px solid rgba(204, 153, 0, 0.45)',
            padding: size === 'lg' ? '3px 8px' : '2px 6px',
            borderRadius: '4px',
            lineHeight: 1.2
          }}
        >
          {code}
        </span>
      </span>
    );
  }

  // 3. Fallback: Nếu là emoji quốc kỳ (🇺🇸, 🇩🇪...)
  return (
    <span
      className={className}
      style={{
        fontSize: dims.fontSize,
        lineHeight: 1,
        verticalAlign: 'middle',
        display: 'inline-block',
        ...style
      }}
    >
      {flagVal}
    </span>
  );
};

/**
 * Nén ảnh cờ quốc gia siêu nhỏ (< 15KB) để lưu trữ nhanh, không làm nặng database/localStorage
 */
export const compressFlagImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Vui lòng chọn tệp hình ảnh (.png, .jpg, .svg, .webp...)'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 120;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Dùng image/png để giữ độ trong suốt (transparency) nếu có
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export interface CompetitionFlagPickerProps {
  value: string; // flag_emoji (có thể là data:image, url, mã chữ 'US', 'DE', hoặc emoji)
  countryCode?: string;
  onChange: (newFlag: string, newCountryCode?: string) => void;
}

const POPULAR_COUNTRIES = [
  { code: 'US', name: 'Mỹ' },
  { code: 'DE', name: 'Đức' },
  { code: 'CH', name: 'Thụy Sĩ' },
  { code: 'TH', name: 'Thái Lan' },
  { code: 'PL', name: 'Ba Lan' },
  { code: 'VN', name: 'Việt Nam' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'JP', name: 'Nhật Bản' },
  { code: 'KR', name: 'Hàn Quốc' },
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'Pháp' },
  { code: 'GB', name: 'Anh' }
];

/**
 * Giao diện Admin cấu hình Quốc kỳ:
 * - Nhập mã chữ quốc gia như US, DE, VN, TH... (thay vì emoji)
 * - Tải ảnh quốc kỳ siêu nhỏ từ máy tính hoặc dán link ảnh
 * - Chọn nhanh các mã quốc gia phổ biến
 * - Xem trước trực tiếp giao diện thực tế
 */
export const CompetitionFlagPicker: React.FC<CompetitionFlagPickerProps> = ({
  value,
  countryCode,
  onChange
}) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const isImage = value.startsWith('data:image/') || value.startsWith('http://') || value.startsWith('https://');
  const letterCode = isImage ? (countryCode || 'US') : (value || countryCode || 'US');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await compressFlagImage(file);
      onChange(dataUrl, countryCode);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tải ảnh cờ');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClearImage = () => {
    onChange(countryCode || 'US', countryCode || 'US');
  };

  const handleCodeChange = (newCode: string) => {
    const cleaned = newCode.trim();
    if (isImage) {
      // Nếu đang dùng ảnh tùy chỉnh, chỉ cập nhật countryCode phụ trợ
      onChange(value, cleaned.toUpperCase());
    } else {
      // Cập nhật cả flag và countryCode
      onChange(cleaned.toUpperCase(), cleaned.toUpperCase());
    }
  };

  return (
    <div
      style={{
        background: 'rgba(5, 14, 38, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '14px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <label
          className="form-label"
          style={{
            marginBottom: 0,
            color: 'var(--color-gold-bright)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>🏳️ Định danh Quốc kỳ Cuộc thi</span>
        </label>

        {/* Live Preview badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <span style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>Hiển thị web:</span>
          <CompetitionFlag flag={value} countryCode={countryCode} size="md" />
        </div>
      </div>

      {/* Main Options Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
        {/* Option 1: Nhập mã chữ US, DE, VN... */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '5px' }}>
            1. Mã chữ quốc gia (như US, DE, VN, TH...)
          </div>
          <input
            type="text"
            className="form-input"
            placeholder="Ví dụ: US, DE, VN, TH, CH..."
            value={letterCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}
          />
        </div>

        {/* Option 2: Tải ảnh siêu nhỏ từ máy hoặc link */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '5px' }}>
            2. Hoặc tải ảnh cờ từ máy tính
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              style={{
                flex: 1,
                fontSize: '11px',
                padding: '8px 10px',
                borderColor: 'rgba(204, 153, 0, 0.45)',
                color: 'var(--color-gold-bright)',
                whiteSpace: 'nowrap'
              }}
            >
              {isUploading ? 'Đang nén ảnh...' : '📁 Tải ảnh cờ từ máy'}
            </button>
            {isImage && (
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={handleClearImage}
                style={{ fontSize: '11px', padding: '8px 10px', color: '#ef4444' }}
                title="Xóa ảnh và dùng lại mã chữ"
              >
                ✕ Xóa ảnh
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Select Preset Pills */}
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', marginBottom: '5px' }}>
          Gợi ý chọn nhanh mã chữ quốc gia:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {POPULAR_COUNTRIES.map((c) => {
            const isSelected = !isImage && letterCode.toUpperCase() === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c.code, c.code);
                }}
                style={{
                  fontSize: '11px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: isSelected ? '1px solid var(--color-gold-bright)' : '1px solid rgba(255, 255, 255, 0.12)',
                  background: isSelected ? 'rgba(204, 153, 0, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? 'var(--color-gold-bright)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.15s ease'
                }}
              >
                {c.code} ({c.name})
              </button>
            );
          })}
        </div>
      </div>

      {/* Hint Note */}
      <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '8px', lineHeight: 1.4 }}>
        💡 <em>Bạn không cần tìm emoji quốc kỳ. Chỉ cần nhập mã chữ 2 ký tự (ví dụ: US = Mỹ, DE = Đức, TH = Thái Lan...) hoặc tải ảnh cờ từ máy tính. Hệ thống sẽ tự động hiển thị cờ sắc nét trên toàn bộ website.</em>
      </div>
    </div>
  );
};

