const levels = [
  {
    id: "fklass",
    title: "F-klass",
    label: "6 år",
    icon: "1",
    focus: "Antal, ordning, former och tal upp till 10.",
    rounds: 8,
    generators: ["count", "compareSmall", "shape", "addSmall"]
  },
  {
    id: "ak1",
    title: "Åk 1",
    label: "7 år",
    icon: "2",
    focus: "Plus, minus, tiokompisar och talföljder.",
    rounds: 10,
    generators: ["add20", "subtract20", "tenFriends", "pattern"]
  },
  {
    id: "ak2",
    title: "Åk 2",
    label: "8 år",
    icon: "3",
    focus: "Tiotal, ental, dubbelt, hälften och textproblem.",
    rounds: 10,
    generators: ["placeValue", "doubleHalf", "wordProblem", "add100"]
  },
  {
    id: "ak3",
    title: "Åk 3",
    label: "9-10 år",
    icon: "4",
    focus: "Multiplikation, division, mattestrategier och rimlighet.",
    rounds: 12,
    generators: ["multiply", "divide", "missingNumber", "wordProblemHard"]
  }
];

const facts = {
  shapes: [
    { name: "cirkel", sides: 0 },
    { name: "triangel", sides: 3 },
    { name: "kvadrat", sides: 4 },
    { name: "rektangel", sides: 4 },
    { name: "femhörning", sides: 5 }
  ]
};

let currentLevel = levels[0];
let questions = [];
let currentIndex = 0;
let score = 0;
let locked = false;

const screens = {
  home: document.querySelector('[data-screen="home"]'),
  levels: document.querySelector('[data-screen="levels"]'),
  game: document.querySelector('[data-screen="game"]'),
  result: document.querySelector('[data-screen="result"]')
};

const levelGrid = document.querySelector("#levelGrid");
const activityTitle = document.querySelector("#activityTitle");
const levelLabel = document.querySelector("#levelLabel");
const scorePill = document.querySelector("#scorePill");
const progressFill = document.querySelector("#progressFill");
const questionKind = document.querySelector("#questionKind");
const questionText = document.querySelector("#questionText");
const visualRow = document.querySelector("#visualRow");
const answerGrid = document.querySelector("#answerGrid");
const feedback = document.querySelector("#feedback");
const resultTitle = document.querySelector("#resultTitle");
const resultCopy = document.querySelector("#resultCopy");
const stars = document.querySelector("#stars");

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function uniqueOptions(answer, min, max) {
  const values = new Set([answer]);
  while (values.size < 4) {
    values.add(Math.max(min, Math.min(max, answer + rand(-8, 8))));
  }
  return shuffle([...values]);
}

function optionQuestion(kind, text, answer, min = 0, max = 100, visualCount = 0) {
  return {
    kind,
    text,
    answer: String(answer),
    options: uniqueOptions(answer, min, max).map(String),
    visualCount
  };
}

const generators = {
  count() {
    const answer = rand(3, 10);
    return optionQuestion("Antal", "Hur många prickar ser du?", answer, 1, 12, answer);
  },
  compareSmall() {
    const a = rand(1, 10);
    let b = rand(1, 10);
    if (a === b) b = b === 10 ? 9 : b + 1;
    return {
      kind: "Storleksordning",
      text: `Vilket tal är störst: ${a} eller ${b}?`,
      answer: String(Math.max(a, b)),
      options: shuffle([a, b].map(String))
    };
  },
  shape() {
    const shape = facts.shapes[rand(1, facts.shapes.length - 1)];
    return optionQuestion("Geometri", `Hur många hörn har en ${shape.name}?`, shape.sides, 0, 6);
  },
  addSmall() {
    const a = rand(1, 5);
    const b = rand(1, 5);
    return optionQuestion("Plus", `${a} + ${b} = ?`, a + b, 1, 12, a + b);
  },
  add20() {
    const a = rand(3, 12);
    const b = rand(2, 8);
    return optionQuestion("Plus", `${a} + ${b} = ?`, a + b, 0, 20);
  },
  subtract20() {
    const a = rand(8, 20);
    const b = rand(1, Math.min(9, a));
    return optionQuestion("Minus", `${a} - ${b} = ?`, a - b, 0, 20);
  },
  tenFriends() {
    const a = rand(1, 9);
    return optionQuestion("Tiokompisar", `${a} + ? = 10`, 10 - a, 0, 10);
  },
  pattern() {
    const start = rand(1, 6);
    const step = rand(2, 5);
    return optionQuestion("Talföljd", `${start}, ${start + step}, ${start + step * 2}, ?`, start + step * 3, 0, 30);
  },
  placeValue() {
    const tens = rand(2, 9);
    const ones = rand(0, 9);
    return optionQuestion("Tiotal och ental", `${tens} tiotal och ${ones} ental är`, tens * 10 + ones, 10, 99);
  },
  doubleHalf() {
    if (Math.random() > 0.5) {
      const a = rand(3, 20);
      return optionQuestion("Dubbelt", `Dubbelt av ${a} är`, a * 2, 0, 50);
    }
    const half = rand(2, 15);
    return optionQuestion("Hälften", `Hälften av ${half * 2} är`, half, 0, 30);
  },
  wordProblem() {
    const a = rand(8, 24);
    const b = rand(3, 12);
    return optionQuestion("Problem", `Ariel har ${a} pärlor och Belle får ${b} till. Hur många pärlor har de tillsammans?`, a + b, 0, 50);
  },
  add100() {
    const a = rand(15, 70);
    const b = rand(10, 29);
    return optionQuestion("Plus till 100", `${a} + ${b} = ?`, a + b, 0, 100);
  },
  multiply() {
    const a = rand(2, 10);
    const b = rand(2, 5);
    return optionQuestion("Gånger", `${a} × ${b} = ?`, a * b, 0, 60);
  },
  divide() {
    const b = rand(2, 5);
    const answer = rand(2, 10);
    return optionQuestion("Delat", `${answer * b} ÷ ${b} = ?`, answer, 0, 20);
  },
  missingNumber() {
    const answer = rand(4, 18);
    const total = answer + rand(5, 20);
    return optionQuestion("Likhet", `? + ${total - answer} = ${total}`, answer, 0, 30);
  },
  wordProblemHard() {
    const boxes = rand(3, 6);
    const each = rand(2, 8);
    return optionQuestion("Problem", `${boxes} askar har ${each} pennor var. Hur många pennor är det?`, boxes * each, 0, 60);
  }
};

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem("aribel-matematik-progress")) || {};
  } catch {
    return {};
  }
}

function saveProgress(levelId, starsCount) {
  const progress = getProgress();
  progress[levelId] = Math.max(progress[levelId] || 0, starsCount);
  localStorage.setItem("aribel-matematik-progress", JSON.stringify(progress));
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

function renderLevels() {
  const progress = getProgress();
  levelGrid.innerHTML = "";
  levels.forEach((level) => {
    const button = document.createElement("button");
    button.className = "level-card";
    button.innerHTML = `
      <span class="level-icon">${level.icon}</span>
      <strong>${level.title}</strong>
      <p class="level-meta">${level.label}</p>
      <p class="level-meta">${level.focus}</p>
      <div class="level-stars">${"★".repeat(progress[level.id] || 0)}${"☆".repeat(3 - (progress[level.id] || 0))}</div>
    `;
    button.addEventListener("click", () => startLevel(level));
    levelGrid.appendChild(button);
  });
}

function buildQuestions(level) {
  return Array.from({ length: level.rounds }, (_, index) => {
    const key = level.generators[index % level.generators.length];
    return generators[key]();
  });
}

function startLevel(level) {
  currentLevel = level;
  questions = shuffle(buildQuestions(level));
  currentIndex = 0;
  score = 0;
  locked = false;
  levelLabel.textContent = `${level.title} · ${level.label}`;
  activityTitle.textContent = level.focus;
  showScreen("game");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentIndex];
  locked = false;
  feedback.textContent = "";
  questionKind.textContent = question.kind;
  questionText.textContent = question.text;
  scorePill.textContent = `${score}/${questions.length}`;
  progressFill.style.width = `${(currentIndex / questions.length) * 100}%`;
  visualRow.innerHTML = "";
  answerGrid.innerHTML = "";

  for (let index = 0; index < (question.visualCount || 0); index += 1) {
    const dot = document.createElement("span");
    dot.className = "counter-dot";
    visualRow.appendChild(dot);
  }

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuestion(option, button));
    answerGrid.appendChild(button);
  });
}

function answerQuestion(option, button) {
  if (locked) return;
  locked = true;
  const question = questions[currentIndex];
  const correct = option === question.answer;
  if (correct) {
    score += 1;
    button.classList.add("correct");
    feedback.textContent = "Rätt! Snyggt tänkt.";
  } else {
    button.classList.add("wrong");
    feedback.textContent = `Nära! Rätt svar är ${question.answer}.`;
    [...answerGrid.children].forEach((child) => {
      if (child.textContent === question.answer) child.classList.add("correct");
    });
  }

  window.setTimeout(() => {
    currentIndex += 1;
    if (currentIndex >= questions.length) finishLevel();
    else renderQuestion();
  }, 1050);
}

function finishLevel() {
  const percent = score / questions.length;
  const starCount = percent >= 0.9 ? 3 : percent >= 0.65 ? 2 : percent >= 0.35 ? 1 : 0;
  saveProgress(currentLevel.id, starCount);
  progressFill.style.width = "100%";
  stars.textContent = "★".repeat(starCount) + "☆".repeat(3 - starCount);
  resultTitle.textContent = `${score} av ${questions.length} rätt`;
  resultCopy.textContent = starCount === 3
    ? "Du klarade banan riktigt starkt. Testa nästa nivå när du vill."
    : "Spela banan igen och samla fler stjärnor.";
  showScreen("result");
}

document.querySelector("#startButton").addEventListener("click", () => {
  renderLevels();
  showScreen("levels");
});

document.querySelector("#resetButton").addEventListener("click", () => {
  localStorage.removeItem("aribel-matematik-progress");
  renderLevels();
});

document.querySelectorAll("[data-go-home]").forEach((button) => {
  button.addEventListener("click", () => showScreen("home"));
});

document.querySelector("#backToLevels").addEventListener("click", () => {
  renderLevels();
  showScreen("levels");
});

document.querySelector("#playAgainButton").addEventListener("click", () => startLevel(currentLevel));
document.querySelector("#chooseLevelButton").addEventListener("click", () => {
  renderLevels();
  showScreen("levels");
});

renderLevels();
