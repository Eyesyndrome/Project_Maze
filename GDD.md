# PROJECT MAZE — Oyun Tasarım Dokümanı (GDD)

---

## 0. Kapak

| | |
|---|---|
| **Çalışma adı** | Project Maze |
| **Final isim adayları** | 1) **WAYMARK** — ana mekaniği (yol işaretleme) tek kelimede satar. 2) **ASTERION** — Watcher'ın gerçek adı; "adlandırma = güç" temasıyla örtüşür. 3) **THE UNDRAWN** — Çizer'i ve "henüz çizilmemiş işaret" korkusunu ima eder. Final isim + capsule art, Steam sayfası açılışından (Ay 3, §13.3) önce kesinleşir. |
| **Tek cümlelik pitch (USP)** | "Labirentte yolunu sprey boyayla işaretliyorsun — ama içerideki bir şey senin işaretlerini taklit ediyor." |
| **Versiyon** | **2.0 — Solo Sürüm** |
| **Tarih** | Eylül 2026 |
| **Hazırlayan notu** | Bu doküman, v1.1'in (2–3 kişilik ekip, geniş kapsam) tek geliştiriciye ve kısaltılmış takvime göre baştan yazılmış halidir; solo kapsam kararları (S1–S12) ve denetim revizyonları (B1–B8) işlenmiştir. **v1.1 (geniş kapsam) git geçmişindedir**; kesilen hiçbir fikir çöpe atılmamış, ertelenenler §17'ye taşınmıştır. Karar dili kesindir; sapmalar Ek A'dadır. Dahili dokümandır: spoiler içerir. |

---

## 1. Vizyon ve Künye

### 1.1 Elevator pitch

Emekli bir polis memuru, otuz yıl önce sustuğu bir gecenin enkazında uyanır: sisle dolu, sonsuz bir beton labirentin içinde, devrilmiş devriye arabasının yanında. Elindeki tek araç, olay yeri işaretleme spreyi ve arabanın pusulasıdır. Yolunu duvarlara boyayarak bulur — ta ki bir şey, onun işaretlerini onun el yazısıyla taklit etmeye başlayana kadar. Bu labirentten kaçılmaz; bu labirentte **yargılanılır**.

### 1.2 Künye

| Alan | Karar |
|---|---|
| Tür | Atmosferik liminal keşif / psikolojik korku (birinci şahıs) |
| Platform | **PC (Steam).** Steam Deck **uyumlu hedeflenir; resmi doğrulama launch sonrasıdır** (§17). Konsol launch sonrası |
| Motor | **Godot 4** (ücretsiz, hazır PSX görsel eklentileri, solo geliştirici dostu) |
| Hedef süre | **1,5–2 saat** ana deneyim (medyan bitirme hedefi ≥ 100 dk, §14.2) |
| Fiyat | **$5.99** |
| Ekip | **1 kişi — solo geliştirici** (ses/müzik hafif dış kaynak, §10.5) |
| Takvim | **9 ay hedef / 12 ay taahhüt** (tam zamanlı; yarı zamanlıysa takvim uzar, kapsam değişmez) |
| Hedef kitle | POOLS / The Exit 8 / The Complex serisi / Mouthwashing oyuncusu; jumpscare istemeyen, atmosfer ve ortam anlatımı seven, PSX estetiğine sıcak bakan 18+ oyuncu; korku yayıncıları ikincil kitle |
| Duygu hedefi | **Devasalık, tekinsizlik, izolasyon.** Klostrofobi değil sonsuzluk; panik değil huzursuzluk. **Jumpscare YOKTUR.** |
| İçerik uyarısı | Kayıp kişi vakası ve polis örtbası temaları (§3.9) |

### 1.3 Tasarım sütunları

Her özellik, ekleme önerisi ve kesim tartışması bu dört sütuna karşı sınanır. Bir özellik en az bir sütunu güçlendirmiyorsa GDD'ye girmez.

1. **Boya senin el yazındır.** Oyuncunun labirentteki tek kalıcı izi kendi işaretleridir; oyun bu işaretlere duyulan güveni inşa eder ve sonra sarsar. Bilgiye saldırılır, oyuncuya saldırılmaz.
2. **Devasalık, kalabalık değil.** Ölçek; siluet, ses ve kontrastla satılır. Labirent boş, sessiz ve kayıtsızdır.
3. **Her şey diegetik.** HUD yok, harita ekranı yok, sanity barı yok. Pusula eldedir, kayıt telefon ahizesidir, korku ölçer oyuncunun vicdanıdır.
4. **Labirent bir mahkemedir.** Her sistem (Watcher, Çizer, Kırıklar, sonlar) tek temaya hizmet eder: yargılanmamış suç ve susan tanık. Ton bireysel vicdandır, kurumsal suç draması değildir.

Solo sürümün beşinci, üretim sütunu: **kapsam takvime uyar, takvim kapsama değil.** Sıkışmada kesim sırası (§13.5) uygulanır; ertelenen §17'ye yazılır ve launch öncesi tasarlanmaz.

### 1.4 Bu oyun ne DEĞİLDİR

- **Backrooms oyunu değildir** (kelime pazarlamada da geçmez, §2.3).
- **Jumpscare korkusu değildir** — hiçbir varlık saldırmaz, kovalamaz, ekrana atlamaz.
- **Kaynak yönetimi oyunu değildir** — boya sınırsızdır, can/stamina/açlık yoktur.
- **Bulmaca oyunu değildir** — kritik yolda tek zorunlu bulmaca türü vardır (sembol-kapı, §4.4).
- **Prosedürel sonsuz labirent değildir** — el yapımıdır.
- **Yürüyüş simülatörü de değildir** — core loop'un "Oku/Yorumla" halkası sürekli aktif akıl yürütme ister.

---

## 2. Pazar Konumlandırması

### 2.1 Rakip tablosu özeti

| Oyun | Fiyat | Süre | Steam | Bizim için dersi |
|---|---|---|---|---|
| POOLS | ~$13–16 | 3–5 sa | ~%95 (3.400+) | Jumpscare'siz saf atmosfer ticari olarak çalışıyor |
| The Exit 8 | $3.99 | ~1 sa | %93 (10.000+) | Mikro kapsam + net tek mekanik = 2M satış; "tek cümlelik mekanik" şart |
| **The Complex: Found Footage** | **$4.99** | **1–2 sa** | **~%90** | **Fiyat bandımızın ana kanıtı: kısa + ucuz + net konsept liminal oyun bandı kanıtlanmış** |
| The Complex: Expedition | $14.99 | 3–4 sa | %89 (~2.400) | Labirentte kaybolmaya talep var |
| Anemoiapolis Ch.1 | $8.99 | ~2 sa | %81 | Fiyat-süre uyumsuzluğu puanı %80'lere düşürür — 2 saatlik oyun $8.99 taşımaz |
| Mouthwashing | $12.99 | kısa | %95 (24.600+) | PSX + güçlü anlatı, kısa oyunu hite çevirir |
| Superliminal | $19.99 | ~3 sa | %94–95 | Anında anlaşılan "kavram" fiyatı taşır |

### 2.2 Konumlandırma ve fiyat savunusu

> **"Korkutmaz, huzursuz eder":** sisli beton sonsuzlukta diegetik navigasyon araçlarıyla kaybolma — ve o araçlara sızan bir taklitçi.

**Fiyat $5.99'dur ve kesindir.** Dayanak: The Exit 8 ($3.99, ~1 sa) ile The Complex: Found Footage ($4.99, 1–2 sa) bandı, "kısa + ucuz + net USP" formülünün türde kanıtlanmış bandıdır; Anemoiapolis dersi ise 2 saatlik içeriğin $8.99'u taşımadığını gösterir. **$4.99 bilinçli olarak seçilmez:** o bant "8-like klon" sinyali üretir (sinyal hatası); $5.99, özgün mekanik iddiasını fiyatla da işaretler. Kısa oyun USP'yi sulandırmaz — Exit 8 kanıtıdır.

### 2.3 "Backrooms" kelimesi yasağı

Backrooms markası jenerikleşti; "8-like" furyası doygun. Steam etiketlerinde, mağaza metninde, basın kitinde ve sosyal medyada **"Backrooms" kullanılmaz**. Etiketler: "liminal", "atmosferik", "psikolojik korku", "keşif", "PSX/retro".

### 2.4 USP'nin pazarlanması

Fragmanın **ilk 10 saniyesi** Çizer'in taklit anını gösterir — estetik değil mekanik USP satılır. Çizer'in yayıncıyı kandırdığı anlar klip kanalının doğal yakıtıdır; tell'ler tutorial'da anlatılmaz ki topluluk "tell listesi" tartışsın (bedava pazarlama). Ayrıntılı plan §15'te.

---

## 3. Hikaye ve Evren

### 3.1 Yutan Labirent — evren kural seti

1. **Labirent bir süreçtir** — dünyanın sindirim sistemi. Her kültür onu kendi ölüm-sonrası mimarisiyle gördü; hepsi aynı yapının gölgeleridir.
2. **Labirent kötülüğü değil, YARGILANMAMIŞ kötülüğü yer.** Vicdanın taşıyamayacağı bir şey tanıksız kaldığında o mekân yutulur. Beton koridorlar, yutulan mekânların arasını dolduran yara dokusudur.
3. **Gerçeklik Kırıkları:** yutulan mekânlar tam sindirilmez; suçun tanığı olabilecek nesneler korunur. Her Kırık çözülmemiş bir dosyadır.
4. **Giriş eşiktendir, kapıdan değil.** Yargılanmamış bir suçla bağı olan kişi yanlış köşeyi döner ve koridor bitmez.
5. **Çıkış duruşma tamamlanarak olur.** Oyuncu merkeze bir hakikat bırakmadan çıkamaz. Yalanla da "çıkılabilir" — bedeli vardır (§3.8).

### 3.2 90'lar vakası — kanıt zinciri

1990'larda küçük bir kasabada bir **kayıp kişi vakası örtbas edildi**. İhbara giden devriye arabası "kaza yaptı", dosya kapandı. Tanıksız kalan gece parça parça yutuldu: yol, devriye arabası, telefon kulübesi, karakol arşivi. **Oyundaki TÜM Gerçeklik Kırıkları bu tek gecenin kanıt zinciridir.** Oyuncunun araçları o arabadan gelir: sprey olay yeri işaretleme boyasıdır, pusula araç ekipmanıdır. Labirent delil çantasını **iade eder** — oyuncu duruşmanın atanmış görevlisidir.

### 3.3 Oyuncu karakteri — susan memur

O geceki genç devriye memuru; bugün yaşlanmıştır. Örtbası görmüş, susmuştur.

- **Yargılanan bizzat oyuncudur.** Watcher'ın bakışı bir suçlamadır: "saldırmıyor, çünkü beni tartıyor."
- Araçlar "bulunan eşya" değil **"iade edilen zimmet"**tir; açılış organiktir.
- **Sessizdir ve bu karakterin ta kendisidir** (sesli diyalog yok = bütçe + tema örtüşmesi). Mısır paraleli: Negatif İtiraf'ı ("görmedim, duymadım") otuz yıldır ezbere okuyan adam.
- Polis geçmişi hafif bulmaca meşruiyeti verir: telsiz kodları, plakalar, dosya numaraları okunabilir.

### 3.4 The Watcher — Asterion, kalp tartıcısı

Canavar değil; **ilk yutulan kurbandır** — doğduğu için suçlanan, yargılanmadan gömülen ilk varlık (Minotor'un gerçek adı Asterion). Labirent onu sindirmek yerine görevlendirdi: **sessiz kalp tartıcısı** (Ammit + 42 yargıç). Saldırmaz; tartar. Belirme mesafesi ve silueti dürüstlük siciline bağlıdır (§5.1). Finalde tek kez oyuncunun gerçek adını duvara yazar. Merkezdeki odası taht odası değil, **çocuk odasıdır** (§7.6).

### 3.5 Bilinmeyen Çizer — kıdemli ortak

Daidalos arketipi: Çizer, **o gece arabadaki kıdemli ortaktır**. Otuz yıl önce yutuldu; duruşmasından kaçtıkça merkeze katlandı; şimdi Watcher'ın dikkatini başkasına çekerse salıverileceğine inanıyor. Sahte işaretleri kötülük değil **umutsuzluğun el yazısıdır**: dikkatli bakan çizgilerin titrediğini görür (pişmanlık). Oyuncunun karanlık aynasıdır: "susan tanık" ile "saptıran tanık" arasındaki mesafe bir sprey kutusudur. Üçüncü perdedeki tek karşılaşma §5.2'dedir.

### 3.6 Mitolojik katmanlar

Labirent derine indikçe zamanda geriye katmanlaşır. v2.0'da katman sayısı üçe yoğunlaştırılmıştır; mitolojik tez (her kültür aynı labirenti gördü) değişmemiştir:

| Katman | Bölge | Dönem/kimlik | Dayanak (özet) |
|---|---|---|---|
| **Beton** | Enkaz + Sığlık (2a) | 20.–21. yy | Modern grafiti, taze Kırıklar, 90'lar vakasının kanıtları |
| **Taş→Duat izleri** | Derin Sığlık (2b) | Kuzey Avrupa → Mısır | **Trojaborg** ruh tuzakları (labirent tanım gereği ruh kapanıdır); **İki Yol Kitabı** — bilinen en eski öbür dünya haritası — 2b'de **tek hero-duvar diyagramı** olarak; kalbin Ma'at tüyüne karşı tartılması. Tam bölge değil, derinleşen geçiş kimliğidir |
| **Merkez** | Haritalanamayan Merkez | Girit | Daidalos'un labirenti, Asterion, **Ariadne'nin ip yumağı (clew)** — İngilizce "clue" bu yumaktan türedi: sprey boya, kelimenin tam anlamıyla "ipucu bırakmak"tır |

**Ruh Çarpışmaları'nın kaynağı çok kültürlüdür** (tek "Kelt" etiketi kullanılmaz — Ek A): Çin ruh perdesi duvarları, İrlanda peri/ceset yolları, İskandinav Trojaborg tuzakları. Chartres tek-yol labirenti iyi sonun mimari dilini verir.

### 3.7 Ton kuralı

Hikâye **bireysel vicdan** ekseninde anlatılır; kurumsal/sistemik suç draması değildir. Failler kurum değil kişilerdir; oyuncunun yargılandığı şey teşkilat değil kendi susuşudur. Politik yorum kapısı bilinçli kapalıdır.

### 3.8 Sonlar

Launch'ta **2 son** vardır; her ikisi tek mekanik (sprey) + tek sahne varyasyonudur. Gizli "İp" sonu §17'ye ertelenmiştir.

| Son | Etiket | Koşul (somut fiiller) | Sahne |
|---|---|---|---|
| **Tüy (itiraf)** | [MVP] | Merkezde oyuncu kendi vaka damgasının boş hüküm hanesini spreyle doldurur: "tanık: ben" | Watcher ilk kez tam görünür — insandır. Çıkış Chartres tek-yol labirentidir (kaybolunamaz). Araba enkazının yanında uyanış; telefon kulübesi çalıyor |
| **Ağır Kalp (inkâr)** | [MVP] | Kırık kanıt etkileşimlerini yapmadan geçmek + Çizer'in ok zincirini takip etmek + finalde hüküm hanesini boş bırakıp çıkış kapısını boyamak. Not: Kırık'taki **kayıt etkileşimi** (arabaya oturma/ahize) sicile işlemez ve kanıt etkileşiminden ayrıdır — inkâr yolundaki oyuncu da kayıt yapabilir | Kapıdan çıkar ama sis açılmaz. Son sahnede eli kendiliğinden ok çizmeye başlar: **yeni Bilinmeyen Çizer o olmuştur** (döngü; ek ara sahne yok) |

### 3.9 İçerik uyarısı

Mağaza sayfası ve oyun açılışında: *"Bu oyun kayıp kişi vakası ve polis örtbası temaları içerir."* Jumpscare içermediği ayrıca belirtilir (hedef kitle güvencesi).

---

## 4. Oynanış — Core Loop ve Mekanikler

### 4.1 Core loop (4 halka)

**KEŞFET → İŞARETLE → OKU/YORUMLA → AÇ**

1. **Keşfet:** sisli koridorlarda landmark'lar, Kırıklar ve semboller aranır.
2. **İşaretle:** sprey ile yön okları, kodlar, kişisel notasyon bırakılır.
3. **Oku/Yorumla:** duvar yazıları, dosya damgaları, Çizer işaretleri ve kendi eski işaretlerin **okunur ve sorgulanır** ("bunu ben mi çizdim?"). Loop'un bilişsel girdi halkası budur.
4. **Aç:** çözülen sembol kapıya çizilir, bölge açılır.

Hedef merdiveni: **kısa** (dakikalar — sonraki landmark; sembolü bul), **orta** (15–25 dk — bölge kapısının sembolünü çöz ve boya; bölgenin Kırık'ını bul), **uzun** (merkeze ulaş; vakanın kronolojisini birleştir; çık — ya da çıkma).

### 4.2 Sprey sistemi [MVP]

- **Boya SINIRSIZDIR.** Gerginlik kıtlıktan değil **güvenden** üretilir: Çizer taklitleri ve boya yaşlanması, oyuncunun kendi bilgisine güvenini aşındırır.
- **4 renk, sabit** (tuşlar 1–4). Renkler CB-güvenli paletten seçilir; her rengin ikincil kodu vardır (§11.3). Fosforlu 5. renk launch sonrasıdır (§17); **1–6 tuş rezervi ve renk-agnostik decal mimarisi kalır** — geri ekleme ≈ 1–2 gün (§14.2 A/B).
- **Fırça boyutu:** fare tekerleğiyle 3 kademe.
- **Decal tabanlı:** her darbe yüzeye hizalı projected decal'dir (§12.2).
- **Boya yaşlanması:** taze boya parlak ve akıntılıdır; zamanla matlaşır, solar — tam silinmez. Derin bölgelerde yaşlanma hızlanır. Yaşlanma bedava zaman bilgisidir ve decal tavanının diegetik örtüsüdür (§12.2).

### 4.3 Silme kuralı ve Çizer işaretine müdahale [MVP — kritik]

**Silme (sağ tık) YALNIZCA oyuncunun kendi boyasında çalışır.** Diegetik gerekçe: oyuncunun spreyi devriye arabasından çıkan belirli bir kimyasaldır; Çizer'inki başka bir maddedir — silinemez, üzeri boyansa bile altından sızar. Çizer işareti sağ tıkla nötralize edilemez; oyuncu onu **yorumlamak** zorundadır — tehdit bilişsel düzlemde kalır.

**Çizer işaretine müdahale tablosu (A2, v2.0 sicil senkronu — B3):**

| Oyuncu fiili | Mekanik sonuç | Dürüstlük siciline etkisi |
|---|---|---|
| Sahte işaretin YANINA "sahte" damgası / X koymak | İşaret etiketlenir; oyuncunun kendi bilgi ağı güçlenir | **—** (sicile işlemez) |
| Sahte işaretin üzerini boyamaya çalışmak | Boya kapanmaz, altından sızar | **—** (sicile işlemez) |
| KANIT NESNESİNİN üzerini tamamen kapatacak şekilde boyamak | Kanıt örtülür | **NEGATİF** |

**Sicilin tek kaynağı §5.1'deki 3 sinyaldir**; bu tablonun yalnız son satırı o listeye karşılık gelir. Başka hiçbir fiil sicile işlemez.

### 4.4 Sembol-kilit kapılar [MVP]

Bölge kapıları, labirentin başka yerinde bulunan bir sembolün kapıya **spreyle çizilmesiyle** açılır. Çizim grid'e rasterize edilip şablonla karşılaştırılır; **shape-matching toleransı ~%70** (playtest ile ayarlanır, §14). Envanter yoktur — **anahtar oyuncunun kafasında taşınır**.

Oyunda **toplam 3 sembol-kapı** vardır:

1. **Enkaz** — öğretim kapısı.
2. **2a → 2b** geçişi.
3. **2b → Merkez** geçişi.

**Sürtünme tavanı kuralları (A6 — aynen geçerli):**
- Kritik yolda **bölge başına en fazla 1 sembol-kapı** (2a ve 2b ayrı alt bölgelerdir; tavan korunur), oyun boyunca toplam 3. Merkez'de kapı yoktur — final kapı değil karardır.
- Sembol aynı bölgededir; kapıya yürüme mesafesi **≤ 2–3 dakika**.
- Yanlış çizim **cezasızdır, deneme sınırsızdır**; N başarısız denemeden sonra diegetik ipucu belirir (yakındaki scripted is lekesi hizası sembole işaret eder — §4.6). **N: playtest parametresi, başlangıç değeri 3.**
- Menüde "çizim yardımı" (snap) erişilebilirlik seçeneği vardır (§11.3); **gamepad'de varsayılan açıktır** (§4.7).
- Demoya bir sembol-kapı konur — kitle kendini filtreler.
- **KURAL: Kritik yolda tek zorunlu bulmaca türü vardır (sembol-kapı); diğer her bulmaca opsiyoneldir.**

Kapı estetiği: Mısır ikonografisi birebir alınmaz; **beton-brutalist soyut semboller** kullanılır ("hiçbir kültüre ait olmama" tekinsizliği + temsil/telif hassasiyeti).

### 4.5 Pusula [MVP]

- **Diegetik:** Q tuşu pusulayı ele kaldırır; ekran katmanı yoktur. Pusulanın "kuzeyi" global landmark'a — sisin üstünden görünen uzak kuleye — kilitlidir.
- **Anomali = bilgi:** manyetik ölü noktalarda (2b'de tanıtılır) iğne rastgele "çıldırmaz"; **yanlış ama TUTARLI şeyi gösterir: en yakın Gerçeklik Kırığı'nı.** Öğrenen oyuncu için Kırık dedektörü, öğrenmeyen için katıksız tekinsizlik.
- Watcher ürpertisi (iğne titremesi) ve üçgenleme bulmacası launch sonrasıdır (§17).

### 4.6 Ruh Çarpışmaları [MVP — 2 scripted sahne]

Siste düz bir hatta süzülen soluk ışık bir duvara ulaşır, titreşir, söner — duvarda **is lekesi** kalır. Tok, yönlü (3D) tek ses vuruşuyla gelir (§10.4). v2.0'da sistemik rastgele olay değil, **2 elle sahnelenmiş andır**:

1. **2a'da ilk karşılaşma** — güven evresinde tek tekinsizlik vuruşu.
2. **Merkez girişi "Eşik"te ikincisi** — final öncesi ton yükseltici (§6.2).

**Etiket ayrımı:** Sembol-kapı çevresindeki **scripted is lekesi ipuçları [MVP]'dir** ve A6'nın "N denemeden sonra diegetik ipucu" kuralını karşılar (elle yerleştirilmiş, kapıya özel). Labirent geneli "ley hattı" navigasyon katmanı launch sonrasıdır (§17) ve yokluğu MVP ipucu sistemini etkilemez.

### 4.7 Kontrol şeması

| Girdi | İşlev |
|---|---|
| WASD | Hareket |
| Shift | **Koşma — stamina YOK** (devasa mekânda stamina angaryadır) |
| Fare | Bakış |
| Sol tık | Sprey (basılı tutarak sürekli çizim) |
| Sağ tık | Silme (yalnız kendi boyanda) |
| Tekerlek | Fırça boyutu |
| 1–4 | Renk seçimi |
| **1–6 rezerve** | Tuş haritası 6 renge ölçeklenebilir yazılır (geri dönüş mimarisi, Ek A) |
| Q | Pusulayı kaldır/indir |
| E | Etkileşim (Kırık nesneleri, belgeler) |
| Esc | Menü |

**Gamepad [MVP — temel Steam Input eşlemesi]:** sol çubuk hareket, sağ çubuk bakış; çizim = RT + bakış imleci; LT silme; D-pad renk döngüsü; Y pusula, A etkileşim; omuz tuşları fırça boyutu. **Gamepad'de "çizim yardımı" (snap, §11.3) varsayılan AÇIKTIR** — shape-matching toleransı girdi türünden bağımsız aynıdır, hassasiyet farkını snap kapatır. Tüm tuşlar yeniden atanabilir. Gyro ince ayar ve radyal renk menüsü cilası launch sonrasıdır (§17).

### 4.8 Hareket hissi

Yürüme temel tempodur; **koşma vardır, stamina yoktur**. Eğilme ve tırmanma **[Kesildi]** (Ek B). Head-bob hafiftir ve kapatılabilir (§11.3). Devasalık hissi hareket hızı + FOV + ölçek kontrastıyla kalibre edilir — draw distance ile değil (§9.5).

---

## 5. Varlıklar

### 5.1 The Watcher — davranış sistemi [MVP]

Watcher iki bağımsız sorunun cevabıyla çalışır: **ne zaman belirir** (yalnızlık sayacı) ve **nasıl belirir** (dürüstlük sicili).

**(a) Belirme tetikleyicisi — yalnızlık sayacı:** rastgele spawn yoktur. Gizli sayaç şunlarla dolar: landmark görmeden / işaret bırakmadan geçen süre + (finalde) hikâye vuruşları. **Spam koruması (A4): aynı 5–10 m içindeki ardışık işaretler sayacı sıfırlamaz; sıfırlama = landmark GÖRME + yeni konumda işaret.**

**(b) Belirme niteliği — dürüstlük sicili (v2.0):** sicil **3 ikili, itiraz edilemez sinyalden** oluşur (yeni sinyal ancak bu tabloya eklenerek tanımlanabilir; örtük sinyal yoktur):

| Sinyal | Yön |
|---|---|
| Kırık kanıt etkileşimini tamamlama | + |
| Kanıt nesnesini boyayla örtme | − |
| Finalde hüküm hanesi seçimi | belirleyici |

Çıktı **2 kovadır: dürüst (varsayılan) / sahteci.** Kovalar YALNIZCA şunları değiştirir: (i) Watcher belirme **mesafe bandı**, (ii) tek siluet **morph parametresi** (boynuz gölgesi ölçeği — tek blend), (iii) **final varyantı**. Başka hiçbir sistem sicili okumaz. §4.3 müdahale tablosu bu listeyle senkrondur; çelişki yoktur.

**Ters teşvik düzeltmesi:** kova, korku **miktarını değil TÜRÜNÜ** değiştirir. Dürüst oyuncu Watcher'ı yine görür — uzak, insansı, hüzünlü (tekinsizlik). Sahtecide yakın ve boynuzludur (tehdit). **Korku bütçesi kimseden esirgenmez.** Kova değiştiğinde tek okunur tepki verilir: sonraki beliriş belirgin biçimde daha yakın/uzak + kısa ses imzası.

**(c) Spawn koreografisi:** eşik aşılınca Watcher, görüş yönünün **60–90° yanında**, sis sınırında, **elle yerleştirilmiş** spawn noktasında belirir. Yaklaşılınca sis yutmuş gibi kaybolur. Pathfinding AI yoktur; koreografi vardır.

**(d) İz bırakma [MVP]:** kaybolduğu yerde küçük bir dünya değişikliği kalır — kapalı kapı açık, işaretin önünde ıslak ayak izi. "Acaba yine mi geldi" paranoyası, görünmesinden değerlidir.

Bakışma mekaniği ve pusula ürpertisi launch sonrasıdır (§17). [Kesildi — Ek B]: kovalama, saldırı, pathfinding.

### 5.2 Bilinmeyen Çizer [MVP — bütçenin yıldızı]

Bu oyunun "jumpscare"i Çizer'dir; **v2.0'da kesinti yoktur — oyunun varlık nedenidir.** Çizer neredeyse hiç render edilmez; **işaretleri onun bedenidir**.

**Üç perdelik tırmanış:**

| Perde | Bölge | Davranış |
|---|---|---|
| **P1 — Kopyalar** | Sığlık (2a) | Oyuncunun işaretinin aynısı, yanlış kavşakta. Bu perdede önceden hazırlanmış **8–10 el yapımı jenerik varyant** kullanılır |
| **P2 — Çarpıtmalar** | Derin Sığlık (2b) | Oyuncunun kendi oku 10° döndürülmüş, "düzeltilmiş" gibi |
| **P3 — Öngörüler** | Merkez | Hiç gidilmemiş koridorda, oyuncunun stilinde, henüz çizilmemiş işaret. Doruk korku anı — teknik: stroke-replay (§12.3); jenerik işaret P3'te YOKTUR |

2a→2b arasındaki **sessizlik beat'inde Çizer tamamen susar** (§7.4) — P1'in sarsıntısından sonra nefes, P2'nin tırmanışından önce gerilim.

**Öğrenilebilir tell'ler:** kopyalar ~%95 doğrudur ama: boya akıntıları **yukarı** doğrudur; ton kaymıştır (kan kırmızısı vs. tuğla kırmızısı); köşelerde el titremesi yoktur — insan dışı düzgünlük. **Tutorial'da anlatılmaz** — topluluğun tell listesi tartışması bedava pazarlamadır. (Tell'ler ayrıca soft-fail çarpıtmalarını tespit edilebilir kılar, §6.1.)

**3. perde karşılaşma sahnesi [MVP]:** Merkez'de, tek sefer: sırtı dönük bir figür duvara oyuncunun çıkışını DOĞRU çizmektedir — ilk ve son dürüst işareti. Yaklaşınca figür sisle dağılır; işaret kalır. Kimliği (kıdemli ortak) Kırık belgeleriyle bu ana kadar örülmüş olur.

Davranış bayrakları (küsme/öfke) launch sonrasıdır (§17).

---

## 6. Fail State ve Kayıt

### 6.1 Yeniden Emilme — soft fail [MVP]

Ölüm yoktur; ceza **bilgi kaybı değil, şüphe enjeksiyonudur**.

**Tetik koşulları (v2.0 — sadeleşti):** yalnız iki tetik vardır: (1) derin alanda **uzun süre işaretsiz-yönsüz dolanma**, (2) **Watcher'a tekrarlı aşırı yaklaşma**. (Anomali-alanında-kalma tetiği kesildi — anomaliler artık tek bölgede.) Baskı arttıkça uyarı diegetiktir: görüntü-ses bozulması.

**Sonuç:** ekran sisle dolar; oyuncu son Kırık'ta uyanır — ve o bölgedeki işaretlerinin bir kısmı Çizer tarafından değiştirilmiştir.

**Doz kuralları (A5 — sayısal, kesin, aynen geçerli):**
- Fail başına **en fazla 2–3 işaret** değiştirilir; **yalnızca fail olunan bölgede**.
- **Dokunulmazlar:** sembol-kapı çözümü işaretleri, Kırık'ların **10 m** çevresi.
- Değişiklik silme değil **ÇARPITMADIR** (ok **10–20°** dönmüş, X'e çevrilmiş) ve **her zaman Çizer tell'i taşır** — tespit edilip düzeltilebilir.
- **İlk soft-fail scripted'dır:** tek işaret değişir; tell öğretme anı olarak sahnelenir.
- Art arda faillerde değiştirilen işaret sayısı **ARTMAZ**; tekrar cezası görüntü/ses bozulmasına kayar.

[Kesildi — Ek B]: can barı, sanity barı, her tür HUD göstergesi.

### 6.2 Diegetik checkpoint'ler — Kırık zinciri [MVP]

Kayıt noktası = Gerçeklik Kırığı: arabaya oturmak / ahizeyi kaldırmak **kayıt + soft-fail dönüş noktasıdır**. Kırık tek varlıkta üç işlev taşır: dinlenme odası (aydınlık, sissiz — korku ritminin nefesi) + landmark + kayıt. Her Kırık'ta tek "çalışan" şey (cızırtılı telsiz, çalan telefon) atmosferin çekirdeğidir — tamamen ölü mekânda tek çalışan şey, hepsinden tekinsizdir.

**Zincir (4 checkpoint + final odası):**

| # | Kırık | Bölge | Not |
|---|---|---|---|
| 1 | **Devriye arabası** | Enkaz | Tutorial checkpoint; zimmet iadesi |
| 2 | **Telefon kulübesi** | 2a | Yapılmamış ihbar |
| 3 | **Arşiv köşesi** | 2b | Sahte tutanağın rafı |
| 4 | **Eşik** | Merkez girişi | Mini-Kırık: **final öncesi otomatik kayıt + Merkez'in soft-fail dönüş noktası + 2. Ruh Çarpışması sahnesi** aynı mekânda |
| — | Çocuk odası | Merkez çekirdeği | **Kayıt yoktur — bilinçli**; final kararı burada verilir |

### 6.3 Kayıt politikası

- **Tek kayıt profili**; kayıt = Kırık checkpoint'leri.
- İstenen anda **"çıkış kaydı"** (exit save): tek kullanımlıktır, yüklenince silinir — save-scumming'i önler.
- **Son tekrar görme akışı:** final kararından hemen önce oyun Eşik'te otomatik kayıt alır; krediler sonrası "Eşiğe dön" seçeneğiyle diğer son görülebilir. NG+ olmadan iki sonun erişilebilirliği bu tek checkpoint ile sağlanır; final varyantı her denemede o anki kovaya göre hesaplanır.
- Kayıt verisi: darbe listesi + sicil + açılan kapılar; kilobaytlar mertebesinde (§12.5).

### 6.4 HUD yok ilkesi

Ekranda hiçbir kalıcı gösterge yoktur. Sağlık/korku/yön bilgisi; pusula, boya yaşı, görüntü-ses bozulması ve Watcher mesafesiyle diegetik iletilir. Erişilebilirlik eşlenikleri (§11.3) isteğe bağlı katmandır; varsayılan deneyim temiz ekrandır.

---

## 7. Seviye Tasarımı

### 7.1 Lynch modeli kuralları

Kevin Lynch'in beş öğesi (yol/kenar/bölge/düğüm/landmark) labirentin makro dilidir. **Bağlayıcı kurallar** ("kaybolmak eğlenceli, çaresizlik değil"):

1. **60 saniye kuralı:** her kavşaktan sis mesafesi içinde en az BİR yön ipucu görünür. **60 saniyeden uzun, ayırt edici öğesiz koridor = hatalı koridordur** ve düzeltilir.
2. **Üç katmanlı oryantasyon:** (i) global landmark — sisin üstünden seçilen **uzak kule silueti** (pusulanın "kuzeyi"); (ii) bölgesel kimlik (renk/ses/mimari); (iii) yerel işaretler (oyuncunun boyası). Bir katman kaybolunca diğer ikisi tutar.
3. **%70 döngü / %30 ölü uç:** döngüler "burası demin geçtiğim yer!" anını üretir. **Her ölü uç ödemelidir**: Kırık, sembol, lore veya manzara.
4. **Kısayol açılımı (metroidvania-lite):** derinden başlangıca tek yönlü kapılar; geri yürüme angaryasını keser.
5. **Görüş hattı tacizi:** ulaşılamayan landmark ızgara/delik ardından gösterilir; sis mesafesi, sonraki karar noktası YARI görünür olacak şekilde ayarlanır.
6. **Adil kaybettirme:** harita mantığı asla kırılmaz — **SON BÖLGE HARİÇ**. Kural oyunun büyük bölümünde geçerli olduğu için finalde kırılması dehşet verir.

### 7.2 Üretim akışı: el yapımı + modüler kit

**Runtime prosedürel üretim YOKTUR.** Makro plan elle tasarlanır; koridor dolgusu **6–8 parçalık modüler beton prefab kiti** + editör içi yarı-otomatik yerleştirme aracıyla üretilir. Kit disiplini: **bölge başına en çok 1–2 hero asset** kit dışına çıkabilir. Tek istisna: Merkez'in scripted kural kırılmaları (§7.6).

### 7.3 Bölge tablosu

| # | Bölge | Süre | Lore | Ambiyans kimliği | Tanıtılan | Çizer | Kırık | Sembol-kapı |
|---|---|---|---|---|---|---|---|---|
| 1 | **Enkaz** | ~10–15 dk | Beton | Soğuyan motor tıkırtısı, cam kırığı, cızırtılı telsiz | Sprey, silme, pusula, ilk Kırık | — | Devriye arabası | 1 (öğretim) |
| 2a | **Sığlık** | ~35–45 dk (2a+2b toplam; arada **10–15 dk sessizlik beat'i**) | Beton | Uzak rüzgâr, geniş beton uğultusu | Landmark okuma, boya yaşlanması; **1. Ruh Çarpışması** | **P1** | Telefon kulübesi | 1 (2a→2b) |
| 2b | **Derin Sığlık** | (üstte) | Taş→Duat izleri | Damla, metal inilti, derin yankı | **Pusula anomalileri**, kronoloji-lite belgeleri, **düşey set-piece** | **P2** | Arşiv köşesi | 1 (2b→Merkez) |
| 3 | **Haritalanamayan Merkez** | ~25–35 dk | Girit | Sessizliğe inen katmanlar; kalp atışı gibi uzak tok vuruş; finalde ninni motifi | Kural kırılmaları; **Eşik** (2. Ruh Çarpışması); final kararı | **P3** | Eşik (mini-Kırık); çocuk odası kayıtsız | — (kapı değil, karar) |

- **Toplam:** ~70–95 dk bölge omurgası + kronoloji-lite (+~15–20 dk) + 1 opsiyonel ödüllü döngü (+~10 dk) = **1,5–2 saat**. **Süreyi doldurmak için backtracking eklemek YASAKTIR.**
- Kritik yol sembol-kapı toplamı: **3** (A6 "bölge başına 1" tavanı 2a/2b bölünmesiyle korunur).

**Tempo eğrisi — 5 vuruş:** öğretim (Enkaz) → güven (2a) → **sarsma** (P1) → **sessizlik** (beat) → **tırmanış** (P2) → **kural kırılması** (P3/final).

### 7.4 Bölge kısa açıklamaları

- **Enkaz:** devrilmiş devriye arabasının etrafında yoğun sisli dar enkaz koridorları. Sprey/silme/pusula/kayıt tek güvenli odada öğretilir. Çizer yoktur; Watcher yalnız son anda tek uzak siluet olarak görülür.
- **Sığlık (2a):** cömert landmark'lı, düşük sisli geniş gri avlular — oyuncuya "sistemim çalışıyor" güveni verilir; Çizer P1 tam bu güvenin üstüne gelir. **Dar servis koridorundan katedral avluya çıkış kontrastı en az bir kez burada sahnelenir** (§9.5). Opsiyonel ödüllü döngü: çevre galerisi (lore + kestirme açılımı).
- **Sessizlik beat'i (2a→2b):** 10–15 dk; Çizer tamamen susar, ambiyans incelir — v1.1'deki ara-bölge nefesinin mini hali. Sarsıntı sonrası nefes, tırmanış öncesi gerilim.
- **Derin Sığlık (2b):** aynı prefab kiti, ayrı palet/ambiyans kimliği: Duat tonları (tabut mavisi + toprak sarısı) betona sızar. İlk manyetik ölü noktalar burada; pusulanın "yanlış ama tutarlı" davranışı keşfedilir. Kronoloji-lite belge yoğunluğu en yüksek bölge. **İki Yol Kitabı diyagramı tek hero-duvar** olarak buradadır. **Tek düşey set-piece** (bir çukur/üst geçit anı — bölge değil, "an"; hero asset bütçesinden): siste aşağı bakmak ileri bakmaktan tekinsizdir.
- **Haritalanamayan Merkez:** aşağıda.

### 7.5 Sabotaj dönüşüm kuralı

Bağlayıcı kural: **manyetik ölü nokta ile Çizer sahte işareti aynı mekân parçasında AYNI ANDA devrede olamaz.** Araçlar tek tek, dönüşümlü sabote edilir; üç oryantasyon katmanından en az ikisi her an ayaktadır.

### 7.6 Haritalanamayan Merkez — kural kırılmaları

Son bölge, oyunun kurduğu sözleşmeyi bilinçli bozar (**yalnızca burada** — §7.1 kural 6):

- **Hafif runtime karıştırma:** arkadan kapanan geçitler, dönülünce değişen kavşaklar, imkânsız geometri (scripted numaralar; prosedürel üretim değil).
- Pusula anlamsızlaşır (iğne yavaşça oyuncunun arkasını gösterir); global landmark görünmez olur; **tek rehber işaretlerdir** — oyuncunun ve Çizer'in.
- Çizer P3 öngörüleri ve 3. perde karşılaşma sahnesi buradadır.
- Girişte **Eşik** mini-Kırık'ı: otomatik kayıt + soft-fail dönüş noktası + 2. Ruh Çarpışması (§6.2).
- Merkezin çekirdeği: **çocuk odası** — sıva dökülür, Knossos kırmızısı fresk parçaları; Asterion'un çocukluk çizimleri. Final kararı (hüküm hanesi) burada verilir; kayıt yoktur.
- Bu bölgenin scripted kural kırılmaları **Ay 1–2'de prototiplenir** — en belirsiz iş ilk çeyrekte (§13.3).

---

## 8. Anlatı Sunumu

### 8.1 Ortam anlatımı ilkeleri

Sesli anlatım, NPC, flashback, uzun ara sahne **[Kesildi — Ek B]**. Hikâye üç kanaldan akar: mekân (yutulmuş parçalar), belge (Kırık'lardaki kâğıtlar — tarih damgalı, kısa), duvar (üç katmanlı yazı sistemi). Az metin ilkesi: oyuncu karakteri susar; oyun da gevezelik etmez.

### 8.2 Duvar yazısının üç katmanı

| Katman | Kaynak | Nitelik |
|---|---|---|
| Kurban grafitileri | Önceki yutulanlar | Ham, okunur, **güvenilmez** (çaresizlik arşivi) |
| Çizer işaretleri | Kıdemli ortak | Oyuncuyla **aynı dil**, güvenilmez; tell'lerle ayırt edilir |
| Dosya damgaları | Labirent'in kayıt sistemi | Evrimleşmiş hiyeroglif; güvenilir ama öğrenilmesi gerekir |

### 8.3 Dosya damgası sistemi — damga-lite [MVP]

Her vaka 3–4 sembollük damgayla kayıtlıdır: **mekân + suç + tanık sayısı + hüküm boşluğu**. "Hüküm" hanesi hep boştur — final, oyuncunun kendi damgasındaki boşluğu doldurmasıdır (ya da bırakmasıdır). Fez/Tunic okulu: sözlük verilmez, tekrarla öğrenilir.

Damgalar yalnızca **ana vaka Kırıklarında** görülür; "Tüy" sonu damga sistemine bağımlı olduğu için bu alt küme MVP'dedir. Tam üç katmanlı sözlük launch sonrasıdır (§17).

### 8.4 Kronoloji-lite bulmacası [MVP]

Ana vakanın **3 belgesi** — **ihbar kaydı, sahte kaza tutanağı, kapanış yazısı** — Kırıklarda **sırasız** bulunur; hepsi aynı geceye damgalıdır. Oyuncu zaman çizgisini zihninde kurar — envanter/günlük ekranı yoktur; belgeler yerinde okunur, damga tarihleri anahtardır. Tek zincir, yeni sistem gerektirmez; mevcut Kırık varlıklarını kullanır.

---

## 9. Sanat Yönü

### 9.1 PSX teknikleri [MVP]

Vertex snapping, affine texture mapping, Gouraud shading, düşük renk derinliği + dithering, düşük çözünürlük render target, 128px doku bütçesi. **Godot 4 hazır PSX görsel eklentisi temel alınır; sıfırdan shader yazılmaz.** Düşük çözünürlük belirsizlik üretir → beynin boşluk doldurması korku bütçesine bedava katkıdır. Vertex-wobble kapatılabilir (§11.3).

### 9.2 Sis [MVP]

**40–80 m** aralığına kilitli mesafe sisi — üçlü kazanç: estetik (PSX meşruiyeti), performans (draw distance tavanı), tasarım (görüş hattı tacizi aracı). Bölge başına ayrı sis rengi/yoğunluğu kimliğin parçasıdır. Kırıklar **sissiz ve aydınlıktır** — korku ritmi nefesle kurulur.

### 9.3 Paletler (3 palet + Merkez vurgusu)

| Bölge | Palet | Not |
|---|---|---|
| Enkaz | Gece grisi + polis lambası kırmızı-mavisi | Tek renkli ışık kaynağı: araba |
| Sığlık (2a) | Açık gri beton, süt beyazı sis | En "temiz" bölge — güven inşası |
| Derin Sığlık (2b) | Duat tonları: tabut içi mavisi + toprak sarısı betona sızar | Sessizlik beat'i boyunca geçiş kademelidir |
| Merkez | Kırık sıva beyazı + Knossos kırmızısı fresk | Ayrı palet sayılmaz; 2b paletinin üzerine tek vurgu — renk oyunda ilk kez "sıcak" |

**Kırık dressing'i 4 noktadır** (araba, telefon kulübesi, arşiv köşesi, Eşik) + çocuk odası final seti; dressing bütçesi bu noktalara yoğunlaşır.

### 9.4 Watcher / Çizer görsel tasarımı

- **Watcher:** tek model + sis LOD. Uzaktan insansı siluet; tek morph parametresi (boynuz gölgesi ölçeği) sicil kovasına bağlı (§5.1). Detay asla net görülmez; yüz finalde ("Tüy") bir kez netleşir.
- **Çizer:** neredeyse hiç render edilmez; işaretleri onun bedenidir. Tek görünüm: P3 sırtı dönük sahne — kapüşonlu, 90'lar devriye montunu andıran siluet.

### 9.5 Devasalığın satılması

Devasalık **siluet + ses + ölçek kontrastıyla** satılır; **draw distance ile DEĞİL** (sis 40–80 m kilidi ihlal edilmez). Araçlar: dar servis koridorundan katedral avluya çıkış (2a'da en az bir kez sahnelenir); sis üstünden seçilen kule silueti; yankı kuyruğunun uzunluğu; **2b'nin düşey set-piece'inde kot farkından aşağı bakış**.

---

## 10. Ses Tasarımı

### 10.1 Bölge ambiyansları [MVP]

Her bölgenin ambiyans kimliği bölge tablosundadır (§7.3). İlke: ambiyans, üçüncü oryantasyon katmanıdır — gözler sisle kör edildiğinde kulak yön bulur. **Hazır SFX kütüphaneleri temel alınır**; özel kayıt yalnız imza sesler için yapılır.

### 10.2 Olasılıksal tek-sesler [MVP]

Dönen ambiyans loop'ları yerine **olasılıksal tek-sesler**: damla, metal inilti, uzak rüzgâr vuruşu — rastgele aralıklarla, 3D konumlu. "Törpüleyici ses döngüsü" şikâyetine doğrudan önlem; yapım maliyeti düşük (kısa örnekler + zamanlayıcı).

### 10.3 Watcher / Çizer ses imzaları [MVP]

- **Watcher:** belirişinde alçak, bas ağırlıklı "basınç" tonu; kova değişiminde kısa ayırt edici imza. Ayak sesi yoktur — o yürümez, belirir.
- **Çizer:** hiçbir zaman görülmez ama **duyulur**: uzak koridordan sprey tıkırtısı ve püskürtme hışırtısı — oyuncu kendi çizmediği anlarda. P3'te bu ses oyuncunun sırtından gelir.

### 10.4 Ruh Çarpışması sesi [MVP]

Tok, tek vuruşluk gövde sesi, yönlü (3D). İki scripted sahnede (§4.6) ve sembol-kapı is lekesi ipuçlarında kullanılır.

### 10.5 Minimal müzik politikası [MVP]

Skorlu müzik yalnızca **Kırık anlarında** (1–2 kısa, kırılgan motif — tek enstrüman) ve **finalde** çalar. Koridorlar müziksizdir: sessizlik, devasalığın ses tasarımıdır. Merkez'in **ninni motifi** oyunun tek melodik temasıdır ve final varyantlarında farklı armonize edilir. **Müzik dış kaynaktır (veya hazır lisans); sözleşme en geç Ay 3'te bağlanır** (§13.3) — solo geliştirici müzik yazmaz.

---

## 11. UI/UX ve Erişilebilirlik

### 11.1 Diegetik-öncelik ilkesi

Oynanış ekranında sıfır UI. Pusula eldedir (Q), renk seçimi elde görünen sprey kutusunun rengiyle onaylanır, boya yaşı dokuyla okunur, tehdit görüntü-ses bozulmasıyla iletilir. Menü dışında hiçbir 2D katman render edilmez.

### 11.2 Menüler

Ana menü (Devam / Yeni / Seçenekler / Çıkış) + seçenekler (görüntü, ses, kontroller, erişilebilirlik) + **tek kayıt profili**. Kayıt = Kırık checkpoint'leri + tek kullanımlık çıkış kaydı (§6.3).

### 11.3 Erişilebilirlik matrisi [MVP — kesilmez]

Ucuz ve inceleme/itibar açısından kritiktir; solo kapsamda da aynen kalır.

| İhtiyaç | Özellik |
|---|---|
| Renk körlüğü | 4 renk **CB-güvenli paletten**; her renge ikincil kod (doku deseni / sembol ucu) — renk hiçbir bilginin tek taşıyıcısı değildir |
| Hareket hastalığı | Vertex-wobble kapatma, FOV ayarı, head-bob ayarı/kapatma |
| Motor beceri | Shape-match **çizim yardımı (snap)**; basılı tutma yerine aç/kapa sprey modu |
| Fotosensitivite | Flicker azaltma seçeneği + içerik uyarısı |
| İşitme | Ses ipuçlarının görsel eşlenikleri: altyazı + ekran kenarı yön imleri (isteğe bağlı; varsayılan kapalı) |

---

## 12. Teknik Tasarım

### 12.1 Godot 4 mimarisi

- Godot 4.x; **Compatibility/Mobile renderer tercih edilir** (PSX estetiği düşük uçta avantaj); ilk sprintte iki renderer kısa karşılaştırmayla doğrulanır.
- Hazır PSX görsel eklentisi temel; üstüne Çizer tell shader'ı (yukarı akıntı, ton kayması) eklenir.
- Sahne yapısı: bölge = sahne; hücreler alt sahneler; global sistemler (sicil, yalnızlık sayacı, Çizer yöneticisi, kayıt) autoload singleton'ları.

### 12.2 Decal-instance boyama sistemi [MVP]

- Her fırça darbesi = yüzeye hizalı **projected decal instance**; darbeler spline-nokta listesi olarak tutulur.
- **Bölge başına darbe tavanı ~1000** (daha az bölge, daha yoğun kullanım); tavana yaklaşınca **en eski darbeler solmaya başlar** — boya yaşlanmasıyla diegetik örtüşür: teknik sınır kurgu olarak hissedilir.
- Sistem **renk-agnostik** yazılır; palet 6 renge ölçeklenebilir (geri dönüş ≈ 1–2 gün; §14.2 A/B).
- Çizer işaretleri **aynı sistemde ayrı katman/bayrakla** tutulur (silinemez bayrağı, tell shader'ı).
- Mesh-paint/render-target araştırması launch sonrasıdır; decal ihtiyacın %90'ını karşılar.

### 12.3 Stroke-replay (Çizer P3 tekniği) [MVP]

- Oyuncunun kaydedilmiş darbe spline'ları hafif sınıflandırılır: **~10–15 şablon sınıfı** (shape-matching kodu sembol-kapıdan zaten mevcut) + stil parametreleri (baskın renk, darbe boyu/hızı, titreme genliği).
- P3 öngörüsü = oyuncunun **kendi spline'ının**, gitmediği koridordaki elle yerleştirilmiş aday noktaya yeniden projekte edilip **replay** edilmesi + Çizer tell shader'ı.
- **ML yok; P3'te jenerik hazır işaret yok** (P1'de 8–10 varyant var). Tahmini iş: 1,5–2 hafta; **Ay 1–2 dikey diliminin parçasıdır** (§13.3) — en belirsiz işler ilk çeyrekte.

### 12.4 Hücre streaming + portal culling [MVP]

Sis 40–80 m'ye kilitli olduğundan çekim mesafesi sınırlıdır; bölgeler hücre bazlı stream edilir, iç mekânlar portal culling ile ayrılır. **Tuzak uyarısı:** devasa avlularda sis mesafesini artırma hevesine direnilir (§9.5).

### 12.5 Kayıt serializasyonu [MVP]

Kayıt = darbe listesi (pozisyon, normal, renk, boyut, yaş) + sicil + açılan kapılar + aktif checkpoint. Tamamı **kilobaytlar** mertebesinde; bulut kaydı sorunsuz.

### 12.6 Performans hedefleri

- **1080p / 60 fps** orta seviye donanımda.
- **Steam Deck: uyumlu hedeflenir** (Steam Input eşlemesi + snap varsayılanı + okunabilir metin boyutu); **resmi Deck doğrulaması launch sonrasıdır** (§17).

### 12.7 Lokalizasyon mimarisi [MVP]

- **Baştan string tablosu**; hiçbir metin koda gömülmez.
- **Duvar yazıları doku değil decal/metin olarak** render edilir — çeviride asset yeniden üretimi gerekmez.
- Diller: **EN + TR launch'ta**; ek diller launch sonrasıdır (§17) — mimari hazırdır.
- Dosya damgaları semboliktir (çeviri gerektirmez).

---

## 13. Kapsam ve Üretim

### 13.1 MVP tablosu (launch kapsamı)

Launch kapsamı = aşağıdaki [MVP] seti. Ertelenenler §17'de, kalıcı kesikler Ek B'dedir; **iki liste karıştırılmaz.**

| Özellik | Etiket |
|---|---|
| Sprey (sınırsız, 4 renk, fırça boyu, decal, yaşlanma) | [MVP] |
| Silme yalnız kendi boyada + Çizer müdahale tablosu | [MVP] |
| Sembol-kilit kapılar (**3 adet**, %70 tolerans, A6 kuralları) | [MVP] |
| Pusula + anomali=Kırık davranışı | [MVP] |
| Ruh Çarpışmaları (**2 scripted sahne**) + sembol-kapı is lekesi ipuçları | [MVP] |
| Watcher: yalnızlık sayacı + sicil (3 sinyal / 2 kova) + spawn koreografisi + iz bırakma | [MVP] |
| Çizer: 3 perde + tell'ler + stroke-replay P3 + karşılaşma sahnesi | [MVP] |
| Yeniden Emilme (A5 dozları) + Kırık zinciri (4 checkpoint + Eşik) + exit save | [MVP] |
| 3 bölge (Enkaz, 2a/2b, Merkez) + sessizlik beat'i + Merkez kural kırılmaları | [MVP] |
| 2b düşey set-piece + İki Yol Kitabı hero-duvarı | [MVP] |
| Gamepad temel Steam Input eşlemesi (snap varsayılan açık) | [MVP] |
| Kronoloji-lite (3 belge) + damga-lite | [MVP] |
| 2 son (Tüy, Ağır Kalp) + "Eşiğe dön" akışı | [MVP] |
| Erişilebilirlik matrisi | [MVP] |
| Lokalizasyon EN + TR (string tablosu mimarisi) | [MVP] |
| 1 opsiyonel ödüllü döngü (2a çevre galerisi) | [MVP — ilk kesim adayı] |

### 13.2 Ekip, takvim ve efor tablosu

**1 kişi (solo geliştirici), tam zamanlı. 9 ay hedef / 12 ay taahhüt.** Ses/müzik dış kaynak; diğer her şey tek kişide. Bağımsız denetimin iş kalemi efor tahmini aynen esas alınır:

| İş kalemi | Efor (hafta) |
|---|---|
| Motor kurulum + PSX eklenti + renderer doğrulaması | 1 |
| Decal boyama sistemi (yaşlanma, tavan, katmanlar) | 2,5–3 |
| Shape-matching + snap + sembol-kapı akışı | 2 |
| Stroke-replay (P3) | 1,5–2 |
| Pusula + anomali davranışı | 1 |
| Watcher (sayaç, sicil, spawn, iz) | 2 |
| Çizer yöneticisi (P1/P2 yerleşim, tell shader) | 2 |
| Soft-fail + checkpoint zinciri + Eşik | 1,5 |
| Menü / erişilebilirlik / string tablosu | 2 |
| Gamepad temel eşleme | 1 |
| **Sistemler ara toplam** | **~16–17** |
| Level design + graybox (3 bölge + Merkez numaraları) | 6–7 |
| Art pass (kit, paletler, hero'lar, Kırık dressing) | 8–10 |
| Ses (kütüphane entegrasyonu + imzalar + miks) | 2,5–3 |
| Anlatı içeriği (belgeler, duvar yazıları, damgalar) | 1,5 |
| Demo / Next Fest hazırlığı | 1,5 |
| Playtest + cila döngüleri | 5–6 |
| Pazarlama (toplamda) | 3–4 |
| %15 tampon | 5 |
| **TOPLAM** | **~50–55 hafta ≈ 9–12 ay** |

### 13.3 Milestone planı

| Dönem | İçerik |
|---|---|
| **Ay 1–2** | Kurulum + decal boyama + shape-match + **stroke-replay** dikey dilimi (en belirsiz işler ilk çeyrekte) + **Merkez kural-kırılma prototipi** |
| **Ay 3–4** | Enkaz + Sığlık (2a/2b) graybox; Watcher; Çizer P1–P2; soft-fail. **Steam sayfası + capsule Ay 3'te açılır. Müzik dış kaynak sözleşmesi en geç Ay 3. Ay 3 sonunda ilk dış playtest (graybox, 5–8 dış testçi)** |
| **Ay 5** | Merkez + P3 + 2 son → **content-complete (graybox)** |
| **Ay 6–8** | **Art pass (zaman kutulu, 8–10 hafta sabit)** + ses + demo/Next Fest. Demo ayrı iş değil, dikey dilimin kendisidir |
| **Ay 9–12** | Playtest/telemetri, cila, lokalizasyon, launch |

**Art pass kuralları:** zaman kutusu aşılmaz; **kit-first, hero-last**; **önce TEK bölge (2a) hedef kaliteye cilalanır, kalite çıtası oraya kalibre edilir**, diğer bölgeler o çıtaya çekilir. Çıta zamana sığmıyorsa çıta düşürülür, kutu genişletilmez.

**Pazarlama ritmi:** takvim launch tarihinden değil, **uygun Next Fest'ten geriye kurulur**. Ay 4'ten itibaren **haftalık %10–15 sabit pazarlama dilimi** (devlog, klip, wishlist bakımı). Hedefler: **Next Fest öncesi 2.000 wishlist; launch 5.000+**.

### 13.4 Kesim sırası (sıkışma planı)

Sıkışma halinde kesim şu sırayla yapılır:

1. Opsiyonel ödüllü döngü
2. 2. Ruh Çarpışması sahnesi
3. Kronoloji-lite'ın 3. belgesi
4. 2b düşey set-piece
5. Soft-fail işaret çarpıtması (yalnız görüntü/ses cezasına düşürülür) — **geç aday: tema taşıyıcısıdır**
6. Sicil (yalnız final seçimi kalır) — **son çare: ~2–3 günlük iştir ve yargı temasının mekanik bedenidir**

Sicil ve çarpıtma "ilk kesilecekler" DEĞİLDİR.

### 13.5 Kapsam disiplin kuralları

- **Launch sonrası içerik (§17) launch'tan önce TASARLANMAZ ve PROTOTİPLENMEZ** — yalnız liste olarak yaşar.
- Modüler kit disiplini: 6–8 prefab dışına bölge başına en çok 1–2 hero asset.
- Merkez'in scripted kural kırılmaları ve stroke-replay Ay 1–2'de prototiplenir.
- Süre doldurma amaçlı backtracking yasaktır.
- Kesim kararı verilirken §13.4 sırası dışına çıkılmaz; her kesim Ek A formatında günlüğe işlenir.

---

## 14. Playtest ve Telemetri

### 14.1 Ölçülecek metrikler

- **Kaybolma süresi:** landmark/işaret etkileşimi olmadan geçen süre dağılımı (bölge bazında).
- **Kapı deneme sayısı:** sembol-kapı başına başarısız çizim adedi ve pes etme oranı.
- **Girdi türü kırılımı:** kapı deneme/pes verileri klavye-fare ile gamepad için ayrı izlenir (snap varsayılanının yeterliliği bu veriyle doğrulanır).
- **Soft-fail sıklığı** ve fail sonrası oturum terki.
- **Bölge tamamlama süreleri** (medyan ve %10–%90 aralığı) ve **toplam bitirme süresi**.
- Kırık kanıt etkileşimi tamamlama oranı; son dağılımı.

Playtest **Ay 3 sonunda graybox'la başlar (5–8 dış testçi)**: shape-match toleransı, kaybolma süresi ve tell fark edilirliği erken veri ister; art pass beklenmez.

### 14.2 Karara bağlı hipotezler

| Hipotez | Test | Karar eşiği |
|---|---|---|
| **Medyan bitirme süresi ≥ 100 dk** (Steam 2 saatlik iade penceresi + "eksik" algısına karşı) | Tamamlama süresi medyanı | Medyan < 100 dk ise opsiyonel döngü içeriği genişletilir; **backtracking eklenmez** |
| 4 renk yeterli | Renk sayısı **A/B (4 vs 6)**; mimari hazır | Oyuncular 6 renkte anlamlı ek notasyon geliştiriyorsa 6'ya dönülür (maliyet 1–2 gün) |
| %70 shape-match toleransı doğru | Kapı deneme sayısı + pes oranı | Medyan deneme > 4 veya pes > %5 ise tolerans gevşetilir / ipucu N'i düşürülür |
| Snap, gamepad hassasiyet farkını kapatıyor | Girdi türü kırılımı | Gamepad pes oranı klavyenin belirgin üstündeyse snap agresifleştirilir; tolerans girdi türüne göre AYRIŞTIRILMAZ |
| Kaybolma "eğlenceli", çaresizlik değil | Kaybolma süresi dağılımı + anket | Uzun kuyruk büyükse 60 sn kuralı ihlalleri taranır, landmark yoğunluğu artırılır |
| Soft-fail "emeğim çöpe gitti" hissi üretmiyor | Fail sonrası oturum terki + anket | Terk artıyorsa A5 dozu aşağı çekilir (2–3 → 1–2 işaret) |

---

## 15. Pazarlama Planı (kısa)

- **Fiyat: $5.99.** Exit 8 ($3.99) / Complex: Found Footage ($4.99) bandının kanıtladığı "kısa + ucuz + net USP" konumu; $4.99 bilinçli reddedildi — klon bandı sinyal hatası (§2.2).
- **Demo:** **2a kesiti + bir manyetik ölü nokta + bir sembol-kapı; Çizer'in oyuncunun işaretini taklit ettiği İLK anla biter** → cliffhanger + wishlist CTA.
- **Next Fest:** demo, Next Fest'ten **~3 hafta önce** yayında (wishlist'lerin %68–88'i demoyu indirmeyenlerden gelir; demo oynayanların dönüşümü %18–25). Takvim Next Fest'ten geriye kurulur (§13.3).
- **Steam sayfası + capsule Ay 3'te**; Ay 4'ten itibaren haftalık %10–15 pazarlama dilimi.
- **Wishlist hedefleri: 2.000 (Next Fest öncesi) / 5.000+ (launch).**
- **Haunted PS1 Demo Disc** başvurusu + korku showcase'leri.
- **Fragman kuralı:** ilk 10 saniyede Çizer taklit anı; estetik değil mekanik satılır.
- **İçerik uyarısı** mağaza sayfasında: kayıp kişi / polis örtbası temaları; "jumpscare içermez" güvencesiyle birlikte.
- Final isim + capsule art Steam sayfası açılışından önce kesinleşir (§0).

---

## 16. Riskler ve Azaltımlar (solo bağlam)

| # | Risk | Azaltım |
|---|---|---|
| 1 | **Solo kırılganlık / tükenmişlik** — tek kişi hastalanır, motivasyon düşer, tek bakış açısı kör noktalar üretir | **%15 tampon takvimde ayrılmıştır (5 hafta); 9 ay hedef / 12 ay taahhüt makası açık tutulur**; art pass zaman kutuludur — kalite çıtası zamana uyarlanır, tersi değil; kesim sırası (§13.4) önceden yazılıdır — kriz anında karar yükü yoktur; haftalık pazarlama dilimi üretim monotonluğunu kırar; dış playtest Ay 3'te başlar — kör nokta panzehiri; ses/müzik dış kaynağı erken sözleşmeye bağlanır |
| 2 | **"Bir liminal oyun daha" algısı** | "Backrooms" kelime yasağı; USP fragmanın ilk 10 sn'sinde; brütalist devasalık kimliği; PSX'e değil mekaniğe yaslanan iletişim |
| 3 | **"Sinir bozucu kaybolma" incelemeleri** | Sabotaj dönüşüm kuralı (§7.5); üç katmanlı oryantasyon; 60 sn kuralı; A5 doz tavanları; kaybolma süresi telemetrisi |
| 4 | **Fiyat-süre cezası** ("X saat / Y dolar" inceleme kalıbı) | $5.99 + 1,5–2 saat = kanıtlanmış bant (§2.2); **medyan ≥ 100 dk hipotezi** iade penceresi riskini ölçer (§14.2); süre boşluğu kronoloji-lite ve opsiyonel döngüyle kapatılır, backtracking'le değil |
| 5 | **Sembol-kapı sürtünmesi** — "bulmacasız saf atmosfer" bekleyen kitleyle çatışma | A6 tavanı (bölgede 1, toplam 3, ≤2–3 dk, cezasız deneme, N=3 ipucu, snap); demoya bir kapı konarak kitlenin kendini filtrelemesi; tolerans hipotezi (§14.2) |
| 6 | **Merkez kural kırılmalarının teknik belirsizliği** | Ay 1–2 prototipi (stroke-replay ile birlikte ilk çeyrekte); prototip başarısızsa numara seti sadeleştirilir — bölge kesilmez |
| 7 | **Kapsam sürünmesi (solo'da ölümcül)** | §13.5 disiplin kuralları; §17 içeriği launch öncesi tasarlanmaz/prototiplenmez; her ekleme dört sütun + takvim testinden geçer |

İkincil izleme: soft-fail rage-quit (A5 + §14.2), PSX trend yorgunluğu (risk 2 ile aynı hat), sicil okunmazlığı (3 sinyal / 2 kova sadeliği + kova değişiminde tek okunur tepki).

---

## 17. Launch Sonrası Genişleme Yol Haritası

Bu bölüm **ertelenenleri** listeler — tasarım gereği reddedilenler değildir (onlar Ek B'dedir; iki liste karıştırılmaz). **Bağlayıcı kural: buradaki hiçbir içerik launch'tan önce tasarlanmaz ve prototiplenmez; liste olarak yaşar.** Her madde: neden ertelendi + hangi altyapı şimdiden hazır.

| Genişleme | Neden ertelendi | Hazır altyapı |
|---|---|---|
| **Rezervuar bölge paketi** (düşey su bölgesi) | Tam bir dördüncü bölge solo takvimde art pass ve level design bütçesini taşırırdı. | Modüler kit + hücre streaming bölge eklemeye göre tasarlandı; düşey set-piece diliyle 2b'de deneyim kazanıldı |
| **Fosforlu 5. renk + karanlık kılcallar** | Ödül rengi, bağlı olduğu karanlık bölge tasarımıyla (Rezervuar) birlikte anlamlıdır; tek başına eklenmesi ölü içerik olurdu. | 1–6 tuş rezervi + renk-agnostik decal mimarisi; geri ekleme ≈ 1–2 gün |
| **Bekçi adlı kapılar** (Duat metin katmanı) | Ek lore-metin üretimi ve yeni kapı sahneleme işi, 3 kapılı sadeleşmiş akışın dışında kaldı. | Sembol-kapı sistemi ve damga/duvar-yazısı boru hattı metin katmanını taşıyabilir |
| **Batık Ofis Semti** | Bölgenin işlevleri (anomali öğretimi, belge yoğunluğu, sessiz nefes) 2b'ye ve sessizlik beat'ine emildi; ayrı bölge süre değil tekrar üretirdi. | Pusula anomali sistemi, kronoloji belge akışı ve iç mekân portal culling canlıda çalışıyor |
| **Üçgenleme bulmacası** | Opsiyonel bulmaca katmanı, launch'ın "tek zorunlu bulmaca" disiplinine içerik borcu ekliyordu. | Pusula doğrultu verisi + boyayla çizgi çekme mekaniği zaten mevcut |
| **İs lekesi ley hattı navigasyonu** | Labirent geneli gizli katman, ancak daha büyük harita yüzeyinde değer üretir. | Ruh Çarpışması sahne/ses varlıkları ve scripted is lekesi ipuçları canlıda |
| **Watcher bakışma mekaniği (+ pusula ürpertisi)** | Alışma sorununa cila çözümüdür; launch'ta spawn koreografisi + iz bırakma yeterli korkuyu taşır. | Yalnızlık sayacı ve spawn sistemi bakış-tepki kancasını almaya hazır |
| **Çizer davranış bayrakları (küsme/öfke)** | 2–3 bayraklık tepki sistemi, üç perdenin okunurluğunu playtest'te kanıtlamadan eklenmemeli. | Çizer yöneticisi singleton'ı ve müdahale olay kancaları (§4.3) mevcut |
| **"İp" gizli sonu (vekâlet)** | Üçüncü son, restore-etkileşimi gibi yeni fiiller ister; launch iki sonun netliğiyle çıkar. | Sonlar tek mekanik + tek sahne varyasyonu mimarisinde; Çizer'in eski dürüst işaretleri lore'da yerleşik |
| **Tam damga sözlüğü + yan vaka kronolojileri** | Metin/içerik hacmi solo anlatı bütçesinin (1,5 hafta) dışında. | Damga-lite sembol seti ve string tablosu genişlemeye açık |
| **Ek diller (ZH-Hans, JP, PT-BR...)** | Çeviri+QA maliyeti launch sonrası gelire bağlandı. | String tablosu + decal-metin duvar yazıları: asset yeniden üretimi gerekmez |
| **Steam Deck resmi doğrulaması** | Doğrulama süreci launch takvimine bağımlılık ekler; uyumluluk zaten hedeflenir. | Temel Steam Input eşlemesi, snap varsayılanı, 1080p/60 performans bütçesi |
| **Hard mode (sınırlı boya)** | Zorluk varyantı, temel dengeleme playtest'le oturmadan tasarlanamaz. | Decal sistemi darbe sayımı zaten tutuyor; sınır tek parametre |
| **Gamepad cilası (gyro ince ayar, radyal renk menüsü)** | Temel eşleme + snap launch için yeterli; cila Deck doğrulamasıyla birlikte anlamlı. | Steam Input katmanı ve yeniden atanabilir tuş mimarisi |

---

## Ek A — Karar Günlüğü

### v1.0 → v1.1 sapmaları (korunan tarihçe)

| ⚠️ | Orijinal | Yeni karar | Gerekçe | Geri dönüş yolu |
|---|---|---|---|---|
| ⚠️ **Silme mekaniği** | Sağ tık her boyayı siler (Çizer'inki dahil) | Silme **yalnızca oyuncunun kendi boyasında**; Çizer'inki farklı madde — silinemez, üzeri kapatılamaz (altından sızar). Müdahale A2 tablosuyla tanımlı | Aksi halde Çizer — USP — sağ tıkla nötralize edilen temizlik angaryasına döner; tehdit bilişsel düzlemden silinir | Decal katman bayrağı tek satırlık kontroldür; dönüş teknik olarak trivial (tasarım gereği önerilmez) |
| ⚠️ **Renk sayısı** | 6 renk, tuşlar 1–6 | 4+1 renk (v1.1); başta 4, 5. fosforlu progresyon ödülü | Oyuncular 4'ten fazla renge anlam atamıyor; "6 renk kesilmedi, playtest kanıtına ertelendi" | 1–6 tuşları rezerve, decal renk-agnostik → geri dönüş ≈ 1–2 gün; A/B testi karar verir |
| ⚠️ **Pusula anomalisi davranışı** | Ölü noktada iğne "çıldırır" (rastgele) | İğne yanlış ama **TUTARLI** şeyi gösterir: en yakın Kırık'ı | Rastgele sapma yalnız sinir bozar; tutarlı sapma öğrenene dedektör, öğrenmeyene tekinsizlik verir | Hedef Kırık yerine rastgele açı tek parametre değişikliği; "fazla okunur" çıkarsa gürültü karıştırılır |
| ⚠️ **Lore kaynağı: "Kelt ruhları"** | "Ruhlar düz çizgide uçar" tek "Kelt" etiketiyle | **Çok kültürlü sentez:** Çin ruh perdesi + İrlanda peri/ceset yolları + İskandinav Trojaborg | Saf "Kelt" atfı araştırmada doğrulanmadı; sentez "tek evrensel labirent" tezini güçlendirir | Mekanik değişmedi; yalnız metin/atıf katmanı (dönüş önerilmez: doğruluk sorunu) |
| ⚠️ **Süre iddiası** | 3–4,5 saat (taslak) | 3–4 saat (v1.1); boşluk kronoloji-lite + opsiyonel döngülerle kapatıldı; backtracking yasak | Bölge dökümü ~2,5–3 saat veriyordu; şişirilmiş iddia inceleme cezası riskiydi | Steam sayfasında süre vaadi opsiyonel; içerik büyürse yukarı revize edilebilir |

### v1.1 → v2.0 solo kapsam sapmaları

| ⚠️ | Orijinal (v1.1) | v2.0 | Gerekçe | Geri dönüş yolu |
|---|---|---|---|---|
| ⚠️ **Süre** | 3–4 saat | **1,5–2 saat** | Solo üretim bütçesi + Exit 8 / Complex FF kanıtı: kısa+net USP sulanmaz; içerik şişirmek en riskli seçenekti | Medyan < 100 dk çıkarsa opsiyonel döngü genişletilir (§14.2); Rezervuar paketi (§17) süreyi büyütür |
| ⚠️ **Fiyat** | $9.99 | **$5.99** | Fiyat-süre uyumu (Anemoiapolis dersi); $4.99 klon bandı sinyal hatası olurdu | İçerik genişlemeleriyle (§17) fiyat yukarı revize edilebilir; launch bandı sabittir |
| ⚠️ **Bölge sayısı** | 5 bölge | **3 bölge** (Sığlık 2a/2b alt bölgeli; Batık Ofis + Rezervuar ertelendi) | Level design + art pass solo'da en pahalı kalemler; Batık Ofis işlevleri 2b'ye ve sessizlik beat'ine emildi | Bölgeler §17 paketleri olarak dönebilir; kit + streaming mimarisi bölge eklemeye açık |
| ⚠️ **Renk** | 4+1 (fosforlu progresyon ödülü) | **4 sabit** | Fosforlu, kesilen karanlık bölge tasarımına bağlıydı; tek başına ölü içerik | 1–6 rezervi + renk-agnostik decal; ekleme ≈ 1–2 gün (§17) |
| ⚠️ **Sembol-kapı** | 4 kapı | **3 kapı** (öğretim, 2a→2b, 2b→Merkez) | Bölge sayısıyla orantı; A6 "bölge başına 1" tavanı 2a/2b bölünmesiyle korunur | Marjinal maliyet içerik (~1–2 gün/kapı); yeni bölge = yeni kapı |
| ⚠️ **Sicil** | 5 sinyal / 3 kova | **3 sinyal / 2 kova** (dürüst varsayılan / sahteci); "sahte damgası" fiili kalır, sicil etkisi kalkar | Az sinyal = okunur sistem + az test yüzeyi; korku türü/miktarı ilkesi aynen taşınır | Sinyal tablosuna satır eklemek ucuz; 3. kova (nötr) tek eşik parametresi |
| ⚠️ **Ekip / takvim** | 2–3 kişi, 12–18 ay | **Solo, 9 ay hedef / 12 ay taahhüt** | Oyun sahibinin kararı; kapsam bu kısıta göre yeniden kesildi, tersi değil | Gelir dış kaynak alımına izin verirse §17 paketleri ekiple hızlanır |

---

## Ek B — Kalıcı Kesikler [Kesildi]

Bu liste **tasarım gereği ASLA girmeyecekleri** içerir. Ertelenenler §17'dedir; **iki liste karıştırılmaz.**

| Kesilen | Tek cümlelik gerekçe |
|---|---|
| Jumpscare, kovalama, saldırı, Watcher pathfinding AI | Jumpscare'siz vaat markanın kendisidir; spawn koreografisi aynı korkuyu sıfır AI maliyetiyle verir. |
| Sprey kutusu / boya mermisi ekonomisi | Tehditsiz oyunda kaynak ekonomisi angaryadır; gerginlik kıtlıktan değil güvenden üretilir. |
| Şablon/stencil ve yazı tanıma | Sprey sisteminin kapsamını şişirir, notasyon özgürlüğüne bir şey katmaz. |
| Envanter ve craft | Anahtar oyuncunun kafasında taşınır; envanter "bilgi kilidi" tasarımını öldürür. |
| Harita / journal ekranı | Boya haritadır; ekran haritası core loop'un varlık sebebini iptal eder. |
| Sanity/can barı ve her tür HUD | Diegetik-öncelik sütunu; baskı görüntü-ses bozulmasıyla iletilir. |
| Pusula upgrade'leri | Araç büyüsü ilerleme hissini ucuzlatır; progresyon bilgiyle sağlanır. |
| Runtime prosedürel labirent üretimi | Homojen koridor çorbası üretir ve solo geliştirici için ayrı mühendislik projesidir; yalnız Merkez'de scripted numaralar vardır. |
| Sesli anlatım, NPC, flashback, uzun ara sahneler | Susan karakter + ortam anlatımı hem tema hem bütçe kararıdır. |
| NG+ ve zorluk seçenekleri menüsü | Sonlara erişim "Eşiğe dön" ile çözülür; zorluk matrisi dengelemeyi katlar. |
| Eğilme / tırmanma | Hareket şemasını şişirir; devasalık hız+FOV+kontrastla kurulur. |
| Mısır ikonografisinin birebir kullanımı | Beton-brutalist soyut semboller "hiçbir kültüre ait değil" tekinsizliğine uygun; temsil/telif hassasiyeti. |
| Tohono O'odham "Man in the Maze" birebir kopyası | Yaşayan halkın kutsal sembolüdür; yalnız "aynı desen her kıtada" fikri kullanılır. |
| Süre doldurma amaçlı backtracking | Açık yasak: süre boşluğu içerikle kapatılır, angaryayla değil. |
| Stamina | Devasa mekânda stamina angaryadır; koşma serbesttir. |

---

*— GDD sonu. Versiyon 2.0 — Solo Sürüm, Eylül 2026. v1.1 (geniş kapsam) git geçmişindedir.*
