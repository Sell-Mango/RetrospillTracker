"use client";

import { useEffect, useState } from "react";
import { getGameBySlug } from "@/app/shared/services/gameServiceClient";
import type { Game } from "@/app/shared/types/game";
import Hero from "@/app/shared/components/Hero";

/** Route props from worker: route("/:slug", ({ params }) => <GameArticle params={params} />) */
type GameArticleProps = {
  params: { slug: string };
};

export default function GameArticle({ params }: GameArticleProps) {
  const { slug } = params;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Konsistent knappestil (matches Hero/Header)
  const buttonBase =
    "rounded-lg font-semibold px-3 py-2 transition-all duration-200 " +
    "bg-[#ff6600] text-black hover:bg-[#ff00cc] hover:text-white " +
    "hover:shadow-[0_0_15px_#ff00cc,0_0_25px_#ff00cc]";

  // Enkel “legg til liste”-status for demo
  const [listStatus, setListStatus] = useState<
    "playing" | "played" | "planning"
  >("planning");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const fetched = await getGameBySlug(slug);
        if (alive) setGame(fetched);
      } catch (err: any) {
        if (alive) setErrorText(err?.message ?? "Ukjent feil");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  function handleAddToList() {
    setFeedbackMessage(`Lagt til i listen: ${listStatus.toUpperCase()}`);
    setTimeout(() => setFeedbackMessage(""), 2000);
  }

  if (loading) return <main className="p-6 text-pink-300">Laster …</main>;
  if (errorText)
    return <main className="p-6 text-red-400">Feil: {errorText}</main>;
  if (!game)
    return <main className="p-6 text-yellow-300">Fant ikke spillet.</main>;

  const heroUrl = "/images/heroarticle.png";
  const ratingNumber = game.rating != null ? Math.round(game.rating) : null;
  const releaseDateText = game.releaseDate
    ? new Date(game.releaseDate).toLocaleDateString()
    : "Ukjent";
  const genresText = game.genres?.join(", ") || "—";
  const platformsText = game.platforms?.join(", ") || "—";

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0030] to-black text-[#ff9c00]">
      {/* Hero – compact, only title */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Hero
          title={game.title}
          imageUrl={heroUrl}
          imageAlt="Retro joystick"
          compact
        />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Venstre kolonne */}
          <aside className="md:col-span-4 space-y-6">
            {/* Statuskort */}
            <div className="rounded-2xl p-4 md:p-5 bg-[#14004b] shadow-[0_0_25px_rgba(255,0,255,0.15)] border border-pink-500/30">
              <div className="text-pink-400 font-bold tracking-wide mb-3">
                Status
              </div>
              <div className="text-[#00ffff] text-sm mb-1">
                Playing · Played · Planning
              </div>
              <div className="flex items-center gap-2 mt-3">
                <select
                  value={listStatus}
                  onChange={(e) =>
                    setListStatus(
                      e.target.value as "playing" | "played" | "planning"
                    )
                  }
                  className="w-full bg-[#0f0038] border border-pink-500/40 text-pink-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="playing">Playing</option>
                  <option value="played">Played</option>
                  <option value="planning">Planning</option>
                </select>
                <button
                  onClick={handleAddToList}
                  className={`${buttonBase} shrink-0`}
                >
                  Legg til liste
                </button>
              </div>
              {feedbackMessage && (
                <div className="text-green-300 text-sm mt-2">
                  {feedbackMessage}
                </div>
              )}
            </div>

            {/* Cover + nøkkelinfo */}
            <div className="rounded-2xl p-4 md:p-5 bg-[#14004b] border border-pink-500/30">
              <div className="flex gap-4">
                <img
                  src={heroUrl}
                  alt={game.title}
                  className="w-28 h-40 md:w-32 md:h-48 object-cover rounded-lg shadow"
                  loading="lazy"
                />
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-[#ff9c00]">
                    {game.title}
                  </h2>
                  <div className="text-purple-200 text-sm">
                    <span className="opacity-80">Sjanger: </span>
                    {genresText}
                  </div>
                  <div className="text-purple-200 text-sm">
                    <span className="opacity-80">Plattformer: </span>
                    {platformsText}
                  </div>
                  <div className="text-purple-200 text-sm">
                    <span className="opacity-80">Utgitt: </span>
                    {releaseDateText}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Høyre kolonne */}
          <section className="md:col-span-8 space-y-6">
            <div className="rounded-2xl p-5 bg-[#0f0038] border border-[#00ffff]/30 shadow-[0_0_30px_rgba(0,255,255,0.15)]">
              <h3 className="font-extrabold text-[#ff9c00] mb-3">Overview</h3>
              <p className="text-purple-100 leading-relaxed whitespace-pre-line">
                {game.description || "Ingen beskrivelse tilgjengelig."}
              </p>
            </div>

            <div className="rounded-2xl p-4 bg-[#0f0038] border border-[#00ffff]/30 flex flex-wrap items-center gap-3">
              <div className="text-[#00ffff] font-bold">
                {ratingNumber != null
                  ? `${ratingNumber} / 100`
                  : "Ingen vurdering"}
              </div>
              <span className="text-[#00ffff]">•</span>
              <div className="text-[#00ffff]">
                Basert på eksterne vurderinger
              </div>
              <button className={`${buttonBase} ml-auto`}>
                Legg til vurdering
              </button>
            </div>

            <div className="rounded-2xl p-5 bg-[#14004b] border border-pink-500/30">
              <h3 className="font-extrabold text-[#ff9c00] mb-3">
                Spilleranmeldelser
              </h3>
              <ul className="space-y-3 list-disc pl-6 text-purple-100">
                <li>
                  <span className="font-semibold">9/10 – RetroFan85:</span>{" "}
                  “Elsker combos og dybden i moves.”
                </li>
                <li>
                  <span className="font-semibold">8/10 – PixelKnight:</span>{" "}
                  “Perfekt nostalgi.”
                </li>
                <li>
                  <span className="font-semibold">6/10 – Evilgamer:</span> “Litt
                  bratt læringskurve.”
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
