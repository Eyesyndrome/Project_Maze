# PROJECT MAZE — Geliştirme Günlüğü

Her oturum sonunda en üste yeni kayıt eklenir. Format: tarih → yapılanlar → sıradaki işler → açık kararlar/notlar.

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
