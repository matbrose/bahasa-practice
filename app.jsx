const { useState, useEffect, useRef, useMemo } = React;

const BUILTIN = [{"id":"Tidur","en":"Sleep","s":0},{"id":"Makan","en":"Eat","s":0},{"id":"Makan malam","en":"Dinner","s":0},{"id":"Makan pagi","en":"Breakfast","s":0},{"id":"Permisi","en":"Excuse me","s":0},{"id":"Sampai jumpa besok","en":"See you tomorrow","s":1},{"id":"Besok","en":"Tomorrow","s":0},{"id":"Saya tidak baik","en":"I'm not good","s":1},{"id":"Saya baik","en":"I'm good","s":0},{"id":"Selamat datang","en":"Welcome","s":0},{"id":"Selamat tidur","en":"Have a nice sleep","s":0},{"id":"Makan siang","en":"Lunch","s":0},{"id":"Apa kabar?","en":"How are you?","s":0},{"id":"Saya / aku","en":"Me/I","s":1},{"id":"Anda / Kamu","en":"You","s":1},{"id":"Dia","en":"She/He","s":0},{"id":"Kami/Kita","en":"We/Our","s":0},{"id":"Hallo, nama saya ___","en":"Hello my name is ___","s":1},{"id":"Asal saya dari ___","en":"I am from ___ Country","s":1},{"id":"Saya tinggal di ___","en":"I live in ___ Place","s":1},{"id":"Salam kenal","en":"Nice to meet you!","s":0},{"id":"Siapa namanya / Siapa nama kamu?","en":"What's your name?","s":1},{"id":"Darimana asal kamu?","en":"Where are you from?","s":1},{"id":"Berapa umur kamu?","en":"How old are you?","s":1},{"id":"Halo, permisi apa mbak tau dimana jual nasi goreng?","en":"Hi, excuse me, do you know where I can find Nasi Goreng?","s":1},{"id":"Siapa itu","en":"Who is that","s":0},{"id":"Nama saya bukan ...","en":"My name is not ...","s":1},{"id":"Saya dua puluh tahun","en":"I am twenty years old","s":1},{"id":"Bukan","en":"Not","s":0},{"id":"Setelah","en":"After","s":0},{"id":"Sebelum","en":"Before","s":0},{"id":"Banyak","en":"A lot","s":0},{"id":"Banget","en":"Very","s":0},{"id":"Kamu kerja sebelum kelas?","en":"Did you work before class?","s":1},{"id":"Hari ini kerja banyak?","en":"Today is a lot of work?","s":1},{"id":"Hari ini kamu minum kopi?","en":"You already had coffee today?","s":1},{"id":"Kamu tidur malam banget?","en":"You sleep late?","s":1},{"id":"Kenapa / Mengapa","en":"Why","s":1},{"id":"Kenapa kamu sedih?","en":"Why are you sad?","s":1},{"id":"Karena saya tidur malam banget","en":"Because I went to bed really late","s":1},{"id":"Kenapa dia pergi?","en":"Why did she/he leave?","s":1},{"id":"Sampai nanti (malam)","en":"See you tonight","s":1},{"id":"Maaf / Saya minta maaf","en":"I'm sorry","s":1},{"id":"Tolong","en":"Help/Please","s":0},{"id":"Tolong menu","en":"Menue please","s":0},{"id":"Tolong saya","en":"Help me","s":0},{"id":"Sama-sama","en":"You're welcome","s":0},{"id":"Mau","en":"Want","s":0},{"id":"Permisi saya mau menu tolong","en":"Excuse me, I want menue please","s":1},{"id":"Tangan","en":"Hands","s":0},{"id":"Kiri","en":"Left","s":0},{"id":"Kanan","en":"Right","s":0},{"id":"Minum","en":"Drink","s":0},{"id":"Kamu makan pagi apa hari ini","en":"What did you eat for breakfast today?","s":1},{"id":"Apa","en":"What","s":0},{"id":"Ibu/Bapak","en":"Madam/Sir","s":0},{"id":"Mbak","en":"Girl/sister","s":0},{"id":"Mas","en":"Man/guy","s":0},{"id":"Permisi mbak, toiletnya dimana?","en":"Excuse me miss, where is the toilet?","s":1},{"id":"Asal saya dari...","en":"I am from...","s":1},{"id":"Asal","en":"Hometown","s":0},{"id":"Saya tinggal di...","en":"I live in...","s":1},{"id":"Tinggal","en":"Living","s":0},{"id":"Salam kenal juga","en":"Nice to meet you too","s":1},{"id":"Siapa nama kamu?","en":"What's your name?","s":1},{"id":"Siapa","en":"Who","s":0},{"id":"Tinggal dimana?","en":"Where do you live?","s":0},{"id":"Ibu","en":"Mother","s":0},{"id":"Bapak","en":"Father","s":0},{"id":"Tante","en":"Aunty","s":0},{"id":"Kakek","en":"Grandpa","s":0},{"id":"Nenek","en":"Grandma","s":0},{"id":"Om","en":"Uncle","s":0},{"id":"Dimana","en":"Where","s":0},{"id":"Di","en":"In/on/at","s":0},{"id":"Ke","en":"Going to","s":0},{"id":"Dari","en":"From","s":0},{"id":"Dimana kamu tinggal?","en":"Where do you live?","s":1},{"id":"Di jerman","en":"In Germany","s":0},{"id":"Dimana kamu?","en":"Where are you?","s":0},{"id":"Saya ke cafe","en":"I'm going to cafe","s":1},{"id":"Kemana kamu pergi?","en":"Where are you going?","s":1},{"id":"Kemana kamu pergi hari ini?","en":"Where are you going today?","s":1},{"id":"Darimana kamu datang?","en":"Where did you came from?","s":1},{"id":"Saya tidur nyenyak","en":"I slept good","s":1},{"id":"Apa kamu tidur bagus?","en":"Did you sleep well?","s":1},{"id":"Hari ini kamu kerja?","en":"Are you working today?","s":1},{"id":"Kemarin","en":"Yesterday","s":0},{"id":"Kapan","en":"When","s":0},{"id":"Kapan ulang tahun?","en":"When is your birthday?","s":1},{"id":"Tahun","en":"Year","s":0},{"id":"Tolong ulangi","en":"Repeat please","s":0},{"id":"Kapan kamu tidur?","en":"When do you go to sleep?","s":1},{"id":"Kenapa kamu kerja hari ini?","en":"Why do you work today?","s":1},{"id":"Karena saya harus makan","en":"Because I have to eat","s":1},{"id":"Harus","en":"Have to","s":0},{"id":"Bagaimana/Gimana","en":"How","s":0},{"id":"Gimana kabar kamu / Apa kabar?","en":"How are you?","s":1},{"id":"Kabar sehat?","en":"How's your health?","s":0},{"id":"Gimana hari kamu?","en":"How was your day?","s":1},{"id":"Gimana kamu datang?","en":"How did you come here?","s":1},{"id":"Udah","en":"Already","s":0},{"id":"Udah makan?","en":"Did you already eat?","s":0},{"id":"Berapa","en":"How many/much","s":0},{"id":"Jam berapa","en":"What time?","s":0},{"id":"Berapa jam","en":"How many hours?","s":0},{"id":"Berapa lama","en":"How long?","s":0},{"id":"Jam berapa kamu kerja hari ini?","en":"What time are you working today?","s":1},{"id":"Berapa lama kamu kerja?","en":"How long do you work in this job?","s":1},{"id":"Berapa jam kamu kerja hari ini?","en":"How many hours do you work today?","s":1},{"id":"Ayo pergi!","en":"Let's go!","s":0},{"id":"Saya akan","en":"I will","s":0},{"id":"Menunjukkan","en":"Show","s":0},{"id":"Tempat-tempat","en":"Places","s":0},{"id":"Saya akan menunjukkan tempat-tempat ke kamu","en":"I will show you places","s":1},{"id":"Punya","en":"Have","s":0},{"id":"Merah","en":"Red","s":0},{"id":"Gaun","en":"Dress","s":0},{"id":"Koran","en":"Newspaper","s":0},{"id":"Surat","en":"Letter","s":0},{"id":"Menulis","en":"Write","s":0},{"id":"Saya suka...","en":"I like...","s":0},{"id":"Buku","en":"Book","s":0},{"id":"Kurang baik","en":"Not too good","s":0},{"id":"Sampai jumpa!","en":"See you!","s":0},{"id":"Satu","en":"One","s":0},{"id":"Dua","en":"Two","s":0},{"id":"Tiga","en":"Three","s":0},{"id":"Empat","en":"Four","s":0},{"id":"Lima","en":"Five","s":0},{"id":"Enam","en":"Six","s":0},{"id":"Tujuh","en":"Seven","s":0},{"id":"Delapan","en":"Eight","s":0},{"id":"Sembilan","en":"Nine","s":0},{"id":"Sepuluh","en":"Ten","s":0},{"id":"Untuk","en":"For","s":0},{"id":"Daging","en":"Meat","s":0},{"id":"Pesan","en":"Order","s":0},{"id":"Stroberi","en":"Strawberry","s":0},{"id":"Tomat","en":"Tomato","s":0},{"id":"Telur","en":"Egg","s":0},{"id":"Enak","en":"Delicious","s":0},{"id":"Manis","en":"Sweet","s":0},{"id":"Kamu mau nasi dengan ayam?","en":"Would you like rice with chicken?","s":1},{"id":"Dengan","en":"With","s":0},{"id":"Ayam","en":"Chicken","s":0},{"id":"Gak papa","en":"That's fine","s":0},{"id":"Kamu bangun jam berapa hari ini?","en":"What time you woke up today?","s":1},{"id":"Kamu kerja jam berapa hari ini?","en":"What time do you work today?","s":1},{"id":"Hari","en":"Day","s":0},{"id":"Senin","en":"Monday","s":0},{"id":"Selasa","en":"Tuesday","s":0},{"id":"Rabu","en":"Wednesday","s":0},{"id":"Kamis","en":"Thursday","s":0},{"id":"Jumat","en":"Friday","s":0},{"id":"Sabtu","en":"Saturday","s":0},{"id":"Minggu","en":"Sunday","s":0},{"id":"Hari ini hari apa?","en":"What day is today?","s":1},{"id":"Masa lalu","en":"Past","s":0},{"id":"Setiap hari","en":"Daily / Every day","s":0},{"id":"Minggu depan","en":"Next week","s":0},{"id":"Minggu lalu","en":"Last week","s":0},{"id":"Tanggal","en":"Date","s":0},{"id":"Masa depan","en":"Future","s":0},{"id":"Masa","en":"Era","s":0},{"id":"Hari minggu lalu saya tidur banyak","en":"Last Sunday i slept a lot","s":1},{"id":"Dua hari depan hari apa?","en":"What day is in two days?","s":1},{"id":"Tanggal berapa","en":"What date?","s":0},{"id":"Saya pergi ke Indonesia tanggal dua November","en":"I go to Indonesia on the second of november","s":1},{"id":"Setiap pagi aku makan nasi","en":"I eat rice every morning","s":1},{"id":"Setiap","en":"Every","s":0},{"id":"Masuk","en":"Catch","s":0},{"id":"Angin","en":"Wind","s":0},{"id":"Minta","en":"Ask","s":0},{"id":"Panas","en":"Hot","s":0},{"id":"Saya tidak tau","en":"I don't know","s":1},{"id":"Dingin","en":"Cold","s":0},{"id":"Keren","en":"Cool","s":0},{"id":"Tapi","en":"But","s":0},{"id":"Atau","en":"Or","s":0},{"id":"Tadi malam","en":"Last night","s":0},{"id":"Rencana","en":"Planning","s":0},{"id":"Hujan","en":"Raining","s":0},{"id":"Ingin","en":"Want","s":0},{"id":"Aku ingin punya banyak rencana dengan kamu","en":"I want to have a lot of plans with you","s":1},{"id":"Bangun","en":"Wake up","s":0},{"id":"Aku ingin masak untuk kamu","en":"I want to cook for you","s":1},{"id":"Liburan","en":"Holiday","s":0},{"id":"Lapar","en":"Hungry","s":0},{"id":"Selalu","en":"Always","s":0},{"id":"Mantap","en":"Good/wonderful (slang)","s":0},{"id":"Jam empat sore","en":"It's 4pm","s":1},{"id":"Masak","en":"Cooking","s":0},{"id":"Tanya","en":"Question","s":0},{"id":"Dua hari depan hari ... kamis","en":"In two days it's ... Thursday","s":1},{"id":"Minggu ini kamu sibuk?","en":"Are you busy this week?","s":1},{"id":"Ya, saya sibuk minggu ini","en":"Yes, I am busy this week","s":1},{"id":"Setiap pagi kamu minum apa?","en":"What are you drinking every morning?","s":1},{"id":"Waktu","en":"Time","s":0},{"id":"Kamu ada waktu","en":"Do you have time?","s":1},{"id":"Jam berapa kamu ada waktu?","en":"What time do you have free time?","s":1},{"id":"Kamu ada waktu besok pagi jam delapan","en":"Do you have time tomorrow morning at 8am?","s":1},{"id":"Tadi","en":"Earlier (recently in the past)","s":0},{"id":"Tadi malam saya makan sate ayam","en":"Last night i ate chicken sate","s":1},{"id":"Nanti","en":"Later","s":0},{"id":"Saya akan belajar nanti","en":"I will study later","s":1},{"id":"Akan","en":"will","s":0},{"id":"Mandi","en":"Shower/taking a bath","s":0},{"id":"Saya akan mandi nanti","en":"I will take a shower later","s":1},{"id":"Lalu","en":"After/afterwards (past)","s":0},{"id":"Depan","en":"Next/ahead","s":0},{"id":"Lusa","en":"The day after tomorrow","s":0},{"id":"Lima hari depan","en":"Next five days","s":1},{"id":"Pulang","en":"Go back home/go home","s":0},{"id":"Ngapain","en":"Do/doing (for past and future)","s":0},{"id":"Pedas","en":"Spicy","s":0},{"id":"Kamu lapar?","en":"Are you hungry?","s":0},{"id":"Capek","en":"Tired","s":0},{"id":"Sedikit","en":"A little","s":0},{"id":"Saya capek sedikit","en":"I am a little tired","s":1},{"id":"Mata","en":"Eye","s":0},{"id":"Mata-mata","en":"Spy","s":0},{"id":"Aku rencana tidur jam satu atau dua","en":"I plan to sleep at one or two (am)","s":1},{"id":"Warna","en":"Color","s":0},{"id":"Kegiatan","en":"Activity/playing","s":0},{"id":"Berbicara","en":"Speak/talking","s":0},{"id":"Bersepeda","en":"Cycling/ride a bike","s":0},{"id":"Tapi aku ingin berbicara dengan kamu","en":"But I want to talk to you","s":1},{"id":"Ini","en":"this","s":0},{"id":"Sana","en":"There","s":0},{"id":"Sini","en":"Here","s":0},{"id":"Di sana","en":"At there","s":0},{"id":"Di sini","en":"In here","s":0},{"id":"Musim","en":"Season","s":0},{"id":"Musim panas","en":"Summer","s":0},{"id":"Musim dingin","en":"Winter","s":0},{"id":"Musim gugur","en":"Fall","s":0},{"id":"Musim semi","en":"Spring","s":0},{"id":"Paling","en":"Most","s":0},{"id":"Lakukan","en":"Do","s":0},{"id":"Lagi","en":"Do/doing (for moments right now) / Again / More / Anymore / Else","s":0},{"id":"Kamu lagi apa?","en":"What are you doing?","s":1},{"id":"Aku mau makan lagi","en":"I want to eat again","s":1},{"id":"Aku mau kopi lagi","en":"I want more coffee","s":1},{"id":"Tambah","en":"Add","s":0},{"id":"Bisa","en":"Can","s":0},{"id":"Saya tidak makan pizza lagi","en":"I don't want to eat pizza anymore","s":1},{"id":"Apa lagi?","en":"What else?","s":0},{"id":"Membaca","en":"Reading","s":0},{"id":"Saya main dengan teman saya","en":"I play with my friend","s":1},{"id":"Sekitar","en":"Around","s":0},{"id":"Dua belas","en":"12","s":0},{"id":"Tiga belas","en":"13","s":0},{"id":"Sebelas","en":"11","s":0},{"id":"Dua puluh","en":"20","s":0},{"id":"Tiga puluh","en":"30","s":0},{"id":"Seratus","en":"100","s":0},{"id":"Seratus sepuluh","en":"110","s":0},{"id":"Dua ratus","en":"200","s":0},{"id":"Nomor","en":"Number","s":0},{"id":"Ribu","en":"For 1000s","s":0},{"id":"Juta","en":"For million","s":0},{"id":"Miliar","en":"For bilion","s":0},{"id":"Pertama","en":"First","s":0},{"id":"Kedua","en":"Second","s":0},{"id":"Ketiga","en":"Third","s":0},{"id":"Uang","en":"Money","s":0},{"id":"Kata","en":"Word","s":0},{"id":"Pintu","en":"Door","s":0},{"id":"Pintu keluar","en":"Exit door","s":0},{"id":"Pintu masuk","en":"Entrance door","s":0},{"id":"Mesin ATM keluar uang","en":"The ATM dispense money","s":1},{"id":"Hati","en":"Heart","s":0},{"id":"Hati-hati","en":"Be careful","s":0},{"id":"Jalan","en":"Road/street","s":0},{"id":"Beda","en":"Different","s":0},{"id":"Setiap pulau di Indonesia punya hantu beda","en":"Every island in Indonesia has a different ghost","s":1},{"id":"Baru","en":"New","s":0},{"id":"Marah","en":"Angry","s":0},{"id":"Ada orang lagi marah di sana?","en":"Is there an angry person (in) there?","s":1},{"id":"Anak","en":"Children","s":0},{"id":"Taman","en":"Park","s":0},{"id":"Saya tidak ada waktu","en":"I don't have time","s":1},{"id":"Kentang","en":"Potato","s":0},{"id":"Kamu kentang","en":"You are weak","s":0},{"id":"Kentang goreng","en":"French fries","s":0},{"id":"Rambut hitam panjang","en":"Long black hair","s":1},{"id":"Rambut","en":"Hair","s":0},{"id":"Muka","en":"Face","s":0},{"id":"Pohon","en":"Tree","s":0},{"id":"Lama","en":"Old","s":0},{"id":"Kecil","en":"Small","s":0},{"id":"Anak kecil","en":"Small kid","s":0},{"id":"Rapat saya hari ini panjang banget","en":"My meeting today was really long","s":1},{"id":"Berapa jam rapat kamu hari ini","en":"How many hours is your meeting today?","s":1},{"id":"Kamu tidak sakit kepala?","en":"You don't have a headache?","s":1},{"id":"Sayur","en":"Veggie","s":0},{"id":"Mungkin","en":"Maybe","s":0},{"id":"Tidak tahu","en":"I don't know","s":0},{"id":"Tidak tahu mereka bicara apa","en":"I don't know what they said/are talking about","s":1},{"id":"Babi","en":"Pig","s":0},{"id":"Mahal","en":"Expensive","s":0},{"id":"Harga","en":"Price","s":0},{"id":"Teman","en":"Friend","s":0},{"id":"Kamu mau makan malam apa dengan teman-teman?","en":"What do you want to eat for dinner with your friends?","s":1},{"id":"Topi","en":"Hat","s":0},{"id":"Beli (Membeli)","en":"Buying","s":0},{"id":"Kaus","en":"T-Shirt","s":0},{"id":"Kemeja","en":"Shirt","s":0},{"id":"Celana","en":"Pants","s":0},{"id":"Memakai","en":"Wearing","s":0},{"id":"Tas","en":"Bag","s":0},{"id":"Payung","en":"Umbrella","s":0},{"id":"Dompet","en":"Wallet","s":0},{"id":"Pakaian","en":"Clothes","s":0},{"id":"Yang","en":"That/which","s":0},{"id":"Jadi","en":"So","s":0},{"id":"Namun","en":"However/But","s":0},{"id":"Ketika","en":"When","s":0},{"id":"Ingat","en":"Remember","s":0},{"id":"Kuat","en":"Strong","s":0}];

/* ------------------------------------------------------------------
   SCHEDULER
   Core: FSRS-6 (Free Spaced Repetition Scheduler), the algorithm Anki
   ships as its default. Memory state per item = Stability + Difficulty,
   retrievability decays on a trainable power curve. 21 default weights
   from the open-spaced-repetition project.

   Three layers on top, which FSRS and Duolingo both lack:
   1. Grades are measured, not self-reported. You type, so the grade
      comes from the answer and the time it took.
   2. Content-aware priors (KARL, EMNLP 2024): a card you have never
      seen inherits a memory prior from cards sharing its words.
   3. Pattern layer: every card is tagged with the grammar it uses,
      errors roll up to the pattern, and generated practice targets
      the weakest pattern instead of random vocabulary.
   Production and recognition are scheduled as separate memories.
------------------------------------------------------------------ */

const W = [0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001, 1.8722, 0.1666,
  0.796, 1.4835, 0.0614, 0.2629, 1.6483, 0.6014, 1.8729, 0.5425, 0.0912, 0.0658, 0.1542];
const DEC = W[20];
const FAC = Math.pow(0.9, -1 / DEC) - 1;
const DAY = 86400000;
const clampD = (d) => Math.min(10, Math.max(1, d));

const retriev = (days, S) => Math.pow(1 + FAC * (days / Math.max(S, 0.01)), -DEC);
const interval = (r, S) => Math.max(0.02, (S / FAC) * (Math.pow(r, -1 / DEC) - 1));
const initS = (g) => Math.max(0.01, W[g - 1]);
const initD = (g) => clampD(W[4] - Math.exp(W[5] * (g - 1)) + 1);

const nextD = (D, g) => {
  const dd = -W[6] * (g - 3);
  const d1 = D + dd * ((10 - D) / 9);
  return clampD(W[7] * initD(4) + (1 - W[7]) * d1);
};

const sRecall = (D, S, R, g) => {
  const hard = g === 2 ? W[15] : 1;
  const easy = g === 4 ? W[16] : 1;
  const inc = Math.exp(W[8]) * (11 - D) * Math.pow(S, -W[9]) * (Math.exp(W[10] * (1 - R)) - 1) * hard * easy;
  return S * (1 + Math.max(0, inc));
};

const sForget = (D, S, R) =>
  Math.min(S, W[11] * Math.pow(D, -W[12]) * (Math.pow(S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R)));

const sSameDay = (S, g) => {
  const inc = Math.exp(W[17] * (g - 3 + W[18])) * Math.pow(S, -W[19]);
  return S * (g >= 3 ? Math.max(1, inc) : inc);
};

// one review -> new memory state
function review(state, grade, now, prior) {
  if (!state) {
    const S = prior && prior.s ? (initS(grade) + prior.s) / 2 : initS(grade);
    const D = prior && prior.d ? (initD(grade) + prior.d) / 2 : initD(grade);
    return { s: Math.max(0.01, S), d: clampD(D), t: now, r: 1, l: grade === 1 ? 1 : 0 };
  }
  const days = (now - state.t) / DAY;
  const R = retriev(days, state.s);
  const D = nextD(state.d, grade);
  let S;
  if (days < 1) S = sSameDay(state.s, grade);
  else if (grade === 1) S = sForget(state.d, state.s, R);
  else S = sRecall(state.d, state.s, R, grade);
  return { s: Math.max(0.01, S), d: D, t: now, r: (state.r || 0) + 1, l: (state.l || 0) + (grade === 1 ? 1 : 0) };
}

/* Criterion learning (Rawson & Dunlosky). Until an item has been recalled
   correctly on three separate days, its interval is capped, so the three
   successes land in three spaced sessions instead of one. Recalling once
   in each of three spaced sessions beats three times in one session by
   roughly a factor of two on one-week retention. */
/* Gap-filling on his own sentence cards: production, but with the
   sentence around it. Receptive practice does not transfer to speaking
   nearly as well as productive practice does, so the mix leans that way. */
const STOPGAP = new Set(["di", "ke", "dari", "dan", "yang", "ini", "itu", "apa", "ya"]);
function gapOf(text, weakSet) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 3) return null;
  const scored = words.map((w, i) => {
    const bare = w.toLowerCase().replace(/[.,!?;:"']/g, "");
    if (bare.length < 3 || STOPGAP.has(bare)) return { i, s: -1 };
    return { i, s: (weakSet && weakSet.has(canonWord(bare)) ? 10 : 0) + bare.length / 10 };
  }).filter((x) => x.s > 0);
  if (!scored.length) return null;
  scored.sort((a, b) => b.s - a.s);
  const pick = scored[0].i;
  return { answer: words[pick].replace(/[.,!?;:"']/g, ""), prompt: words.map((w, i) => (i === pick ? "_____" : w)).join(" ") };
}

const CAP = [1, 1, 2, 4];
const schedInt = (st, want) => {
  const raw = interval(want, st.s);
  const cr = st.cr || 0;
  return cr >= 3 ? raw : Math.min(raw, CAP[cr] || 1);
};

const dueIn = (state, want, now) => {
  if (!state) return -1;
  const days = (now - state.t) / DAY;
  return schedInt(state, want) - days;
};

const nowR = (state, now) => (state ? retriev((now - state.t) / DAY, state.s) : 0);

const showDelay = (d) => {
  if (d < 1 / 24) return "minutes";
  if (d < 1) return Math.round(d * 24) + "h";
  if (d < 30) return Math.round(d) + "d";
  if (d < 365) return Math.round(d / 30) + "mo";
  return (d / 365).toFixed(1) + "y";
};

/* ---------------- pattern layer ---------------- */

const STOP = new Set(["berapa", "besok", "bersih", "menu", "merah", "mereka", "meja"]);
const PATTERNS = [
  ["time markers", /\b(udah|sudah|belum|lagi|akan|tadi|nanti|besok|kemarin|lusa|sekarang|selalu|masih)\b/i],
  ["question words", /\b(apa|siapa|kenapa|mengapa|dimana|kemana|darimana|kapan|berapa|gimana|bagaimana)\b/i],
  ["place words", /\b(di|ke|dari|sini|sana|situ)\b/i],
  ["negation", /\b(tidak|nggak|gak|bukan|belum|jangan)\b/i],
  ["modals", /\b(mau|ingin|bisa|harus|boleh|suka)\b/i],
  ["affixed verbs", /\b(mem\w+|men\w+|meng\w+|meny\w+|ber\w+|\w{4,}kan)\b/i],
  ["numbers and time", /\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh|belas|puluh|ratus|ribu|juta|jam|hari|tahun|bulan|pagi|siang|sore|malam)\b/i],
  ["pronouns", /\b(saya|aku|kamu|anda|dia|kami|kita|mereka|nya)\b/i],
];

function tagsOf(text) {
  const out = [];
  for (const [name, re] of PATTERNS) {
    const m = text.match(re);
    if (m && !STOP.has(m[0].toLowerCase())) out.push(name);
  }
  return out.length ? out : ["core words"];
}

const tokens = (s) => s.toLowerCase().replace(/-/g, " ").replace(/[^a-z\s]/g, " ").split(/\s+/).filter((w) => w.length > 2);


/* ------------------------------------------------------------------
   EQUIVALENCE + DIFF
   saya and aku are the same word to a learner, so the checker treats
   them as one. Same for the casual forms he actually needs with his
   partner: gak, udah, gimana, ke mana.
------------------------------------------------------------------ */

const PAIRS = [
  ["di mana", "dimana"], ["ke mana", "kemana"], ["dari mana", "darimana"],
  ["apa kabar", "apakabar"], ["tidak tahu", "tidaktahu"],
];

const EQUIV = {
  // casual spellings of the same word
  temen: "teman", bener: "benar", males: "malas", laen: "lain", capek: "capai", ketemu: "bertemu",
  saya: "1sg", aku: "1sg", gue: "1sg", gua: "1sg", ku: "1sg",
  kamu: "2sg", anda: "2sg", kau: "2sg", mu: "2sg",
  tidak: "neg", gak: "neg", nggak: "neg", enggak: "neg", tak: "neg", ga: "neg",
  sudah: "perf", udah: "perf",
  bagaimana: "how", gimana: "how",
  kenapa: "why", mengapa: "why",
  mau: "want", ingin: "want",
  bisa: "can", dapat: "can",
  sekarang: "now",
  dimana: "where", kemana: "whereto", darimana: "wherefrom",
};

// casual counterpart of a formal word, for the "both work" hint
const CASUAL = { saya: "aku", tidak: "gak", sudah: "udah", bagaimana: "gimana", anda: "kamu", mengapa: "kenapa" };

const canonWord = (w) => EQUIV[w] || w;

// the tags above are for matching only; on screen they become real words again
const SHOW = {
  casual: { "1sg": "aku", "2sg": "kamu", neg: "gak", perf: "udah", how: "gimana", why: "kenapa", want: "mau", can: "bisa",
    now: "sekarang", where: "di mana", whereto: "ke mana", wherefrom: "dari mana" },
  polite: { "1sg": "saya", "2sg": "Anda", neg: "tidak", perf: "sudah", how: "bagaimana", why: "mengapa", want: "mau", can: "bisa",
    now: "sekarang", where: "di mana", whereto: "ke mana", wherefrom: "dari mana" },
};
const showWord = (w, register) => (SHOW[register === "polite" ? "polite" : "casual"][w] || w);

// the model likes dashes; the user does not
const undash = (s) => (s || "").replace(/\s*[—–]\s*/g, ", ").replace(/\s+,/g, ",").trim();

function canonTokens(s) {
  let t = (s || "").toLowerCase().replace(/-/g, " ").replace(/[.,!?;:"']/g, " ").replace(/\s+/g, " ").trim();
  for (const [long, short] of PAIRS) t = t.split(long).join(short);
  return t.split(" ").filter(Boolean);
}

const canonKey = (s) => canonTokens(s).map(canonWord).join(" ");

// longest common subsequence over canonical forms, so synonyms never show up as errors
function diffWords(mine, correct) {
  const a = (mine || "").trim().replace(/-/g, " ").split(/\s+/).filter(Boolean);
  const b = (correct || "").trim().replace(/-/g, " ").split(/\s+/).filter(Boolean);
  const ca = a.map((w) => canonWord(w.toLowerCase().replace(/[.,!?;:"']/g, "")));
  const cb = b.map((w) => canonWord(w.toLowerCase().replace(/[.,!?;:"']/g, "")));
  const m = ca.length, n = cb.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] = ca[i] === cb[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const left = [], right = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (ca[i] === cb[j]) { left.push({ t: a[i], ok: true }); right.push({ t: b[j], ok: true }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { left.push({ t: a[i], ok: false }); i++; }
    else { right.push({ t: b[j], ok: false }); j++; }
  }
  while (i < m) { left.push({ t: a[i++], ok: false }); }
  while (j < n) { right.push({ t: b[j++], ok: false }); }
  return { left, right };
}

const bare = (t) => canonWord(String(t).toLowerCase().replace(/[.,!?;:"'()\[\]]/g, ""));

/* A word he never wrote is a gap in vocabulary.
   A word he did write but in the wrong place is grammar, not vocabulary. */
const ENGLISH = new Set(["a","an","the","is","are","was","were","do","does","did","to","of","in","on","at","for","with",
  "you","i","he","she","it","we","they","me","my","your","his","her","their","this","that","there","here","and","or","but",
  "not","no","yes","please","want","have","has","had","be","been","can","will","would","should","could","what","where",
  "when","why","who","how","which","some","any","from","about","again","very","really","just","now","today","tomorrow"]);

function classifyMiss(mine, correct) {
  const { right } = diffWords(mine, correct);
  const mineSet = new Set(canonTokens(mine).map(canonWord));
  const missing = [], misplaced = [];
  const seen = new Set();
  right.filter((x) => !x.ok).map((x) => bare(x.t)).filter((w) => w.length > 2 && !ENGLISH.has(w))
    .forEach((w) => {
      if (seen.has(w)) return;                    // reduplication counts once
      seen.add(w);
      (mineSet.has(w) ? misplaced : missing).push(w);
    });
  return { missing, misplaced };
}

// which words of the model answer he did not produce
function missedWords(mine, correct) {
  return classifyMiss(mine, correct).missing;
}

function hitWords(mine, correct) {
  const { right } = diffWords(mine, correct);
  return right.filter((x) => x.ok).map((x) => bare(x.t)).filter((w) => w.length > 2 && !ENGLISH.has(w));
}

// the model quotes the words it is talking about; make them stand out
// the model explains a whole sentence at once; keep only the sentences that
// actually mention this word, so each entry says something about itself
const aboutWord = (note, word) => {
  const t = undash(note || "");
  if (!t || !word) return t;
  const parts = t.split(/(?<=[.;!?])\s+/).filter(Boolean);
  const hit = parts.filter((p) => canonTokens(p).map(canonWord).includes(canonWord(word)));
  return hit.length ? hit.join(" ") : "";
};

const Note = ({ text }) => {
  const t = undash(text || "");
  if (!t) return null;
  const parts = t.split(/('[^']{1,40}'|"[^"]{1,40}")/g);
  return (
    <span>
      {parts.map((p, i) =>
        /^['"].*['"]$/.test(p)
          ? <b key={i} className="bh-q">{p.slice(1, -1)}</b>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
};

const Diff = ({ parts, tone }) => (
  <span>
    {parts.map((p, i) => (
      <span key={i} className={p.ok ? "" : tone === "mine" ? "bh-bad" : "bh-fix"}>{p.t}{" "}</span>
    ))}
  </span>
);

/* ---------------- answer checking ---------------- */

// a hyphen in reduplication is a spelling choice, not grammar: teman-teman = teman teman
const norm = (s) => (s || "").toLowerCase().replace(/\(.*?\)/g, " ").replace(/-/g, " ")
  .replace(/[.,!?;:"']/g, " ").replace(/\s+/g, " ").trim();
const variants = (s) => norm(s).split(/\s*\/\s*/).map((x) => x.trim()).filter(Boolean);

const lev = (a, b) => {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 9;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
};

const HINT = /[([]([^)\]]+)[)\]]\s*$/;
const splitHint = (s) => {
  const m = (s || "").match(HINT);
  return m ? { main: s.slice(0, m.index).trim(), hint: m[1].trim() } : { main: (s || "").trim(), hint: "" };
};

const BLANK = /_{2,}|\.{3,}|…/;
const hasBlank = (s) => BLANK.test(s || "");

// "Saya tinggal di ___" accepts anything in the slot, and tolerates a typo in the fixed part
const near = (a, b) => a === b || (b.length > 3 && lev(a, b) <= 1);

const blankMatch = (mine, target, cueHasBlank) => {
  const segs = (target || "").split(BLANK)
    .map((s) => canonKey(s).split(" ").filter(Boolean))
    .filter((s) => s.length);
  const mt = canonKey(mine).split(" ").filter(Boolean);
  if (!mt.length) return false;
  if (!segs.length) return true;
  let pos = 0, fixed = 0;
  for (const seg of segs) {
    let found = -1;
    for (let i = pos; i + seg.length <= mt.length; i++) {
      if (seg.every((w, j) => near(mt[i + j], w))) { found = i; break; }
    }
    if (found < 0) return false;
    pos = found + seg.length;
    fixed += seg.length;
  }
  // if the question itself showed a blank, leaving it open is a correct mirror
  return cueHasBlank ? true : mt.length > fixed;
};

const judge = (mine, target, cueHasBlank) => {
  if (hasBlank(target)) return blankMatch(mine, target, cueHasBlank) ? "yes" : "no";
  const m = norm(mine);
  if (!m) return "no";
  const vs = variants(target);
  if (vs.includes(m)) return "yes";
  const mk = canonKey(mine);
  if (variants(target).some((v) => canonKey(v) === mk)) return "yes";
  for (const v of vs) {
    const d = lev(m, v);
    if (d <= 1 && v.length > 4) return "typo";
    if (d <= 2 && v.length > 10) return "typo";
  }
  return "no";
};

// measured grade: what you typed, and how long you took
function gradeOf(verdict, ms, len) {
  if (verdict === "no" || verdict === "skip") return 1;
  if (verdict === "typo") return 2;
  const budget = 2200 + len * 260;
  return ms < budget ? 4 : 3;
}

/* ---------------- deck import ---------------- */

function parseExport(text) {
  const out = [], seen = new Set();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    let parts = line.split("\t");
    if (parts.length < 2) parts = line.split(";");
    if (parts.length < 2) parts = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    if (parts.length < 2) continue;
    const strip = (s) => s.replace(/<br\s*\/?>/gi, " / ").replace(/<[^>]+>/g, "").replace(/^"|"$/g, "").replace(/\s+/g, " ").trim();
    const id = strip(parts[0]), en = strip(parts[1]);
    if (!id || !en) continue;
    const k = id.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ id, en, s: id.split(" ").length > 2 ? 1 : 0 });
  }
  return out;
}


/* ------------------------------------------------------------------
   IMPORT RECONCILIATION
   A new Anki export never wipes anything. Known typo fixes are
   re-applied automatically, and when a card's Indonesian text changed
   but its English side did not, its scheduling history moves across
   instead of starting over.
------------------------------------------------------------------ */

const SEED_FIXES = {
  "talong ulang": "Tolong ulangi",
  "karena saya harus kaman": "Karena saya harus makan",
  "masu lalu": "Masa lalu",
  "memekai": "Memakai",
  "libaran": "Liburan",
  "seratus puluh": "Seratus sepuluh",
  "saya maaf": "Maaf / Saya minta maaf",
  "saya pergi di indonesia tanggal dua november": "Saya pergi ke Indonesia tanggal dua November",
  "aku ingin (ke) punya rencana banyak dengan kamu": "Aku ingin punya banyak rencana dengan kamu",
  "tidur saya bagus": "Saya tidur nyenyak",
};
const SEED_EN_FIXES = {
  "darimana asal kamu?": "Where are you from?",
  "kamu kerja jam berapa hari ini?": "What time do you work today?",
  "tomat": "Tomato",
};

const glossKey = (s) => (s || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

function reconcile(parsed, oldVocab, data) {
  const fixes = { ...SEED_FIXES, ...(data.fixes || {}) };
  let fixed = 0;
  const cards = parsed.map((c) => {
    const hit = fixes[c.id.toLowerCase()];
    const enHit = SEED_EN_FIXES[c.id.toLowerCase()];
    if (hit || enHit) fixed++;
    return { ...c, id: hit || c.id, en: enHit || c.en };
  });

  const newIds = new Set(cards.map((c) => c.id.toLowerCase()));
  const oldIds = new Set((oldVocab || []).map((c) => c.id.toLowerCase()));
  const gone = (oldVocab || []).filter((c) => !newIds.has(c.id.toLowerCase()));
  const arrived = cards.filter((c) => !oldIds.has(c.id.toLowerCase()));

  // a card whose Indonesian was corrected keeps its history, matched on the English side
  const byGloss = new Map();
  gone.forEach((g) => byGloss.set(glossKey(g.en), g));
  const mem = { ...(data.mem || {}) };
  const hooks = { ...(data.hooks || {}) };
  const alts = { ...(data.alts || {}) };
  let moved = 0;
  arrived.forEach((a) => {
    const old = byGloss.get(glossKey(a.en));
    if (!old || old.id === a.id) return;
    ["en2id", "id2en", "cloze"].forEach((dir) => {
      const from = old.id + "|" + dir, to = a.id + "|" + dir;
      if (mem[from] && !mem[to]) { mem[to] = mem[from]; delete mem[from]; moved++; }
    });
    if (hooks[old.id] && !hooks[a.id]) { hooks[a.id] = hooks[old.id]; delete hooks[old.id]; }
    if (alts[old.id] && !alts[a.id]) { alts[a.id] = alts[old.id]; delete alts[old.id]; }
    byGloss.delete(glossKey(a.en));
  });

  return { cards, mem, hooks, alts, fixed, moved, added: arrived.length, dropped: gone.length };
}

/* ------------------------------------------------------------------
   BACKUP
   Progress lives with one published artifact. Moving to another one
   would start from zero, so the whole state can be carried across by
   hand. Restoring merges rather than replaces: for every card the more
   recent review wins, counters add up, so an older backup can never
   undo newer progress.
------------------------------------------------------------------ */

function mergeState(a, b) {
  const out = JSON.parse(JSON.stringify(a));
  out.mem = { ...(a.mem || {}) };
  for (const k in b.mem || {}) {
    const mine = out.mem[k], theirs = b.mem[k];
    if (!mine || (theirs.t || 0) > (mine.t || 0)) out.mem[k] = theirs;
  }
  const addCounts = (x = {}, y = {}) => {
    const r = { ...x };
    for (const k in y) r[k] = { c: (r[k]?.c || 0) + (y[k].c || 0), w: (r[k]?.w || 0) + (y[k].w || 0) };
    return r;
  };
  out.pat = addCounts(a.pat, b.pat);
  out.words = addCounts(a.words, b.words);
  out.hooks = { ...(b.hooks || {}), ...(a.hooks || {}) };
  out.alts = { ...(a.alts || {}) };
  for (const k in b.alts || {}) out.alts[k] = Array.from(new Set([...(out.alts[k] || []), ...(b.alts[k] || [])])).slice(-8);
  out.days = Array.from(new Set([...(a.days || []), ...(b.days || [])])).sort().slice(-180);
  out.totals = {
    asked: Math.max(a.totals?.asked || 0, b.totals?.asked || 0),
    right: Math.max(a.totals?.right || 0, b.totals?.right || 0),
  };
  out.cal = {
    n: Math.max(a.cal?.n || 0, b.cal?.n || 0),
    pred: Math.max(a.cal?.pred || 0, b.cal?.pred || 0),
    hit: Math.max(a.cal?.hit || 0, b.cal?.hit || 0),
  };
  out.log = { ...(b.log || {}), ...(a.log || {}) };

  // everything else that is worth keeping, and was quietly lost before
  const byId = new Map();
  [...(b.mine || []), ...(a.mine || [])].forEach((c) => c && c.id && byId.set(c.id.toLowerCase(), c));
  out.mine = Array.from(byId.values());
  out.dropped = Array.from(new Set([...(b.dropped || []), ...(a.dropped || [])]));
  out.fixes = { ...(b.fixes || {}), ...(a.fixes || {}) };
  out.seen = Array.from(new Set([...(b.seen || []), ...(a.seen || [])])).slice(-60);
  out.hints = Math.max(a.hints || 0, b.hints || 0);
  out.conf = { ...(b.conf || {}) };
  for (const k in a.conf || {}) out.conf[k] = Array.from(new Set([...(out.conf[k] || []), ...(a.conf[k] || [])])).slice(-6);
  ["want", "register", "theme", "recog"].forEach((k) => { if (a[k] !== undefined) out[k] = a[k]; else if (b[k] !== undefined) out[k] = b[k]; });
  return out;
}

/* ---------------- API ----------------
   Self-hosted on Vercel: no artifact-host capabilities here, so both the
   AI call and the storage go through this app's own two serverless
   functions instead. /api/ask holds the Anthropic API key server-side and
   proxies to it. /api/storage holds a small Redis-backed store so progress
   is the same on every device, not per-browser. Both are gated by one
   shared passphrase (see Root/Gate near the bottom of this file), read
   fresh from localStorage on every call. ask() keeps its exact signature
   and behavior; every call site elsewhere in this file is untouched. */

function getSecret() {
  try { return localStorage.getItem("bh_secret") || ""; } catch (e) { return ""; }
}
function onAuthFailure() {
  try { localStorage.removeItem("bh_secret"); } catch (e) {}
  if (typeof location !== "undefined") location.reload();
}

async function ask(system, messages, ms = 20000) {
  const ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = setTimeout(() => ctl && ctl.abort(), ms);
  try {
    const r = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-app-secret": getSecret() },
      body: JSON.stringify({ system, messages }),
      signal: ctl ? ctl.signal : undefined,
    });
    if (r.status === 401) { onAuthFailure(); throw new Error("Falsches Passwort."); }
    const d = await r.json();
    if (!r.ok) throw new Error((d && d.error) || "Anfrage fehlgeschlagen.");
    return (d.text || "").trim();
  } finally {
    clearTimeout(timer);
  }
}

if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    async get(key) {
      try {
        const r = await fetch("/api/storage?key=" + encodeURIComponent(key), {
          headers: { "x-app-secret": getSecret() },
        });
        if (r.status === 401) { onAuthFailure(); return null; }
        const d = await r.json();
        if (d && typeof d.value === "string") {
          try { localStorage.setItem(key, d.value); } catch (e) {}
          return { value: d.value };
        }
        // server has nothing for this key yet: fall back to (and seed
        // the server from) this browser's own copy, if any, so the first
        // device to open this app carries its progress into the shared store
        try {
          const local = localStorage.getItem(key);
          if (local !== null) {
            fetch("/api/storage", {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-app-secret": getSecret() },
              body: JSON.stringify({ key, value: local }),
            }).catch(() => {});
            return { value: local };
          }
        } catch (e) {}
        return null;
      } catch (e) {
        try {
          const v = localStorage.getItem(key);
          return v === null ? null : { value: v };
        } catch (e2) {
          return null;
        }
      }
    },
    async set(key, value) {
      try { localStorage.setItem(key, value); } catch (e) {}
      try {
        const r = await fetch("/api/storage", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-app-secret": getSecret() },
          body: JSON.stringify({ key, value }),
        });
        if (r.status === 401) { onAuthFailure(); return false; }
        const d = await r.json();
        return !!(d && d.ok);
      } catch (e) {
        return false;
      }
    },
  };
}

const parseJSON = (t) => {
  const clean = t.replace(/```json|```/g, "").trim();
  try { return JSON.parse(clean); } catch {}
  const m = clean.match(/[[{][\s\S]*[\]}]/);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
};

const wordlist = (v) => v.map((x) => `${x.id} = ${x.en}`).join("\n");

// read the Indonesian out loud, only ever after the answer is in

// every word he has ever had on a card, for spotting anything foreign in a model answer
const deckWords = (v) => {
  const set = new Set();
  v.forEach((c) => canonTokens(c.id).forEach((w) => set.add(canonWord(w))));
  return set;
};
const outsideDeck = (sentence, known) =>
  Array.from(new Set(canonTokens(sentence).map(canonWord)))
    .filter((w) => w.length > 1 && !known.has(w) && !/^\d+$/.test(w));

/* ---------------- session builder ---------------- */

const ROUND = 10;

function buildSession(vocab, mem, want, now, size = ROUND, weak = [], recog = 0.15, conf = {}) {
  const weakSet = new Set(weak.map((w) => w.k || w));
  const index = vocab.map((c, i) => ({ ...c, i, tags: tagsOf(c.id), tok: tokens(c.id),
    long: Math.min(...c.id.split("/").map((v) => v.trim().split(/\s+/).filter(Boolean).length)) >= 4 && !hasBlank(c.id) }));
  const known = index.filter((c) => mem[c.id + "|en2id"] || mem[c.id + "|id2en"]);

  const prior = (card) => {
    const near = known.filter((k) => k.tok.some((t) => card.tok.includes(t)));
    if (!near.length) return null;
    const ds = near.map((k) => (mem[k.id + "|en2id"] || mem[k.id + "|id2en"]).d);
    return { d: ds.reduce((a, b) => a + b, 0) / ds.length, s: 0 };
  };

  const pool = [];
  for (const card of index) {
    const weakHit = card.tok.some((t) => weakSet.has(canonWord(t))) ? 1.6 : 0;
    // whole sentences are practised as gap-fills and in the forge, not typed out word for word
    for (const dir of card.long ? ["id2en"] : ["en2id", "id2en"]) {
      const st = mem[card.id + "|" + dir];
      if (st) {
        const left = dueIn(st, want, now);
        if (left <= 0.02) pool.push({ card, dir, st, kind: (st.cr || 0) < 3 ? "learning" : "due", score: -left + (dir === "en2id" ? 0.3 : 0) + ((st.cr || 0) < 3 ? 2 : 0) + weakHit });
      } else if (dir === "id2en" && card.long) {
        pool.push({ card, dir, st: null, kind: "new", prior: prior(card), score: 0.3 + weakHit });
      } else if (dir === "en2id") {
        const p = prior(card);
        pool.push({ card, dir, st: null, kind: "new", prior: p, score: (p ? 0.5 : 0.1) + weakHit });
      } else {
        // the recognition side only opens once production has taken hold
        const prod = mem[card.id + "|en2id"];
        if (prod && prod.r >= 2) pool.push({ card, dir, st: null, kind: "new", prior: { d: prod.d, s: 0 }, score: 0.25 + weakHit });
      }
    }
    if (card.s === 1) {
      const st = mem[card.id + "|cloze"];
      const gap = gapOf(card.id, weakSet);
      const prod = mem[card.id + "|en2id"];
      if (gap && st) {
        const left = dueIn(st, want, now);
        if (left <= 0.02) pool.push({ card, dir: "cloze", gap, st, kind: (st.cr || 0) < 3 ? "learning" : "due", score: -left + 0.5 + ((st.cr || 0) < 3 ? 2 : 0) + weakHit });
      } else if (gap && (card.long || (prod && (prod.cr || 0) >= 2))) {
        pool.push({ card, dir: "cloze", gap, st: null, kind: "new", prior: prod ? { d: prod.d, s: 0 } : prior(card), score: 0.8 + weakHit });
      }
    }
  }

  const due = pool.filter((p) => p.kind === "due" || p.kind === "learning").sort((a, b) => b.score - a.score);
  const fresh = pool.filter((p) => p.kind === "new").sort((a, b) => b.score - a.score);
  const capped = [];
  let clozeCount = 0, recogCount = 0;
  const recogMax = Math.max(1, Math.round(size * recog));
  for (const p of due) {
    if (p.dir === "cloze") { if (clozeCount >= 2) continue; clozeCount++; }
    if (p.dir === "id2en") { if (recogCount >= recogMax) continue; recogCount++; }
    capped.push(p);
    if (capped.length >= Math.max(size - 3, Math.ceil(size * 0.7))) break;
  }
  const rest = [];
  for (const p of fresh) {
    if (rest.length + capped.length >= size) break;
    if (p.dir === "cloze") { if (clozeCount >= 2) continue; clozeCount++; }
    if (p.dir === "id2en") { if (recogCount >= recogMax) continue; recogCount++; }
    rest.push(p);
  }
  let mix = [...capped, ...rest];

  /* Items that look alike interfere with each other. While either of a
     confused pair is still settling, they never share a round. Once both
     are solid, the contrast is worth drilling, so they are allowed back
     together. */
  const solid = (id) => {
    const st = mem[id + "|en2id"];
    return st && (st.cr || 0) >= 3;
  };
  /* Interleaving beats blocking, and similar items interfere with each other,
     so at most two cards per round may hang on the same weak word. Once both
     sides of a pair are solid the contrast is worth practising, so the limit
     only applies while something is still settling. */
  const weakUse = {};
  mix = mix.filter((p) => {
    const hit = p.card.tok.map(canonWord).find((t) => weakSet.has(t));
    if (!hit) return true;
    weakUse[hit] = (weakUse[hit] || 0) + 1;
    return weakUse[hit] <= 2;
  });

  const taken = new Set();
  mix = mix.filter((p) => {
    const id = p.card.id;
    const partners = conf[id] || [];
    const clash = partners.some((o) => taken.has(o) && !(solid(id) && solid(o)));
    if (clash) return false;
    taken.add(id);
    return true;
  });

  // extra rounds: if nothing is due, bring the closest items forward rather than stopping
  if (mix.length < size) {
    const chosen = new Set(mix.map((p) => p.card.id + "|" + p.dir));
    const early = [];
    for (const card of index) {
      for (const dir of card.long ? ["id2en"] : ["en2id", "id2en"]) {
        const st = mem[card.id + "|" + dir];
        if (!st) continue;
        const k = card.id + "|" + dir;
        if (chosen.has(k)) continue;
        early.push({ card, dir, st, kind: "early", left: dueIn(st, want, now) });
      }
    }
    early.sort((a, b) => a.left - b.left);
    for (const p of early) {
      if (mix.length >= size) break;
      mix.push(p);
    }
  }

  // interleave: neither the same pattern nor the same weak word back to back
  const weakOf = (p) => p.card.tok.map(canonWord).find((t) => weakSet.has(t)) || null;
  const out = [];
  const left = [...mix];
  while (left.length) {
    const prev = out.length ? out[out.length - 1] : null;
    const prevTag = prev ? prev.card.tags[0] : null;
    const prevWeak = prev ? weakOf(prev) : null;
    let k = left.findIndex((x) => x.card.tags[0] !== prevTag && (!prevWeak || weakOf(x) !== prevWeak));
    if (k < 0) k = left.findIndex((x) => x.card.tags[0] !== prevTag);
    if (k < 0) k = 0;
    out.push(left.splice(k, 1)[0]);
  }
  return out.slice(0, size);
}

/* ---------------- styling ---------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Fredoka:wght@500;600&display=swap');

.bh{
  --ink:#1A1B1F; --muted:#5E6472; --faint:#8E94A2; --paper:#FFFFFF; --canvas:#EDEEF2; --hair:#E0E1E7; --line:#C9CBD4;
  --act:#E2F4EE; --act-line:#A5DCCA; --act-ink:#0A6349; --solid:#0D7F63; --solid-dark:#0A6650; --dot:#17BFA0;
  --yes:#0F7A55; --yes-bg:#E9F7F0; --no:#C22E4A; --no-bg:#FCEEF1;
  --violet:#6C5CE7; --coral:#C63A62; --teal:#0D7F63; --sun:#2B6FE0; --sun-bg:#E2F4EE; --sun-ink:#0A6349;
  --violet-soft:#EFEDFE; --violet-line:#D6D1FA; --violet-ink:#3F35A8; --coral-soft:#FBEAEF; --coral-line:#EFC0CE; --coral-ink:#9C2A4B;
  --teal-soft:#E3F4EC; --teal-line:#BCE3D3; --teal-ink:#0A6349; --sun-soft:#E6EFFC; --sun-line:#C2D8F7;
  --bad-bg:#F8D2DA; --bad-ink:#8E1F36; --fix-bg:#CBEFDF; --fix-ink:#0B6B4F; --why-bg:rgba(255,255,255,.8);
  --mine-bg:#1A1B1F; --bw:0.5px;
  font-family:'Nunito',system-ui,sans-serif; color:var(--ink); background:var(--canvas);
  min-height:100%; box-sizing:border-box; padding:20px 18px 40px; font-size:16px; line-height:1.5;
  -webkit-font-smoothing:antialiased; color-scheme:light;
}
.bh[data-theme="dark"]{
  --ink:#F1F2F6; --muted:#A3A9B7; --faint:#6F7585; --paper:#1C1F27; --canvas:#111318; --hair:#2A2E39; --line:#3A3F4D;
  --act:#14302A; --act-line:#2E6455; --act-ink:#8FE3CB; --solid:#19A183; --solid-dark:#14856C; --dot:#3DDABE;
  --yes:#5FD3A5; --yes-bg:#15302A; --no:#FF7F92; --no-bg:#3A2028;
  --violet:#7C6DFF; --coral:#F0698D; --teal:#19A183; --sun:#5C9BFF; --sun-bg:#14302A; --sun-ink:#8FE3CB;
  --violet-soft:#232238; --violet-line:#39366B; --violet-ink:#BDB6FF; --coral-soft:#2E1B22; --coral-line:#553040; --coral-ink:#F7B6C8;
  --teal-soft:#152B26; --teal-line:#27473E; --teal-ink:#7FE0BC; --sun-soft:#182338; --sun-line:#2C4166;
  --bad-bg:#5A2431; --bad-ink:#FFB3C0; --fix-bg:#1F4A3B; --fix-ink:#9FEBCB; --why-bg:rgba(255,255,255,.06);
  --mine-bg:#3B3F4C; --bw:1px; color-scheme:dark;
}
.bh *{box-sizing:border-box}
.bh-wrap{max-width:560px;margin:0 auto;width:100%}
@media (prefers-reduced-motion:no-preference){.bh-screen{animation:screenIn .22s ease-out}}
@keyframes screenIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (min-width:700px){
  .bh{padding:32px 24px 56px}
  .bh-scene{height:150px}
  .bh-heroin{padding:26px}
  .bh-headline{font-size:36px}
  .bh-cue{font-size:clamp(34px,3.4vw,46px)}
}
.bh button{font-family:inherit;cursor:pointer;color:inherit;background:transparent;border:0;padding:0;-webkit-appearance:none;appearance:none}
.bh button:focus-visible,.bh input:focus-visible,.bh textarea:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.bh input,.bh textarea{font-family:inherit}
.serif{font-family:'Fredoka',system-ui,sans-serif;font-weight:600;letter-spacing:-0.01em}

.bh-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.bh-logo{font-size:15px;font-weight:500;letter-spacing:-0.01em;display:flex;align-items:center;gap:9px}
.bh-mark{width:22px;height:22px;border-radius:6px;overflow:hidden;flex:none;border:var(--bw) solid var(--line)}
.bh-mark span{display:block;height:50%}
.bh-mark span:first-child{background:#CE1126}
.bh-mark span:last-child{background:#F4F4F4}
.bh-dotmark{font-style:normal;color:var(--solid);font-weight:800}
.bh-ver{font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--faint);margin-left:2px}
.bh-topright{display:flex;align-items:center;gap:10px}
.bh-gear{color:var(--faint);display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%}
.bh-gear:active{background:var(--hair)}
.bh-streak{font-size:13px;color:var(--muted);font-weight:500}
.bh-streak[data-warn="1"]{color:var(--no)}

.bh-week{display:flex;gap:6px;margin-bottom:22px}
.bh-day{flex:1;text-align:center}
.bh-daybox{height:36px;border-radius:14px;background:var(--paper);border:var(--bw) solid var(--hair);display:flex;align-items:center;justify-content:center;color:var(--sun-ink)}
.bh-day[data-s="done"] .bh-daybox{background:var(--sun-bg);border-color:var(--sun-bg);color:var(--sun-ink)}
.bh-day[data-s="today"] .bh-daybox{border:1.5px dashed var(--solid);background:var(--paper)}
.bh-day[data-s="todaydone"] .bh-daybox{background:var(--solid);border-color:var(--solid);color:#fff}
@media (prefers-reduced-motion:no-preference){.bh-daybox svg{animation:pop .28s cubic-bezier(.3,1.4,.5,1)}}
@keyframes pop{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}
.bh-daylab{font-size:11px;color:var(--faint);margin-top:5px;font-weight:400}
.bh-day[data-s="today"] .bh-daylab,.bh-day[data-s="todaydone"] .bh-daylab{color:var(--act-ink);font-weight:500}

.bh-card{background:var(--paper);border:var(--bw) solid var(--hair);border-radius:18px;padding:20px 18px;margin-bottom:14px}
.bh-hero{background:var(--paper);border:var(--bw) solid var(--hair);border-radius:20px;overflow:hidden;margin-bottom:14px}
.bh-heroin{padding:18px}
.bh-num1{background:var(--act);color:var(--act-ink)}
.bh-alsolab{font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--faint);font-weight:600;margin:2px 0 8px}
.bh-two{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
.bh-twocard[data-tone="teal"] .bh-twoico{color:var(--solid)}
.bh-twocard[data-tone="teal"] .bh-twoico{color:var(--solid)}
.bh-twocard{background:transparent;border:1.5px dashed var(--line);border-radius:18px;padding:15px;text-align:left;display:flex;flex-direction:column}
.bh-twocard:active{background:var(--canvas)}
.bh-twocard[data-tone="violet"] .bh-twoico{color:var(--violet)}
.bh-twocard[data-tone="coral"] .bh-twoico{color:var(--coral)}
.bh-twoname{font-size:15.5px;font-weight:600;letter-spacing:-0.015em;margin-top:9px;color:var(--muted)}
.bh-twometa{font-size:12.5px;color:var(--faint);margin-top:2px}
.bh-week[data-small="1"]{gap:5px;margin-bottom:16px}
.bh-week[data-small="1"] .bh-daybox{height:26px;border-radius:8px}
.bh-week[data-small="1"] .bh-daylab{font-size:10px;margin-top:4px}
.bh-scene{display:block;width:100%;height:104px;-webkit-mask-image:radial-gradient(120% 100% at 50% 0,#000 82%,transparent 100%);mask-image:radial-gradient(120% 100% at 50% 0,#000 82%,transparent 100%)}
.bh{--sky:#E8F5F0;--hill1:#A8DCCB;--hill2:#7DC9B2;--terr1:#52B999;--terr2:#31A07F;--terr3:#1C8A6B;--terr4:#12765C;--dot:#F2A93B}
.bh [data-mood="dawn"]{--sky:#F4F3E4;--hill1:#C6DCC2;--hill2:#9CCBB2;--terr1:#6FBCA0;--terr2:#47A586;--terr3:#2A8E70;--terr4:#19785E;--dot:#F2A93B}
.bh [data-mood="sea"]{--sky:#E4F2F6;--hill1:#A6D5DF;--hill2:#78BFD0;--terr1:#4FA7BE;--terr2:#2F8DA6;--terr3:#1E748C;--terr4:#145E74;--dot:#F2A93B}
.bh [data-mood="dusk"]{--sky:#EAF2F1;--hill1:#B5D2CB;--hill2:#8EBCB2;--terr1:#66A497;--terr2:#458C7E;--terr3:#2C7365;--terr4:#1B5D51;--dot:#F2A93B}
.bh [data-mood="night"]{--sky:#DEEDED;--hill1:#A3C8CA;--hill2:#7CB0B4;--terr1:#5A989D;--terr2:#41818A;--terr3:#2F6D77;--terr4:#215A64;--dot:#F2A93B}
.bh[data-theme="dark"]{--sky:#12211D;--hill1:#1C3A32;--hill2:#245046;--terr1:#1E5F4E;--terr2:#18715B;--terr3:#12866A;--terr4:#0E6E58;--dot:#E8A83C}
.bh[data-theme="dark"] [data-mood="dawn"]{--sky:#1B2119;--hill1:#25392C;--hill2:#2D4B3A;--terr1:#2F5F48;--terr2:#276D55;--terr3:#1F7A5F;--terr4:#17624C;--dot:#E8A83C}
.bh[data-theme="dark"] [data-mood="sea"]{--sky:#10242B;--hill1:#173942;--hill2:#1D4A55;--terr1:#215C69;--terr2:#1A4F5C;--terr3:#14414C;--terr4:#0F343D;--dot:#E8A83C}
.bh[data-theme="dark"] [data-mood="dusk"]{--sky:#13211F;--hill1:#1D3733;--hill2:#264842;--terr1:#2A5A50;--terr2:#224C44;--terr3:#1B3E38;--terr4:#14302B;--dot:#E8A83C}
.bh[data-theme="dark"] [data-mood="night"]{--sky:#0F1F21;--hill1:#183234;--hill2:#1F4245;--terr1:#245155;--terr2:#1D4448;--terr3:#16383B;--terr4:#102B2E;--dot:#E8A83C}
.bh-step1{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.bh-step1n{font-size:17px;font-weight:700;letter-spacing:-0.015em}
.bh-step1w,.bh-cad{margin-left:auto;flex:none;font-size:12px;font-weight:700;padding:5px 11px;border-radius:999px;background:var(--act);color:var(--act-ink)}
.bh-row2[data-tone="teal"] .bh-cad{background:var(--violet-soft);color:var(--violet-ink)}
.bh-row2[data-tone="coral"] .bh-cad{background:var(--coral-soft);color:var(--coral-ink)}
.bh-headline{font-family:'Fredoka',system-ui,sans-serif;font-weight:600;letter-spacing:-0.01em;font-size:32px;line-height:1.2;margin:0 0 8px;font-weight:800;letter-spacing:-0.03em}
.bh-sayso{font-size:14px;color:var(--muted);margin:2px 0 18px;line-height:1.55;max-width:40ch}
.bh .bh-cta{width:100%;height:54px;background:var(--solid);color:#fff;border:2px solid var(--solid-dark);border-radius:14px;font-size:16.5px;font-weight:600;letter-spacing:.01em}
.bh .bh-cta{transition:transform .08s,background .12s}
.bh .bh-cta:active{background:var(--solid-dark);transform:scale(.99)}

.bh-rows{display:flex;flex-direction:column;gap:10px;margin-bottom:18px}
.bh .bh-row2{display:flex;gap:14px;align-items:center;padding:18px 16px;width:100%;text-align:left;
  background:var(--paper);border:1.5px solid var(--step-line,var(--hair));border-radius:20px;transition:transform .08s}
.bh .bh-row2:active{transform:scale(.985)}
.bh .bh-row2[data-tone="teal"]{--step-line:var(--violet-line)}
.bh .bh-row2[data-tone="coral"]{--step-line:var(--coral-line)}
.bh .bh-row2:active{background:var(--canvas)}
.bh .bh-row2[data-tone="teal"] .bh-num{background:var(--violet-soft);color:var(--violet-ink)}
.bh .bh-row2[data-tone="coral"] .bh-num{background:var(--coral-soft);color:var(--coral-ink)}
.bh-num{width:38px;height:38px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700}
.bh-rname{font-size:17px;font-weight:700;letter-spacing:-0.015em}
.bh-rwhen{font-size:13.5px;color:var(--muted);margin-top:3px}
.bh-rdone{font-size:13px;color:var(--yes);font-weight:500}
.bh-chev{color:var(--faint);flex:none}

.bh-tabs{display:flex;margin-top:2px;padding-top:12px;border-top:var(--bw) solid var(--hair)}
.bh .bh-tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 2px 8px;position:relative;min-height:70px}
.bh .bh-tab:active{opacity:.6}
.bh-tabico{display:flex;align-items:center;justify-content:center;color:var(--muted)}
.bh .bh-tab[data-tone="violet"] .bh-tabico{color:var(--violet)}
.bh .bh-tab[data-tone="coral"] .bh-tabico{color:var(--coral)}
.bh .bh-tab[data-tone="teal"] .bh-tabico{color:var(--teal)}
.bh .bh-tab[data-tone="sun"] .bh-tabico{color:var(--sun-ink)}
.bh-tabname{font-size:12.5px;font-weight:500;color:var(--muted);letter-spacing:0}
.bh .bh-tab[data-alert="1"] .bh-tabname{color:var(--coral-ink);font-weight:600}
.bh-tabmeta{display:none}
.bh .bh-tab[data-alert="1"]::after{content:'';position:absolute;top:9px;right:calc(50% - 20px);width:9px;height:9px;border-radius:50%;background:var(--coral)}
.bh-foot{display:flex;gap:18px;margin-top:22px;justify-content:center}
.bh .bh-foot button{font-size:13px;color:var(--faint);font-weight:400}
.bh-help{margin-top:18px;font-size:14.5px;color:var(--muted);line-height:1.75;background:var(--paper);border:var(--bw) solid var(--hair);border-radius:18px;padding:18px}
.bh-help b{color:var(--ink);font-weight:500}

.bh .bh-back{display:inline-flex;align-items:center;gap:4px;font-size:14px;font-weight:500;color:var(--muted);min-height:44px;margin:-8px 0 8px -6px;padding:0 10px 0 6px;border-radius:14px}
.bh .bh-back:active{background:var(--hair)}
.bh-rule{display:block;width:104px;height:8px;margin:2px 0 14px}
.bh-title{font-family:'Fredoka',system-ui,sans-serif;font-size:28px;margin:0 0 6px;line-height:1.15;font-weight:600;letter-spacing:-0.01em}
.bh-lede{font-size:13.5px;color:var(--muted);margin-bottom:20px;max-width:42ch;line-height:1.55}

.bh-bar{height:5px;background:var(--hair);border-radius:999px;overflow:hidden;margin-bottom:8px}
.bh-ticks{display:flex;gap:4px;margin-bottom:8px}
.bh-tick{flex:1;height:6px;border-radius:999px;background:var(--hair)}
.bh-tick[data-s="yes"]{background:var(--solid)}
.bh-tick[data-s="no"]{background:var(--no);opacity:.55}
.bh-tick[data-s="now"]{background:var(--act-line)}
.bh-bar i{display:block;height:100%;background:var(--teal);border-radius:999px;transition:width .3s ease}
.bh-barlab{display:flex;justify-content:space-between;font-size:11.5px;color:var(--muted);font-weight:500;margin-bottom:20px}
.bh-stage{background:var(--paper);border:var(--bw) solid var(--hair);border-radius:18px;padding:26px 20px;margin-bottom:16px}
.bh-ask{font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--faint);font-weight:600;margin-bottom:12px;display:flex;justify-content:space-between;gap:12px}
.bh-ask em{font-style:normal;color:var(--muted);font-weight:500}
.bh-hintbtn{font-size:11.5px;font-weight:600;letter-spacing:0;text-transform:none;color:var(--act-ink);
  background:var(--act);border-radius:999px;padding:4px 11px}
.bh-hintbox{margin-top:16px;padding-top:14px;border-top:var(--bw) solid var(--hair)}
.bh-hintlab{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--faint);font-weight:600;margin-bottom:8px}
.bh-cue{font-family:'Fredoka',system-ui,sans-serif;font-size:clamp(30px,9vw,44px);line-height:1.1;font-weight:600;letter-spacing:-0.015em}
@media (prefers-reduced-motion:no-preference){.bh-cue{animation:rise .2s ease-out}}
@keyframes rise{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
.bh-gapen{font-size:14.5px;color:var(--muted);font-weight:500;margin-top:12px}
.bh-gapen b{color:var(--ink);font-weight:600}
.bh-gap{display:inline-block;min-width:2.2em;text-align:center;background:var(--act);color:var(--act-ink);
  border:2px dashed var(--act-line);border-radius:10px;padding:0 .35em;margin:0 .12em}
.bh-do{font-size:13.5px;color:var(--muted);font-weight:400;margin-bottom:8px}
.bh-field{width:100%;background:var(--paper);border:var(--bw) solid var(--line);border-radius:14px;color:var(--ink);padding:15px 14px;font-size:17px;outline:none}
.bh-field::placeholder{color:var(--faint)}
.bh-field:focus{border-color:var(--ink)}
.bh-acts{display:flex;gap:10px;margin-top:12px}
.bh .bh-go{flex:1;height:50px;background:var(--solid);color:#fff;border:2px solid var(--solid-dark);border-radius:14px;font-size:15.5px;font-weight:600}
.bh .bh-go:disabled{background:var(--hair);color:var(--faint);border-color:var(--line)}
.bh .bh-go:active:not(:disabled){background:var(--solid-dark)}
.bh .bh-alt{height:50px;border:1px solid var(--line);color:var(--ink);font-size:14.5px;font-weight:400;padding:0 18px;border-radius:14px;background:var(--paper)}
.bh .bh-alt:active{background:var(--canvas)}

.bh-judge{border-radius:18px;padding:18px;margin-bottom:14px;border:var(--bw) solid}
.bh-right{background:var(--yes-bg);border-color:transparent}
.bh-wrong{background:var(--no-bg);border-color:transparent}
.bh-verdict{font-size:14.5px;font-weight:700;margin-bottom:12px;display:flex;justify-content:space-between;gap:12px;align-items:baseline}
.bh-right .bh-verdict b{color:var(--yes)}.bh-wrong .bh-verdict b{color:var(--no)}
.bh-verdict span{color:var(--muted);font-weight:500;font-size:12.5px}
.bh-praise{font-size:15px;font-weight:500;color:var(--yes);margin-top:8px}
.bh-q{font-weight:700;color:var(--ink)}
.bh-why{font-size:14px;color:var(--muted);margin-top:12px;line-height:1.6;background:var(--why-bg);border-radius:14px;padding:12px 14px}
.bh-block{margin-bottom:12px}
.bh-blab{font-size:11px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:var(--faint);margin-bottom:6px}
.bh-sent{font-size:21px;font-weight:700;letter-spacing:-0.02em;line-height:1.4}
.bh-bad{background:var(--bad-bg);color:var(--bad-ink);border-radius:6px;padding:1px 6px;text-decoration:line-through;text-decoration-thickness:2px;margin-right:2px;display:inline-block}
.bh-fix{background:var(--fix-bg);color:var(--fix-ink);border-radius:6px;padding:1px 6px;margin-right:2px;display:inline-block}

.bh-result{text-align:center;padding:6px 0 4px}
.bh-score{font-family:'Fredoka',system-ui,sans-serif;font-size:36px;margin:8px 0 2px;font-weight:600;letter-spacing:-0.01em}
.bh-scorenote{font-size:15px;color:var(--muted);margin-bottom:14px}
.bh-diag{font-size:15px;line-height:1.6;color:var(--act-ink);background:var(--act);border-radius:14px;
  padding:14px 16px;margin:0 auto 22px;max-width:44ch;text-align:left}
.bh-miss{background:var(--paper);border:var(--bw) solid var(--hair);border-radius:14px;padding:14px 16px;margin-bottom:8px}
.bh-miss b{font-weight:700;font-size:16px}
.bh-miss small{display:block;color:var(--muted);font-size:13px;margin-top:3px;line-height:1.5}
.bh-sub{font-size:13px;color:var(--muted);font-weight:400;margin:0 0 10px}

.bh-switch{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px}
.bh .bh-switch button{background:var(--paper);border:var(--bw) solid var(--line);border-radius:999px;padding:11px;font-size:14px;color:var(--muted);font-weight:400}
.bh .bh-switch button[data-on="1"]{background:var(--ink);color:var(--canvas);border-color:var(--ink)}

.bh-thread{display:flex;flex-direction:column;gap:12px;margin-bottom:18px}
.bh-bubble{max-width:84%;padding:12px 16px;font-size:16px;line-height:1.5;border-radius:18px}
.bh-from{background:var(--paper);border:var(--bw) solid var(--hair);border-bottom-left-radius:6px;align-self:flex-start}
.bh-mine{background:var(--mine-bg);color:var(--ink);border-bottom-right-radius:6px;align-self:flex-end}

.bh .bh-tile{display:flex;gap:14px;align-items:center;text-align:left;width:100%;background:var(--paper);border:var(--bw) solid var(--hair);border-radius:18px;padding:14px 16px;margin-bottom:10px}
.bh-tdesc{font-size:13px;color:var(--muted);margin-top:2px}
.bh-tname{font-weight:500;font-size:15.5px}
.bh-ico{width:38px;height:38px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex:none}
.bh-badge{font-size:12px;font-weight:500;color:var(--act-ink);background:var(--act);border-radius:999px;padding:4px 10px}
.bh-badge[data-quiet="1"]{background:var(--canvas);color:var(--muted)}

.bh-panel{background:var(--paper);border:var(--bw) solid var(--hair);border-radius:18px;padding:18px;margin-bottom:14px}
.bh-plabel{font-size:14.5px;font-weight:700;color:var(--ink);margin-bottom:14px}
.bh-row{display:flex;justify-content:space-between;gap:14px;align-items:center;padding:10px 0;border-top:var(--bw) solid var(--hair);font-size:15px}
.bh-row:first-of-type{border-top:none;padding-top:0}
.bh-prow{display:grid;grid-template-columns:1fr auto;gap:4px 12px;width:100%;text-align:left;padding:12px 0;border-top:var(--bw) solid var(--hair)}
.bh-prow:first-of-type{border-top:none}
.bh-prow[data-thin="1"]{opacity:.5}
.bh-pname{font-size:15px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.bh-pnum{font-size:13px;color:var(--muted);white-space:nowrap}
.bh-pnum b{color:var(--ink);font-weight:700}
.bh-thin{font-style:italic}
.bh-trend{font-size:11px;font-weight:700;border-radius:999px;padding:3px 8px}
.bh-trend[data-dir="up"]{background:var(--yes-bg);color:var(--yes)}
.bh-trend[data-dir="down"]{background:var(--no-bg);color:var(--no)}
.bh-prow .bh-meter{grid-column:1 / -1;max-width:none}
.bh-meter{height:8px;background:var(--canvas);border-radius:999px;flex:1;max-width:110px;overflow:hidden}
.bh-meter i{display:block;height:100%;background:var(--no);border-radius:999px;opacity:.75}
.bh-count{font-size:13px;color:var(--muted);font-weight:500;flex:none;min-width:32px;text-align:right}
.bh-fc{display:flex;align-items:flex-end;gap:4px;height:64px;margin-bottom:8px}
.bh-stattiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.bh-stattile{border-radius:14px;padding:14px 16px;background:var(--canvas)}
.bh-stattile b{display:block;font-size:26px;line-height:1.15}
.bh-stattile span{display:block;font-size:12px;color:var(--muted);margin-top:3px;font-weight:500}
.bh-stattile[data-tone="settling"]{background:var(--act)}
.bh-stattile[data-tone="settling"] b{color:var(--act-ink)}
.bh-stattile[data-tone="settling"] span{color:var(--act-ink);opacity:.75}
.bh-stattile[data-tone="holding"]{background:var(--teal-soft)}
.bh-stattile[data-tone="holding"] b{color:var(--teal-ink)}
.bh-stattile[data-tone="holding"] span{color:var(--teal-ink);opacity:.75}
.bh-stattile[data-tone="solid"]{background:var(--solid)}
.bh-stattile[data-tone="solid"] b,.bh-stattile[data-tone="solid"] span{color:#fff}
.bh-stattile[data-tone="solid"] span{opacity:.85}
.bh-pnum-sub{color:var(--faint);font-weight:500}
.bh-fc div{flex:1;border-radius:3px;min-height:3px}
.bh-fclab{display:flex;justify-content:space-between;font-size:11px;color:var(--faint);font-weight:500}
.bh-blank{color:var(--muted);font-size:15px;line-height:1.7;padding:20px;max-width:42ch;background:var(--paper);border:var(--bw) dashed var(--line);border-radius:18px}
.bh-fail{color:var(--no);font-size:14px;font-weight:500;margin-top:12px}
.bh-load{color:var(--muted);font-size:15px;font-weight:500}
@media (prefers-reduced-motion:no-preference){.bh-load{animation:pulse 1.2s ease-in-out infinite}}
@keyframes pulse{50%{opacity:.4}}
.bh-note{font-size:14px;color:var(--muted);line-height:1.7}
.bh-slider{width:100%;accent-color:var(--act-ink);margin:4px 0 12px}
.bh-chips{display:flex;flex-wrap:wrap;gap:8px}
.bh-newbox{margin-top:12px;background:var(--act);border-radius:14px;padding:13px 14px}
.bh-newlab{font-size:11px;letter-spacing:.06em;text-transform:uppercase;font-weight:700;color:var(--act-ink);margin-bottom:9px}
.bh-newchip{font-size:13px;font-weight:600;border-radius:999px;padding:7px 13px;background:var(--paper);color:var(--act-ink);border:1.5px solid var(--act-line)}
.bh-newchip[data-state="busy"]{opacity:.6}
.bh-newbox{margin-top:12px;background:var(--act);border-radius:14px;padding:13px 14px}
.bh-newlab{font-size:11px;letter-spacing:.06em;text-transform:uppercase;font-weight:700;color:var(--act-ink);margin-bottom:9px}
.bh-newchip{font-size:13px;font-weight:600;border-radius:999px;padding:7px 13px;background:var(--paper);color:var(--act-ink);border:1.5px solid var(--act-line)}
.bh-newchip[data-state="busy"]{opacity:.6}
.bh-lessoncard{display:block;width:100%;text-align:left;background:var(--act);border:1.5px solid var(--act-line);
  border-radius:20px;padding:18px;margin-bottom:18px}
.bh-lessoncard:active{filter:brightness(.97)}
.bh-lessontop{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.bh-lessonico{width:34px;height:34px;flex:none;border-radius:50%;background:var(--solid);color:#fff;display:flex;align-items:center;justify-content:center}
.bh-lessonlab{font-size:11px;letter-spacing:.06em;text-transform:uppercase;font-weight:700;color:var(--act-ink)}
.bh-lessonpct{margin-left:auto;font-size:13px;font-weight:700;color:var(--act-ink);background:var(--paper);border-radius:999px;padding:4px 10px}
.bh-lessonname{display:block;font-family:'Fredoka',system-ui,sans-serif;font-size:25px;font-weight:600;letter-spacing:-0.01em;margin:0 0 6px;color:var(--ink)}
.bh-lessonmeta{display:block;font-size:13.5px;color:var(--act-ink);line-height:1.5;opacity:.85}
.bh-lessongo{display:inline-flex;align-items:center;gap:5px;margin-top:14px;font-size:14px;font-weight:700;color:var(--solid)}
.bh-wcard{background:var(--paper);border:var(--bw) solid var(--hair);border-radius:18px;padding:16px;margin-bottom:12px}
.bh-whead{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.bh-wword{font-family:'Fredoka',system-ui,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.01em}
.bh-wcount{font-size:12px;color:var(--muted);flex:none}
.bh-wmean{font-size:14px;color:var(--muted);margin-top:2px}
.bh-wkind{margin-top:10px;font-size:12.5px;font-weight:600;border-radius:999px;padding:5px 11px;display:inline-block}
.bh-wkind[data-kind="order"]{background:var(--violet-soft);color:var(--violet-ink)}
.bh-wkind[data-kind="word"]{background:var(--sun-soft);color:var(--sun-ink)}
.bh-wpair{margin-top:14px;display:flex;flex-direction:column;gap:8px}
.bh-wline{display:flex;gap:9px;align-items:flex-start}
.bh-wline .bh-sent{font-size:16px;font-weight:500;line-height:1.5}
.bh-wtag{flex:none;margin-top:3px;font-size:11px;font-weight:700;border-radius:7px;padding:3px 7px}
.bh-wtagno{background:var(--bad-bg);color:var(--bad-ink)}
.bh-wtagyes{background:var(--fix-bg);color:var(--fix-ink)}
.bh-chip{font-size:12.5px;font-weight:500;border-radius:999px;padding:6px 12px;background:var(--canvas);color:var(--muted)}
.bh-dot{width:10px;height:10px;border-radius:50%;flex:none}
`;

const localDay = (d = new Date()) => {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};
const today = () => localDay();
const EMPTY = { mem: {}, pat: {}, errors: [], days: [], totals: { asked: 0, right: 0 }, want: 0.9, cal: { n: 0, pred: 0, hit: 0 }, hooks: {}, words: {}, register: "casual", alts: {}, mine: [], conf: {}, seen: [] };

function App() {
  const [view, setView] = useState("home");
  const [data, setData] = useState(EMPTY);
  const [vocab, setVocab] = useState(BUILTIN);
  const [ready, setReady] = useState(false);
  const [saveErr, setSaveErr] = useState(false);
  const [lessonOf, setLessonOf] = useState(null);
  const [sysDark, setSysDark] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const on = () => setSysDark(mq.matches);
      on();
      mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
      return () => { mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on); };
    } catch (e) {}
  }, []);
  const theme = data.theme === "dark" ? "dark" : data.theme === "auto" ? (sysDark ? "dark" : "light") : "light";
  const live = useRef(EMPTY);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("bahasa:v2");
        if (r && r.value) {
          const loaded = { ...EMPTY, ...JSON.parse(r.value) };
          // saves from before the criterion counter existed: infer it from the review count
          Object.values(loaded.mem || {}).forEach((st) => {
            if (st && st.cr === undefined) st.cr = Math.min(3, st.r || 0);
          });
          // older versions let English and fragments into the word statistics.
          // A word only survives if it appears somewhere in his actual deck.
          if (loaded.words) {
            const inDeck = new Set();
            [...BUILTIN, ...(loaded.mine || [])].forEach((c) => canonTokens(c.id).forEach((t) => inDeck.add(canonWord(t))));
            const clean = {};
            Object.entries(loaded.words).forEach(([k, v]) => {
              const w = bare(k);
              if (w.length <= 2 || ENGLISH.has(w) || !/^[a-z]+$/.test(w) || !inDeck.has(w)) return;
              const t = clean[w] || { c: 0, w: 0, o: 0, h: 0, from: {} };
              t.c += v.c || 0; t.w += v.w || 0; t.o += v.o || 0; t.h += v.h || 0;
              t.from = { ...(t.from || {}), ...(v.from || {}) };
              t.last = v.last || t.last;
              clean[w] = t;
            });
            loaded.words = clean;
          }
          live.current = loaded;
          setData(loaded);
        }
      } catch (e) {}
      try {
        const v = await window.storage.get("bahasa:vocab");
        if (v && v.value) {
          const p = JSON.parse(v.value);
          if (Array.isArray(p) && p.length) setVocab(p);
        }
      } catch (e) {}
      setReady(true);
    })();
  }, []);

  const persist = (next) => {
    live.current = next;
    setData(next);
    Promise.resolve()
      .then(() => window.storage.set("bahasa:v2", JSON.stringify(next)))
      .then((r) => setSaveErr(!r))
      .catch(() => setSaveErr(true));
  };

  // one safe way to change stored state, always from the live copy
  const update = (fn) => {
    const next = JSON.parse(JSON.stringify(live.current));
    fn(next);
    persist(next);
  };

  const saveVocab = (next) => {
    setVocab(next);
    Promise.resolve()
      .then(() => window.storage.set("bahasa:vocab", JSON.stringify(next)))
      .then((r) => setSaveErr(!r))
      .catch(() => setSaveErr(true));
  };

  // one graded answer -> scheduler update + pattern update
  const commit = ({ id, dir, grade, tags, entry, mode, fixLast }) => {
    const next = JSON.parse(JSON.stringify(live.current));
    const now = Date.now();
    if (fixLast) {
      // the app judged it wrong and it was not: take that verdict back
      next.errors = (next.errors || []).slice(1);
      if (next.totals.asked > 0) next.totals.asked--;
      (tags || []).forEach((t) => {
        const p = next.pat[t];
        if (p && p.w > 0) p.w--;
      });
    }
    if (mode) {
      next.log = next.log || {};
      const d0 = today();
      next.log[d0] = next.log[d0] || {};
      next.log[d0][mode] = (next.log[d0][mode] || 0) + 1;
      next.log = Object.fromEntries(Object.entries(next.log).slice(-14));
    }
    if (id) {
      const key = id + "|" + dir;
      const prev = next.mem[key];
      if (prev) {
        next.cal = next.cal || { n: 0, pred: 0, hit: 0 };
        next.cal.n++;
        next.cal.pred += nowR(prev, now);
        if (grade > 1) next.cal.hit++;
      }
      const st = review(prev, grade, now, entry && entry.prior);
      const day = today();
      st.cr = (prev && prev.cr) || 0;
      st.cd = prev && prev.cd;
      if (grade > 1 && st.cd !== day && st.cr < 3) { st.cr++; st.cd = day; }
      if (grade === 1) st.cr = Math.max(0, st.cr - 1);
      next.mem[key] = st;
    }
    if (entry && entry.missed) {
      next.words = next.words || {};
      entry.missed.forEach((wd) => {
        const r = next.words[wd] || { c: 0, w: 0, o: 0, from: {} };
        r.w++;
        r.from = r.from || {};
        r.from[mode || entry.mode || "drill"] = (r.from[mode || entry.mode || "drill"] || 0) + 1;
        r.last = { q: entry.q || "", mine: entry.mine || "", correct: entry.correct || "", note: entry.note || "", tag: (tags || [])[0] || "", kind: "word" };
        next.words[wd] = r;
      });
    }
    if (entry && entry.hinted) {
      next.words = next.words || {};
      entry.hinted.forEach((wd) => {
        const r = next.words[wd] || { c: 0, w: 0, o: 0, h: 0, from: {} };
        r.h = (r.h || 0) + 1;
        next.words[wd] = r;
      });
      next.hints = (next.hints || 0) + 1;
      const d0 = today();
      next.log = next.log || {};
      next.log[d0] = next.log[d0] || {};
      next.log[d0].hints = (next.log[d0].hints || 0) + 1;
    }
    if (entry && entry.misplaced) {
      next.words = next.words || {};
      entry.misplaced.forEach((wd) => {
        const r = next.words[wd] || { c: 0, w: 0, o: 0, from: {} };
        r.o = (r.o || 0) + 1;
        r.from = r.from || {};
        r.from[mode || entry.mode || "drill"] = (r.from[mode || entry.mode || "drill"] || 0) + 1;
        r.last = { q: entry.q || "", mine: entry.mine || "", correct: entry.correct || "", note: entry.note || "", tag: (tags || [])[0] || "", kind: "order" };
        next.words[wd] = r;
      });
    }
    if (entry && entry.hit) {
      next.words = next.words || {};
      entry.hit.forEach((wd) => {
        const r = next.words[wd] || { c: 0, w: 0, from: {} };
        r.c++;
        next.words[wd] = r;
      });
    }
    (tags || []).forEach((t) => {
      const p = next.pat[t] || { c: 0, w: 0 };
      grade === 1 ? p.w++ : p.c++;
      next.pat[t] = p;
      // a per day trail, so the screen can show whether it is getting better
      const d0 = today();
      next.patLog = next.patLog || {};
      next.patLog[d0] = next.patLog[d0] || {};
      const e = next.patLog[d0][t] || { c: 0, w: 0 };
      grade === 1 ? e.w++ : e.c++;
      next.patLog[d0][t] = e;
      next.patLog = Object.fromEntries(Object.entries(next.patLog).slice(-21));
    });
    next.totals.asked++;
    if (grade > 1) next.totals.right++;
    if (entry && !entry.silent) next.errors = [{ ...entry, prior: undefined, missed: undefined, misplaced: undefined, hit: undefined, ts: now }, ...next.errors].slice(0, 80);
    const d = today();
    if (!next.days.includes(d)) next.days = [...next.days, d].slice(-180);
    persist(next);
  };

  const streak = useMemo(() => {
    const set = new Set(data.days);
    let n = 0;
    const d = new Date();
    for (;;) {
      const k = localDay(d);
      if (set.has(k)) { n++; d.setDate(d.getDate() - 1); }
      else if (n === 0 && k === today()) { d.setDate(d.getDate() - 1); }
      else break;
    }
    return n;
  }, [data.days]);

  const weakWords = useMemo(() => {
    const rows = Object.entries(data.words || {})
      .map(([k, v]) => ({ k, ...v, score: (v.w || 0) + 0.5 * (v.o || 0) + 0.4 * (v.h || 0),
        rate: ((v.w || 0) + 0.5 * (v.o || 0) + 0.4 * (v.h || 0)) / Math.max(1, (v.c || 0) + (v.w || 0) + (v.o || 0) + (v.h || 0)) }))
      .filter((r) => r.score >= 2 && r.rate > 0.34)
      .sort((a, b) => b.score - a.score || b.rate - a.rate);
    return rows.slice(0, 12);
  }, [data.words]);

  const strongWords = useMemo(() =>
    Object.entries(data.words || {})
      .filter(([, v]) => v.c >= 3 && v.w === 0)
      .map(([k]) => k)
      .slice(0, 20), [data.words]);

  const weakest = useMemo(() => {
    const rows = Object.entries(data.pat)
      .map(([k, v]) => ({ k, ...v, rate: v.w / Math.max(1, v.c + v.w) }))
      .filter((r) => r.c + r.w >= 3)
      .sort((a, b) => b.rate - a.rate);
    return rows[0] && rows[0].rate > 0.15 ? rows[0].k : null;
  }, [data.pat]);

  // he typed another card from his own deck: those two are being confused
  const saveConfusion = (a, b) => {
    if (!a || !b || a === b) return;
    const next = JSON.parse(JSON.stringify(live.current));
    next.conf = next.conf || {};
    next.conf[a] = Array.from(new Set([...(next.conf[a] || []), b])).slice(-6);
    next.conf[b] = Array.from(new Set([...(next.conf[b] || []), a])).slice(-6);
    persist(next);
  };

  // what the forge has asked lately, so it stops repeating itself
  const rememberSeen = (list) => {
    const next = JSON.parse(JSON.stringify(live.current));
    next.seen = [...(next.seen || []), ...list].slice(-60);
    persist(next);
  };

  // a word the model used that he does not have yet
  const learnWord = async (word, context) => {
    try {
      const t = await ask(
        "You add a single Indonesian word to a learner's deck. Reply with JSON only.",
        [{ role: "user", content: `The word "${word}" appeared in: "${context}". Give a short English meaning, and a natural example sentence at A2 level using it. JSON: {"en":"short meaning","example":"Indonesian sentence","exampleEn":"its English"}` }]
      );
      const j = parseJSON(t);
      if (!j || !j.en) return null;
      const next = JSON.parse(JSON.stringify(live.current));
      next.mine = next.mine || [];
      if (!next.mine.some((c) => c.id.toLowerCase() === word.toLowerCase())) next.mine.unshift({ id: word, en: j.en, s: 0 });
      if (j.example && j.exampleEn && !next.mine.some((c) => c.id === j.example)) {
        next.mine.unshift({ id: j.example, en: j.exampleEn, s: 1 });
      }
      persist(next);
      return j;
    } catch (e) { return null; }
  };

  const saveAlt = (id, phrase) => {
    const next = JSON.parse(JSON.stringify(live.current));
    next.alts = next.alts || {};
    const list = next.alts[id] || [];
    if (!list.includes(phrase)) list.push(phrase);
    next.alts[id] = list.slice(-8);
    persist(next);
  };

  const saveHook = (id, text) => {
    const next = JSON.parse(JSON.stringify(live.current));
    next.hooks = next.hooks || {};
    next.hooks[id] = text;
    persist(next);
  };

  const deckAll = useMemo(() => {
    const seen = new Set(vocab.map((c) => c.id.toLowerCase()));
    const dropped = new Set((data.dropped || []).map((s) => s.toLowerCase()));
    const own = (data.mine || []);
    const byId = new Map();
    [...vocab, ...own].forEach((c) => { if (!dropped.has(c.id.toLowerCase())) byId.set(c.id.toLowerCase(), c); });
    own.forEach((c) => { if (!dropped.has(c.id.toLowerCase())) byId.set(c.id.toLowerCase(), c); });
    return Array.from(byId.values());
  }, [vocab, data.mine, data.dropped]);
  const deck = deckAll;

  // a round built only from the words he keeps dropping
  const catchup = useMemo(() => {
    const keys = new Set((weakWords || []).map((w) => w.k));
    if (!keys.size) return [];
    const hits = deckAll.filter((c) => canonTokens(c.id).map(canonWord).some((t) => keys.has(t)));
    return hits.slice(0, 10).map((card) => ({
      card: { ...card, tags: tagsOf(card.id), tok: tokens(card.id) },
      dir: "en2id",
      st: data.mem[card.id + "|en2id"] || null,
      kind: data.mem[card.id + "|en2id"] ? "due" : "new",
    }));
  }, [weakWords, data.mem, deckAll]);

  const addCard = (card) => {
    const next = JSON.parse(JSON.stringify(live.current));
    next.mine = next.mine || [];
    if (!next.mine.some((c) => c.id.toLowerCase() === card.id.toLowerCase())) next.mine.unshift(card);
    persist(next);
  };

  const shared = { data, vocab: deck, commit, weakest, weakWords, strongWords, saveHook, saveAlt, saveConfusion, rememberSeen, addCard, learnWord, back: () => setView("home") };

  return (
    <div className="bh" data-theme={theme}>
      <style>{CSS}</style>
      <div className="bh-wrap">
        <div className="bh-top">
          <div className="bh-logo">
            <span className="bh-mark"><span /><span /></span>
            <span>bahasa indonesia<i className="bh-dotmark">.</i></span>
            <span className="bh-ver">v49</span>
          </div>
          <div className="bh-topright">
            <span className="bh-streak" data-warn={saveErr ? 1 : 0}>
              {saveErr ? "not saving" : ready ? (streak ? `${streak} day streak` : "start today") : "loading"}
            </span>
            <button className="bh-gear" onClick={() => setView("settings")} aria-label="Settings">
              <Icon name="gear" size={20} />
            </button>
          </div>
        </div>
        <div className="bh-screen" key={view}>
          {view === "home" && <Home data={data} vocab={deck} go={setView} weakest={weakest} weakCount={(weakWords || []).length} />}
          {view === "drill" && <Drill {...shared} />}
          {view === "sentences" && <Sentences {...shared} />}
          {view === "roleplay" && <Roleplay {...shared} />}
          {view === "memory" && <Memory {...shared} persist={persist} go={(v, p) => { if (p) setLessonOf(p); setView(v); }} />}
          {view === "settings" && <Settings data={data} vocab={deck} persist={persist} back={() => setView("home")} />}
          {view === "library" && <Library data={data} vocab={deck} update={update} back={() => setView("home")} />}
          {view === "weekly" && <Weekly data={data} vocab={deck} weakWords={weakWords} weakest={weakest} go={setView} back={() => setView("home")} />}
          {view === "lesson" && <Lesson data={data} pattern={lessonOf || weakest} persist={persist} go={setView} back={() => setView(lessonOf ? "memory" : "weekly")} />}
          {view === "catchup" && <Drill {...shared} preset={catchup} back={() => setView("weekly")} />}
          {view === "deck" && <Deck vocab={vocab} deck={deck} saveVocab={saveVocab} data={data} persist={persist} addCard={addCard} back={() => setView("home")} />}
        </div>
      </div>
    </div>
  );
}

function Home({ data, vocab, go, weakest, weakCount }) {
  const [peek, setPeek] = useState(null);
  const [help, setHelp] = useState(false);
  const now = Date.now();

  const due = useMemo(() => {
    let n = 0;
    for (const key in data.mem) if (dueIn(data.mem[key], data.want, now) <= 0) n++;
    return n;
  }, [data.mem, data.want]);

  const fresh = Object.keys(data.mem).length === 0;
  const log = (data.log && data.log[today()]) || {};
  const didDrill = (log.drill || 0) >= 5;
  const didSentences = (log.sentences || 0) >= 3;
  const didRoleplay = (() => {
    const l = data.log || {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      if ((l[localDay(d)] || {}).roleplay) return true;     // once in seven days is enough
    }
    return false;
  })();

  const headline = fresh ? "Start here" : didDrill ? "Today is done" : due ? `${due} cards` : "Nothing due";
  const sayso = fresh
    ? "Ten cards, about four minutes. Then again tomorrow: the spacing is where the effect comes from."
    : didDrill ? "The drill is in. Anything below is optional, and tomorrow beats more today."
    : due ? "About four minutes, then you are finished for today."
    : "Nothing has come due yet. Try a set of sentences, or come back tomorrow.";
  /* The top slot is not reserved for the drill: once that is in, whatever
     is next moves up. Every exercise gets to be the main one. */
  const step = !didDrill && (due || fresh)
    ? { n: 1, name: "Drill", when: "every day", go: "drill", label: "Start",
        head: fresh ? "Start here" : `${due} due`,
        note: fresh ? "Ten cards, about four minutes. Then again tomorrow."
          : `${due} of your cards are ready for review. A round takes ten of them, about four minutes.` }
    : !didSentences
      ? { n: 2, name: "Sentence forge", when: "every other day", go: "sentences", label: "Build sentences",
          head: "Your turn to build", note: weakest ? `Eight sentences, weighted towards ${weakest}.` : "Eight sentences from the words you already have." }
      : !didRoleplay
        ? { n: 3, name: "Roleplay", when: "weekly", go: "roleplay", label: "Start a scene",
            head: "Try it for real", note: "One conversation in Indonesian. Mistakes come at the end, not during." }
        : { n: 1, name: "Drill", when: "every day", go: "drill", label: "One more round",
            head: "All done", note: "Everything for today is in. Coming back tomorrow beats doing more now." };

  return (
    <div>
      <Week days={data.days} justDone={didDrill} small />

      <div className="bh-hero">
        <Scene />
        <div className="bh-heroin">
          <div className="bh-step1">
            <span className="bh-num bh-num1">{step.n}</span>
            <span className="bh-step1n">{step.name}</span>
            <span className="bh-step1w">{step.when}</span>
          </div>
          <div className="bh-headline serif">{step.head}</div>
          <div className="bh-sayso">{step.note}</div>
          <button className="bh-cta" onClick={() => go(step.go)}>{step.label}</button>
        </div>
      </div>

      <div className="bh-alsolab">Also available today</div>
      <div className="bh-two">
        {step.go !== "drill" && (
          <button className="bh-twocard" data-tone="teal" onClick={() => go("drill")}>
            <span className="bh-twoico"><Icon name="target" size={24} /></span>
            <span className="bh-twoname">Drill</span>
            <span className="bh-twometa">{didDrill ? "done today" : `${due} due`}</span>
          </button>
        )}
        {step.go !== "sentences" && (
          <button className="bh-twocard" data-tone="violet" onClick={() => go("sentences")}>
            <span className="bh-twoico"><Icon name="lines" size={24} /></span>
            <span className="bh-twoname">Sentences</span>
            <span className="bh-twometa">{didSentences ? "done today" : weakest ? `on ${weakest}` : "every other day"}</span>
          </button>
        )}
        {step.go !== "roleplay" && (
          <button className="bh-twocard" data-tone="coral" onClick={() => go("roleplay")}>
            <span className="bh-twoico"><Icon name="speech" size={24} /></span>
            <span className="bh-twoname">Roleplay</span>
            <span className="bh-twometa">{didRoleplay ? "done this week" : "weekly"}</span>
          </button>
        )}
      </div>

      <div className="bh-tabs">
        <button className="bh-tab" onClick={() => go("library")}>
          <span className="bh-tabico"><Icon name="cards" size={23} /></span>
          <span className="bh-tabname">Cards</span>
        </button>
        <button className="bh-tab" data-alert={weakCount > 0 ? 1 : 0} onClick={() => go("weekly")}>
          <span className="bh-tabico"><Icon name="target" size={23} /></span>
          <span className="bh-tabname">Catch up</span>
        </button>
        <button className="bh-tab" onClick={() => go("memory")}>
          <span className="bh-tabico"><Icon name="chart" size={23} /></span>
          <span className="bh-tabname">Progress</span>
        </button>
        <button className="bh-tab" onClick={() => go("deck")}>
          <span className="bh-tabico"><Icon name="plus" size={23} /></span>
          <span className="bh-tabname">Add</span>
        </button>
      </div>

      <div className="bh-foot">
        <button onClick={() => setPeek(vocab[Math.floor(Math.random() * vocab.length)])}>Random card</button>
        <button onClick={() => setHelp(!help)}>{help ? "Hide guide" : "How to use this"}</button>
      </div>

      {peek && (
        <div className="bh-panel" style={{ marginTop: 14 }}>
          <div className="bh-plabel">Just browsing, nothing is scored</div>
          <div className="bh-sent">{peek.id}</div>
          <div className="bh-note" style={{ marginTop: 6 }}>{peek.en}</div>
        </div>
      )}

      {help && (
        <div className="bh-help">
          <b>Daily.</b> One round, then stop. If it says nothing is due, believe it and close the app.<br /><br />
          <b>Two or three times a week.</b> Sentence forge after the drill. That is where single words turn into sentences.<br /><br />
          <b>Once a week.</b> Roleplay, best the evening before your lesson, so the mistakes are fresh.<br /><br />
          <b>Whenever you have new words.</b> Add them under Add words, or load a fresh Anki export there.<br /><br />
          Doing five rounds today does not replace five days. New words only settle once you have recalled them right on three
          separate days, so spreading it out is the whole point.
        </div>
      )}
    </div>
  );
}


/* One set, one 24 grid, stroke 2, round caps, curves rather than straight
   edges so the icons share the hand of the illustrations and the roundness
   of the type. */
const UI_ICONS = {
  cards: ["M4 8q0-2 2-2h9q2 0 2 2v9q0 2-2 2H6q-2 0-2-2Z", "M8 5q1-1 2-1h8q2 0 2 2v9"],
  target: ["M12 3q9 0 9 9t-9 9q-9 0-9-9", "M12 8q4 0 4 4t-4 4q-4 0-4-4", "M12 12 21 4"],
  chart: ["M4 20q0-5 0-7", "M10 20q0-10 0-14", "M16 20q0-7 0-9", "M3 20q9 1 18 0"],
  plus: ["M12 5q0 7 0 14", "M5 12q7 0 14 0"],
  lines: ["M4 6q8-1 16 0", "M4 12q6-1 12 0", "M4 18q9-1 14 0"],
  speech: ["M5 17q-1-6 3-9 5-4 10 0 3 3 1 8-6 2-14 1Z", "M9 20q3 1 6 0"],
  back: ["M14 6q-4 3-6 6 2 3 6 6"],
  right: ["M10 6q4 3 6 6-2 3-6 6"],
  check: ["M5 12q3 1 5 5 3-8 9-11"],
  gear: ["M12 9q3 0 3 3t-3 3q-3 0-3-3t3-3", "M12 3q1 0 1 2 2 .5 3 2 2-1 2.5 0t-1 2.5q.5 1.5 0 3 1.5.5 1 2.5t-2.5 0q-1 1.5-3 2 0 2-1 2t-1-2q-2-.5-3-2-2 1-2.5 0t1-2.5q-.5-1.5 0-3-1.5-.5-1-2.5t2.5 0q1-1.5 3-2 0-2 1-2"],
};

const Icon = ({ name, size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
    {(UI_ICONS[name] || []).map((d, i) => <path key={i} d={d} />)}
  </svg>
);

const ICONS = {
  bowl: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11h18c0 4.5-4 8-9 8s-9-3.5-9-8Z" fill="#FF7A59" />
      <path d="M8 8c0-1.5 1-2 1-3.5M12 7.5C12 6 13 5.5 13 4M16 8c0-1.5 1-2 1-3.5" stroke="#D9A300" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  scooter: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="17" r="3.2" fill="#12A47A" />
      <circle cx="18.5" cy="17" r="3.2" fill="#12A47A" />
      <path d="M5.5 17h7l3-8h2" stroke="#121117" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 9h4l-.5 8" stroke="#FFC531" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  fruit: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11h18l-2 9H5l-2-9Z" fill="#FFC531" />
      <circle cx="9" cy="8" r="3.4" fill="#FF7A59" />
      <circle cx="15.5" cy="8.5" r="2.8" fill="#12A47A" />
    </svg>
  ),
  house: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 22 10H2L12 3Z" fill="#D92D4E" />
      <path d="M4.5 10.5h15V21h-15V10.5Z" fill="#6C5CE7" opacity=".85" />
      <rect x="10" y="14" width="4" height="7" rx="1" fill="#fff" />
    </svg>
  ),
  plant: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21V9" stroke="#0E8A66" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12C9 12 6.5 9.5 6.5 6c3.5 0 5.5 2.5 5.5 6Z" fill="#12A47A" />
      <path d="M12 14c3 0 5.5-2 5.5-5.5-3.5 0-5.5 2-5.5 5.5Z" fill="#FFC531" />
    </svg>
  ),
};

const TONE_BG = { bowl: "var(--canvas)", scooter: "var(--canvas)", fruit: "var(--canvas)", house: "var(--canvas)", plant: "var(--canvas)" };



const Tile = ({ ic, n, d, on, badge, quiet }) => (
  <button className="bh-tile" onClick={on}>
    {ic ? <div className="bh-ico" style={{ background: TONE_BG[ic] }}>{ICONS[ic]}</div> : <div />}
    <div>
      <div className="bh-tname">{n}</div>
      <div className="bh-tdesc">{d}</div>
    </div>
    {badge ? <div className="bh-badge" data-quiet={quiet ? 1 : 0}>{badge}</div> : <div />}
  </button>
);

const PRAISE = ["Bagus.", "Straight through.", "That one is sticking.", "Clean.", "Mantap."];

// a hand-drawn rule under every screen title, same line quality as the motifs
const Rule = () => (
  <svg className="bh-rule" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden="true">
    <path d="M2 5 q26 -5 52 -1 q28 4 54 -2 q30 -6 56 1 q18 2 34 -1" fill="none" stroke="var(--solid)" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
  </svg>
);

const Back = ({ to = "Home", on }) => (
  <button className="bh-back" onClick={on}>
    <Icon name="back" size={20} />
    {to}
  </button>
);

const Chevron = () => <span className="bh-chev"><Icon name="right" size={20} /></span>;

/* The picture language: fourteen motifs from Indonesia, drawn with loose
   curves rather than straight edges, so it feels handmade rather than
   generated. Same palette everywhere, one light source, layered depth. */
const sun = (x, y, r) => <circle cx={x} cy={y} r={r} fill="var(--dot)" opacity=".9" />;
const birds = (x, y) => (
  <g stroke="var(--terr4)" strokeWidth="1.6" fill="none" opacity=".55" strokeLinecap="round">
    <path d={`M${x} ${y} q5 -4 10 0 q5 -4 10 0`} />
    <path d={`M${x + 26} ${y + 9} q4 -3 8 0 q4 -3 8 0`} />
  </g>
);

const MOTIFS = [
  <g key="a" data-mood="day"><rect width="340" height="104" fill="var(--sky)" />{sun(272, 30, 16)}
    <path d="M18 66 q26 -46 58 -44 q30 2 52 44 Z" fill="var(--hill2)" />
    <path d="M58 34 q16 -10 30 2 q-14 6 -30 -2 Z" fill="var(--paper)" opacity=".5" />
    <path d="M96 66 q34 -34 66 -30 q28 4 44 30 Z" fill="var(--hill1)" opacity=".8" />
    <path d="M0 66 q70 -9 150 -2 t190 -2 v12 H0 Z" fill="var(--terr1)" />
    <path d="M0 76 q60 -10 124 -1 t126 2 t90 -3 v12 H0 Z" fill="var(--terr2)" />
    <path d="M0 87 q84 -11 176 -1 t164 -1 v11 H0 Z" fill="var(--terr3)" />
    <path d="M0 97 q96 -9 190 0 t150 -2 v14 H0 Z" fill="var(--terr4)" />
    {birds(210, 26)}
  </g>,
  <g key="b" data-mood="sea"><rect width="340" height="104" fill="var(--sky)" />{sun(58, 28, 14)}
    <path d="M196 18 q6 26 2 50 q-22 -6 -34 -12 q14 -24 32 -38 Z" fill="var(--hill2)" />
    <path d="M204 26 q22 16 30 42 q-18 2 -30 0 q4 -22 0 -42 Z" fill="var(--hill1)" />
    <path d="M200 12 v58" stroke="var(--terr4)" strokeWidth="3" strokeLinecap="round" />
    <path d="M140 70 q60 10 118 0 q-14 16 -34 18 h-52 q-20 -4 -32 -18 Z" fill="var(--terr4)" />
    <path d="M0 84 q56 -10 112 -1 t114 1 t114 -3 v23 H0 Z" fill="var(--terr2)" />
    <path d="M0 94 q70 -9 146 0 t194 -3 v13 H0 Z" fill="var(--terr3)" />
    {birds(96, 30)}
  </g>,
  <g key="c" data-mood="day"><rect width="340" height="104" fill="var(--sky)" />{sun(172, 24, 13)}
    <path d="M100 98 q-4 -40 2 -54 q6 -14 16 -18 q6 22 4 72 Z" fill="var(--terr3)" />
    <path d="M240 98 q4 -40 -2 -54 q-6 -14 -16 -18 q-6 22 -4 72 Z" fill="var(--terr3)" />
    <path d="M106 58 q12 -3 22 0 M106 72 q12 -3 22 0 M216 58 q12 -3 22 0 M216 72 q12 -3 22 0" stroke="var(--sky)" strokeWidth="3" fill="none" opacity=".65" />
    <path d="M84 98 q30 -5 62 0 v8 H84 Z M194 98 q30 -5 62 0 v8 h-62 Z" fill="var(--terr4)" />
    <path d="M0 92 q78 -8 164 0 t176 -2 v18 H0 Z" fill="var(--terr1)" opacity=".55" />
  </g>,
  <g key="d" data-mood="night"><rect width="340" height="104" fill="var(--sky)" />
    <circle cx="276" cy="28" r="13" fill="var(--dot)" opacity=".9" />
    <circle cx="271" cy="25" r="11" fill="var(--sky)" />
    <path d="M72 104 q-6 -30 2 -52" stroke="var(--terr4)" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M74 52 q-30 -14 -40 6 M74 52 q30 -14 40 6 M74 52 q-14 -28 -36 -24 M74 52 q14 -28 36 -24" stroke="var(--terr2)" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M188 104 q4 -24 -2 -40" stroke="var(--terr4)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M186 64 q-24 -11 -32 5 M186 64 q24 -11 32 5 M186 64 q-10 -22 -26 -19" stroke="var(--terr3)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M0 96 q86 -8 174 0 t166 -2 v14 H0 Z" fill="var(--terr1)" opacity=".6" />
  </g>,
  <g key="e" data-mood="dusk"><rect width="340" height="104" fill="var(--sky)" />
    <path d="M56 52 q118 -12 198 2 q16 8 24 16 q-128 8 -246 0 q8 -10 24 -18 Z" fill="var(--terr3)" />
    <path d="M66 70 q90 8 176 0 q4 20 0 34 q-90 6 -176 0 q-4 -16 0 -34 Z" fill="var(--terr1)" opacity=".5" />
    <path d="M94 80 q28 -3 54 0 q3 14 0 24 q-28 3 -54 0 q-3 -12 0 -24 Z" fill="var(--sky)" />
    <path d="M178 80 q28 -3 54 0 q2 8 0 14 q-28 3 -54 0 q-2 -7 0 -14 Z" fill="var(--sky)" />
    <circle cx="292" cy="60" r="9" fill="var(--dot)" />
    <path d="M292 40 q2 6 0 11" stroke="var(--terr4)" strokeWidth="2" fill="none" />
    <path d="M0 98 q90 -5 180 0 t160 -2 v10 H0 Z" fill="var(--terr4)" opacity=".45" />
  </g>,
  <g key="f" data-mood="dawn"><rect width="340" height="104" fill="var(--sky)" />{sun(48, 28, 15)}
    {[108, 148, 188, 228, 268].map((x, i) => (
      <g key={i}>
        <path d={`M${x} 104 q${i % 2 ? 6 : -6} -28 ${i % 2 ? 3 : -3} -${50 + (i % 2) * 8}`} stroke="var(--terr4)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d={`M${x + (i % 2 ? 3 : -3)} ${54 + (i % 2) * 8} q-16 -4 -20 -18 M${x + (i % 2 ? 3 : -3)} ${54 + (i % 2) * 8} q16 -4 20 -18`} stroke="var(--terr2)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    ))}
    <path d="M0 94 q94 -8 188 0 t152 -2 v14 H0 Z" fill="var(--terr1)" opacity=".6" />
  </g>,
  <g key="g" data-mood="sea"><rect width="340" height="104" fill="var(--sky)" />{sun(252, 32, 16)}
    <path d="M50 74 q32 8 62 0 q-8 14 -22 16 h-20 q-14 -4 -20 -16 Z" fill="var(--terr4)" />
    <path d="M84 74 q0 -22 -4 -28 q16 12 28 28 Z" fill="var(--hill2)" />
    <path d="M158 80 q24 6 46 0 q-6 10 -16 12 h-14 q-10 -3 -16 -12 Z" fill="var(--terr3)" />
    <path d="M182 80 q0 -16 -2 -20 q12 8 20 20 Z" fill="var(--hill1)" />
    <path d="M0 88 q62 -9 124 -1 t110 2 t106 -4 v19 H0 Z" fill="var(--terr2)" />
    <path d="M0 98 q74 -8 152 0 t188 -3 v9 H0 Z" fill="var(--terr3)" />
    {birds(104, 28)}
  </g>,
  <g key="h" data-mood="day"><rect width="340" height="104" fill="var(--sky)" />{sun(280, 26, 14)}
    <path d="M0 70 q60 -22 118 -6 q46 12 92 -6 q48 -18 130 -2 v48 H0 Z" fill="var(--hill1)" opacity=".7" />
    <path d="M0 84 q76 -16 152 -2 q64 12 188 -6 v28 H0 Z" fill="var(--terr2)" />
    <path d="M0 96 q88 -10 176 0 t164 -4 v12 H0 Z" fill="var(--terr4)" />
    {birds(60, 32)}
  </g>,
  <g key="i" data-mood="dawn"><rect width="340" height="104" fill="var(--sky)" />
    <path d="M170 96 q-8 -30 0 -44 q10 -16 26 -16 q-4 26 -10 60 Z" fill="var(--terr3)" />
    <path d="M170 96 q8 -30 0 -44 q-10 -16 -26 -16 q4 26 10 60 Z" fill="var(--terr2)" />
    <circle cx="170" cy="34" r="11" fill="var(--dot)" />
    <path d="M120 70 q-18 6 -24 20 M220 70 q18 6 24 20" stroke="var(--terr1)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M0 96 q92 -9 184 0 t156 -3 v14 H0 Z" fill="var(--terr4)" opacity=".5" />
  </g>,
  <g key="j" data-mood="day"><rect width="340" height="104" fill="var(--sky)" />{sun(62, 30, 15)}
    <path d="M132 104 q-4 -34 4 -48 q8 -14 22 -16" stroke="var(--terr4)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M158 40 q22 -6 28 10 q-20 8 -28 -10 Z" fill="var(--terr2)" />
    <path d="M150 56 q24 -4 30 12 q-22 6 -30 -12 Z" fill="var(--terr3)" />
    <path d="M142 74 q24 -2 28 14 q-22 4 -28 -14 Z" fill="var(--terr1)" />
    <path d="M0 98 q88 -7 176 0 t164 -2 v12 H0 Z" fill="var(--terr4)" opacity=".45" />
  </g>,
  <g key="k" data-mood="dusk"><rect width="340" height="104" fill="var(--sky)" />{sun(268, 30, 15)}
    <path d="M24 104 q-2 -36 6 -50 q10 -18 28 -20 q-10 34 -14 70 Z" fill="var(--terr2)" />
    <path d="M300 104 q4 -30 -4 -44 q-8 -14 -22 -16 q8 28 12 60 Z" fill="var(--terr3)" />
    <path d="M96 96 q36 -10 76 -2 q40 8 76 0 q-6 12 -22 14 h-112 q-14 -4 -18 -12 Z" fill="var(--terr4)" />
    <path d="M0 94 q80 -8 168 0 t172 -2 v12 H0 Z" fill="var(--terr1)" opacity=".55" />
    {birds(150, 30)}
  </g>,
  <g key="l" data-mood="sea"><rect width="340" height="104" fill="var(--sky)" />
    <circle cx="170" cy="40" r="22" fill="var(--dot)" opacity=".85" />
    <path d="M120 72 q50 -14 100 0 q-18 16 -50 16 q-32 0 -50 -16 Z" fill="var(--terr3)" />
    <path d="M0 86 q66 -10 134 -1 t206 -3 v22 H0 Z" fill="var(--terr2)" />
    <path d="M0 98 q80 -8 164 0 t176 -3 v11 H0 Z" fill="var(--terr4)" />
  </g>,
  <g key="m" data-mood="dawn"><rect width="340" height="104" fill="var(--sky)" />{sun(50, 26, 13)}
    <path d="M104 104 q0 -40 8 -56 q8 -16 24 -18 q-12 36 -16 74 Z" fill="var(--terr2)" />
    <path d="M152 104 q-2 -30 4 -44 q6 -14 20 -16 q-10 28 -14 60 Z" fill="var(--terr3)" />
    <path d="M206 104 q2 -24 8 -36 q6 -12 18 -14 q-10 24 -14 50 Z" fill="var(--terr1)" />
    <path d="M0 100 q90 -6 180 0 t160 -2 v10 H0 Z" fill="var(--terr4)" opacity=".5" />
  </g>,
  <g key="n" data-mood="night"><rect width="340" height="104" fill="var(--sky)" />{sun(272, 34, 17)}
    <path d="M0 62 q52 -20 104 -4 q52 16 104 -4 q52 -20 132 0 v50 H0 Z" fill="var(--hill2)" opacity=".55" />
    <path d="M0 78 q66 -18 132 -2 q66 16 208 -8 v36 H0 Z" fill="var(--terr2)" />
    <path d="M0 94 q84 -10 170 0 t170 -4 v14 H0 Z" fill="var(--terr4)" />
    {birds(76, 30)}
  </g>,
];

const Scene = () => {
  const d = new Date();
  const i = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5) % MOTIFS.length;
  return (
    <svg className="bh-scene" viewBox="0 0 340 104" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {MOTIFS[i]}
    </svg>
  );
};

const WEEK = ["M", "T", "W", "T", "F", "S", "S"];
const Week = ({ days, justDone, small }) => {
  const set = new Set(days || []);
  const now = new Date();
  const dow = (now.getDay() + 6) % 7;                 // Monday = 0
  const monday = new Date(now); monday.setDate(now.getDate() - dow);
  return (
    <div className="bh-week" data-small={small ? 1 : 0}>
      {WEEK.map((l, i) => {
        const d = new Date(monday); d.setDate(monday.getDate() + i);
        const k = localDay(d);
        const isToday = i === dow;
        const done = set.has(k) || (isToday && justDone);
        const s = isToday ? (done ? "todaydone" : "today") : done ? "done" : "";
        return (
          <div key={i} className="bh-day" data-s={s}>
            <div className="bh-daybox">{done && <Icon name="check" size={15} />}</div>
            <div className="bh-daylab">{l}</div>
          </div>
        );
      })}
    </div>
  );
};

const Pips = ({ results, total, at }) => (
  <div>
    <div className="bh-ticks">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className="bh-tick" data-s={results[i] ? (results[i].ok ? "yes" : "no") : i === at ? "now" : ""} />
      ))}
    </div>
    <div className="bh-barlab">
      <span>{Math.min(at + 1, total)} of {total}</span>
      <span>{results.filter((r) => r.ok).length} right</span>
    </div>
  </div>
);

function Drill({ data, vocab, commit, saveHook, saveAlt, saveConfusion, weakWords, preset, back }) {
  const [queue, setQueue] = useState(() => (preset && preset.length ? preset : buildSession(vocab, data.mem, data.want, Date.now(), ROUND, weakWords || [], data.recog ?? 0.15, data.conf || {})));
  const [fixed, setFixed] = useState(false);
  const [results, setResults] = useState([]);
  const [val, setVal] = useState("");
  const [res, setRes] = useState(null);
  const [hook, setHook] = useState(null);
  const [hookBusy, setHookBusy] = useState(false);
  const [checking, setChecking] = useState(false);
  const [slow, setSlow] = useState(false);
  const shownAt = useRef(0);
  const [at, setAt] = useState(0);
  const ref = useRef(null);
  const t0 = useRef(Date.now());

  useEffect(() => { t0.current = Date.now(); if (ref.current && !res) ref.current.focus(); }, [at, res]);

  const next = () => { setRes(null); setVal(""); setHook(null); setFixed(false); setAt((n) => n + 1); };

  // Enter moves on, but only once the verdict has actually been on screen.
  // A held key or a double tap can no longer skip it.
  useEffect(() => {
    if (!res) return;
    const onKey = (e) => {
      if (e.key !== "Enter" || e.repeat) return;
      if (Date.now() - shownAt.current < 600) { e.preventDefault(); return; }
      e.preventDefault();
      next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [res]);

  if (!queue.length)
    return (
      <div>
        <Back on={back} />
        <div className="bh-blank">Your whole deck is in memory and nothing is due. Run the sentence forge instead, or come back tomorrow.</div>
      </div>
    );

  if (at >= queue.length) return <Summary results={results} back={back} again={back} label="round" days={data.days} />;

  const item = queue[at];
  const cloze = item.dir === "cloze";
  const cue = cloze ? item.gap.prompt : item.dir === "en2id" ? item.card.en : item.card.id;
  const sol = cloze ? item.gap.answer : item.dir === "en2id" ? item.card.id : item.card.en;
  const first = !item.st;              // never seen: this turn is a pretest, guessing is the point
  const R = item.st ? Math.round(nowR(item.st, Date.now()) * 100) : null;
  const lapses = item.st ? item.st.l || 0 : 0;
  const saved = data.hooks && data.hooks[item.card.id];

  const settle = async (verdictIn) => {
    if (res || checking) return;              // one answer per card, one check at a time
    const ms = Date.now() - t0.current;
    let verdict = verdictIn;
    let altNote = "";

    // your own accepted phrasings from earlier rounds count immediately
    const known = (data.alts && data.alts[item.card.id]) || [];
    if (verdict === "no" && known.some((k) => canonKey(k) === canonKey(val))) verdict = "alt";

    // otherwise ask whether it is simply another correct way to say it
    if (verdict === "no" && val.trim().length > 0 && item.dir !== "id2en") {
      setChecking(true);
      setSlow(false);
      const slowTimer = setTimeout(() => setSlow(true), 4000);
      try {
        const t = await ask(
          "You judge whether a learner's Indonesian is an acceptable way to say the same thing. Reply with JSON only.",
          [{ role: "user", content:
            `Meaning to express: "${item.dir === "en2id" ? item.card.en : item.card.id}"\n` +
            `The flashcard's wording: "${cloze ? item.card.id : item.card.id}"\n` +
            `Expected here: "${sol}"\nLearner wrote: "${val.trim()}"\n\n` +
            "Accept it if it is natural Indonesian that expresses the same thing, even with different word order, a contraction like namamu for nama kamu, or a synonym. " +
            "aku/saya, kamu/Anda, gak/nggak/tidak, udah/sudah, gimana/bagaimana, mau/ingin, cuma/hanya are always interchangeable and never a mistake. " +
            "If his version is acceptable Indonesian, ok must be true even when another wording would be more idiomatic: put that nuance in the note instead. " +
            "Reject it only if it means something different or is not grammatical. " +
            "JSON: {\"ok\":true|false,\"note\":\"one short line in English: if ok, how it differs in nuance or register from the card; if not ok, what his version actually means\"}" }]
        );
        const j = parseJSON(t);
        if (j && j.ok) { verdict = "alt"; saveAlt(item.card.id, val.trim()); }
        if (j && j.note) altNote = j.note;
      } catch (e) {
        altNote = "Could not reach Claude just now, so this was judged on the card text alone.";
        verdict = verdictIn;
      } finally {
        clearTimeout(slowTimer);
        setChecking(false);
        setSlow(false);
      }
    }

    const grade = gradeOf(verdict === "alt" ? "yes" : verdict, ms, sol.length);
    const ok = grade > 1;
    const nextState = review(item.st, grade, Date.now(), item.prior);
    nextState.cr = item.st ? item.st.cr || 0 : 0;
    if (ok) nextState.cr = Math.min(3, nextState.cr + (item.st && item.st.cd === today() ? 0 : 1));
    shownAt.current = Date.now();
    setRes({ verdict, delay: schedInt(nextState, data.want), first, altNote: undash(altNote) });
    setFixed(false);
    const cls = ok ? null : classifyMiss(val.trim(), sol);
    const kind = ok ? null : verdict === "typo" ? "typo"
      : !val.trim() ? "vocab"
      : cls.misplaced.length && !cls.missing.length ? "order"
      : cls.missing.length ? "vocab" : "choice";
    setResults([...results, { ok, cue, mine: val.trim(), sol: verdict === "alt" ? val.trim() : sol, first, kind }]);
    setHook(null);
    commit({
      id: item.card.id, dir: item.dir, grade, mode: "drill",
      tags: first ? [] : item.card.tags,
      entry: ok || first ? null : {
        mode: "drill", q: cue, mine: val.trim(), correct: sol, prior: item.prior,
        // the reading direction has an English answer, which has no place in the word stats
        ...(item.dir === "id2en"
          ? { missing: [], misplaced: [], missed: [], hit: [] }
          : { ...classifyMiss(val.trim(), sol), missed: classifyMiss(val.trim(), sol).missing, hit: hitWords(val.trim(), sol) }),
      },
    });
    // a wrong answer that is another card from his deck: note the confusion
    if (!ok && val.trim()) {
      const k = canonKey(val);
      const hit = vocab.find((c) => canonKey(c.id) === k || canonKey(c.en) === k);
      if (hit && canonKey(hit.id) !== canonKey(sol)) saveConfusion(item.card.id, hit.id);
    }

    // missed items come back later in the same session, not immediately
    if (!ok && !first) {
      setQueue((q) => {
        const copy = [...q];
        const pos = at + 5 <= copy.length ? at + 5 : copy.length;   // never sooner than four items later
        copy.splice(pos, 0, { ...item, again: true });
        return copy;
      });
    }
  };

  const getHook = async () => {
    setHookBusy(true);
    try {
      const t = await ask(
        "You write keyword mnemonics for a German speaker learning Indonesian. One or two sentences, concrete and vivid, English. No preamble.",
        [{ role: "user", content: `Indonesian: "${item.card.id}" means "${item.card.en}". Give one keyword mnemonic that links the sound of the Indonesian to the meaning. Keep it under 25 words.` }]
      );
      if (t) { setHook(undash(t)); saveHook(item.card.id, undash(t)); }
    } catch (e) {}
    setHookBusy(false);
  };

  const wrong = res && (res.verdict === "no" || res.verdict === "skip");
  // if he typed another card from his own deck, say what that one means
  const mistaken = (() => {
    if (!wrong || !val.trim()) return null;
    const k = canonKey(val);
    const hit = vocab.find((c) => canonKey(c.id) === k || canonKey(c.en) === k);
    return hit && canonKey(hit.id) !== canonKey(sol) ? hit : null;
  })();


  return (
    <div>
      <Back on={back} />
      <h2 className="bh-title serif">Drill</h2>
      <Rule />
      <div className="bh-lede">Items the scheduler chose. Enter checks, Enter again moves on.</div>

      <Pips results={results} total={queue.length} at={at} />

      <div className="bh-stage">
        <div className="bh-ask">
          <span>{first ? "Guess first, then learn it" : cloze ? "Fill the gap" : item.dir === "en2id" ? "Say it in Indonesian" : "What does this mean"}</span>
          <em>{first ? "new" : item.again ? "again" : item.kind === "early" ? "ahead of schedule"
            : (data.conf && (data.conf[item.card.id] || []).length) ? "easy to mix up" : ""}</em>
        </div>
        <div className="bh-cue serif" key={at}>
          {cloze
            ? splitHint(cue).main.split(/(_{2,})/).map((p, i) =>
                /^_{2,}$/.test(p) ? <span key={i} className="bh-gap">?</span> : <span key={i}>{p}</span>)
            : splitHint(cue).main}
        </div>
        {splitHint(cue).hint && <div className="bh-gapen">{splitHint(cue).hint}</div>}
        {cloze && <div className="bh-gapen"><b>Means:</b> {splitHint(item.card.en).main}</div>}
      </div>

      {!res ? (
        <div>
          <div className="bh-do">{cloze ? "One Indonesian word is missing. Type only that word." : first ? "Guess, even if you have no idea, then press Enter." : "Type your answer, then press Enter."}</div>
          <input ref={ref} className="bh-field" value={val} placeholder={first ? "your guess" : "your answer"}
            autoCapitalize="none" autoCorrect="off" spellCheck="false"
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.repeat && val.trim() && !checking) { e.preventDefault(); settle(judge(val, sol, hasBlank(cue))); } }} />
          <div className="bh-acts">
            <button className="bh-go" onClick={() => val.trim() && settle(judge(val, sol, hasBlank(cue)))} disabled={!val.trim() || checking}>{checking ? (slow ? "still checking" : "checking") : "Check"}</button>
            <button className="bh-alt" onClick={() => settle("skip")}>No idea</button>
          </div>
        </div>
      ) : (
        <div>
          <div className={"bh-judge " + (wrong ? "bh-wrong" : "bh-right")}>
            <div className="bh-verdict">
              <b>{res.verdict === "yes" ? "Right" : res.verdict === "alt" ? "Also right" : res.verdict === "typo" ? "Counts, typo though"
                : res.first ? "Now you have seen it" : res.verdict === "skip" ? "Skipped" : "Not quite"}</b>
              <span>back in {showDelay(res.delay)}</span>
            </div>
            {res.verdict === "alt" && (
              <div className="bh-block">
                <div className="bh-blab">Your version, which works</div>
                <div className="bh-sent" style={{ color: "var(--yes)" }}>{val.trim()}</div>
              </div>
            )}
            {(res.verdict === "no" || res.verdict === "typo") && val.trim() && (
              <div className="bh-block">
                <div className="bh-blab">You wrote</div>
                <div className="bh-sent"><Diff parts={diffWords(val.trim(), sol).left} tone="mine" /></div>
              </div>
            )}
            <div className="bh-block">
              <div className="bh-blab">{res.verdict === "alt" ? "The card says" : wrong || res.verdict === "typo" ? "It should be" : "Answer"}</div>
              <div className="bh-sent"><Diff parts={diffWords(val.trim(), sol).right} tone="fix" /></div>
            </div>
            {res.verdict === "yes" && <div className="bh-praise">{PRAISE[at % PRAISE.length]}</div>}
            {res.altNote && <div className="bh-why"><Note text={res.altNote} /></div>}
            {wrong && !first && !fixed && val.trim() && (
              <button className="bh-alt" style={{ marginTop: 10 }} onClick={() => {
                setFixed(true);
                saveAlt(item.card.id, val.trim());
                commit({ id: item.card.id, dir: item.dir, grade: 3, tags: item.card.tags, fixLast: true });
                setResults(results.map((r, i) => (i === results.length - 1 ? { ...r, ok: true, sol: val.trim() } : r)));
              }}>That was right</button>
            )}
            {fixed && <div className="bh-praise">Taken back. It counts as correct and I will accept it next time.</div>}
            {mistaken && (
              <div className="bh-why">
                <b>{mistaken.id}</b> is a card you have, it means "{mistaken.en}". Close, but not this one.
              </div>
            )}
            {(hook || saved) && <div className="bh-why">{hook || saved}</div>}
            {wrong && !first && !hook && !saved && lapses >= 2 && (
              <button className="bh-alt" style={{ marginTop: 12 }} onClick={getHook} disabled={hookBusy}>
                {hookBusy ? "thinking" : "Give me a hook for this one"}
              </button>
            )}
          </div>
          <button className="bh-go" style={{ width: "100%" }} onClick={next}>
            {at + 1 >= queue.length ? "See results" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

const PRAISE_BIG = ["Mantap", "Bagus sekali", "Keren", "Sip", "Oke banget"];

function Summary({ results, back, again, label, days }) {
  const right = results.filter((r) => r.ok).length;
  const misses = results.filter((r) => !r.ok);
  const rate = results.length ? right / results.length : 0;
  const word = rate === 1 ? "Sempurna" : rate >= 0.7 ? PRAISE_BIG[right % PRAISE_BIG.length] : rate >= 0.4 ? "Lumayan" : "Besok lagi";
  const fresh = results.filter((r) => r.first).length;
  const repeats = results.filter((r) => !r.ok && !r.first).length;
  const kinds = results.filter((r) => !r.ok && r.kind).reduce((a, r) => ({ ...a, [r.kind]: (a[r.kind] || 0) + 1 }), {});
  const top = Object.entries(kinds).sort((a, b) => b[1] - a[1])[0];
  const KIND_LINE = {
    vocab: (n) => `${n} of them failed on a word you did not have. That is vocabulary, so the drill is the place to fix it.`,
    choice: (n) => `${n} times you reached for a real word that does not fit there. That is word choice, not memory.`,
    order: (n) => `In ${n} of them you had every word and put them in the wrong order. Your vocabulary is fine, the structure is not.`,
    affix: (n) => `${n} slipped on a prefix or suffix. The stems are there, the affixes are not.`,
    typo: (n) => `${n} were spelling slips. You knew them.`,
  };
  const diagnosis = top && KIND_LINE[top[0]] ? KIND_LINE[top[0]](top[1]) : null;

  const line =
    rate === 1 ? "Every single one. All of these move further out now."
    : rate >= 0.7 && fresh ? `Solid, and ${fresh} of them you had never seen before.`
    : rate >= 0.7 ? "Solid round. The ones you had come back later, the rest sooner."
    : rate >= 0.4 && repeats ? `${repeats} of these you had seen before, so they stay on short intervals.`
    : rate >= 0.4 ? "Middling. Half of this comes back within a day."
    : fresh >= results.length / 2 ? "Mostly new material, so a low score here means nothing yet."
    : "Rough one. This was material you had already seen, so it all comes back tomorrow.";
  return (
    <div>
      <Back on={back} />
      <div className="bh-result">
        <svg viewBox="0 0 120 60" style={{ width: 140, height: 70 }} aria-hidden="true">
          <circle cx="22" cy="30" r="9" fill="#12A47A" opacity=".22" />
          <circle cx="45" cy="22" r="6" fill="#F2B233" opacity=".45" />
          <circle cx="98" cy="30" r="9" fill="#FF7A59" opacity=".22" />
          <circle cx="75" cy="20" r="5" fill="#12A47A" opacity=".35" />
          <circle cx="60" cy="34" r="20" fill={rate >= 0.4 ? "var(--sun)" : "var(--hair)"} />
          <path d="M51 34 l6 6 l12 -14" fill="none" stroke={rate >= 0.4 ? "#412402" : "var(--faint)"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="bh-score serif">{word}</div>
        <div className="bh-scorenote">{right} of {results.length} right. {line}</div>
        {diagnosis && <div className="bh-diag">{diagnosis}</div>}
      </div>

      <Week days={days} justDone={true} />

      {misses.length > 0 && <div className="bh-sub">Coming back soon</div>}
      {misses.map((m, i) => (
        <div key={i} className="bh-miss">
          <b>{m.sol}</b>
          <small>{m.cue}{m.mine ? ` · you had ${m.mine}` : " · skipped"}{m.why ? ` · ${undash(m.why)}` : ""}</small>
        </div>
      ))}

      <div className="bh-acts" style={{ marginTop: 18, flexDirection: "column" }}>
        <button className="bh-go" style={{ width: "100%" }} onClick={back}>Done for today</button>
        <button className="bh-alt" style={{ width: "100%" }} onClick={again}>Another {label}</button>
      </div>
    </div>
  );
}

function Sentences({ data, vocab, commit, weakest, weakWords, strongWords, rememberSeen, learnWord, back }) {
  const [batch, setBatch] = useState([]);
  const [at, setAt] = useState(0);
  const [results, setResults] = useState([]);
  const [val, setVal] = useState("");
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");
  const list = useMemo(() => wordlist(vocab), [vocab]);
  const known = useMemo(() => deckWords(vocab), [vocab]);
  const [fixed, setFixed] = useState(false);
  const [newWords, setNewWords] = useState({});
  const [hint, setHint] = useState(false);

  const casual = (data.register || "casual") === "casual";
  const REGISTER = casual
    ? "Write the model answers in casual spoken Indonesian, the register he needs with his Indonesian partner: aku and kamu rather than saya and Anda, gak or nggak rather than tidak, udah rather than sudah, gimana rather than bagaimana."
    : "Write the model answers in standard polite Indonesian: saya, Anda, tidak, sudah.";

  const load = async () => {
    setBusy(true); setFail(""); setBatch([]); setResults([]); setAt(0); setRes(null); setVal(""); setHint(false); setNewWords({});
    try {
      const recent = (data.seen || []).slice(-40);
      const SETTINGS = ["at home", "at a warung", "on the phone", "at the market", "meeting friends",
        "travelling", "at work", "making plans", "in the evening", "asking for help", "in a shop", "on a bad day"];
      const pick = SETTINGS[Math.floor(Math.random() * SETTINGS.length)];
      const weakList = (weakWords || []).filter((w) => (w.w || 0) >= (w.o || 0)).map((w) => w.k).join(", ");
      const orderList = (weakWords || []).filter((w) => (w.o || 0) > (w.w || 0)).map((w) => w.k).join(", ");
      const t = await ask(
        "You write translation drills for a German learner of Indonesian at A2 level. Never use dashes of any kind, use commas or full stops. Reply with JSON only, no preamble, no markdown.",
        [{ role: "user", content:
          "The learner's entire vocabulary (Indonesian = English):\n\n" + list +
          "\n\n" + REGISTER +
          (weakest ? `\n\nWeakest grammar pattern right now: ${weakest}. At least four sentences must force it.` : "") +
          (weakList ? `\n\nWords he keeps getting wrong inside sentences: ${weakList}. Work as many of these in as you can, one or two per sentence, in new contexts.` : "") +
          (orderList ? `\n\nWords he knows but keeps putting in the wrong position: ${orderList}. Build sentences where their position actually matters.` : "") +
          ((strongWords || []).length ? `\n\nWords he already produces reliably, fine as filler but do not make them the point: ${(strongWords || []).join(", ")}.` : "") +
          `\n\nThis set should be set ${pick}. Write 8 fresh English sentences for him to translate into Indonesian, different from anything obvious. Use only words from the list, difficulty rising, vary the pattern.` +
          (recent.length ? `\n\nDo not repeat or lightly reword any of these, he had them recently:\n${recent.join("\n")}` : "") +
          `\n\nSeed ${Math.floor(Math.random() * 100000)}. JSON array: [{\"en\":\"English sentence\",\"id\":\"Indonesian answer\",\"focus\":\"the two or three Indonesian words from the list that the answer needs, separated by commas, Indonesian only, never English\"}]` }]
      );
      const j = parseJSON(t);
      if (!Array.isArray(j) || !j.length) throw new Error();
      setBatch(j.map((x) => ({ ...x, en: undash(x.en), id: undash(x.id), focus: undash(x.focus || "") })));
      rememberSeen(j.map((x) => x.en).filter(Boolean));
    } catch (e) { setFail("The sentences did not come through. Try again."); }
    setBusy(false);
  };

  useEffect(() => { load(); }, []);

  if (batch.length && at >= batch.length) return <Summary results={results} back={back} again={load} label="set" days={data.days} />;

  const task = batch[at];

  const finish = (ok, correct, note, kind) => {
    const mine = val.trim();
    // only words that actually exist in his deck may become a signal
    const hintWords = hint && task.focus
      ? String(task.focus).split(/[,;]/).map((w) => bare(w.trim())).filter((w) => known.has(w))
      : [];
    setFixed(false);
    const cls = ok ? { missing: [], misplaced: [] } : classifyMiss(mine, correct);
    const missed = cls.missing;
    const misplaced = cls.misplaced;
    const hit = hitWords(mine, correct);
    const guessed = kind || (ok ? null : misplaced.length && !missed.length ? "order" : missed.length ? "vocab" : "choice");
    setRes({ ok, correct, note, mine });
    setResults([...results, { ok, cue: task.en, mine, sol: correct, why: note, kind: guessed }]);
    commit({
      id: null, dir: null, grade: ok ? (hint ? 2 : 3) : 1, mode: "sentences", tags: tagsOf(task.id),
      entry: { mode: "sentences", q: task.en, mine, correct, note: note || "", missed, misplaced, hit, hinted: hintWords, silent: ok },
    });
  };

  const check = async () => {
    if (!val.trim() || busy) return;
    if (judge(val, task.id) === "yes") { finish(true, task.id, "", null); return; }
    setBusy(true);
    try {
      const t = await ask("You correct Indonesian. Short, direct, in English, no praise. Never use dashes of any kind, use commas or full stops. Reply with JSON only.",
        [{ role: "user", content:
          `Task: translate "${task.en}" into Indonesian.\nModel answer: "${task.id}"\nLearner wrote: "${val.trim()}"\n\n` +
          "Treat register variants as fully correct, never as mistakes: aku = saya, kamu = Anda, gak = nggak = tidak, udah = sudah, gimana = bagaimana, mau = ingin, cuma = hanya. " +
          "If his sentence is acceptable Indonesian for the task, ok must be true even when the model answer is phrased differently or sounds more idiomatic. Put that nuance in the note. " +
          (casual ? "He is learning for casual conversation with his Indonesian partner, so prefer the casual form in your corrected version. " : "") +
          "Accept equivalent phrasings and small typos as correct. " +
          "JSON: {\"ok\":true|false,\"correct\":\"best Indonesian version\",\"wrong\":[\"the exact words he got wrong\"]," +
          "\"kind\":\"one of vocab, choice, order, affix, typo: vocab if a word he needed is missing entirely, choice if he used a real word that is wrong here, order if the words are right but in the wrong position, affix if only a prefix or suffix is wrong, typo for a misspelling\"," +
          "\"note\":\"one line: what went wrong, or what sounds more natural\"}" }]);
      const j = parseJSON(t) || { ok: false, correct: task.id, note: "" };
      finish(!!j.ok, undash(j.correct || task.id), undash(j.note || ""), j.kind);
    } catch (e) {
      finish(false, task.id, "Could not reach Claude just now, so this was compared with the model answer only.");
    } finally { setBusy(false); }
  };

  return (
    <div>
      <Back on={back} />
      <h2 className="bh-title serif">Sentence forge</h2>
      <Rule />
      <div className="bh-lede">
        {weakest ? `Weighted towards ${weakest}, the pattern you miss most.` : `Built from your ${vocab.length} cards, nothing foreign inside.`}
      </div>

      {!task && <div className="bh-blank">{busy ? <span className="bh-load">writing sentences</span> : fail || "Nothing loaded."}</div>}

      {task && (
        <div>
          <Pips results={results} total={batch.length} at={at} />
          <div className="bh-stage">
            <div className="bh-ask">
              <span>Say it in Indonesian</span>
              {!hint && task.focus && <button className="bh-hintbtn" onClick={() => setHint(true)}>Need a hint?</button>}
            </div>
            <div className="bh-cue serif" key={at}>{task.en}</div>
            {hint && task.focus && (
              <div className="bh-hintbox">
                <span className="bh-hintlab">Words that fit</span>
                <div className="bh-chips">
                  {String(task.focus).split(/[,;]/).map((w) => w.trim()).filter(Boolean).map((w) => (
                    <span key={w} className="bh-chip">{w}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!res ? (
            <div>
              <div className="bh-do">Write the Indonesian, then press Enter.</div>
              <input className="bh-field" value={val} placeholder="your answer"
                autoCapitalize="none" autoCorrect="off" spellCheck="false"
                onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.repeat) { e.preventDefault(); check(); } }} />
              <div className="bh-acts">
                <button className="bh-go" onClick={check} disabled={!val.trim() || busy}>{busy ? "checking" : "Check"}</button>
                <button className="bh-alt" onClick={() => finish(false, task.id, "", "vocab")}>No idea</button>
              </div>
            </div>
          ) : (
            <div>
              <div className={"bh-judge " + (res.ok ? "bh-right" : "bh-wrong")}>
                <div className="bh-verdict"><b>{res.ok ? (hint ? "Right, with the hint" : "Right") : "Not quite"}</b></div>
                {!res.ok && res.mine && (
                  <div className="bh-block">
                    <div className="bh-blab">You wrote</div>
                    <div className="bh-sent"><Diff parts={diffWords(res.mine, res.correct || task.id).left} tone="mine" /></div>
                  </div>
                )}
                <div className="bh-block">
                  <div className="bh-blab">{res.ok ? "Model answer" : "It should be"}</div>
                  <div className="bh-sent"><Diff parts={diffWords(res.mine || "", res.correct || task.id).right} tone="fix" /></div>
                </div>
                {res.note && <div className="bh-why"><Note text={res.note} /></div>}
                {outsideDeck(res.correct || task.id, known).length > 0 && (
                  <div className="bh-newbox">
                    <div className="bh-newlab">New word{outsideDeck(res.correct || task.id, known).length > 1 ? "s" : ""} for you</div>
                    <div className="bh-chips">
                      {outsideDeck(res.correct || task.id, known).map((w) => (
                        <button key={w} className="bh-newchip" data-state={newWords[w] || "idle"}
                          disabled={!!newWords[w]}
                          onClick={async () => {
                            setNewWords((s) => ({ ...s, [w]: "busy" }));
                            const j = await learnWord(w, res.correct || task.id);
                            setNewWords((s) => ({ ...s, [w]: j ? `added: ${j.en}` : "could not add" }));
                          }}>
                          {newWords[w] === "busy" ? `${w} …` : newWords[w] && newWords[w] !== "busy" ? `${w} · ${newWords[w]}` : `+ ${w}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!res.ok && !fixed && val.trim() && (
                  <button className="bh-alt" style={{ marginTop: 10 }} onClick={() => {
                    setFixed(true);
                    commit({ id: null, dir: null, grade: 3, mode: "sentences", tags: tagsOf(task.id), fixLast: true });
                    setResults(results.map((r, i) => (i === results.length - 1 ? { ...r, ok: true, sol: val.trim() } : r)));
                  }}>That was right</button>
                )}
                {fixed && <div className="bh-praise">Taken back, it counts as correct.</div>}
              </div>
              <button className="bh-go" style={{ width: "100%" }} onClick={() => { setRes(null); setVal(""); setFixed(false); setHint(false); setNewWords({}); setAt(at + 1); }}>
                {at + 1 >= batch.length ? "See results" : "Next"}
              </button>
            </div>
          )}
          {fail && <div className="bh-fail">{fail}</div>}
        </div>
      )}
    </div>
  );
}

const SCENES = [
  { k: "W", ic: "bowl", t: "Warung", d: "Order food, ask what is in it", s: "You run a warung in Yogyakarta. The learner wants to order." },
  { k: "G", ic: "scooter", t: "Grab ride", d: "Destination, traffic, small talk", s: "You are a Grab driver picking the learner up." },
  { k: "P", ic: "fruit", t: "Market", d: "Buy something, haggle a little", s: "You sell fruit at the pasar. The learner buys and haggles." },
  { k: "K", ic: "house", t: "Meeting the family", d: "Where you are from, work, food", s: "You are the aunt of the learner's partner, meeting him for the first time. Ask politely about origin, work, age, food." },
  { k: "T", ic: "plant", t: "Neighbour", d: "Morning chat outside the house", s: "You are the neighbour running into the learner outside in the morning." },
];

function Roleplay({ vocab, commit, back }) {
  const [scene, setScene] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);
  const [review2, setReview2] = useState(null);
  const [fail, setFail] = useState("");
  const list = useMemo(() => wordlist(vocab), [vocab]);

  const turns = msgs.filter((m) => m.role === "user").length;
  useEffect(() => {
    if (scene && turns >= 6 && !review2 && !busy) evaluate();   // enough said, wrap it up
  }, [scene, turns, review2, busy]);

  const system = scene
    ? scene.s + " Speak Indonesian only, at most two short sentences per turn, A2 level. Prefer words from this list, stay in character even if the learner makes mistakes or writes English, and never correct anything during the conversation.\n\n" + list
    : "";

  const start = async (sc) => {
    setScene(sc); setBusy(true); setReview2(null); setMsgs([]); setFail("");
    try {
      const t = await ask(sc.s + " Speak Indonesian only, at most two short sentences, A2 level.",
        [{ role: "user", content: "Open the conversation naturally." }]);
      setMsgs([{ role: "assistant", content: t }]);
    } catch (e) {
      setFail("Could not start the scene. Check your connection and try again.");
      setScene(null);
    } finally { setBusy(false); }
  };

  const send = async () => {
    if (!val.trim() || busy) return;
    const hist = [...msgs, { role: "user", content: val.trim() }];
    setMsgs(hist); setVal(""); setBusy(true); setFail("");
    try {
      const t = await ask(system, hist);
      setMsgs([...hist, { role: "assistant", content: t }]);
    } catch (e) {
      setFail("That reply did not come through. Try sending again.");
    } finally { setBusy(false); }
  };

  const evaluate = async () => {
    if (busy) return;
    setBusy(true); setFail("");
    const script = msgs.map((m) => (m.role === "user" ? "LEARNER: " : "CHARACTER: ") + m.content).join("\n");
    let t = "";
    try {
      t = await ask("You review a roleplay for a German learner of Indonesian. Direct, concrete, in English. Never use dashes of any kind. Reply with JSON only.",
        [{ role: "user", content: script +
          "\n\nReview only the learner's lines. Treat aku/saya, gak/tidak, udah/sudah, cuma/hanya as fully correct. JSON: " +
          "{\"good\":[{\"line\":\"something he got right\",\"why\":\"what was good about it, one short line\"}]," +
          "\"nearly\":[{\"mine\":\"his line\",\"better\":\"how a native would say it\",\"why\":\"one line, understandable but not natural\"}]," +
          "\"slips\":[{\"mine\":\"his line\",\"correct\":\"fixed\",\"note\":\"one line why it is wrong\"}]," +
          "\"pattern\":\"the one thing to work on, one sentence\"}" }]);
    } catch (e) {
      setFail("The review did not come through. Try again.");
      setBusy(false);
      return;
    }
    const j = parseJSON(t) || { good: [], nearly: [], slips: [], pattern: "" };
    setReview2(j);
    commit({ id: null, dir: null, grade: 3, mode: "roleplay", tags: [] });
    (j.slips || []).forEach((f) =>
      commit({ id: null, dir: null, grade: 1, mode: "roleplay", tags: tagsOf(f.correct || ""), entry: { mode: "roleplay", q: scene.t, mine: f.mine, correct: f.correct, note: f.note || "" } }));
    setBusy(false);
  };

  if (!scene)
    return (
      <div>
        <Back on={back} />
        <h2 className="bh-title serif">Roleplay</h2>
      <Rule />
        <div className="bh-lede">Indonesian only. Slips are collected, shown at the end, and fed back into the pattern scores.</div>
        <div>{SCENES.map((s) => <Tile key={s.k} ic={s.ic} n={s.t} d={s.d} on={() => start(s)} />)}</div>
      </div>
    );

  const leave = () => { setScene(null); setMsgs([]); setReview2(null); };

  return (
    <div>
      <Back to="Scenes" on={leave} />
      <h2 className="bh-title serif">{scene.t}</h2>
      <div className="bh-lede">Answer in Indonesian, as best you can.</div>

      <div className="bh-thread">
        {msgs.map((m, i) => <div key={i} className={"bh-bubble " + (m.role === "user" ? "bh-mine" : "bh-from")}>{m.content}</div>)}
        {busy && <div className="bh-bubble bh-from"><span className="bh-load">typing</span></div>}
      </div>
      {fail && <div className="bh-fail">{fail}</div>}

      {!review2 && (
        <div>
          <div className="bh-do">Reply in Indonesian, then press Enter. The scene wraps up on its own after a few turns.</div>
          <input className="bh-field" value={val} placeholder="your reply"
            autoCapitalize="none" autoCorrect="off" spellCheck="false"
            onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.repeat) { e.preventDefault(); send(); } }} />
          <div className="bh-acts">
            <button className="bh-go" onClick={send} disabled={!val.trim() || busy}>Send</button>
            <button className="bh-alt" onClick={evaluate} disabled={busy || msgs.length < 3}>End it now</button>
          </div>
        </div>
      )}

      {review2 && (
        <div>
          {(review2.good || []).length > 0 && (
            <div className="bh-judge bh-right">
              <div className="bh-verdict"><b>This worked</b></div>
              {(review2.good || []).map((g, i) => (
                <div key={i} className="bh-block">
                  <div className="bh-sent">{g.line}</div>
                  {g.why && <div className="bh-why"><Note text={g.why} /></div>}
                </div>
              ))}
            </div>
          )}

          {(review2.nearly || []).map((n, i) => (
            <div key={"n" + i} className="bh-judge" style={{ background: "var(--act)", borderColor: "var(--act-line)" }}>
              <div className="bh-verdict"><b style={{ color: "var(--act-ink)" }}>Understandable, not quite natural</b></div>
              <div className="bh-block"><div className="bh-blab">You said</div><div className="bh-sent">{n.mine}</div></div>
              <div className="bh-block"><div className="bh-blab">A native would say</div><div className="bh-sent">{n.better}</div></div>
              {n.why && <div className="bh-why"><Note text={n.why} /></div>}
            </div>
          ))}

          {(review2.slips || []).length === 0 && (review2.nearly || []).length === 0 && (review2.good || []).length === 0 && (
            <div className="bh-judge bh-right"><div className="bh-verdict"><b>Nothing to fix</b></div></div>
          )}
          {(review2.slips || []).map((f, i) => (
            <div key={i} className="bh-judge bh-wrong">
              <div className="bh-block"><div className="bh-blab">You said</div><div className="bh-sent" style={{ color: "var(--muted)", textDecoration: "line-through" }}>{f.mine}</div></div>
              <div className="bh-block"><div className="bh-blab">Better</div><div className="bh-sent">{f.correct}</div></div>
              {f.note && <div className="bh-why"><Note text={f.note} /></div>}
            </div>
          ))}
          {review2.pattern && <div className="bh-panel"><div className="bh-plabel">Work on this</div><div>{undash(review2.pattern)}</div></div>}
          <button className="bh-go" style={{ width: "100%" }} onClick={leave}>New scene</button>
        </div>
      )}
    </div>
  );
}

function Memory({ data, vocab, weakWords, back, persist, go }) {
  const now = Date.now();


  const retention = (() => {
    const keys = Object.keys(data.mem);
    if (!keys.length) return 0;
    return keys.reduce((a, k) => a + nowR(data.mem[k], now), 0) / keys.length;
  })();

  const stages = (() => {
    const s = { fresh: 0, settling: 0, holding: 0, solid: 0 };
    const seen = new Set();
    vocab.forEach((c) => {
      const st = data.mem[c.id + "|en2id"] || data.mem[c.id + "|id2en"];
      seen.add(c.id);
      if (!st) { s.fresh++; return; }
      const iv = schedInt(st, data.want);
      if ((st.cr || 0) < 3) s.settling++;
      else if (iv < 21) s.holding++;
      else s.solid++;
    });
    return s;
  })();

  const activity = (() => {
    const out = [];
    const l = data.log || {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const day = l[localDay(d)] || {};
      out.push((day.drill || 0) + (day.sentences || 0) + (day.roleplay || 0));
    }
    return out;
  })();
  const weekAnswers = activity.slice(-7).reduce((a, b) => a + b, 0);
  const hintsWeek = (() => {
    const l = data.log || {};
    let n = 0;
    for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); n += (l[localDay(d)] || {}).hints || 0; }
    return n;
  })();
  const dueNow = Object.keys(data.mem).filter((k) => dueIn(data.mem[k], data.want, now) <= 0).length;

  const window7 = (from, to) => {
    const acc = {};
    const l = data.patLog || {};
    for (let i = from; i < to; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const day = l[localDay(d)] || {};
      Object.entries(day).forEach(([k, v]) => {
        const e = acc[k] || { c: 0, w: 0 };
        e.c += v.c || 0; e.w += v.w || 0;
        acc[k] = e;
      });
    }
    return acc;
  };
  const recent = window7(0, 7), earlier = window7(7, 14);

  const pats = Object.entries(data.pat)
    .map(([k, v]) => {
      const n = (v.c || 0) + (v.w || 0);
      const r = recent[k], e = earlier[k];
      const rRate = r && r.c + r.w >= 3 ? r.w / (r.c + r.w) : null;
      const eRate = e && e.c + e.w >= 3 ? e.w / (e.c + e.w) : null;
      const trend = rRate !== null && eRate !== null ? rRate - eRate : null;
      return { k, ...v, n, rate: (v.w || 0) / Math.max(1, n), thin: n < 5, trend };
    })
    .filter((p) => p.n >= 2)
    .sort((a, b) => (a.thin - b.thin) || (b.w - a.w) || (b.rate - a.rate));

  const hardest = Object.entries(data.mem)
    .map(([k, v]) => ({ k: k.split("|")[0], dir: k.split("|")[1], ...v }))
    .filter((h) => (h.l || 0) > 0 || (h.d || 0) >= 6)
    .sort((a, b) => (b.l || 0) - (a.l || 0) || (b.d || 0) - (a.d || 0))
    .slice(0, 8);


  return (
    <div>
      <Back on={back} />
      <h2 className="bh-title serif">Memory</h2>
      <Rule />
      <div className="bh-lede">
        {vocab.length} cards in your deck. {Object.keys(data.mem).length} of their directions are being scheduled,
        with an average recall of {Math.round(retention * 100)}% right now.
      </div>

      <div className="bh-panel">
        <div className="bh-plabel">How far along your {vocab.length} cards are</div>
        <div className="bh-stattiles">
          <div className="bh-stattile" data-tone="fresh">
            <b className="serif">{stages.fresh}</b><span>never seen</span>
          </div>
          <div className="bh-stattile" data-tone="settling">
            <b className="serif">{stages.settling}</b><span>settling in</span>
          </div>
          <div className="bh-stattile" data-tone="holding">
            <b className="serif">{stages.holding}</b><span>come back in days</span>
          </div>
          <div className="bh-stattile" data-tone="solid">
            <b className="serif">{stages.solid}</b><span>come back in weeks</span>
          </div>
        </div>
      </div>

      <div className="bh-panel">
        <div className="bh-plabel">Last two weeks</div>
        <div className="bh-fc">
          {activity.map((n, i) => (
            <div key={i} style={{ height: `${Math.max(4, (n / Math.max(1, ...activity)) * 100)}%`,
              background: n ? "var(--solid)" : "var(--hair)" }} title={`${n} answers`} />
          ))}
        </div>
        <div className="bh-fclab"><span>14 days ago</span><span style={{ textAlign: "right" }}>today</span></div>
        <div className="bh-row" style={{ marginTop: 12 }}>
          <span>Answers this week</span><span className="bh-count">{weekAnswers}</span>
        </div>
        <div className="bh-row">
          <span>Days practised</span><span className="bh-count">{data.days.length}</span>
        </div>
        <div className="bh-row">
          <span>Due right now</span><span className="bh-count">{dueNow}</span>
        </div>
        <div className="bh-row">
          <span>Hints used this week</span><span className="bh-count">{hintsWeek}</span>
        </div>
      </div>

      {pats.length > 0 && (
        <div className="bh-panel">
          <div className="bh-plabel">Patterns you miss most</div>
          {pats[0] && !pats[0].thin && (
            <div className="bh-diag" style={{ margin: "0 0 14px" }}>
              Your most expensive pattern is <b>{pats[0].k}</b>, {pats[0].w} mistakes out of {pats[0].n} tries.
            </div>
          )}
          {pats.map((p) => (
            <button key={p.k} className="bh-prow" data-thin={p.thin ? 1 : 0} onClick={() => go("lesson", p.k)}>
              <span className="bh-pname">
                {p.k}
                {p.trend !== null && Math.abs(p.trend) > 0.08 && (
                  <span className="bh-trend" data-dir={p.trend < 0 ? "up" : "down"}>
                    {p.trend < 0 ? "improving" : "getting worse"}
                  </span>
                )}
              </span>
              <span className="bh-pnum">
                {p.thin ? <span className="bh-thin">too few tries</span>
                  : <><b>{Math.round(p.rate * 100)}%</b> wrong <span className="bh-pnum-sub">({p.w} of {p.n})</span></>}
              </span>
              <div className="bh-meter"><i style={{ width: `${Math.round(p.rate * 100)}%` }} /></div>
            </button>
          ))}
          <div className="bh-note" style={{ marginTop: 12 }}>
            Ranked by how many mistakes each one actually cost you. The bold number is how often it goes wrong when it comes up. Tap one for a short lesson.
          </div>
        </div>
      )}

      {(weakWords || []).length > 0 && (
        <div className="bh-panel">
          <div className="bh-plabel">Words you drop inside sentences</div>
          <div className="bh-chips">
            {(() => {
              const maxW = Math.max(...weakWords.map((w) => w.w));
              return weakWords.map((w) => (
                <span key={w.k} className="bh-chip"
                  style={{ background: "var(--no-bg)", color: "var(--no)", opacity: 0.55 + 0.45 * (w.w / maxW) }}>
                  {showWord(w.k, data.register)} · {w.w}x
                </span>
              ));
            })()}
          </div>
          <div className="bh-note" style={{ marginTop: 14 }}>
            These come round more often in the drill now, and the sentence forge builds around them.
          </div>
        </div>
      )}

      {hardest.length > 0 && (
        <div className="bh-panel">
          <div className="bh-plabel">Hardest items right now</div>
          {hardest.map((h, i) => {
            const left = dueIn(h, data.want, now);
            return (
              <div key={i} className="bh-row">
                <span style={{ flex: 1, minWidth: 0, paddingRight: 10 }}>{h.k}</span>
                <span className="bh-count" style={{ minWidth: "auto" }}>
                  {h.l > 0 ? `wrong ${h.l}x` : "tricky"}
                  <span style={{ display: "block", color: "var(--faint)", fontWeight: 400 }}>
                    {left <= 0 ? "due now" : `back in ${showDelay(left)}`}
                  </span>
                </span>
              </div>
            );
          })}
          <div className="bh-note" style={{ marginTop: 12 }}>
            Sorted by how often you've actually gotten these wrong.
          </div>
        </div>
      )}

    </div>
  );
}

function Settings({ data, vocab, persist, back }) {
  return (
    <div>
      <Back on={back} />
      <h2 className="bh-title serif">Settings</h2>
      <Rule />
      <div className="bh-lede">How the app behaves and how your progress is kept.</div>

      <div className="bh-panel">
        <div className="bh-plabel">Appearance</div>
        <div className="bh-switch" style={{ marginBottom: 10, gridTemplateColumns: "1fr 1fr 1fr" }}>
          <button data-on={data.theme === "auto" ? 1 : 0} onClick={() => persist({ ...data, theme: "auto" })}>Auto</button>
          <button data-on={!data.theme || data.theme === "light" ? 1 : 0} onClick={() => persist({ ...data, theme: "light" })}>Light</button>
          <button data-on={data.theme === "dark" ? 1 : 0} onClick={() => persist({ ...data, theme: "dark" })}>Dark</button>
        </div>
        <div className="bh-note">Light is the default. Auto follows your phone instead.</div>
      </div>

      <div className="bh-panel">
        <div className="bh-plabel">How much reading practice</div>
        <input className="bh-slider" type="range" min="0" max="0.5" step="0.05" value={data.recog ?? 0.15}
          onChange={(e) => persist({ ...data, recog: parseFloat(e.target.value) })} />
        <div className="bh-note">
          {Math.round((data.recog ?? 0.15) * 100)}% of each round is Indonesian to English. The rest is production, which is what
          carries over to speaking. Turn this up if you find yourself lost reading messages.
        </div>
      </div>

      <div className="bh-panel">
        <div className="bh-plabel">How you want to sound</div>
        <div className="bh-switch" style={{ marginBottom: 12 }}>
          <button data-on={(data.register || "casual") === "casual" ? 1 : 0} onClick={() => persist({ ...data, register: "casual" })}>Casual</button>
          <button data-on={data.register === "polite" ? 1 : 0} onClick={() => persist({ ...data, register: "polite" })}>Polite</button>
        </div>
        <div className="bh-note">
          Casual gives you aku, kamu, gak, udah, gimana, which is how you would talk to your partner and her friends.
          Polite gives you saya, Anda, tidak, sudah. Either way both count as correct when you answer, this only decides
          which version the app writes back at you.
        </div>
      </div>


      {data.cal && data.cal.n >= 10 && (
        <div className="bh-panel">
          <div className="bh-plabel">Is the model right about you</div>
          <div className="bh-row"><span>predicted recall</span><span className="bh-count">{Math.round((data.cal.pred / data.cal.n) * 100)}%</span></div>
          <div className="bh-row"><span>what actually happened</span><span className="bh-count">{Math.round((data.cal.hit / data.cal.n) * 100)}%</span></div>
          <div className="bh-note" style={{ marginTop: 12 }}>
            Measured over {data.cal.n} reviews. If the second number sits well below the first, the default parameters are too optimistic
            for you and the target above should come up. Well above, and you are reviewing more often than you need to.
          </div>
        </div>
      )}

      <div className="bh-panel">
        <div className="bh-plabel">Target recall {Math.round(data.want * 100)}%</div>
        <input className="bh-slider" type="range" min="0.8" max="0.95" step="0.01" value={data.want}
          onChange={(e) => persist({ ...data, want: parseFloat(e.target.value) })} />
        <div className="bh-note">
          Higher means cards come back sooner and you forget less, at the cost of more reviews. Going from 90 to 95 roughly doubles the
          workload for a few points of recall, so 85 to 90 is where most people sit.
        </div>
      </div>

      <div className="bh-panel">
        <div className="bh-plabel">What is running under this</div>
        <div className="bh-note">
          FSRS-6, the scheduler Anki ships by default, with its published parameters. Every item carries a stability and a difficulty,
          and the next review lands when predicted recall drops to the target above. On top of that:
          grades are measured from what you type and how long you took, so there is no self-rating to fool.
          A new item inherits difficulty from cards sharing its words instead of starting blind.
          Every card is tagged with the grammar it uses, and the sentence forge aims at whichever tag you miss most.
          A new item stays on short intervals until you have recalled it correctly on three separate days, which is worth
          far more than three correct answers inside one session. First contact with a card is a guess, not a presentation,
          because guessing wrong and then seeing the answer beats simply being shown it.
          And a missed item returns later in the same session rather than immediately.
          The mix leans towards production: English to Indonesian first, gap-filling inside your own sentences second,
          Indonesian to English last and only once the other direction holds. Producing a word is harder than recognising
          it, and it carries over to recognition, while the reverse barely happens.
        </div>
      </div>

      <Backup data={data} vocab={vocab} persist={persist} />

      <div className="bh-acts">
        <button className="bh-alt" style={{ flex: 1 }} onClick={() => { if (confirm("Delete all progress?")) persist(EMPTY); }}>Reset everything</button>
      </div>
    </div>
  );
}

function Backup({ data, vocab, persist }) {
  const [paste, setPaste] = useState("");
  const [msg, setMsg] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const payload = useMemo(() => JSON.stringify({ v: 1, when: Date.now(), vocab, data }), [data, vocab]);

  // Manual tap-select-all-copy on a long single-line blob is unreliable on
  // phone browsers (selection and the copy gesture can grab less than the
  // whole field, silently). The Clipboard API copies the exact string in
  // one call, no selection involved, so it is the primary path here; the
  // textarea and its onFocus select() stay as a fallback for browsers
  // without clipboard permission.
  const copyPayload = async () => {
    setCopyMsg("");
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error();
      await navigator.clipboard.writeText(payload);
      setCopyMsg("Copied.");
    } catch (e) {
      setCopyMsg("Could not copy automatically. Tap into the box, select all, then copy by hand.");
    }
  };

  const pasteFromClipboard = async () => {
    setMsg("");
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) throw new Error();
      const t = await navigator.clipboard.readText();
      if (t) setPaste(t);
    } catch (e) {
      setMsg("Could not read the clipboard automatically. Paste into the box by hand.");
    }
  };

  const restore = () => {
    setMsg("");
    try {
      // defensive: strip anything a phone keyboard or copy step left
      // outside the braces, same tolerant read a JSON parser downstream would do
      let raw = paste.trim();
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start >= 0 && end >= start) raw = raw.slice(start, end + 1);
      const inc = JSON.parse(raw);
      const incData = inc.data || inc;
      if (!incData || !incData.mem) throw new Error();
      const merged = mergeState(data, incData);
      persist(merged);
      const gained = Object.keys(merged.mem).length - Object.keys(data.mem || {}).length;
      setMsg(`Restored. ${Object.keys(merged.mem).length} memories now${gained > 0 ? `, ${gained} came from the backup` : ", nothing was lost"}.`);
      setPaste("");
    } catch (e) { setMsg("That does not look like a backup. Paste the whole block, from the first brace to the last."); }
  };

  return (
    <div className="bh-panel">
      <div className="bh-plabel">Your progress as text</div>
      <div className="bh-note" style={{ marginBottom: 12 }}>
        Progress belongs to this published app. Before you switch to a new version, tap Copy, then open the new one and
        tap Paste. Restoring merges, it never throws away newer progress. Copy and Paste beat selecting the text by
        hand, especially on a phone.
      </div>
      <textarea className="bh-field" style={{ height: 88, fontSize: 12, lineHeight: 1.4 }} readOnly value={payload}
        onFocus={(e) => e.target.select()} />
      <div className="bh-acts">
        <button className="bh-alt" onClick={copyPayload}>Copy</button>
      </div>
      {copyMsg && <div className="bh-why">{copyMsg}</div>}
      <div className="bh-plabel" style={{ marginTop: 18 }}>Restore from text</div>
      <textarea className="bh-field" style={{ height: 88, fontSize: 12 }} placeholder="paste a backup here"
        value={paste} onChange={(e) => setPaste(e.target.value)} />
      <div className="bh-acts">
        <button className="bh-alt" onClick={pasteFromClipboard}>Paste</button>
        <button className="bh-go" onClick={restore} disabled={!paste.trim()}>Restore and merge</button>
      </div>
      {msg && <div className="bh-why">{msg}</div>}
    </div>
  );
}

function Library({ data, vocab, update, back }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("worst");
  const [open, setOpen] = useState(null);
  const [draftId, setDraftId] = useState("");
  const [draftEn, setDraftEn] = useState("");
  const now = Date.now();

  const rows = vocab.map((c) => {
    const p = data.mem[c.id + "|en2id"], r = data.mem[c.id + "|id2en"], cl = data.mem[c.id + "|cloze"];
    const st = p || r || cl;
    const wrong = (p?.l || 0) + (r?.l || 0) + (cl?.l || 0);
    const own = (data.mine || []).some((m) => m.id === c.id);
    return { c, st, wrong, own, due: st ? dueIn(st, data.want, now) : 999, cr: st ? st.cr || 0 : -1 };
  });

  const needle = q.trim().toLowerCase();
  const shown = rows
    .filter((r) => !needle || r.c.id.toLowerCase().includes(needle) || r.c.en.toLowerCase().includes(needle))
    .sort((a, b) =>
      sort === "worst" ? b.wrong - a.wrong || a.due - b.due
        : sort === "due" ? a.due - b.due
        : a.c.id.localeCompare(b.c.id))
    .slice(0, 120);

  const saveEdit = (card) => update((next) => {
    const idText = draftId.trim() || card.id, enText = draftEn.trim() || card.en;
    next.fixes = next.fixes || {};
    next.fixes[card.id.toLowerCase()] = idText;      // survives the next Anki import
    next.mine = (next.mine || []).filter((m) => m.id !== card.id);
    next.mine.unshift({ id: idText, en: enText, s: idText.split(/\s+/).length > 2 ? 1 : 0 });
    if (idText !== card.id) {
      ["en2id", "id2en", "cloze"].forEach((d) => {
        if (next.mem[card.id + "|" + d]) { next.mem[idText + "|" + d] = next.mem[card.id + "|" + d]; delete next.mem[card.id + "|" + d]; }
      });
    }
    setOpen(null);
  });

  const drop = (card) => update((next) => {
    next.mine = (next.mine || []).filter((m) => m.id !== card.id);
    next.dropped = Array.from(new Set([...(next.dropped || []), card.id]));
    ["en2id", "id2en", "cloze"].forEach((d) => delete next.mem[card.id + "|" + d]);
    setOpen(null);
  });

  return (
    <div>
      <Back on={back} />
      <h2 className="bh-title serif">Everything you have</h2>
      <Rule />
      <div className="bh-lede">{vocab.length} cards. Search, sort, fix what is broken.</div>

      <input className="bh-field" placeholder="search Indonesian or English" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="bh-switch" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginTop: 10 }}>
        <button data-on={sort === "worst" ? 1 : 0} onClick={() => setSort("worst")}>Most missed</button>
        <button data-on={sort === "due" ? 1 : 0} onClick={() => setSort("due")}>Due next</button>
        <button data-on={sort === "az" ? 1 : 0} onClick={() => setSort("az")}>A to Z</button>
      </div>

      {shown.map((r) => (
        <div key={r.c.id} className="bh-miss" style={{ cursor: "pointer" }}
          onClick={() => { setOpen(open === r.c.id ? null : r.c.id); setDraftId(r.c.id); setDraftEn(r.c.en); }}>
          <b>{r.c.id}</b>
          <small>
            {r.c.en}
            {r.cr < 0 ? " · not started" : r.cr < 3 ? ` · settling in, day ${r.cr} of 3` : ` · back in ${showDelay(Math.max(0, r.due))}`}
            {r.wrong > 0 ? ` · missed ${r.wrong}x` : ""}
            {r.own ? " · yours" : ""}
          </small>
          {open === r.c.id && (
            <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 12 }}>
              <input className="bh-field" value={draftId} onChange={(e) => setDraftId(e.target.value)} autoCapitalize="none" />
              <input className="bh-field" style={{ marginTop: 8 }} value={draftEn} onChange={(e) => setDraftEn(e.target.value)} />
              <div className="bh-acts">
                <button className="bh-go" onClick={() => saveEdit(r.c)}>Save</button>
                <button className="bh-alt" onClick={() => { if (confirm("Remove this card?")) drop(r.c); }}>Remove</button>
              </div>
              {(data.alts && data.alts[r.c.id] || []).length > 0 && (
                <div className="bh-note" style={{ marginTop: 10 }}>Also accepted: {(data.alts[r.c.id] || []).join(" · ")}</div>
              )}
            </div>
          )}
        </div>
      ))}
      {shown.length === 0 && <div className="bh-blank">Nothing matches that.</div>}
    </div>
  );
}

const SRC_LABEL = { drill: "drill", sentences: "sentence forge", roleplay: "roleplay" };

/* When one grammar pattern keeps failing, drilling more of the same is the
   wrong answer. A short explanation with contrasting examples costs two
   minutes and fixes the rule rather than the single card. */
function Lesson({ data, pattern, persist, go, back }) {
  const cached = (data.lessons || {})[pattern];
  const [text, setText] = useState(cached || null);
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");

  useEffect(() => {
    if (text || busy) return;
    let gone = false;
    (async () => {
      setBusy(true);
      try {
        const t = await ask(
          "You teach one Indonesian grammar point to a German learner at A2 level. Plain English, concrete, no preamble, no dashes of any kind. Reply with JSON only.",
          [{ role: "user", content:
            `He keeps getting the pattern "${pattern}" wrong. ` +
            (data.register === "polite" ? "He learns standard polite Indonesian. " : "He learns casual spoken Indonesian: aku, kamu, gak, udah. ") +
            'Give a two minute lesson. JSON: {"rule":"the rule in two short sentences","pairs":[{"right":"correct Indonesian","wrong":"a plausible wrong version","why":"one line"}],"watch":"the one thing to watch out for, one sentence"} with three pairs.' }]
        );
        const j = parseJSON(t);
        if (gone) return;
        if (!j || !j.rule) throw new Error();
        setText(j);
        const next = JSON.parse(JSON.stringify(data));
        next.lessons = { ...(next.lessons || {}), [pattern]: j };
        persist(next);
      } catch (e) { if (!gone) setFail("The lesson did not come through. Try again."); }
      if (!gone) setBusy(false);
    })();
    return () => { gone = true; };
  }, []);

  return (
    <div>
      <Back to="Catch up" on={back} />
      <h2 className="bh-title serif">{pattern}</h2>
      <Rule />
      <div className="bh-lede">This is the pattern you miss most. Two minutes on the rule, then straight into practice.</div>

      {busy && !text && <div className="bh-blank"><span className="bh-load">writing your lesson</span></div>}
      {fail && <div className="bh-fail">{fail}</div>}

      {text && (
        <div>
          <div className="bh-panel">
            <div className="bh-plabel">The rule</div>
            <div className="bh-note" style={{ fontSize: 15.5, color: "var(--ink)" }}><Note text={text.rule} /></div>
          </div>

          {(text.pairs || []).map((p, i) => (
            <div key={i} className="bh-wcard">
              <div className="bh-wline"><span className="bh-wtag bh-wtagyes">yes</span><span className="bh-sent">{p.right}</span></div>
              <div className="bh-wline" style={{ marginTop: 8 }}>
                <span className="bh-wtag bh-wtagno">no</span>
                <span className="bh-sent" style={{ color: "var(--muted)", textDecoration: "line-through" }}>{p.wrong}</span>
              </div>
              {p.why && <div className="bh-why"><Note text={p.why} /></div>}
            </div>
          ))}

          {text.watch && (
            <div className="bh-judge" style={{ background: "var(--act)", borderColor: "var(--act-line)" }}>
              <div className="bh-verdict"><b style={{ color: "var(--act-ink)" }}>Watch out for</b></div>
              <div className="bh-sent" style={{ fontSize: 17 }}><Note text={text.watch} /></div>
            </div>
          )}

          <button className="bh-go" style={{ width: "100%", marginTop: 10 }} onClick={() => go("sentences")}>
            Practise it now
          </button>
        </div>
      )}
    </div>
  );
}

function Weekly({ data, vocab, weakWords, weakest, go, back }) {
  const items = (weakWords || []).map((w) => {
    const rec = (data.words || {})[w.k] || {};
    const card = vocab.find((c) => canonTokens(c.id).map(canonWord).includes(w.k));
    const shown = card ? (canonTokens(card.id).find((t) => canonWord(t) === w.k) || showWord(w.k, data.register)) : showWord(w.k, data.register);
    return { ...w, shown, card, last: rec.last, from: rec.from || {}, right: rec.c || 0 };
  });

  return (
    <div>
      <Back on={back} />
      <h2 className="bh-title serif">Catch up</h2>
      <Rule />
      <div className="bh-lede">
        {items.length ? `${items.length} words keep slipping. Read them, then test yourself straight after.`
          : "Nothing has piled up yet."}
      </div>

      {weakest && (data.pat || {})[weakest] && ((data.pat[weakest].w || 0) + (data.pat[weakest].c || 0)) >= 6 &&
        (data.pat[weakest].w / Math.max(1, data.pat[weakest].w + data.pat[weakest].c)) > 0.4 && (
        <button className="bh-lessoncard" onClick={() => { go("lesson"); }}>
          <span className="bh-lessontop">
            <span className="bh-lessonico"><Icon name="target" size={22} /></span>
            <span className="bh-lessonlab">Keeps tripping you up</span>
            <span className="bh-lessonpct">{Math.round((data.pat[weakest].w / (data.pat[weakest].w + data.pat[weakest].c)) * 100)}%</span>
          </span>
          <span className="bh-lessonname">{weakest}</span>
          <span className="bh-lessonmeta">Two minutes on the rule beats drilling the same card again.</span>
          <span className="bh-lessongo">Take the lesson <Icon name="right" size={17} /></span>
        </button>
      )}

      {items.length === 0 && (
        <div className="bh-blank">Come back after a few more rounds. Words land here once you have dropped them twice.</div>
      )}

      {items.map((it) => (
        <div key={it.k} className="bh-wcard">
          <div className="bh-whead">
            <span className="bh-wword">{it.shown}</span>
            <span className="bh-wcount">{(it.w || 0) > 0 && `missed ${it.w}\u00d7`}{(it.w || 0) > 0 && (it.o || 0) > 0 && " · "}{(it.o || 0) > 0 && `misplaced ${it.o}\u00d7`}</span>
          </div>
          {it.card && <div className="bh-wmean">{it.card.en}</div>}
          <div className="bh-wkind" data-kind={(it.o || 0) > (it.w || 0) ? "order" : "word"}>
            {(it.o || 0) > (it.w || 0)
              ? "You know this word, it keeps landing in the wrong place"
              : (it.o || 0) > 0 ? "Sometimes missing, sometimes misplaced" : "This one does not come to you yet"}
          </div>

          {it.last && it.last.correct && (
            <div className="bh-wpair">
              {it.last.mine && (
                <div className="bh-wline">
                  <span className="bh-wtag bh-wtagno">you</span>
                  <span className="bh-sent"><Diff parts={diffWords(it.last.mine, it.last.correct).left} tone="mine" /></span>
                </div>
              )}
              <div className="bh-wline">
                <span className="bh-wtag bh-wtagyes">fix</span>
                <span className="bh-sent"><Diff parts={diffWords(it.last.mine || "", it.last.correct).right} tone="fix" /></span>
              </div>
            </div>
          )}

          {it.last && aboutWord(it.last.note, it.k) && (
            <div className="bh-why"><Note text={aboutWord(it.last.note, it.k)} /></div>
          )}

          <div className="bh-chips" style={{ marginTop: 12 }}>
            {Object.keys(it.from).map((k) => (
              <span key={k} className="bh-chip">{it.from[k]}&times; {SRC_LABEL[k] || k}</span>
            ))}
            {it.last && it.last.tag && <span className="bh-chip">pattern: {it.last.tag}</span>}
            {it.right > 0 && <span className="bh-chip">{it.right} right since</span>}
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <button className="bh-go" style={{ width: "100%", marginTop: 10 }} onClick={() => go("catchup")}>
          Test me on these {items.length}
        </button>
      )}
    </div>
  );
}

function Deck({ vocab, deck, saveVocab, data, persist, addCard, back }) {
  const ref = useRef(null);
  const [done, setDone] = useState(null);
  const [fail, setFail] = useState("");
  const [id, setId] = useState("");
  const [en, setEn] = useState("");
  const [busy, setBusy] = useState(false);
  const [said, setSaid] = useState("");
  const [bulk, setBulk] = useState("");
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkOut, setBulkOut] = useState(null);

  const addBulk = async () => {
    if (!bulk.trim()) return;
    setBulkBusy(true); setBulkOut(null);
    try {
      const t = await ask(
        "You turn a learner's raw notebook lines into Indonesian flashcards. Reply with JSON only, no preamble.",
        [{ role: "user", content:
          "Lines from his notebook, one item per line, in any mix of Indonesian, English and German, sometimes with a translation, sometimes without:\n\n" + bulk.trim() +
          "\n\n" + (data.register === "polite" ? "He wants standard polite Indonesian." : "He learns casual spoken Indonesian: aku, kamu, gak, udah.") +
          " For each line produce one card with an Indonesian side and an English side. Fill in whatever is missing, translate German into English, correct spelling mistakes in the Indonesian and mention them in note. Keep ___ blanks and bracketed hints as written. Skip lines that are not vocabulary." +
          " JSON: {\"cards\":[{\"id\":\"Indonesian\",\"en\":\"English\",\"note\":\"short or empty\"}]}" }]
      );
      const j = parseJSON(t);
      const cards = (j && j.cards) || [];
      cards.forEach((c) => { if (c.id && c.en) addCard({ id: c.id, en: c.en, s: c.id.split(/\s+/).length > 2 ? 1 : 0 }); });
      setBulkOut(cards);
      if (cards.length) setBulk("");
    } catch (e) { setBulkOut([]); }
    setBulkBusy(false);
  };

  const add = async () => {
    if (!id.trim() && !en.trim()) return;
    setBusy(true); setSaid("");
    let idText = id.trim(), enText = en.trim(), note = "";
    try {
      const t = await ask(
        "You maintain an Indonesian learner's flashcard deck. Reply with JSON only, no preamble.",
        [{ role: "user", content:
          `New card. Indonesian side: "${idText || "(empty)"}". English side: "${enText || "(empty)"}".\n\n` +
          (data.register === "polite" ? "He wants standard polite Indonesian. " : "He learns casual spoken Indonesian for talking with his Indonesian partner: aku, kamu, gak, udah. ") +
          "Fill in whichever side is empty. If the Indonesian he wrote has a mistake, correct it and say so in one short line. " +
          "Keep any ___ blanks and any hint in brackets exactly as he wrote them. " +
          "JSON: {\"id\":\"Indonesian\",\"en\":\"English\",\"note\":\"one short line, empty string if nothing to say\"}" }]
      );
      const j = parseJSON(t);
      if (j && j.id && j.en) { idText = j.id; enText = j.en; note = j.note || ""; }
    } catch (e) {}
    if (!idText || !enText) { setSaid("Could not complete that one, fill both sides yourself."); setBusy(false); return; }
    addCard({ id: idText, en: enText, s: idText.split(/\s+/).length > 2 ? 1 : 0 });
    setSaid(`Added: ${idText} · ${enText}${note ? ". " + undash(note) : ""}`);
    setId(""); setEn("");
    setBusy(false);
  };

  const handle = (file) => {
    if (!file) return;
    setFail(""); setDone(null);
    const r = new FileReader();
    r.onload = () => {
      const parsed = parseExport(String(r.result || ""));
      if (parsed.length < 5) { setFail("No cards found in there. The export needs two columns, Indonesian and English."); return; }
      const rec = reconcile(parsed, vocab, data);
      const old = new Set(vocab.map((v) => v.id.toLowerCase()));
      const fresh = rec.cards.filter((p) => !old.has(p.id.toLowerCase()));
      saveVocab(rec.cards);
      persist({ ...data, mem: rec.mem, hooks: rec.hooks, alts: rec.alts });
      setDone({ total: rec.cards.length, fresh, fixed: rec.fixed, moved: rec.moved, dropped: rec.dropped });
    };
    r.onerror = () => setFail("That file could not be read.");
    r.readAsText(file, "utf-8");
  };

  return (
    <div>
      <Back on={back} />
      <h2 className="bh-title serif">Your deck</h2>
      <Rule />
      <div className="bh-lede">
        In AnkiDroid: deck menu, Export, Notes in Plain Text. Import as often as you like.
        Nothing is deleted: your scheduling, your word history and your error log all survive, and the typo fixes
        we made are re-applied every time so a fresh export cannot drag the broken cards back in.
      </div>

      <input ref={ref} type="file" accept=".txt,.csv,.tsv,text/plain" style={{ display: "none" }}
        onChange={(e) => handle(e.target.files && e.target.files[0])} />

      <div className="bh-panel">
        <div className="bh-plabel">Add a card yourself</div>
        <div className="bh-note" style={{ marginBottom: 12 }}>
          Fill one side or both, I complete the rest and correct the Indonesian if it needs it.
          Use ___ for a slot you fill in freely, and put a note to yourself in brackets. Neither is ever tested:
          "Asal saya dari ___" with "I am from ___ (country)".
        </div>
        <input className="bh-field" value={id} placeholder="Indonesian" autoCapitalize="none" autoCorrect="off"
          onChange={(e) => setId(e.target.value)} />
        <input className="bh-field" style={{ marginTop: 8 }} value={en} placeholder="English"
          onChange={(e) => setEn(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
        <div className="bh-acts">
          <button className="bh-go" onClick={add} disabled={busy || (!id.trim() && !en.trim())}>{busy ? "adding" : "Add card"}</button>
        </div>
        {said && <div className="bh-why">{said}</div>}
      </div>

      <div className="bh-panel">
        <div className="bh-plabel">Paste a page from your notebook</div>
        <div className="bh-note" style={{ marginBottom: 12 }}>
          One item per line, however you wrote it down. Indonesian only, Indonesian with a translation, or just the German word.
          I sort it into cards, fill in what is missing and fix spelling.
        </div>
        <textarea className="bh-field" style={{ height: 120, fontSize: 15 }} placeholder={"sebelum, before\nmasak\nich bin müde"}
          value={bulk} onChange={(e) => setBulk(e.target.value)} />
        <div className="bh-acts">
          <button className="bh-go" onClick={addBulk} disabled={bulkBusy || !bulk.trim()}>{bulkBusy ? "sorting" : "Make cards"}</button>
        </div>
        {bulkOut && (
          <div className="bh-why">
            {bulkOut.length === 0 ? "Nothing usable in there." : `${bulkOut.length} card${bulkOut.length > 1 ? "s" : ""} added.`}
            {bulkOut.slice(0, 12).map((c, i) => <div key={i} style={{ marginTop: 6 }}><b>{c.id}</b> · {c.en}{c.note ? ` · ${undash(c.note)}` : ""}</div>)}
          </div>
        )}
      </div>

      <div className="bh-stage">
        <div className="bh-ask"><span>Loaded right now</span></div>
        <div className="bh-cue serif">{deck.length} cards</div>
        {(data.mine || []).length > 0 && <div className="bh-gapen">{(data.mine || []).length} of them added here, safe from any import</div>}
      </div>

      <button className="bh-go" style={{ width: "100%" }} onClick={() => ref.current && ref.current.click()}>Choose file</button>
      {fail && <div className="bh-fail">{fail}</div>}

      {done && (
        <div className="bh-judge bh-right" style={{ marginTop: 16 }}>
          <div className="bh-verdict"><b>{done.total} cards in, {done.fresh.length} new</b></div>
          <div className="bh-note" style={{ marginBottom: 10 }}>
            {done.fixed > 0 && `${done.fixed} known typo${done.fixed > 1 ? "s" : ""} corrected again. `}
            {done.moved > 0 && `${done.moved} memor${done.moved > 1 ? "ies" : "y"} carried over to corrected cards. `}
            {done.dropped > 0 && `${done.dropped} card${done.dropped > 1 ? "s are" : " is"} no longer in your deck, their history is kept in case they come back. `}
            Nothing was overwritten.
          </div>
          {done.fresh.slice(0, 8).map((s, i) => <div key={i} style={{ fontSize: 15, padding: "3px 0" }}>{s.id} · {s.en}</div>)}
        </div>
      )}
    </div>
  );
}

// One shared passphrase gates both serverless functions (see getSecret()
// near the API section above), so a stranger who finds the URL cannot spend
// the Anthropic API key or read/write the stored progress. Entered once,
// kept in this browser's localStorage.
function Gate({ onUnlock }) {
  const [input, setInput] = useState("");
  const submit = () => {
    const v = input.trim();
    if (!v) return;
    try { localStorage.setItem("bh_secret", v); } catch (e) {}
    onUnlock(v);
  };
  return (
    <div className="bh-panel" style={{ maxWidth: 340, width: "100%" }}>
      <div className="bh-plabel">Passphrase</div>
      <input
        className="bh-field"
        type="password"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder="enter passphrase"
      />
      <div className="bh-acts" style={{ marginTop: 12 }}>
        <button className="bh-go" onClick={submit} disabled={!input.trim()}>Unlock</button>
      </div>
    </div>
  );
}

function Root() {
  const [secret, setSecret] = useState(() => {
    try { return localStorage.getItem("bh_secret") || ""; } catch (e) { return ""; }
  });
  if (!secret) {
    return (
      <div className="bh" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
        <Gate onUnlock={setSecret} />
      </div>
    );
  }
  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
