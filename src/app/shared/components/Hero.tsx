// Hero.tsx
import React from "react";
import { LinkButton } from "./ui/LinkButton";

type ButtonLink = { label: string; href: string };

export interface HeroProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  primary?: ButtonLink;
  secondary?: ButtonLink;
  /** Bruk kompakt høyde  */
  compact?: boolean;
}

export default function Hero({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  primary,
  secondary,
  compact = false,
}: Readonly<HeroProps>) {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-black/40">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Fyll over bildet så tekst synes bedre */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"
        aria-hidden="true"
      />

      {/* Tekstblokk — høyde styres av compact */}
      <div
        className={[
          "relative z-10 flex flex-col justify-center",
          compact
            ? "p-6 md:p-8 min-h-[220px] sm:min-h-[280px]"
            : "p-8 md:p-10 min-h-[360px] sm:min-h-[420px]",
        ].join(" ")}
      >
        <h1 className="text-glow-pink text-4xl sm:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-glow-cyan max-w-prose">{subtitle}</p>
        )}

        <div className="mt-6 flex gap-3">
          {primary && (
            <LinkButton
              href={primary.href}
              variant="glow"
              size="none"
              className="h-9 rounded-[0.4rem]"
            >
              {primary.label}
            </LinkButton>
          )}

          {secondary && (
            <LinkButton
              href={secondary.href}
              variant="ghost"
              size="md"
              className="rounded-xl"
            >
              {secondary.label}
            </LinkButton>
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-transparent to-black/40"
        aria-hidden="true"
      />
    </section>
  );
}
