/*
 * Labirent yazım aracı — tarayıcı test paketi.
 *
 * Çalıştırma (Chromium + Playwright gerekir):
 *     NODE_PATH=$(npm root -g) node tools/test_maze_tool.js
 *
 * Araç bir tarayıcı aracı olduğu için testler gerçek Chromium'da, gerçek dosya
 * üzerinde koşar: üretim determinizmi, kilit-sınır kuralı, şema yuvarlak-gidişi
 * (Godot importer'ın sıfır-diff şartı), GDD doğrulama kuralları ve gerçek fare
 * tıklamalarıyla UI. Ekran görüntüsünü /tmp altına yazar.
 */
const {chromium} = require('playwright');
const path = require('path').resolve(__dirname, 'maze_tool.html');
let fails = 0;
const ok = (n,c,extra='') => { console.log((c?'  PASS ':'  FAIL ')+n+(extra?'  ['+extra+']':'')); if(!c) fails++; };

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({viewport:{width:1600,height:950}});
  const errs = [];
  pg.on('console', m => { if(m.type()==='error') errs.push(m.text()); });
  pg.on('pageerror', e => errs.push('PAGEERROR: '+e.message));
  await pg.goto('file://'+path);
  await pg.waitForTimeout(600);

  console.log('\n== 1. Açılış ==');
  ok('konsol hatası yok', errs.length===0, errs.slice(0,4).join(' | '));
  const boot = await pg.evaluate(() => ({
    cells: doc.cells.length, edges: doc.edges.length,
    W: doc.meta.gridW, H: doc.meta.gridH,
    open: doc.edges.filter(edgeOpen).length,
    loop: M.loopRatio, issues: ISSUES.length
  }));
  ok('hücre sayısı = W*H', boot.cells===boot.W*boot.H, boot.cells+' vs '+(boot.W*boot.H));
  ok('kenar sayısı = W(H-1)+(W-1)H', boot.edges===boot.W*(boot.H-1)+(boot.W-1)*boot.H, ''+boot.edges);
  ok('açılışta labirent üretilmiş', boot.open>50, 'open='+boot.open);
  ok('metrikler hesaplandı', typeof boot.loop==='number' && boot.loop>=0);

  console.log('\n== 2. Üretim determinizmi ve örgü ==');
  const gen = await pg.evaluate(() => {
    const sig = () => doc.edges.map(e=>e.state[0]).join('');
    generate(12345, 0.7, {}); const a = sig();
    generate(999, 0.7, {});
    generate(12345, 0.7, {}); const b = sig();
    const res = [];
    for (const br of [0, 0.35, 0.7, 1.0]) {
      generate(4242, br, {}); computeMetrics();
      res.push({br, loop:+M.loopRatio.toFixed(3), dead:M.deadEnds.length, iso:M.isolated.length});
    }
    return {det: a===b, res};
  });
  ok('aynı tohum = aynı labirent (deterministik)', gen.det);
  console.table(gen.res);
  ok('braid=0 → ölü uç çok', gen.res[0].dead > gen.res[3].dead, gen.res[0].dead+' > '+gen.res[3].dead);
  ok('braid arttıkça döngü oranı artar',
     gen.res[0].loop < gen.res[1].loop && gen.res[1].loop < gen.res[2].loop);
  ok('braid=0 mükemmel labirent (döngü ~0)', gen.res[0].loop < 0.02, ''+gen.res[0].loop);
  ok('izole hücre yok', gen.res.every(r=>r.iso===0));

  console.log('\n== 3. Bağlantılılık (üretim tüm hücreleri kapsar) ==');
  const conn = await pg.evaluate(() => {
    generate(777, 0.7, {}); reindex();
    const {nodes, adj} = buildGraph();
    const seen = reachableFrom(nodes[0].id, adj);
    return {total: nodes.length, reached: seen.size};
  });
  ok('tüm geçilebilir hücreler tek bileşende', conn.total===conn.reached, conn.reached+'/'+conn.total);

  console.log('\n== 4. Hedefe ayarla (autoBraid) ==');
  // Doğru değişmez: ulaşılabilir en iyi orana yakınsamak. Döngü oranı `want` içinde
  // basamaklıdır; bazı tohumlarda %70'e ulaşılamaz, ama araç en yakını bulmalıdır.
  const ab = await pg.evaluate(() => {
    const out = [];
    for (const seed of [31337, 4242, 777, 20260901]) {
      generate(seed, 0, {}); const total = computeMetrics().deadEnds.length;
      let bestK = 0, bestL = 0;
      for (let k = 0; k <= total; k++) {                       // kaba kuvvet referansı
        generate(seed, k/total, {}); const l = computeMetrics().loopRatio;
        if (Math.abs(l-0.70) < Math.abs(bestL-0.70)) { bestK = k; bestL = l; }
      }
      const br = autoBraid(seed, 0.70); const got = computeMetrics().loopRatio;
      out.push({seed, brute:+bestL.toFixed(4), auto:+got.toFixed(4), braid:+br.toFixed(3), band:Math.abs(got-0.70)<=0.05});
    }
    return out;
  });
  console.table(ab);
  ok('autoBraid ulaşılabilir en iyi oranı bulur (kaba kuvvetle aynı)', ab.every(r=>r.auto===r.brute));
  ok('sonuç GDD kabul bandında (%70±5)', ab.every(r=>r.band));

  console.log('\n== 5. Kilit-sınır kuralı (SEMA §7) ==');
  const lock = await pg.evaluate(() => {
    generate(5, 0.7, {}); reindex();
    // sol üst 6x6'yı kilitle, imza al
    for (const c of doc.cells) c.locked = (c.x<6 && c.y<6);
    reindex();
    const frozen = doc.edges.filter(e=>!edgeGeneratable(e));
    const before = frozen.map(e=>e.state+e.dir).join('|');
    const beforeIds = doc.edges.map(e=>e.id).join(',');
    generate(88888, 0.7, {}); reindex();
    const after = doc.edges.filter(e=>!edgeGeneratable(e)).map(e=>e.state+e.dir).join('|');
    return {same: before===after, n: frozen.length, idsSame: beforeIds===doc.edges.map(e=>e.id).join(',')};
  });
  ok('kilitli sınıra değen '+lock.n+' kenar yeniden üretimde değişmedi', lock.same);
  ok('üretim ID\'leri değiştirmez (stable ID)', lock.idsSame);

  console.log('\n== 6. Şema yuvarlak-gidiş (round-trip idempotanlık) ==');
  const rt = await pg.evaluate(() => {
    generate(2024, 0.7, {});
    for (const c of doc.cells) c.locked = false;
    // marker'lar ekle
    const s = doc.cells.find(c=>isPass(c));
    doc.markers = [];
    doc.markers.push({id:newId('m'), type:'oyuncu_baslangic', cell:s.id, edge:null, label:'giris', props:{}});
    const dEdge = doc.edges.find(e=>e.state==='open');
    dEdge.state='door';
    doc.markers.push({id:newId('m'), type:'sembol_kapi', cell:null, edge:dEdge.id, label:'', props:{symbolId:'sym_1'}});
    reindex();
    const t1 = serialize(doc);
    adoptDoc(JSON.parse(t1));
    const t2 = serialize(doc);
    adoptDoc(JSON.parse(t2));
    const t3 = serialize(doc);
    // modifiedAt her serileştirmede değişir → o satırı at
    const strip = t => t.split('\n').filter(l=>!l.includes('modifiedAt')).join('\n');
    return {eq12: strip(t1)===strip(t2), eq23: strip(t2)===strip(t3), len:t1.length};
  });
  ok('serialize → adopt → serialize aynı (1↔2)', rt.eq12);
  ok('ikinci tur da aynı (2↔3)', rt.eq23);

  console.log('\n== 7. Doğrulayıcı: canon kuralları tetikleniyor mu ==');
  const val = await pg.evaluate(() => {
    const tags = () => { reindex(); computeMetrics(); validate(); return ISSUES.map(i=>i.tag+':'+i.level); };
    const out = {};
    // 7.5 sabotaj çakışması
    const c1 = doc.cells.find(c=>isPass(c) && c.x>3 && c.y>3);
    doc.markers.push({id:newId('m'), type:'anomali_alani', cell:c1.id, edge:null, label:'', props:{radius:2}});
    const c2 = cellAt(c1.x+1, c1.y);
    doc.markers.push({id:newId('m'), type:'cizer_slot', cell:c2.id, edge:null, label:'', props:{perde:'p1'}});
    out.sabotaj = tags().some(t=>t.startsWith('§7.5:err'));
    // temizle → uyarı gitmeli
    doc.markers = doc.markers.filter(m=>m.type!=='anomali_alani');
    out.sabotajTemiz = !tags().some(t=>t.startsWith('§7.5'));
    // Enkaz'da Çizer yasağı
    out.enkazCizer = doc.meta.zoneId==='enkaz' && tags().some(t=>t.startsWith('§7.3:err'));
    doc.markers = doc.markers.filter(m=>m.type!=='cizer_slot');
    // sembol kaynağı olmayan kapı
    out.kaynaksizKapi = tags().some(t=>t.startsWith('§4.4:err'));
    // iki başlangıç
    const s2 = doc.cells.find(c=>isPass(c) && c.x>8);
    doc.markers.push({id:newId('m'), type:'oyuncu_baslangic', cell:s2.id, edge:null, label:'', props:{}});
    out.ikiBaslangic = tags().some(t=>t.startsWith('ŞEMA:err'));
    doc.markers.pop();
    // öksüz marker
    doc.markers.push({id:newId('m'), type:'belge', cell:'c999999', edge:null, label:'', props:{tur:'tutanak'}});
    out.oksuz = tags().some(t=>t.startsWith('ŞEMA:err'));
    doc.markers.pop();
    // erişilemeyen hücre: bir hücreyi tamamen duvarla çevir
    const iso = doc.cells.find(c=>isPass(c) && c.x>2 && c.y>2 && c.x<10);
    for (const n of neighbors(iso)) { const e = edgeBetween(iso.x,iso.y,n.x,n.y); if(e){e.state='wall';} }
    out.erisilemez = tags().some(t=>t.startsWith('§7.2'));
    tags();
    return out;
  });
  ok('§7.5 sabotaj çakışması yakalandı', val.sabotaj);
  ok('çakışma giderilince uyarı kalkıyor', val.sabotajTemiz);
  ok('Enkaz\'da cizer_slot hata veriyor', val.enkazCizer);
  ok('kaynaksız sembol-kapı hata veriyor', val.kaynaksizKapi);
  ok('çift oyuncu_baslangic hata veriyor', val.ikiBaslangic);
  ok('öksüz marker hata veriyor', val.oksuz);
  ok('erişilemeyen hücre yakalanıyor', val.erisilemez);

  console.log('\n== 8. Izgara yeniden boyutlandırma ==');
  const rs = await pg.evaluate(() => {
    createDoc('sighlik_2a'); generate(11, 0.7, {}); reindex();
    const idsBefore = new Map(doc.cells.filter(c=>c.x<10&&c.y<10).map(c=>[c.x+','+c.y, c.id]));
    const nBefore = doc.nextId;
    resizeGrid(20, 20);
    const keptSame = [...idsBefore].every(([k,id]) => { const [x,y]=k.split(',').map(Number); const c=cellAt(x,y); return c && c.id===id; });
    const okDims = doc.cells.length===400 && doc.edges.length===20*19*2;
    resizeGrid(45, 40);
    const grew = doc.cells.length===1800 && doc.edges.length===45*39+44*40;
    return {keptSame, okDims, grew, idsMonotone: doc.nextId>nBefore};
  });
  ok('küçültmede kalan hücrelerin ID\'si korunur', rs.keptSame);
  ok('küçültme sonrası kafes tutarlı', rs.okDims);
  ok('büyütme sonrası kafes tutarlı', rs.grew);
  ok('nextId monoton artar', rs.idsMonotone);

  console.log('\n== 9. Kritik yol süresi ==');
  const cp = await pg.evaluate(() => {
    createDoc('enkaz'); generate(2, 0.7, {}); reindex();
    const a = cellAt(0,0), b = cellAt(doc.meta.gridW-1, doc.meta.gridH-1);
    doc.markers=[{id:newId('m'),type:'oyuncu_baslangic',cell:a.id,edge:null,label:'',props:{}}];
    const e = doc.edges.find(x=>x.state==='open'&&(x.a===b.id||x.b===b.id));
    e.state='door';
    doc.markers.push({id:newId('m'),type:'sembol_kapi',cell:null,edge:e.id,label:'',props:{symbolId:'s1'}});
    doc.markers.push({id:newId('m'),type:'sembol_kaynak',cell:cellAt(5,5).id,edge:null,label:'',props:{symbolId:'s1'}});
    reindex(); computeMetrics();
    const manual = M.cp.walkMin;
    // hız iki katına çıkarsa süre yarıya inmeli
    doc.meta.walkSpeed *= 2; computeMetrics();
    return {ok:M.cp.ok, steps:M.cp.cells.length-1, manual:+manual.toFixed(3), half:+M.cp.walkMin.toFixed(3), total:+M.cp.totalMin.toFixed(2)};
  });
  ok('kritik yol bulundu', cp.ok, cp.steps+' adım, '+cp.total+' dk');
  ok('walkSpeed×2 → yürüme süresi ÷2', Math.abs(cp.manual/2 - cp.half) < 0.01, cp.manual+' → '+cp.half);

  console.log('\n== 10. Tek yön kapısı yönlü BFS\'e uyuyor ==');
  const ow = await pg.evaluate(() => {
    createDoc('enkaz');
    // 3 hücrelik koridor: (0,0)-(1,0)-(2,0), gerisi void
    for (const c of doc.cells) c.kind = (c.y===0 && c.x<3) ? 'normal' : 'void';
    for (const e of doc.edges) e.state='wall';
    const e1 = edgeBetween(0,0,1,0), e2 = edgeBetween(1,0,2,0);
    e1.state='open'; e2.state='open';
    reindex(); ix._adj = buildGraph().adj;
    const fwd1 = !!bfsPath(cellAt(0,0).id, cellAt(2,0).id);
    e2.dir='ab';   // a=(1,0) → b=(2,0): sadece ileri
    reindex(); ix._adj = buildGraph().adj;
    const fwd2 = !!bfsPath(cellAt(0,0).id, cellAt(2,0).id);
    const back = !!bfsPath(cellAt(2,0).id, cellAt(0,0).id);
    return {fwd1, fwd2, back};
  });
  ok('çift yönde her iki yön de geçilir', ow.fwd1);
  ok('tek yön a→b ileri geçilir', ow.fwd2);
  ok('tek yön a→b geri geçilmez', ow.back===false);

  console.log('\n== 11. 60 sn kuralı ve ödemeyen ölü uç ==');
  const rules = await pg.evaluate(() => {
    createDoc('enkaz');
    const W = doc.meta.gridW;
    for (const c of doc.cells) c.kind = (c.y===0) ? 'normal' : 'void';   // tek düz koridor
    for (const e of doc.edges) e.state='wall';
    for (let x=0;x<W-1;x++) edgeBetween(x,0,x+1,0).state='open';
    doc.markers=[];
    const runCells = W-2;                       // uçlar derece-1, ortası derece-2 koşusu
    doc.meta.cellSize = 6;
    doc.meta.walkSpeed = runCells*6/50;         // koşu ≈ 50 sn → 60 sn tavanının ALTINDA
    reindex(); computeMetrics();
    const long = M.badRuns.length;
    doc.meta.walkSpeed = runCells*6/84;         // koşu ≈ 84 sn → tavanın ÜSTÜNDE
    computeMetrics();
    const long2 = M.badRuns.length;
    doc.markers.push({id:newId('m'),type:'kirik_checkpoint',cell:cellAt(Math.floor(W/2),0).id,edge:null,label:'',props:{}});
    reindex(); computeMetrics();
    const long3 = M.badRuns.length;
    const unpaid1 = M.unpaid.length;
    cellAt(0,0).payoff = 'manzara: kule görüş hattı';
    computeMetrics();
    const unpaid2 = M.unpaid.length;
    // tasarımcı notu "ayırt edici öğe" SAYILMAMALI
    doc.markers=[]; reindex();
    cellAt(Math.floor(W/2),0).note = 'sadece tasarımcı notu';
    computeMetrics();
    const noteIgnored = M.badRuns.length===1;
    return {long, long2, long3, unpaid1, unpaid2, noteIgnored};
  });
  ok('60 sn altındaki koridor ihlal sayılmaz', rules.long===0, 'badRuns='+rules.long);
  ok('60 sn üstü özelliksiz koridor ihlal', rules.long2===1, 'badRuns='+rules.long2);
  ok('koridora marker konunca ihlal kalkar', rules.long3===0);
  ok('ödemeyen ölü uç sayılıyor', rules.unpaid1===2, ''+rules.unpaid1);
  ok('payoff notu ölü ucu öder', rules.unpaid2===1, ''+rules.unpaid2);
  ok('tasarımcı notu ayırt edici öğe sayılmaz', rules.noteIgnored);

  console.log('\n== 12. UI etkileşimi (gerçek tıklama) ==');
  await pg.evaluate(() => { createDoc('enkaz'); generate(7,0.7,{}); refreshAll(); fitView(); });
  await pg.waitForTimeout(200);
  // kenar aracıyla tıkla
  // Not: edgeOpen() kapıyı da "açık" sayar; open→door geçişi sayıyı değiştirmez.
  // Bu yüzden tam durum imzasıyla karşılaştırılır.
  const sigOf = () => pg.evaluate(() => doc.edges.map(e=>e.state[0]+e.dir[0]).join(''));
  const before = await sigOf();
  const box = await pg.locator('#cv').boundingBox();
  await pg.evaluate(() => setTool('edge'));
  await pg.mouse.click(box.x + box.width/2, box.y + box.height/2);
  await pg.waitForTimeout(120);
  const after = await sigOf();
  let diff = 0; for (let i=0;i<before.length;i++) if (before[i]!==after[i]) diff++;
  ok('kenar aracı tıklaması tam bir kenarı değiştirir', before!==after && diff<=2, diff+' karakter farkı');
  await pg.evaluate(() => undo());
  ok('geri al kenar durumunu tam geri getirir', (await sigOf())===before);
  // marker aracı
  await pg.evaluate(() => { markerType='kirik_checkpoint'; setTool('marker'); });
  await pg.mouse.click(box.x + box.width/2 + 60, box.y + box.height/2 + 60);
  await pg.waitForTimeout(120);
  ok('marker aracı marker koyar', await pg.evaluate(() => doc.markers.length) >= 1);
  // seç aracı + müfettiş
  await pg.evaluate(() => setTool('select'));
  await pg.mouse.click(box.x + box.width/2 + 60, box.y + box.height/2 + 60);
  await pg.waitForTimeout(150);
  ok('müfettiş seçili marker\'ı gösterir', (await pg.locator('#inspector').innerText()).includes('Kırık'));
  ok('panel hâlâ hatasız', errs.length===0, errs.slice(0,3).join(' | '));

  console.log('\n== 13. Ekran görüntüsü ==');
  await pg.evaluate(() => {
    createDoc('sighlik_2a'); doc.meta.seed=20260901;
    autoBraid(20260901, 0.70);
    const W=doc.meta.gridW, H=doc.meta.gridH;
    const R=(fx,fy)=>[Math.round(fx*(W-1)), Math.round(fy*(H-1))];
    const put=(t,fx,fy,p)=>{ const [x,y]=R(fx,fy); doc.markers.push({id:newId('m'),type:t,cell:cellAt(x,y).id,edge:null,label:'',props:p||{}}); };
    put('oyuncu_baslangic',0.04,0.04); put('kirik_checkpoint',0.5,0.55); put('sembol_kaynak',0.85,0.18,{symbolId:'sym_2a'});
    put('cizer_slot',0.35,0.32,{perde:'p1'}); put('cizer_slot',0.62,0.75,{perde:'p1'});
    put('ruh_carpismasi',0.22,0.7); put('belge',0.75,0.9,{tur:'grafiti'}); put('watcher_spawn',0.15,0.45);
    put('opsiyonel_dongu_odul',0.95,0.82); put('anomali_alani',0.92,0.45,{radius:2});
    for(let x=2;x<9;x++) for(let y=2;y<7;y++){ const c=cellAt(x,y); c.zone='avlular'; c.kind='room'; }
    for(let x=1;x<8;x++) for(let y=1;y<4;y++) cellAt(x,y).locked=true;
    refreshAll(); fitView();
  });
  await pg.waitForTimeout(400);
  await pg.screenshot({path:'/tmp/maze_tool_test.png'});
  console.log('  kaydedildi: maze_tool.png');

  console.log('\n===== '+(fails? fails+' TEST BAŞARISIZ' : 'TÜM TESTLER GEÇTİ')+' =====');
  if (errs.length) { console.log('Konsol hataları:'); errs.slice(0,10).forEach(e=>console.log('  '+e)); }
  await b.close();
  process.exit(fails?1:0);
})();
