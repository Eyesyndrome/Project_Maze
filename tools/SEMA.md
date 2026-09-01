# `*.maze.json` — Şema (v1, DONDURULDU)

Bu dosya **Project Maze labirent yazım aracının** veri sözleşmesidir. Kaynak karar: **GDD §7.2**.
Şema `tools/maze_tool.html` ile Godot importer'ı arasındaki **tek arayüzdür**; değişiklik yaparken
`meta.version` artırılır ve bu dosyaya bir "Sürüm tarihçesi" satırı eklenir.

**Temel ilkeler**

1. **Stable ID.** Her hücre, kenar ve marker'ın kalıcı bir `id`'si vardır. `nextId` monoton artar;
   **silinen ID asla yeniden kullanılmaz.** Godot importer'ın idempotanlığı buna dayanır.
2. **Tam kafes.** `edges` dizisi ızgaradaki **tüm olası kenarları** taşır (duvarlar dahil). Duvarı
   silmek yerine `state` alanı değiştirilir → ID kararlılığı bozulmaz, kısmi yeniden üretim güvenli olur.
3. **Bölge başına bir dosya.** Kapsam: `enkaz`, `sighlik_2a`, `derin_sighlik_2b`. **Merkez araca girmez**
   (GDD §7.2); Merkez'e komşu dikiş hücreleri `kind: "manual"` ile işaretlenir.
4. **Tek doğruluk kaynağı GDD'dir.** Araç yalnızca GDD'deki sayısal sabitleri ölçer, yenisini icat etmez.

---

## 1. Kök nesne

```jsonc
{
  "format": "project_maze.maze",   // sabit imza — importer bunu doğrular
  "version": 1,                    // şema sürümü
  "meta":    { ... },              // §2
  "nextId":  128,                  // bir sonraki serbest ID sayacı (monoton)
  "cells":   [ ... ],              // §3
  "edges":   [ ... ],              // §4
  "markers": [ ... ]               // §5
}
```

## 2. `meta`

| Alan | Tip | Açıklama |
|---|---|---|
| `zoneId` | string | `enkaz` \| `sighlik_2a` \| `derin_sighlik_2b` (araç kapsamı). Doğrulayıcı bölgeye özel canon kurallarını buna göre uygular. |
| `zoneName` | string | İnsan okunur ad ("Enkaz"). |
| `gridW`, `gridH` | int | Izgara boyutu (hücre). |
| `cellSize` | float | Hücre kenarı, **metre**. Godot dünya ölçeğine birebir çevrilir. |
| `walkSpeed` | float | Oyuncu yürüme hızı, **m/s**. **Oyuncu controller'ındaki sabitle aynı olmak zorundadır** (GDD §7.2). |
| `pivotConvention` | string | `cell_center_floor` (bkz. §6). |
| `seed` | int | Son üretimde kullanılan tohum. |
| `braid` | float 0..1 | Örgü oranı = **kaldırılan ölü uç yüzdesi**. Döngü oranını doğrudan kontrol eder. |
| `criticalPathTargetMin` | float | Bu bölgenin GDD §7.3 kritik yol bütçesi (dk). |
| `explorationFactor` | float | **Gerçek yürünen mesafe / en kısa yol** oranı. Sisli, haritalanmamış labirentte oyuncu en kısa yolu yürümez. GDD §7.3 kaybolma payını kritik yol bütçesinin **üstüne** koyduğu için bu çarpan **1.0–1.2** bandında tutulur; varsayılan `1.15`. |
| `fogMin`, `fogMax` | float | Sis bandı, metre. GDD sabiti: 40–80. |
| `dwell` | object | Marker tipi → dakika. Kritik yol süre tahmininde duraklama payı. |
| `criticalPath` | string[] \| null | Kritik yol için **sıralı marker ID listesi**. `null` ise araç otomatik türetir (`oyuncu_baslangic → sembol_kaynak(lar) → sembol_kapi`); bu türetme yalnız bir **alt sınırdır** — gerçek kritik yol Kırık, belge ve sahne duraklarını da gezer, o yüzden bölge tamamlandığında zincir elle kurulur. |
| `zones` | object[] | Boyama paleti: `{ "id", "name", "color" }`. Alt-bölge/oda kimliği (Lynch katman 2). |
| `notes` | string | Serbest tasarımcı notu. |
| `createdAt`, `modifiedAt` | ISO 8601 string | Damga. |

## 3. `cells[]`

```jsonc
{ "id": "c12", "x": 3, "y": 7, "kind": "normal", "zone": "avlu", "locked": false, "payoff": "", "note": "" }
```

| Alan | Değerler | Anlam |
|---|---|---|
| `id` | string | Kalıcı kimlik (`c` + sayı). |
| `x`, `y` | int | Izgara koordinatı. `x` doğuya, `y` güneye artar. |
| `kind` | `normal` | Kit prefab'ıyla üretilen standart koridor hücresi. |
| | `room` | Oda/avlu — importer geniş açıklık varyantını kurar; dressing elle. |
| | `manual` | **Importer dokunmaz.** Merkez dikişi ve hero-set-piece'ler (GDD §7.2). |
| | `void` | Labirent dışı boşluk; geçilemez, hiçbir şey üretilmez. |
| `zone` | string | `meta.zones[].id` referansı; boş olabilir. |
| `locked` | bool | **Kısmi yeniden üretim koruması.** Bkz. §7. |
| `payoff` | string | Ölü ucun "ödemesini" açıklayan serbest metin (manzara, grafiti vb.). Marker'la ödenen ölü uçlarda boş bırakılır. |
| `note` | string | Tasarımcı notu. |

`normal` ve `room` **geçilebilir** (passable); `manual` geçilebilir sayılır ama üretim dışıdır; `void` geçilemez.

## 4. `edges[]`

```jsonc
{ "id": "e88", "a": "c12", "b": "c13", "state": "open", "dir": "both", "note": "" }
```

| Alan | Değerler | Anlam |
|---|---|---|
| `id` | string | Kalıcı kimlik (`e` + sayı). |
| `a`, `b` | string | Komşu iki hücrenin ID'si. Yön: `a` daima `b`'nin batısında **veya** kuzeyindedir. |
| `state` | `wall` | Kapalı — duvar kit parçası + occluder üretilir (GDD §12.4). |
| | `open` | Açık geçit. |
| | `door` | Kapı çerçevesi. Sembol-kilit kapıları **daima** `door`'dur (+ `sembol_kapi` marker'ı). |
| `dir` | `both` | Çift yönlü (varsayılan). |
| | `ab` | Yalnız `a`→`b` geçilir — metroidvania-lite tek yönlü kısayol (GDD §7.1 kural 4). |
| | `ba` | Yalnız `b`→`a`. |
| `note` | string | Tasarımcı notu. |

`void` hücreye değen kenar her zaman `wall` kabul edilir.

## 5. `markers[]`

```jsonc
{ "id": "m7", "type": "sembol_kapi", "cell": null, "edge": "e88", "label": "2a→2b", "props": { "symbolId": "sym_2" } }
```

`cell` veya `edge` alanlarından **tam olarak biri** doludur (tipe göre — aşağıdaki "Bağ" sütunu).

| `type` | Bağ | Zorunlu `props` | GDD | Not |
|---|---|---|---|---|
| `oyuncu_baslangic` | cell | — | §7.3 | Dosya başına **tam 1 adet**. |
| `kirik_checkpoint` | cell | — | §6.2 | Kayıt + soft-fail dönüş + landmark. Ölü ucu **öder**. |
| `sembol_kapi` | **edge** | `symbolId` | §4.4 | Kenar `state:"door"` olmak zorunda. Bölge başına en fazla 1. |
| `sembol_kaynak` | cell | `symbolId` | §4.4 | Kapıyla **aynı bölgede**, yürüme ≤ 3 dk. Ölü ucu **öder**. |
| `watcher_spawn` | cell | — | §5.1c | Elle yerleştirilen koreografi noktası. Kırık'a 10 m'den yakın olmamalı. |
| `cizer_slot` | cell | `perde` ∈ `p1`\|`p2`\|`p3` | §5.2 | Enkaz'da Çizer **yoktur**; p1→2a, p2→2b, p3→Merkez. |
| `is_lekesi_ipucu` | cell | — | §4.6 | Sembol-kapı ipucu (N=3 başarısız denemeden sonra). Ölü ucu **öder**. |
| `belge` | cell | `tur` ∈ `tutanak`\|`kronoloji`\|`grafiti` | §8.3, §7.7-3 | Ölü ucu **öder**. |
| `ruh_carpismasi` | cell | — | §4.6 | Yalnız 2 sahne: 2a'da 1, Merkez Eşiği'nde 1. Ölü ucu **öder**. |
| `opsiyonel_dongu_odul` | cell | — | §7.3 | Opsiyonel ödüllü döngü — "kesilemez" süre taşıyıcısı. Ölü ucu **öder**. |
| `anomali_alani` | cell | `radius` (hücre) | §4.5, §7.5 | Manyetik ölü nokta. **`cizer_slot` ile çakışamaz** (§7.5 sabotaj kuralı). |

`props` şeması esnektir; yukarıdakiler doğrulayıcının bildiği alanlardır, ek anahtarlar korunur.

### 5.1 `payoff` alanı hakkında (şema eklentisi — sahip onayı bekliyor)

GDD §7.1 kural 3 "her ölü uç öder" der ve ödeme kanallarından biri **manzara**dır; ayrıca §7.7-3 grafiti
mikro-hikâyelerini sayar. GDD §7.2'nin marker listesinde `manzara`/`landmark` tipi **yoktur**. Bu şema
canon marker listesini genişletmek yerine hücre üstünde serbest metinli `payoff` alanı tanımlar:
doğrulayıcı bir ölü ucu "ödüyor" saymak için ya ödül sınıfı bir marker ya da dolu bir `payoff` metni arar.
**Bu, GDD'ye işlenmemiş küçük bir eklentidir; sahibinin onayına sunulmuştur.**

## 6. Koordinat ve pivot sözleşmesi (`pivotConvention: "cell_center_floor"`)

- Izgara: `x` doğuya (+X), `y` güneye artar.
- Godot dünya konumu, `(x,y)` hücresinin merkezi ve zemin düzlemi:
  `world = Vector3((x + 0.5) * cellSize, 0.0, (y + 0.5) * cellSize)`
- Yani **grid +y → Godot +Z**. Godot'ta "ileri" -Z olduğundan, araçtaki ekran-yukarı yönü dünyada
  kuzeydir; importer ek dönüşüm uygulamaz.
- Kenar duvarı, iki hücre merkezinin ortasında ve o eksene dik durur.
- Tek yönlü kapı (`dir: "ab"`) `a` hücresinden `b` hücresine bakar.

## 7. Kilit-sınır kuralı (kısmi yeniden üretim)

GDD §7.2'nin bağlayıcı kuralı, araçta şöyle uygulanır:

> **İki ucundan en az biri `locked: true` hücreye değen kenar, yeniden üretimde dokunulmazdır.**

Ek olarak `kind` değeri `void` veya `manual` olan hücreler üretim dışıdır ve aynı dokunulmazlığı taşır.
Üretim yalnız "üretilebilir" hücreler (`locked:false` ve `kind ∈ {normal, room}`) arasındaki kenarları
değiştirir. Kilitli bölgeye bağlantı, mevcut donmuş açık kenarlar üzerinden korunur; kopan bağlantı
**"erişilemeyen hücre" uyarısı** olarak rapor edilir.

## 8. Doğrulayıcının ölçtüğü GDD sabitleri

| Ölçüm | Hedef | Kaynak |
|---|---|---|
| Döngü oranı (döngü çekirdeğindeki hücre yüzdesi) | ~%70 | §7.1-3 |
| Dal/ölü uç oranı | ~%30 | §7.1-3 |
| Ödemeyen ölü uç | **0 olmalı** | §7.1-3 |
| Özelliksiz koridor süresi | ≤ 60 sn | §7.1-1 |
| Kritik yol süresi | `meta.criticalPathTargetMin` | §7.3 |
| Erişilemeyen geçilebilir hücre | 0 | §7.2 |
| Sabotaj çakışması (`anomali_alani` ∩ `cizer_slot`) | 0 | §7.5 |
| Sembol kaynağı → kapı yürüme süresi | ≤ 3 dk | §4.4 |
| Bölge başına sembol-kapı | ≤ 1 | §4.4 |
| Sis bandı | 40–80 m | §9.3, §12.4 |
| Watcher spawn ↔ Kırık mesafesi | ≥ 10 m | §5.1c, §6.1 |

**Süre formülü:**
`toplam_dk = (kritik_yol_hücre_sayısı × cellSize / walkSpeed / 60) × explorationFactor + Σ dwell(yoldaki marker'lar)`

**Ölçek uyarısı (araçtan çıkan bulgu):** GDD §7.3'ün dakika bütçeleri, saf *en kısa yol* yürümesiyle
karşılanamaz. Varsayılanlar (`cellSize 6 m`, `walkSpeed 1.4 m/s`, `explorationFactor 1.15`) ile Enkaz'ın
15 dakikası ancak ~60+ hücrelik bir zincirle dolar. Pratik sonuç: bölge bütçesi üç kaldıraçla tutturulur —
(1) **durak zinciri** (kritik yol Kırık/belge/sahne duraklarını gezer), (2) **duraklama süreleri** (`meta.dwell`),
(3) taban alanı. Bunlardan ilki en ucuzudur; taban alanını büyütmek landmark borcu üretir (GDD §7.2 büyütme kuralı).

## 9. Sürüm tarihçesi

- **v1 (2026-09-01)** — İlk dondurma. GDD §7.2'deki karar seti birebir uygulandı. Tek eklenti: `cells[].payoff` (§5.1).
