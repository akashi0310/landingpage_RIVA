import React, { useState } from 'react';
import {
  Sparkles,
  Plane,
  ChevronRight,
  ExternalLink,
  Compass,
  MapPin,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { MAP_COMPETITIONS, VIETNAM_HUB, type MapDestination } from '../data/mapDestinations';

interface InteractiveWorldMapProps {
  onSelectCompetition?: (code: string) => void;
  customDestinations?: MapDestination[];
}

/**
 * Tính toán đường cong bay cánh cung (Cubic/Quadratic Bezier Flight Arc)
 * Tự động tính độ vồng của đường bay dựa trên khoảng cách giữa 2 điểm
 */
function calculateFlightPath(origin: { x: number; y: number }, target: { x: number; y: number }): string {
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Điểm giữa
  const mx = (origin.x + target.x) / 2;
  const my = (origin.y + target.y) / 2;

  // Độ cao vòng cung: tỷ lệ thuận với khoảng cách, tối thiểu 35px, tối đa 140px
  // Cung bay luôn vồng lên phía bán cầu Bắc (không gian quỹ đạo)
  const archHeight = Math.max(30, Math.min(145, dist * 0.28));
  const cx = mx;
  const cy = Math.min(origin.y, target.y) - archHeight;

  return `M ${origin.x} ${origin.y} Q ${cx} ${cy} ${target.x} ${target.y}`;
}

export const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  onSelectCompetition,
  customDestinations
}) => {
  const destinations = customDestinations || MAP_COMPETITIONS;
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [hoveredDestId, setHoveredDestId] = useState<string | null>(null);

  const activeDest = destinations.find(d => d.id === (hoveredDestId || selectedDestId)) || null;

  const handleDestinationClick = (dest: MapDestination) => {
    setSelectedDestId(dest.id);
    if (onSelectCompetition) {
      onSelectCompetition(dest.code);
    }
  };

  return (
    <div className="digital-world-map-wrapper">
      {/* Top Map Action Bar */}
      <div className="map-control-bar">
        <div className="map-control-title">
          <span className="pulse-dot" style={{ color: '#FFDE43' }} />
          <span>MẠNG LƯỚI ĐẤU TRƯỜNG TOÀN CẦU RIVA ({destinations.length} QUỐC GIA & ĐIỂM ĐẾN)</span>
        </div>

        {/* Quick Continent/Destination Selector Pills */}
        <div className="map-quick-pills">
          <button
            type="button"
            className={`map-pill-btn ${!selectedDestId ? 'active' : ''}`}
            onClick={() => setSelectedDestId(null)}
          >
            <span>🇻🇳 Trụ sở Việt Nam</span>
          </button>

          {destinations.map(dest => {
            const isSelected = selectedDestId === dest.id || hoveredDestId === dest.id;
            return (
              <button
                key={dest.id}
                type="button"
                className={`map-pill-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleDestinationClick(dest)}
                onMouseEnter={() => setHoveredDestId(dest.id)}
                onMouseLeave={() => setHoveredDestId(null)}
              >
                <span>{dest.flag} {dest.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="digital-map-viewport">
        <svg
          className="digital-map-svg-canvas"
          viewBox="0 0 1000 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient cho các đường bay nối */}
            <linearGradient id="flightArcGradDefault" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFDE43" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#75C2FA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#133BBE" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="flightArcGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFDE43" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFE76E" stopOpacity="1" />
              <stop offset="100%" stopColor="#75C2FA" stopOpacity="1" />
            </linearGradient>

            {/* Hào quang trung tâm Việt Nam */}
            <radialGradient id="vietnamHubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFDE43" stopOpacity="1" />
              <stop offset="45%" stopColor="#FFDE43" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#FFDE43" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFDE43" stopOpacity="0" />
            </radialGradient>

            {/* Pattern Tech Dot Matrix */}
            <pattern id="techGridDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.7" fill="#75C2FA" opacity="0.15" />
            </pattern>
          </defs>

          {/* Background Matrix Dots */}
          <rect width="1000" height="450" fill="url(#techGridDots)" />

          {/* Lưới kinh tuyến và vĩ tuyến công nghệ (Curved Digital Graticules) */}
          <g opacity="0.12" stroke="#75C2FA" strokeWidth="0.6">
            {/* Vĩ tuyến */}
            <line x1="30" y1="75" x2="970" y2="75" />
            <line x1="30" y1="150" x2="970" y2="150" />
            <line x1="30" y1="225" x2="970" y2="225" />
            <line x1="30" y1="300" x2="970" y2="300" />
            <line x1="30" y1="375" x2="970" y2="375" />

            {/* Kinh tuyến cong nhẹ */}
            <path d="M 150 20 Q 170 225 150 430" fill="none" />
            <path d="M 320 20 Q 350 225 320 430" fill="none" />
            <path d="M 500 20 L 500 430" fill="none" />
            <path d="M 680 20 Q 650 225 680 430" fill="none" />
            <path d="M 850 20 Q 830 225 850 430" fill="none" />
          </g>

          {/* =========================================================================
              HÌNH DÁNG CÁC LỤC ĐỊA CHI TIẾT & CHÂN THỰC (DETAILED WORLD CONTINENTS)
              ========================================================================= */}
          <g className="world-continents-group">
            {/* 1. BẮC MỸ (NORTH AMERICA) - Alaska, Canada, USA, Mexico, Greenland */}
            {/* Greenland */}
            <path
              d="M 350 40 L 390 35 L 415 65 L 395 105 L 355 85 Z"
              fill="rgba(19, 59, 190, 0.22)"
              stroke="rgba(117, 194, 250, 0.35)"
              strokeWidth="0.8"
            />
            {/* Lục địa Bắc Mỹ chính */}
            <path
              d="M 85 75 
                 C 130 55, 200 50, 260 70 
                 L 290 85 L 295 110 L 265 125 
                 L 285 160 L 260 195 L 235 185 
                 L 220 225 L 195 240 L 180 220 
                 L 160 190 L 130 170 L 110 135 
                 L 75 110 Z"
              fill="rgba(19, 59, 190, 0.28)"
              stroke="rgba(117, 194, 250, 0.45)"
              strokeWidth="1"
            />

            {/* 2. NAM MỸ (SOUTH AMERICA) */}
            <path
              d="M 225 245 
                 L 275 255 L 315 285 L 305 340 
                 L 270 395 L 250 415 L 235 385 
                 L 225 330 L 215 285 Z"
              fill="rgba(19, 59, 190, 0.22)"
              stroke="rgba(117, 194, 250, 0.38)"
              strokeWidth="0.9"
            />

            {/* 3. CHÂU ÂU (EUROPE) - Anh, Tây Âu, Bắc Âu, Trung Âu, Địa Trung Hải */}
            {/* Vương quốc Anh & Ireland */}
            <path
              d="M 455 85 L 475 90 L 470 120 L 450 115 Z"
              fill="rgba(19, 59, 190, 0.3)"
              stroke="rgba(117, 194, 250, 0.45)"
              strokeWidth="0.8"
            />
            {/* Scandinavia */}
            <path
              d="M 500 50 L 530 45 L 545 75 L 525 105 L 505 95 Z"
              fill="rgba(19, 59, 190, 0.25)"
              stroke="rgba(117, 194, 250, 0.4)"
              strokeWidth="0.8"
            />
            {/* Lục địa Châu Âu chính */}
            <path
              d="M 465 115 
                 L 510 105 L 555 105 L 570 130 
                 L 550 155 L 520 165 L 490 165 
                 L 465 150 L 460 130 Z"
              fill="rgba(19, 59, 190, 0.35)"
              stroke="rgba(117, 194, 250, 0.55)"
              strokeWidth="1.1"
            />

            {/* 4. CHÂU PHI (AFRICA) */}
            <path
              d="M 460 175 
                 L 540 170 L 575 210 L 585 260 
                 L 550 340 L 520 375 L 495 330 
                 L 450 260 L 445 210 Z"
              fill="rgba(19, 59, 190, 0.2)"
              stroke="rgba(117, 194, 250, 0.35)"
              strokeWidth="0.9"
            />
            {/* Madagascar */}
            <path
              d="M 590 320 L 605 330 L 595 370 L 585 360 Z"
              fill="rgba(19, 59, 190, 0.2)"
              stroke="rgba(117, 194, 250, 0.35)"
              strokeWidth="0.7"
            />

            {/* 5. CHÂU Á & NGA (ASIA & EURASIA) */}
            <path
              d="M 570 95 
                 C 640 70, 750 65, 870 85 
                 L 880 130 L 845 160 L 825 150 
                 L 815 195 L 785 210 L 760 215 
                 L 745 265 L 705 270 L 685 235 
                 L 645 220 L 620 180 L 585 175 
                 L 570 135 Z"
              fill="rgba(19, 59, 190, 0.3)"
              stroke="rgba(117, 194, 250, 0.5)"
              strokeWidth="1"
            />

            {/* Quần đảo Nhật Bản */}
            <path
              d="M 855 125 L 870 135 L 860 170 L 845 155 Z"
              fill="rgba(19, 59, 190, 0.32)"
              stroke="rgba(117, 194, 250, 0.45)"
              strokeWidth="0.8"
            />

            {/* Đông Nam Á hải đảo (Indonesia, Philippines, Malaysia) */}
            <path
              d="M 720 285 L 755 280 L 780 295 L 735 325 Z"
              fill="rgba(19, 59, 190, 0.22)"
              stroke="rgba(117, 194, 250, 0.38)"
              strokeWidth="0.7"
            />
            <path
              d="M 785 235 L 805 240 L 795 275 L 780 265 Z"
              fill="rgba(19, 59, 190, 0.22)"
              stroke="rgba(117, 194, 250, 0.38)"
              strokeWidth="0.7"
            />

            {/* 6. CHÂU ÚC & NEW ZEALAND (AUSTRALIA) */}
            <path
              d="M 780 320 
                 L 870 310 L 885 365 L 850 400 
                 L 790 385 L 775 350 Z"
              fill="rgba(19, 59, 190, 0.24)"
              stroke="rgba(117, 194, 250, 0.4)"
              strokeWidth="0.9"
            />
            <path
              d="M 900 380 L 915 390 L 905 425 L 895 415 Z"
              fill="rgba(19, 59, 190, 0.22)"
              stroke="rgba(117, 194, 250, 0.35)"
              strokeWidth="0.7"
            />

            {/* =========================================================================
                7. DẢI ĐẤT VIỆT NAM (S-SHAPE HIGHLIGHT) - VÀNG GOLD PHÁT SÁNG NỔI BẬT
                ========================================================================= */}
            <path
              d="M 740 212 
                 C 744 216, 746 222, 744 227 
                 C 742 232, 738 236, 739 242 
                 C 740 248, 744 252, 742 258 
                 C 739 261, 734 260, 735 255 
                 C 737 248, 734 242, 734 236 
                 C 734 230, 738 224, 737 218 
                 Z"
              fill="#FFDE43"
              stroke="#FFE76E"
              strokeWidth="1.8"
              filter="drop-shadow(0 0 6px rgba(255, 222, 67, 0.75))"
            />
          </g>

          {/* =========================================================================
              TỰ ĐỘNG SINH ĐƯỜNG BAY CÁNH CUNG (DYNAMIC AUTOMATIC FLIGHT ARCS)
              Nối từ VIỆT NAM (Hub) đến TỪNG QUỐC GIA KỲ THI
              ========================================================================= */}
          <g className="flight-arcs-group">
            {destinations.map(dest => {
              const flightPath = calculateFlightPath(VIETNAM_HUB.coords, dest.coords);
              const isSelected = selectedDestId === dest.id || hoveredDestId === dest.id;

              return (
                <g key={`flight-${dest.id}`} className="flight-arc-item">
                  {/* Đường sáng nền mờ tạo chiều sâu */}
                  <path
                    d={flightPath}
                    stroke={isSelected ? '#FFDE43' : 'rgba(117, 194, 250, 0.25)'}
                    strokeWidth={isSelected ? '3.5' : '1.5'}
                    fill="none"
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Luồng xung ánh sáng di chuyển theo cung bay */}
                  <path
                    className="animated-flight-line"
                    d={flightPath}
                    stroke={isSelected ? 'url(#flightArcGradActive)' : 'url(#flightArcGradDefault)'}
                    strokeWidth={isSelected ? '2.5' : '1.8'}
                    strokeDasharray={isSelected ? '8 6' : '6 6'}
                    fill="none"
                    filter={isSelected ? 'drop-shadow(0 0 8px rgba(255, 222, 67, 0.8))' : 'none'}
                  />

                  {/* Hạt Photon năng lượng bay dọc theo đường kết nối */}
                  <circle r={isSelected ? '4' : '2.8'} fill="#FFDE43">
                    <animateMotion
                      dur={isSelected ? '3.5s' : '6s'}
                      repeatCount="indefinite"
                      path={flightPath}
                      rotate="auto"
                    />
                  </circle>
                </g>
              );
            })}
          </g>

          {/* =========================================================================
              TỰ ĐỘNG SINH CÁC NODE TỌA ĐỘ KỲ THI (DYNAMIC DESTINATION NODES)
              ========================================================================= */}
          <g className="destination-nodes-group">
            {destinations.map(dest => {
              const isSelected = selectedDestId === dest.id || hoveredDestId === dest.id;
              const nodeColor = isSelected ? '#FFDE43' : '#75C2FA';

              return (
                <g
                  key={`node-${dest.id}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDestinationClick(dest)}
                  onMouseEnter={() => setHoveredDestId(dest.id)}
                  onMouseLeave={() => setHoveredDestId(null)}
                >
                  {/* Sóng radar xung quanh điểm đến */}
                  <circle
                    cx={dest.coords.x}
                    cy={dest.coords.y}
                    r={isSelected ? '18' : '12'}
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth="1.2"
                    opacity={isSelected ? '0.9' : '0.5'}
                    className="pulse-node"
                  />

                  {/* Vòng đệm sáng */}
                  <circle
                    cx={dest.coords.x}
                    cy={dest.coords.y}
                    r={isSelected ? '9' : '6'}
                    fill="rgba(7, 21, 69, 0.8)"
                    stroke={nodeColor}
                    strokeWidth="1.5"
                  />

                  {/* Tâm điểm sáng */}
                  <circle
                    cx={dest.coords.x}
                    cy={dest.coords.y}
                    r={isSelected ? '5' : '3.5'}
                    fill={nodeColor}
                  />
                </g>
              );
            })}
          </g>

          {/* =========================================================================
              TRUNG TÂM VIỆT NAM HUB NODE (GOLD PULSE HUB)
              ========================================================================= */}
          <g className="vietnam-hub-node-group">
            {/* Vòng hào quang lớn tỏa ra */}
            <circle
              cx={VIETNAM_HUB.coords.x}
              cy={VIETNAM_HUB.coords.y}
              r="28"
              fill="url(#vietnamHubGlow)"
            />
            {/* Vòng radar sóng xung kép */}
            <circle
              cx={VIETNAM_HUB.coords.x}
              cy={VIETNAM_HUB.coords.y}
              r="18"
              fill="none"
              stroke="#FFDE43"
              strokeWidth="2"
              className="pulse-node"
            />
            <circle
              cx={VIETNAM_HUB.coords.x}
              cy={VIETNAM_HUB.coords.y}
              r="9"
              fill="#FFDE43"
              filter="drop-shadow(0 0 10px rgba(255, 222, 67, 0.9))"
            />
          </g>
        </svg>

        {/* =========================================================================
            HTML OVERLAY FLOATING TAGS (ĐƯỢC ĐỊNH VỊ CHÍNH XÁC - TỰ ĐỘNG KHÔNG BAO GIỜ CHE NHAU)
            ========================================================================= */}
        <div className="map-floating-tags-container">
          {/* THẺ 1: TRỤ SỞ RIVA VIỆT NAM (HUB GỐC)
              Cố định ở góc Đông Nam (bên phải Việt Nam) */}
          <div
            className="map-floating-tag tag-vietnam-hub"
            style={{
              position: 'absolute',
              bottom: '22px',
              right: '24px',
              borderColor: 'var(--color-gold)',
              background: 'rgba(7, 21, 69, 0.96)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(255, 222, 67, 0.35)',
              zIndex: 10
            }}
          >
            <span style={{ fontSize: '18px' }}>🇻🇳</span>
            <div>
              <div style={{ color: 'var(--color-gold-bright)', fontSize: '11px', fontWeight: 900, letterSpacing: '0.04em' }}>
                TRUNG TÂM RIVA VIỆT NAM
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-cream)', opacity: 0.9 }}>
                Trụ sở điều phối & dẫn đoàn quốc gia
              </div>
            </div>
          </div>

          {/* DYNAMIC DESTINATION TAGS: TỰ ĐỘNG TẠO THẺ CHO MỌI KỲ THI TRONG MẢNG */}
          {destinations.map(dest => {
            const isSelected = selectedDestId === dest.id || hoveredDestId === dest.id;

            // Tự động định vị thẻ dựa trên cấu hình và tọa độ
            // Đảm bảo không bao giờ đè lên Việt Nam
            const tagStyle: React.CSSProperties = {
              position: 'absolute',
              cursor: 'pointer',
              zIndex: isSelected ? 12 : 9
            };

            if (dest.id === 'ipitex') {
              // Tách biệt hoàn toàn Thái Lan IPITEX khỏi Việt Nam
              tagStyle.bottom = '22px';
              tagStyle.left = '48%';
            } else if (dest.id === 'sviif') {
              tagStyle.top = '16px';
              tagStyle.left = '6%';
            } else if (dest.id === 'iena') {
              tagStyle.top = '16px';
              tagStyle.left = '44%';
            } else if (dest.id === 'geneva') {
              tagStyle.bottom = '65px';
              tagStyle.left = '36%';
            } else if (dest.badgePlacement === 'top') {
              tagStyle.left = `${(dest.coords.x / 1000) * 100}%`;
              tagStyle.top = `${Math.max(12, (dest.coords.y / 450) * 100 - 18)}%`;
              tagStyle.transform = 'translate(-30%, -100%)';
            } else if (dest.badgePlacement === 'top-right') {
              tagStyle.left = `${(dest.coords.x / 1000) * 100}%`;
              tagStyle.top = `${Math.max(12, (dest.coords.y / 450) * 100 - 16)}%`;
              tagStyle.transform = 'translate(10px, -80%)';
            } else {
              tagStyle.left = `${(dest.coords.x / 1000) * 100}%`;
              tagStyle.top = `${(dest.coords.y / 450) * 100 + 4}%`;
            }

            return (
              <div
                key={`tag-${dest.id}`}
                className={`map-floating-tag tag-competition ${isSelected ? 'active-tag' : ''}`}
                onClick={() => handleDestinationClick(dest)}
                onMouseEnter={() => setHoveredDestId(dest.id)}
                onMouseLeave={() => setHoveredDestId(null)}
                style={tagStyle}
              >
                <span style={{ fontSize: '16px' }}>{dest.flag}</span>
                <div>
                  <div style={{ color: 'var(--color-cream)', fontSize: '11px', fontWeight: 800 }}>
                    {dest.title}
                  </div>
                  <div style={{ fontSize: '10px', color: dest.statusColor }}>
                    {dest.statusLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Inspector Bar: Luôn hiển thị thông tin rõ ràng, mượt mà trên cả mobile và desktop */}
      <div className="map-active-destination-drawer">
        <div className="drawer-inner">
          <div className="drawer-info">
            <span style={{ fontSize: '26px' }}>{activeDest ? activeDest.flag : '🇻🇳'}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, color: 'white', fontSize: '14px' }}>
                  {activeDest ? activeDest.title : 'TRUNG TÂM ĐIỀU PHỐI RIVA VIỆT NAM'}
                </span>
                <span className="badge badge-gold" style={{ fontSize: '10px', padding: '2px 6px' }}>
                  {activeDest ? activeDest.countryCode : 'HUB QUỐC GIA'}
                </span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {activeDest ? (
                  <>📍 {activeDest.city} • <span style={{ color: activeDest.statusColor }}>{activeDest.statusLabel}</span></>
                ) : (
                  <>📍 Hà Nội & TP.HCM • <span style={{ color: 'var(--color-gold-bright)' }}>Bảo trợ & Dẫn đoàn thi đấu quốc tế</span></>
                )}
              </div>
            </div>
          </div>

          {activeDest ? (
            <button
              type="button"
              className="btn btn-sm btn-gold"
              onClick={() => handleDestinationClick(activeDest)}
            >
              <span>Xem chi tiết kỳ thi</span>
              <ChevronRight size={14} />
            </button>
          ) : (
            <div style={{ fontSize: '12px', color: 'var(--color-sky-bright)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={14} />
              <span>Bấm vào kỳ thi bất kỳ trên bản đồ để xem chi tiết</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
