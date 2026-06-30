import { render, screen } from "@testing-library/react";

import Search from "@/app/search/page";

jest.mock("@/hooks/use-search", () => ({
  useSearch: jest.fn(),
}));

const mockUseSearch = jest.requireMock("@/hooks/use-search").useSearch;

const defaultState = {
  searchText: "",
  setSearchText: jest.fn(),
  meals: [],
  isLoading: false,
  error: null,
  isActive: false,
};

beforeEach(() => {
  mockUseSearch.mockReturnValue(defaultState);
});

describe("Search page", () => {
  it("renders the heading", () => {
    render(<Search />);

    expect(
      screen.getByRole("heading", { name: /search page/i }),
    ).toBeInTheDocument();
  });

  it("renders the search input with label", () => {
    render(<Search />);

    expect(screen.getByLabelText("Recipe name")).toBeInTheDocument();
  });

  it("renders a status region", () => {
    render(<Search />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows loading text when active and loading", () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      isActive: true,
      isLoading: true,
    });

    render(<Search />);

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("shows error alert when active and error", () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      isActive: true,
      error: "Something went wrong",
    });

    render(<Search />);

    expect(screen.getByText(/An error occurred/)).toBeInTheDocument();
  });

  it("shows 'No meals found' when active with empty results", () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      isActive: true,
    });

    render(<Search />);

    expect(screen.getByText("No meals found.")).toBeInTheDocument();
  });

  it("renders meal results", () => {
    mockUseSearch.mockReturnValue({
      ...defaultState,
      isActive: true,
      meals: [
        {
          idMeal: "52802",
          strMeal: "Fish pie",
          strCategory: "Seafood",
          strArea: "British",
          strMealThumb: "https://example.com/img.jpg",
          strTags: "Fish",
        },
      ],
    });

    render(<Search />);

    expect(screen.getByText("Fish pie")).toBeInTheDocument();
  });
});
