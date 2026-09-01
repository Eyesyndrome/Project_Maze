# PROJECT MAZE — Oyun Tasarım Dokümanı (GDD)

---

## 0. Kapak

| | |
|---|---|
| **Çalışma adı** | Project Maze |
| **Final isim adayları** | 1) **WAYMARK** — ana mekaniği (yol işaretleme) tek kelimede satar. 2) **ASTERION** — Watcher'ın gerçek adı; "adlandırma = güç" temasıyla örtüşür. 3) **THE UNDRAWN** — Çizer'i ve "henüz çizilmemiş işaret" korkusunu ima eder. Final isim + capsule art, Steam sayfası açılışından önce kesinleşir (80–210 saat penceresi, §13.3). |
| **Tek cümlelik pitch (USP)** | "Labirentte yolunu sprey boyayla işaretliyorsun — ama içerideki bir şey senin işaretlerini taklit ediyor." |
| **Versiyon** | **3.0 — Part-Time Solo Sürüm** |
| **Tarih** | Eylül 2026 |
| **Hazırlayan notu** | Bu doküman, oyun sahibinin yeni kısıtlarına (akşam + hafta sonu part-time geliştirme, en fazla 6 ay, Godot + Blender + yoğun Claude desteği, fiyat $2–3 bandı, oynanış süresi minimum 2 saat) göre baştan yazılmıştır; v3 karar setleri (C1–C12) ve denetim revizyonları (E1–E13) işlenmiştir. **v1.1 (geniş kapsam) ve v2.0 (tam zamanlı solo) git geçmişindedir**; kesilen hiçbir fikir çöpe atılmamış, ertelenenler §17'ye taşınmıştır. Karar dili kesindir; sapmalar Ek A'dadır. Dahili dokümandır: spoiler içerir. |

---

## 1. Vizyon ve Künye

### 1.1 Elevator pitch

Emekli bir polis memuru, otuz yıl önce sustuğu bir gecenin enkazında uyanır: sisle dolu, sonsuz bir beton labirentin içinde, devrilmiş devriye arabasının yanında. Elindeki tek araç, olay yeri işaretleme spreyi ve arabanın pusulasıdır. Yolunu duvarlara boyayarak bulur — ta ki bir şey, onun işaretlerini onun el yazısıyla taklit etmeye başlayana kadar. Bu labirentten kaçılmaz; bu labirentte **yargılanılır**.

### 1.2 Künye

| Alan | Karar |
|---|---|
| Tür | Atmosferik liminal keşif / psikolojik korku (birinci şahıs) |
| Platform | **PC (Steam), klavye + fare.** Mağaza sayfası bunu açıkça yazar: "klavye + fare için tasarlandı." Steam Deck ve diğer girdi desteği §17'dedir (1. sıra); girdi mimarisi geri dönüşü günlere indirger (§12.1) |
| Motor / araçlar | **Godot 4 + Blender**; geliştirme boyunca **yoğun Claude (AI) desteği** — kurallar ve kalem bazlı hız çarpanları §18'dedir |
| Hedef süre | **Minimum 2 saat** (kesin alt sınır). Kritik yolun kendisi ≥ 120 dk tasarlanır (§7.3); **medyan bitirme hipotezi ≥ 120 dk** (§14.2) |
| Fiyat | **$2.99** (kesin; savunusu §2.2) |
| Ekip | **1 kişi — solo part-time geliştirici** (hafta içi 5 gün 08–18 mesaisi olan mühendis; geliştirme akşamları + hafta sonları). Sürdürülebilir tempo **15–16 sa/hafta**; **19–20 sa/hafta** tutturulursa takvim hızlanır |
| Takvim | **~526 saatlik plan, iki kademeli takvim (E1):** **Kademe 1 (taahhüt):** 6. ay sonunda **content-complete + baştan sona oynanabilir oyun.** **Kademe 2:** launch hedefi 6. ay; tempo ~15 sa/haftada kalırsa launch **7–8. aya kayar — bu planlı ikinci kademedir, başarısızlık değil.** Ayrıntı §13.2–13.3 |
| Hedef kitle | POOLS / The Exit 8 / The Complex serisi / Mouthwashing oyuncusu; jumpscare istemeyen, atmosfer ve ortam anlatımı seven, PSX estetiğine sıcak bakan 18+ oyuncu; korku yayıncıları ikincil kitle |
| Duygu hedefi | **Devasalık, tekinsizlik, izolasyon.** Klostrofobi değil sonsuzluk; panik değil huzursuzluk. **Jumpscare YOKTUR.** |
| İçerik uyarısı | Kayıp kişi vakası ve polis örtbası temaları (§3.9) |

### 1.3 Tasarım sütunları

Her özellik, ekleme önerisi ve kesim tartışması bu dört sütuna karşı sınanır. Bir özellik en az bir sütunu güçlendirmiyorsa GDD'ye girmez.

1. **Boya senin el yazındır.** Oyuncunun labirentteki tek kalıcı izi kendi işaretleridir; oyun bu işaretlere duyulan güveni inşa eder ve sonra sarsar. Bilgiye saldırılır, oyuncuya saldırılmaz.
2. **Devasalık, kalabalık değil.** Ölçek; siluet, ses ve kontrastla satılır. Labirent boş, sessiz ve kayıtsızdır.
3. **Her şey diegetik.** HUD yok, harita ekranı yok, sanity barı yok. Pusula eldedir, kayıt telefon ahizesidir, korku ölçer oyuncunun vicdanıdır.
4. **Labirent bir mahkemedir.** Her sistem (Watcher, Çizer, Kırıklar, sonlar) tek temaya hizmet eder: yargılanmamış suç ve susan tanık. Ton bireysel vicdandır, kurumsal suç draması değildir.

Part-time sürümün beşinci, üretim sütunu: **cila saat bütçesine uyar; dakika ve USP asla kesilmez.** Sıkışmada kesim sırası (§13.4) uygulanır ve o sıra **cila keser, oynanış dakikası kesmez**; ertelenen §17'ye yazılır ve launch öncesi tasarlanmaz.

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
| **The Complex: Found Footage** | **$4.99** | **1–2 sa** | **~%90** | **Kısa + ucuz + net konsept liminal oyun bandı kanıtlanmış** |
| The Complex: Expedition | $14.99 | 3–4 sa | %89 (~2.400) | Labirentte kaybolmaya talep var |
| Anemoiapolis Ch.1 | $8.99 | ~2 sa | %81 | Fiyat-süre uyumsuzluğu puanı %80'lere düşürür — 2 saatlik oyun $8.99 taşımaz |
| Mouthwashing | $12.99 | kısa | %95 (24.600+) | PSX + güçlü anlatı, kısa oyunu hite çevirir |
| Superliminal | $19.99 | ~3 sa | %94–95 | Anında anlaşılan "kavram" fiyatı taşır |

### 2.2 Konumlandırma ve fiyat savunusu

> **"Korkutmaz, huzursuz eder":** sisli beton sonsuzlukta diegetik navigasyon araçlarıyla kaybolma — ve o araçlara sızan bir taklitçi.

**Fiyat $2.99'dur ve kesindir (E13).** Dayanaklar:

- **2+ saat @ $2.99, fiyat-süre riskini öldürür.** "X saat / Y dolar" inceleme kalıbında Anemoiapolis dersi tersinden çalışır: 2 saatin üzerinde oynanışı $2.99'a veren oyun, dakika-başına-değer tartışmasının tamamen dışında kalır. Exit 8 ($3.99 / ~1 sa) referansına göre bu bant fazlasıyla güvenlidir.
- **$1.99 bilinçli olarak reddedilir:** o bant Steam'de "asset-flip" sinyali üretir; özgün mekanik iddiasını fiyatla baltalamak sinyal hatasıdır.
- **İndirim disiplini:** ilk yıl **indirimsiz veya en fazla −%10**. Sebep aritmetiktir: standart −%33 indirim $2.99'u $1.99 bandına düşürür ve reddedilen sinyale geri döner.
- Gelir birincil motivasyon değildir (oyun sahibinin kararı); fiyat, algı yönetimi aracıdır. **$3.99 opsiyonu Ek A'da not olarak durur, izlenmez.**

Kısa oyun USP'yi sulandırmaz — Exit 8 kanıtıdır.

### 2.3 "Backrooms" kelimesi yasağı

Backrooms markası jenerikleşti; "8-like" furyası doygun. Steam etiketlerinde, mağaza metninde ve sosyal medyada **"Backrooms" kullanılmaz**. Etiketler: "liminal", "atmosferik", "psikolojik korku", "keşif", "PSX/retro".

### 2.4 USP'nin pazarlanması

Fragmanın **ilk 10 saniyesi** Çizer'in taklit anını gösterir — estetik değil mekanik USP satılır. Çizer'in yayıncıyı kandırdığı anlar klip kanalının doğal yakıtıdır; tell'ler tutorial'da anlatılmaz ki topluluk "tell listesi" tartışsın (bedava pazarlama). Hafif plan §15'tedir.

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

Canavar değil; **ilk yutulan kurbandır** — doğduğu için suçlanan, yargılanmadan gömülen ilk varlık (Minotor'un gerçek adı Asterion). Labirent onu sindirmek yerine görevlendirdi: **sessiz kalp tartıcısı** (Ammit + 42 yargıç). Saldırmaz; tartar. Belirme mesafesi, ses imzası ve bıraktığı izlerin davranışı dürüstlük siciline bağlıdır (§5.1). Finalde tek kez oyuncunun gerçek adını duvara yazar. Merkezdeki odası taht odası değil, **çocuk odasıdır** (§7.6).

### 3.5 Bilinmeyen Çizer — kıdemli ortak

Daidalos arketipi: Çizer, **o gece arabadaki kıdemli ortaktır**. Otuz yıl önce yutuldu; duruşmasından kaçtıkça merkeze katlandı; şimdi Watcher'ın dikkatini başkasına çekerse salıverileceğine inanıyor. Sahte işaretleri kötülük değil **umutsuzluğun el yazısıdır**: dikkatli bakan çizgilerin titrediğini görür (pişmanlık). Oyuncunun karanlık aynasıdır: "susan tanık" ile "saptıran tanık" arasındaki mesafe bir sprey kutusudur. Üçüncü perdedeki tek karşılaşma §5.2'dedir.

### 3.6 Mitolojik katmanlar

Labirent derine indikçe zamanda geriye katmanlaşır. Katman sayısı üçtür; mitolojik tez (her kültür aynı labirenti gördü) değişmemiştir:

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
| **Tüy (itiraf)** | [MVP] | Merkezde oyuncu kendi vaka damgasının boş hüküm hanesini spreyle doldurur: "tanık: ben" | Watcher ilk kez tam görünür — insandır (yüzün "netleşmesi" model değil, siluet + ışık + dither izlenimidir; §9.6). Çıkış Chartres tek-yol labirentidir (kaybolunamaz). Araba enkazının yanında uyanış; telefon kulübesi çalıyor |
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
- **Boya yaşlanması:** taze boya parlak ve akıntılıdır; zamanla matlaşır, solar — tam silinmez. Derin bölgelerde yaşlanma hızlanır. Yaşlanma bedava zaman bilgisidir ve decal tavanının diegetik örtüsüdür (§12.2). Görsel yaşlanma katmanı kesim sırasında geç adaydır (§13.4); solma her koşulda kalır.

### 4.3 Silme kuralı ve Çizer işaretine müdahale [MVP — kritik]

**Silme (sağ tık) YALNIZCA oyuncunun kendi boyasında çalışır.** Diegetik gerekçe: oyuncunun spreyi devriye arabasından çıkan belirli bir kimyasaldır; Çizer'inki başka bir maddedir — silinemez, üzeri boyansa bile altından sızar. Çizer işareti sağ tıkla nötralize edilemez; oyuncu onu **yorumlamak** zorundadır — tehdit bilişsel düzlemde kalır.

**Çizer işaretine müdahale tablosu (A2, sicil senkronu):**

| Oyuncu fiili | Mekanik sonuç | Dürüstlük siciline etkisi |
|---|---|---|
| Sahte işaretin YANINA "sahte" damgası / X koymak | İşaret etiketlenir; oyuncunun kendi bilgi ağı güçlenir | **—** (sicile işlemez) |
| Sahte işaretin üzerini boyamaya çalışmak | Boya kapanmaz, altından sızar | **—** (sicile işlemez) |
| KANIT NESNESİNİN üzerini tamamen kapatacak şekilde boyamak | Kanıt örtülür | **NEGATİF** |

**Sicilin tek kaynağı §5.1'deki 3 sinyaldir**; bu tablonun yalnız son satırı o listeye karşılık gelir. Başka hiçbir fiil sicile işlemez.

### 4.4 Sembol-kilit kapılar [MVP]

Bölge kapıları, labirentin başka yerinde bulunan bir sembolün kapıya **spreyle çizilmesiyle** açılır. Çizim grid'e rasterize edilip referans desenle karşılaştırılır; **shape-matching toleransı ~%70** (playtest ile ayarlanır, §14). Envanter yoktur — **anahtar oyuncunun kafasında taşınır**.

Oyunda **toplam 3 sembol-kapı** vardır:

1. **Enkaz** — öğretim kapısı.
2. **2a → 2b** geçişi.
3. **2b → Merkez** geçişi.

**Sürtünme tavanı kuralları (A6 — aynen geçerli):**
- Kritik yolda **bölge başına en fazla 1 sembol-kapı** (2a ve 2b ayrı alt bölgelerdir; tavan korunur), oyun boyunca toplam 3. Merkez'de kapı yoktur — final kapı değil karardır.
- Sembol aynı bölgededir; kapıya yürüme mesafesi **≤ 2–3 dakika**.
- Yanlış çizim **cezasızdır, deneme sınırsızdır**; N başarısız denemeden sonra diegetik ipucu belirir (yakındaki scripted is lekesi hizası sembole işaret eder — §4.6). **N: playtest parametresi, başlangıç değeri 3.**
- Menüde "çizim yardımı" (snap) erişilebilirlik seçeneği vardır (§11.3).
- Demoya bir sembol-kapı konur — kitle kendini filtreler.
- **KURAL: Kritik yolda tek zorunlu bulmaca türü vardır (sembol-kapı); diğer her bulmaca opsiyoneldir.**

Kapı estetiği: Mısır ikonografisi birebir alınmaz; **beton-brutalist soyut semboller** kullanılır ("hiçbir kültüre ait olmama" tekinsizliği + temsil/telif hassasiyeti).

### 4.5 Pusula [MVP]

- **Diegetik:** Q tuşu pusulayı ele kaldırır; ekran katmanı yoktur. Pusulanın "kuzeyi" global landmark'a — sisin üstünden görünen uzak kuleye — kilitlidir.
- **Anomali = bilgi:** manyetik ölü noktalarda (2b'de tanıtılır) iğne rastgele "çıldırmaz"; **yanlış ama TUTARLI şeyi gösterir: en yakın Gerçeklik Kırığı'nı.** Öğrenen oyuncu için Kırık dedektörü, öğrenmeyen için katıksız tekinsizlik.
- Watcher ürpertisi (iğne titremesi) ve üçgenleme bulmacası launch sonrasıdır (§17).

### 4.6 Ruh Çarpışmaları [MVP — 2 scripted sahne]

Siste düz bir hatta süzülen soluk ışık bir duvara ulaşır, titreşir, söner — duvarda **is lekesi** kalır. Tok, yönlü (3D) tek ses vuruşuyla gelir (§10.4). Sistemik rastgele olay değil, **2 elle sahnelenmiş andır**:

1. **2a'da ilk karşılaşma** — güven evresinde tek tekinsizlik vuruşu.
2. **Merkez girişi "Eşik"te ikincisi** — final öncesi ton yükseltici (§6.2).

**Etiket ayrımı:** Sembol-kapı çevresindeki **scripted is lekesi ipuçları [MVP]'dir** ve A6'nın "N denemeden sonra diegetik ipucu" kuralını karşılar (elle yerleştirilmiş, kapıya özel). Labirent geneli "ley hattı" navigasyon katmanı launch sonrasıdır (§17) ve yokluğu MVP ipucu sistemini etkilemez.

### 4.7 Kontrol şeması

**Launch girdisi klavye + faredir (E7).** Oyunun çizim mekaniği fare-öncelikli tasarlandı; başka girdi cihazları için özel destek §17'dedir (1. sıra). **Sigorta kuralı:** hiçbir girdi koda gömülmez — tüm girdiler **Godot InputMap action soyutlaması** üzerinden okunur; böylece §17'deki girdi genişlemesinin geri dönüşü günler mertebesinde kalır. Mağaza sayfası girdi beklentisini dürüstçe yazar: **"klavye + fare için tasarlandı."**

| Girdi | İşlev |
|---|---|
| WASD | Hareket |
| Shift | **Koşma — stamina YOK** (devasa mekânda stamina angaryadır) |
| Fare | Bakış |
| Sol tık | Sprey (basılı tutarak sürekli çizim; menüden **aç/kapa sprey modu** seçilebilir, §11.3) |
| Sağ tık | Silme (yalnız kendi boyanda) |
| Tekerlek | Fırça boyutu |
| 1–4 | Renk seçimi |
| **1–6 rezerve** | Tuş haritası 6 renge ölçeklenebilir yazılır (geri dönüş mimarisi, Ek A) |
| Q | Pusulayı kaldır/indir |
| E | Etkileşim (Kırık nesneleri, belgeler) |
| Esc | Menü |

Tüm tuşlar yeniden atanabilir (InputMap zaten bunu bedavaya verir).

### 4.8 Hareket hissi

Yürüme temel tempodur; **koşma vardır, stamina yoktur**. Eğilme ve tırmanma **[Kesildi]** (Ek B). Head-bob hafiftir ve kapatılabilir (§11.3). Devasalık hissi hareket hızı + FOV + ölçek kontrastıyla kalibre edilir — draw distance ile değil (§9.5).

---

## 5. Varlıklar

### 5.1 The Watcher — davranış sistemi [MVP]

Watcher iki bağımsız sorunun cevabıyla çalışır: **ne zaman belirir** (yalnızlık sayacı) ve **nasıl belirir** (dürüstlük sicili).

**(a) Belirme tetikleyicisi — yalnızlık sayacı:** rastgele spawn yoktur. Gizli sayaç şunlarla dolar: landmark görmeden / işaret bırakmadan geçen süre + (finalde) hikâye vuruşları. **Spam koruması (A4): aynı 5–10 m içindeki ardışık işaretler sayacı sıfırlamaz; sıfırlama = landmark GÖRME + yeni konumda işaret.**

**(b) Belirme niteliği — dürüstlük sicili:** sicil **3 ikili, itiraz edilemez sinyalden** oluşur (yeni sinyal ancak bu tabloya eklenerek tanımlanabilir; örtük sinyal yoktur):

| Sinyal | Yön |
|---|---|
| Kırık kanıt etkileşimini tamamlama | + |
| Kanıt nesnesini boyayla örtme | − |
| Finalde hüküm hanesi seçimi | belirleyici |

Çıktı **2 kovadır: dürüst (varsayılan) / sahteci.** Kovalar YALNIZCA şunları değiştirir (E6): (i) Watcher belirme **mesafe bandı**, (ii) kova değişiminde kısa **ses imzası**, (iii) **final varyantı**, (iv) **iz yönelimi** — aşağıda (d). Başka hiçbir sistem sicili okumaz. §4.3 müdahale tablosu bu listeyle senkrondur; çelişki yoktur. Watcher silueti **tek statik modeldir** (§9.4); sicile bağlı siluet değişimi §17'dedir.

**Ters teşvik düzeltmesi:** kova, korku **miktarını değil TÜRÜNÜ** değiştirir. Dürüst oyuncu Watcher'ı yine görür — uzak, insansı, hüzünlü (tekinsizlik). Sahtecide belirgin biçimde yakın belirir ve ses imzası sertleşir (tehdit). **Korku bütçesi kimseden esirgenmez.** Kova değiştiğinde tek okunur tepki verilir: sonraki beliriş belirgin biçimde daha yakın/uzak + kısa ses imzası.

**(c) Spawn koreografisi:** eşik aşılınca Watcher, görüş yönünün **60–90° yanında**, sis sınırında, **elle yerleştirilmiş** spawn noktasında belirir. Yaklaşılınca sis yutmuş gibi kaybolur. Pathfinding AI yoktur; koreografi vardır.

**(d) İz bırakma [MVP] — kovaya bağlı yönelim (E6):** kaybolduğu yerde küçük bir dünya değişikliği kalır — kapalı kapı açık, işaretin önünde ıslak ayak izi. "Acaba yine mi geldi" paranoyası, görünmesinden değerlidir. **Kova farklılaşması:** dürüst kovada izler kayıtsızdır (rastgele yönelir/uzaklaşır); **sahteci kovada ıslak ayak izleri oyuncuya DOĞRU yönelir.** Mevcut iz/decal sistemiyle sıfıra yakın maliyet; "korku türü değişir" ilkesinin üçüncü taşıyıcısıdır.

Bakışma mekaniği ve pusula ürpertisi launch sonrasıdır (§17). [Kesildi — Ek B]: kovalama, saldırı, pathfinding.

### 5.2 Bilinmeyen Çizer [MVP — bütçenin yıldızı]

Bu oyunun "jumpscare"i Çizer'dir; **v3.0'da da kesinti yoktur — oyunun varlık nedenidir.** Çizer neredeyse hiç render edilmez; **işaretleri onun bedenidir**.

**Üç perdelik tırmanış:**

| Perde | Bölge | Davranış |
|---|---|---|
| **P1 — Kopyalar** | Sığlık (2a) | Oyuncunun işaretinin aynısı, yanlış kavşakta. Bu perdede önceden hazırlanmış **5–6 el yapımı jenerik varyant** kullanılır |
| **P2 — Çarpıtmalar** | Derin Sığlık (2b) | Oyuncunun kendi oku 10° döndürülmüş, "düzeltilmiş" gibi — teknik olarak mevcut decal'in transform'udur, neredeyse bedava |
| **P3 — Öngörüler** | Merkez | Hiç gidilmemiş koridorda, oyuncunun KENDİ darbesi, henüz çizilmemiş işaret olarak. Doruk korku anı — teknik: verbatim stroke-replay (§12.3); jenerik işaret P3'te YOKTUR |

2a→2b arasındaki **sessizlik beat'inde Çizer tamamen susar** (§7.4) — P1'in sarsıntısından sonra nefes, P2'nin tırmanışından önce gerilim. **P1/P2 örnek sayısı ve aralığı elle yerleştirilir ve tempo vanası olarak kullanılır** (§7.7).

**Öğrenilebilir tell'ler:** kopyalar ~%95 doğrudur ama: boya akıntıları **yukarı** doğrudur; ton kaymıştır (kan kırmızısı vs. tuğla kırmızısı); köşelerde el titremesi yoktur — insan dışı düzgünlük. **Tutorial'da anlatılmaz** — topluluğun tell listesi tartışması bedava pazarlamadır. (Tell'ler ayrıca soft-fail çarpıtmalarını tespit edilebilir kılar, §6.1.)

**3. perde karşılaşma sahnesi [MVP]:** Merkez'de, tek sefer: sırtı dönük bir figür duvara oyuncunun çıkışını DOĞRU çizmektedir — ilk ve son dürüst işareti. Yaklaşınca figür sisle dağılır; işaret kalır. Kimliği (kıdemli ortak) Kırık belgeleriyle bu ana kadar örülmüş olur.

Davranış bayrakları (küsme/öfke) launch sonrasıdır (§17).

---

## 6. Fail State ve Kayıt

### 6.1 Yeniden Emilme — soft fail [MVP]

Ölüm yoktur; ceza **bilgi kaybı değil, şüphe enjeksiyonudur**.

**Tetik koşulları:** yalnız iki tetik vardır: (1) derin alanda **uzun süre işaretsiz-yönsüz dolanma**, (2) **Watcher'a tekrarlı aşırı yaklaşma**. Baskı arttıkça uyarı diegetiktir: görüntü-ses bozulması.

**Sonuç:** ekran sisle dolar; oyuncu son Kırık'ta uyanır — ve o bölgedeki işaretlerinin bir kısmı Çizer tarafından değiştirilmiştir.

**Doz kuralları (A5 — sayısal, kesin, aynen geçerli):**
- Fail başına **en fazla 2–3 işaret** değiştirilir; **yalnızca fail olunan bölgede**.
- **Dokunulmazlar:** sembol-kapı çözümü işaretleri, Kırık'ların **10 m** çevresi.
- Değişiklik silme değil **ÇARPITMADIR** (ok **10–20°** dönmüş, X'e çevrilmiş) ve **her zaman Çizer tell'i taşır** — tespit edilip düzeltilebilir.
- **İlk soft-fail scripted'dır ve 2b'nin ORTASINA yerleştirilir** (E4: monotonluğun istatistiksel tepe noktası): tek işaret değişir; tell öğretme anı olarak sahnelenir.
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
3. **%70 döngü / %30 ölü uç:** döngüler "burası demin geçtiğim yer!" anını üretir. **Her ölü uç ödemelidir**: Kırık, sembol, lore veya manzara — grafiti mikro-hikâyeleri bu borcu metinle de ödeyebilir (§7.7).
4. **Kısayol açılımı (metroidvania-lite):** derinden başlangıca tek yönlü kapılar; geri yürüme angaryasını keser.
5. **Görüş hattı tacizi:** ulaşılamayan landmark ızgara/delik ardından gösterilir; sis mesafesi, sonraki karar noktası YARI görünür olacak şekilde ayarlanır.
6. **Adil kaybettirme:** harita mantığı asla kırılmaz — **SON BÖLGE HARİÇ**. Kural oyunun büyük bölümünde geçerli olduğu için finalde kırılması dehşet verir.

### 7.2 Üretim akışı: el yapımı + modüler kit

**Runtime prosedürel üretim YOKTUR.** Makro plan elle tasarlanır; koridor dolgusu **6–8 parçalık modüler beton prefab kiti** (Blender pipeline'ı §9.6) + labirent yazım aracıyla üretilir. Kit disiplini: **bölge başına en çok 1–2 hero asset** kit dışına çıkabilir. Tek istisna: Merkez'in scripted kural kırılmaları (§7.6).

**Labirent yazım aracı (karar — teknik denetimden geçti):** iki parçalı boru hattı. (1) **2D top-down HTML aracı** (repo içinde, tarayıcıda lokal çalışır; Chromium'da File System Access API ile doğrudan kaydetme, diğer tarayıcılarda download fallback): seed'li üretim (recursive backtracker + döngü yüzdesini doğrudan kontrol eden **braid oranı**), elle düzenleme (kenar aç/kapa, oda/zone boyama, tipli hikâye marker'ları), **kilitli bölge korumalı kısmi yeniden üretim** (kilit-sınır kuralı: iki ucundan en az biri kilitli hücreye değen kenar dokunulmazdır) ve **Lynch metrik paneli**: %70/%30 döngü oranı, ödülsüz ölü uç uyarısı, kritik yol dakika tahmini (`meta.walkSpeed` oyuncu controller'ıyla aynı sabitten okunur), erişilemeyen hücre uyarısı, §7.5 sabotaj çakışma denetimi. (2) **maze.json** — hücre/kenar grafı + stable ID'li tipli marker'lar (marker tipleri: kirik_checkpoint, sembol_kapi [edge referanslı], sembol_kaynak, watcher_spawn, cizer_slot p1/p2/p3, is_lekesi_ipucu, belge, ruh_carpismasi, opsiyonel_dongu_odul, anomali_alani, oyuncu_baslangic); kenarlarda kapı yönü (`dir`); bölge başına bir dosya; monoton `nextId` sayacı (ID asla yeniden kullanılmaz). (3) **İnce Godot importer** (@tool, dock: Rebuild + Validate): **kit sahne instancing** (GridMap ve MultiMesh bilinçli reddedildi — GridMap hücre-adresli olup kenar-duvar modeline uymaz; MultiMesh tek AABB ile cull edilir ve buffer'ı .tscn diff'ini şişirir), marker'lar `Markers/<tip>/<id>` Marker3D node'larına, çıktı **ayrı `*_generated.tscn`** dosyasına yazılır (PackedScene.pack + ResourceSaver.save; el dressing'i zone sahnesinde ayrı yaşar; **idempotent rebuild: iki import = sıfır diff**; silinen marker'lar için orphan raporu). Duvar occluder'ları (§12.4) kit parçalarında/importer'da üretilir. **Aracın kapsamı Enkaz + 2a + 2b'dir; Merkez'in kural kırılmaları araca girmez, elle kurulur** (`cells[].kind: manual` dikiş noktasıdır). Efor: HTML araç ~25–35 sa + importer ~15–25 sa (level design 110 saat kaleminin içinden; graybox'ı hızlandırır). Zamanlama: dikey dilim sonrası, graybox fazının başında; yalnız ~3 saatlik **importer spike'ı** (idempotanlık/owner doğrulaması) dikey dilim sırasında yapılır.

**Büyütme kuralı (E3 — bağlayıcı):** 2a/2b taban alanı büyütülürken **yeni landmark borcu üretilmez**; iki ucuz kaynak kullanılır: (a) **mevcut landmark'ların yeni açılardan görülmesi** (görüş hattı tacizi — kural 5'in ölçek aracı olarak), (b) **Claude ile neredeyse bedava üretilen metin katmanı** (grafiti mikro-hikâyeleri, belge kırıntıları — "okunur dakika"). Süre uzatma ihtiyacı doğarsa yeni SİSTEM değil, mevcut kitle ek koridor DÖNGÜLERİ eklenir (Lynch kuralları korunarak); 3 bölge yapısı değişmez. Backtracking yasağı sürer — döngü ≠ backtracking.

### 7.3 Bölge tablosu ve süre mimarisi (E3)

**Kritik yolun KENDİSİ ≥ 120 dakika olacak şekilde bütçelenir** — medyan hipotezi kaybolma payına yaslanmaz:

| # | Bölge | Kritik yol bütçesi | Lore | Ambiyans kimliği | Tanıtılan | Çizer | Kırık | Sembol-kapı |
|---|---|---|---|---|---|---|---|---|
| 1 | **Enkaz** | ~15 dk | Beton | Soğuyan motor tıkırtısı, cam kırığı, cızırtılı telsiz | Sprey, silme, pusula, ilk Kırık | — | Devriye arabası | 1 (öğretim) |
| 2a | **Sığlık** | ~35–40 dk | Beton | Uzak rüzgâr, geniş beton uğultusu | Landmark okuma, boya yaşlanması; **1. Ruh Çarpışması** | **P1** | Telefon kulübesi | 1 (2a→2b) |
| — | **Sessizlik beat'i** | ~10 dk | geçiş | Ambiyans incelir | Çizer tamamen susar | — | — | — |
| 2b | **Derin Sığlık** | ~35–40 dk | Taş→Duat izleri | Damla, metal inilti, derin yankı | **Pusula anomalileri**, kronoloji belgeleri, **düşey set-piece**; ilk scripted soft-fail (2b ortası) | **P2** | Arşiv köşesi | 1 (2b→Merkez) |
| 3 | **Haritalanamayan Merkez** | ~30–35 dk | Girit | Sessizliğe inen katmanlar; kalp atışı gibi uzak tok vuruş; finalde ninni motifi | Kural kırılmaları; **Eşik** (2. Ruh Çarpışması); final kararı | **P3** | Eşik (mini-Kırık); çocuk odası kayıtsız | — (kapı değil, karar) |

- **Kritik yol toplamı: ~125–140 dk** (15 + 35–40 + 10 + 35–40 + 30–35; kronoloji belgeleri kritik yol üstündedir). Kaybolma payı ve opsiyonel ödüllü döngü (**+10–15 dk**) bunun ÜSTÜNE gelir → **medyan oyuncu beklentisi 140–170 dk; medyan hipotezi ≥ 120 dk garanti bandı olarak kalır** (§14.2).
- **Opsiyonel döngü ve kronolojinin 3. belgesi "KESİLEMEZ" sınıfındadır** — süre taşıyıcılarıdır; hiçbirinde "ilk kesim adayı" etiketi yoktur (E3; kesim sırası §13.4 zaten dakika kesmez).
- **Süreyi doldurmak için backtracking eklemek YASAKTIR.**
- Kritik yol sembol-kapı toplamı: **3** (A6 "bölge başına 1" tavanı 2a/2b bölünmesiyle korunur).

**Tempo eğrisi — 5 vuruş:** öğretim (Enkaz) → güven (2a) → **sarsma** (P1) → **sessizlik** (beat) → **tırmanış** (P2) → **kural kırılması** (P3/final).

### 7.4 Bölge kısa açıklamaları

- **Enkaz:** devrilmiş devriye arabasının etrafında yoğun sisli dar enkaz koridorları. Sprey/silme/pusula/kayıt tek güvenli odada öğretilir. Çizer yoktur; Watcher yalnız son anda tek uzak siluet olarak görülür.
- **Sığlık (2a):** cömert landmark'lı, düşük sisli geniş gri avlular — oyuncuya "sistemim çalışıyor" güveni verilir; Çizer P1 tam bu güvenin üstüne gelir. **Dar servis koridorundan katedral avluya çıkış kontrastı en az bir kez burada sahnelenir** (§9.5). Opsiyonel ödüllü döngü: çevre galerisi (lore + kestirme açılımı) — kesilemez süre taşıyıcısı (§7.3).
- **Sessizlik beat'i (2a→2b):** ~10 dk; Çizer tamamen susar, ambiyans incelir. Sarsıntı sonrası nefes, tırmanış öncesi gerilim.
- **Derin Sığlık (2b):** aynı prefab kiti, ayrı palet/ambiyans kimliği: Duat tonları (tabut mavisi + toprak sarısı) betona sızar. İlk manyetik ölü noktalar burada; pusulanın "yanlış ama tutarlı" davranışı keşfedilir. Kronoloji belge yoğunluğu en yüksek bölge. **İki Yol Kitabı diyagramı tek hero-duvar** olarak buradadır. **Tek düşey set-piece** (bir çukur/üst geçit anı — bölge değil, "an"): siste aşağı bakmak ileri bakmaktan tekinsizdir; kot farkı kesilemez, dressing cilası kesim sırasında adaydır (§13.4). İlk scripted soft-fail bölgenin ortasındadır (§6.1).
- **Haritalanamayan Merkez:** aşağıda (§7.6).

### 7.5 Sabotaj dönüşüm kuralı

Bağlayıcı kural: **manyetik ölü nokta ile Çizer sahte işareti aynı mekân parçasında AYNI ANDA devrede olamaz.** Araçlar tek tek, dönüşümlü sabote edilir; üç oryantasyon katmanından en az ikisi her an ayaktadır. Bu kural §7.7'deki araç güven ritmi çizelgesiyle operasyonelleşir.

### 7.6 Haritalanamayan Merkez — kural kırılmaları

Son bölge, oyunun kurduğu sözleşmeyi bilinçli bozar (**yalnızca burada** — §7.1 kural 6):

- **Hafif runtime karıştırma:** arkadan kapanan geçitler, dönülünce değişen kavşaklar, imkânsız geometri (scripted numaralar; prosedürel üretim değil).
- Pusula anlamsızlaşır (iğne yavaşça oyuncunun arkasını gösterir); global landmark görünmez olur; **tek rehber işaretlerdir** — oyuncunun ve Çizer'in.
- Çizer P3 öngörüleri ve 3. perde karşılaşma sahnesi buradadır.
- Girişte **Eşik** mini-Kırık'ı: otomatik kayıt + soft-fail dönüş noktası + 2. Ruh Çarpışması (§6.2).
- Merkezin çekirdeği: **çocuk odası** — sıva dökülür, Knossos kırmızısı fresk parçaları; Asterion'un çocukluk çizimleri. Final kararı (hüküm hanesi) burada verilir; kayıt yoktur.
- Bu bölgenin scripted kural kırılmaları **ilk 80 saatlik dikey dilimde prototiplenir** — en belirsiz iş en başta (§13.3).

### 7.7 2. Saatin Taşıyıcıları — monotonluk paketi (E4)

Oynanış 2 saatin üzerine çıktığında türün "tek mekanik yorar" riski büyür. Aşağıdaki 6 madde **sıfıra yakın maliyetli, bağlayıcı tasarım kurallarıdır**; hepsi mevcut sistemleri kullanır, yeni sistem eklemez:

1. **Notasyon talebi tırmanışı:** 2a'da basit ok yeter; 2b kavşakları **mesafe/sayım notu** ister ("3. sol"); Merkez öncesi **ölü uç kodlaması** gerektirir. Oyuncunun kendi notasyon sistemi oyun boyunca evrilir — kod maliyeti sıfır, kavşak tasarım dikkati ister.
2. **Çizer yoğunluk eğrisi = tempo vanası:** P1/P2 örnek sayısı ve aralığı elle yerleştirilir; playtest'te sarkan orta bölüm yeni içerikle değil **yerleşim yoğunluğu ayarıyla** düzeltilir.
3. **Grafiti mikro-hikâyeleri:** kurban grafitilerinde izlenebilir **2–3 kırıntı hikâye** (aynı el yazısının giderek çaresizleşmesi). Decal-metin mimarisi hazırdır; metni Claude neredeyse bedavaya üretir. "Her ölü uç öder" borcunu metinle öder.
4. **Sahte aşinalık koridoru:** bir koridor bilerek öncekinin birebir kopyası olarak dizilir; oyuncuyu ürperten şey **kendi boyasının ORADA OLMAMASIDIR.** Sıfır yeni asset.
5. **Araç güven ritmi çizelgesi:** §7.5 sabotaj kuralı, 10'ar dakikalık dilimlere dökülmüş bir tempo tablosuyla yönetilir (hangi dilimde hangi araca güvenilemez). Spreadsheet işidir, kod değil.
6. **İlk scripted soft-fail 2b ortasında** — monotonluğun istatistiksel tepe noktasına yerleştirilir (§6.1).

---

## 8. Anlatı Sunumu

### 8.1 Ortam anlatımı ilkeleri

Sesli anlatım, NPC, flashback, uzun ara sahne **[Kesildi — Ek B]**. Hikâye üç kanaldan akar: mekân (yutulmuş parçalar), belge (Kırık'lardaki kâğıtlar — tarih damgalı, kısa), duvar (üç katmanlı yazı sistemi). Az metin ilkesi: oyuncu karakteri susar; oyun da gevezelik etmez. (Metin hacmi Claude ile en ucuz üretim kalemidir — §18; "az metin" sanatsal karardır, bütçe kısıtı değil.)

### 8.2 Duvar yazısının üç katmanı

| Katman | Kaynak | Nitelik |
|---|---|---|
| Kurban grafitileri | Önceki yutulanlar | Ham, okunur, **güvenilmez** (çaresizlik arşivi); 2–3 mikro-hikâye taşır (§7.7) |
| Çizer işaretleri | Kıdemli ortak | Oyuncuyla **aynı dil**, güvenilmez; tell'lerle ayırt edilir |
| Dosya damgaları | Labirent'in kayıt sistemi | Evrimleşmiş hiyeroglif; güvenilir ama öğrenilmesi gerekir |

### 8.3 Dosya damgası sistemi — damga-lite [MVP]

Her vaka 3–4 sembollük damgayla kayıtlıdır: **mekân + suç + tanık sayısı + hüküm boşluğu**. "Hüküm" hanesi hep boştur — final, oyuncunun kendi damgasındaki boşluğu doldurmasıdır (ya da bırakmasıdır). Fez/Tunic okulu: sözlük verilmez, tekrarla öğrenilir.

Damgalar yalnızca **ana vaka Kırıklarında** görülür; "Tüy" sonu damga sistemine bağımlı olduğu için bu alt küme MVP'dedir. Tam üç katmanlı sözlük launch sonrasıdır (§17).

### 8.4 Kronoloji-lite bulmacası [MVP — kesilemez]

Ana vakanın **3 belgesi** — **ihbar kaydı, sahte kaza tutanağı, kapanış yazısı** — Kırıklarda **sırasız** bulunur; hepsi aynı geceye damgalıdır. Oyuncu zaman çizgisini zihninde kurar — envanter/günlük ekranı yoktur; belgeler yerinde okunur, damga tarihleri anahtardır. Tek zincir, yeni sistem gerektirmez; mevcut Kırık varlıklarını kullanır. **3. belge süre taşıyıcısıdır ve kesilemez sınıfındadır (E3).**

---

## 9. Sanat Yönü

### 9.1 "Beton zaten graybox'tır" doktrini (E2 — sanat yönü kararı)

**Bu oyunun art pass'ının başarı tanımı: palet + sis + ışık + decal katmanı.** PSX + sisli brütalizm, doğası gereği textured-graybox'a çöker: gri beton kutular bu oyunda placeholder değil, NİHAİ GÖRÜNÜMÜN ta kendisidir. Bundan çıkan bağlayıcı kurallar:

- **Kit dokuları minimal tutulur:** 128px, mümkünse tek atlas; varyasyon dokuyla değil palet/sis/ışık kimliğiyle üretilir.
- **Hero işçiliği yalnız 4 Kırık noktasına (araba, telefon kulübesi, arşiv köşesi, Eşik) + çocuk odasına yoğunlaşır.** Dressing bütçesinin tamamı budur.
- Bu bir taviz değil sanat yönü kararıdır; part-time saat bütçesiyle (§13.2) hizalanması tasarımın gereğidir, sebebi değildir.

### 9.2 PSX teknikleri [MVP]

Vertex snapping, affine texture mapping, Gouraud shading, düşük renk derinliği + dithering, düşük çözünürlük render target, 128px doku bütçesi. **Godot 4 hazır PSX görsel eklentisi temel alınır; sıfırdan shader yazılmaz.** Düşük çözünürlük belirsizlik üretir → beynin boşluk doldurması korku bütçesine bedava katkıdır. Vertex-wobble kapatılabilir (§11.3).

### 9.3 Sis ve paletler [MVP]

**40–80 m** aralığına kilitli mesafe sisi — üçlü kazanç: estetik (PSX meşruiyeti), performans (draw distance tavanı), tasarım (görüş hattı tacizi aracı). Bölge başına ayrı sis rengi/yoğunluğu kimliğin parçasıdır. Kırıklar **sissiz ve aydınlıktır** — korku ritmi nefesle kurulur.

| Bölge | Palet | Not |
|---|---|---|
| Enkaz | Gece grisi + polis lambası kırmızı-mavisi | Tek renkli ışık kaynağı: araba |
| Sığlık (2a) | Açık gri beton, süt beyazı sis | En "temiz" bölge — güven inşası |
| Derin Sığlık (2b) | Duat tonları: tabut içi mavisi + toprak sarısı betona sızar | Sessizlik beat'i boyunca geçiş kademelidir |
| Merkez | Kırık sıva beyazı + Knossos kırmızısı fresk | Ayrı palet sayılmaz; 2b paletinin üzerine tek vurgu — renk oyunda ilk kez "sıcak" |

### 9.4 Watcher / Çizer görsel tasarımı

- **Watcher:** **tek statik siluet** + sis LOD. Uzaktan insansı; detay asla net görülmez. Sicil kovası silueti DEĞİŞTİRMEZ — farklılaşma mesafe bandı + ses imzası + iz yönelimiyle taşınır (§5.1); sicile bağlı siluet varyasyonu §17'dedir. Yüz yalnız "Tüy" finalinde bir kez "netleşir" — tekniği §9.6'dadır.
- **Çizer:** neredeyse hiç render edilmez; işaretleri onun bedenidir. Tek görünüm: P3 sırtı dönük sahne — kapüşonlu, 90'lar devriye montunu andıran siluet.

### 9.5 Devasalığın satılması

Devasalık **siluet + ses + ölçek kontrastıyla** satılır; **draw distance ile DEĞİL** (sis 40–80 m kilidi ihlal edilmez). Araçlar: dar servis koridorundan katedral avluya çıkış (2a'da en az bir kez sahnelenir); sis üstünden seçilen kule silueti; yankı kuyruğunun uzunluğu; **2b'nin düşey set-piece'inde kot farkından aşağı bakış**.

### 9.6 Blender pipeline (C9)

Tüm 3D üretim Blender'dadır; akış kit-first'tür ve doktrinle (§9.1) hizalıdır:

**Modüler beton prefab kiti (6–8 parça):** duvar, köşe, kapı çerçevesi, avlu parçası, merdiven/rampa, kolon, ızgara, moloz. Parça başına tri bütçesi düşük (PSX); doku 128px, mümkünse tek atlas.

**Hero asset listesi:** devriye arabası, telefon kulübesi, arşiv köşesi seti, Eşik seti, çocuk odası seti, kule silueti, Watcher modeli.

**Watcher üretim kararı (E2):** sıfırdan karakter modellenmez — **CC0 taban mesh + siluet işçiliği + minimal rig** (idle + beliriş; iskelet animasyon seti yok). Watcher zaten asla net görülmediği için (sis + LOD + dither) yatırım siluete yapılır. **"Tüy" finalindeki yüz netleşmesi model detayı DEĞİLDİR: siluet + ışık + dither ile kurulan bir İZLENİMDİR;** prototipte bu izlenim tutmazsa geri çekilme planı **gölgeden reveal** sahnelemesidir (yüz hiç gösterilmez, gölge insan gölgesine döner).

**bpy otomasyonu:** tekrarlanan işler Claude'un ürettiği Python/bpy scriptleriyle otomatize edilir — atlas yerleşimi, LOD üretimi, toplu export. Bu kalem §18'deki en yüksek çarpan sınıfındadır; elle modelleme ve zevk kararları ise en düşük çarpan sınıfıdır ve hafta sonu derin iş bloklarına planlanır.

---

## 10. Ses Tasarımı

### 10.1 Bölge ambiyansları [MVP]

Her bölgenin ambiyans kimliği bölge tablosundadır (§7.3). İlke: ambiyans, üçüncü oryantasyon katmanıdır — gözler sisle kör edildiğinde kulak yön bulur. **Hazır SFX kütüphaneleri temel alınır**; Godot içinde pitch/katmanlama ile çeşitlendirilir.

### 10.2 Olasılıksal tek-sesler [MVP]

Dönen ambiyans loop'ları yerine **olasılıksal tek-sesler**: damla, metal inilti, uzak rüzgâr vuruşu — rastgele aralıklarla, 3D konumlu. "Törpüleyici ses döngüsü" şikâyetine doğrudan önlem; yapım maliyeti düşük (kısa örnekler + basit zamanlayıcı).

### 10.3 Watcher / Çizer ses imzaları [MVP]

- **Watcher:** belirişinde alçak, bas ağırlıklı "basınç" tonu; kova değişiminde kısa ayırt edici imza (§5.1). Ayak sesi yoktur — o yürümez, belirir.
- **Çizer:** hiçbir zaman görülmez ama **duyulur**: uzak koridordan sprey tıkırtısı ve püskürtme hışırtısı — oyuncu kendi çizmediği anlarda. P3'te bu ses oyuncunun sırtından gelir.

### 10.4 Ruh Çarpışması sesi [MVP]

Tok, tek vuruşluk gövde sesi, yönlü (3D). İki scripted sahnede (§4.6) ve sembol-kapı is lekesi ipuçlarında kullanılır.

### 10.5 Müzik: hazır lisans + ninni mikro-gig [MVP] (E8)

Skorlu müzik yalnızca **Kırık anlarında** (1–2 kısa, kırılgan motif — tek enstrüman) ve **finalde** çalar. Koridorlar müziksizdir: sessizlik, devasalığın ses tasarımıdır.

- **Kaynak politikası:** müzik ve SFX **hazır lisanslı/royalty-free** kütüphanelerden seçilir. Dış besteci süreci (brief, revizyon turları, sözleşme yönetimi) part-time takvimde yönetim yüküdür ve KESİLMİŞTİR — süreç olarak §17'dedir.
- **Tek istisna — ninni motifi:** oyunun tek melodik teması olan Merkez ninnisi (final varyantlarında farklı armonize edilir) hazır kütüphaneden çıkmayabilir. Bu tek parça **mikro-gig sabit fiyat siparişle** alınır: **~$100–300, 60 sn ana motif + 2 varyant** — asset satın alımıdır, besteci süreci değildir.
- **Lisans hijyeni (zorunlu):** her parça için **oyun-gömme (game-embedding) hakkı + yayıncı-güvenli (Content ID'siz) lisans** doğrulanır. Hedef kitlenin yarısı korku yayıncısıyken Content ID'li müzik kendi pazarlamamızı vurur; bu kontrol satın alma anında yapılır, launch öncesi değil.

---

## 11. UI/UX ve Erişilebilirlik

### 11.1 Diegetik-öncelik ilkesi

Oynanış ekranında sıfır UI. Pusula eldedir (Q), renk seçimi elde görünen sprey kutusunun rengiyle onaylanır, boya yaşı dokuyla okunur, tehdit görüntü-ses bozulmasıyla iletilir. Menü dışında hiçbir 2D katman render edilmez.

### 11.2 Menüler

Ana menü (Devam / Yeni / Seçenekler / Çıkış) + seçenekler (görüntü, ses, kontroller, erişilebilirlik) + **tek kayıt profili**. Kayıt = Kırık checkpoint'leri + tek kullanımlık çıkış kaydı (§6.3).

### 11.3 Erişilebilirlik matrisi [MVP — kesilmez]

Ucuz ve inceleme/itibar açısından kritiktir; part-time kapsamda da çekirdek aynen kalır (C10).

| İhtiyaç | Özellik |
|---|---|
| Renk körlüğü | 4 renk **CB-güvenli paletten**; her renge ikincil kod (doku deseni / sembol ucu) — renk hiçbir bilginin tek taşıyıcısı değildir |
| Hareket hastalığı | Vertex-wobble kapatma, FOV ayarı, head-bob ayarı/kapatma |
| Motor beceri | Shape-match **çizim yardımı (snap)**; basılı tutma yerine **aç/kapa sprey modu** (E13 — saatlik iştir, bilek yorgunluğu + motor erişilebilirlik; KALIR) |
| Fotosensitivite | Flicker azaltma seçeneği + içerik uyarısı |
| İşitme | Ses ipuçlarının görsel eşleniği: altyazılar (isteğe bağlı; varsayılan kapalı). Ekran kenarı yön imleri §17'ye ertelenmiştir (E13) |

---

## 12. Teknik Tasarım

### 12.1 1. Hafta Teknik Doğrulama listesi (E11) + Godot mimarisi

Aşağıdaki 4 doğrulama, dikey dilimin ÖNÜNE, projenin **ilk haftasına** konur; mimari kararlar bu testlere bağlanır:

1. **Renderer ↔ decal çakışması (kritik):** Godot'nun yerleşik **Decal node'u Compatibility renderer'da ÇALIŞMAZ.** İlk hafta prototipi karar verir: **Forward+/Mobile + Decal node MU, yoksa Compatibility + mesh-tabanlı özel decal Mİ?** Renderer tercihi bu testin ÇIKTISIDIR; önceden verilmiş bir renderer kararı yoktur (v2.0'ın renderer ön tercihi bu teste bağlanarak düzeltilmiştir).
2. **Sprey his prototipi:** fare hızı–darbe genişliği eğrisi; hedef "eli iyi hissettirmek" — his ayarı düşük Claude çarpanlı insan-saatidir (§18), erken başlar.
3. **Stroke-replay filtre + fallback mini testi** (E5, §12.3).
4. **1000-decal sahne performans testi** (tavanın gerçekçiliği ilk hafta ölçülür).

**Godot mimarisi:** Godot 4.x; **proje sürümü pinlenir** (§18 — Claude, API kaymaları yaşayabilir; şüphede resmi doküman esastır). Hazır PSX görsel eklentisi temel; üstüne Çizer tell shader'ı (yukarı akıntı, ton kayması) eklenir. Sahne yapısı: bölge = sahne; hücreler alt sahneler; global sistemler (sicil, yalnızlık sayacı, Çizer yöneticisi, kayıt) autoload singleton'ları. Girdi yalnız InputMap action'ları üzerinden okunur (§4.7).

### 12.2 Decal-instance boyama sistemi [MVP]

- Her fırça darbesi = yüzeye hizalı **projected decal instance**; darbeler spline-nokta listesi olarak tutulur.
- **Bölge başına darbe tavanı ~1000**; tavana yaklaşınca **en eski darbeler solmaya başlar** — boya yaşlanmasıyla diegetik örtüşür: teknik sınır kurgu olarak hissedilir.
- Sistem **renk-agnostik** yazılır; palet 6 renge ölçeklenebilir (geri dönüş ≈ 1–2 gün; §14.2 A/B).
- Çizer işaretleri **aynı sistemde ayrı katman/bayrakla** tutulur (silinemez bayrağı, tell shader'ı).
- Mesh-paint/render-target araştırması launch sonrasıdır; decal ihtiyacın %90'ını karşılar.

### 12.3 Stroke-replay (Çizer P3 tekniği) [MVP] (E5 — sadeleştirilmiş)

**Sınıflandırma ve stil parametresi YOKTUR** — darbeler kategorize edilmez, oyuncunun "stili" analiz edilmez, ML yoktur. Sistem üç parçadır:

1. **Verbatim replay:** P3 öngörüsü = oyuncunun kaydedilmiş darbe spline'ının **olduğu gibi** seçilip, gidilmemiş koridordaki elle yerleştirilmiş aday noktaya yeniden projekte edilip **replay** edilmesi + Çizer tell shader'ı. Etki aynıdır ("bu benim el yazım — ama ben buraya hiç gelmedim").
2. **Seçim filtresi:** aday darbe şu üç koşulu sağlamalıdır: **minimum uzunluk** + **ok-benzeri en-boy oranı** + **kavşak yakınında çizilmiş olma.** (P3 doruk anı anlamsız bir karalamayla patlamaz.)
3. **Fallback:** filtreyi geçen darbe yoksa, **uzak bir bölgeden gerçek bir darbenin P2-tipi transform'u** (döndürülmüş kopya) kullanılır — jenerik işarete asla düşülmez; **P3'te jenerik işaret YOKTUR** (jenerik 5–6 varyant yalnız P1'dedir, §5.2).

P2 çarpıtmaları zaten decal transform'udur (10–20° rotasyon) — neredeyse bedava. Filtre + fallback ilk hafta doğrulamasında mini test edilir (§12.1); sistemin tamamı ilk 80 saatlik dikey dilimdedir (§13.3) — en belirsiz iş en başta.

### 12.4 Hücre streaming + portal culling [MVP]

Sis 40–80 m'ye kilitli olduğundan çekim mesafesi sınırlıdır; bölgeler hücre bazlı stream edilir. **Düzeltme (teknik denetim):** Godot 4'te Godot 3'ün rooms/portals sistemi YOKTUR; görünürlük ayrımı **raster occlusion culling + OccluderInstance3D** ile yapılır — duvar kit parçaları basit box/quad occluder taşır (labirent yazım aracının importer'ı bunu üretir, §7.2). NavigationMesh üretimi bilinçli olarak kapsam dışıdır (Watcher'da pathfinding yok, §5.1). **Tuzak uyarısı:** devasa avlularda sis mesafesini artırma hevesine direnilir (§9.5).

### 12.5 Kayıt serializasyonu [MVP]

Kayıt = darbe listesi (pozisyon, normal, renk, boyut, yaş) + sicil + açılan kapılar + aktif checkpoint. Tamamı **kilobaytlar** mertebesinde; bulut kaydı sorunsuz. Save/load kenar durumları efor tablosunda ayrıca bütçelenmiştir (§13.2 — "taşan" kalem olduğu bilinir).

### 12.6 Performans hedefleri

- **1080p / 60 fps** orta seviye donanımda.
- Donanım genişlemesi (Steam Deck dahil) §17'dedir (1. sıra); performans bütçesi ve okunabilir metin boyutu şimdiden buna göre seçilir.

### 12.7 Lokalizasyon mimarisi [MVP]

- **Baştan string tablosu**; hiçbir metin koda gömülmez.
- **Duvar yazıları doku değil decal/metin olarak** render edilir — çeviride asset yeniden üretimi gerekmez.
- Diller: **EN + TR launch'ta**; ek diller launch sonrasıdır (§17) — mimari hazırdır. (Metin üretimi ve çeviri, §18'in en yüksek çarpanlı kalemidir.)
- Dosya damgaları semboliktir (çeviri gerektirmez).

---

## 13. Kapsam ve Üretim

### 13.1 MVP tablosu (launch kapsamı)

Launch kapsamı = aşağıdaki [MVP] seti. Ertelenenler §17'de, kalıcı kesikler Ek B'dedir; **iki liste karıştırılmaz.**

| Özellik | Etiket |
|---|---|
| Sprey (sınırsız, 4 renk, fırça boyu, decal, yaşlanma, aç/kapa modu) | [MVP] |
| Silme yalnız kendi boyada + Çizer müdahale tablosu | [MVP] |
| Sembol-kilit kapılar (**3 adet**, %70 tolerans, A6 kuralları) | [MVP] |
| Pusula + anomali=Kırık davranışı | [MVP] |
| Ruh Çarpışmaları (**2 scripted sahne**) + sembol-kapı is lekesi ipuçları | [MVP] |
| Watcher: yalnızlık sayacı + sicil (3 sinyal / 2 kova) + spawn koreografisi + kovaya bağlı iz yönelimi | [MVP] |
| Çizer: 3 perde + tell'ler + verbatim stroke-replay P3 (filtre+fallback) + karşılaşma sahnesi | [MVP] |
| Yeniden Emilme (A5 dozları) + Kırık zinciri (4 checkpoint + Eşik) + exit save | [MVP] |
| 3 bölge (Enkaz, 2a/2b, Merkez) + sessizlik beat'i + Merkez kural kırılmaları | [MVP] |
| 2b düşey set-piece + İki Yol Kitabı hero-duvarı | [MVP] |
| Kronoloji-lite (**3 belge — 3.sü kesilemez**) + damga-lite | [MVP — süre taşıyıcısı] |
| 1 opsiyonel ödüllü döngü (2a çevre galerisi) | [MVP — **kesilemez süre taşıyıcısı**] |
| Monotonluk paketi (§7.7, 6 madde) | [MVP — tasarım kuralı] |
| 2 son (Tüy, Ağır Kalp) + "Eşiğe dön" akışı | [MVP] |
| Erişilebilirlik matrisi (§11.3) | [MVP] |
| Lokalizasyon EN + TR (string tablosu mimarisi) | [MVP] |

### 13.2 Ekip, saat bütçesi ve efor tablosu (E2)

**1 kişi, solo part-time:** hafta içi akşamları + hafta sonları. Gerçekçi kapasite: **sürdürülebilir ortalama 15–16 sa/hafta** (hastalık, iş krizi, motivasyon çukuru dahil edilmiş ortalama); **19–20 sa/hafta** tutturulursa 6 ayda ~500+ saat. **Akşam verim katsayısı 0,7–0,8 kabul edilir** — mesai sonrası seansın ilk 20–30 dakikası bağlam geri yüklemedir; plan bu katsayıyla yapılır, ideal saatle değil. Takvim "ay" ile değil **saat** ile konuşulur.

Revize efor planı (kalem bazlı Claude çarpanı işlenmiş; çarpan tanımları §18):

| Kalem | Saat | Claude çarpanı notu |
|---|---|---|
| Kurulum + iskelet + **1. hafta teknik doğrulama (§12.1)** | 15 | yüksek |
| Decal boyama sistemi | 55 | kod 2x; his ayarı + performans insan-saati (~1,3–1,5x efektif) |
| Shape-match + snap + 3 kapı | 27 | yüksek |
| Stroke-replay (sadeleşmiş + filtre/fallback, §12.3) | 20 | orta |
| Pusula + anomali | 10 | yüksek |
| Watcher (sayaç, minimal sicil, spawn, iz) | 22 | yüksek |
| Çizer yöneticisi + tell shader | 27 | shader denemeleri insan-saati |
| Soft-fail + kayıt zinciri + Eşik + exit save | 22 | save/load kenar durumları taşar |
| Menü/ayarlar/erişilebilirlik/string | 27 | yüksek |
| **Sistemler ara toplam** | **~225** | |
| Level design + graybox (120 dk'lık kritik yol) | 110 | çarpan DÜŞÜK — **en tehlikeli kalem** |
| Blender art pass (doktrinli, §9.1) | 90 | doktrinle gerçekçi; Watcher CC0 taban mesh + siluet |
| Ses (hazır kaynak + ninni mikro-gig) | 22 | orta |
| Anlatı içeriği (EN+TR) | 15 | çok yüksek (5–10x) |
| Playtest + cila | 50 | takvim-bağımlı, çarpan ~1x |
| Demo (playtest hunisi) + Steam sayfası + hafif pazarlama | 14 | yüksek |
| **TOPLAM** | **~526** | |

- **~526 saat ≈ 19–20 sa/haftada ~6,5 ay; 15–16 sa/haftada ~8 ay** → iki kademeli takvim (aşağıda) bu aralığı dürüstçe taşır.
- **Tampon satırı bilinçli olarak YOKTUR:** tampon, Kademe 2 esnekliğinin kendisi + kesim sırasıdır (§13.4). Ayrı bir yüzde tamponu, iki kademeli takvimin yaptığı işi ikinci kez yapar ve planı şişirir.

**İki kademeli takvim (E1 — dürüst çerçeve):**

- **Kademe 1 (TAAHHÜT): 6. ay sonunda content-complete + baştan sona oynanabilir oyun.**
- **Kademe 2: launch hedefi 6. ay** (~19–20 sa/hafta + §9.1 doktrini + §15 hafif pazarlama ile mümkün); tempo ~15 sa/haftada kalırsa **launch 7–8. aya kayar — bu başarısızlık değil, planlı ikinci kademedir.**
- **Hiçbir koşulda yapılmayacaklar:** oynanış süresini 2 saatin altına indirmek; USP zincirini (Çizer 3 perde + tell + stroke-replay) inceltmek.

### 13.3 Milestone planı (kümülatif saat) ve kontrol noktaları

| Kümülatif saat | İçerik |
|---|---|
| **0–80** | **Dikey dilim:** 1. hafta teknik doğrulamaları (§12.1) + decal + kapı + stroke-replay + Merkez kural-kırılma prototipi — en belirsiz işler en başta |
| **80–210** | 3 bölge graybox + Watcher/Çizer/soft-fail; **Steam sayfası + capsule bu pencerede açılır**; pencere sonunda **ilk dış playtest (graybox, 5–8 dış testçi)** |
| **210–240** | **Content-complete (graybox, 2 son)** ≈ ~4. ay — **Kademe 1 yolunda** işareti |
| **240–330** | **Art pass** (doktrinli §9.1, zaman kutulu; **kit-first, önce 2a** hedef kaliteye cilalanır, çıta oraya kalibre edilir) |
| **330–380** | Ses + demo |
| **380–526** | Playtest/telemetri + cila + lokalizasyon tamamlama + launch |

**200. saat hız kontrol noktası (E1 — bağlayıcı):** 200. saatte fiili ilerleme / plan oranı hesaplanır. **Oran < 0,8 ise kesim sırası (§13.4) OTOMATİK tetiklenir** — karar şimdi, bu satırda verilmiştir; kriz anında müzakere edilmez.

**Art pass kuralları:** zaman kutusu aşılmaz; kit-first, hero-last; önce TEK bölge (2a) hedef kaliteye cilalanır, diğer bölgeler o çıtaya çekilir. Çıta zamana sığmıyorsa çıta düşürülür (§13.4 madde 1), kutu genişletilmez.

### 13.4 Kesim sırası (E10) — kesim CİLA keser, dakika kesmez

Sıkışma halinde (200. saat tetiklemesi dahil) kesim şu sırayla yapılır:

1. **Art çıtası** — bölge başına kademeli düşürme (doktrin §9.1 zaten düşük başladı; ilk esneyen budur)
2. **2. Ruh Çarpışması sahnesi**
3. **Düşey set-piece dressing'i** — kot farkı ve aşağı bakış ANI KALIR, hero işçiliği gider
4. **Boya yaşlanması görsel katmanı** — yalnız solma kalır
5. **Soft-fail çarpıtması** (görüntü/ses cezasına düşürülür) — **geç aday: tema taşıyıcısıdır**
6. **Sicil** (yalnız final seçimi kalır) — **son çare: yargı temasının mekanik bedenidir**

**Kesilemez sınıfı:** oynanış dakikaları (opsiyonel döngü, kronolojinin 3. belgesi, bölge alanları), USP zinciri (Çizer 3 perde + tell'ler + stroke-replay), 2 son. **Süre hiçbir kesimle 2 saatin altına inemez — süre kısıtı kesim sırasından üstündür; gerekirse art cilası düşürülür, dakika düşürülmez.**

### 13.5 Kapsam disiplin kuralları

- **Launch sonrası içerik (§17) launch'tan önce TASARLANMAZ ve PROTOTİPLENMEZ** — yalnız liste olarak yaşar.
- Modüler kit disiplini: 6–8 prefab dışına bölge başına en çok 1–2 hero asset.
- Merkez'in scripted kural kırılmaları ve stroke-replay **ilk 80 saatlik dikey dilimde** prototiplenir.
- Süre doldurma amaçlı backtracking yasaktır; süre büyütme yalnız §7.2 büyütme kuralıyla yapılır.
- Kesim kararı verilirken §13.4 sırası dışına çıkılmaz; her kesim Ek A formatında günlüğe işlenir.
- Seans planlaması §18'deki seans-tipi eşleşmesine uyar; tükenmişlik kuralları (§18) kapsam kurallarından ÜSTÜNDÜR.

---

## 14. Playtest ve Telemetri

### 14.1 Ölçülecek metrikler

- **Kaybolma süresi:** landmark/işaret etkileşimi olmadan geçen süre dağılımı (bölge bazında).
- **Kapı deneme sayısı:** sembol-kapı başına başarısız çizim adedi ve pes etme oranı.
- **Soft-fail sıklığı** ve fail sonrası oturum terki.
- **Bölge tamamlama süreleri** (medyan ve %10–%90 aralığı) ve **toplam bitirme süresi**.
- Kırık kanıt etkileşimi tamamlama oranı; son dağılımı.

Playtest **graybox'la başlar (80–210 saat penceresinin sonunda, 5–8 dış testçi)**: shape-match toleransı, kaybolma süresi ve tell fark edilirliği erken veri ister; art pass beklenmez. **Demo, dış playtest hunisinin kendisidir** (§15). Telemetri karar metriğidir — pazarlama sayıları değil (E12).

### 14.2 Karara bağlı hipotezler

| Hipotez | Test | Karar eşiği |
|---|---|---|
| **Medyan bitirme süresi ≥ 120 dk** (fiyat-süre algısı + "eksik" algısına karşı; kritik yol zaten ~125–140 dk, §7.3) | Tamamlama süresi medyanı | Medyan < 120 dk ise §7.2 büyütme kuralı uygulanır (döngü + metin katmanı); **backtracking eklenmez** |
| 4 renk yeterli | Renk sayısı **A/B (4 vs 6)**; mimari hazır | Oyuncular 6 renkte anlamlı ek notasyon geliştiriyorsa 6'ya dönülür (maliyet 1–2 gün) |
| %70 shape-match toleransı doğru | Kapı deneme sayısı + pes oranı | Medyan deneme > 4 veya pes > %5 ise tolerans gevşetilir / ipucu N'i düşürülür |
| Kaybolma "eğlenceli", çaresizlik değil | Kaybolma süresi dağılımı + anket | Uzun kuyruk büyükse 60 sn kuralı ihlalleri taranır, landmark yoğunluğu artırılır |
| Soft-fail "emeğim çöpe gitti" hissi üretmiyor | Fail sonrası oturum terki + anket | Terk artıyorsa A5 dozu aşağı çekilir (2–3 → 1–2 işaret) |
| 2. saat monoton değil | Bölge bazlı terk + anket ("hangi noktada sıkıldın") | Orta bölüm sarkıyorsa §7.7 tempo vanası (Çizer yoğunluğu) ayarlanır — yeni içerik eklenmez |

---

## 15. Pazarlama Planı — "hafif plan" (E12)

Oyun sahibi gelir odaklı değildir; pazarlama motivasyon ve kimlik hijyeni düzeyine iner. **Takvimi pazarlama değil üretim yönetir.**

**Kalan (kimlik hijyeni + huni):**

- **Fiyat: $2.99** (savunma §2.2; ilk yıl indirim disiplini dahil).
- **Demo = dış playtest hunisi.** İçerik: 2a kesiti + bir manyetik ölü nokta + bir sembol-kapı; **Çizer'in oyuncunun işaretini taklit ettiği İLK anla biter** → cliffhanger. Ayrı build lüksü minimal tutulur.
- **Tek fragman + ilk-10-saniye kuralı:** ilk 10 saniyede Çizer taklit anı; estetik değil mekanik satılır.
- **Haunted PS1 Demo Disc** başvurusu.
- **Ayda 1 devlog** (motivasyon + topluluk; haftalık dilim yoktur).
- **"Backrooms" yasağı** (§2.3), **içerik uyarısı** (§3.9), **dürüst mağaza sayfası**: süre bandı, "jumpscare içermez" güvencesi ve **"klavye + fare için tasarlandı"** ibaresi açıkça yazılır.

**Kesilen:** basın kiti, showcase turları, fiyat izleme, haftalık pazarlama dilimi.

**Kurallar:**

- **Wishlist karar metriği DEĞİLDİR.** Sayı hedefi konmaz; karar metrikleri tasarım telemetrisidir (medyan süre, pes oranı — §14).
- **Next Fest takvimi YÖNETMEZ:** üretim penceresine denk gelirse katılınır ("denk gelirse" opsiyonu); deadline disiplini işlevini 200. saat kontrol noktası (§13.3) devralır.
- Steam sayfası 80–210 saat penceresinde açılır (§13.3); final isim + capsule ondan önce kesinleşir (§0).

---

## 16. Riskler ve Azaltımlar (part-time bağlam)

| # | Risk | Azaltım |
|---|---|---|
| 1 | **Part-time tükenmişlik / day-job çakışması** — mesai sonrası yorgun seanslar, iş krizi haftaları, motivasyon çukuru; solo'da tek kör bakış açısıyla birleşir | E1 kuralları bağlayıcıdır: **haftada ≥ 1 tam gün oyuna dokunmama; art arda 2 hafta plan gerisindeyse kesim değil MOLA önce değerlendirilir** (§18); akşam verim katsayısı 0,7–0,8 plana baştan işlenmiştir; **iki kademeli takvim** "geç kalma"yı plana çevirir (Kademe 2); **200. saat kontrol noktası** karar yükünü kriz anından bugüne taşır; kesim sırası (§13.4) önceden yazılıdır; dış playtest graybox'ta başlar — kör nokta panzehiri |
| 2 | **Anlaşılmadan kabul edilen AI kodu = teknik borç** — Claude hızı, okunmamış kodun birikmesine dönüşürse hata ayıklama maliyeti sona yığılır | §18 kuralları bağlayıcıdır: üretilen kod okunmadan commit edilmez; küçük commit'ler; **her sisteme GUT/unit test zorunlu** (kod gözden geçiren yok — test, ikinci göz); kör kopyala-yapıştır yasak; Godot sürümü pinli, şüphede resmi doküman |
| 3 | **Level design + art'ın Claude çarpanı düşük** — plan iki en büyük kalemde (110 + 90 saat) AI hızlanmasına yaslanamaz; part-time'da en kolay taşan işler bunlar | **"Beton zaten graybox'tır" doktrini** (§9.1) art hedefini baştan düşürür; level+Blender işleri hafta sonu derin iş bloklarına planlanır (§18); taşma halinde Kademe 2 + kesim sırası madde 1 (art çıtası) devreye girer — dakika değil cila esner |
| 4 | **"Bir liminal oyun daha" algısı** | "Backrooms" kelime yasağı; USP fragmanın ilk 10 sn'sinde; brütalist devasalık kimliği; PSX'e değil mekaniğe yaslanan iletişim |
| 5 | **"Sinir bozucu kaybolma" incelemeleri** | Sabotaj dönüşüm kuralı (§7.5) + araç güven ritmi çizelgesi (§7.7); üç katmanlı oryantasyon; 60 sn kuralı; A5 doz tavanları; kaybolma süresi telemetrisi |
| 6 | **Fiyat-süre cezası** ("X saat / Y dolar" inceleme kalıbı) | **$2.99 + minimum 2 saat** bu kalıbı yapısal olarak öldürür (§2.2); kritik yol ≥ 120 dk mimariyle garanti edilir (§7.3); **medyan ≥ 120 dk hipotezi** telemetriyle doğrulanır (§14.2); boşluk döngü + metin katmanıyla kapatılır, backtracking'le değil |
| 7 | **2. saatte monotonluk** — süre uzayınca tek mekaniğin yorması | §7.7 monotonluk paketi (6 madde, sıfıra yakın maliyet); tempo vanası hipotezi (§14.2); USP tırmanışı üç perdeye yayılıdır |
| 8 | **Sembol-kapı sürtünmesi** — "bulmacasız saf atmosfer" bekleyen kitleyle çatışma | A6 tavanı (bölgede 1, toplam 3, ≤ 2–3 dk, cezasız deneme, N=3 ipucu, snap); demoya bir kapı konarak kitlenin kendini filtrelemesi; tolerans hipotezi (§14.2) |
| 9 | **Merkez kural kırılmaları + stroke-replay teknik belirsizliği** | İlk 80 saatlik dikey dilim + 1. hafta doğrulama listesi (§12.1); prototip başarısızsa numara seti sadeleştirilir — bölge kesilmez; stroke-replay'in fallback'i (§12.3) tek başına riski düşürür |
| 10 | **Kapsam sürünmesi (part-time'da iki kat ölümcül)** | §13.5 disiplin kuralları; §17 içeriği launch öncesi tasarlanmaz/prototiplenmez; her ekleme dört sütun + saat bütçesi testinden geçer |

İkincil izleme: soft-fail rage-quit (A5 + §14.2), PSX trend yorgunluğu (risk 4 ile aynı hat), sicil okunmazlığı (3 sinyal / 2 kova sadeliği + kova değişiminde tek okunur tepki), renderer/decal kararının gecikmesi (1. hafta listesi §12.1 bunu yapısal olarak önler).

---

## 17. Launch Sonrası Genişleme Yol Haritası

Bu bölüm **ertelenenleri** listeler — tasarım gereği reddedilenler değildir (onlar Ek B'dedir; iki liste karıştırılmaz). **Bağlayıcı kural: buradaki hiçbir içerik launch'tan önce tasarlanmaz ve prototiplenmez; liste olarak yaşar.** Her madde: neden ertelendi + hangi altyapı şimdiden hazır.

| Sıra | Genişleme | Neden ertelendi | Hazır altyapı |
|---|---|---|---|
| **1** | **Steam Deck + gamepad temel eşlemesi** (Steam Input profili, snap varsayılan açık, Deck doğrulaması) | Çizim mekaniği fare-öncelikli; part-time bütçede ikinci girdi yolunun test yüzeyi launch'a sığmaz. Liminal kitlede Deck anlamlı olduğundan **1. sıradadır** | InputMap action soyutlaması (§4.7) — hiçbir girdi hardcode değil; dönüş günler mertebesinde. 1080p/60 bütçesi ve okunabilir metin boyutu şimdiden Deck gözetir |
| 2 | **Watcher boynuz varyasyonu** (sicil kovasına bağlı siluet blend'i) | Blender blend-shape + LOD işi; launch'ta kova farkı mesafe + ses + iz yönelimiyle taşınıyor (§5.1) | Sicil kovası ve beliriş sistemi parametreyi almaya hazır; tek model mimarisi değişmez |
| 3 | **Ekran kenarı yön imleri** (işitme erişilebilirliği genişlemesi) | Altyazılar launch'ta ihtiyacı karşılar; yön imi ayrı render katmanı + test ister | Ses olayları merkezi event bus'tan geçer; im katmanı tek dinleyicidir |
| 4 | **Dış besteci süreci** (ninni mikro-gig'in ötesinde ısmarlama skor) | Brief/revizyon/sözleşme yönetimi part-time'da yönetim yüküdür; hazır lisans + mikro-gig launch'ı taşır (§10.5) | Ninni motifi tema olarak yerleşik; müzik anları (Kırık + final) sahnelenmiş durumda |
| 5 | **Rezervuar bölge paketi** (düşey su bölgesi) | Dördüncü bölge part-time saat bütçesini taşırır | Modüler kit + hücre streaming bölge eklemeye göre tasarlandı; düşey set-piece diliyle 2b'de deneyim kazanıldı |
| 6 | **Fosforlu 5. renk + karanlık kılcallar** | Ödül rengi, bağlı olduğu karanlık bölge tasarımıyla (Rezervuar) birlikte anlamlı | 1–6 tuş rezervi + renk-agnostik decal mimarisi; geri ekleme ≈ 1–2 gün |
| 7 | **Bekçi adlı kapılar** (Duat metin katmanı) | Ek lore-metin ve kapı sahneleme işi 3 kapılı akışın dışında | Sembol-kapı sistemi ve damga/duvar-yazısı boru hattı metin katmanını taşıyabilir |
| 8 | **Batık Ofis Semti** | Bölge işlevleri 2b'ye ve sessizlik beat'ine emildi | Pusula anomali sistemi, kronoloji akışı ve portal culling canlıda |
| 9 | **Üçgenleme bulmacası** | Opsiyonel bulmaca katmanı "tek zorunlu bulmaca" disiplinine borç ekler | Pusula doğrultu verisi + boyayla çizgi çekme mevcut |
| 10 | **İs lekesi ley hattı navigasyonu** | Labirent geneli gizli katman ancak daha büyük haritada değer üretir | Ruh Çarpışması varlıkları ve scripted is lekesi ipuçları canlıda |
| 11 | **Watcher bakışma mekaniği (+ pusula ürpertisi)** | Cila çözümüdür; spawn koreografisi + iz bırakma launch korkusunu taşır | Yalnızlık sayacı ve spawn sistemi bakış-tepki kancasına hazır |
| 12 | **Çizer davranış bayrakları (küsme/öfke)** | Üç perdenin okunurluğu playtest'te kanıtlanmadan eklenmez | Çizer yöneticisi singleton'ı ve müdahale olay kancaları (§4.3) mevcut |
| 13 | **"İp" gizli sonu (vekâlet)** | Üçüncü son yeni fiiller ister; launch iki sonun netliğiyle çıkar | Sonlar tek mekanik + tek sahne varyasyonu mimarisinde; Çizer'in eski dürüst işaretleri lore'da yerleşik |
| 14 | **Tam damga sözlüğü + yan vaka kronolojileri** | Metin hacmi launch anlatı bütçesinin (15 saat) dışında | Damga-lite sembol seti ve string tablosu genişlemeye açık |
| 15 | **Ek diller (ZH-Hans, JP, PT-BR...)** | Çeviri+QA maliyeti launch sonrası gelire bağlı | String tablosu + decal-metin duvar yazıları: asset yeniden üretimi gerekmez |
| 16 | **Hard mode (sınırlı boya)** | Zorluk varyantı temel dengeleme oturmadan tasarlanamaz | Decal sistemi darbe sayımı tutuyor; sınır tek parametre |
| 17 | **Gamepad cilası** (gyro ince ayar, radyal renk menüsü) | 1. sıradaki temel eşleme bile launch sonrası; cilası onunla birlikte anlamlı | Steam Input katmanı ve yeniden atanabilir tuş mimarisi |

---

## 18. Claude-Destekli Geliştirme ve Part-Time Protokolü (E9 + C8)

Bu bölüm, "yoğun Claude desteği" varsayımını ölçülebilir kurallara bağlar. İki amaç: (1) efor tablosundaki (§13.2) çarpanların dayanağını yazmak, (2) AI hızının teknik borca ve part-time temposunun tükenmişliğe dönüşmesini yapısal olarak engellemek.

### 18.1 Kalem bazlı Claude çarpanı tablosu

Çarpan tek battaniye "2x" DEĞİLDİR; kalem bazlıdır ve §13.2 saatlerine işlenmiştir:

| Çarpan | Kalemler |
|---|---|
| **5–10x** | Anlatı metni, string tablosu/lokalizasyon (EN+TR), bpy otomasyon scriptleri (atlas, LOD, export), test iskeleleri, devlog/mağaza metinleri |
| **~2x** | Boilerplate sistem kodu (GDScript: sayaçlar, sicil, kayıt), menü/ayarlar, editör araçları (kit yerleştirme, decal debug), hata ayıklama eşliği |
| **~1,3–1,5x** | Motor entegrasyonu, his ayarı (sprey eğrisi), shader denemeleri (PSX/tell) — Claude yol gösterir, deneme insan-saatidir |
| **~1x** | Level yerleşimi, playtest gözlemi, tolerans/doz ayarı, sanat yönü zevk kararları, elle modelleme |

Plan sonucu: en büyük iki kalem (level 110 + art 90 saat) en düşük çarpan sınıfındadır — bu, §16 risk 3'ün kaynağıdır ve doktrinle (§9.1) dengelenir.

### 18.2 Çalışma kuralları (bağlayıcı)

1. **Üretilen kod okunmadan commit edilmez** — anlaşılmayan satır sorulur veya yeniden yazdırılır; kör kopyala-yapıştır YASAKTIR.
2. **Küçük commit'ler:** her seans en az bir, tercihen birkaç odaklı commit; büyük "akşam sonu yığını" yasak.
3. **Sistem spec'leri bu GDD'den türetilir:** her sisteme 1 sayfalık spec (girdi/çıktı/sayısal kurallar) Claude'a verilir; GDD, spec'lerin tek kaynağıdır — Claude'un "hatırladığı" tasarım geçersizdir.
4. **Test disiplini (zorunlu):** kod gözden geçiren ikinci kişi yok → **her sisteme Claude'a GUT/unit test yazdırılır**; sayısal kurallar (tolerans %70, doz 2–3, tavan 1000, spam 5–10 m) test edilebilir sabitlerdir.
5. **Seans-açılış ritüeli:** her akşam seansı Claude'dan "dün nerede kaldık" **state-recap** ile açılır — akşam veriminin kaybolan ilk 20–30 dakikasını kısaltmanın en ucuz yolu.
6. **Godot sürüm sabitleme:** proje sürümü pinlenir; Claude, Godot 4.x API kaymaları yaşayabilir — şüphede resmi doküman esastır.
7. Haftalık kısa "kod temizliği" seansı: o haftanın üretimi Claude ile birlikte okunur, ölü kod ve kopya mantık ayıklanır.

### 18.3 Seans-tipi eşleşmesi (E1 — kural)

- **Akşam seansları (verim katsayısı 0,7–0,8):** Claude-destekli **dar kapsamlı** işler — tek sistem üzerinde kod, string/metin üretimi, bpy scripti, test yazımı, hata ayıklama. Akşama derin tasarım işi planlamak plan hatasıdır.
- **Hafta sonu blokları:** bölünmez **derin iş** — level design ve Blender modelleme (en düşük çarpanlı, en yüksek konsantrasyon isteyen kalemler).

### 18.4 Tükenmişlik kuralları (E1 — kapsam kurallarından üstün)

- **Haftada en az 1 tam gün oyuna DOKUNULMAZ** (Claude'a da sorulmaz).
- **Art arda 2 hafta plan gerisinde kalındıysa önce MOLA değerlendirilir, kesim değil** — yorgun kafayla verilen kesim kararı, iki kademeli takvimin çözdüğü sorunu yeniden yaratır.
- 200. saat kontrol noktası (§13.3) bu kuralların sayısal bekçisidir: tempo gerçeği planla orada yüzleşir.

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

### v1.1 → v2.0 solo kapsam sapmaları (korunan tarihçe)

| ⚠️ | Orijinal (v1.1) | v2.0 | Gerekçe | Geri dönüş yolu |
|---|---|---|---|---|
| ⚠️ **Süre** | 3–4 saat | **1,5–2 saat** | Solo üretim bütçesi + Exit 8 / Complex FF kanıtı: kısa+net USP sulanmaz; içerik şişirmek en riskli seçenekti | Medyan < 100 dk çıkarsa opsiyonel döngü genişletilir; Rezervuar paketi (§17) süreyi büyütür |
| ⚠️ **Fiyat** | $9.99 | **$5.99** | Fiyat-süre uyumu (Anemoiapolis dersi); $4.99 klon bandı sinyal hatası olurdu | İçerik genişlemeleriyle (§17) fiyat yukarı revize edilebilir; launch bandı sabittir |
| ⚠️ **Bölge sayısı** | 5 bölge | **3 bölge** (Sığlık 2a/2b alt bölgeli; Batık Ofis + Rezervuar ertelendi) | Level design + art pass solo'da en pahalı kalemler; Batık Ofis işlevleri 2b'ye ve sessizlik beat'ine emildi | Bölgeler §17 paketleri olarak dönebilir; kit + streaming mimarisi bölge eklemeye açık |
| ⚠️ **Renk** | 4+1 (fosforlu progresyon ödülü) | **4 sabit** | Fosforlu, kesilen karanlık bölge tasarımına bağlıydı; tek başına ölü içerik | 1–6 rezervi + renk-agnostik decal; ekleme ≈ 1–2 gün (§17) |
| ⚠️ **Sembol-kapı** | 4 kapı | **3 kapı** (öğretim, 2a→2b, 2b→Merkez) | Bölge sayısıyla orantı; A6 "bölge başına 1" tavanı 2a/2b bölünmesiyle korunur | Marjinal maliyet içerik (~1–2 gün/kapı); yeni bölge = yeni kapı |
| ⚠️ **Sicil** | 5 sinyal / 3 kova | **3 sinyal / 2 kova** (dürüst varsayılan / sahteci); "sahte damgası" fiili kalır, sicil etkisi kalkar | Az sinyal = okunur sistem + az test yüzeyi; korku türü/miktarı ilkesi aynen taşınır | Sinyal tablosuna satır eklemek ucuz; 3. kova (nötr) tek eşik parametresi |
| ⚠️ **Ekip / takvim** | 2–3 kişi, 12–18 ay | **Solo, 9 ay hedef / 12 ay taahhüt** (tam zamanlı) | Oyun sahibinin kararı; kapsam bu kısıta göre yeniden kesildi, tersi değil | Gelir dış kaynak alımına izin verirse §17 paketleri ekiple hızlanır |

### v2.0 → v3.0 part-time sapmaları (E13)

| ⚠️ | Orijinal (v2.0) | v3.0 | Gerekçe | Geri dönüş yolu |
|---|---|---|---|---|
| ⚠️ **Süre hedefi** | 1,5–2 saat; medyan ≥ 100 dk | **Minimum 2 saat; kritik yol ~125–140 dk; medyan hipotezi ≥ 120 dk** | Oyun sahibinin kesin alt sınırı; kritik yolun kendisi 120 dk'nın üstüne bütçelenerek hipotez kaybolma payına yaslanmaktan çıkarıldı (E3) | Yok — süre kısıtı kesim sırasından üstündür; hiçbir kesim 2 saatin altına inemez (E10) |
| ⚠️ **Fiyat** | $5.99 | **$2.99** | Sahibin $2–3 bandı + 2+ saat @ $2.99'un fiyat-süre riskini öldürmesi; $1.99 asset-flip sinyali olduğundan bandın üstü seçildi; ilk yıl indirim en çok −%10 (−%33 = $1.99 bandı) | **$3.99 opsiyonu bu notta durur, izlenmez:** demo/playtest algısı "fiyatın düşük" derse launch'ta $3.99 hâlâ Exit 8 bandının altındadır |
| ⚠️ **Takvim** | 9 ay hedef / 12 ay taahhüt, tam zamanlı, hafta bazlı plan + %15 tampon | **~526 saatlik plan, part-time (akşam+hafta sonu), iki kademeli takvim** (Kademe 1: 6. ayda content-complete taahhüdü; Kademe 2: launch 6. ay hedef, ~15 sa/haftada 7–8. ay); tampon satırı yok — tampon = Kademe 2 + kesim sırası | Sahibi hafta içi 08–18 çalışan mühendis; "ay" yerine "saat" konuşmak tek dürüst plan birimidir; 200. saat kontrol noktası tempo gerçeğiyle erken yüzleştirir (E1/E2) | Hayat koşulları değişirse (tam gün geliştirme) aynı saat planı sıkışık takvime çevrilir; plan saat-bazlı olduğundan dönüşüm birebirdir |
| ⚠️ **Gamepad** | Temel Steam Input eşlemesi [MVP], snap varsayılan açık | **Launch girdisi yalnız klavye + fare; gamepad + Steam Deck §17'de 1. sıra** | Çizim mekaniği fare-öncelikli; ikinci girdi yolunun test yüzeyi part-time bütçeye sığmaz (C6); mağaza dürüstlüğü ("klavye + fare için tasarlandı") beklentiyi yönetir | InputMap action soyutlaması korunur — hiçbir girdi hardcode değil; §17 dönüşü günler mertebesinde (E7) |
| ⚠️ **Watcher boynuz varyasyonu** | Sicil kovasına bağlı tek siluet blend parametresi [MVP] | **Kesildi → §17**; ikame: sahteci kovada ıslak ayak izleri oyuncuya DOĞRU yönelir (iz yönelimi) | Blender blend-shape + LOD işi part-time art bütçesinde pahalı; iz yönelimi mevcut decal sistemiyle sıfıra yakın maliyetle "korku türü değişir" ilkesini taşır (E6) | Sicil kovası parametreyi almaya hazır; §17 sıra 2 — model mimarisi değişmeden eklenebilir |
| ⚠️ **Müzik** | Dış besteci/hazır lisans; erken sözleşme şartı | **Tamamen hazır lisans + ninni motifi mikro-gig sabit fiyat sipariş (~$100–300, 60 sn + 2 varyant); lisans hijyeni zorunlu (oyun-gömme + Content ID'siz)** | Besteci süreci (brief/revizyon/sözleşme) part-time'da yönetim yüküdür; tek melodik tema mikro-gig ile alınır; Content ID'li parça korku yayıncısı kitlesinde kendi pazarlamayı vurur (E8/C7) | Dış besteci süreci §17 sıra 4; ninni teması yerleşik olduğundan ısmarlama skor üstüne inşa edilir |
| ⚠️ **Pazarlama** | Haftalık %10–15 dilim; wishlist sayı hedefleri (2.000 / 5.000+); Next Fest'ten geriye kurulan takvim; basın kiti + showcase turları | **Hafif plan:** ayda 1 devlog; wishlist karar metriği değil; Next Fest "denk gelirse"; basın kiti/showcase/fiyat izleme kesildi; kalan = Haunted PS1 Demo Disc + tek fragman (ilk-10-sn kuralı) + dürüst sayfa; demo = dış playtest hunisi | Sahip gelir odaklı değil; pazarlama saatleri üretime döner; deadline disiplini işlevini 200. saat kontrol noktası devralır (E12) | Oyun beklenmedik ilgi görürse hafif plan launch sonrası genişletilir; fragman/demo/sayfa altyapısı hazırdır |

---

## Ek B — Kalıcı Kesikler [Kesildi]

Bu liste **tasarım gereği ASLA girmeyecekleri** içerir. Ertelenenler §17'dedir; **iki liste karıştırılmaz.**

| Kesilen | Tek cümlelik gerekçe |
|---|---|
| Jumpscare, kovalama, saldırı, Watcher pathfinding AI | Jumpscare'siz vaat markanın kendisidir; spawn koreografisi aynı korkuyu sıfır AI maliyetiyle verir. |
| Sprey kutusu / boya mermisi ekonomisi | Tehditsiz oyunda kaynak ekonomisi angaryadır; gerginlik kıtlıktan değil güvenden üretilir. |
| Şablon/stencil ve yazı tanıma | Sprey sisteminin kapsamını şişirir, notasyon özgürlüğüne bir şey katmaz. |
| Darbe sınıflandırma / stil analizi (stroke-replay içinde) | Verbatim replay aynı korkuyu üretir; sınıflandırma katmanı maliyet ekler, etki eklemez (E5). |
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
| Süre doldurma amaçlı backtracking | Açık yasak: süre boşluğu içerikle (döngü + metin katmanı) kapatılır, angaryayla değil. |
| Stamina | Devasa mekânda stamina angaryadır; koşma serbesttir. |

---

*— GDD sonu. Versiyon 3.0 — Part-Time Solo Sürüm, Eylül 2026. v1.1 (geniş kapsam) ve v2.0 (tam zamanlı solo) git geçmişindedir.*
