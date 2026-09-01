# Labirent Yazım Aracı

Bölge labirentlerini üretmek, elle düzenlemek ve **GDD kurallarına karşı denetlemek** için tek dosyalık
tarayıcı aracı. Kaynak karar: **GDD §7.2**. Veri sözleşmesi: **[`SEMA.md`](SEMA.md)**.

| Dosya | Ne |
|---|---|
| `maze_tool.html` | Aracın kendisi. Bağımlılık yok, internet yok, kurulum yok. |
| `SEMA.md` | `*.maze.json` şeması (v1, donduruldu). Godot importer'ının sözleşmesi. |
| `ornek.maze.json` | Tam kurulmuş örnek Enkaz bölgesi — 0 hata, 0 uyarı. |
| `test_maze_tool.js` | 45 doğrulama: üretim, kilit kuralı, şema yuvarlak-gidişi, canon denetimleri, UI. |
| `test_maze_robustness.js` | Bozuk dosya, indirme yedeği, kopan kilitli ada, büyük ızgara performansı. |
| `test_maze_findings.js` | Denetim bulguları regresyonu — düzeltilen kusurlar geri gelmesin. |

**Testleri koşturmak** (Chromium + Playwright gerekir; araç kullanmak için gerekmez):

```
NODE_PATH=$(npm root -g) node tools/test_maze_tool.js
NODE_PATH=$(npm root -g) node tools/test_maze_robustness.js
NODE_PATH=$(npm root -g) node tools/test_maze_findings.js
```

## Çalıştırma

`maze_tool.html` dosyasına **çift tıkla**. Sunucu gerekmez.

**Chromium/Chrome/Edge önerilir:** File System Access API sayesinde `Ctrl+S` dosyanın **üstüne** yazar —
"farklı kaydet" penceresi her seferinde açılmaz. Firefox/Safari'de kayıt indirmeye düşer (aynı iş, bir
fazla adım). Kayıt yolu kapalıysa araç sessizce indirmeye düşer ve bunu üstteki bildirimde söyler.

Tarayıcı ayrıca her değişiklikte `localStorage`'a otomatik kayıt alır; sekme kazara kapanırsa açılışta
oradan geri yüklenir. **Bu bir yedek değildir** — asıl dosya git'tedir, `Ctrl+S` alışkanlık olmalı.

## 60 saniyede iş akışı

1. **Yeni…** → bölgeyi seç (Enkaz / Sığlık 2a / Derin Sığlık 2b). Araç hemen Lynch hedefine (%70 döngü)
   ayarlı bir labirent üretir.
2. **Tohum** değiştir + **Üret** (`G`) — beğendiğin taban çıkana kadar. Aynı tohum daima aynı labirenti verir.
3. Beğendiğin bölgeyi **Kilit** aracıyla (`L`) kilitle → tekrar **Üret**: kilitli alan ve ona değen kenarlar
   dokunulmaz, gerisi yeniden üretilir. Böylece iyi bulduğun köşeleri kaybetmeden döner durursun.
4. **Kenar** (`E`) ile elle düzelt: duvar → açık → kapı → duvar. `Shift+tık` tek yönlü kısayol yapar (§7.1-4).
5. **Marker** (`M`) ile hikâye öğelerini yerleştir. Sembol-kapı **kenara** konur, gerisi hücreye.
6. **Kritik yol durakları** panelinden zinciri kur (başlangıç → Kırık → belge → sembol → kapı). Süre tahmini
   bu zincir üzerinden hesaplanır.
7. Sağdaki **Doğrulama** listesi boşalana kadar çalış. `Ctrl+S`.

## Kısayollar

| | | | |
|---|---|---|---|
| `V` Seç | `E` Kenar | `M` Marker | `L` Kilit |
| `Z` Alt-bölge | `K` Hücre tipi | `R` Oda fırçası | `G` Üret |
| `F` Sığdır | `Ctrl+S` Kaydet | `Ctrl+O` Aç | `Del` Seçileni sil |

Orta tuş veya `Space`+sürükle kaydırır, tekerlek yakınlaştırır. `.maze.json` dosyasını pencereye
sürükleyip bırakmak da açar.

**Alan işlemleri (seansın en çok zaman yiyen yerleri):**
- **Oda fırçası (`R`)** — sürüklediğin dikdörtgeni avluya çevirir: hücreler `room`, **iç kenarların
  hepsi açık**. §9.5'in "dar servis koridorundan katedral avluya" kontrastı tek hareketle.
  `room` hücreler yeniden üretimden **muaftır**, yani elle açtığın avlu yeni tohumda hayatta kalır.
- **`Shift`+sürükle** — kilit / alt-bölge / hücre tipi fırçalarında dikdörtgen alan.
- **Ölü uç borcu paneli** — ödenmemiş ölü uçlara tek hamlede ödeme sınıfı atar; metni sonra
  tek tek yazarsın. Araç "sınıf atandı" ile "metin yazıldı"yı ayrı sayar.

## Doğrulama neyi ölçer

Araç **GDD'deki sabitleri ölçer, yenisini icat etmez.** Ölçülenlerin tam listesi ve kaynak paragrafları
`SEMA.md` §8'dedir. Öne çıkanlar:

- **%70 döngü / %30 dal** (§7.1-3) — köprü (bridge) analiziyle; "döngü çekirdeğindeki hücre" oranı.
- **Ödemeyen ölü uç** (§7.1-3) — her ölü uç ödemeli; **yinelenen ödeme metni** de yakalanır.
- **60 saniye kuralı** (§7.1-1) — ölçülen, koridorun tamamı değil **iki ayırt edici öğe arasındaki
  en uzun boşluktur**. Koridorun başına tek grafiti koymak 120 saniyelik düzlüğü temizlemez.
- **Sembol-kapı gerçek boğaz mı** (§4.4) — kapı kapalıyken iki taraf hâlâ bağlıysa hata: etrafından
  dolaşılan kapı bölge geçişi değil dekordur.
- **Backtracking** (§7.3) — kritik yol zincirinin tekrar yürüme oranı; §7.3 süreyi zikzakla
  doldurmayı açıkça yasaklar.
- **Kritik yol bütünlüğü** — zincirdeki silinmiş durak **hata**dır (süre tahminini sessizce kısaltır).
- **Erişilebilirlik** — tek yönlü kapılara saygılı; ayrıca "başlangıca geri dönülemiyor" tuzağı.
- **§7.5 sabotaj dönüşüm kuralı** — `anomali_alani` ile `cizer_slot` aynı mekân parçasında olamaz.
- **Yerleşim** — Watcher spawn sis bandı içinde (§5.1c), Çizer yuvası kavşakta (§5.2), is lekesi
  kapıya yakın (§4.4), ana vaka belgeleri Kırık'ta (§8.1/§8.4).
- **Marker yönelimi** (SEMA §5.2) — `face`/`yaw` dolu ve duvara bakıyor mu; importer'ın önkoşulu.
- **Bölgeye özel canon** — Enkaz'da Çizer yasağı, perde↔bölge eşleşmesi (p1→2a, p2→2b), Kırık zinciri
  sayıları, bölge başına 1 sembol-kapı tavanı (§4.4), sembol kaynağı → kapı ≤ 3 dk.
- **Meta** — `cellSize`/`walkSpeed` geçerli mi, sis bandı 40–80 m, kaybolma payı 1.0–1.2.

Aynı türden 3'ten fazla bulgu tek satırda toplanır; tıklayınca sırayla her birine odaklanır.

## Süre tahmini hakkında — okumadan bütçeye güvenme

```
bütçe kıyası = zincir_adım × cellSize / walkSpeed / 60  +  Σ duraklama
beklenen medyan = (aynı yürüme) × kaybolmaPayı          +  Σ duraklama
```

Bölge bütçesiyle karşılaştırılan **yalnız birincisidir**. GDD §7.3 kaybolma payını kritik yol
bütçesinin *üstüne* koyar (tüm oyun için +10–15 dk), o yüzden pay kıyasa giremez.

- **`walkSpeed` oyuncu controller'ındaki sabitle aynı olmak zorundadır** (GDD §7.2). Şu an varsayılan
  `1.4 m/s` ve **hiçbir controller'dan doğrulanmadı** — aracın en riskli varsayımı budur. Metrik
  paneli bu yüzden bir **hız duyarlılık satırı** gösterir (1.2 / 1.4 / 1.8 / 2.2 m/s → dakika):
  controller 1.8'e otururasa her bölge ~%22 kısalır, ve bu taban alanı çoktan kurulduktan sonra
  ortaya çıkar.
- **Duraklama süreleri (`meta.dwell`) tahmindir** — playtest'te ölçülüp güncellenecek ilk şeydir;
  "Izgara ve meta" panelinden düzenlenir.
- Bölge dakikası **üç kaldıraçla** tutturulur: **durak zinciri**, **duraklama süreleri**, **taban alanı**.
  En ucuzu birincisidir; taban alanı büyütmek landmark borcu üretir (GDD §7.2 büyütme kuralı).
  Zincirle tutturmaya çalışırken **zikzak yapma** — araç tekrar yürüme oranını ölçer ve uyarır.
- Bu yüzden çıkan dakika **mutlak gerçek değil, karşılaştırma aracıdır**.

## Aracın bilmediği şeyler

Dürüst sınırlar — bunları araç ölçmez, sen bilmelisin:

- **Bölgeler arası toplam.** Araç bölge başına bir dosya görür. GDD'nin en sert kısıtı olan
  **kritik yol ≥ 120 dk** hiçbir ekranda toplanmaz; üstelik sessizlik beat'inin 10 dk'sı ve
  Merkez'in 30–35 dk'sı araç kapsamı dışındadır. Üç bölge birden "yeşil"ken toplam plandan
  düşük olabilir — toplamı elle takip et.
- **Landmark.** GDD §7.1-2'nin birinci oryantasyon katmanı (uzak kule) veri modelinde **yok**;
  §7.2 marker listesinde de yok. Araç bunu ancak `payoff` sınıfı `landmark` olarak, yani metin
  düzeyinde görür. Gerçek landmark marker'ı bir **GDD kararıdır**, araç kararı değil.
- **Görüş hattı yaklaşıktır.** "Sis içinde görüşü olan kavşak" metriği 4 eksende düz açık koşuyu
  ölçer; köşeli görüş, kot farkı ve gerçek occlusion hesaba girmez.
- **Kot / düşey yok.** §7.4'ün "tek düşey set-piece"i şemada temsil edilmez; `kind: manual` ile
  işaretlenip elle kurulur.
- **Koridor genişliği tek değer.** `cellSize` bölge geneli için tektir; §9.5'in "dar servis ↔
  geniş avlu" kontrastı yalnız `room` etiketiyle temsil edilir, metrik olarak ölçülmez.

## Sıradaki adım: Godot importer

`SEMA.md` bu iş için dondurulmuş sözleşmedir. **Godot tarafı, sahibi Godot MCP'yi kurana kadar
başlamaz** (CLAUDE.md). İlk iş ~3 saatlik idempotanlık/owner spike'ıdır (GDD §7.2).
