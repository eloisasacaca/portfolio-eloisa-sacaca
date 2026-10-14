import { db } from "../helpers/db";
import { sql } from "kysely";
import { schema, type OutputType } from "./portfolio-media_GET.schema";
import superjson from "superjson";

export async function handle(request: Request) {
  const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" };
  const parsed = schema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return new Response(superjson.stringify({ error: "Consulta inválida." }), { status: 400, headers });
  try {
    const items = await db.selectFrom("portfolioMedia")
      .select(["id","kind","title","caption","year","mediaUrl","posterUrl","externalUrl","contentType","isFeatured"])
      .orderBy(sql`year ASC NULLS LAST`)
      .orderBy("sortOrder", "asc").orderBy("createdAt", "asc").orderBy("id", "asc").execute();
    return new Response(superjson.stringify({ items } satisfies OutputType), { headers });
  } catch (error) {
    console.error("Portfolio media query failed", error);
    return new Response(superjson.stringify({ error: "Não foi possível carregar o acervo." }), { status: 500, headers });
  }
}
