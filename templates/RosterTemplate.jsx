// RosterTemplate.jsx — roster giocatori per un regional
// Props: tweaks, players = [{ name, category, game }], photo = url foto di gruppo

const CATEGORY_COLORS = { Junior:'#E8960A', Senior:'#FF6B00', Master:'#C92B0C' };
const CATEGORY_ORDER  = ['Junior','Senior','Master'];
const GAMES = ['TCG','VGC'];
const GAME_LABELS = { TCG:'Pokémon TCG', VGC:'Pokémon VGC' };

const DEFAULT_ROSTER = [
  {name:"Nome Cognome",category:"Master",game:"TCG"},{name:"Nome Cognome",category:"Master",game:"TCG"},
  {name:"Nome Cognome",category:"Master",game:"TCG"},{name:"Nome Cognome",category:"Senior",game:"TCG"},
  {name:"Nome Cognome",category:"Junior",game:"TCG"},{name:"Nome Cognome",category:"Master",game:"VGC"},
  {name:"Nome Cognome",category:"Master",game:"VGC"},{name:"Nome Cognome",category:"Senior",game:"VGC"},
];

function CategoryChip({ category, size=18 }) {
  const c = CATEGORY_COLORS[category] || COLORS.orange;
  return (
    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:size, letterSpacing:1.5,
                   color:c, border:`1.5px solid ${c}`, borderRadius:4,
                   padding:`${size*0.12}px ${size*0.4}px 0`, lineHeight:1.25, flexShrink:0 }}>
      {category}
    </span>
  );
}

function RosterTemplate({ tweaks, players, photo }) {
  const regionalName = tweaks.regionalName || "Regional Città";
  const regionalDate = tweaks.regionalDate || "DD Month YYYY";
  const handle       = tweaks.handle       || "cicciogamer89tcg_genova";
  const list = (players && players.length ? players : DEFAULT_ROSTER);
  const sortCat = (a,b) => CATEGORY_ORDER.indexOf(b.category) - CATEGORY_ORDER.indexOf(a.category);
  const groups = GAMES.map(g => ({ g, items: list.filter(p => (p.game||'TCG') === g).sort(sortCat) }))
                      .filter(x => x.items.length);
  const maxRows = Math.max(...groups.map(x => x.items.length), 1);
  const fs = maxRows > 9 ? 20 : maxRows > 7 ? 24 : maxRows > 5 ? 28 : 32;
  const titleFs = regionalName.length > 22 ? 96 : regionalName.length > 16 ? 116 : 136;

  return (
    <div style={{ width:1080, height:1080, background:COLORS.bg, position:'relative', overflow:'hidden',
                  display:'flex', flexDirection:'column' }}>
      {/* Foto di gruppo */}
      <div style={{ position:'relative', flex:1, minHeight:360 }}>
        {photo ? (
          <img src={photo} alt="Team" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        ) : (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
                        background:'repeating-linear-gradient(45deg,#171717,#171717 6px,#1e1e1e 6px,#1e1e1e 12px)' }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, letterSpacing:4,
                           color:'rgba(255,107,0,0.4)', textTransform:'uppercase', marginTop:-120 }}>Foto di gruppo</span>
          </div>
        )}
        <div style={{ position:'absolute', inset:0,
                      background:'linear-gradient(0deg, #0D0D0D 0%, rgba(13,13,13,0.85) 22%, rgba(13,13,13,0) 60%), linear-gradient(180deg, rgba(13,13,13,0.7) 0%, rgba(13,13,13,0) 22%)' }}></div>

        {/* top bar */}
        <div style={{ position:'absolute', top:36, left:48, right:48, display:'flex', alignItems:'center', gap:16 }}>
          <img src="uploads/WhatsApp Image 2026-05-23 at 16.50.59-5ab94ae2.jpeg" alt=""
               style={{ width:72, height:72, borderRadius:10, objectFit:'cover', border:`1.5px solid ${COLORS.border}` }}/>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:600,
                         color:COLORS.white, letterSpacing:1.5 }}>@{handle}</span>
          <span style={{ marginLeft:'auto', fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:4,
                         color:COLORS.bg, background:COLORS.orange, borderRadius:4, padding:'5px 16px 1px' }}>
            Roster ufficiale
          </span>
        </div>

        {/* Titolo torneo */}
        <div style={{ position:'absolute', left:48, right:48, bottom:6 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:titleFs, lineHeight:0.86,
                        color:COLORS.white, letterSpacing:3, textShadow:'0 4px 30px rgba(0,0,0,0.8)' }}>
            {regionalName}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:12 }}>
            <span style={{ width:60, height:4, background:COLORS.orange }}></span>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:34, letterSpacing:4, color:COLORS.gold }}>
              {regionalDate}
            </span>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:34, letterSpacing:3, color:COLORS.textDim }}>
              · {list.length} giocatori
            </span>
          </div>
        </div>
      </div>

      {/* Lista giocatori */}
      <div style={{ flexShrink:0, padding:'28px 48px 36px', display:'grid', alignItems:'start',
                    gridTemplateColumns:`repeat(${groups.length},minmax(0,1fr))`, columnGap:48, position:'relative', zIndex:1 }}>
        {groups.map(({g, items}) => (
          <div key={g} style={{ display:'flex', flexDirection:'column', gap:6, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:12, paddingBottom:8,
                          borderBottom:`2px solid ${COLORS.orange}`, marginBottom:4 }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:34, letterSpacing:3, color:COLORS.orange }}>
                {GAME_LABELS[g]}
              </span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:COLORS.textDim, marginLeft:'auto' }}>
                {items.length}
              </span>
            </div>
            {items.map((p,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, minWidth:0 }}>
                <span style={{ flex:1, minWidth:0, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
                               fontSize:fs, color:COLORS.white, whiteSpace:'nowrap', overflow:'hidden',
                               textOverflow:'ellipsis', lineHeight:1.15 }}>{p.name}</span>
                <CategoryChip category={p.category} size={Math.round(fs*0.62)}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { RosterTemplate, CategoryChip, CATEGORY_COLORS, CATEGORY_ORDER, DEFAULT_ROSTER, GAMES, GAME_LABELS });
