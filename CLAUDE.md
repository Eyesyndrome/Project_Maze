# PROJECT MAZE — Claude Proje Hafızası

Bu dosya her oturumda otomatik yüklenir. Amaç: yeni bir Claude oturumunun sıfır bağlam kaybıyla işe başlaması. Günlük (yapılan/yapılacak) ayrı dosyadadır: **`JOURNAL.md`** — her oturumun sonunda güncellenir (aşağıda "Çalışma kuralları").

## Proje kimliği (tek paragraf)

**Project Maze** (çalışma adı): PSX estetikli, jumpscare'siz, birinci şahıs liminal keşif / psikolojik korku oyunu. Sisli beton labirentte sprey boyayla yön bulursun; içerideki bir varlık (**Bilinmeyen Çizer**) işaretlerini taklit eder — USP budur. Saldırmayan yargılayıcı varlık: **The Watcher (Asterion)**. Tema: yargılanmamış suç ve susan tanık. **Solo part-time geliştirici** (hafta içi 08-18 mesaili mühendis; akşam+hafta sonu, ~15-20 sa/hafta), **Godot 4 + Blender + yoğun Claude desteği**, hedef ~526 saatlik plan / 6 ay (iki kademeli takvim), **minimum 2 saat oynanış**, **$2.99**, klavye+fare, PC/Steam.

## Doküman haritası (gerçeklik kaynakları)

| Dosya | Rol |
|---|---|
| `GDD.md` | **CANON — v3.0 Part-Time Solo Sürüm.** Tüm tasarım/teknik/kapsam kararlarının tek kaynağı. Çelişkide GDD kazanır. Ek A = karar tarihçesi (v1.0→v3.0 tüm sapmalar gerekçeli); §17 = ertelenenler (launch öncesi TASARLANMAZ); Ek B = kalıcı kesikler. |
| `LORE.md` | Hikâye kitabı — GDD §3'ün anlatı genişletmesi. `[öneri]` etiketli öğeler (Ashford, Iris Bell, Daniel Weir, Roy Calder isimleri, 1994 yılı vb.) sahibi tarafından **"şimdilik değişiklik yok"** denerek beklemede bırakıldı — henüz canon DEĞİL. |
| `JOURNAL.md` | Günlük: yapılanlar / yapılacaklar / açık kararlar. Her oturum sonunda güncelle. |
| v1.1 (geniş kapsam) ve v2.0 (tam zamanlı solo) GDD'leri | Git geçmişinde (`git log GDD.md`). |

Yayınlanmış okunabilir sayfalar (sahibinin claude.ai artifact'leri, gerektiğinde güncellenir): GDD → `claude.ai/code/artifact/92cab26a-de80-479f-b014-c8b31380b038`, Hikâye Kitabı → `claude.ai/code/artifact/e9445b90-4fff-4c5d-9558-3bf076263f13`.

## Değişmez tasarım kuralları (özet — ayrıntı GDD'de)

- **Jumpscare YOK; "Backrooms" kelimesi pazarlamada YASAK; HUD yok (her şey diegetik).**
- Silme yalnız oyuncunun kendi boyasında çalışır; Çizer işaretleri silinemez.
- Boya sınırsız; 4 renk; gerginlik kıtlıktan değil GÜVENDEN üretilir.
- 3 bölge: Enkaz → Sığlık 2a / Derin Sığlık 2b (arada sessizlik beat'i) → Haritalanamayan Merkez. Kritik yol ≥120 dk; hiçbir kesim süreyi 2 saatin altına indiremez.
- Çizer 3 perde (P1 kopya / P2 çarpıtma / P3 verbatim stroke-replay) — USP zinciri incelmez.
- Sicil: 3 ikili sinyal, 2 kova; etki = final varyantı + Watcher mesafe/ses/iz yönelimi.
- Soft-fail "Yeniden Emilme": A5 doz kuralları sayısal ve bağlayıcı (GDD §6.1).
- Sayısal sabitler: %70 döngü/%30 ölü uç, 60 sn kuralı, shape-match ~%70 tolerans, N=3 ipucu, sis 40-80 m, decal tavanı 1000/bölge, spam koruması 5-10 m, spawn 60-90°.
- Runtime prosedürel YOK; el yapımı + araç. Godot 4'te portal culling YOK — occlusion culling + OccluderInstance3D; navmesh bilinçli kapsam dışı.

## Sıradaki büyük iş: Labirent yazım aracı (mimari kararlaştırıldı — GDD §7.2)

İki parçalı boru hattı; teknik denetimden geçti:
1. **`tools/maze_tool.html`** — tek dosyalık, offline, tarayıcıda lokal HTML aracı: seed'li üretim (recursive backtracker + **braid oranı** = döngü %'si), kenar aç/kapa, oda/zone boyama, tipli marker'lar, **kilitli bölge korumalı kısmi yeniden üretim**, **Lynch metrik paneli** (%70/30, ödülsüz ölü uç, kritik yol→dakika [`meta.walkSpeed`], erişilemeyen hücre, §7.5 sabotaj çakışması). Dosya G/Ç: Chromium'da File System Access API (Ctrl+S aynı dosyaya), fallback `<a download>` + sürükle-bırak import.
2. **`*.maze.json`** — hücre/kenar grafı; stable ID; kenarlarda kapı yönü (`dir`); marker tipleri: kirik_checkpoint, sembol_kapi (edge referanslı), sembol_kaynak, watcher_spawn, cizer_slot(p1/p2/p3), is_lekesi_ipucu, belge, ruh_carpismasi, opsiyonel_dongu_odul, anomali_alani, oyuncu_baslangic. Monoton `nextId`; kilit-sınır kuralı: ucu kilitli hücreye değen kenar dokunulmaz. `meta{cellSize, walkSpeed, pivotConvention}`.
3. **Godot ince importer** (@tool, Rebuild+Validate): **kit sahne instancing** (GridMap ve MultiMesh REDDEDİLDİ — gerekçeler GDD §7.2), çıktı **ayrı `*_generated.tscn`** (PackedScene.pack + ResourceSaver.save; el dressing'i zone sahnesinde ayrı; **idempotent: iki import = sıfır diff**; orphan raporu). Kapsam: Enkaz+2a+2b; **Merkez araca girmez** (`kind: manual`).

**Uygulama sırası (kararlı):** (1) şema dondurma ~2 sa → (2) HTML araç çekirdeği (önce elle düzenleme, sonra generator) → (3) generator+kilit+panel → (4) marker katmanı → (5) Godot importer (~3 saatlik idempotanlık spike'ı erken yapılabilir). Efor: HTML ~25-35 sa, importer ~15-25 sa.

**Sahibinin planı:** HTML aracı yeni bir oturumda Claude yapacak, sahibi labirent üretim/düzenlemeyi test edecek. **Godot tarafı SONRA** — sahibi Godot için bir MCP kuracak, Godot tarafı o MCP üzerinden doğrudan yönetilecek. Godot importer'ı MCP kurulmadan yazmaya başlama.

## Çalışma kuralları (bu projede Claude nasıl çalışır)

- **Dil:** Türkçe (dokümanlar, commit gövdeleri, kullanıcı iletişimi). Kod/tanımlayıcılar İngilizce olabilir.
- **Süreç:** Sahibi yönetici-Claude'dan şunu bekler: işleri subagent'lara böl, **önemli kararları her zaman ikinci bir bağımsız denetçi ajana kontrol ettir**, sonra uygula. Karar tarihçesi tutulur (GDD Ek A formatı: orijinal → yeni → gerekçe → geri dönüş).
- **Kapsam disiplini:** GDD §17 içeriği launch öncesi tasarlanmaz/prototiplenmez. Her ekleme 4 tasarım sütunu + takvim testinden geçer. Süre kısıtı (min 2 saat) kesim sırasından üstündür.
- **Claude kod protokolü (GDD §18):** üretilen kod okunmadan commit edilmez; küçük commit'ler; her sisteme test; Godot sürümü pinlenir; sistem spec'leri GDD'den türetilir.
- **Git:** branch `claude/projectmaze-gdd-development-i8ikhe` (talimat: geliştirme bu branch'te). Commit'lerde model kimliği yazılmaz. Push: `git push -u origin <branch>`.
- **Oturum kapanışı:** `JOURNAL.md`'ye tarihli kayıt ekle (yapılan / sıradaki / açık karar), commit + push et.

## Açık kararlar (sahibinin onayı bekleyen)

- LORE.md'deki `[öneri]` isimleri ve mikro detaylar (onaylanırsa GDD + string tablosuna işlenecek).
- Final oyun adı (adaylar: WAYMARK / ASTERION / THE UNDRAWN) — Steam sayfası açılışından önce.
- Godot MCP kurulumu (sahibi kuracak; Godot tarafı ona kadar beklemede).
