import { z } from "zod";
import superjson from "superjson";
import type { Selectable } from "kysely";
import type { PortfolioMedia } from "../helpers/schema";

export const schema = z.object({}).strict();
export type InputType = z.infer<typeof schema>;
export type MediaRecord = Pick<Selectable<PortfolioMedia>,
  "id" | "kind" | "title" | "caption" | "year" | "mediaUrl" | "posterUrl" | "externalUrl" | "contentType" | "isFeatured">;
export type OutputType = { items: MediaRecord[] };

export async function getPortfolioMedia(init?: RequestInit): Promise<OutputType> {
  const result = await fetch("/_api/portfolio-media", { ...init, method: "GET" });
  if (!result.ok) throw new Error("Não foi possível carregar o acervo. Tente novamente.");
  return superjson.parse<OutputType>(await result.text());
}
