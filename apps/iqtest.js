const questions = [
  {
    question: "🐣, 🐥, 🐔, ...",
    options: ["🐦", "🥚", "🐓", "🦆"],
    correctAnswer: 2
  },
  {
    question: "Hangisi diğerlerinden farklıdır? 🤔",
    options: ["🍎", "🍌", "🍊", "🥕"],
    correctAnswer: 3
  },
  {
    question: "2️⃣, 4️⃣, 8️⃣, 1️⃣6️⃣, ...",
    options: ["3️⃣0️⃣", "2️⃣4️⃣", "3️⃣2️⃣", "2️⃣0️⃣"],
    correctAnswer: 2
  },
  {
    question: "🦁 : 🌳 Orman → 🐠 : ?",
    options: ["🌤️ Gökyüzü", "🌊 Deniz", "🏜️ Çöl", "⛰️ Dağ"],
    correctAnswer: 1
  },
  {
    question: "3 🐱, 3 🐭'ı 3️⃣ dakikada yakalarsa, 9 🐱, 9 🐭'ı kaç dakikada yakalar?",
    options: ["3️⃣", "6️⃣", "9️⃣", "1️⃣2️⃣"],
    correctAnswer: 0
  },
  {
    question: "2️⃣, 6️⃣, 1️⃣8️⃣, 5️⃣4️⃣, ...",
    options: ["1️⃣0️⃣8️⃣", "1️⃣6️⃣2️⃣", "2️⃣1️⃣6️⃣", "8️⃣1️⃣"],
    correctAnswer: 1
  },
  {
    question: "Hangisi diğerlerinden farklıdır? 🤔",
    options: ["🪑", "🛋️", "🚪", "☁️"],
    correctAnswer: 3
  },
  {
    question: "5️⃣, 🔟, 1️⃣5️⃣, 2️⃣0️⃣, ...",
    options: ["2️⃣5️⃣", "3️⃣0️⃣", "3️⃣5️⃣", "4️⃣0️⃣"],
    correctAnswer: 0
  },
  {
    question: "3 🐈, 3 🐁'yi 3️⃣ dakikada yakalarsa, 3 🐈, 9 🐁'yi kaç dakikada yakalar?",
    options: ["3️⃣ dakika", "6️⃣ dakika", "9️⃣ dakika", "1️⃣2️⃣ dakika"],
    correctAnswer: 2
  },
  {
    question: "Hangi harf grubu 5️⃣ harfli bir kelime oluşturabilir? 🔤",
    options: ["B I K L A", "Z A G T M", "Ş Ç Ö Ü Ğ", "A E L P U"],
    correctAnswer: 0
  },
  {
    question: "3️⃣, 9️⃣, 2️⃣7️⃣, 8️⃣1️⃣, ...",
    options: ["2️⃣4️⃣3️⃣", "8️⃣1️⃣", "1️⃣2️⃣0️⃣", "9️⃣0️⃣"],
    correctAnswer: 0
  },
  {
    question: "Hangisi diğerlerinden farklıdır? 🤔",
    options: ["🍉", "🍈", "🍓", "🚚"],
    correctAnswer: 3
  },
  {
    question: "1️⃣, 4️⃣, 9️⃣, 1️⃣6️⃣, ...",
    options: ["2️⃣5️⃣", "2️⃣0️⃣", "2️⃣4️⃣", "3️⃣0️⃣"],
    correctAnswer: 0
  },
  {
    question: "Bir kutuda 3️⃣ tane 🔴, 2️⃣ tane 🔵 ve 5️⃣ tane 🟢 var. Rastgele çekilen bir topun mavi olmama olasılığı nedir?",
    options: ["8️⃣/🔟", "3️⃣/🔟", "5️⃣/🔟", "7️⃣/🔟"],
    correctAnswer: 0
  },
  {
    question: "2️⃣, 2️⃣, 4️⃣, 6️⃣, 1️⃣0️⃣, ...",
    options: ["1️⃣4️⃣", "1️⃣6️⃣", "1️⃣8️⃣", "2️⃣0️⃣"],
    correctAnswer: 1
  },
  {
    question: "👀 : Görmek → 👂 : ?",
    options: ["Duymak", "Koklamak", "Tatmak", "Dokunmak"],
    correctAnswer: 0
  },
  {
    question: "5️⃣👷‍♂️ bir duvarı 🔟 günde örüyorsa, 2️⃣👷‍♂️ aynı duvarı kaç günde örer?",
    options: ["2️⃣5️⃣", "2️⃣0️⃣", "1️⃣5️⃣", "3️⃣0️⃣"],
    correctAnswer: 0
  },
  {
    question: "1️⃣, 3️⃣, 7️⃣, 1️⃣5️⃣, 3️⃣1️⃣, ...",
    options: ["4️⃣7️⃣", "5️⃣5️⃣", "6️⃣3️⃣", "6️⃣1️⃣"],
    correctAnswer: 2
  },
  {
    question: "4️⃣ adet 🐔 4️⃣ günde 4️⃣ 🥚 yaparsa, 8️⃣ adet 🐔 8️⃣ 🥚 kaç günde yapar?",
    options: ["4️⃣", "6️⃣", "8️⃣", "2️⃣"],
    correctAnswer: 0
  },
  {
    question: "Hangisi diğerlerinden farklıdır? 🤔",
    options: ["⬛", "🔺", "⚪", "⌚"],
    correctAnswer: 3
  },
  {
    question: "2️⃣, 5️⃣, 🔟, 1️⃣7️⃣, ...",
    options: ["2️⃣6️⃣", "2️⃣8️⃣", "3️⃣0️⃣", "2️⃣4️⃣"],
    correctAnswer: 0
  }
];

export { questions };
