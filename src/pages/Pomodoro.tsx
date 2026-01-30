import { usePokemon } from "@/context/usePokemon";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TASK_TIMES = [1, 5, 25, 50, 80];
const BREAK_TIMES = [1, 3, 5, 10];
const CYCLES = [1, 3, 5, 8];

type Phase = "task" | "break";

export default function Pomodoro() {
  const [taskTime, setTaskTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [cycles, setCycles] = useState(0);
  const { state } = usePokemon();
  const [phase, setPhase] = useState<Phase>("task");
  const [currentCycle, setCurrentCycle] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  const totalSecondsRef = useRef(0);

  useEffect(() => {
    if (state.userStatus.celebiStatus === false) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (isRunning) return;

    if (taskTime !== 0 && breakTime !== 0 && cycles !== 0) {
      setPhase("task");
      setCurrentCycle(1);
      const total = taskTime * 60;
      totalSecondsRef.current = total;
      setSecondsLeft(total);
    }
  }, [taskTime, breakTime, cycles]);

  const start = () => {
    if (taskTime != 0 && cycles !== 0 && breakTime != 0) {
      setIsRunning(true);
    }
  };

  const togglePause = () => setIsRunning((p) => !p);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || secondsLeft > 0) return;

    if (phase === "task") {
      setPhase("break");
      const total = breakTime * 60;
      totalSecondsRef.current = total;
      setSecondsLeft(total);
    } else {
      if (currentCycle >= cycles) {
        setIsRunning(false);
        setSecondsLeft(0);
        return;
      }

      setCurrentCycle((c) => c + 1);
      setPhase("task");
      const total = taskTime * 60;
      totalSecondsRef.current = total;
      setSecondsLeft(total);
    }
  }, [
    secondsLeft,
    phase,
    currentCycle,
    cycles,
    breakTime,
    taskTime,
    isRunning,
  ]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(sec)}`;
  };

  const progress = secondsLeft / totalSecondsRef.current;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-white">
      <div className="absolute flex items-end gap-2 top-4 left-4 text-white">
        <div
          onClick={() => navigate(-1)}
          className="text-sm  font-bold opacity-70 cursor-pointer"
        >
          Voltar
        </div>
      </div>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/251.png"
        alt="celebi"
        className="w-24 animate-pokemon"
      />
      <h1 className="text-2xl font-bold">Pomodoro</h1>

      {!isRunning && (
        <div className="flex flex-col gap-4 w-72">
          <select
            className="p-2 rounded bg-gray-800"
            onChange={(e) => {
              setTaskTime(+e.target.value);
            }}
          >
            <option value={0}>Tempo da tarefa</option>

            {TASK_TIMES.map((t) => (
              <option key={t} value={t}>
                {t} min
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded bg-gray-800"
            onChange={(e) => setBreakTime(+e.target.value)}
          >
            <option value={0}>Tempo de descanso</option>

            {BREAK_TIMES.map((t) => (
              <option key={t} value={t}>
                {t} min
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded bg-gray-800"
            onChange={(e) => setCycles(+e.target.value)}
          >
            <option value={0}>Número de ciclos</option>
            {CYCLES.map((c) => (
              <option key={c} value={c}>
                {c} ciclos
              </option>
            ))}
          </select>

          <button
            onClick={start}
            className={`p-2 rounded font-bold ${taskTime === 0 || cycles === 0 || breakTime === 0 ? "pointer-events-none! bg-gray-500!" : "bg-green-600 hover:bg-green-700"}`}
          >
            Iniciar
          </button>
        </div>
      )}

      {secondsLeft > 0 && (
        <div className="flex flex-col items-center gap-4">
          <svg width="220" height="220" className="-rotate-90">
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#1f2937"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke={phase === "task" ? "#22c55e" : "#E0D937"}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1s linear",
              }}
            />
          </svg>

          <span className="text-2xl font-mono">{formatTime(secondsLeft)}</span>
          <span className="text-sm opacity-70">
            Ciclo {currentCycle} / {cycles} ·{" "}
            {phase === "task" ? "Foco" : "Descanso"}
          </span>

          <button
            onClick={togglePause}
            className="px-8 py-2 bg-bt-purple text-white rounded-2xl font-bold"
          >
            {isRunning ? "Pausar" : "Continuar"}
          </button>
        </div>
      )}
    </main>
  );
}
