import { NextRequest } from "next/server";

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1";
const API_KEY = process.env.MEALDB_API_KEY ?? "1";

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
