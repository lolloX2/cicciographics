// Shared.jsx — colori, header, footer, decorazione sfondo
// Esporta su window: COLORS, SLICE_COLORS, BackgroundDecoration, PostHeader, PostFooter

const COLORS = {
  bg:          '#0D0D0D',
  bgPanel:     '#161616',
  bgCard:      '#1C1C1C',
  orange:      '#FF6B00',
  orangeLight: '#FF8C00',
  gold:        '#E8960A',
  red:         '#C92B0C',
  white:       '#FFFFFF',
  textDim:     'rgba(255,255,255,0.52)',
  border:      'rgba(255,107,0,0.30)',
  borderFaint: 'rgba(255,107,0,0.10)',
};

const SLICE_COLORS = [
  '#FF6B00','#E8960A','#C92B0C',
  '#C44B3D','#FF4500','#BF7A00',
  '#A83200','#FF8C00','#7A3020',
  '#E05A00','#D4620A','#B04000',
];

function BackgroundDecoration() {
  return (
    <svg
      style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%',
               opacity:0.055, pointerEvents:'none', zIndex:0 }}
      viewBox="0 0 1080 1080" fill="none"
    >
      {[140,270,400,530,660].map(r => (
        <circle key={r} cx="540" cy="540" r={r} stroke="#FF6B00" strokeWidth="1"/>
      ))}
      <line x1="540" y1="0"    x2="540"  y2="1080" stroke="#FF6B00" strokeWidth="0.7"/>
      <line x1="0"   y1="540"  x2="1080" y2="540"  stroke="#FF6B00" strokeWidth="0.7"/>
      <line x1="157" y1="157"  x2="923"  y2="923"  stroke="#FF6B00" strokeWidth="0.4"/>
      <line x1="923" y1="157"  x2="157"  y2="923"  stroke="#FF6B00" strokeWidth="0.4"/>
      {[0,45,90,135,180,225,270,315].map(deg => {
        const rad = deg * Math.PI / 180;
        return (
          <line key={deg}
            x1={540 + 560*Math.cos(rad)} y1={540 + 560*Math.sin(rad)}
            x2={540 + 590*Math.cos(rad)} y2={540 + 590*Math.sin(rad)}
            stroke="#FF6B00" strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}

function PostHeader({ eventName, subtitlePrefix, subtitleValue, subtitleColor }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:18,
      padding:'12px 24px',
      background: COLORS.bg,
      borderBottom: `2.5px solid ${COLORS.orange}`,
      height: 112,
      flexShrink: 0,
      position: 'relative', zIndex: 2,
    }}>
      {/* Logo */}
      <div style={{
        width:86, height:86, borderRadius:8, overflow:'hidden',
        flexShrink:0, border:`1.5px solid rgba(255,107,0,0.45)`,
        background:'#000',
      }}>
        <img
          src="uploads/WhatsApp Image 2026-05-23 at 16.50.59-5ab94ae2.jpeg"
          alt="cicciogamer89tcg"
          style={{ width:'100%', height:'100%', objectFit:'cover' }}
        />
      </div>

      {/* Event badge */}
      <div style={{
        flex:1, background: COLORS.bgPanel,
        border:`1px solid ${COLORS.border}`,
        borderRadius:6, padding:'12px 20px',
        height:86,
        display:'flex', flexDirection:'column', justifyContent:'center', gap:5,
      }}>
        <div style={{
          fontFamily:"'Barlow Condensed',sans-serif",
          fontWeight:700, fontSize:21,
          color: COLORS.white, letterSpacing:0.4, lineHeight:1.1,
        }}>
          {eventName}
        </div>
        <div style={{
          fontFamily:"'Barlow Condensed',sans-serif",
          fontWeight:500, fontSize:19, lineHeight:1.1,
          display:'flex', alignItems:'center', gap:7,
        }}>
          <span style={{ color: COLORS.orange, fontSize:9 }}>●</span>
          <span style={{ color: COLORS.white }}>{subtitlePrefix}&nbsp;</span>
          {subtitleValue && (
            <span style={{ color: subtitleColor || COLORS.orange, fontWeight:700 }}>
              {subtitleValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function PostFooter({ playerCount, handle }) {
  return (
    <div style={{
      height:162, flexShrink:0,
      background: COLORS.bg,
      borderTop:`1px solid rgba(255,107,0,0.12)`,
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:5,
      position:'relative', zIndex:2,
    }}>
      {/* Persone icona SVG */}
      <svg width="54" height="46" viewBox="0 0 54 46" fill="none">
        <ellipse cx="18" cy="11" rx="8" ry="9" fill="rgba(255,255,255,0.70)"/>
        <ellipse cx="36" cy="11" rx="8" ry="9" fill="rgba(255,255,255,0.50)"/>
        <path d="M2 43 C2 30 34 30 34 43" stroke="rgba(255,255,255,0.70)" strokeWidth="3"
              fill="none" strokeLinecap="round"/>
        <path d="M20 43 C20 30 52 30 52 43" stroke="rgba(255,255,255,0.40)" strokeWidth="3"
              fill="none" strokeLinecap="round"/>
      </svg>
      <div style={{
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize:32, color: COLORS.white, letterSpacing:2.5,
      }}>
        {playerCount} Giocatori
      </div>
      <div style={{
        fontFamily:"'Barlow Condensed',sans-serif",
        fontSize:17, color: COLORS.textDim, letterSpacing:1,
      }}>
        @{handle}
      </div>
    </div>
  );
}

// ─── Pokémon: lista + sprite (da pokemon.json locale) ───
window.POKEMON_LIST = [];
window.POKEMON_ID_MAP = {};
function normPkmn(name) { return String(name).toLowerCase().trim().replace(/ /g,'-'); }
function pkmnSpriteUrl(name) {
  const n = normPkmn(name);
  const id = window.POKEMON_ID_MAP[n];
  return id
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
    : `https://img.pokemondb.net/sprites/home/normal/${n}.png`;
}
window.pokemonReady = window.pokemonReady || fetch('pokemon.json')
  .then(r => r.json())
  .then(data => {
    window.POKEMON_LIST = data.results.map(p => p.name);
    data.results.forEach(p => {
      const m = p.url.match(/\/pokemon\/(\d+)\/?$/);
      if (m) window.POKEMON_ID_MAP[p.name] = Number(m[1]);
    });
  })
  .catch(e => console.warn('pokemon.json non caricato', e));

Object.assign(window, { COLORS, SLICE_COLORS, BackgroundDecoration, PostHeader, PostFooter, pkmnSpriteUrl, normPkmn });
