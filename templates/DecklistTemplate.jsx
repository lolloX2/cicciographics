// DecklistTemplate.jsx — blocco unico immagine decklist
// Dipende da: COLORS, BackgroundDecoration, PostHeader, PostFooter (window)
// Props: tweaks, images = { deck: url }

function DecklistTemplate({ tweaks, images = {} }) {
  const tournamentName = tweaks.tournamentName || "cicciogamer89tcg Cup";
  const edition = tweaks.edition || "OP-09";
  const playerCount = tweaks.playerCount || 32;
  const winnerName = tweaks.winnerName || "Giocatore";
  const leaderName = tweaks.leaderName || "mainpkmn";
  const handle = tweaks.handle || "cicciogamer89";
  const deckImg = images.deck || null;

  return (
    <div style={{
      width: 1080, height: 1080,
      background: COLORS.bg,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden'
    }}>
      <BackgroundDecoration />

      <PostHeader
        eventName={tournamentName}
        subtitlePrefix="1° Classificato:"
        subtitleValue={winnerName} />
      

      {/* Area immagine decklist */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        padding: '14px 22px 10px',
        gap: 8,
        position: 'relative', zIndex: 1
      }}>
        {/* Label leader */}
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 18, color: COLORS.textDim, letterSpacing: 3,
          flexShrink: 0
        }}>
          DEck: <span style={{ color: COLORS.orange }}>{leaderName}</span>
        </div>

        {/* Blocco immagine principale */}
        <div style={{
          flex: 1,
          borderRadius: 6, overflow: 'hidden',
          border: `1px solid rgba(255,107,0,0.22)`,
          background: COLORS.bgCard,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative'
        }}>
          {deckImg ?
          <img
            src={deckImg}
            alt="Decklist"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} /> : (


          /* Placeholder */
          <div style={{
            width: '100%', height: '100%',
            background: 'repeating-linear-gradient(45deg,#191919,#191919 5px,#1f1f1f 5px,#1f1f1f 10px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 16
          }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                {/* stack di carte */}
                <rect x="6" y="4" width="34" height="46" rx="4"
              fill="#1C1C1C" stroke="rgba(255,107,0,0.35)" strokeWidth="2" />
                <rect x="14" y="14" width="34" height="46" rx="4"
              fill="#1C1C1C" stroke="rgba(255,107,0,0.22)" strokeWidth="2" />
                <rect x="10" y="9" width="34" height="46" rx="4"
              fill="#222" stroke="rgba(255,107,0,0.28)" strokeWidth="2" />
                <line x1="18" y1="28" x2="36" y2="28"
              stroke="rgba(255,107,0,0.30)" strokeWidth="1.5" />
                <line x1="18" y1="34" x2="36" y2="34"
              stroke="rgba(255,107,0,0.30)" strokeWidth="1.5" />
                <line x1="18" y1="40" x2="36" y2="40"
              stroke="rgba(255,107,0,0.22)" strokeWidth="1.5" />
                {/* + badge */}
                <circle cx="52" cy="52" r="10"
              fill="rgba(255,107,0,0.15)" stroke="rgba(255,107,0,0.55)" strokeWidth="1.5" />
                <line x1="52" y1="46" x2="52" y2="58"
              stroke="rgba(255,107,0,0.8)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="46" y1="52" x2="58" y2="52"
              stroke="rgba(255,107,0,0.8)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 18, color: 'rgba(255,107,0,0.38)',
              letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center'
            }}>
                Inserisci immagine decklist
              </span>
              <span style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 14, color: 'rgba(255,255,255,0.18)',
              letterSpacing: 1
            }}>
                Usa la pagina Editor per caricare
              </span>
            </div>)
          }
        </div>
      </div>

      <PostFooter playerCount={playerCount} handle={handle} />
    </div>);

}

Object.assign(window, { DecklistTemplate });