import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, Home, RotateCcw, Sparkles, Star, Trophy } from "lucide-react";
import "./styles.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`, {
      scope: import.meta.env.BASE_URL
    });
  });
}

const levels = [
  {
    id: "fklass",
    title: "F-klass",
    age: "6 år",
    icon: "1",
    focus: "Antal, ordning, former och tal upp till 10.",
    detail: "Mjuk start för barn som börjar upptäcka tal.",
    rounds: 8,
    generators: ["count", "compareSmall", "shape", "addSmall"]
  },
  {
    id: "ak1",
    title: "Åk 1",
    age: "7 år",
    icon: "2",
    focus: "Plus, minus, tiokompisar och talföljder.",
    detail: "Tränar huvudräkning och enkla samband.",
    rounds: 10,
    generators: ["add20", "subtract20", "tenFriends", "pattern"]
  },
  {
    id: "ak2",
    title: "Åk 2",
    age: "8 år",
    icon: "3",
    focus: "Tiotal, ental, dubbelt, hälften och textproblem.",
    detail: "Bygger taluppfattning och vardagsproblem.",
    rounds: 10,
    generators: ["placeValue", "doubleHalf", "wordProblem", "add100"]
  },
  {
    id: "ak3",
    title: "Åk 3",
    age: "9-10 år",
    icon: "4",
    focus: "Multiplikation, division, mattestrategier och rimlighet.",
    detail: "Förbereder fler steg och snabbare strategier.",
    rounds: 12,
    generators: ["multiply", "divide", "missingNumber", "wordProblemHard"]
  }
];

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
  return shuffle([...values]).map(String);
}

function optionQuestion(kind, text, answer, min = 0, max = 100, visualCount = 0) {
  return {
    kind,
    text,
    answer: String(answer),
    options: uniqueOptions(answer, min, max),
    visualCount
  };
}

const shapes = [
  { name: "triangel", corners: 3 },
  { name: "kvadrat", corners: 4 },
  { name: "rektangel", corners: 4 },
  { name: "femhörning", corners: 5 }
];

const generators = {
  count: () => {
    const answer = rand(3, 10);
    return optionQuestion("Antal", "Hur många prickar ser du?", answer, 1, 12, answer);
  },
  compareSmall: () => {
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
  shape: () => {
    const shape = shapes[rand(0, shapes.length - 1)];
    return optionQuestion("Geometri", `Hur många hörn har en ${shape.name}?`, shape.corners, 0, 6);
  },
  addSmall: () => {
    const a = rand(1, 5);
    const b = rand(1, 5);
    return optionQuestion("Plus", `${a} + ${b} = ?`, a + b, 1, 12, a + b);
  },
  add20: () => {
    const a = rand(3, 12);
    const b = rand(2, 8);
    return optionQuestion("Plus", `${a} + ${b} = ?`, a + b, 0, 20);
  },
  subtract20: () => {
    const a = rand(8, 20);
    const b = rand(1, Math.min(9, a));
    return optionQuestion("Minus", `${a} - ${b} = ?`, a - b, 0, 20);
  },
  tenFriends: () => {
    const a = rand(1, 9);
    return optionQuestion("Tiokompisar", `${a} + ? = 10`, 10 - a, 0, 10);
  },
  pattern: () => {
    const start = rand(1, 6);
    const step = rand(2, 5);
    return optionQuestion("Talföljd", `${start}, ${start + step}, ${start + step * 2}, ?`, start + step * 3, 0, 30);
  },
  placeValue: () => {
    const tens = rand(2, 9);
    const ones = rand(0, 9);
    return optionQuestion("Tiotal och ental", `${tens} tiotal och ${ones} ental är`, tens * 10 + ones, 10, 99);
  },
  doubleHalf: () => {
    if (Math.random() > 0.5) {
      const a = rand(3, 20);
      return optionQuestion("Dubbelt", `Dubbelt av ${a} är`, a * 2, 0, 50);
    }
    const half = rand(2, 15);
    return optionQuestion("Hälften", `Hälften av ${half * 2} är`, half, 0, 30);
  },
  wordProblem: () => {
    const a = rand(8, 24);
    const b = rand(3, 12);
    return optionQuestion("Problem", `Ariel har ${a} pärlor och Belle får ${b} till. Hur många pärlor har de tillsammans?`, a + b, 0, 50);
  },
  add100: () => {
    const a = rand(15, 70);
    const b = rand(10, 29);
    return optionQuestion("Plus till 100", `${a} + ${b} = ?`, a + b, 0, 100);
  },
  multiply: () => {
    const a = rand(2, 10);
    const b = rand(2, 5);
    return optionQuestion("Gånger", `${a} × ${b} = ?`, a * b, 0, 60);
  },
  divide: () => {
    const b = rand(2, 5);
    const answer = rand(2, 10);
    return optionQuestion("Delat", `${answer * b} ÷ ${b} = ?`, answer, 0, 20);
  },
  missingNumber: () => {
    const answer = rand(4, 18);
    const total = answer + rand(5, 20);
    return optionQuestion("Likhet", `? + ${total - answer} = ${total}`, answer, 0, 30);
  },
  wordProblemHard: () => {
    const boxes = rand(3, 6);
    const each = rand(2, 8);
    return optionQuestion("Problem", `${boxes} askar har ${each} pennor var. Hur många pennor är det?`, boxes * each, 0, 60);
  }
};

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem("aribel-matematik-react-progress")) || {};
  } catch {
    return {};
  }
}

function setProgress(levelId, stars) {
  const next = getProgress();
  next[levelId] = Math.max(next[levelId] || 0, stars);
  localStorage.setItem("aribel-matematik-react-progress", JSON.stringify(next));
}

function buildQuestions(level) {
  return shuffle(Array.from({ length: level.rounds }, (_, index) => {
    const key = level.generators[index % level.generators.length];
    return generators[key]();
  }));
}

function App() {
  const [screen, setScreen] = useState("home");
  const [progressVersion, setProgressVersion] = useState(0);
  const [level, setLevel] = useState(levels[0]);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answerState, setAnswerState] = useState(null);

  const progress = useMemo(() => getProgress(), [progressVersion]);
  const question = questions[index];

  function startLevel(nextLevel) {
    setLevel(nextLevel);
    setQuestions(buildQuestions(nextLevel));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswerState(null);
    setScreen("game");
  }

  function resetProgress() {
    localStorage.removeItem("aribel-matematik-react-progress");
    setProgressVersion((value) => value + 1);
  }

  function chooseAnswer(option) {
    if (selected || !question) return;
    const correct = option === question.answer;
    setSelected(option);
    setAnswerState(correct ? "correct" : "wrong");
    if (correct) setScore((value) => value + 1);

    window.setTimeout(() => {
      if (index + 1 >= questions.length) {
        const finalScore = score + (correct ? 1 : 0);
        const percent = finalScore / questions.length;
        const earned = percent >= 0.9 ? 3 : percent >= 0.65 ? 2 : percent >= 0.35 ? 1 : 0;
        setProgress(level.id, earned);
        setProgressVersion((value) => value + 1);
        setScreen("result");
      } else {
        setIndex((value) => value + 1);
        setSelected(null);
        setAnswerState(null);
      }
    }, 1050);
  }

  const finalScore = score;
  const finalStars = questions.length
    ? finalScore / questions.length >= 0.9
      ? 3
      : finalScore / questions.length >= 0.65
        ? 2
        : finalScore / questions.length >= 0.35
          ? 1
          : 0
    : 0;

  return (
    <main className="app-shell">
      {screen === "home" && (
        <section className="hero-panel">
          <div className="hero-copy">
            <div className="brand-row">
              <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" className="logo" />
              <div>
                <p className="eyebrow">Svensk matte för F-klass till åk 3</p>
                <h1>AriBel-Matematik</h1>
              </div>
            </div>
            <div className="home-actions">
              <button className="primary-action" onClick={() => setScreen("levels")}>
                <Sparkles size={24} /> Starta
              </button>
              <button className="secondary-action" onClick={resetProgress}>
                <RotateCcw size={22} /> Nollställ
              </button>
            </div>
          </div>
          <div className="mascot-stage" aria-hidden="true">
            <img src={`${import.meta.env.BASE_URL}mascot.svg`} alt="" className="mascot" />
            <span className="number-bubble bubble-a">7</span>
            <span className="number-bubble bubble-b">+3</span>
            <span className="number-bubble bubble-c">10</span>
          </div>
        </section>
      )}

      {screen === "levels" && (
        <section className="level-panel">
          <header className="topbar">
            <button className="icon-button" onClick={() => setScreen("home")} aria-label="Till startsidan">
              <Home size={26} />
            </button>
            <div>
              <p className="eyebrow">Välj bana</p>
              <h2>Nivåer</h2>
            </div>
          </header>
          <div className="level-grid">
            {levels.map((item) => (
              <button className="level-card" key={item.id} onClick={() => startLevel(item)}>
                <span className="level-icon">{item.icon}</span>
                <strong>{item.title}</strong>
                <span>{item.age}</span>
                <p>{item.focus}</p>
                <small>{item.detail}</small>
                <div className="level-stars">
                  {Array.from({ length: 3 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={22}
                      fill={starIndex < (progress[item.id] || 0) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {screen === "game" && question && (
        <section className="game-panel">
          <header className="game-header">
            <button className="icon-button" onClick={() => setScreen("levels")} aria-label="Tillbaka">
              <ArrowLeft size={28} />
            </button>
            <div>
              <p className="eyebrow">{level.title} · {level.age}</p>
              <h2>{level.focus}</h2>
            </div>
            <div className="score-pill">{score}/{questions.length}</div>
          </header>

          <div className="progress-track" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${(index / questions.length) * 100}%` }} />
          </div>

          <article className="question-card">
            <div className="question-kind">{question.kind}</div>
            <div className="question-text">{question.text}</div>
            <div className="visual-row" aria-hidden="true">
              {Array.from({ length: question.visualCount || 0 }, (_, dotIndex) => (
                <span className="counter-dot" key={dotIndex} />
              ))}
            </div>
            <div className="answer-grid">
              {question.options.map((option) => {
                const className = selected === option
                  ? `answer-button ${answerState}`
                  : selected && option === question.answer
                    ? "answer-button correct"
                    : "answer-button";
                return (
                  <button className={className} key={option} onClick={() => chooseAnswer(option)}>
                    {option}
                  </button>
                );
              })}
            </div>
          </article>
          <div className="feedback" role="status">
            {selected ? (answerState === "correct" ? "Rätt! Snyggt tänkt." : `Nära! Rätt svar är ${question.answer}.`) : ""}
          </div>
        </section>
      )}

      {screen === "result" && (
        <section className="result-panel">
          <img src={`${import.meta.env.BASE_URL}mascot.svg`} alt="" className="result-mascot" />
          <p className="eyebrow">Klar bana</p>
          <h2>{score} av {questions.length} rätt</h2>
          <div className="stars">
            {Array.from({ length: 3 }, (_, starIndex) => (
              <Star key={starIndex} fill={starIndex < finalStars ? "currentColor" : "none"} />
            ))}
          </div>
          <p>{finalStars === 3 ? "Du klarade banan riktigt starkt. Testa nästa nivå när du vill." : "Spela banan igen och samla fler stjärnor."}</p>
          <div className="home-actions">
            <button className="primary-action" onClick={() => startLevel(level)}>
              <Trophy size={24} /> Spela igen
            </button>
            <button className="secondary-action" onClick={() => setScreen("levels")}>
              <ArrowLeft size={22} /> Välj nivå
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
