import { useRef, useState, useEffect } from "react"; // Added useEffect for timer logic if needed
import "./Quiz.css";
import { data } from "../../assets/data";
import Timer from "./Timer";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
        return null;
      });
    }
  };

  // Function to reset quiz
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-2xl bg-[#1a1e2e] border border-slate-800 rounded-3xl shadow-2xl p-8 relative">
        {/* Header: Progress & Bright Timer */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">
              Progress
            </p>
            <div className="text-xl font-bold italic tracking-tighter">
              {index + 1}{" "}
              <span className="text-slate-600">/ {data.length}</span>
            </div>
          </div>

          {!result && (
            <div className="flex flex-col items-end">
              <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-1">
                Time Left
              </p>
              <div className="text-2xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
                <Timer lock={lock} next={next} />
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mb-10 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-700 ease-in-out"
            style={{ width: `${((index + 1) / data.length) * 100}%` }}
          ></div>
        </div>

        {result ? (
          <div className="text-center py-10">
            <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">
              Finished!
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Your accuracy: {Math.round((score / data.length) * 100)}%
            </p>
            <div className="text-6xl font-black text-purple-500 mb-10">
              {score} / {data.length}
            </div>
            <button
              onClick={reset}
              className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-purple-400 transition-colors"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-10 leading-tight min-h-[80px]">
              {question.question}
            </h2>

            <div className="grid gap-3">
              {[
                question.option1,
                question.option2,
                question.option3,
                question.option4,
              ].map((opt, i) => (
                <div
                  key={i}
                  ref={option_array[i]}
                  onClick={(e) => checkAns(e, i + 1)}
                  className="group flex items-center p-5 bg-slate-800/30 border-2 border-slate-700/50 rounded-2xl cursor-pointer hover:border-slate-500 transition-all duration-200 quiz-option"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 text-slate-400 font-bold mr-4 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <p className="text-lg text-slate-200 font-medium">{opt}</p>
                </div>
              ))}
            </div>

            <button
              onClick={next}
              disabled={!lock}
              className={`w-full mt-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all duration-300 ${
                lock
                  ? "bg-purple-600 text-white shadow-[0_10px_20px_-10px_rgba(168,85,247,0.5)] hover:-translate-y-1"
                  : "bg-slate-800 text-slate-600 cursor-not-allowed opacity-50"
              }`}
            >
              Next Question
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
