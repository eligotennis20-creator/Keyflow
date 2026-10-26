const EVERYDAY = [
  "On Saturday morning we packed a small bag and walked to the lake. The water was calm and the air smelled like pine. We found a quiet spot near the trees, spread out a blanket, and shared sandwiches while the ducks paddled by.",
  "Maya likes to wake up early and make her own breakfast. She toasts two slices of bread, slices a banana, and pours a glass of cold milk. By the time the sun comes up, she is ready to start the day.",
  "A good habit is built one small step at a time. If you practice for ten minutes every day, you will notice real progress after a few weeks. The secret is to keep going, even on the days when you do not feel like it.",
  "The library on Elm Street opens at nine. Inside, the shelves are filled with stories about faraway places, brave explorers, and curious animals. Visitors can sit by the big window and read until the sun goes down.",
  "When it started to rain, everyone ran for the old bus shelter. We laughed, shook out our jackets, and waited. After a few minutes the clouds moved on, and a bright rainbow stretched across the whole sky.",
  "Learning to ride a bike takes patience. At first you wobble and put your feet down. Then one day you push off, the pedals turn, and you realize that you are moving all by yourself.",
  "In the evening the whole family sits down for dinner. We pass the bowls around the table and talk about what happened at school and at work. It is the quietest, warmest part of the day.",
  "The little robot rolled across the floor and stopped at the door. It beeped twice, turned its head, and waited for someone to open it. Outside, the garden was full of flowers, and the robot wanted to see every one.",
  "Good typists do not look at the keys. They keep their eyes on the screen and let their fingers find the right letters. It feels strange at first, but with practice it becomes natural.",
  "Our town has a small market every Sunday. People sell fresh bread, ripe fruit, and handmade candles. The best part is the smell of warm cinnamon rolls drifting down the street."
];

const BIGWORDS = [
  "The telescope allowed the astronomers to observe a remarkable constellation. Their discovery fascinated the entire community, and everyone gathered at the observatory to celebrate.",
  "Yesterday, my neighborhood organized a wonderful tournament at the university. Different teams practiced for weeks, and the atmosphere was absolutely extraordinary.",
  "An experienced engineer must understand how every component works together. Careful observation and patient experimentation lead to important improvements in technology.",
  "The restaurant on the mountain serves delicious vegetable soup and homemade chocolate cake. Travelers often describe the beautiful landscape as unforgettable.",
  "Imagination is the foundation of invention. Scientists in the laboratory test their theories again and again until the results are consistent and reliable.",
  "A good dictionary explains the meaning of unfamiliar words, shows how to pronounce them, and offers examples. Reading regularly improves your vocabulary and strengthens your confidence.",
  "The orchestra rehearsed a complicated symphony for several weeks. On the night of the performance, the audience listened in complete silence before applauding enthusiastically."
];

const PROVERBS = [
  "A journey of a thousand miles begins with a single step.",
  "The early bird catches the worm.",
  "Actions speak louder than words.",
  "Practice makes perfect.",
  "A rolling stone gathers no moss.",
  "Where there is a will, there is a way.",
  "Better late than never.",
  "The pen is mightier than the sword.",
  "All that glitters is not gold.",
  "Slow and steady wins the race.",
  "Fortune favors the bold.",
  "Every cloud has a silver lining.",
  "Do not count your chickens before they hatch.",
  "A picture is worth a thousand words.",
  "Many hands make light work.",
  "There is no place like home.",
  "An apple a day keeps the doctor away.",
  "Two wrongs do not make a right."
];

const NUMBERS = [
  "The train leaves from platform 12 at 7:45 and arrives in the city at 9:20.",
  "A soccer match lasts 90 minutes, plus a few extra minutes for stoppages.",
  "She saved $25 each week for 8 weeks and bought a $200 bicycle with the money.",
  "There are 24 hours in a day, 60 minutes in an hour, and 60 seconds in a minute.",
  "The recipe needs 3 eggs, 250 grams of flour, and 2 cups of milk.",
  "In 2026, the school library added 1,500 new books to its collection.",
  "A marathon is 42.2 kilometers long, and the fastest runners finish in about 2 hours.",
  "Bus number 47 comes every 15 minutes between 6:00 a.m. and 10:00 p.m.",
  "The temperature dropped from 18 degrees to 7 degrees overnight.",
  "Pi is about 3.14, and a circle with a radius of 5 has an area of about 78.5.",
  "The concert starts at 8:00 p.m., and tickets cost $15 each or $50 for a group of 4.",
  "Room 304 is on the third floor, and the class starts at 9:30 sharp."
];

const CODE = [
  "const total = items.reduce((a, b) => a + b, 0);",
  "for (let i = 0; i < list.length; i++) {",
  "if (score >= 10 && !isOver) { play(); }",
  "document.querySelector('#box').textContent = 'Hello';",
  "def greet(name): return f\"Hi, {name}!\"",
  "let user = { id: 7, name: 'Sam', admin: false };",
  "const evens = nums.filter(n => n % 2 === 0);",
  "while (lives > 0) { lives--; }",
  "print(len([x for x in data if x > 3]))",
  "fetch('/api/scores').then(r => r.json());",
  "git commit -m \"add typing test\"",
  "<div class=\"card\"><p>Hi</p></div>"
];

function shuffled (a){
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
}

function fromPassages(list,need){
    const out = [];
    while (out.length < need) shuffled(list).forEach(p => out.push(...p.split(/\s+/)));
    return out;
}

let customText = "";

const CATS = {
    everyday: { name: "Everyday stories", desc: "Short, easy passages.", sample: "The library opens at nine.",
        gen: n => fromPassages(EVERYDAY, n) },
    bigwords: { name: "Big words", desc: "Sentences full of long words.", sample: "A remarkable constellation.",
        gen: n => fromPassages(BIGWORDS, n) },
    proverbs: { name: "Proverbs", desc: "Short sayings, full sentences.", sample: "Practice makes perfect.",
        gen: n => fromPassages(PROVERBS, n) },
    numbers: { name: "Numbers", desc: "Times, prices and facts.", sample: "The train leaves at 7:45.",
        gen: n => fromPassages(NUMBERS, n) },
    code: { name: "Code", desc: "Brackets, arrows and quotes.", sample: "items.filter(n => n > 3);",
        gen: n => fromPassages(CODE, n) },
    custom: { name: "Your own text", desc: "Paste anything and type it.", sample: "Your homework, a song, a story.",
        gen: n => fromPassages([customText], n) }
};
