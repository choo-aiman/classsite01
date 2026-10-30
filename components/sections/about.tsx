import Image from "next/image";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/** 소개 섹션. 글자는 site.config.ts 의 about 에서 바꿉니다. */
export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="scroll-mt-16 bg-muted/50 py-24">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeader eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            {about.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
        {/* 이미지: 칸을 가득 채웁니다(cover). 그림을 바꾸려면 public/about.webp 파일을 교체하세요 */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-background">
          <Image
            src="/about.webp"
            alt="소개 이미지"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[center_40%]"
          />
        </div>
      </Container>
    </section>
  );
}
