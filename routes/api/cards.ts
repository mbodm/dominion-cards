import type { FreshContext } from "fresh";

export async function handler(_ctx: FreshContext) {
  const imagesDir = new URL("../../images", import.meta.url).pathname;

  const cards: { name: string; url: string }[] = [];

  try {
    for await (const entry of Deno.readDir(imagesDir)) {
      if (!entry.isFile) continue;
      const ext = entry.name.split(".").pop()?.toLowerCase();
      if (!["jpg", "jpeg", "png", "webp", "gif"].includes(ext ?? "")) continue;

      const name = entry.name
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      cards.push({ name, url: `/images/${entry.name}` });
    }
  } catch {
    // images directory doesn't exist yet
  }

  cards.sort((a, b) => a.name.localeCompare(b.name, "de"));

  return Response.json(cards);
}
