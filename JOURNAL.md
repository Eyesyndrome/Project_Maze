# PROJECT MAZE — Geliştirme Günlüğü

Her oturum sonunda en üste yeni kayıt eklenir. Format: tarih → yapılanlar → sıradaki işler → açık kararlar/notlar.

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
