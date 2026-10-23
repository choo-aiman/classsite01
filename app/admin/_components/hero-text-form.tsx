"use client";

import { useActionState } from "react";

import { saveHeroText, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { HeroFieldKey } from "@/lib/hero-fields";

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/50";

/** 히어로 글자 한 칸. 칸마다 따로 '저장' 버튼이 있습니다. 비워서 저장하면 기본 글자로 돌아갑니다. */
export function HeroTextForm({
  fieldKey,
  label,
  multiline,
  value,
}: {
  fieldKey: HeroFieldKey;
  label: string;
  multiline: boolean;
  value: string;
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveHeroText, {});

  return (
    <form action={action} className="grid gap-2 rounded-xl border p-5">
      <input type="hidden" name="key" value={fieldKey} />
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">{label}</span>
        {multiline ? (
          <textarea name="value" rows={3} defaultValue={value} className={inputClass} />
        ) : (
          <input name="value" defaultValue={value} className={`h-10 ${inputClass}`} />
        )}
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "저장 중..." : "저장"}
        </Button>
        {state.message ? (
          <p className={state.ok ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
