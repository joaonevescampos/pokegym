import Button from "@/components/Button";
import { Calendar } from "@/components/ui/calendar";
import type {
  Dashboard,
  DashboardYear,
  DayOfMonth,
  MonthEntry,
} from "@/context/pokemonTypes";
import { usePokemon } from "@/context/usePokemon";
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/menu-folders/dashboard.png";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function generateTrainedDates(dashboard: Dashboard): Date[] {
  const dates: Date[] = [];

  dashboard.forEach((yearEntry: DashboardYear) => {
    const year = yearEntry.year;

    yearEntry.months.forEach((monthEntry: MonthEntry) => {
      Object.entries(monthEntry).forEach(([month, days]) => {
        if (!days) return;

        days.forEach((day: DayOfMonth) => {
          dates.push(new Date(year, Number(month), day));
        });
      });
    });
  });

  return dates;
}

function getFirstGreenDate(dates: Date[]): Date | null {
  if (!dates.length) return null;
  return new Date(Math.min(...dates.map((d) => d.getTime())));
}

function generateBlockedDates(
  firstGreenDate: Date | null,
  highlightedDates: Date[],
): Date[] {
  if (!firstGreenDate) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const blocked: Date[] = [];
  const cursor = new Date(firstGreenDate);

  while (cursor < today) {
    const isGreen = highlightedDates.some((h) => isSameDay(h, cursor));

    if (!isGreen) {
      blocked.push(new Date(cursor));
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return blocked;
}

const DashboardPage = () => {
  const { state } = usePokemon();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const dashboardData = state.userStatus.dashboard;

  const highlightedDates = useMemo(
    () => generateTrainedDates(dashboardData),
    [dashboardData],
  );

  const firstGreenDate = useMemo(
    () => getFirstGreenDate(highlightedDates),
    [highlightedDates],
  );

  const blockedDates = useMemo(
    () => generateBlockedDates(firstGreenDate, highlightedDates),
    [firstGreenDate, highlightedDates],
  );

  const today = new Date();

  const safeHighlightedDates = useMemo(
    () => highlightedDates.filter((d) => !isSameDay(d, today)),
    [highlightedDates],
  );

  const date = new Date();

  const currYear = date.getFullYear();

  function countDaysInYear(dashboard: Dashboard, year: number): number {
    const yearEntry = dashboard.find((y) => y.year === year);

    if (!yearEntry) return 0;

    let totalDays = 0;

    for (const monthEntry of yearEntry.months) {
      for (const days of Object.values(monthEntry)) {
        totalDays += days.length;
      }
    }

    return totalDays;
  }

  const [daysTrained, setDaysTrained] = useState(0);

  useEffect(() => {
    setDaysTrained(countDaysInYear(state.userStatus.dashboard, currYear));
  }, []);

  const progressWidth = Math.ceil(daysTrained / 365);

  return (
    <>
      <img
        src={backgroundImage}
        alt="home"
        className="absolute left-0 w-full object-cover h-full opacity-10 z-0"
      />
      <div className="absolute flex items-end gap-2 top-4 left-4 text-white">
        <Link to="/home" className="text-sm  font-bold opacity-70">
          HOME
        </Link>
      </div>

      <main className="relative flex flex-col gap-4 items-center justify-center max-w-100 w-full h-screen m-auto px-4 z-10">
        <h1 className="font-bold text-xl text-white">Progresso</h1>
        <p className="opacity-70 text-sm text-white">
          Veja seu progresso ao longo dos meses
        </p>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          month={month}
          onMonthChange={setMonth}
          modifiers={{
            allowed: safeHighlightedDates,
            blocked: blockedDates,
          }}
          modifiersClassNames={{
            allowed: "bg-green-400 text-white rounded-lg",
            blocked: "bg-red-400 text-white rounded-lg",
          }}
          className="rounded-lg border w-full"
        />
        <div className="w-full">
          <h2 className="text-white font-bold pb-4">Progresso de {currYear}</h2>
          <div className="flex justify-between pb-2 text-white text-xs font-bold ">
            <span className="text-green-400">{daysTrained}</span>
            <span className="opacity-70">365</span>
          </div>
          <div className="relative h-8 w-full bg-red-400 rounded">
            <div
              className={`absolute top-0 left-0 bg-green-400 h-8 rounded`}
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-start w-full text-white">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span className="text-sm opacity-70 font-medium">
              Treino concluído: {daysTrained}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span className="text-sm opacity-70 font-medium">
              Treino não concluido: {365 - daysTrained}
            </span>
          </div>
        </div>
        <Button
          text="voltar"
          onClick={() => navigate(-1)}
          style="text-white! bg-bt-purple!"
        />
      </main>
    </>
  );
};

export default DashboardPage;
