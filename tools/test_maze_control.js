/*
 * Labirent yazım aracı — ÜRETİM KONTROLLERİ testi.
 *
 * Çalıştırma: NODE_PATH=$(npm root -g) node tools/test_maze_control.js
 *
 * İki tasarımcı kontrolü: (1) ölü uç SAYISINI doğrudan hedefleme (içerik borcu
 * bütçesi), (2) ana rotadan maks sapma sınırı ve onu uygulayan iki işlem
 * (Bağla = kısayol aç, Kırp = bölgeden çıkar).
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

  console.log('\n== 1. Ölü uç sayısını doğrudan hedefleme ==');
  const dead=await pg.evaluate(()=>{
    const rows=[];
    createDoc('sighlik_2a');
    for(const N of [5,10,20,40,60,80]){
      const br=targetDeadEnds(4242,N); computeMetrics();
      rows.push({hedef:N, ulasilan:M.deadEnds.length, sapma:M.deadEnds.length-N,
                 braid:+br.toFixed(3), dongu:+(M.loopRatio*100).toFixed(0)});
    }
    // mükemmel labirentin ölü uç sayısından fazlası istenirse
    generate(4242,0,{}); const tavan=computeMetrics().deadEnds.length;
    targetDeadEnds(4242, tavan+500); computeMetrics();
    return {rows, tavan, tavanSonuc:M.deadEnds.length};
  });
  console.table(dead.rows);
  ok('her hedefe TAM ulaşılıyor', dead.rows.every(r=>r.sapma===0),
     'maks sapma '+Math.max(...dead.rows.map(r=>Math.abs(r.sapma))));
  ok('ölü uç azaldıkça döngü oranı artıyor',
     dead.rows.every((r,i)=>i===0||r.dongu<=dead.rows[i-1].dongu));
  ok('ulaşılamaz hedef tavana oturuyor (mükemmel labirent)',
     dead.tavanSonuc===dead.tavan, dead.tavanSonuc+'/'+dead.tavan);

  console.log('\n== 2. Sapma derinliği ölçümü ==');
  const meas=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(19940613,0.4,{}); reindex();
    const put=(t,fx,fy,p)=>{const W=doc.meta.gridW,H=doc.meta.gridH;
      const c=cellAt(Math.round(fx*(W-1)),Math.round(fy*(H-1)));
      const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    const a=put('oyuncu_baslangic',0.05,0.05,{yaw:90});
    const z=put('sembol_kaynak',0.95,0.95,{symbolId:'s1'});
    doc.meta.criticalPath=[a.id,z.id];
    doc.meta.maxDetourMin=0;                     // sınır kapalı
    reindex(); computeMetrics();
    const noLimit={max:M.maxDetour, lim:M.detourLimitCells, deep:M.deepCells.length};
    doc.meta.maxDetourMin=1.0; computeMetrics();
    const lim1={max:M.maxDetour, lim:M.detourLimitCells, deep:M.deepCells.length};
    validate();
    return {noLimit, lim1, warn:ISSUES.some(i=>/maks sapma sınırını aşıyor|Ana rotadan/.test(i.msg)),
            beklenenLim:Math.round(1.0*60*doc.meta.walkSpeed/doc.meta.cellSize)};
  });
  ok('sınır kapalıyken derinlik yine ölçülüyor', meas.noLimit.max>0 && meas.noLimit.lim===null,
     'maks '+meas.noLimit.max+' hücre');
  ok('dakika → hücre çevrimi doğru', meas.lim1.lim===meas.beklenenLim, meas.lim1.lim+' hücre = 1 dk');
  ok('sınırı aşan hücreler sayılıyor', meas.lim1.deep>0, ''+meas.lim1.deep);
  ok('doğrulama uyarısı çıkıyor', meas.warn);

  console.log('\n== 3. BAĞLA — alanı koruyup sapmayı döngüye çevirir ==');
  const link=await pg.evaluate(()=>{
    createDoc('enkaz'); generate(19940613,0.4,{}); reindex();
    const put=(t,fx,fy,p)=>{const W=doc.meta.gridW,H=doc.meta.gridH;
      const c=cellAt(Math.round(fx*(W-1)),Math.round(fy*(H-1)));
      const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    const a=put('oyuncu_baslangic',0.05,0.05,{yaw:90});
    const z=put('sembol_kaynak',0.95,0.95,{symbolId:'s1'});
    doc.meta.criticalPath=[a.id,z.id]; doc.meta.maxDetourMin=1.0;
    reindex(); computeMetrics();
    const before={max:M.maxDetour, deep:M.deepCells.length, pass:M.passTotal,
                  loop:+(M.loopRatio*100).toFixed(0)};
    const r=linkDeepDetours(M.detourLimitCells);
    computeMetrics();
    return {before, after:{max:M.maxDetour, deep:M.deepCells.length, pass:M.passTotal,
            loop:+(M.loopRatio*100).toFixed(0)}, opened:r.opened};
  });
  console.log('   önce ', JSON.stringify(link.before), '\n   sonra', JSON.stringify(link.after),
              '\n   açılan kısayol:', link.opened);
  ok('en derin sapma azalıyor', link.after.max < link.before.max,
     link.before.max+' → '+link.after.max+' hücre');
  ok('hiçbir hücre kaybedilmiyor (alan korunur)', link.after.pass===link.before.pass);
  ok('döngü oranı yükseliyor (sapma → döngü)', link.after.loop>=link.before.loop,
     '%'+link.before.loop+' → %'+link.after.loop);

  console.log('\n== 4. KIRP — fazlalığı bölgeden çıkarır ==');
  const mkScene=`
    createDoc('enkaz'); generate(19940613,0.4,{}); reindex();
    var put=function(t,fx,fy,p){var W=doc.meta.gridW,H=doc.meta.gridH;
      var c=cellAt(Math.round(fx*(W-1)),Math.round(fy*(H-1)));
      var m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    var a=put('oyuncu_baslangic',0.05,0.05,{yaw:90});
    var z=put('sembol_kaynak',0.95,0.95,{symbolId:'s1'});
    doc.meta.criticalPath=[a.id,z.id]; doc.meta.maxDetourMin=1.0;
    reindex(); computeMetrics();`;

  // 4a — korunacak hücre YOK: sınır gerçekten uygulanmalı
  const trimA=await pg.evaluate(src=>{
    eval(src);
    const before={max:M.maxDetour, pass:M.passTotal};
    const r=trimDeepDetours(M.detourLimitCells);
    computeMetrics();
    return {before, max:M.maxDetour, lim:M.detourLimitCells, pass:M.passTotal,
            unreach:M.unreachable.length, voided:r.voided, korunan:r.korunan.length};
  }, mkScene);
  console.log('   önce max', trimA.before.max, '→ sonra', trimA.max, '(sınır '+trimA.lim+')',
              '| çıkarılan', trimA.voided, '| hücre', trimA.before.pass+'→'+trimA.pass);
  ok('sapma sınırın ALTINA iniyor', trimA.max<=trimA.lim, trimA.before.max+' → '+trimA.max+' ≤ '+trimA.lim);
  ok('kırpma erişilebilirliği bozmuyor', trimA.unreach===0, ''+trimA.unreach);
  ok('taban alanı küçülüyor', trimA.pass<trimA.before.pass, trimA.before.pass+' → '+trimA.pass);

  // 4b — EN DERİN hücre kilitli + marker'lı: araç onlara dokunamaz, ama ada da bırakmaz
  const trimB=await pg.evaluate(src=>{
    eval(src);
    const deepSorted=[...M.detour.entries()].sort((x,y)=>y[1]-x[1]);
    const lockCell=cellById(deepSorted[0][0]); lockCell.locked=true;
    const markCell=cellById(deepSorted[1][0]);
    doc.markers.push({id:newId('m'),type:'opsiyonel_dongu_odul',cell:markCell.id,edge:null,label:'',props:{}});
    reindex(); computeMetrics();
    const r=trimDeepDetours(M.detourLimitCells);
    computeMetrics(); validate();
    return {voided:r.voided, korunan:r.korunan.length, koridor:r.koridor,
            unreach:M.unreachable.length,
            lockAlive:cellById(lockCell.id).kind!=='void',
            markAlive:cellById(markCell.id).kind!=='void',
            hala:M.deepCells.length>0,
            uyari:ISSUES.some(i=>/korunan|dokunulmaz|kilitli/.test(i.msg))};
  }, mkScene);
  console.log('   korunan', trimB.korunan, '| koridor', trimB.koridor, '| çıkarılan', trimB.voided);
  ok('kilitli hücre korunuyor', trimB.lockAlive);
  ok('marker taşıyan hücre korunuyor', trimB.markAlive);
  ok('onlara giden koridor da tutuluyor (ada bırakmaz)', trimB.unreach===0 && trimB.koridor>0,
     'koridor '+trimB.koridor+' hücre, erişilemeyen '+trimB.unreach);
  ok('sınır hâlâ aşılıyorsa doğrulama susmuyor', trimB.hala && trimB.uyari);

  console.log('\n== 4c. Bağla sembol-kapıyı bypass etmemeli ==');
  const doorSafe=await pg.evaluate(()=>{
    createDoc('enkaz'); autoBraid(19940613,0.70); reindex(); computeMetrics();
    // doğal bir köprüyü kapı yap
    let de=null;
    for(const e of doc.edges) if(M.bridges.has(e.id)&&edgeOpen(e)){ de=e; break; }
    de.state='door';
    doc.markers=[{id:newId('m'),type:'sembol_kapi',cell:null,edge:de.id,label:'',props:{symbolId:'s1'}}];
    const put=(t,fx,fy,p)=>{const W=doc.meta.gridW,H=doc.meta.gridH;
      const c=cellAt(Math.round(fx*(W-1)),Math.round(fy*(H-1)));
      const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
      Object.assign(m.props,p||{}); doc.markers.push(m); reindex(); return m;};
    const a=put('oyuncu_baslangic',0.05,0.05,{yaw:90});
    const z=put('sembol_kaynak',0.9,0.9,{symbolId:'s1'});
    doc.meta.criticalPath=[a.id,z.id]; doc.meta.maxDetourMin=1.0;
    reindex(); computeMetrics(); validate();
    const beforeBypass=ISSUES.some(i=>/bypass/.test(i.msg));
    linkDeepDetours(M.detourLimitCells);
    computeMetrics(); validate();
    return {beforeBypass, afterBypass:ISSUES.some(i=>/bypass/.test(i.msg)), doorState:edgeById(de.id).state};
  });
  ok('başlangıçta kapı bypass edilemez', doorSafe.beforeBypass===false);
  ok('Bağla sonrası kapı HÂLÂ bypass edilemez', doorSafe.afterBypass===false);
  ok('kapı kenarı korunuyor', doorSafe.doorState==='door');

  console.log('\n== 4d. Sınırı uygula (kırp → ör → bağla) ==');
  const apply=await pg.evaluate(()=>{
    const rows=[];
    for(const lim of [1.25, 2.0, 3.0]){
      createDoc('enkaz'); autoBraid(19940613,0.70); reindex();
      const put=(t,fx,fy,pr)=>{const W=doc.meta.gridW,H=doc.meta.gridH;
        const c=cellAt(Math.round(fx*(W-1)),Math.round(fy*(H-1)));
        const m={id:newId('m'),type:t,cell:c.id,edge:null,label:'',props:defaultProps(t,c)};
        Object.assign(m.props,pr||{}); doc.markers.push(m); reindex(); return m;};
      const a=put('oyuncu_baslangic',0.05,0.05,{yaw:90});
      const z=put('sembol_kaynak',0.9,0.9,{symbolId:'s1'});
      doc.meta.criticalPath=[a.id,z.id]; doc.meta.maxDetourMin=lim;
      reindex(); computeMetrics();
      const before={loop:+(M.loopRatio*100).toFixed(0), max:M.maxDetour};
      const L=M.detourLimitCells;
      const r=applyDetourLimit(L);
      computeMetrics();
      validate();
      rows.push({limit:lim, limH:L, onceDongu:before.loop, onceSapma:before.max,
                 sonraDongu:+(M.loopRatio*100).toFixed(0), sonraSapma:M.maxDetour,
                 hucre:M.passTotal, unreach:M.unreachable.length,
                 catisma:ISSUES.some(i=>/çakışıyor/.test(i.msg))});
    }
    return rows;
  });
  console.table(apply);
  ok('sınır her limitte tutuluyor', apply.every(r=>r.sonraSapma<=r.limH));
  // Gerçek değişmez: SINIR her zaman tutulur (kullanıcının açık kısıtı). Lynch bandı
  // ancak geometri izin verdiğinde tutulur — dar sınır grafiği zorunlu yoğunlaştırır.
  // Bandın dışına çıkıldığında araç susmamalı, çakışmayı raporlamalı.
  ok('gevşek sınırlarda Lynch bandına dönülüyor',
     apply.filter(r=>r.limit>=2).every(r=>Math.abs(r.sonraDongu-70)<=8),
     apply.map(r=>r.limit+'dk:'+r.sonraDongu+'%').join(' '));
  ok('dar sınırda çakışma raporlanıyor', apply[0].catisma===true,
     'dar sınır döngüyü %'+apply[0].sonraDongu+' yapıyor');
  ok('erişilebilirlik korunuyor', apply.every(r=>r.unreach===0));

  console.log('\n== 4e. Ör(braid): tahribatsız ve en yakın ulaşılabilir orana oturur ==');
  const nondestr=await pg.evaluate(()=>{
    // (a) tahribatsızlık: yalnız kenar EKLER, hiçbirini kapatmaz
    createDoc('enkaz'); generate(555,0,{}); reindex();
    const before=doc.edges.filter(edgeOpen).map(e=>e.id);
    const opened=braidToLoopTarget(0.70);
    const after=new Set(doc.edges.filter(edgeOpen).map(e=>e.id));
    const sonuc=M.loopRatio;

    // (b) kaba kuvvet referansı: birer birer açarken hedefe EN YAKIN orana ulaş.
    // Seyrek labirentte tek kenar 100+ hücrelik döngü yaratabildiği için oran
    // basamaklıdır; %70 tam tutturulamayabilir — ölçülecek şey "en yakını buldu mu".
    createDoc('enkaz'); generate(555,0,{}); reindex(); computeMetrics();
    let best=Math.abs(M.loopRatio-0.70);
    for(let i=0;i<400;i++){
      let e=null;
      for(const c of M.deadEnds){
        for(const n of neighbors(c)){
          const ee=edgeBetween(c.x,c.y,n.x,n.y);
          if(ee&&!edgeOpen(ee)&&isPass(n)&&edgeGeneratable(ee)){ e=ee; break; }
        }
        if(e) break;
      }
      if(!e) break;
      e.state="open"; e.dir="both"; reindex(); computeMetrics();
      best=Math.min(best, Math.abs(M.loopRatio-0.70));
      if(M.loopRatio>0.97) break;
    }
    return {opened, korunmus:before.every(id=>after.has(id)),
            sonuc:+(sonuc*100).toFixed(1), sapma:+(Math.abs(sonuc-0.70)*100).toFixed(1),
            kabaKuvvetEnIyi:+(best*100).toFixed(1)};
  });
  ok('önceden açık her kenar hâlâ açık (yalnız EKLER)', nondestr.korunmus && nondestr.opened>0,
     nondestr.opened+' kenar eklendi');
  ok('kaba kuvvetten daha kötü değil (en yakın ulaşılabilir)',
     nondestr.sapma <= nondestr.kabaKuvvetEnIyi + 0.5,
     'ulaşılan %'+nondestr.sonuc+' (sapma '+nondestr.sapma+' puan, kaba kuvvet en iyi '+nondestr.kabaKuvvetEnIyi+')');

  // (c) bandın altından başlayınca hedefe YAKLAŞMALI ve asla uzaklaşmamalı.
  // (Kesin banda oturmak her zaman mümkün değil: döngü oranı basamaklıdır, bkz. (b).)
  const closer=await pg.evaluate(()=>{
    const rows=[];
    for(const [seed,br] of [[555,0.1],[777,0.2],[4242,0.15],[19940613,0.25]]){
      createDoc('enkaz'); generate(seed,br,{}); reindex(); computeMetrics();
      const once=M.loopRatio;
      if(once>=0.70){ rows.push({seed, atla:true}); continue; }
      braidToLoopTarget(0.70);
      rows.push({seed, once:+(once*100).toFixed(0), sonra:+(M.loopRatio*100).toFixed(0),
                 yaklasti:Math.abs(M.loopRatio-0.70)<=Math.abs(once-0.70)+1e-9,
                 artti:M.loopRatio>=once-1e-9});
    }
    return rows.filter(r=>!r.atla);
  });
  console.table(closer);
  ok('bandın altından başlayınca hedefe yaklaşıyor', closer.length>0 && closer.every(r=>r.yaklasti));
  ok('döngü oranı asla düşmüyor', closer.every(r=>r.artti));

  console.log('\n== 4f. Arayüz alanları belgeyi gerçekten yansıtıyor mu ==');
  // (Bir önceki revizyonda eklenen duraklama editörü hiç ÇAĞRILMIYORDU — ölü UI.
  //  Bu blok "panel var mı" değil, "değer yansıdı mı" diye sorar.)
  const ui=await pg.evaluate(()=>{
    createDoc('sighlik_2a');
    doc.meta.targetDeadEnds=42; doc.meta.maxDetourMin=1.75; doc.meta.dwell.kirik_checkpoint=9.5;
    refreshAll();
    const dw=[...document.querySelectorAll('[data-dw]')];
    return {
      mode:el('fTargetMode').value, dead:el('fDeadTarget').value, det:el('fMaxDetour').value,
      rowVisible:el('rowDead').style.display!=='none',
      dwellInputs:dw.length,
      dwellKirik:(dw.find(i=>i.dataset.dw==='kirik_checkpoint')||{}).value,
      detourPanel:el('detourStats').innerText.length>0,
      tempoPanel:el('tempoBody').innerHTML.length>0,
      debtPanel:el('debtBody').innerHTML.length>0
    };
  });
  ok('ölü uç hedefi forma yansıyor', ui.mode==='dead' && ui.dead==='42' && ui.rowVisible, ui.mode+'/'+ui.dead);
  ok('sapma sınırı forma yansıyor', ui.det==='1.75', ui.det);
  ok('duraklama editörü 11 tip için çiziliyor', ui.dwellInputs===11, ui.dwellInputs+' alan');
  ok('duraklama değeri forma yansıyor', ui.dwellKirik==='9.5', ui.dwellKirik);
  ok('rota disiplini paneli doluyor', ui.detourPanel);
  ok('tempo şeridi doluyor', ui.tempoPanel);
  ok('ölü uç borcu paneli doluyor', ui.debtPanel);

  console.log('\n== 4g. Duraklama editörü belgeyi GÜNCELLİYOR mu ==');
  await pg.evaluate(()=>{ createDoc('enkaz'); refreshAll(); });
  await pg.locator('#pGrid > h2').click();          // paneli aç
  await pg.locator('[data-dw="belge"]').fill('4.25');
  await pg.locator('[data-dw="belge"]').dispatchEvent('change');
  await pg.waitForTimeout(120);
  const dwellSaved=await pg.evaluate(()=>doc.meta.dwell.belge);
  ok('duraklama düzenlemesi belgeye yazılıyor', dwellSaved===4.25, ''+dwellSaved);

  console.log('\n== 5. Şema: yeni alanlar yuvarlak-gidişte korunuyor ==');
  const rt=await pg.evaluate(()=>{
    createDoc('sighlik_2a');
    doc.meta.targetDeadEnds=25; doc.meta.maxDetourMin=1.75;
    const t1=serialize(doc);
    adoptDoc(JSON.parse(t1));
    const t2=serialize(doc);
    const strip=t=>t.split('\n').filter(l=>!l.includes('modifiedAt')).join('\n');
    return {eq:strip(t1)===strip(t2), dead:doc.meta.targetDeadEnds, det:doc.meta.maxDetourMin,
            v:doc.version};
  });
  ok('targetDeadEnds korunuyor', rt.dead===25);
  ok('maxDetourMin korunuyor', rt.det===1.75);
  ok('yuvarlak-gidiş hâlâ sıfır diff', rt.eq, 'şema v'+rt.v);

  ok('konsol/sayfa hatası yok', errs.length===0, errs.slice(0,3).join(' | '));
  console.log('\n===== '+(fails? fails+' KONTROL TESTİ BAŞARISIZ':'TÜM KONTROL TESTLERİ GEÇTİ')+' =====');
  await b.close(); process.exit(fails?1:0);
})();
