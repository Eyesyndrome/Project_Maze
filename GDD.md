# PROJECT MAZE — Oyun Tasarım Dokümanı (GDD)

---

## 0. Kapak

| | |
|---|---|
| **Çalışma adı** | Project Maze |
| **Final isim adayları** | 1) **WAYMARK** — ana mekaniği (yol işaretleme) tek kelimede satar, telaffuzu evrensel. 2) **ASTERION** — Watcher'ın gerçek adı; mitolojik ağırlık, "adlandırma = güç" temasıyla örtüşür. 3) **THE UNDRAWN** — Çizer'i ve "henüz çizilmemiş işaret" korkusunu ima eder. Final isim + capsule art kararı demo takviminden önce verilir (bkz. A15). |
| **Tek cümlelik pitch (USP)** | "Labirentte yolunu sprey boyayla işaretliyorsun — ama içerideki bir şey senin işaretlerini taklit ediyor." |
| **Versiyon** | 1.0 — Final Taslak |
| **Tarih** | Eylül 2026 |
| **Hazırlayan notu** | Bu doküman; pazar araştırması, lore araştırması, sistem/level tasarım analizi, yönetici karar seti ve denetim sonrası final karar setinin (A1–A16) sentezidir. Karar dili kesindir; alternatifler ve gerekçeler Ek A'daki Karar Günlüğü'ne taşınmıştır. Dahili dokümandır: spoiler içerir. |

---

## 1. Vizyon ve Künye

### 1.1 Elevator pitch

Emekli bir polis memuru, otuz yıl önce sustuğu bir gecenin enkazında uyanır: sisle dolu, sonsuz bir beton labirentin içinde, devrilmiş devriye arabasının yanında. Elindeki tek araç, olay yeri işaretleme spreyi ve arabanın pusulasıdır. Yolunu duvarlara boyayarak bulur — ta ki bir şey, onun işaretlerini onun el yazısıyla taklit etmeye başlayana kadar. Bu labirentten kaçılmaz; bu labirentte **yargılanılır**.

### 1.2 Künye

| Alan | Karar |
|---|---|
| Tür | Atmosferik liminal keşif / psikolojik korku (birinci şahıs) |
| Platform | PC (Steam) + **Steam Deck doğrulaması** hedef; konsol launch sonrası |
| Motor | **Godot 4** (kesin karar — ücretsiz, hazır PSX görsel eklentileri, küçük ekip dostu; bkz. A1) |
| Hedef süre | **3–4 saat** ana deneyim (Steam sayfasında süre vaadi opsiyonel tutulur) |
| Fiyat | **$9.99** |
| Ekip | 2–3 kişi, 12–18 ay |
| Hedef kitle | POOLS / The Complex: Expedition / Mouthwashing oyuncusu; jumpscare istemeyen, atmosfer ve ortam anlatımı seven, PSX estetiğine sıcak bakan 18+ oyuncu; Twitch/YouTube korku yayıncıları ikincil kitle |
| Duygu hedefi | **Devasalık, tekinsizlik, izolasyon.** Klostrofobi değil sonsuzluk; panik değil huzursuzluk. **Jumpscare YOKTUR.** |
| İçerik uyarısı | Kayıp kişi vakası ve polis örtbası temaları (bkz. A15; ayrıntı §3.9) |

### 1.3 Tasarım sütunları

Her özellik, ekleme önerisi ve kesim tartışması bu dört sütuna karşı sınanır. Bir özellik en az bir sütunu güçlendirmiyorsa GDD'ye girmez.

1. **Boya senin el yazındır.** Oyuncunun labirentteki tek kalıcı izi kendi işaretleridir; oyun bu işaretlere duyulan güveni inşa eder ve sonra sarsar. Bilgiye saldırılır, oyuncuya saldırılmaz.
2. **Devasalık, kalabalık değil.** Ölçek; siluet, ses ve kontrastla satılır. Labirent boş, sessiz ve kayıtsızdır — korku, tehditten değil kayıtsızlıktan doğar.
3. **Her şey diegetik.** HUD yok, harita ekranı yok, sanity barı yok. Pusula eldedir, kayıt telefon ahizesidir, korku ölçer oyuncunun vicdanıdır.
4. **Labirent bir mahkemedir.** Her sistem (Watcher, Çizer, Kırıklar, sonlar) tek temaya hizmet eder: yargılanmamış suç ve susan tanık. Ton bireysel vicdandır, kurumsal suç draması değildir.

### 1.4 Bu oyun ne DEĞİLDİR

- **Backrooms oyunu değildir** (bu kelime pazarlamada da geçmez, §2.3).
- **Jumpscare korkusu değildir** — hiçbir varlık oyuncuya saldırmaz, kovalamaz, ekrana atlama yoktur.
- **Kaynak yönetimi / hayatta kalma oyunu değildir** — boya sınırsızdır, can/stamina/açlık yoktur.
- **Bulmaca oyunu değildir** — kritik yolda tek zorunlu bulmaca türü vardır (sembol-kapı, §4.4); geri kalan her bulmaca opsiyoneldir.
- **Prosedürel sonsuz labirent değildir** — el yapımıdır; her koridor yazarlıkla yerleştirilmiştir.
- **Yürüyüş simülatörü de değildir** — 4 halkalı loop'un "Oku/Yorumla" halkası oyuncudan sürekli aktif akıl yürütme ister.

---

## 2. Pazar Konumlandırması

### 2.1 Rakip tablosu özeti

| Oyun | Fiyat | Süre | Steam | Bizim için dersi |
|---|---|---|---|---|
| POOLS | ~$13–16 | 3–5 sa | ~%95 (3.400+) | Jumpscare'siz saf atmosfer ticari olarak çalışıyor |
| The Exit 8 | $3.99 | ~1 sa | %93 (10.000+) | Mikro kapsam + net tek mekanik = 2M satış; "tek cümlelik mekanik" şart |
| The Complex: Expedition | $14.99 | 3–4 sa | %89 (~2.400) | En yakın öncül; labirentte kaybolmaya talep var |
| Anemoiapolis Ch.1 | $8.99 | ~2 sa | %81 | Fiyat-süre-içerik uyumsuzluğu puanı %80'lere düşürür |
| Mouthwashing | $12.99 | kısa | %95 (24.600+) | PSX + güçlü anlatı, kısa oyunu hite çevirir |
| Superliminal | $19.99 | ~3 sa | %94–95 | Pazarlamada anında anlaşılan "kavram" fiyatı taşır |

### 2.2 Konumlandırma cümlesi

> **"Korkutmaz, huzursuz eder":** sisli beton sonsuzlukta diegetik navigasyon araçlarıyla kaybolma — ve o araçlara sızan bir taklitçi. Türün ana şikâyetine (çaresiz kaybolma) araç verir; türün ana klişesine (dar sarı koridor) devasa brütalizmle ters oynar.

### 2.3 "Backrooms" kelimesi yasağı

Backrooms markası jenerikleşti; "8-like" furyası doygun. Steam etiketlerinde, mağaza metninde, basın kitinde ve sosyal medyada **"Backrooms" kelimesi kullanılmaz**. Kullanılan etiketler: "liminal", "atmosferik", "psikolojik korku", "keşif", "PSX/retro".

### 2.4 USP'nin pazarlanması

- Fragmanın **ilk 10 saniyesi** Çizer'in taklit anını gösterir (A15) — estetik değil mekanik USP satılır (PSX trend yorgunluğuna karşı).
- Çizer'in yayıncıyı kandırdığı anlar klip kanalının doğal yakıtıdır; tell'ler tutorial'da anlatılmaz ki topluluk "tell listesi" tartışsın (bedava pazarlama).
- Ayrıntılı plan §15'te.

---

## 3. Hikaye ve Evren

### 3.1 Yutan Labirent — evren kural seti

1. **Labirent bir süreçtir** — dünyanın sindirim sistemi. Her kültür onu kendi ölüm-sonrası mimarisiyle gördü; hepsi aynı tek yapının gölgeleridir.
2. **Labirent kötülüğü değil, YARGILANMAMIŞ kötülüğü yer.** Vicdanın taşıyamayacağı bir şey tanıksız kaldığında o mekân "sindirilememiş lokma" olur ve yutulur. Beton koridorlar, yutulan mekânların arasını dolduran yara dokusudur.
3. **Gerçeklik Kırıkları:** yutulan mekânlar tam sindirilmez; suçun tanığı olabilecek nesneler korunur (telefon kulübesi = yapılmamış ihbar; ofis masası = imzalanmış sahte tutanak). Her Kırık çözülmemiş bir dosyadır.
4. **Giriş eşiktendir, kapıdan değil.** Yargılanmamış bir suçla bağı olan kişi (fail, tanık, örtbas eden) yanlış köşeyi döner ve koridor bitmez.
5. **Çıkış duruşma tamamlanarak olur.** Oyuncu merkeze bir hakikat bırakmadan çıkamaz. Yalanla da "çıkılabilir" — bedeli vardır (§3.8, Ağır Kalp).

### 3.2 90'lar vakası — kanıt zinciri

Hikâyenin çekirdeği: 1990'larda küçük bir kasabada bir **kayıp kişi vakası örtbas edildi**. İhbara giden devriye arabası "kaza yaptı", dosya kapandı. Tanıksız kalan gece parça parça yutuldu: yol, devriye arabası, telefon kulübesi, karakol arşiv odası, kayıp kişinin son görüldüğü mekânlar. **Oyundaki TÜM Gerçeklik Kırıkları bu tek gecenin kanıt zinciridir.** Oyuncunun araçları o arabadan gelir: sprey, olay yeri işaretleme boyasıdır; pusula, araç ekipmanıdır. Labirent oyuncuya delil çantasını **iade eder** — oyuncu duruşmanın atanmış görevlisidir.

### 3.3 Oyuncu karakteri — susan memur

O geceki genç devriye memuru; bugün yaşlanmıştır. Örtbası görmüş, susmuştur.

- **Yargılanan bizzat oyuncudur.** Watcher'ın bakışı bir suçlamadır: "saldırmıyor, çünkü beni tartıyor."
- Araçlar "bulunan eşya" değil **"iade edilen zimmet"**tir; oyuncu arabayı tanır — açılış organiktir.
- **Sessizdir ve bu karakterin ta kendisidir**: bir ömür susmuş adam (sesli diyalog yok = bütçe + tema örtüşmesi).
- Mısır paraleli: Negatif İtiraf'ı ("görmedim, duymadım") otuz yıldır ezbere okuyan adam; oyun, bu itirafın çözülüşüdür.
- Polis geçmişi hafif bulmaca meşruiyeti verir: telsiz kodları, plakalar, dosya numaraları okunabilir.

### 3.4 The Watcher — Asterion, kalp tartıcısı

Canavar değil; **ilk yutulan kurbandır**. Doğduğu için suçlanan, yargılanmadan gömülen ilk varlık (Minotor'un gerçek adı Asterion, "yıldızlı olan"). Labirent onu sindirmek yerine görevlendirdi: Ammit ile 42 yargıcın birleşimi, **sessiz kalp tartıcısı**. Saldırmaz; tartar. Belirme mesafesi ve silueti oyuncunun dürüstlük siciline bağlıdır (§5.1) — HUD yok; korku ölçer = vicdan ölçer. Finalde tek kez oyuncunun gerçek adını duvara yazar. Merkezdeki odası taht odası değil, **çocuk odasıdır** (§7.6).

### 3.5 Bilinmeyen Çizer — kıdemli ortak

Daidalos arketipi (labirenti bilen ama kurtulamayan): Çizer, **o gece arabadaki kıdemli ortaktır**. Otuz yıl önce yutuldu; ilk yıllarda dürüst işaretler çizdi (derin katmanlardaki soluk, doğru işaretler hâlâ onundur). Duruşmasından kaçtıkça merkeze katlandı; şimdi Watcher'ın dikkatini başka birine çekerse salıverileceğine inanıyor. Sahte işaretleri kötülük değil **umutsuzluğun el yazısıdır**: dikkatli bakan, çizgilerin titrediğini, bazılarının yarım silindiğini görür (pişmanlık). Oyuncunun karanlık aynasıdır: "susan tanık" ile "saptıran tanık" arasındaki mesafe bir sprey kutusudur. Üçüncü perdede tek karşılaşma: sırtı dönük, duvara oyuncunun çıkışını DOĞRU çizen figür — ilk ve son dürüst işareti (§5.2).

### 3.6 Mitolojik katmanlar ve gerçek dayanaklar

Labirent derine indikçe zamanda geriye katmanlaşır:

| Katman | Dönem/kimlik | Gerçek mitoloji dayanağı (özet) |
|---|---|---|
| **Beton Kat** (yüzey) | 20.–21. yy | Modern grafiti, taze Kırıklar, 90'lar vakasının kanıtları |
| **Taş Kat** (orta) | Kuzey Avrupa | **Trojaborg** balıkçı labirentleri: kötü ruhları merkeze çekip kapana kıstırma — labirent tanım gereği ruh tuzağıdır. Peri/ceset yolu is lekeleri |
| **Boyalı Kat** (derin) | Mısır, Duat | **İki Yol Kitabı** (bilinen en eski öbür dünya haritası, tabut tabanlarına çizilirdi), yedi kapı ve **adı bilinmesi gereken bekçiler** ("Yüzü-ters-dönmüş" tarzı adlar), kalbin Ma'at tüyüne karşı tartılması |
| **Merkez** (çekirdek) | Girit | Daidalos'un labirenti, Asterion, **Ariadne'nin ip yumağı (clew)** — İngilizce "clue" (ipucu) kelimesi bu yumaktan türedi: sprey boya, kelimenin tam anlamıyla "ipucu bırakmak"tır |

Destekleyici dayanaklar (evrensellik tezi): Herodot Mısır Hawara kompleksini "Labirent" diye adlandırdı (Yunan–Mısır bağı tarihseldir); Tohono O'odham "Man in the Maze" deseni Girit desenine okyanus ötesinde bağımsız benzerdir (yaşayan halkın kutsal sembolü olduğundan birebir kopyalanmaz; yalnız "aynı desen her kıtada" fikri kullanılır); Chartres tek-yollu katedral labirenti "labirent = arınma yolu" geleneğidir ve iyi sonun mimari dilini verir.

**Ruh Çarpışmaları'nın kaynağı çok kültürlüdür** (tek "Kelt" etiketi kullanılmaz — bkz. Ek A): Çin ruh perdesi duvarları (hayaletler düz çizgide ilerler, köşe dönemez), İrlanda/Britanya peri ve ceset yolları (ruhlar kutsal noktalar arasında dümdüz süzülür), İskandinav Trojaborg tuzakları. Oyun içi metin: "Çin'in ruh duvarları, İrlanda'nın peri yolları, İskandinav taş tuzakları — hepsi Labirent'in gölgeleridir."

### 3.7 Ton kuralı

Hikâye **bireysel vicdan** ekseninde anlatılır; kurumsal/sistemik suç draması değildir (A15). Suçun failleri kurum değil kişilerdir; oyuncunun yargılandığı şey teşkilat değil kendi susuşudur. Politik yorum kapısı bilinçli olarak kapalı tutulur.

### 3.8 Sonlar

| Son | Etiket | Koşul (somut fiiller) | Sahne |
|---|---|---|---|
| **Tüy (itiraf)** | [MVP] | Merkezde oyuncu kendi vaka damgasının boş hüküm hanesini spreyle doldurur: "tanık: ben" | Watcher ilk kez tam görünür — insandır. Çıkış, Chartres tek-yol labirentidir (kaybolunamaz). Araba enkazının yanında uyanış; telefon kulübesi çalıyor |
| **Ağır Kalp (inkâr)** | [MVP] | Kırık kanıt etkileşimlerini yapmadan geçmek + Çizer'in ok zincirini takip etmek + finalde hüküm hanesini boş bırakıp çıkış kapısını boyamak (A7 — "kanıt silme" fiili yoktur, silme zaten yalnız kendi boyada çalışır) | Kapıdan çıkar ama sis açılmaz. Son sahnede eli kendiliğinden ok çizmeye başlar: **yeni Bilinmeyen Çizer o olmuştur** (döngü; ek ara sahne yok) |
| **İp (vekâlet)** | [Hedef — gizli] | Oyuncu Çizer'in eski dürüst işaretlerini restore edip ONUN duruşmasını tamamlar | Kendisi çıkamaz; duvarda yeni bir el yazısı belirir: sonraki yutulana yol gösteren, titremeyen ok. Ariadne olmayı seçmek. **Sıkışmada ilk kesilecek kalemdir (A7/A16)** |

Tüm sonlar tek mekanik (sprey) + tek sahne varyasyonudur; sesli diyalog, uzun ara sahne, ek sistem gerektirmez.

### 3.9 İçerik uyarısı

Mağaza sayfası ve oyun açılışında: *"Bu oyun kayıp kişi vakası ve polis örtbası temaları içerir."* Jumpscare içermediği ayrıca belirtilir (hedef kitle güvencesi).

---

## 4. Oynanış — Core Loop ve Mekanikler

### 4.1 Core loop (4 halka)

**KEŞFET → İŞARETLE → OKU/YORUMLA → AÇ**

1. **Keşfet:** sisli koridorlarda landmark'lar, Kırıklar ve semboller aranır.
2. **İşaretle:** sprey ile yön okları, kodlar, kişisel notasyon bırakılır — labirentteki "el yazın".
3. **Oku/Yorumla:** duvar yazıları, dosya damgaları, Çizer işaretleri ve kendi eski işaretlerin **okunur ve sorgulanır** ("bunu ben mi çizdim?"). Loop'un bilişsel girdi halkası budur; oyunu yürüyüş simülatöründen ayıran fiildir.
4. **Aç:** çözülen sembol kapıya çizilir, bölge açılır; hedef merdiveni bir basamak ilerler.

Hedef merdiveni: **kısa** (dakikalar — sonraki landmark; sembolü bul; işaret ağını genişlet), **orta** (20–30 dk — bölge kapısının sembolünü çöz ve boya; bölgenin Kırık'ını bul), **uzun** (merkeze ulaş; arabanın hikâyesini birleştir; çık — ya da çıkma).

### 4.2 Sprey sistemi [MVP]

- **Boya SINIRSIZDIR.** Kaynak ekonomisi yoktur; gerginlik kıtlıktan değil **güvenden** üretilir: Çizer taklitleri ve boya yaşlanması, oyuncunun kendi bilgisine güvenini aşındırır.
- **4+1 renk:** başlangıçta 4 renk (tuşlar 1–4). 5. renk — **fosforlu, karanlıkta parlar** — Rezervuar bölgesinde bulunan progresyon ödülüdür (tuş 5). Renkler CB-güvenli paletten seçilir ve her rengin ikincil kodu vardır (doku/sembol ucu; §11.3).
- **Fırça boyutu:** fare tekerleğiyle 3 kademe (ince çizgi / standart / geniş).
- **Decal tabanlı:** her darbe yüzeye hizalı projected decal'dir (§12.2).
- **Boya yaşlanması:** taze boya parlak ve akıntılıdır; zamanla matlaşır, akar, solar — **tam silinmez**. Derin bölgelerde yaşlanma hızlanır ("burası işaretlerini hazmediyor"). Yaşlanma bedava zaman bilgisidir ("bunu ne kadar önce çizmiştim?") ve teknik decal tavanının diegetik örtüsüdür (§12.2).

### 4.3 Silme kuralı ve Çizer işaretine müdahale [MVP — kritik]

**Silme (sağ tık) YALNIZCA oyuncunun kendi boyasında çalışır.** Diegetik gerekçe: oyuncunun spreyi devriye arabasından çıkan belirli bir kimyasaldır; Çizer'inki başka bir maddedir (mat katran / kazıma / yanık iz) — silinemez, üzeri boyansa bile altından sızar. Sonuç: Çizer işareti sağ tıkla "nötralize edilemez"; oyuncu onu **yorumlamak** zorundadır — tehdit bilişsel düzlemde kalır.

**Çizer işaretine müdahale tablosu (A2):**

| Oyuncu fiili | Mekanik sonuç | Dürüstlük siciline etkisi |
|---|---|---|
| Sahte işaretin YANINA "sahte" damgası / X koymak | İşaret etiketlenir; oyuncunun kendi bilgi ağı güçlenir | **POZİTİF** |
| Sahte işaretin üzerini boyamaya çalışmak | Boya kapanmaz, altından sızar; Çizer'in davranış bayrağı tetiklenir ("cevap" mekaniği, §5.2) | **NÖTR** |
| KANIT NESNESİNİN üzerini tamamen kapatacak şekilde boyamak | Kanıt örtülür | **NEGATİF** |

Sicil yalnızca bu tablonun son satırını ve §5.1'deki ikili sinyalleri sayar; başka hiçbir fiil sicile işlemez.

### 4.4 Sembol-kilit kapılar [MVP]

Bölge kapıları, labirentin başka yerinde bulunan bir sembolün kapıya **spreyle çizilmesiyle** açılır. Çizim grid'e rasterize edilip şablonla karşılaştırılır; **shape-matching toleransı ~%70** (playtest ile ayarlanır, §14). Envanter yoktur — **anahtar oyuncunun kafasında taşınır** ("bilgi kilidi").

**Sürtünme tavanı kuralları (A6):**
- Kritik yolda **bölge başına en fazla 1 sembol-kapı, oyun boyunca toplam 4**.
- Sembol aynı bölgededir; kapıya yürüme mesafesi **≤ 2–3 dakika**.
- Yanlış çizim **cezasızdır, deneme sınırsızdır**; N başarısız denemeden sonra diegetik ipucu belirir (yakındaki is lekesi hizası sembole işaret eder).
- Menüde "çizim yardımı" (snap) erişilebilirlik seçeneği vardır (§11.3).
- Demoya bir sembol-kapı konur — kitle kendini filtreler.
- **KURAL: Kritik yolda tek zorunlu bulmaca türü vardır (sembol-kapı); diğer her bulmaca opsiyoneldir.**

Kapı estetiği: Mısır ikonografisi birebir alınmaz; **beton-brutalist soyut semboller** kullanılır ("hiçbir kültüre ait olmama" tekinsizliği + temsil/telif hassasiyeti).

### 4.5 Pusula [MVP] / üçgenleme [Hedef]

- **Diegetik:** Q tuşu pusulayı ele kaldırır; ekran katmanı yoktur. Pusulanın "kuzeyi" global landmark'a — sisin üstünden görünen uzak kuleye — kilitlidir.
- **Anomali = bilgi:** manyetik ölü noktalarda iğne rastgele "çıldırmaz"; **yanlış ama TUTARLI şeyi gösterir: en yakın Gerçeklik Kırığı'nı.** Öğrenen oyuncu için Kırık dedektörü, öğrenmeyen için katıksız tekinsizlik. (Orijinal "çıldırma" fikrinin üzerine öğrenilebilir katman — bkz. Ek A.)
- **[Hedef] Watcher ürpertisi:** Watcher görüş alanındayken iğnede saniyelik titreme — bilinçaltı radar.
- **[Hedef] Üçgenleme bulmacası:** üç anomali noktasının doğrultuları (oyuncu boyayla çizgi çekerek kesiştirir) gizli geçidi verir. Opsiyoneldir (A6 kuralı).

### 4.6 Ruh Çarpışmaları [MVP] + is lekesi ley hattı [Hedef]

Nadir sahne: siste düz bir hatta süzülen soluk ışık bir duvara ulaşır, titreşir, söner — duvarda **is lekesi** kalır. Tok, yönlü (3D) tek ses vuruşuyla gelir (§10.4). Saf atmosfer olayı değildir: ruhlar kutsal noktalar arasında düz uçtuğundan, **is lekelerinin hizası bir "ley hattı" pusulasıdır** — gizli navigasyon katmanı [Hedef]. Sembol-kapı ipucu sistemi (A6) bu hizayı kullanır.

### 4.7 Kontrol şeması

| Girdi | İşlev |
|---|---|
| WASD | Hareket |
| Shift | **Koşma — stamina YOK** (devasa mekânda stamina angaryadır; A13) |
| Fare | Bakış |
| Sol tık | Sprey (basılı tutarak sürekli çizim) |
| Sağ tık | Silme (yalnız kendi boyanda) |
| Tekerlek | Fırça boyutu |
| 1–4 (5) | Renk seçimi (5 = fosforlu, bulunduktan sonra) |
| **1–6 rezerve** | Tuş haritası 6 renge ölçeklenebilir yazılır (A9 geri dönüş mimarisi) |
| Q | Pusulayı kaldır/indir |
| E | Etkileşim (Kırık nesneleri, belgeler) |
| Esc | Menü |

### 4.8 Hareket hissi (A13)

Yürüme temel tempodur; **koşma vardır, stamina yoktur**. Eğilme ve tırmanma **[Kesildi]**. Head-bob hafiftir ve kapatılabilir (§11.3). Devasalık hissi hareket hızı + FOV + ölçek kontrastıyla kalibre edilir — draw distance ile değil (§9.5).

---

## 5. Varlıklar

### 5.1 The Watcher — davranış sistemi [MVP]

Watcher iki bağımsız sorunun cevabıyla çalışır: **ne zaman belirir** (yalnızlık sayacı) ve **nasıl belirir** (dürüstlük sicili).

**(a) Belirme tetikleyicisi — yalnızlık sayacı:** rastgele spawn yoktur. Gizli sayaç şunlarla dolar: landmark görmeden / işaret bırakmadan geçen süre + anomali alanında kalış + (finalde) hikâye vuruşları. **Spam koruması (A4): aynı 5–10 m içindeki ardışık işaretler sayacı sıfırlamaz; sıfırlama = landmark GÖRME + yeni konumda işaret.**

**(b) Belirme niteliği — dürüstlük sicili (A3):** sicil **5–6 ikili, itiraz edilemez sinyalden** oluşur:

| Sinyal | Yön |
|---|---|
| Kırık kanıt etkileşimini tamamlama | + |
| Ana vaka belgesini okumadan bölge bitirme | − |
| Sahte işarete "sahte" damgası koyma | + |
| Kanıt nesnesini boyayla örtme | − |
| Finalde hüküm hanesi seçimi | belirleyici |

Çıktı **3 kovadır: dürüst / nötr / sahteci.** Kovalar YALNIZCA şunları değiştirir: (i) Watcher belirme **mesafe bandı**, (ii) tek siluet **morph parametresi** (boynuz gölgesi ölçeği), (iii) **final varyantı**. Başka hiçbir sistem sicili okumaz.

**Ters teşvik düzeltmesi:** kova, korku **miktarını değil TÜRÜNÜ** değiştirir. Dürüst oyuncu Watcher'ı yine görür — ama uzak, insansı ve hüzünlü (tekinsizlik). Sahteci oyuncuda yakın ve boynuzludur (tehdit). **Korku bütçesi kimseden esirgenmez.** Kova değiştiğinde tek okunur tepki verilir: sonraki beliriş belirgin biçimde daha yakın/uzak + kısa ses imzası.

**(c) Spawn koreografisi:** eşik aşılınca Watcher, görüş yönünün **60–90° yanında**, sis sınırında, **elle yerleştirilmiş** spawn noktasında belirir. Yaklaşılınca sis yutmuş gibi kaybolur. Pathfinding AI yoktur; koreografi vardır (Alien: Isolation yönetmen AI'ının bütçe dostu hali).

**(d) İz bırakma [MVP]:** kaybolduğu yerde küçük bir dünya değişikliği kalır — kapalı kapı açık, işaretin önünde ıslak ayak izi. "Acaba yine mi geldi" paranoyası, görünmesinden değerlidir.

**(e) Bakışma [Hedef]:** doğrudan bakmak Watcher'ı sabitler ama yalnızlık sayacını hızlandırır (bakarken ilerlenemez); sırt dönülürse kaybolur ama sonraki belirişi DAHA YAKIN olur. Her etkileşim bedellidir — alışma sorununu çözer.

[Kesildi]: kovalama, saldırı, pathfinding.

### 5.2 Bilinmeyen Çizer [MVP — bütçenin yıldızı]

Bu oyunun "jumpscare"i Çizer'dir; artan her üretim kuruşu buraya gider. Çizer neredeyse hiç render edilmez — **işaretleri onun bedenidir**.

**Üç perdelik tırmanış:**

| Perde | Bölge | Davranış |
|---|---|---|
| **P1 — Kopyalar** | Sığlık | Oyuncunun işaretinin aynısı, yanlış kavşakta. (Bu perdede önceden hazırlanmış jenerik işaretler kullanılabilir — A10) |
| **P2 — Çarpıtmalar** | Rezervuar | Oyuncunun kendi oku 10° döndürülmüş, "düzeltilmiş" gibi |
| **P3 — Öngörüler** | Merkez | Hiç gidilmemiş koridorda, oyuncunun stilinde, henüz çizilmemiş işaret. Doruk korku anı — teknik: stroke-replay (§12.3), jenerik işaret P3'te YOKTUR |

**Öğrenilebilir tell'ler:** kopyalar ~%95 doğrudur ama: boya akıntıları **yukarı** doğrudur; ton kaymıştır (kan kırmızısı vs. tuğla kırmızısı); köşelerde el titremesi yoktur — insan dışı düzgünlük. **Tutorial'da anlatılmaz** — topluluğun tell listesi tartışması bedava pazarlamadır. (Tell'ler ayrıca soft-fail çarpıtmalarını tespit edilebilir kılar, §6.1.)

**Davranış bayrakları [Hedef]:** Çizer işaretinin üstünü boyamak "cevap" sayılır; Çizer sonraki bölgede tavır değiştirir — **küsme** (işaretler azalır) veya **öfke** (öngörüler artar). 2–3 bayrak; gerçek AI yok.

**3. perde karşılaşma sahnesi [MVP]:** Merkez'de, tek sefer: sırtı dönük bir figür duvara oyuncunun çıkışını DOĞRU çizmektedir — ilk ve son dürüst işareti. Oyuncu yaklaşınca figür sisle dağılır; işaret kalır. Kimliği (kıdemli ortak) Kırık belgeleriyle bu ana kadar örülmüş olur.

---

## 6. Fail State ve Kayıt

### 6.1 Yeniden Emilme — soft fail [MVP]

Ölüm yoktur; ceza **bilgi kaybı değil, şüphe enjeksiyonudur**.

**Tetik koşulları:** Watcher'a tekrarlı aşırı yaklaşma / anomali alanında aşırı kalma / derin bölgede uzun süre işaretsiz-yönsüz dolanma. Baskı arttıkça uyarı diegetiktir: görüntü-ses bozulması (HUD/sanity barı yoktur).

**Sonuç:** ekran sisle dolar; oyuncu son Kırık'ta uyanır — ve o bölgedeki işaretlerinin bir kısmı Çizer tarafından değiştirilmiştir.

**Doz kuralları (A5 — sayısal, kesin):**
- Fail başına **en fazla 2–3 işaret** değiştirilir; **yalnızca fail olunan bölgede**.
- **Dokunulmazlar:** sembol-kapı çözümü işaretleri, Kırık'ların **10 m** çevresi, fosforlu işaretler.
- Değişiklik silme değil **ÇARPITMADIR** (ok **10–20°** dönmüş, X'e çevrilmiş) ve **her zaman Çizer tell'i taşır** — tespit edilip düzeltilebilir.
- **İlk soft-fail scripted'dır:** tek işaret değişir; tell öğretme anı olarak sahnelenir.
- Art arda faillerde değiştirilen işaret sayısı **ARTMAZ**; tekrar cezası görüntü/ses bozulmasına kayar.

[Kesildi]: can barı, sanity barı, herhangi bir HUD göstergesi.

### 6.2 Diegetik checkpoint'ler — Kırıklar [MVP]

Kayıt noktası = Gerçeklik Kırığı: devriye arabasına oturmak / telefon ahizesini kaldırmak **kayıt + soft-fail dönüş noktasıdır**. Kırık tek varlıkta üç işlev taşır: dinlenme odası (aydınlık, sissiz — korku ritminin nefesi) + landmark + kayıt.

### 6.3 Kayıt politikası (A14)

- **Tek kayıt profili**; kayıt = Kırık checkpoint'leri.
- İstenen anda **"çıkış kaydı"** (exit save): tek kullanımlıktır, yüklenince silinir — soft-fail istismarını (save-scumming) önler.
- Kayıt verisi: darbe listesi + sicil + bayraklar; kilobaytlar mertebesinde (§12.5).

### 6.4 HUD yok ilkesi

Ekranda hiçbir kalıcı gösterge yoktur. Sağlık/korku/yön bilgisi; pusula, boya yaşı, görüntü-ses bozulması ve Watcher mesafesiyle diegetik iletilir. (Erişilebilirlik eşlenikleri §11.3'te — bunlar isteğe bağlı katmandır, varsayılan deneyim temiz ekrandır.)

---

## 7. Seviye Tasarımı

### 7.1 Lynch modeli kuralları

Kevin Lynch'in beş öğesi (yol/kenar/bölge/düğüm/landmark) labirentin makro dilidir: koridor hiyerarşisi (arter > sokak > kılcal), kenarlar (kanal, kot farkı), kimlikli bölgeler, karar kavşakları, landmark'lar (Kırıklar + mimari anıtlar).

**Bağlayıcı kurallar** ("kaybolmak eğlenceli, çaresizlik değil"):

1. **60 saniye kuralı:** her kavşaktan sis mesafesi içinde en az BİR yön ipucu görünür. **60 saniyeden uzun, ayırt edici öğesiz koridor = hatalı koridordur** ve düzeltilir.
2. **Üç katmanlı oryantasyon:** (i) global landmark — sisin üstünden seçilen tek şey: **uzak kule silueti** (pusulanın "kuzeyi"); (ii) bölgesel kimlik (renk/ses/mimari); (iii) yerel işaretler (oyuncunun boyası). Bir katman kaybolunca diğer ikisi tutar — kaybolma hissi var, çaresizlik yok.
3. **%70 döngü / %30 ölü uç:** döngüler "burası demin geçtiğim yer!" anını üretir (en ucuz, en güçlü duygusal vuruş). **Her ölü uç ödemelidir**: Kırık, sembol, lore veya manzara.
4. **Kısayol açılımı (metroidvania-lite):** derinden başlangıca tek yönlü kapılar/merdivenler; geri yürüme angaryasını keser, mekânı öğrenilebilir kılar.
5. **Görüş hattı tacizi:** ulaşılamayan landmark ızgara/delik ardından gösterilir; sis mesafesi, sonraki karar noktası YARI görünür olacak şekilde ayarlanır.
6. **Adil kaybettirme:** harita mantığı asla kırılmaz (ışınlanan koridor vb.) — **SON BÖLGE HARİÇ**. Kural oyunun %90'ında geçerli olduğu için finalde kırılması dehşet verir.

### 7.2 Üretim akışı: el yapımı + modüler kit

**Runtime prosedürel üretim YOKTUR.** Makro plan (bölgeler, arterler, düğümler, kapılar, Kırık ve spawn noktaları) elle tasarlanır; koridor dolgusu **8–12 parçalık modüler beton prefab kiti** + editör içi yarı-otomatik yerleştirme aracıyla (runtime değil, editör aracı) üretilir. Kit disiplini: bölge başına en çok **2–3 hero asset** kit dışına çıkabilir (A16). Tek istisna: Haritalanamayan Merkez'in scripted kural kırılmaları (§7.6).

### 7.3 Bölge tablosu (A1 süre revizyonlarıyla)

| # | Bölge | Süre | Lore katmanı | Ambiyans ses kimliği | Tanıtılan mekanik | Çizer | Kırıklar | Sembol-kapı |
|---|---|---|---|---|---|---|---|---|
| 1 | **Enkaz** | ~15 dk | Beton | Soğuyan motor tıkırtısı, cam kırığı, tek cızırtılı telsiz | Sprey, silme, pusula, ilk Kırık (araba) | — | Devriye arabası (tutorial checkpoint) | 1 (öğretim kapısı) |
| 2 | **Sığlık** | ~30 dk (+opsiyonel ödüllü döngü ~10 dk) | Beton | Uzak rüzgâr, geniş beton uğultusu, seyrek güvercin kanadı | Landmark okuma, boya yaşlanması; ilk Ruh Çarpışması | **P1** | Telefon kulübesi (yapılmamış ihbar) | 1 |
| 3 | **Batık Ofis Semti** | ~40 dk | Beton→Taş geçişi | Floresan vınlaması, kâğıt hışırtısı, asansör boşluğu uğultusu | Pusula anomalileri (Kırık dedektörü), kronoloji-lite belgeleri yoğunlaşır | — (Çizer sessiz; Watcher düzenli) | Arşiv odası (sahte tutanak), ofis masası | 1 |
| 4 | **Rezervuar** | ~40–50 dk (+opsiyonel ödüllü döngü ~10 dk) | Taş→Boyalı (Duat; bekçi adlı kapılar) | Su damlası ve akıntı, metal inilti, derin yankı | **Fosforlu boya (5. renk)**, karanlık kılcallar, üçgenleme [Hedef], düşey katman | **P2** | Su basmış karakol koridoru (delil dolabı) | 1 |
| 5 | **Haritalanamayan Merkez** | ~30–40 dk | Girit | Sessizliğe inen katmanlar; kalp atışına benzer uzak tok vuruş; finalde tek ninni motifi | Kural kırılmaları; damga hüküm hanesi; final kararı | **P3** | Çocuk odası (final; kayıt yok — bilinçli) | — (kapı değil, karar) |

- **Toplam:** ~2,5–3 saat bölge omurgası + **kronoloji-lite ana vaka bulmacası (+20–30 dk)** + **2 opsiyonel ödüllü döngü (+20 dk)** = **3–4 saat** (A1). **Süreyi doldurmak için backtracking eklemek YASAKTIR.**
- Kritik yol sembol-kapı toplamı: **4** (Merkez'de kapı yoktur — A6 tavanıyla tutarlı).

### 7.4 Bölge kısa açıklamaları

- **Enkaz:** devrilmiş devriye arabasının etrafında yoğun sisli dar enkaz koridorları. Araç zimmetinin iadesi; sprey/silme/pusula/kayıt tek güvenli odada öğretilir. Çizer yoktur; Watcher yalnızca son anda, tek uzak siluet olarak görülür.
- **Sığlık:** cömert landmark'lı, düşük sisli geniş gri avlular — oyuncuya "sistemim çalışıyor" güveni verilir; Çizer P1 tam bu güvenin üstüne gelir. Opsiyonel ödüllü döngü: çevre galerisi (lore + kestirme açılımı).
- **Batık Ofis Semti:** iç mekân ağırlıklı, floresan-yeşil paletli, dikey ofis çekirdekleri. İlk manyetik ölü noktalar burada; pusulanın "yanlış ama tutarlı" davranışı keşfedilir. Kronoloji-lite belge yoğunluğu en yüksek bölge.
- **Rezervuar:** düşey bölge — çukurlar, rampalar, üst geçitler; siste aşağı bakmak ileri bakmaktan tekinsizdir. Fosforlu boya karanlık kılcalları açar; Duat estetiği başlar (bekçi adlı kapılar, İki Yol diyagramları). Opsiyonel ödüllü döngü: taşkın galerisi (üçgenleme sahası [Hedef]).
- **Haritalanamayan Merkez:** aşağıda.

### 7.5 Sabotaj dönüşüm kuralı

Pazar araştırmasının "adil değil" tuzağına karşı bağlayıcı kural: **manyetik ölü nokta ile Çizer sahte işareti aynı mekân parçasında AYNI ANDA devrede olamaz.** Araçlar tek tek, dönüşümlü sabote edilir; üç oryantasyon katmanından en az ikisi her an ayaktadır.

### 7.6 Haritalanamayan Merkez — kural kırılmaları

Son bölge, oyunun 3 saat boyunca kurduğu sözleşmeyi bilinçli bozar (**yalnızca burada** — §7.1 kural 6):

- **Hafif runtime karıştırma:** arkadan kapanan geçitler, dönülünce değişen kavşaklar, imkânsız geometri (scripted numaralar; prosedürel üretim değil).
- Pusula anlamsızlaşır (iğne yavaşça oyuncunun arkasını gösterir); global landmark görünmez olur; **tek rehber işaretlerdir** — oyuncunun ve Çizer'in.
- Çizer P3 öngörüleri buradadır; 3. perde karşılaşma sahnesi buradadır.
- Merkezin çekirdeği: **çocuk odası** — sıva dökülür, Knossos kırmızısı fresk parçaları; Asterion'un çocukluk çizimleri (top, çift başlı balta, ineğin yanında küçük boynuzlu figür). Final kararı (hüküm hanesi) burada verilir.
- Bu bölgenin scripted kural kırılmaları **projenin ilk çeyreğinde prototiplenir** — en belirsiz iştir (A16).

---

## 8. Anlatı Sunumu

### 8.1 Ortam anlatımı ilkeleri

Sesli anlatım, NPC, flashback, uzun ara sahne **[Kesildi]**. Hikâye üç kanaldan akar: mekân (yutulmuş parçaların kendisi), belge (Kırık'lardaki kâğıtlar — tarih damgalı, kısa), duvar (üç katmanlı yazı sistemi). Az metin ilkesi: oyuncu karakteri susar; oyun da gevezelik etmez.

### 8.2 Duvar yazısının üç katmanı

| Katman | Kaynak | Nitelik |
|---|---|---|
| Kurban grafitileri | Önceki yutulanlar | Ham, okunur, **güvenilmez** ("çıkış yok", yanlış yön okları — çaresizlik arşivi) |
| Çizer işaretleri | Kıdemli ortak | Oyuncuyla **aynı dil**, güvenilmez; tell'lerle ayırt edilir |
| Dosya damgaları | Labirent'in kayıt sistemi | Evrimleşmiş hiyeroglif; güvenilir ama öğrenilmesi gerekir |

### 8.3 Dosya damgası sistemi

Her vaka 3–4 sembollük damgayla kayıtlıdır: **mekân + suç + tanık sayısı + hüküm boşluğu**. "Hüküm" hanesi hep boştur — final, oyuncunun kendi damgasındaki boşluğu doldurmasıdır (ya da bırakmasıdır). Fez/Tunic okulu: sözlük verilmez, tekrarla öğrenilir.

- **[MVP] K15-lite (A8):** damgalar yalnızca **ana vaka Kırıklarında** görülür; "Tüy" sonu damga sistemine bağımlı olduğu için bu alt küme MVP'dedir.
- **[Hedef] Tam üç katmanlı sözlük:** damgalar tüm labirente yayılır; yan vakalar okunabilir hale gelir.

### 8.4 Kırık'larda tek-çalışan-etkileşim ilkesi [Hedef]

Her Kırık'ta **TEK çalışan** etkileşim vardır: cızırtılı telsiz, bir kez çalan telefon, yanıp sönen floresan. Tamamen ölü bir mekânda tek çalışan şey, hepsinden tekinsizdir. (MVP'de Kırıklar checkpoint + belge işleviyle yeterlidir; çalışan etkileşim cila katmanıdır.)

### 8.5 Kronoloji-lite bulmacası [MVP] (A1)

Ana vakanın belgeleri (ihbar kaydı, devriye çizelgesi, sahte kaza tutanağı, kapanış yazısı) Kırıklarda **sırasız** bulunur; hepsi aynı geceye damgalıdır. Oyuncu zaman çizgisini zihninde kurar — envanter/günlük ekranı yoktur; belgeler yerinde okunur, damga tarihleri anahtardır. Bu, [Hedef]'ten MVP'ye taşınmış süre-kapatma içeriğidir (+20–30 dk; mevcut Kırık varlıklarını kullanır, yeni sistem gerektirmez). Tam kronoloji bulmacası (yan vakalar dahil) [Hedef].

---

## 9. Sanat Yönü

### 9.1 PSX teknikleri [MVP]

Vertex snapping (titrek köşeler), affine texture mapping (perspektifsiz doku kayması), Gouraud shading, düşük renk derinliği + dithering, **düşük çözünürlük render target**, 128px doku bütçesi. Godot 4 hazır PSX görsel eklentisi temel alınır; sıfırdan shader yazılmaz. Düşük çözünürlük belirsizlik üretir → beynin boşluk doldurması korku bütçesine bedava katkıdır. Vertex-wobble kapatılabilir (§11.3).

### 9.2 Sis [MVP]

**40–80 m** aralığına kilitli mesafe sisi — üçlü kazanç: estetik (PSX dönemi meşruiyeti), performans (draw distance tavanı, §12.4), tasarım (görüş hattı tacizi aracı, §7.1). Bölge başına ayrı sis rengi/yoğunluğu kimliğin parçasıdır. Dinlenme odaları (Kırıklar) **sissiz ve aydınlıktır** — korku ritmi nefesle kurulur.

### 9.3 Bölge paletleri

| Bölge | Palet | Not |
|---|---|---|
| Enkaz | Gece grisi + polis lambası kırmızı-mavisi | Tek renkli ışık kaynağı: araba |
| Sığlık | Açık gri beton, süt beyazı sis | En "temiz" bölge — güven inşası |
| Batık Ofis Semti | Floresan yeşili, sararmış kâğıt | Hastalıklı kurumsal ışık |
| Rezervuar | Islak koyu beton → tabut içi mavisi + toprak sarısı (Duat) | Fosforlu boya turkuazı karanlıkta tek sıcak nokta |
| Merkez | Kırık sıva beyazı + Knossos kırmızısı fresk | Renk, oyunda ilk kez "sıcak" |

### 9.4 Watcher / Çizer görsel tasarımı

- **Watcher:** tek model + sis LOD. Uzaktan insansı siluet; tek morph parametresi (boynuz gölgesi ölçeği) sicil kovasına bağlı (§5.1). Detay asla net görülmez — sis örter; yüz finalde ("Tüy") bir kez netleşir.
- **Çizer:** neredeyse hiç render edilmez; işaretleri onun bedenidir. Tek görünüm: P3 sırtı dönük sahne — kapüşonlu/yağmurluklu, 90'lar devriye montunu andıran siluet.

### 9.5 Devasalığın satılması

Devasalık **siluet + ses + ölçek kontrastıyla** satılır; **draw distance ile DEĞİL** (sis 40–80 m kilidi ihlal edilmez). Araçlar: dar servis koridorundan 200 m'lik katedral avluya çıkış (devasalık ancak darla yan yana hissedilir); sis üstünden seçilen kule silueti; yankı kuyruğunun uzunluğu; kot farkından aşağı bakış [Hedef düşey katmanlar Rezervuar'da MVP'dedir].

---

## 10. Ses Tasarımı (A11)

### 10.1 Bölge ambiyansları [MVP]

Her bölgenin ambiyans kimliği bölge tablosundadır (§7.3). İlke: ambiyans, bölge kimliğinin üçüncü oryantasyon katmanıdır — gözler sisle kör edildiğinde kulak yön bulur; sisli oyunda ses, görselin yarısıdır ve bedavaya yakındır.

### 10.2 Olasılıksal tek-sesler [MVP]

**Dönen ambiyans loop'ları yerine olasılıksal tek-sesler**: damla, metal inilti, uzak rüzgâr vuruşu — rastgele aralıklarla, 3D konumlu. "Törpüleyici ses döngüsü" Steam şikâyetine doğrudan önlem; yapım maliyeti de düşüktür (kısa örnekler + zamanlayıcı).

### 10.3 Watcher / Çizer ses imzaları [MVP]

- **Watcher:** belirişinde alçak, bas ağırlıklı "basınç" tonu (sesin gelişi görülmesinden önce hissedilir); kova değişiminde kısa ayırt edici imza (§5.1). Ayak sesi yoktur — o yürümez, belirir.
- **Çizer:** hiçbir zaman görülmez ama **duyulur**: uzak koridordan sprey tıkırtısı ve püskürtme hışırtısı — oyuncu kendi çizmediği anlarda. P3'te bu ses oyuncunun sırtından gelir.

### 10.4 Ruh Çarpışması sesi [MVP]

Tok, tek vuruşluk gövde sesi: **nadir, yönlü (3D)** — duyulduğunda yön bilgisi taşır ve is lekesi navigasyon ipucuyla örtüşür (§4.6).

### 10.5 Minimal müzik politikası [MVP]

Skorlu müzik yalnızca **Kırık anlarında** (kısa, kırılgan motif — tek enstrüman) ve **finalde** çalar. Koridorlar müziksizdir: sessizlik, devasalığın ses tasarımıdır. Merkez'in ninni motifi (çocuk odası) oyunun tek melodik temasıdır ve final varyantlarında farklı armonize edilir.

---

## 11. UI/UX ve Erişilebilirlik

### 11.1 Diegetik-öncelik ilkesi

Oynanış ekranında sıfır UI. Pusula eldedir (Q), renk seçimi sprey kutusunun elde görünen rengiyle onaylanır, boya yaşı dokuyla okunur, tehdit görüntü-ses bozulmasıyla iletilir. Menü dışında hiçbir 2D katman render edilmez.

### 11.2 Menüler (A14)

Ana menü (Devam / Yeni / Seçenekler / Çıkış) + seçenekler (görüntü, ses, kontroller, erişilebilirlik) + **tek kayıt profili**. Kayıt = Kırık checkpoint'leri + tek kullanımlık çıkış kaydı (§6.3).

### 11.3 Erişilebilirlik matrisi (A12) [MVP]

| İhtiyaç | Özellik |
|---|---|
| Renk körlüğü | 4 renk **CB-güvenli paletten**; her renge ikincil kod (doku deseni / sembol ucu) — renk hiçbir bilginin tek taşıyıcısı değildir |
| Hareket hastalığı | Vertex-wobble kapatma, FOV ayarı, head-bob ayarı/kapatma |
| Motor beceri | Shape-match **çizim yardımı (snap)** seçeneği; basılı tutma yerine aç/kapa sprey modu |
| Fotosensitivite | Floresan flicker azaltma seçeneği + içerik uyarısı |
| İşitme | Ses ipuçlarının görsel eşlenikleri: altyazı + ekran kenarı yön imleri (isteğe bağlı katman; varsayılan kapalı) |

---

## 12. Teknik Tasarım

### 12.1 Godot 4 mimarisi

- Godot 4.x, Forward+ yerine **Compatibility/Mobile renderer** değerlendirmesi (PSX estetiği düşük uçta avantaj; Deck pil ömrü).
- Hazır PSX görsel eklentisi (vertex snap + affine + dither) temel; üstüne Çizer tell shader'ı (yukarı akıntı, ton kayması) eklenir.
- Sahne yapısı: bölge = sahne; hücreler alt sahneler; global sistemler (sicil, sayaç, Çizer yöneticisi, kayıt) autoload singleton'ları.

### 12.2 Decal-instance boyama sistemi [MVP]

- Her fırça darbesi = yüzeye hizalı **projected decal instance**; darbeler spline-nokta listesi olarak tutulur.
- **Bölge başına darbe tavanı ~1500**; tavana yaklaşınca **en eski darbeler solmaya başlar** — boya yaşlanmasıyla (§4.2) diegetik örtüşür: teknik sınır, kurgu olarak hissedilir.
- Sistem **renk-agnostik** yazılır; palet 6 renge ölçeklenebilir (A9 — geri dönüş maliyeti ≈ 1–2 gün).
- Çizer işaretleri **aynı sistemde ayrı katman/bayrakla** tutulur (silinemez bayrağı, tell shader'ı).
- [Hedef] Render-target/mesh-paint araştırması — MVP'de girilmez; decal ihtiyacın %90'ını karşılar.

### 12.3 Stroke-replay (Çizer P3 tekniği, A10) [MVP]

- Oyuncunun kaydedilmiş darbe spline'ları hafif sınıflandırılır: **~10–15 şablon sınıfı** (shape-matching kodu sembol-kapıdan zaten mevcut) + stil parametreleri (baskın renk, darbe boyu/hızı, titreme genliği).
- P3 öngörüsü = oyuncunun **kendi spline'ının**, gitmediği koridordaki elle yerleştirilmiş aday noktaya yeniden projekte edilip **replay** edilmesi + Çizer tell shader'ı (yukarı akıntı, ton kayması, titreme sıfırlama).
- **ML yok; P3'te jenerik hazır işaret yok** (P1'de var). Tahmini iş: 1–2 hafta. İlk sprintin dikey dilimindedir (§13.3).

### 12.4 Hücre streaming + portal culling [MVP]

Sis 40–80 m'ye kilitli olduğundan çekim mesafesi sınırlıdır; bölgeler hücre bazlı stream edilir, iç mekânlar portal culling ile ayrılır. PSX bütçesi (düşük poly, 128px doku) zaten hafiftir. **Tuzak uyarısı:** devasa avlularda sis mesafesini artırma hevesine direnilir (§9.5).

### 12.5 Kayıt serializasyonu [MVP]

Kayıt = darbe listesi (pozisyon, normal, renk, boyut, yaş) + sicil kovaları + Çizer bayrakları + açılan kapılar + aktif checkpoint. Tamamı **kilobaytlar** mertebesindedir; bulut kaydı sorunsuz.

### 12.6 Performans hedefleri (A15)

- **1080p / 60 fps** orta seviye donanımda.
- **Steam Deck: 60 fps** hedef (PSX estetiği ve düşük çözünürlük RT avantaj); Deck doğrulaması launch hedefi.

### 12.7 Lokalizasyon mimarisi (A15) [MVP]

- **Baştan string tablosu**; hiçbir metin koda gömülmez.
- **Duvar yazıları doku değil decal/metin olarak** render edilir — çeviride asset yeniden üretimi gerekmez.
- Diller: **EN, TR** launch'ta; **ZH-Hans, JP, PT-BR** launch penceresinde.
- Dosya damgaları semboliktir (çeviri gerektirmez) — lokalizasyon yükünü doğal düşürür.

---

## 13. Kapsam ve Üretim

### 13.1 MVP / Hedef / Kesildi ana tablosu

| Özellik | Etiket |
|---|---|
| Sprey (sınırsız, 4 renk, fırça boyu, decal, yaşlanma) | [MVP] |
| Fosforlu 5. renk (Rezervuar ödülü) | [MVP] |
| Silme yalnız kendi boyada + Çizer müdahale tablosu (A2) | [MVP] |
| Sembol-kilit kapılar (4 adet, %70 tolerans, A6 kuralları) | [MVP] |
| Pusula + anomali=Kırık davranışı | [MVP] |
| Ruh Çarpışmaları (sahne + ses) | [MVP] |
| Watcher: yalnızlık sayacı + dürüstlük sicili (3 kova) + spawn koreografisi + iz bırakma | [MVP] |
| Çizer: 3 perde + tell'ler + stroke-replay P3 + karşılaşma sahnesi | [MVP] |
| Yeniden Emilme (A5 dozları) + Kırık checkpoint + exit save | [MVP] |
| 5 bölge + Merkez kural kırılmaları | [MVP] |
| Kronoloji-lite (ana vaka) + K15-lite damgalar | [MVP] |
| 2 son (Tüy, Ağır Kalp) | [MVP] |
| Erişilebilirlik matrisi (A12) | [MVP] |
| Lokalizasyon mimarisi (EN/TR) | [MVP] |
| İs lekesi ley hattı navigasyonu | [Hedef] |
| Üçgenleme bulmacası | [Hedef] |
| Watcher bakışma mekaniği + pusula ürpertisi | [Hedef] |
| Çizer davranış bayrakları (küsme/öfke) | [Hedef] |
| Kırık tek-çalışan-etkileşim | [Hedef] |
| Tam damga sözlüğü + tam kronoloji | [Hedef] |
| "İp" gizli sonu | [Hedef] |
| Mesh-paint/RT boyama | [Hedef] |
| ZH-Hans/JP/PT-BR lokalizasyonu | [Hedef] |
| Kesilenler | Ek B'de toplu |

### 13.2 Ekip ve süre varsayımı

**2–3 kişi, 12–18 ay.** Roller: 1 programcı-tasarımcı (sistemler + level script), 1 sanatçı (kit + shader + Watcher), 1 yarı zamanlı ses/müzik + anlatı (veya dış kaynak). Godot 4 tek motor; harici middleware minimum.

### 13.3 Milestone taslağı

| Milestone | İçerik |
|---|---|
| **İlk sprint** | Motor kurulumu + **Merkez kural-kırılma prototipi** (en belirsiz iş, ilk çeyrekte — A16) + **decal/stroke-replay dikey dilimi** |
| **Dikey dilim** | Enkaz + Sığlık'ın yarısı; loop'un 4 halkası + Çizer P1 + Watcher spawn + 1 sembol-kapı çalışır durumda |
| **Demo** | Sığlık tabanlı; sprey+pusula öğretimi, ilk manyetik ölü nokta, 1 sembol-kapı; **Çizer'in ilk taklit anıyla biter** (Next Fest'ten ~3 hafta önce) |
| **Content-complete** | 5 bölge, 2 son, kronoloji-lite, tüm MVP sistemleri |
| **Polish** | Playtest/telemetri döngüleri (§14), erişilebilirlik, Deck doğrulaması, lokalizasyon |

### 13.4 Kesim sırası (A16)

Sıkışma halinde kesim şu sırayla yapılır: **İp sonu → tam damga sözlüğü → bakışma mekaniği → üçgenleme → is lekesi ley hattı → Batık Ofis + Rezervuar kısmi birleştirme (son çare).**

### 13.5 Kapsam disiplin kuralları (A16)

- **Hiçbir [Hedef] kaleme MVP bitmeden başlanmaz.**
- Modüler kit disiplini: 8–12 prefab dışına bölge başına en çok 2–3 hero asset.
- Merkez'in scripted kural kırılmaları ilk çeyrekte prototiplenir.
- Süre doldurma amaçlı backtracking yasaktır (A1).

---

## 14. Playtest ve Telemetri (A15)

### 14.1 Ölçülecek metrikler (playtest sürümlerinde)

- **Kaybolma süresi:** landmark/işaret etkileşimi olmadan geçen süre dağılımı (bölge bazında).
- **Kapı deneme sayısı:** sembol-kapı başına başarısız çizim adedi ve pes etme oranı.
- **Soft-fail sıklığı:** oyuncu başına, bölge başına.
- **Bölge tamamlama süreleri:** medyan ve %10–%90 aralığı.
- Ek: Kırık kanıt etkileşimi tamamlama oranı (sicil sinyallerinin doğal dağılımı), son dağılımı.

### 14.2 Karara bağlı hipotezler

| Hipotez | Test | Karar eşiği |
|---|---|---|
| 4 renk yeterli, oyuncular 4'ten fazlasına anlam atamıyor | Renk sayısı **A/B** (4 vs 6; mimari hazır — A9) | Oyuncular 6 renkte anlamlı ek notasyon geliştiriyorsa 6'ya dönülür (maliyet 1–2 gün) |
| %70 shape-match toleransı doğru | Kapı deneme sayısı + pes oranı | Medyan deneme > 4 veya pes > %5 ise tolerans gevşetilir / ipucu N'i düşürülür |
| Toplam süre 3–4 saat bandında | Tamamlama süresi medyanı | Medyan < 3 saatse opsiyonel döngü içeriği genişletilir; **backtracking eklenmez** |
| Soft-fail "emeğim çöpe gitti" hissi üretmiyor | Fail sonrası oturum terki + anket | Terk artıyorsa A5 dozu aşağı çekilir (2–3 → 1–2 işaret) |

---

## 15. Pazarlama Planı (kısa)

- **Fiyat:** $9.99 ($14.99 ancak 4–5 saat + yüksek cilayla savunulabilirdi; bilinçli olarak güvenli banda konumlandık).
- **Demo:** Sığlık tabanlı; sprey + pusula öğretilir, ilk manyetik ölü nokta yaşatılır, bir sembol-kapı içerir ve **Çizer'in oyuncunun işaretini taklit ettiği TEK anla biter** → cliffhanger + wishlist CTA.
- **Next Fest:** demo, Next Fest'ten **~3 hafta önce** yayında (wishlist'lerin %68–88'i demoyu indirmeyenlerden gelir; demo oynayanların dönüşümü %18–25).
- **Haunted PS1 Demo Disc** başvurusu + korku showcase'leri.
- **Ara hedef: 2.000 wishlist** (Next Fest öncesi).
- **Fragman kuralı:** ilk 10 saniyede Çizer taklit anı; estetik değil mekanik satılır.
- **İçerik uyarısı satırı** mağaza sayfasında: kayıp kişi / polis örtbası temaları; "jumpscare içermez" güvencesiyle birlikte.
- Final isim + capsule art demo takviminden önce kesinleşir (§0).

---

## 16. Riskler ve Azaltımlar

| # | Risk | Azaltım |
|---|---|---|
| 1 | **"Bir liminal oyun daha" algısı** (miktar doygunluğu) | "Backrooms" kelimesi yasağı; USP fragmanın ilk 10 sn'sinde; brütalist devasalık kimliği; PSX'e değil mekaniğe yaslanan iletişim |
| 2 | **"Sinir bozucu kaybolma" incelemeleri** — sabotajlar üst üste binerse özgün mekanikler negatif inceleme motoruna döner | Sabotaj dönüşüm kuralı (§7.5: ölü nokta + sahte işaret aynı anda asla); üç katmanlı oryantasyon; 60 sn kuralı; soft-fail dozlarının sayısal tavanı (A5); telemetriyle kaybolma süresi izlenir |
| 3 | **Fiyat-süre cezası** ("X saat / Y dolar" inceleme kalıbı) | $9.99 + 3–4 saat bandı; süre boşluğu kronoloji-lite ve opsiyonel döngülerle kapatıldı (A1); Steam sayfasında süre vaadi opsiyonel |
| 4 | **Sembol-kapı sürtünmesi** — "bulmacasız saf atmosfer" bekleyen kitleyle (POOLS %95) çatışma + shape-match hayal kırıklığı | A6 tavanı (bölgede 1, toplam 4, ≤2–3 dk, cezasız deneme, diegetik ipucu, snap seçeneği); demoya bir kapı konarak kitlenin kendini filtrelemesi; tolerans playtest hipotezi (§14.2) |
| 5 | **Dürüstlük sicili okunmazlığı / kırılganlığı** — sistem belirsizse oyuncu fark etmez, karmaşıksa kapsam şişer | A3 sadeleşmesi: 5–6 ikili itiraz edilemez sinyal + yalnız 3 kova + yalnız 3 çıktı; kova değişiminde tek okunur tepki; korku türü değişir, miktarı değil |

İkincil izleme listesi: Merkez kural kırılmalarının teknik belirsizliği (azaltım: ilk çeyrek prototip — A16), soft-fail rage-quit riski (azaltım: A5 + §14.2 hipotezi), PSX trend yorgunluğu (azaltım: risk 1 ile aynı hat).

---

## Ek A — Karar Günlüğü (orijinal konseptten sapmalar)

| ⚠️ | Orijinal | Yeni karar | Gerekçe | Geri dönüş yolu |
|---|---|---|---|---|
| ⚠️ **Silme mekaniği** | Sağ tık her boyayı siler (Çizer'inki dahil) | Silme **yalnızca oyuncunun kendi boyasında** çalışır; Çizer'inki farklı madde — silinemez, üzeri kapatılamaz (altından sızar). Müdahale A2 tablosuyla tanımlı | Aksi halde Çizer — oyunun USP'si — sağ tıkla nötralize edilen temizlik angaryasına döner; tehdit bilişsel düzlemden silinir. Tasarımın en net hatasıydı | Decal katman bayrağı tek satırlık kontroldür; "her şey silinebilir" moduna dönüş teknik olarak trivial (ama tasarım gereği önerilmez) |
| ⚠️ **Renk sayısı** | 6 renk, tuşlar 1–6 | **4+1 renk**: başta 4; 5. (fosforlu) Rezervuar'da progresyon ödülü; 6. ertelendi | Oyuncular 4'ten fazla renge anlam atamıyor; fosforlu renk hem ödül hem karanlık bölge tasarımı açıyor. Çerçeve: "6 renk kesilmedi, 2'si playtest kanıtına ertelendi" (A9) | 1–6 tuşları rezerve, decal sistemi renk-agnostik, UI paleti 6'ya ölçeklenebilir → geri dönüş ≈ 1–2 gün; §14.2 A/B testi karar verir |
| ⚠️ **Pusula anomalisi davranışı** | Ölü noktada iğne "çıldırır" (rastgele sapma) | İğne yanlış ama **TUTARLI** şeyi gösterir: en yakın Gerçeklik Kırığı'nı. "Çıldırma" hissi korunur, altına öğrenilebilir katman eklenir | Rastgele sapma yalnız sinir bozar; tutarlı sapma öğrenen oyuncuya dedektör, öğrenmeyene tekinsizlik verir — türün "araçsız çaresizlik" şikâyetine cevap | Hedef Kırık yerine rastgele açı döndürmek tek parametre değişikliği; playtest "fazla okunur" derse gürültü karıştırılabilir |
| ⚠️ **Lore kaynağı: "Kelt ruhları"** | "Ruhlar düz çizgide uçar" inancı tek "Kelt" etiketiyle | **Çok kültürlü sentez:** Çin ruh perdesi duvarları + İrlanda peri/ceset yolları + İskandinav Trojaborg tuzakları; oyun içinde tek etnik etiket kullanılmaz | Araştırma doğrulaması: inancın en güçlü kaynağı Çin halk inancı; saf "Kelt" atfı hatalı. Sentez ayrıca "tek evrensel labirent" tezini güçlendirir ve Ruh Çarpışmaları'nı üç katmanla besler | Ruh Çarpışmaları mekaniği değişmedi; yalnız metin/atıf katmanı düzeltildi — geri dönüş yalnızca lore metni revizyonudur (önerilmez: doğruluk sorunu) |
| ⚠️ **Süre iddiası** | 3–4,5 saat (taslak karar) | **3–4 saat** + boşluk kronoloji-lite'ın MVP'ye alınması ve 2 opsiyonel döngüyle kapatıldı; backtracking yasak (A1) | Bölge dökümü ~2,5–3 saat veriyordu; şişirilmiş iddia "X saat / Y dolar" inceleme cezası riskiydi | Steam sayfasında süre vaadi opsiyonel tutulur; içerik büyürse iddia yukarı revize edilebilir |

---

## Ek B — Kesilenler Listesi [Kesildi]

| Kesilen | Tek cümlelik gerekçe |
|---|---|
| Sprey kutusu / boya mermisi ekonomisi | Tehditsiz oyunda kaynak ekonomisi angaryadır (Slender pil dersi); gerginlik kıtlıktan değil güvenden üretilir. |
| 6. renk (launch'ta) | Oyuncular 4'ten fazla renge anlam atamıyor; playtest kanıtına ertelendi (Ek A). |
| Şablon/stencil ve yazı tanıma | Sprey sisteminin kapsamını şişirir, notasyon özgürlüğüne bir şey katmaz. |
| Envanter ve craft | Anahtar oyuncunun kafasında taşınır; envanter "bilgi kilidi" tasarımını öldürür. |
| Harita / journal ekranı | Boya haritadır; ekran haritası core loop'un varlık sebebini iptal eder. |
| Sanity/can barı ve her tür HUD | Diegetik-öncelik sütunu; baskı görüntü-ses bozulmasıyla iletilir. |
| Watcher pathfinding AI, kovalama, saldırı | Jumpscare'siz vaat + bütçe; spawn koreografisi aynı korkuyu sıfır AI maliyetiyle verir. |
| Pusula upgrade'leri | Araç büyüsü ilerleme hissini ucuzlatır; progresyon fosforlu renk ve bilgiyle sağlanır. |
| Runtime prosedürel labirent üretimi | Homojen koridor çorbası üretir ve solo ekip için ayrı mühendislik projesidir; yalnız Merkez'de scripted numaralar vardır. |
| Mesh-paint / render-target boyama (MVP'de) | Decal sistemi ihtiyacın %90'ını karşılar; RT boyama [Hedef] araştırmasına ertelendi. |
| Sesli anlatım, NPC, flashback, uzun ara sahneler | Susan karakter + ortam anlatımı hem tema hem bütçe kararıdır. |
| İkiden fazla launch sonu | Sonlar tek mekanik + tek sahne varyasyonu kalmalı; üçüncü son ("İp") [Hedef-gizli] ve ilk kesilecek kalemdir. |
| NG+, zorluk seçenekleri, Hard mode | Launch kapsamı dışı; Hard mode (sınırlı boya) ancak launch sonrası değerlendirilir. |
| Eğilme / tırmanma | Hareket şemasını şişirir; devasalık hissi hız+FOV+kontrastla kurulur (A13). |
| Konsol sürümleri (launch'ta) | PC + Steam Deck doğrulaması önce; konsol launch sonrası. |
| Mısır ikonografisinin birebir kullanımı | Beton-brutalist soyut semboller hem PSX dokusuna hem "hiçbir kültüre ait değil" tekinsizliğine uygun; temsil/telif hassasiyeti. |
| Tohono O'odham "Man in the Maze" deseninin birebir kopyası | Yaşayan halkın kutsal sembolüdür; yalnız "aynı desen her kıtada" fikri kullanılır. |
| Süre doldurma amaçlı backtracking | A1 açık yasağı: süre boşluğu içerikle kapatılır, angaryayla değil. |

---

*— GDD sonu. Versiyon 1.0 (Final Taslak), Eylül 2026.*
