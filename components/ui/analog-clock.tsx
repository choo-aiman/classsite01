"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** 시·분·초를 읽습니다. timeZone 을 주면 그 도시의 시간(예: "Asia/Tokyo"), 안 주면 내 컴퓨터 시간. */
function readTime(date: Date, timeZone?: string): [number, number, number] {
  if (!timeZone) return [date.getHours(), date.getMinutes(), date.getSeconds()];
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return [get("hour"), get("minute"), get("second")];
}

/** 아날로그 시계. 기본은 방문자 컴퓨터의 현재 시간, timeZone 을 주면 그 도시의 시간을 1초마다 보여줍니다.
    (처음 그려질 때는 시계바늘이 12시를 가리키다가, 곧 현재 시간으로 움직입니다) */
export function AnalogClock({ className, timeZone }: { className?: string; timeZone?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);

  const [h, m, s] = now ? readTime(now, timeZone) : [0, 0, 0];

  const hourAngle = (h % 12) * 30 + m * 0.5;
  const minuteAngle = m * 6 + s * 0.1;
  const secondAngle = s * 6;

  return (
    <div
      role="img"
      aria-label="아날로그 시계"
      className={cn(
        "rounded-full border border-foreground/30 bg-background/40 p-2 shadow-2xl backdrop-blur-md",
        className
      )}
    >
      <svg viewBox="0 0 200 200" className="size-full">
        {/* 눈금 12개 (3·6·9·12시는 더 굵게) */}
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="100"
            y1={i % 3 === 0 ? 14 : 18}
            x2="100"
            y2="26"
            transform={`rotate(${i * 30} 100 100)`}
            className="stroke-foreground"
            strokeWidth={i % 3 === 0 ? 3 : 1.5}
            strokeLinecap="round"
          />
        ))}

        {/* 시침 / 분침 / 초침 */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="58"
          transform={`rotate(${hourAngle} 100 100)`}
          className="stroke-foreground"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="38"
          transform={`rotate(${minuteAngle} 100 100)`}
          className="stroke-foreground"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="114"
          x2="100"
          y2="32"
          transform={`rotate(${secondAngle} 100 100)`}
          className="stroke-brand"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="5" className="fill-brand" />
      </svg>
    </div>
  );
}
