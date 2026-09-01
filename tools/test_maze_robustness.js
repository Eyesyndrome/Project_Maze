/*
 * Labirent yazım aracı — dayanıklılık testleri.
 *
 * Çalıştırma: NODE_PATH=$(npm root -g) node tools/test_maze_robustness.js
 *
 * Kapsam: bozuk/eksik dosyalara dayanıklılık, File System Access API'si olmayan
 * tarayıcıda indirme yoluna düşme (Firefox/Safari), kilitli bölgenin labirentten
 * kopmasının yakalanması ve büyük ızgarada performans.
 */
const {chromium}=require('playwright');
let fails=0; const ok=(n,c,x='')=>{console.log((c?'  PASS ':'  FAIL ')+n+(x?'  ['+x+']':'')); if(!c)fails++;};
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
  await p.goto('file://'+require('path').resolve(__dirname,'maze_tool.html'));
  await p.waitForTimeout(400);

  console.log('== Bozuk girdiye dayanıklılık ==');
  const bad = await p.evaluate(() => {
    // loadText hataları yakalayıp toast'a çevirir; bu yüzden REDDİ dönüş değeriyle
    // değil, belgenin DEĞİŞMEMİŞ olmasıyla doğrularız (aksi hâlde test totolojik olur).
    const cases = {};
    const sig = () => doc.cells.length+'/'+doc.edges.length+'/'+doc.markers.length+'/'+doc.meta.zoneId;
    const reject = str => { const before=sig(); loadText(str,'x.json'); return sig()===before; };
    createDoc('enkaz'); generate(1,0.7,{}); refreshAll();
    cases.bozukJson    = reject('{ bu json degil');
    cases.yanlisFormat = reject('{"format":"baska_sey","version":1}');
    cases.bosNesne     = reject('{}');
    cases.gelecekSurum = reject('{"format":"project_maze.maze","version":99,"meta":{"zoneId":"enkaz"}}');
    // eksik diziler REDDEDİLMEZ, kafesten tamamlanır → burada değişim BEKLENİR
    const before=sig();
    loadText('{"format":"project_maze.maze","version":2,"meta":{"zoneId":"enkaz","gridW":5,"gridH":5}}','y.json');
    cases.eksikDiziler = sig()!==before;
    cases.docSagKaldi  = doc && doc.cells.length>0;
    return cases;
  });
  ok('bozuk JSON belgeyi DEĞİŞTİRMİYOR', bad.bozukJson);
  ok('yanlış format gerçekten REDDEDİLİYOR', bad.yanlisFormat);
  ok('boş nesne reddediliyor', bad.bosNesne);
  ok('daha yeni şema sürümü reddediliyor (sessiz downgrade yok)', bad.gelecekSurum);
  ok('eksik cells/edges dizileri kafesten tamamlanıyor', bad.eksikDiziler);
  const rec = await p.evaluate(()=>({cells:doc.cells.length, edges:doc.edges.length, W:doc.meta.gridW, H:doc.meta.gridH}));
  ok('eksik dizilerden sonra kafes tutarlı', rec.cells===rec.W*rec.H && rec.edges===rec.W*(rec.H-1)+(rec.W-1)*rec.H,
     rec.W+'x'+rec.H+' → '+rec.cells+' hücre, '+rec.edges+' kenar');
  ok('belge hâlâ ayakta (araç kullanılabilir kaldı)', bad.docSagKaldi);

  console.log('\n== File System Access API yokken (Firefox/Safari yolu) ==');
  const dl = await p.evaluate(async () => {
    const saved = window.showSaveFilePicker; delete window.showSaveFilePicker;
    let clicked=null;
    const orig = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function(){ clicked=this.download; };
    createDoc('enkaz'); await saveFile(false);
    HTMLAnchorElement.prototype.click = orig;
    if(saved) window.showSaveFilePicker = saved;
    return {clicked, dirty};
  });
  ok('API yokken indirmeye düşüyor', dl.clicked==='enkaz.maze.json', 'dosya adı: '+dl.clicked);
  ok('indirmeden sonra dirty temizleniyor', dl.dirty===false);

  console.log('\n== Kilitli bölge kopması yakalanıyor mu ==');
  const iso = await p.evaluate(() => {
    createDoc('enkaz'); generate(9,0.7,{});
    // sağ alt köşeyi kilitle VE etrafını duvarla → kilitli ada (ızgaradan bağımsız)
    const W=doc.meta.gridW, H=doc.meta.gridH, CX=W-4, CY=H-4;
    for(const c of doc.cells) c.locked = (c.x>=CX && c.y>=CY);
    for(const e of doc.edges){ const [A,B]=edgeCells(e);
      if(A.locked!==B.locked) e.state='wall'; }
    const s=cellAt(0,0);
    doc.markers=[{id:newId('m'),type:'oyuncu_baslangic',cell:s.id,edge:null,label:'',props:{}}];
    reindex(); generate(4321,0.7,{}); reindex(); computeMetrics(); validate();
    return {unreach:M.unreachable.length, expected:16, err:ISSUES.some(i=>i.level==='err'&&i.tag==='§7.2')};
  });
  ok('kopan kilitli ada erişilemez olarak sayılıyor', iso.unreach===iso.expected, iso.unreach+'/'+iso.expected+' hücre');
  ok('§7.2 hatası veriliyor', iso.err);

  console.log('\n== Aşırı büyük ızgara (performans) ==');
  const perf = await p.evaluate(() => {
    createDoc('sighlik_2a'); resizeGrid(120,120);
    const t0=performance.now(); generate(1,0.7,{}); const tGen=performance.now()-t0;
    const t1=performance.now(); computeMetrics(); const tM=performance.now()-t1;
    const t2=performance.now(); validate(); const tV=performance.now()-t2;
    return {cells:doc.cells.length, gen:Math.round(tGen), met:Math.round(tM), val:Math.round(tV)};
  });
  console.log('  '+perf.cells+' hücre → üretim '+perf.gen+'ms, metrik '+perf.met+'ms, doğrulama '+perf.val+'ms');
  ok('14400 hücrede üretim+metrik < 2 sn', perf.gen+perf.met+perf.val < 2000);

  ok('konsol/sayfa hatası yok', errs.length===0, errs.slice(0,3).join(' | '));
  console.log('\n===== '+(fails? fails+' BAŞARISIZ':'DAYANIKLILIK TESTLERİ GEÇTİ')+' =====');
  await b.close(); process.exit(fails?1:0);
})();
