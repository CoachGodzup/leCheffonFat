import { readFileSync } from "fs";
import { resolve } from "path";
import { NextRequest } from "next/server";

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

function loadApiKey(): string {
  try {
    const secretPath = resolve(process.cwd(), ".secret");
    const content = readFileSync(secretPath, "utf-8");
    const match = content.match(/^MEALDB_API_KEY=(.+)$/m);
    if (!match) throw new Error("MEALDB_API_KEY not found in .secret");
    return match[1].trim();
  } catch {
    return "1";
  }
}

const API_KEY = loadApiKey();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const endpoint = path.join("/");
  const queryString = request.nextUrl.searchParams.toString();
  const url = `${MEALDB_BASE}/${API_KEY}/${endpoint}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url);

  const data = await res.json();
  return Response.json(data, { status: res.status });
}
