/*
 * Labirent yazım aracı — ROTA AĞI testi.
 *
 * Çalıştırma: NODE_PATH=$(npm root -g) node tools/test_maze_routenet.js
 *
 * İki iddia sınanır:
 *   (a) AĞ  — f[c]+b[c] <= D+pay olan hücrelerin kümesi gerçekten "oyuncunun
 *       gidebileceği" hücrelerdir (yönlü kapılara saygılı).
 *   (b) ZORUNLU — aday kümesini kritik yolla sınırlamak KAYIPSIZDIR. Bu iddia
 *       kaba kuvvetle (her geçilebilir hücreyi tek tek kapatarak) doğrulanır.
 */
const {chromium}=require('playwright');
const path=require('path'), fs=require('fs');
const FILE='file://'+path.resolve(__dirname,'maze_tool.html');
let fails=0;
const ok=(n,c,x='')=>{console.log((c?'  PASS ':'  FAIL ')+n+(x?'  ['+x+']':'')); if(!c)fails++;};

(async()=>{
  const b=await chromium.launch();
  const pg=await b.newPage({viewport:{width:1600,height:950}});
  const errs=[]; pg.on('pageerror',e=>errs.push(e.message));
  pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await pg.goto(FILE); await pg.waitForTimeout(400);

  const ornek=fs.readFileSync(path.resolve(__dirname,'ornek.maze.json'),'utf8');

  /* ---------------------------------------------------------------- 1 */
  console.log('\n== 1. Zorunluluk kaba kuvvetle doğrulanıyor ==');
  const brute=await pg.evaluate((txt)=>{
    loadText(txt,'ornek.maze.json');
    ROUTE_SLACK=8; NET=null;
    const N=routeNet();
    if(!N.ok) return {err:N.err};
    // Kaba kuvvet: HER geçilebilir hücreyi kapat, zincirin herhangi bir leg'i kopuyor mu?
    const legs=N.legs;
    const trueMand=new Set();
    for(const c of doc.cells){
      if(!isPass(c)) continue;
      let breaks=false;
      for(const L of legs){
        if(c.id===L.s || c.id===L.t){ breaks=true; break; }   // durak: tanımı gereği zorunlu
        if(bfsDist(L.s, c.id).get(L.t)==null){ breaks=true; break; }
      }
      if(breaks) trueMand.add(c.id);
    }
    const got=[...N.mandatory].sort().join(',');
    const exp=[...trueMand].sort().join(',');
    // aynı şey kenarlar için
    const trueME=new Set();
    for(const e of doc.edges){
      if(!edgeOpen(e)) continue;
      for(const L of legs) if(bfsDist(L.s, null, e.id).get(L.t)==null){ trueME.add(e.id); break; }
    }
    const gotE=[...N.mandEdges].sort().join(',');
    const expE=[...trueME].sort().join(',');
    // zorunlu hücreler kritik yolun üstünde mi? (aday kümesi iddiası)
    const cpSet=new Set(M.cp.cells);
    const disari=[...trueMand].filter(id=>!cpSet.has(id));
    return {ok:true, esit:got===exp, esitE:gotE===expE, n:N.mandatory.size, nb:trueMand.size,
            nE:N.mandEdges.size, nEb:trueME.size, disari:disari.length};
  }, ornek);
  ok('kritik yol dışında rota ağı hesaplanabildi', !brute.err, brute.err||'');
  ok('zorunlu HÜCRE kümesi kaba kuvvetle birebir aynı', brute.esit, brute.n+' vs '+brute.nb);
  ok('zorunlu KENAR kümesi kaba kuvvetle birebir aynı', brute.esitE, brute.nE+' vs '+brute.nEb);
  ok('kritik yol DIŞINDA zorunlu hücre yok (aday kümesi kayıpsız)', brute.disari===0, 'dışarıda '+brute.disari);

  /* ---------------------------------------------------------------- 2 */
  console.log('\n== 2. Ağ tanımı: sağlam ve tam ==');
  const net=await pg.evaluate((txt)=>{
    loadText(txt,'ornek.maze.json');
    const res={};
    for(const sl of [0,4,16]){
      ROUTE_SLACK=sl; NET=null;
      const N=routeNet();
      let sagalm=0, eksik=0, fazla=0;
      for(const L of N.legs){
        const f=bfsDist(L.s), b=bfsDistTo(L.t);
        for(const c of doc.cells){
          if(!isPass(c)) continue;
          const fd=f.get(c.id), bd=b.get(c.id);
          const uygun = fd!=null && bd!=null && (fd+bd)<=L.D+sl;
          if(uygun && !N.network.has(c.id)) eksik++;
        }
      }
      // ağdaki her hücre için gerçekten s→c→t yürüyüşü var mı? (bağımsız yol kurma)
      for(const id of N.network){
        let bulundu=false;
        for(const L of N.legs){
          const p1=bfsPath(L.s,id), p2=bfsPath(id,L.t);
          if(p1&&p2 && (p1.length-1)+(p2.length-1) <= L.D+sl){ bulundu=true; break; }
        }
        if(bulundu) sagalm++; else fazla++;
      }
      res['s'+sl]={n:N.network.size, eksik, fazla, sagalm};
    }
    // monotonluk
    const sizes=[];
    for(const sl of [0,2,6,12,24,48]){ ROUTE_SLACK=sl; NET=null; sizes.push(routeNet().network.size); }
    let mono=true; for(let i=1;i<sizes.length;i++) if(sizes[i]<sizes[i-1]) mono=false;
    // slack 0: kritik yolun her hücresi ağda olmalı
    ROUTE_SLACK=0; NET=null;
    const N0=routeNet();
    const cpIcinde=M.cp.cells.every(id=>N0.network.has(id));
    return {res, sizes, mono, cpIcinde};
  }, ornek);
  for(const k of ['s0','s4','s16'])
    ok('pay '+k.slice(1)+': ağ eksiksiz (kaçırılan hücre yok)', net.res[k].eksik===0, JSON.stringify(net.res[k]));
  for(const k of ['s0','s4','s16'])
    ok('pay '+k.slice(1)+': ağdaki her hücrenin gerçek yürüyüşü var', net.res[k].fazla===0, JSON.stringify(net.res[k]));
  ok('ağ sapma payıyla monoton büyür', net.mono, net.sizes.join('→'));
  ok('pay 0 iken kritik yolun tamamı ağın içinde', net.cpIcinde);

  /* ---------------------------------------------------------------- 3 */
  console.log('\n== 3. Tek yönlü kapı: ağ yöne saygılı ==');
  const ow=await pg.evaluate(()=>{
    // 1×N koridor: A -> B -> C, B→C tek yönlü ileri. C'den geri dönülemez.
    createDoc('enkaz'); doc.meta.gridW=6; doc.meta.gridH=1; buildLattice(6,1); reindex();
    for(let x=0;x<5;x++){ const e=edgeBetween(x,0,x+1,0); e.state='open'; e.dir='both'; }
    const put=(t,x,p)=>{const c=cellAt(x,0);
      const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    const a=put('oyuncu_baslangic',0,{yaw:90});
    const z=put('sembol_kaynak',3,{symbolId:'s1'});
    doc.meta.criticalPath=[a.id,z.id];
    reindex(); computeMetrics(); ROUTE_SLACK=10; NET=null;
    const iki=routeNet();
    const duz={net:iki.network.size, mand:iki.mandatory.size};
    // 3→4 kenarını 4→3 tek yön yap: 4 ve 5'e artık GİDİLEMEZ, ağ dışında kalmalı
    const e=edgeBetween(3,0,4,0); e.state='open'; e.dir='ba';    // b→a yani (4,0)→(3,0)
    reindex(); computeMetrics(); NET=null;
    const N=routeNet();
    const dortIcinde=N.network.has(cellAt(4,0).id);
    // düz koridorda 1,2 hücreleri ZORUNLUDUR
    const zorunlu=[1,2].every(x=>N.mandatory.has(cellAt(x,0).id));
    return {duz, dortIcinde, zorunlu, net:N.network.size};
  });
  ok('tek yön arkasındaki hücre ağa GİRMEZ', ow.dortIcinde===false, JSON.stringify(ow));
  ok('tek koridorda ara hücreler zorunlu', ow.zorunlu);

  /* ---------------------------------------------------------------- 4 */
  console.log('\n== 4. Türetilenler tutarlı ==');
  const der=await pg.evaluate((txt)=>{
    loadText(txt,'ornek.maze.json'); ROUTE_SLACK=8; NET=null;
    const N=routeNet();
    // segment hücrelerinin toplamı = zorunlu küme, çakışma yok
    const all=new Set(); let cift=0;
    for(const g of N.segments) for(const c of g.cells){ if(all.has(c.id)) cift++; all.add(c.id); }
    const toplamEsit = all.size===N.mandatory.size && cift===0 &&
                       [...all].every(id=>N.mandatory.has(id));
    // her segment BAĞLANTILI mı?
    let bagli=true;
    for(const g of N.segments){
      const set=new Set(g.cells.map(c=>c.id)); const seen=new Set([g.cells[0].id]); const q=[g.cells[0]];
      for(let h=0;h<q.length;h++){ const c=q[h];
        for(const n of neighbors(c)){ if(!set.has(n.id)||seen.has(n.id)) continue;
          const e=edgeBetween(c.x,c.y,n.x,n.y); if(e&&edgeOpen(e)){ seen.add(n.id); q.push(n); } } }
      if(seen.size!==set.size) bagli=false;
    }
    const sirali=N.segments.every((g,i)=>i===0||N.segments[i-1].len>=g.len);
    // zorunlu ⟺ bypass sonsuz;  pratikte zorunlu ⊇ zorunlu
    const bypassOK=[...N.mandatory].every(id=>N.bypass.get(id)===Infinity);
    const pratikOK=[...N.mandatory].every(id=>N.practical.has(id));
    const negatifYok=[...N.bypassLeg.values()].every(v=>v>=0);
    // zorunlu kenarın iki ucu da zorunlu olmalı
    let ucOK=true;
    for(const eid of N.mandEdges){ const e=edgeById(eid); const [A,B]=edgeCells(e);
      if(!N.mandatory.has(A.id)||!N.mandatory.has(B.id)) ucOK=false; }
    // marker sayımı doğru mu
    let markOK=true;
    for(const g of N.segments){
      let k=0; for(const c of g.cells) k+=(ix.markByCell.get(c.id)||[]).length;
      if(k!==g.markers) markOK=false;
    }
    return {toplamEsit, bagli, sirali, bypassOK, pratikOK, negatifYok, ucOK, markOK,
            segs:N.segments.length, mand:N.mandatory.size};
  }, ornek);
  ok('segmentler zorunlu kümeyi tam ve çakışmasız böler', der.toplamEsit, der.segs+' koridor / '+der.mand+' hücre');
  ok('her zorunlu koridor bağlantılı', der.bagli);
  ok('koridorlar uzunluğa göre sıralı', der.sirali);
  ok('zorunlu hücrenin bypass bedeli sonsuz', der.bypassOK);
  ok('pratikte zorunlu kümesi zorunluları içerir', der.pratikOK);
  ok('bypass bedeli negatif değil', der.negatifYok);
  ok('zorunlu kenarın iki ucu da zorunlu', der.ucOK);
  ok('koridor marker sayımı doğru', der.markOK);

  /* ---------------------------------------------------------------- 5 */
  console.log('\n== 5. Arayüz ==');
  await pg.evaluate((txt)=>loadText(txt,'ornek.maze.json'), ornek);
  await pg.click('#pNet > h2');                        // paneli aç
  await pg.waitForTimeout(250);
  const ui=await pg.evaluate(()=>({
    acik: !document.getElementById('pNet').classList.contains('collapsed'),
    stat: document.getElementById('netStats').textContent.length,
    segs: document.querySelectorAll('#netSegs [data-seg]').length,
    tog:  !!document.querySelector('[data-v="net"]') && !!document.querySelector('[data-v="must"]'),
    slack: document.getElementById('fSlack').value
  }));
  ok('panel açılıyor ve istatistik yazıyor', ui.acik && ui.stat>40, 'stat '+ui.stat);
  ok('zorunlu koridor listesi doluyor', ui.segs>0, ui.segs+' satır');
  ok('iki yeni görünüm katmanı var', ui.tog);
  ok('sapma payı alanı dolu', +ui.slack>=0, ui.slack);

  await pg.click('#bNetShow'); await pg.waitForTimeout(150);
  const lay=await pg.evaluate(()=>({net:VIEW.net, must:VIEW.must}));
  ok('"Katmanları aç" iki katmanı da yakar', lay.net&&lay.must);

  const before=await pg.evaluate(()=>({x:view.px,y:view.py}));
  await pg.click('#bNetEmpty'); await pg.waitForTimeout(150);
  const after=await pg.evaluate(()=>({x:view.px,y:view.py,sel:sel.t}));
  ok('"Boş koridora git" görüşü taşıyor', before.x!==after.x||before.y!==after.y||after.sel==='cell');

  // sapma payı localStorage'a yazılır, ŞEMAYA yazılmaz
  await pg.evaluate(()=>{ const i=document.getElementById('fSlack'); i.value='21'; i.onchange(); });
  await pg.waitForTimeout(120);
  const kal=await pg.evaluate(()=>({ls:localStorage.getItem('project_maze.tool.slack'),
                                    inDoc:JSON.stringify(doc).includes('slack'), v:ROUTE_SLACK}));
  ok('sapma payı localStorage\'a yazılır', kal.ls==='21', String(kal.ls));
  ok('sapma payı BELGEYE yazılmaz (SEMA v3 donuk)', kal.inDoc===false);

  /* ---------------------------------------------------------------- 6 */
  console.log('\n== 6. Başarım ve dayanıklılık ==');
  const perf=await pg.evaluate(()=>{
    createDoc('sighlik_2a'); generate(4242,0.30,{}); reindex();
    const put=(t,fx,fy,p)=>{const W=doc.meta.gridW,H=doc.meta.gridH;
      const c=cellAt(Math.round(fx*(W-1)),Math.round(fy*(H-1)));
      const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    const a=put('oyuncu_baslangic',0.03,0.03,{yaw:90});
    const s=put('sembol_kaynak',0.5,0.9,{symbolId:'s1'});
    const z=put('kirik_checkpoint',0.97,0.97,{});
    doc.meta.criticalPath=[a.id,s.id,z.id];
    reindex(); computeMetrics(); ROUTE_SLACK=8; NET=null;
    const t0=performance.now(); const N=routeNet(); const ms=performance.now()-t0;
    return {ms, ok:N.ok, net:N.network.size, mand:N.mandatory.size, scope:M.scopeTotal, cp:M.cp.cells.length};
  });
  ok('42×38 bölgede rota ağı < 600 ms', perf.ok && perf.ms<600, perf.ms.toFixed(0)+' ms · ağ '+perf.net+' · zorunlu '+perf.mand);

  const bos=await pg.evaluate(()=>{
    createDoc('enkaz'); doc.markers.length=0; doc.meta.criticalPath=[];
    reindex(); computeMetrics(); NET=null;
    const N=routeNet();
    renderNet();
    return {ok:N.ok, err:!!N.err, panel:document.getElementById('netStats').textContent.length>0};
  });
  ok('kritik yol yokken çökmez, sebebi yazar', bos.ok===false && bos.err && bos.panel);

  /* ---------------------------------------------------------------- 7 */
  console.log('\n== 7. Denetim bulguları ==');

  // K5 — çatal tanımı: AYRILMA sayılır, birleşme değil.
  const fork=await pg.evaluate(()=>{
    createDoc('enkaz'); doc.meta.gridW=3; doc.meta.gridH=3; buildLattice(3,3); reindex();
    const open=(x1,y1,x2,y2)=>{const e=edgeBetween(x1,y1,x2,y2); e.state='open'; e.dir='both';};
    open(0,1,0,0); open(0,0,1,0); open(1,0,2,0); open(2,0,2,1);   // kuzey kolu
    open(0,1,0,2); open(0,2,1,2); open(1,2,2,2); open(2,2,2,1);   // güney kolu
    const put=(t,x,y,p)=>{const c=cellAt(x,y);
      const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    const a=put('oyuncu_baslangic',0,1,{yaw:90});
    const z=put('kirik_checkpoint',2,1,{});
    doc.meta.criticalPath=[a.id,z.id];
    reindex(); computeMetrics(); ROUTE_SLACK=0; NET=null;
    const N=routeNet();
    const fid=new Set(N.forks.map(c=>c.id));
    // eski (yanlış) tanım: ağda ≥3 ağ-komşusu
    let eski=0;
    for(const id of N.network){ const c=cellById(id); let k=0;
      for(const n of neighbors(c)){ if(!N.network.has(n.id)) continue;
        const e=edgeBetween(c.x,c.y,n.x,n.y); if(e&&edgeOpen(e)) k++; }
      if(k>=3) eski++; }
    return {ayrilma:fid.has(cellAt(0,1).id), birlesme:fid.has(cellAt(2,1).id),
            n:N.forks.length, eski, net:N.network.size, mand:N.mandatory.size};
  });
  ok('gerçek AYRILMA noktası çatal sayılıyor', fork.ayrilma, JSON.stringify(fork));
  ok('BİRLEŞME noktası çatal sayılmıyor', fork.birlesme===false);
  ok('eski "≥3 ağ-komşusu" tanımı bu çatalı kaçırıyordu', fork.eski===0, 'eski '+fork.eski+' / yeni '+fork.n);
  ok('halkada zorunlu hücre yok (iki eşit kol)', fork.mand===2, 'yalnız 2 durak');

  // Ö-b — tek yön yokken zorunlu kenarlar köprü olmak ZORUNDA (bağımsız Tarjan ile çapraz kontrol)
  const kopru=await pg.evaluate((txt)=>{
    loadText(txt,'ornek.maze.json'); ROUTE_SLACK=8; NET=null;
    const N=routeNet();
    const hepsiKopru=[...N.mandEdges].every(id=>M.bridges.has(id));
    return {oneWays:M.oneWays, hepsiKopru, n:N.mandEdges.size, kopru:M.bridges.size};
  }, ornek);
  ok('tek yönlü kenar yok (çapraz kontrolün önkoşulu)', kopru.oneWays===0);
  ok('her zorunlu kenar aynı zamanda köprü (Tarjan ile uyumlu)', kopru.hepsiKopru,
     kopru.n+' zorunlu / '+kopru.kopru+' köprü');

  // Ö8 — zorunlu hücreden geçmek GÖRMEK değildir: arkaya bakan duvar işareti
  const arka=await pg.evaluate(()=>{
    createDoc('enkaz'); doc.meta.gridW=6; doc.meta.gridH=1; buildLattice(6,1); reindex();
    for(let x=0;x<5;x++){ const e=edgeBetween(x,0,x+1,0); e.state='open'; e.dir='both'; }
    const put=(t,x,p)=>{const c=cellAt(x,0);
      const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    const a=put('oyuncu_baslangic',0,{yaw:90});
    const z=put('kirik_checkpoint',5,{});
    const bl=put('belge',2,{tur:'kronoloji', face:'w'});     // batıya asılı = doğuya yürüyene SIRTI
    doc.meta.criticalPath=[a.id,z.id];
    reindex(); computeMetrics(); ROUTE_SLACK=0; NET=null;
    const geri=routeNet().behind.length;
    bl.props.face='e'; reindex(); computeMetrics(); NET=null;   // ileriye bakan duvar
    const ileri=routeNet().behind.length;
    bl.props.face='n'; reindex(); computeMetrics(); NET=null;   // yan duvar: geçerken görülür
    const yan=routeNet().behind.length;
    return {geri, ileri, yan};
  });
  ok('yürüme yönüne SIRTI dönük işaret yakalanıyor', arka.geri===1, 'geri '+arka.geri);
  ok('ileriye bakan işaret uyarı üretmiyor', arka.ileri===0);
  ok('yan duvardaki işaret uyarı üretmiyor (geçerken görülür)', arka.yan===0);

  // K4 — otomatik türetilmiş zincir üstünden canon hükmü verilmez, panelde söylenir
  const oto=await pg.evaluate((txt)=>{
    loadText(txt,'ornek.maze.json');
    doc.meta.criticalPath=[]; reindex(); computeMetrics(); NET=null;
    document.getElementById('pNet').classList.remove('collapsed');
    renderNet();
    const t=document.getElementById('netStats').textContent;
    return {auto:M.cp.auto, uyari:/alt sınır/.test(t)};
  }, ornek);
  ok('otomatik zincir tespit ediliyor', oto.auto);
  ok('panel "alt sınır" uyarısını yazıyor', oto.uyari);

  // K2/K6 — sapma payı ve rota ağı DOĞRULAYICIYA hiç girmez (localStorage'a bağlı hüküm olmaz)
  const ayrik=await pg.evaluate((txt)=>{
    loadText(txt,'ornek.maze.json');
    const say=()=>{ computeMetrics(); validate(); return ISSUES.length; };
    ROUTE_SLACK=0;  NET=null; const a=say();
    ROUTE_SLACK=64; NET=null; const b=say();
    return {a,b};
  }, ornek);
  ok('sapma payı doğrulama listesini DEĞİŞTİRMİYOR', ayrik.a===ayrik.b, ayrik.a+' vs '+ayrik.b);

  ok('konsol/sayfa hatası yok', errs.length===0, errs.slice(0,2).join(' | '));

  console.log(fails? '\n===== '+fails+' TEST BAŞARISIZ =====' : '\n===== ROTA AĞI TESTLERİ GEÇTİ =====');
  await b.close(); process.exit(fails?1:0);
})();
