import { renderHook, waitFor } from "@testing-library/react";
import { useCategories } from "@/hooks/use-categories";

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

function mockErrorResponse() {
  return Promise.resolve({
    ok: false,
    status: 500,
    statusText: "Server Error",
  } as Response);
}

const mockCategoriesData = {
  categories: [
    {
      idCategory: "1",
      strCategory: "Dessert",
      strCategoryThumb: "",
      strCategoryDescription: "",
    },
  ],
};

beforeEach(() => {
  mockFetch.mockClear();
});

describe("useCategories", () => {
  it("returns categories on success", async () => {
    mockFetch.mockReturnValue(mockOkResponse(mockCategoriesData));

    const { result } = renderHook(() => useCategories());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockCategoriesData.categories);
    expect(result.current.error).toBeNull();
  });

  it("returns error on failure", async () => {
    mockFetch.mockReturnValue(mockErrorResponse());

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(
      "TheMealDB request failed: 500 Server Error",
    );
  });
});
