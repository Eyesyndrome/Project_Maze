# Labirent Yazım Aracı

Bölge labirentlerini üretmek, elle düzenlemek ve **GDD kurallarına karşı denetlemek** için tek dosyalık
tarayıcı aracı. Kaynak karar: **GDD §7.2**. Veri sözleşmesi: **[`SEMA.md`](SEMA.md)**.

| Dosya | Ne |
|---|---|
| `maze_tool.html` | Aracın kendisi. Bağımlılık yok, internet yok, kurulum yok. |
| `SEMA.md` | `*.maze.json` şeması (v1, donduruldu). Godot importer'ının sözleşmesi. |
| `ornek.maze.json` | Tam kurulmuş örnek Enkaz bölgesi — 0 hata, 0 uyarı. |

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
| `Z` Alt-bölge | `K` Hücre tipi | `G` Üret | `F` Sığdır |
| `Ctrl+S` Kaydet | `Ctrl+O` Aç | `Ctrl+Z` / `Ctrl+Shift+Z` Geri / İleri | `Del` Seçileni sil |

Orta tuş veya `Space`+sürükle kaydırır, tekerlek yakınlaştırır. `.maze.json` dosyasını pencereye
sürükleyip bırakmak da açar.

## Doğrulama neyi ölçer

Araç **GDD'deki sabitleri ölçer, yenisini icat etmez.** Ölçülenlerin tam listesi ve kaynak paragrafları
`SEMA.md` §8'dedir. Öne çıkanlar:

- **%70 döngü / %30 dal** (§7.1-3) — köprü (bridge) analiziyle; "döngü çekirdeğindeki hücre" oranı.
- **Ödemeyen ölü uç** (§7.1-3) — her ölü uç Kırık/sembol/lore/manzara ile ödemeli.
- **60 saniye kuralı** (§7.1-1) — ayırt edici öğesiz koridor koşuları.
- **Kritik yol süresi** (§7.3) — bölge bütçesine karşı.
- **§7.5 sabotaj dönüşüm kuralı** — `anomali_alani` ile `cizer_slot` aynı mekân parçasında olamaz.
- **Bölgeye özel canon** — Enkaz'da Çizer yasağı, perde↔bölge eşleşmesi (p1→2a, p2→2b), Kırık zinciri
  sayıları, bölge başına 1 sembol-kapı tavanı (§4.4), sembol kaynağı → kapı ≤ 3 dk.

Aynı türden 3'ten fazla bulgu tek satırda toplanır; tıklayınca sırayla her birine odaklanır.

## Süre tahmini hakkında — okumadan bütçeye güvenme

```
toplam_dk = (zincir_hücre_sayısı × cellSize / walkSpeed / 60) × kaybolmaPayı + Σ duraklama
```

- **`walkSpeed` oyuncu controller'ındaki sabitle aynı olmak zorundadır** (GDD §7.2). Şu an varsayılan
  `1.4 m/s`; controller yazıldığında ikisi birlikte güncellenir.
- **`kaybolmaPayı` 1.0–1.2 bandında tutulur.** GDD §7.3 kaybolma payını kritik yol bütçesinin *üstüne*
  koyar (tüm oyun için +10–15 dk); bütçe ona yaslanamaz.
- **Duraklama süreleri (`meta.dwell`) tahmindir** — playtest'te ölçülüp güncellenecek ilk şeydir.
- Bu yüzden çıkan dakika **mutlak gerçek değil, karşılaştırma aracıdır**: bölgeler arası denge ve bütçe
  sapması için güvenilir, mutlak süre taahhüdü için değil.

## Sıradaki adım: Godot importer

`SEMA.md` bu iş için dondurulmuş sözleşmedir. **Godot tarafı, sahibi Godot MCP'yi kurana kadar
başlamaz** (CLAUDE.md). İlk iş ~3 saatlik idempotanlık/owner spike'ıdır (GDD §7.2).
