// PlayerResultTemplate.jsx — risultato singolo giocatore con foto
// Props: tweaks, player = { name, category, result, record, photo }

function PlayerResultTemplate({ tweaks, player = {} }) {
  const regionalName = tweaks.regionalName || "Regional Città";
  const handle       = tweaks.handle       || "cicciogamer89tcg_genova";
  const name     = player.name     || "Nome Cognome";
  const category = player.category || "Master";
  const game     = player.game     || "TCG";
  const result   = player.result   || "TOP 8";
  const record   = player.record   || "";
  const photo    = player.photo    || null;
  const isVGC    = game === 'VGC';
  const nSlots   = isVGC ? 6 : 2;
  const mons     = Array.from({length:nSlots}, (_,i) => (player.pokemon||[])[i] || null);
  const sprSz    = isVGC ? 104 : 150;
  const sprUrl   = pkmnSpriteUrl;
  const catColor = CATEGORY_COLORS[category] || COLORS.orange;
  const [first, ...rest] = name.split(' ');

  return (
    <div style={{ width:1080, height:1080, background:COLORS.bg, position:'relative', overflow:'hidden' }}>
      {/* Foto */}
      <div style={{ position:'absolute', top:0, right:0, bottom:0, width:640, zIndex:0 }}>
        {photo ? (
          <img src={photo} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
                        background:'repeating-linear-gradient(45deg,#171717,#171717 6px,#1e1e1e 6px,#1e1e1e 12px)' }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, letterSpacing:3,
                           color:'rgba(255,107,0,0.4)', textTransform:'uppercase' }}>Foto giocatore</span>
          </div>
        )}
        <div style={{ position:'absolute', inset:0,
                      background:'linear-gradient(90deg, #0D0D0D 0%, rgba(13,13,13,0.75) 22%, rgba(13,13,13,0) 55%), linear-gradient(0deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0) 35%)' }}></div>
      </div>

      <BackgroundDecoration/>

      {/* Barra laterale arancione */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:10, background:COLORS.orange, zIndex:2 }}></div>

      {/* Contenuto */}
      <div style={{ position:'absolute', inset:0, zIndex:3, padding:'64px 70px 60px 80px',
                    display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <img src="uploads/WhatsApp Image 2026-05-23 at 16.50.59-5ab94ae2.jpeg" alt=""
               style={{ width:84, height:84, borderRadius:10, objectFit:'cover', border:`1.5px solid ${COLORS.border}` }}/>
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:34, letterSpacing:3, color:COLORS.white, lineHeight:1 }}>
              {regionalName}
            </span>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:20, letterSpacing:2, color:COLORS.textDim }}>
              @{handle}
            </span>
          </div>
        </div>

        <div style={{ flex:1 }}></div>

        <div style={{ display:'flex', flexDirection:'column', gap:8, maxWidth:620 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:18 }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:600,
                           letterSpacing:4, color:COLORS.textDim, textTransform:'uppercase' }}>
              {isVGC ? 'Team' : 'Deck'}
            </span>
            <div style={{ display:'grid', gridTemplateColumns:`repeat(${isVGC?3:2}, ${sprSz}px)`, gap:10 }}>
              {mons.map((m,i) => (
                <div key={i} style={{ width:sprSz, height:sprSz, borderRadius:12,
                                      background:'rgba(22,22,22,0.85)',
                                      border:`1.5px ${m?'solid':'dashed'} ${m?COLORS.border:'rgba(255,107,0,0.18)'}`,
                                      display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {m && <img src={sprUrl(m)} alt={m} crossOrigin="anonymous"
                             style={{ width:'92%', height:'92%', objectFit:'contain',
                                      filter:'drop-shadow(0 3px 6px rgba(0,0,0,0.8))' }}/>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: isVGC ? 200 : 230, lineHeight:0.82,
                        color:COLORS.orange, letterSpacing:2, textShadow:'0 0 60px rgba(255,107,0,0.35)' }}>
            {result}
          </div>
          {record && (
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:44, letterSpacing:4, color:COLORS.gold }}>
              {record}
            </div>
          )}
          <div style={{ width:120, height:4, background:COLORS.orange, margin:'22px 0 18px' }}></div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:66, lineHeight:0.95,
                        color:COLORS.white, letterSpacing:2 }}>
            {first}{rest.length > 0 && <><br/>{rest.join(' ')}</>}
          </div>
          <div style={{ display:'flex', marginTop:14 }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, letterSpacing:4,
                           color:COLORS.bg, background:catColor, borderRadius:4, padding:'5px 16px 1px' }}>
              {category} Division
            </span>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, letterSpacing:4, marginLeft:10,
                           color:COLORS.white, border:`1.5px solid ${COLORS.white}`, borderRadius:4, padding:'4px 14px 0' }}>
              {game}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PlayerResultTemplate });
