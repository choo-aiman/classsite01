import Link from "next/link";
import { Info, Mail, Sparkles, type LucideIcon } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/* 맨 아래 영역 — 찢어 붙인 종이 콜라주 느낌.
   - 색은 app/globals.css 의 종이 색(paper, terracotta, clay, sage ...)을 따릅니다.
   - 찢긴 가장자리는 아래 SVG 필터(paper-torn)가, 종이 질감은 .paper-texture 클래스가 만듭니다.
   - 글자(저작권·메뉴)는 site.config.ts 에서 가져옵니다. */

const navIcons: Record<string, LucideIcon> = {
  "#about": Info,
  "#features": Sparkles,
  "#contact": Mail,
};

/** 찢긴 가장자리의 종이 한 장. (글자는 이 안에 넣지 않고, 겹쳐서 올립니다) */
function Paper({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("absolute [filter:url(#paper-torn)]", className)}>
      <div className="paper-texture absolute inset-0 mix-blend-multiply" />
    </div>
  );
}

export function Footer() {
  const contact = siteConfig.nav[siteConfig.nav.length - 1];

  return (
    <footer className="relative overflow-hidden bg-cream py-20 text-paper-ink">
      {/* 찢긴 가장자리 필터 정의 (화면에는 보이지 않음) */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <filter id="paper-torn" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 가장자리에 겹쳐 붙인 색종이 조각들 */}
      <Paper className="-left-8 -top-10 h-52 w-60 rounded-[45%_55%_60%_40%/55%_45%_55%_45%] bg-clay" />
      <Paper className="left-0 top-32 hidden h-44 w-20 bg-cocoa sm:block" />
      <Paper className="-right-16 -top-16 h-64 w-80 rounded-[50%_50%_55%_45%/60%_55%_45%_40%] bg-terracotta" />
      <Paper className="-bottom-12 -left-10 h-56 w-64 rounded-[55%_45%_50%_50%/50%_60%_40%_50%] bg-blush" />
      <Paper className="-bottom-16 -right-12 h-60 w-80 rounded-[60%_40%_50%_50%/55%_50%_50%_45%] bg-sage" />

      <Container className="relative">
        {/* 가운데 큰 종이 */}
        <div className="relative mx-auto max-w-4xl">
          <Paper className="inset-0 bg-paper shadow-2xl" />

          <div className="relative px-6 py-12 text-center sm:px-12">
            <p className="font-magazine text-3xl font-bold sm:text-4xl">{siteConfig.name}</p>

            <nav className="mt-10 flex flex-wrap items-start justify-center gap-x-12 gap-y-6">
              {siteConfig.nav.map((item) => {
                const Icon = navIcons[item.href] ?? Info;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
                  >
                    <Icon className="size-8 transition-transform group-hover:-translate-y-1" />
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <p className="mt-10 text-sm text-paper-ink/80">{siteConfig.footer.copyright}</p>
          </div>
        </div>

        {/* 오른쪽 아래에 비스듬히 붙인 작은 메모지 */}
        {contact ? (
          <a
            href={contact.href}
            className="relative ml-auto mt-8 flex w-fit rotate-2 items-center gap-3 px-8 py-4 text-lg font-semibold uppercase tracking-[0.15em] transition-transform hover:rotate-0 sm:-mt-6"
          >
            <Paper className="inset-0 bg-cream shadow-lg" />
            <span className="relative flex items-center gap-3">
              {contact.label}
              <Mail className="size-5" />
            </span>
          </a>
        ) : null}

        {/* 숨은 관리자 버튼 */}
        <Link
          href="/admin"
          aria-label="관리자"
          className="absolute bottom-0 left-4 opacity-30 transition-opacity hover:opacity-100"
        >
          •
        </Link>
      </Container>
    </footer>
  );
}
