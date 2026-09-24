// CoverTemplate.jsx — slide di copertina torneo
// Dipende da: COLORS, BackgroundDecoration, PostHeader, PostFooter (window)
// Props: tweaks, images = { cover: url }

function CoverTemplate({ tweaks, images = {} }) {
  const tournamentName = tweaks.tournamentName || "cicciogamer89tcg Cup";
  const edition        = tweaks.edition        || "for-mat";
  const playerCount    = tweaks.playerCount    || "N";
  const eventDate      = tweaks.eventDate      || "DD Month YYYY";
  const cupNumber      = tweaks.cupNumber      || "1";
  const handle         = tweaks.handle         || "cicciogamer89tcg_genova";
  const coverBg        = images.cover          || null;

  // Separa "cicciogamer89tcg" da "Cup" per il layout tipografico
  const parts = tournamentName.split(' ');
  const lastWord = parts[parts.length - 1];
  const mainTitle = parts.slice(0, -1).join(' ');

  return (
    <div style={{
      width:1080, height:1080,
      background: COLORS.bg,
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      position:'relative', overflow:'hidden',
    }}>
      {/* Background immagine opzionale */}
      {coverBg && (
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src={coverBg}
               style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.22 }}
               alt=""/>
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.30) 35%, rgba(13,13,13,0.65) 70%, #0D0D0D 100%)',
          }}/>
        </div>
      )}

      {/* Radar + glow */}
      <BackgroundDecoration/>
      <div style={{
        position:'absolute', top:'35%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:700, height:700, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 68%)',
        pointerEvents:'none', zIndex:0,
      }}/>

      {/* Barra top */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:6, zIndex:2,
        background:`linear-gradient(90deg, transparent 4%, ${COLORS.orange} 28%, ${COLORS.gold} 50%, ${COLORS.orange} 72%, transparent 96%)`,
      }}/>

      {/* Contenuto principale */}
      <div style={{
        zIndex:1, display:'flex', flexDirection:'column',
        alignItems:'center', textAlign:'center',
        gap:0, padding:'0 80px',
        width:'100%',
      }}>
        {/* Logo */}
        <div style={{
          width:220, height:220, borderRadius:22,
          overflow:'hidden', marginBottom:28,
          border:`2.5px solid rgba(255,107,0,0.65)`,
          boxShadow:`0 0 60px rgba(255,107,0,0.20), 0 0 130px rgba(255,107,0,0.07)`,
        }}>
          <img src="uploads/WhatsApp Image 2026-05-23 at 16.50.59-5ab94ae2.jpeg"
               style={{ width:'100%', height:'100%', objectFit:'cover' }}
               alt="cicciogamer89tcg"/>
        </div>

        {/* Nome torneo */}
        <div style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:80, lineHeight:0.92,
          color: COLORS.white, letterSpacing:6,
          textShadow:`0 0 50px rgba(255,107,0,0.22)`,
        }}>
          {mainTitle.toUpperCase()} genova
        </div>
        <div style={{
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:100, lineHeight:0.95,
          color: COLORS.orange, letterSpacing:14,
          textShadow:`0 0 70px rgba(255,107,0,0.40)`,
        }}>
          {lastWord.toUpperCase()}
        </div>

        {/* Divisore arancione */}
        <div style={{
          width:340, height:2.5, margin:'22px 0 18px',
          background:`linear-gradient(90deg, transparent, ${COLORS.orange}, ${COLORS.gold}, ${COLORS.orange}, transparent)`,
        }}/>

        {/* Cup # | Genova | Edition */}
        <div style={{
          display:'flex', alignItems:'center', gap:20,
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:50, letterSpacing:4,
        }}>
          <span style={{ color: COLORS.gold }}>#</span>
          <span style={{ color: COLORS.white }}>{cupNumber}</span>
          <span style={{ color:'rgba(255,255,255,0.25)', fontSize:34 }}>|</span>
          <span style={{ color: COLORS.white }}>GENOVA</span>
          <span style={{ color:'rgba(255,255,255,0.25)', fontSize:34 }}>|</span>
          <span style={{ color: COLORS.orangeLight }}>{edition}</span>
        </div>

        {/* Data */}
        <div style={{
          fontFamily:"'Barlow Condensed',sans-serif",
          fontWeight:500, fontSize:26,
          color: COLORS.textDim, letterSpacing:4,
          marginTop:14,
        }}>
          {eventDate}
        </div>

        {/* Giocatori */}
        <div style={{
          marginTop:30,
          display:'flex', alignItems:'center', gap:12,
          fontFamily:"'Bebas Neue',sans-serif",
          fontSize:36, color: COLORS.white, letterSpacing:3,
        }}>
          <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
            <ellipse cx="12" cy="7" rx="6" ry="6.5" fill="rgba(255,255,255,0.72)"/>
            <ellipse cx="22" cy="7" rx="6" ry="6.5" fill="rgba(255,255,255,0.48)"/>
            <path d="M1 26 C1 17 23 17 23 26" stroke="rgba(255,255,255,0.72)"
                  strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M11 26 C11 17 33 17 33 26" stroke="rgba(255,255,255,0.40)"
                  strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
          {playerCount} GIOCATORI
        </div>

        {/* Handle */}
        <div style={{
          marginTop:18,
          fontFamily:"'Barlow Condensed',sans-serif",
          fontSize:20, color: COLORS.textDim, letterSpacing:2,
        }}>
          @{handle}
        </div>
      </div>

      {/* Barra bottom */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:6, zIndex:2,
        background:`linear-gradient(90deg, transparent 4%, ${COLORS.orange} 28%, ${COLORS.gold} 50%, ${COLORS.orange} 72%, transparent 96%)`,
      }}/>
    </div>
  );
}

Object.assign(window, { CoverTemplate });
