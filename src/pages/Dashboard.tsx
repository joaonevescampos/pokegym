import { Calendar } from "@/components/ui/calendar";
import type {
  Dashboard,
  DashboardYear,
  DayOfMonth,
  MonthEntry,
} from "@/context/pokemonTypes";
import { usePokemon } from "@/context/usePokemon";
import { useState, useMemo } from "react";

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

const Dashboard = () => {
  const { state } = usePokemon();

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

  return (
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
        allowed: "bg-green-500 text-white rounded-lg",
        blocked: "bg-red-500 text-white rounded-lg",
      }}
      className="rounded-lg border"
    />
  );
};

export default Dashboard;
