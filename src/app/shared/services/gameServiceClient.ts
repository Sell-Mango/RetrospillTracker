import { dbGames } from "@/app/data/dbTestData";
import * as realServiceModule from "./gameService";
import { Game } from "@/app/shared/types/game";

/**
 * Veksler mellom mock-data (lokalt) og ekte API-kall via egen proxy/backend.
 * Sett VITE_USE_MOCKS=true i .env for å utvikle UI uten nettverkskall.
 */
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

/**
 * Basis-URL for vår egen (framtidige) IGDB-proxy i Worker/Backend.
 * Når dere senere implementerer /api/v1/igdb-endepunkter,
 * kan vi slå av mocks og bruke disse uten å endre sidene.
 */
const API_BASE = "/api/v1/igdb";

/**
 * Signaturer som backend kan levere senere.
 * Når disse eksisterer, vil vi automatisk bruke dem som fallback.
 */
type RealService = {
  listAllGames?: (limit?: number, offset?: number) => Promise<Game[]>;
  searchGames?: (args: {
    text?: string;
    limit?: number;
    offset?: number;
  }) => Promise<Game[]>;
  getGameBySlug?: (slug: string) => Promise<Game | null>;
  getPopular?: (limit?: number) => Promise<Game[]>;
  getNewReleases?: (limit?: number) => Promise<Game[]>;
};

// Kaster importen slik at TypeScript aksepterer ukjente implementasjoner nå
const realService = realServiceModule as unknown as RealService;

/** Hjelpefunksjon for å hente JSON på en trygg måte */
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Nettverksfeil ${response.status} for ${url}`);
  }
  return response.json() as Promise<T>;
}

/* KJERNEFUNKSJONER  */

/** Hent alle spill (med paginering) */
export async function listAllGames(limit = 24, offset = 0): Promise<Game[]> {
  if (USE_MOCKS) {
    const allGames = [...(dbGames as unknown as Game[])];
    return allGames.slice(offset, offset + limit);
  }

  // 1) Forsøk via vår egen IGDB-proxy (tomt søk = “list all”)
  try {
    const data = await fetchJSON<{ items: Game[] }>(
      `${API_BASE}/search?q=&limit=${limit}&offset=${offset}`
    );
    return data.items ?? [];
  } catch {
    // 2) Fallback til backend når de leverer funksjonen
    if (typeof realService.listAllGames === "function") {
      return await realService.listAllGames(limit, offset);
    }
    return [];
  }
}

/** Søk etter spill basert på tekst (tittel, slug, beskrivelse) */
export async function searchGames(
  searchText: string,
  limit = 24,
  offset = 0
): Promise<Game[]> {
  if (USE_MOCKS) {
    const queryText = (searchText ?? "").toLowerCase();
    const allGames = dbGames as unknown as Game[];

    const filteredGames = allGames.filter(
      (game) =>
        game.title.toLowerCase().includes(queryText) ||
        game.slug?.toLowerCase().includes(queryText) ||
        (game.description?.toLowerCase().includes(queryText) ?? false)
    );

    return filteredGames.slice(offset, offset + limit);
  }

  // 1) Forsøk via vår egen IGDB-proxy
  try {
    const data = await fetchJSON<{ items: Game[] }>(
      `${API_BASE}/search?q=${encodeURIComponent(
        searchText
      )}&limit=${limit}&offset=${offset}`
    );
    return data.items ?? [];
  } catch {
    // 2) Fallback til backend når de leverer funksjonen
    if (typeof realService.searchGames === "function") {
      return await realService.searchGames({ text: searchText, limit, offset });
    }
    return [];
  }
}

/** Hent ett enkelt spill basert på slug (for detaljside) */
export async function getGameBySlug(slug: string): Promise<Game | null> {
  if (USE_MOCKS) {
    const allGames = dbGames as unknown as Game[];
    return allGames.find((game) => game.slug === slug) ?? null;
  }

  // Midlertidig strategi: søk på “navn” (slug → mellomrom) inntil vi har eget endepunkt
  try {
    const nameGuess = slug.replace(/-/g, " ");
    const searchResults = await searchGames(nameGuess, 1, 0);
    return searchResults[0] ?? null;
  } catch {
    if (typeof realService.getGameBySlug === "function") {
      return await realService.getGameBySlug(slug);
    }
    return null;
  }
}

/*  HYLLER FOR FORSIDE / BROWSE (POPULÆRT OG NYE UTGIVELSER)  */

/** Populære spill (for eksempel sortert på rating) */
export async function getPopular(limit = 20): Promise<Game[]> {
  if (USE_MOCKS) {
    const allGames = [...(dbGames as unknown as Game[])];
    return allGames
      .sort((gameA, gameB) => (gameB.rating ?? 0) - (gameA.rating ?? 0))
      .slice(0, limit);
  }

  // 1) Forsøk via vår egen IGDB-proxy når /popular finnes
  try {
    const data = await fetchJSON<{ items: Game[] }>(
      `${API_BASE}/popular?limit=${limit}`
    );
    return data.items ?? [];
  } catch {
    // 2) Fallback: bruk listAllGames og sorter lokalt (til backend/worker er klar)
    if (typeof realService.getPopular === "function") {
      return await realService.getPopular(limit);
    }
    const allGames = await listAllGames(200, 0);
    return allGames
      .sort((gameA, gameB) => (gameB.rating ?? 0) - (gameA.rating ?? 0))
      .slice(0, limit);
  }
}

/** Nye utgivelser (sortert på dato, nyest først) */
export async function getNewReleases(limit = 20): Promise<Game[]> {
  if (USE_MOCKS) {
    const allGames = [...(dbGames as unknown as Game[])];
    return allGames
      .sort((gameA, gameB) => {
        const timeA = gameA.releaseDate
          ? new Date(gameA.releaseDate).getTime()
          : 0;
        const timeB = gameB.releaseDate
          ? new Date(gameB.releaseDate).getTime()
          : 0;
        return timeB - timeA;
      })
      .slice(0, limit);
  }

  // 1) Forsøk via vår egen IGDB-proxy når /new-releases finnes
  try {
    const data = await fetchJSON<{ items: Game[] }>(
      `${API_BASE}/new-releases?limit=${limit}`
    );
    return data.items ?? [];
  } catch {
    // 2) Fallback: bruk listAllGames og sorter lokalt
    if (typeof realService.getNewReleases === "function") {
      return await realService.getNewReleases(limit);
    }
    const allGames = await listAllGames(200, 0);
    return allGames
      .sort((gameA, gameB) => {
        const timeA = gameA.releaseDate
          ? new Date(gameA.releaseDate).getTime()
          : 0;
        const timeB = gameB.releaseDate
          ? new Date(gameB.releaseDate).getTime()
          : 0;
        return timeB - timeA;
      })
      .slice(0, limit);
  }
}
