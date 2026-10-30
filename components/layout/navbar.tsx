"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** 상단 메뉴. 메뉴 항목은 site.config.ts 의 nav 에서 바꿉니다. 모바일에서는 햄버거 버튼으로 열림. */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand bg-brand">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight text-background">
          {/* 글자마다 시간차를 두고 춤추듯 움직임 (animation 은 globals.css 의 dance) */}
          {[...siteConfig.name].map((ch, i) => (
            <span key={i} className="dance-letter" style={{ animationDelay: `${i * 0.15}s` }}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-background/80 transition-colors hover:text-background"
            >
              {item.label}
            </a>
          ))}
          <Button asChild size="sm" className="bg-background text-foreground hover:bg-background/90">
            <a href={siteConfig.secretButton.href} target="_blank" rel="noopener noreferrer">
              {siteConfig.secretButton.label}
            </a>
          </Button>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-background md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* 모바일 메뉴 펼침 */}
      <nav className={cn("border-t border-background/20 md:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col py-2">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-background/80 hover:text-background"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.secretButton.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="py-3 text-base font-medium text-background"
          >
            {siteConfig.secretButton.label}
          </a>
        </Container>
      </nav>
    </header>
  );
}
