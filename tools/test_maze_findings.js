/*
 * Labirent yazım aracı — DENETİM BULGULARI regresyon paketi.
 *
 * Çalıştırma: NODE_PATH=$(npm root -g) node tools/test_maze_findings.js
 *
 * Bağımsız canon denetçisi ve level designer denetiminden çıkan her bulgu için
 * bir test. Amaç: düzeltilen bir kusurun sessizce geri gelmemesi.
 */
const {chromium}=require('playwright');
const FILE='file://'+require('path').resolve(__dirname,'maze_tool.html');
let fails=0;
const ok=(n,c,x='')=>{console.log((c?'  PASS ':'  FAIL ')+n+(x?'  ['+x+']':'')); if(!c)fails++;};

(async()=>{
  const b=await chromium.launch();
  const pg=await b.newPage({viewport:{width:1600,height:950}});
  const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
  pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await pg.goto(FILE); await pg.waitForTimeout(500);

  console.log('\n== K2 — tek yönlü kapı erişilebilirlik denetimini delmemeli ==');
  const k2=await pg.evaluate(()=>{
    createDoc('enkaz');
    for(const c of doc.cells) c.kind=(c.y===0&&c.x<5)?'normal':'void';
    for(const e of doc.edges) e.state='wall';
    for(let x=0;x<4;x++){ const e=edgeBetween(x,0,x+1,0); e.state='open'; }
    doc.markers=[{id:newId('m'),type:'oyuncu_baslangic',cell:cellAt(0,0).id,edge:null,label:'',props:{yaw:0}}];
    reindex(); computeMetrics();
    const before=M.unreachable.length;
    edgeBetween(2,0,3,0).dir='ba';                     // (3,0)→(2,0) yalnız geri: ileri kapalı
    reindex(); computeMetrics(); validate();
    return {before, after:M.unreachable.length, err:ISSUES.some(i=>i.level==='err'&&i.tag==='§7.2')};
  });
  ok('düz koridorda 0 erişilemeyen', k2.before===0);
  ok('ters yönlü kapının arkası erişilemez sayılıyor', k2.after===2, k2.after+' hücre');
  ok('§7.2 hatası veriliyor', k2.err);

  console.log('\n== C1 — kritik yol zinciri sessizce kısalmamalı ==');
  const c1=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(3,0.7,{}); reindex();
    const put=(t,x,y,p)=>{const m={id:newId('m'),type:t,cell:cellAt(x,y).id,edge:null,label:'',props:defaultProps(t,cellAt(x,y))};
      Object.assign(m.props,p||{}); doc.markers.push(m); return m;};
    const s=put('oyuncu_baslangic',0,0), k=put('kirik_checkpoint',8,8), y=put('sembol_kaynak',14,3,{symbolId:'s1'});
    doc.meta.criticalPath=[s.id,k.id,y.id];
    reindex(); computeMetrics();
    const before=M.cp.budgetMin;
    doc.markers=doc.markers.filter(m=>m.id!==k.id);      // durak marker'ını sil
    reindex(); computeMetrics(); validate();
    return {before:+before.toFixed(1), after:+M.cp.budgetMin.toFixed(1),
            err:ISSUES.some(i=>i.level==='err'&&/çözülemeyen durak/.test(i.msg))};
  });
  ok('durak silinince süre değişiyor', c1.before!==c1.after, c1.before+' → '+c1.after);
  ok('kopuk durak HATA olarak raporlanıyor', c1.err);

  console.log('\n== C2 — bypass edilebilen sembol-kapı yakalanmalı ==');
  const c2=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(11,0.7,{}); reindex();
    const e=doc.edges.find(x=>x.state==='open');
    e.state='door';
    doc.markers=[{id:newId('m'),type:'sembol_kapi',cell:null,edge:e.id,label:'',props:{symbolId:'s1'}}];
    reindex(); computeMetrics(); validate();
    const bypassed=ISSUES.some(i=>i.level==='err'&&/bypass/.test(i.msg));
    // şimdi kapıyı gerçek bir boğaza koy: 2 hücrelik koridor, tek geçit
    createDoc('enkaz');
    for(const c of doc.cells) c.kind=(c.y===0&&c.x<4)?'normal':'void';
    for(const x of [0,1,2]) edgeBetween(x,0,x+1,0).state='open';
    const d=edgeBetween(1,0,2,0); d.state='door';
    doc.markers=[{id:newId('m'),type:'sembol_kapi',cell:null,edge:d.id,label:'',props:{symbolId:'s1'}}];
    reindex(); computeMetrics(); validate();
    const real=!ISSUES.some(i=>/bypass/.test(i.msg));
    return {bypassed, real};
  });
  ok('döngü içindeki kapı "bypass edilebilir" diye hata veriyor', c2.bypassed);
  ok('gerçek boğazdaki kapı hata vermiyor', c2.real);

  console.log('\n== C3 — 60 sn kuralı öğeler ARASI boşluğu ölçmeli ==');
  const c3=await pg.evaluate(()=>{
    createDoc('enkaz'); resizeGrid(40,3);
    for(const c of doc.cells) c.kind=(c.y===0)?'normal':'void';
    for(const e of doc.edges) e.state='wall';
    for(let x=0;x<39;x++) edgeBetween(x,0,x+1,0).state='open';
    doc.markers=[]; doc.meta.cellSize=6; doc.meta.walkSpeed=1.4;   // 1 hücre ≈ 4.3 sn
    reindex(); computeMetrics();
    const bare=M.badRuns.length;
    cellAt(0,0).payoff='manzara: ilk hücre';       // koridorun BAŞINA öğe koy
    computeMetrics();
    const headOnly=M.badRuns.length;               // düzlük hâlâ orada → ihlal sürmeli
    for(let x=5;x<40;x+=10) cellAt(x,0).payoff='landmark: aralıklı';
    computeMetrics();
    return {bare, headOnly, spaced:M.badRuns.length};
  });
  ok('uzun boş koridor ihlal', c3.bare===1, 'badRuns='+c3.bare);
  ok('koridorun BAŞINA tek öğe ihlali KALDIRMIYOR', c3.headOnly===1, 'badRuns='+c3.headOnly);
  ok('düzenli aralıklı öğeler ihlali kaldırıyor', c3.spaced===0, 'badRuns='+c3.spaced);

  console.log('\n== K1/O1 — kaybolma payı bütçe kıyasına girmemeli ==');
  const k1=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(5,0.7,{}); reindex();
    const put=(t,x,y,p)=>{const m={id:newId('m'),type:t,cell:cellAt(x,y).id,edge:null,label:'',props:defaultProps(t,cellAt(x,y))};
      Object.assign(m.props,p||{}); doc.markers.push(m); return m;};
    const s=put('oyuncu_baslangic',0,0), y=put('sembol_kaynak',15,15,{symbolId:'s1'});
    doc.meta.criticalPath=[s.id,y.id];
    doc.meta.explorationFactor=1.0; reindex(); computeMetrics();
    const b1=M.cp.budgetMin, m1=M.cp.medianMin;
    doc.meta.explorationFactor=2.5; computeMetrics();
    return {b1:+b1.toFixed(3), b2:+M.cp.budgetMin.toFixed(3), m1:+m1.toFixed(3), m2:+M.cp.medianMin.toFixed(3)};
  });
  ok('kaybolma payı bütçe kıyasını DEĞİŞTİRMİYOR', k1.b1===k1.b2, k1.b1+' vs '+k1.b2);
  ok('kaybolma payı yalnız medyan tahminini etkiliyor', k1.m2>k1.m1, k1.m1+' → '+k1.m2);

  console.log('\n== O2/O8 — backtracking ölçülüyor ==');
  const bt=await pg.evaluate(()=>{
    createDoc('enkaz'); resizeGrid(20,3);
    for(const c of doc.cells) c.kind=(c.y===0)?'normal':'void';
    for(const e of doc.edges) e.state='wall';
    for(let x=0;x<19;x++) edgeBetween(x,0,x+1,0).state='open';
    const put=(t,x)=>{const m={id:newId('m'),type:t,cell:cellAt(x,0).id,edge:null,label:'',props:defaultProps(t,cellAt(x,0))};doc.markers.push(m);return m;};
    const a=put('oyuncu_baslangic',0), c=put('kirik_checkpoint',19), d=put('sembol_kaynak',0);
    doc.meta.criticalPath=[a.id,c.id,d.id];        // git-gel = %50 tekrar
    reindex(); computeMetrics(); validate();
    return {rep:+M.cp.repeatRatio.toFixed(2), warn:ISSUES.some(i=>/tekrar yürüme/.test(i.msg))};
  });
  ok('git-gel zinciri ~%50 tekrar ölçüyor', bt.rep>=0.45&&bt.rep<=0.55, '%'+(bt.rep*100));
  ok('backtracking uyarısı çıkıyor (§7.3)', bt.warn);

  console.log('\n== C4/C5 — oda fırçası ve room hücrelerin korunması ==');
  const rm=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(21,0.7,{}); reindex();
    applyRoom({x0:2,y0:2,x1:6,y1:6}, false); reindex();
    const cells=rectCells({x0:2,y0:2,x1:6,y1:6});
    const allRoom=cells.every(c=>c.kind==='room');
    let inner=0, open=0;
    const set=new Set(cells.map(c=>c.id));
    for(const c of cells) for(const n of neighbors(c)){ if(!set.has(n.id)) continue;
      const e=edgeBetween(c.x,c.y,n.x,n.y); if(e){inner++; if(edgeOpen(e)) open++;} }
    const before=open;
    generate(99999,0.7,{}); reindex();             // yeniden üret
    let openAfter=0;
    for(const c of cells) for(const n of neighbors(c)){ if(!set.has(n.id)) continue;
      const e=edgeBetween(c.x,c.y,n.x,n.y); if(e&&edgeOpen(e)) openAfter++; }
    return {allRoom, before, openAfter, inner};
  });
  ok('oda fırçası hücreleri room yapıyor', rm.allRoom);
  ok('oda fırçası TÜM iç kenarları açıyor', rm.before===rm.inner, rm.before+'/'+rm.inner);
  ok('avlu yeniden üretimde HAYATTA kalıyor', rm.openAfter===rm.before, rm.before+' → '+rm.openAfter);

  console.log('\n== O5(denetçi) — üretim sembol-kapıyı bozmamalı ==');
  const gd=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(7,0.7,{}); reindex();
    const e=doc.edges.find(x=>x.state==='open'); e.state='door';
    doc.markers=[{id:newId('m'),type:'sembol_kapi',cell:null,edge:e.id,label:'',props:{symbolId:'s1'}}];
    reindex(); generate(4242,0.7,{}); reindex();
    return edgeById(e.id).state;
  });
  ok('marker taşıyan kapı kenarı üretimden sağ çıkıyor', gd==='door', 'state='+gd);

  console.log('\n== C6 — kenar sürüklemesi kapı üretmemeli ==');
  await pg.evaluate(()=>{ createDoc('enkaz'); generate(31,0.7,{}); refreshAll(); fitView(); setTool('edge'); });
  const box=await pg.locator('#cv').boundingBox();
  const doorsBefore=await pg.evaluate(()=>doc.edges.filter(e=>e.state==='door').length);
  await pg.mouse.move(box.x+box.width*0.35, box.y+box.height*0.5);
  await pg.mouse.down();
  for(let i=1;i<=12;i++){ await pg.mouse.move(box.x+box.width*0.35+i*14, box.y+box.height*0.5); }
  await pg.mouse.up(); await pg.waitForTimeout(150);
  const doorsAfter=await pg.evaluate(()=>doc.edges.filter(e=>e.state==='door').length);
  ok('sürükleme sıfır kapı üretiyor', doorsAfter===doorsBefore, doorsBefore+' → '+doorsAfter);

  console.log('\n== C7 — marker paletinin 11 tipi de görünür ==');
  const pal=await pg.evaluate(()=>{
    const box=document.getElementById('markerPalette');
    const items=[...box.children];
    const br=box.getBoundingClientRect();
    return {n:items.length, overflow:box.scrollHeight>box.clientHeight+1,
            visible:items.filter(it=>{const r=it.getBoundingClientRect();
              return r.top>=br.top-1 && r.bottom<=br.bottom+1;}).length};
  });
  ok('palette 11 tip var', pal.n===11, ''+pal.n);
  ok('11 tipin hepsi kaydırmasız görünüyor', pal.visible===11 && !pal.overflow, pal.visible+'/'+pal.n+(pal.overflow?' (taşıyor)':''));

  console.log('\n== O3(LD) — başlangıç yokken sahte yeşil olmamalı ==');
  const fg=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(13,0.7,{}); doc.markers=[]; refreshAll();
    return document.getElementById('metrics').innerText;
  });
  ok('"Erişilemeyen hücre —" gösteriliyor', /Erişilemeyen hücre\s*—/.test(fg), fg.match(/Erişilemeyen hücre[^\n]*/)?.[0]||'?');

  console.log('\n== K4 — belge Kırık\'ta olmalı (§8.1/§8.4) ==');
  const bg=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(17,0.7,{}); reindex();
    const mk=(t,x,y,p)=>{const m={id:newId('m'),type:t,cell:cellAt(x,y).id,edge:null,label:'',props:defaultProps(t,cellAt(x,y))};
      Object.assign(m.props,p||{}); doc.markers.push(m); return m;};
    mk('kirik_checkpoint',4,4);
    mk('belge',12,12,{tur:'tutanak'});
    reindex(); computeMetrics(); validate();
    const far=ISSUES.some(i=>i.level==='err'&&i.tag==='§8.1');
    doc.markers=doc.markers.filter(m=>m.type!=='belge');
    mk('belge',4,5,{tur:'tutanak'});                 // Kırık'ın yanına
    reindex(); computeMetrics(); validate();
    const near=!ISSUES.some(i=>i.tag==='§8.1');
    doc.markers=doc.markers.filter(m=>m.type!=='belge');
    mk('belge',12,12,{tur:'grafiti'});               // grafiti duvar katmanı, serbest
    reindex(); computeMetrics(); validate();
    return {far, near, graffiti:!ISSUES.some(i=>i.tag==='§8.1')};
  });
  ok('Kırık\'tan uzak tutanak HATA veriyor', bg.far);
  ok('Kırık\'ın yanındaki tutanak temiz', bg.near);
  ok('grafiti Kırık\'a bağlı değil', bg.graffiti);

  console.log('\n== K3 — marker yönelimi (şema v2) ==');
  const or=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(23,0.7,{}); reindex();
    const c=cellAt(5,5);
    const m={id:newId('m'),type:'cizer_slot',cell:c.id,edge:null,label:'',props:defaultProps('cizer_slot',c)};
    doc.markers.push(m); reindex(); computeMetrics(); validate();
    const hasFace=!!m.props.face;
    const clean=!ISSUES.some(i=>i.tag==='SEMA §6'&&i.level==='err');
    delete m.props.face; reindex(); computeMetrics(); validate();
    const missing=ISSUES.some(i=>i.tag==='SEMA §6'&&i.level==='err');
    // v1 dosyası yüklenince göç etmeli
    m.props.face='n';
    const t=serialize(doc).replace('"version": '+SCHEMA_VERSION,'"version": 1');
    const j=JSON.parse(t); for(const x of j.markers) if(x.props) delete x.props.face;
    adoptDoc(j);
    const migrated=doc.markers.filter(x=>x.type==='cizer_slot').every(x=>!!x.props.face);
    return {hasFace, clean, missing, migrated, version:doc.version, cur:SCHEMA_VERSION};
  });
  ok('yeni marker otomatik face alıyor', or.hasFace);
  ok('face varken hata yok', or.clean);
  ok('face silinince HATA veriyor', or.missing);
  ok('v1 dosyası güncel şemaya göç ediyor', or.migrated && or.version===or.cur, 'v1 → v'+or.version);

  console.log('\n== O8(LD) — meta değerleri sınırlanmalı ==');
  const mt=await pg.evaluate(()=>{
    createDoc('enkaz');
    doc.meta.cellSize=-4; doc.meta.fogMin=500; doc.meta.fogMax=5; doc.meta.explorationFactor=99;
    reindex(); computeMetrics(); validate();
    return {cell:ISSUES.some(i=>i.level==='err'&&/cellSize/.test(i.msg)),
            fog:ISSUES.some(i=>/Sis bandı/.test(i.msg)),
            expl:ISSUES.some(i=>/Kaybolma payı/.test(i.msg))};
  });
  ok('cellSize ≤ 0 HATA', mt.cell);
  ok('sis bandı 40–80 dışı uyarı', mt.fog);
  ok('kaybolma payı > 1.2 uyarı', mt.expl);

  console.log('\n== O9(LD) — marker yerleşim denetimleri ==');
  const pl=await pg.evaluate(()=>{
    createDoc('sighlik_2a'); generate(29,0.7,{}); reindex();
    const mk=(t,x,y,p)=>{const m={id:newId('m'),type:t,cell:cellAt(x,y).id,edge:null,label:'',props:defaultProps(t,cellAt(x,y))};
      Object.assign(m.props,p||{}); doc.markers.push(m); return m;};
    // ölü uçta Çizer
    const dead=doc.cells.find(c=>isPass(c)&&neighbors(c).filter(n=>edgeOpen(edgeBetween(c.x,c.y,n.x,n.y))).length===1);
    mk('cizer_slot',dead.x,dead.y,{perde:'p1'});
    // radius geçersiz anomali
    mk('anomali_alani',3,3,{radius:'abc'});
    reindex(); computeMetrics(); validate();
    return {deadCizer:ISSUES.some(i=>/ölü uçta/.test(i.msg)),
            radius:ISSUES.some(i=>i.level==='err'&&/radius/.test(i.msg))};
  });
  ok('ölü uçtaki Çizer yuvası uyarı veriyor (§5.2)', pl.deadCizer);
  ok('geçersiz anomali radius HATA veriyor (§7.5 denetimini kapatıyordu)', pl.radius);

  console.log('\n== D5 — yinelenen ödeme metni yakalanıyor ==');
  const dup=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(37,0.7,{}); reindex(); computeMetrics();
    for(const c of M.unpaid) c.payoff='grafiti: aynı metin';
    reindex(); computeMetrics(); validate();
    return ISSUES.some(i=>i.tag==='§7.7-3' && /(tekrar ediyor|Aynı ödeme metni)/.test(i.msg));
  });
  ok('kopyala-yapıştır ödeme yakalanıyor (§7.7-3)', dup);

  console.log('\n== Toplu ödeme akışı (O6/LD) ==');
  const bulk=await pg.evaluate(()=>{
    createDoc('sighlik_2a'); generate(41,0.7,{}); refreshAll();
    const before=M.unpaid.length;
    document.querySelector('#pDebt').classList.remove('collapsed');
    renderDebt();
    document.querySelector('[data-pc="manzara"]').click();
    return {before, after:M.unpaid.length, drafts:M.deadEnds.filter(c=>payoffClass(c.payoff)&&!payoffDetail(c.payoff)).length};
  });
  ok('toplu sınıf ataması ödenmemişleri sıfırlıyor', bulk.after===0, bulk.before+' → '+bulk.after);
  ok('sınıf atanan ama metni yazılmayanlar ayrı sayılıyor', bulk.drafts===bulk.before, ''+bulk.drafts);

  ok('konsol/sayfa hatası yok', errs.length===0, errs.slice(0,3).join(' | '));
  console.log('\n===== '+(fails? fails+' BULGU TESTİ BAŞARISIZ':'TÜM BULGU TESTLERİ GEÇTİ')+' =====');
  await b.close(); process.exit(fails?1:0);
})();
