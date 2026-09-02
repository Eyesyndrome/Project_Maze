# PROJECT MAZE — Geliştirme Günlüğü

Her oturum sonunda en üste yeni kayıt eklenir. Format: tarih → yapılanlar → sıradaki işler → açık kararlar/notlar.

---

## 2026-09-01 — Oturum 4: İki tasarımcı kontrolü (ölü uç sayısı + maks sapma)

### Yapılanlar
Sahibin isteği: oyun deneyimi üzerinde doğrudan kontrol. Şema **v3**.

**1) Ölü uç sayısı (`meta.targetDeadEnds`).** Ölü uç sayısı estetik tercih değil, **içerik borcu bütçesi**: her ölü uç §7.1-3'e göre ödemek zorunda → **N ölü uç = N ödeme metni**. Sayı `braid` içinde monoton azaldığı için tamsayı ikili arama hedefi **tam** tutturuyor (5/10/20/40/60/80 hedeflerinin hepsinde sapma 0).

**2) Maks sapma (`meta.maxDetourMin`).** Her hücrenin kritik yola BFS uzaklığı ölçülüyor. Örnek Enkaz'da sınırsızken en derin sapma **37 hücre = 2,6 dk tek yön / 5,3 dk gidiş-dönüş** çıkıyordu — 17 dakikalık bölgede tek sapmada üçte biri. Uygulayan işlemler: **Bağla** (kısayol aç, alan korunur), **Kırp** (sınır ötesini `void` yap), **Ör** (labirenti bozmadan döngü oranını hedefe çek), **Sınırı uygula** (bileşik tarif).

### Ölçüm iki kez tasarımı değiştirdi
- **Tek başına hiçbir işlem Lynch bandında kalmıyor:** yalnız Bağla döngüyü %95'e itiyor, yalnız Kırp %14'e düşürüyor (kırpma çeperdeki döngüleri siler, ağaç gibi çekirdek kalır). Bileşik tarif bu yüzden var.
- **Sıra varsayımım yanlıştı.** "Kenar eklemek BFS uzaklıklarını yalnız kısaltır, o hâlde örme sınırı bozamaz" demiştim. Sapma **kritik yola** göre ölçülüyor ve kenar eklemek kritik yolun **kendisini** kısaltıyor — referans daralınca bazı hücrelerin sapması artıyor. Artık sınır ile band dönüşümlü yakınsatılıyor; **son söz sınırında** (kullanıcının açık kısıtı o).

### Sahibin bilmesi gereken iki gerilim
1. **İki hedef aynı kaldıracın iki ucu.** Ölü uç azaldıkça döngü oranı yükselir. Ölçülen: %70 döngüye karşılık gelen ölü uç sayısı **Enkaz 20×20'de 29, Sığlık 42×38'de 103**. Aşırı örülü labirentte **köprü kalmıyor** → sembol kapısı gerçek geçit olamıyor. (Ön ayarları bu ölçülen değerlere çektim; ilk yazdığım 14/30 tahminleri bandı kırıyordu.)
2. **Dar sapma sınırı ile Lynch %70 bandı aynı anda tutmayabilir** — her hücreyi rotaya yaklaştırmak grafiği zorunlu yoğunlaştırır. Araç susarak çözmüyor, çakışmayı `info` olarak raporlayıp kaldıraçları söylüyor (sınırı gevşet / taban alanını küçült / rotayı alanın içinden daha çok geçir).

### Yol üstünde bulunan kusur
Bir önceki oturumda eklediğim **duraklama (dwell) editörü ölü UI'ymış**: `renderDwell()` tanımlıydı ama hiç çağrılmıyordu, yeni meta alanları da forma yansımıyordu. Sebep: kör string değişiminin sessizce eşleşmemesi. Testlerim "panel var mı" diye sorduğu için kaçmıştı; artık "değer belgeye yansıdı mı, düzenleme belgeye yazılıyor mu" diye soruyor.

### Test durumu
`test_maze_tool` 47 · `test_maze_robustness` 13 · `test_maze_findings` 38 · `test_maze_control` 40 = **138 doğrulama, 0 hata.**
`ornek.maze.json` yeniden kuruldu (sapma sınırı 2 dk): en derin sapma 37 → 28 hücre, döngü %70,7, 0 hata / 0 uyarı.

### Sıradaki işler
1. **[SAHİBİ] Aracı kullan** — Oturum 3'teki 6 açık karar duruyor (en önemlisi: landmark marker tipi = GDD kararı, ve `walkSpeed` doğrulaması).
2. **[BEKLEMEDE] Godot importer** — Godot MCP gelmeden başlama. Sözleşme: `tools/SEMA.md` v3.

---

## 2026-09-01 — Oturum 3: Araç denetimi ve revizyon

### Yapılanlar
İki **bağımsız ajan** aracı denetledi (CLAUDE.md süreç kuralı): (1) canon denetçisi — GDD uyumu, mantık doğruluğu, importer hazırlığı; (2) **level designer** — aracı gerçekten kullanarak, ~20 sürülmüş oturum + 240 eylemlik fuzz + ekran görüntüsü incelemesi. Her bulgu GDD'den tek tek doğrulandı, sonra uygulandı. `tools/test_maze_findings.js` (yeni, 30+ doğrulama) her düzeltmeyi kilitliyor.

**Araç yanlış bilgi veriyordu — en ağır sınıf:**
- Tek yönlü kapılar erişilebilirlik denetimini deliyordu (`reachableFrom` yönsüzdü).
- **Sembol-kapının gerçekten geçit olup olmadığı hiç denetlenmiyordu** — etrafından dolaşılabilen kapı §4.4'ün tek zorunlu bulmacasını iptal eder. LD'nin "en yüksek değerli eksik denetim" dediği şey.
- 60 sn kuralı koridorun TAMAMINDA öğe arıyordu, öğeler ARASINDAKİ boşluğu değil → koridorun başına tek grafiti koymak 124 saniyelik düzlüğü temizliyordu.
- Kritik yol zincirindeki silinmiş durak sessizce atlanıyor, süre tahmini sessizce kısalıyordu (62,8 → 38,5 dk, tek uyarı yok).
- Kaybolma payı hâlâ bütçe kıyasının içindeydi (§7.3 payı bütçenin ÜSTÜNE koyar).
- §7.3'ün açık **backtracking yasağı** hiç ölçülmüyordu; bütçeyi tutturmanın en kolay yolu zikzaktı.

**Canon hatalarım:** `belge` marker'ı — §8.1/§8.4 belgeleri **Kırık'lara** bağlar, ben ölü uç ödeyicisi yapmıştım (ödeyen §7.7-3'te grafiti). Watcher↔Kırık **10 m kuralını uydurmuşum** (o sayı §6.1'in soft-fail dokunulmazlığı); kural §6.2'den savunulabilir olduğu için korundu ama `§6.2*` ile araç eklentisi diye işaretlendi.

**Şema v2 — importer'ın önkoşulu:** marker **yönelimi** yoktu (`props.face` / `props.yaw`). Importer `*_generated.tscn`'i her rebuild'de kurduğu için Godot'ta elle verilen rotasyon silinirdi — yön veride yaşamak zorunda. v1 dosyaları otomatik göç eder.

**İş akışı (LD'nin ölçtüğü zaman kayıpları):** oda fırçası (`R`, tek hareketle avlu; `room` hücreler artık üretimden muaf — elle açılan avlu her yeni tohumda yok oluyordu), `Shift`+sürükle dikdörtgen alan, sınıflı + toplu ölü uç ödemesi (bölge başına ~240 eylemdi), `meta.dwell` düzenlenebilir oldu, kenar sürüklemesi artık sessizce kapı üretmiyor.

**Görsel:** marker paletinin 11 tipinden 4'ü kırpılıyordu (Ruh Çarpışması görünmüyordu ama doğrulama onu istiyordu); doğrulama paneli metriklerin üstüne alındı (1366×768'de ekran dışındaydı); `void` hücreler alt-bölge rengiyle boyanıp avlu gibi görünüyordu; kritik yola yön okları + durak rozetleri + tekrar segmenti rengi.

**Yeni ölçümler:** görüş hattı ısı haritası + "sis içinde görüşü olan kavşak %" (§7.1-1/§7.1-5), kavşak derece dağılımı, **tempo şeridi** (§7.7-2 tempo vanası), en uzun Kırık'sız parça, **hız duyarlılık satırı**.

**Ölçek:** kaybolma payı bütçeden çıkınca taban alanları büyüdü → ön ayarlar ölçülerek yeniden boyutlandı (Enkaz 20×20, 2a/2b 42×38). `ornek.maze.json` yeniden kuruldu: kapı artık labirentin **kendi köprülerinden** birine oturuyor, zincir zikzak yerine **tur** → tekrar yürüme %42'den %8'e indi.

### Sahibin kararına sunulan (birikmiş liste)
1. **`cells[].payoff` alanı** (SEMA §5.1) — onaylanırsa GDD §7.2'ye işlenmeli.
2. **İki araç eşiği** (SEMA §5.1.1): Watcher↔Kırık 10 m, is lekesi↔kapı 12 hücre. GDD'de yok.
3. **Landmark marker tipi.** §7.1-2'nin **birinci** oryantasyon katmanı (uzak kule) veri modelinde yok — §7.2 marker listesinde de yok. LD: "landmark + görüş hattı olmadan sisli bir labirenti denetlediğimi söyleyemem." Bu bir **GDD kararı**, araç kararı değil. Eklenirse araç görüş hattı hesabını zaten yapıyor.
4. **`walkSpeed 1.4 m/s` doğrulanmadı** — aracın en riskli varsayımı. Controller 1.8'e otururasa her bölge ~%22 kısalır ve bu, taban alanı kurulduktan sonra ortaya çıkar. Panelde duyarlılık satırı var ama sayı controller'dan gelmeli.
5. **Bölgeler arası toplam (≥120 dk) araç kapsamı dışında** — üç bölge birden "yeşil"ken toplam plandan düşük olabilir; sessizlik beat'inin 10 dk'sı hiçbir dosyada yaşamıyor, Merkez araç dışı.
6. **Koridor genişliği** — `cellSize` bölge geneli için tek; §9.5'in "dar servis ↔ geniş avlu" kontrastı ölçülemiyor. LD hücre/alt-bölge başına `genislik: dar|normal|genis` öneriyor (kit seçimini de yönlendirir).

### Sıradaki işler
1. **[SAHİBİ] Aracı kullan** — `tools/maze_tool.html` çift tıkla, `ornek.maze.json`'u aç. Yukarıdaki 6 kararı ver.
2. **[BEKLEMEDE] Godot importer** — Godot MCP gelmeden BAŞLAMA. Sözleşme hazır: `tools/SEMA.md` v2. İlk iş ~3 saatlik idempotanlık/owner spike'ı.
3. Uygulanmayan LD önerileri (bilinçli ertelendi): bölge kopyala/yapıştır (§7.7-4 sahte aşinalık koridoru), opsiyonel döngü için ikinci durak zinciri, cetvel aracı.

---

## 2026-09-01 — Oturum 2: Labirent yazım aracı v1

### Yapılanlar
- **`tools/SEMA.md` — `*.maze.json` şeması v1 donduruldu.** Godot importer'ının sözleşmesi. Kritik tasarım kararları: (a) **tam kafes** — duvarlar dahil TÜM kenarlar dosyada saklanır, duvar silmek yerine `state` değişir; böylece ID'ler yeniden üretimde ve düzenlemede sabit kalır ("iki import = sıfır diff" şartının dayanağı). (b) monoton `nextId`, silinen ID asla yeniden kullanılmaz. (c) koordinat/pivot sözleşmesi tek anlamlı yazıldı (grid +y → Godot +Z, `cell_center_floor`). (d) kilit-sınır kuralı §7'de operasyonelleştirildi.
- **`tools/maze_tool.html` — araç yazıldı** (tek dosya, offline, bağımlılık yok, ~1900 satır). Seed'li üretim (recursive backtracker + braid), kilitli bölge korumalı kısmi yeniden üretim, elle düzenleme (kenar/kapı/tek yön, alt-bölge ve hücre tipi boyama, tipli marker'lar), kritik yol durak zinciri editörü, Lynch metrik paneli ve canon doğrulayıcı.
- **`tools/ornek.maze.json`** — kurulmuş Enkaz bölgesi: 0 hata, 0 uyarı, döngü %69,5, 17 ölü ucun hepsi ödenmiş.
- **`tools/test_maze_tool.js`** — 45 doğrulama, gerçek Chromium'da (Playwright) koşuyor. Testler 4 gerçek hata yakaladı ve düzeltildi: (1) `autoBraid` kesirli ikili arama iki komşu tamsayı adım arasında sıkışıyordu → arama ölü uç sayısı üzerinde tamsayıya çevrildi, artık kaba kuvvetle aynı sonucu buluyor; (2) `Object.assign(varsayılanlar, girdi)` anahtar sırasını bozup dosyayı ilk yüklemede diff üretir hâle getiriyordu → kanonik anahtar sırası eklendi (importer idempotanlığı için kritik); (3) yüksek zoom'da kenar aracıyla hücre ortasına tıklamak sessiz no-op'tu → en yakın kenar seçilir oldu; (4) marker'a tıklayınca seçilmiyordu → hücre yedeği eklendi.
- **Bağımsız denetçi ajan** çalıştırıldı (CLAUDE.md süreç kuralı).

### Sahibin kararına sunulan iki bulgu
1. **ÖLÇEK — GDD §7.3 bütçeleri ilk hesapla uyuşmadı.** Kaybolma payı çarpanı önce 2,5 alınmıştı; GDD §7.3 kaybolma payını kritik yol bütçesinin **ÜSTÜNE** koyduğu için (tüm oyun +10–15 dk) **1,15'e** çekildi. Sonuç: Enkaz'ın 15 dakikası 28×28 değil **~16×16 ızgara (96×96 m)** demek. Bölge ön ayarları yeniden boyutlandı (Enkaz 16×16, 2a/2b 34×32) — bunlar **başlangıç noktası**, metrik paneliyle ayarlanacak. Ayrıca: bölge dakika bütçesi üç kaldıraçla tutturulur (durak zinciri, duraklama süreleri, taban alanı) ve en ucuzu **durak zinciridir** — taban alanı büyütmek landmark borcu üretir (§7.2 büyütme kuralı).
2. **ŞEMA EKLENTİSİ — `cells[].payoff`.** GDD §7.1-3 ölü uç borcunu "manzara" ile de ödetiyor ama §7.2 marker listesinde manzara/landmark tipi **yok**. Canon marker listesini sessizce genişletmek yerine hücre üstünde serbest metin alanı tanımlandı. **Onaylanırsa GDD §7.2'ye işlenmeli.**

### Sıradaki işler
1. **[SAHİBİ] Aracı kullan.** `tools/maze_tool.html` çift tıkla, `ornek.maze.json`'u aç, üretim/düzenleme akışını dene. Geri bildirim: hangi işlem akşam seansında yavaş kalıyor?
2. **[SAHİBİ] Yukarıdaki iki kararı ver** (ölçek varsayılanları, `payoff` alanı).
3. **[BEKLEMEDE] Godot importer** — sahibi Godot MCP kuracak; gelmeden BAŞLAMA. İlk iş ~3 saatlik idempotanlık/owner spike'ı (GDD §7.2). Sözleşme hazır: `tools/SEMA.md`.
4. Oyun projesinin Godot iskeleti + 1. hafta teknik doğrulamaları (GDD §12.1) — Godot MCP sonrası.

### Açık kararlar / notlar
- `meta.walkSpeed` (şimdilik 1,4 m/s) oyuncu controller'ı yazıldığında **aynı sabitle** güncellenmeli (GDD §7.2). `meta.dwell` duraklama süreleri tahmindir; playtest'te ölçülecek ilk şey.
- Önceki oturumdan devam: LORE `[öneri]` isimleri, final oyun adı, Godot sürümü pinlenmesi.

---

## 2026-09-01 — Oturum 1: GDD, Lore ve araç mimarisi

### Yapılanlar
- **GDD v1.0 → v1.1 (geniş kapsam):** 3 paralel araştırma (pazar, mitoloji/lore, mekanik eleştirisi) + yönetici karar seti + bağımsız denetim + yazım + kalite kontrol süreciyle ilk tam GDD üretildi (2-3 kişilik ekip varsayımı). Kritik kararlar: silme yalnız kendi boyada, Çizer 3 perde + stroke-replay, sembol-kilit kapılar, "Yeniden Emilme" soft-fail, Watcher terazi sistemi, "Yutan Labirent" lore çekirdeği (yargılanmamış kötülük + 90'lar örtbas vakası).
- **GDD v2.0 (Solo Sürüm):** sahibi "tek başıma, kısa sürede" dedi → kapsam daraltıldı: 5→3 bölge (2a/2b), 3 sembol-kapı, 1,5-2 saat, $5.99, 9-12 ay; §17 "Launch Sonrası Genişleme Yol Haritası" eklendi.
- **GDD v3.0 (Part-Time Solo — GÜNCEL CANON):** sahibin kısıtları netleşti (maks 6 ay, part-time akşam+hafta sonu, Godot+Blender+Claude, $2-3 bandı, MİN 2 saat oynanış) → saat-bazlı plan (~526 sa), iki kademeli takvim (6. ay content-complete taahhüdü; launch 6. ay hedef / düşük tempoda 7-8. ay), 200. saat kontrol noktası, "beton zaten graybox" sanat doktrini, kritik yol ≥120 dk, $2.99, gamepad→§17, hafif pazarlama, §18 Claude protokolü. Kesim sırası artık dakika değil CİLA keser.
- **LORE.md:** hikâye kitabı yazıldı (Yutan Labirent, çağlar boyunca katmanlar, 1994 vaka dosyası, üç figür, yolculuk, sonlar, motif sözlüğü, gerçek/kurgu tablosu). `[öneri]` isimler: Ashford, Iris Bell, Daniel Weir, Roy Calder. Sahibi okudu: "şimdilik değişiklik yok" — öneriler beklemede, canon'a işlenmedi.
- **Labirent yazım aracı mimarisi kararlaştırıldı ve GDD §7.2'ye işlendi** (teknik denetimden geçti): 2D HTML aracı + maze.json + ince Godot importer. Kritik denetim bulguları: GridMap/MultiMesh reddi → kit sahne instancing; çıktı ayrı `*_generated.tscn` (owner/diff tuzaklarını çözer); idempotent rebuild; kilitli bölge + Lynch metrik paneli; file:// akışı (FS Access API + download fallback). **GDD §12.4 hatası düzeltildi:** Godot 4'te portal culling yok → occlusion culling + OccluderInstance3D.
- **CLAUDE.md + JOURNAL.md oluşturuldu** (proje hafızası + günlük).
- Yayın: GDD ve Hikâye Kitabı artifact sayfaları (linkler CLAUDE.md'de).

### Sıradaki işler
1. **[SONRAKİ OTURUM] `tools/maze_tool.html` v1'i yap** — sahibi labirent üretim + düzenleme araçlarını test edecek. Sıra: maze.json şemasını dondur (~2 sa; CLAUDE.md'deki şema özeti + GDD §7.2) → HTML çekirdek (grid çizim, kenar aç/kapa, export/import) → generator (recursive backtracker + braid) + kilitli bölge → Lynch metrik paneli → marker katmanı. Örnek `ornek.maze.json` ile teslim et.
2. **[BEKLEMEDE] Godot importer** — sahibi Godot MCP kuracak; MCP gelmeden Godot tarafına BAŞLAMA. MCP gelince ilk iş: ~3 saatlik idempotanlık/owner spike'ı.
3. Oyun projesinin Godot iskeleti + 1. hafta teknik doğrulamaları (GDD §12.1: Decal node ↔ renderer testi, sprey his prototipi, 1000-decal performans) — Godot MCP sonrası.

### Açık kararlar / notlar
- LORE `[öneri]` isimleri onay bekliyor (onaylanırsa GDD + string tablosuna işlenecek).
- Final oyun adı: WAYMARK / ASTERION / THE UNDRAWN — Steam sayfası öncesi.
- Godot sürümü henüz pinlenmedi (proje iskeleti kurulurken pinlenecek; renderer kararı 1. hafta testine bağlı).
