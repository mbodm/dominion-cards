import type { FreshContext } from "fresh";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

export async function handler(ctx: FreshContext) {
  const filename = ctx.params.filename;
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const contentType = MIME[ext] ?? "application/octet-stream";

  const filePath = new URL(`../../images/${filename}`, import.meta.url).pathname;

  try {
    const data = await Deno.readFile(filePath);
    return new Response(data, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
