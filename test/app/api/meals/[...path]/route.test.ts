import { GET } from "@/app/api/meals/[...path]/route";

jest.mock("next/server", () => ({}));

class MockResponse {
  readonly body: unknown;
  readonly status: number;

  constructor(body: unknown, init?: { status?: number }) {
    this.body = body;
    this.status = init?.status ?? 200;
  }

  async json() {
    return this.body;
  }

  static json(body: unknown, init?: { status?: number }) {
    return new MockResponse(body, init) as unknown as Response;
  }
}

const mockResponse = MockResponse as unknown as typeof Response;
const originalResponse = globalThis.Response;
globalThis.Response = mockResponse;

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

afterAll(() => {
  globalThis.Response = originalResponse;
});

function mockRequest(urlString: string): { nextUrl: URL } {
  const url = new URL(urlString, "http://localhost:3000");
  return { nextUrl: url };
}

describe("GET /api/meals/[...path]", () => {
  it("returns data from TheMealDB on success", async () => {
    const data = {
      meals: [{ idMeal: "52772", strMeal: "Teriyaki Chicken Cordon Bleu" }],
    };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(data),
      status: 200,
    });

    const request = mockRequest("/api/meals/search.php?s=chicken");
    const params = Promise.resolve({ path: ["search.php"] });
    const response = await GET(request, { params });

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual(data);
  });

  it("returns error when fetch non-JSON response", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(new Error("Invalid JSON")),
      status: 200,
    });

    const request = mockRequest("/api/meals/search.php");
    const params = Promise.resolve({ path: ["search.php"] });
    const response = await GET(request, { params });

    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body).toEqual({ error: "TheMealDB returned non-JSON response" });
  });

  it("returns 500 when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    const request = mockRequest("/api/meals/search.php");
    const params = Promise.resolve({ path: ["search.php"] });
    const response = await GET(request, { params });

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body).toEqual({ error: "Network failure" });
  });

  it("returns 500 with generic message for non-Error throws", async () => {
    mockFetch.mockRejectedValueOnce("String error");

    const request = mockRequest("/api/meals/search.php");
    const params = Promise.resolve({ path: ["search.php"] });
    const response = await GET(request, { params });

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body).toEqual({ error: "An unexpected error occurred" });
  });

  it("forwards the status code from TheMealDB", async () => {
    const data = { meals: null };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(data),
      status: 404,
    });

    const request = mockRequest("/api/meals/search.php?s=nonexistent");
    const params = Promise.resolve({ path: ["search.php"] });
    const response = await GET(request, { params });

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body).toEqual(data);
  });

  it("passes query string to the upstream URL", async () => {
    const data = { meals: [] };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(data),
      status: 200,
    });

    const request = mockRequest("/api/meals/search.php?s=chicken");
    const params = Promise.resolve({ path: ["search.php"] });
    await GET(request, { params });

    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain("?s=chicken");
  });
});
