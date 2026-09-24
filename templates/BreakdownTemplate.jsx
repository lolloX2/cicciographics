// BreakdownTemplate.jsx
// Dipende da: COLORS, SLICE_COLORS, PostHeader, PostFooter (window)
// Props: tweaks, images = { slices: [url, ...] }, data = [{ name, value }, ...]

function sectorPath(cx, cy, r, startAngle, endAngle) {
  const sx = cx + r * Math.cos(startAngle);
  const sy = cy + r * Math.sin(startAngle);
  const ex = cx + r * Math.cos(endAngle);
  const ey = cy + r * Math.sin(endAngle);
  const large = (endAngle - startAngle) > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`;
}

const DEFAULT_BREAKDOWN = [
  { name:"Leader A", value:9 },
  { name:"Leader B", value:8 },
  { name:"Leader C", value:6 },
  { name:"Leader D", value:5 },
  { name:"Leader E", value:4 },
  { name:"Leader F", value:3 },
  { name:"Leader G", value:2 },
  { name:"Leader H", value:2 },
  { name:"Leader I", value:1 },
  { name:"Leader J", value:1 },
  { name:"Leader K", value:1 },
];

function PieChart({ slices, size = 506 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r  = size / 2 - 14;
  const total = slices.reduce((s, sl) => s + sl.value, 0);

  let cumAngle = -Math.PI / 2;
  const computed = slices.map((sl, i) => {
    const start = cumAngle;
    const span  = (sl.value / total) * 2 * Math.PI;
    cumAngle += span;
    return { ...sl, startAngle: start, endAngle: cumAngle, idx: i };
  });

  return (
    <svg width={size} height={size} style={{ display:'block', flexShrink:0 }}>
      <defs>
        <pattern id="brk-stripe" patternUnits="userSpaceOnUse"
                 width="14" height="14" patternTransform="rotate(45)">
          <rect width="7"  height="14" fill="#1a1a1a"/>
          <rect x="7" width="7" height="14" fill="#252525"/>
        </pattern>
        {computed.map(sl => (
          <clipPath key={`cp-${sl.idx}`} id={`cp-${sl.idx}`}>
            <path d={sectorPath(cx, cy, r, sl.startAngle, sl.endAngle)}/>
          </clipPath>
        ))}
        <filter id="spr-shd" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="3.5" floodColor="#000" floodOpacity="0.9"/>
        </filter>
      </defs>

      {computed.map(sl => {
        const path  = sectorPath(cx, cy, r, sl.startAngle, sl.endAngle);
        const color = SLICE_COLORS[sl.idx % SLICE_COLORS.length];
        return (
          <g key={sl.idx}>
            <path d={path} fill={color} opacity={0.20}/>
            <path d={path} fill="url(#brk-stripe)" opacity={0.55}/>
            {sl.image && (
              <image
                href={sl.image}
                x={cx - r} y={cy - r}
                width={r * 2} height={r * 2}
                clipPath={`url(#cp-${sl.idx})`}
                preserveAspectRatio="xMidYMid slice"
              />
            )}
            {sl.image && <path d={path} fill={color} opacity={0.12}/>}
            <line
              x1={cx} y1={cy}
              x2={(cx + r * Math.cos(sl.startAngle)).toFixed(2)}
              y2={(cy + r * Math.sin(sl.startAngle)).toFixed(2)}
              stroke={COLORS.bg} strokeWidth="3"
            />
          </g>
        );
      })}

      {/* Pokémon sprites centrati nello spicchio */}
      {computed.map(sl => {
        const mp = sl.mainPkmn; if (!mp) return null;
        const mid  = (sl.startAngle + sl.endAngle) / 2;
        const span = sl.endAngle - sl.startAngle;
        const dist = r * 0.60;
        const sx   = cx + dist * Math.cos(mid);
        const sy   = cy + dist * Math.sin(mid);
        const sz   = Math.min(70, Math.max(28, span * r * 0.28));
        const ms   = mp.toLowerCase().replace(/ /g,'-');
        const sp   = sl.secondaryPkmn;
        const ss   = sp ? sp.toLowerCase().replace(/ /g,'-') : null;
        const has2 = !!ss;
        const ssz  = Math.round(sz * 0.65);
        return (
          <g key={`spr-${sl.idx}`} filter="url(#spr-shd)">
            <image
              href={pkmnSpriteUrl(ms)}
              x={sx + (has2 ? -sz*0.22 : 0) - sz/2}
              y={sy + (has2 ? -sz*0.22 : 0) - sz/2}
              width={sz} height={sz}
            />
            {ss && (
              <image
                href={pkmnSpriteUrl(ss)}
                x={sx + sz*0.12 - ssz/2}
                y={sy + sz*0.12 - ssz/2}
                width={ssz} height={ssz}
              />
            )}
          </g>
        );
      })}

      <circle cx={cx} cy={cy} r={r}  fill="none" stroke={COLORS.orange} strokeWidth="3"/>
      <circle cx={cx} cy={cy} r={14} fill={COLORS.bg}/>
      <circle cx={cx} cy={cy} r={14} fill="none" stroke={COLORS.orange} strokeWidth="1.5"/>
    </svg>
  );
}

function BreakdownLegend({ slices, tournamentLabel }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column',
      width:'100%', height:'100%',
      padding:'0 26px 0 22px',
    }}>
      <div style={{
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize:42, color: COLORS.white,
        letterSpacing:2, lineHeight:1, marginBottom:14,
      }}>
        Mazzi Giocati
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:5 }}>
        {slices.map((sl, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              width:11, height:11, borderRadius:2, flexShrink:0,
              background: SLICE_COLORS[i % SLICE_COLORS.length],
            }}/>
            <span style={{
              flex:1, textAlign:'right',
              fontFamily:"'Barlow Condensed',sans-serif",
              fontSize:21, fontWeight:500, color: COLORS.white,
            }}>
              {sl.name}
            </span>
            <span style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:23, color: COLORS.orange,
              minWidth:30, textAlign:'right',
            }}>
              {sl.value}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        paddingTop:14,
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize:24, color: COLORS.gold, letterSpacing:1,
        display:'flex', alignItems:'center', gap:10,
      }}>
        <img src="uploads/WhatsApp Image 2026-05-23 at 16.50.59-5ab94ae2.jpeg"
             style={{ width:34, height:34, borderRadius:5, objectFit:'cover' }}
             alt=""/>
        {tournamentLabel}
      </div>
    </div>
  );
}

function BreakdownTemplate({ tweaks, images = {}, data = null }) {
  const tournamentName = tweaks.tournamentName || "cicciogamer89tcg Cup";
  const edition        = tweaks.edition        || "OP-09";
  const playerCount    = tweaks.playerCount    || 32;
  const handle         = tweaks.handle         || "cicciogamer89";

  const baseData = data || DEFAULT_BREAKDOWN;
  const slices = baseData.map(sl => ({ ...sl }));

  return (
    <div style={{
      width:1080, height:1080,
      background: COLORS.bg,
      display:'flex', flexDirection:'column',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse at 30% 55%, rgba(255,107,0,0.05) 0%, transparent 65%)',
        pointerEvents:'none', zIndex:0,
      }}/>

      <PostHeader
        eventName={tournamentName}
        subtitlePrefix="Summary:"
        subtitleValue="Mazzi Giocati"
      />

      <div style={{
        flex:1, display:'flex', alignItems:'center',
        padding:'16px 18px 10px',
        position:'relative', zIndex:1, overflow:'hidden',
      }}>
        <PieChart slices={slices} size={506}/>
        <div style={{ flex:1, height:506 }}>
          <BreakdownLegend slices={slices} tournamentLabel={tournamentName}/>
        </div>
      </div>

      <PostFooter playerCount={playerCount} handle={handle}/>
    </div>
  );
}

Object.assign(window, { BreakdownTemplate });
