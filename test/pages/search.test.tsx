import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "@/app/search/page";

const mockSetSearchText = jest.fn();

const mockMeal = {
  idMeal: "52802",
  strMeal: "Fish pie",
  strMealAlternate: null,
  strCategory: "Seafood",
  strArea: "British",
  strInstructions: "",
  strMealThumb: "",
  strTags: null,
  strYoutube: "",
  strSource: "",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

jest.mock("@/hooks/use-search", () => ({
  useSearch: jest.fn(),
}));

import { useSearch } from "@/hooks/use-search";

const defaultMock = {
  searchText: "",
  setSearchText: mockSetSearchText,
  meals: [],
  isLoading: false,
  error: null,
  isActive: false,
};

beforeEach(() => {
  mockSetSearchText.mockClear();
  jest.mocked(useSearch).mockReturnValue(defaultMock);
});

describe("Search page", () => {
  it("renders without crashing", () => {
    render(<Search />);
    expect(
      screen.getByRole("heading", { name: /search page/i }),
    ).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Search />);
    expect(
      screen.getByRole("searchbox", { name: /recipe name/i }),
    ).toBeInTheDocument();
  });

  it("input reflects searchText", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      searchText: "pasta",
    });
    render(<Search />);
    const input = screen.getByRole("searchbox", { name: /recipe name/i });
    expect(input).toHaveValue("pasta");
  });

  it("calls setSearchText on input change", async () => {
    const user = userEvent.setup();
    render(<Search />);

    const input = screen.getByRole("searchbox", { name: /recipe name/i });
    await user.type(input, "a");

    expect(mockSetSearchText).toHaveBeenCalledWith("a");
  });

  it("shows loading state when active", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      isActive: true,
      isLoading: true,
    });
    render(<Search />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("does not show loading when not active", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      isLoading: true,
      isActive: false,
    });
    render(<Search />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("shows error state", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      isActive: true,
      error: "Something went wrong",
    });
    render(<Search />);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("shows empty message when no results", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      isActive: true,
      meals: [],
    });
    render(<Search />);
    expect(screen.getByText(/no meals found/i)).toBeInTheDocument();
  });

  it("does not show empty message during loading", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      isActive: true,
      isLoading: true,
      meals: [],
    });
    render(<Search />);
    expect(screen.queryByText(/no meals found/i)).not.toBeInTheDocument();
  });

  it("does not show empty message on error", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      isActive: true,
      error: "error",
      meals: [],
    });
    render(<Search />);
    expect(screen.queryByText(/no meals found/i)).not.toBeInTheDocument();
  });

  it("renders results", () => {
    jest.mocked(useSearch).mockReturnValue({
      ...defaultMock,
      meals: [mockMeal],
      isActive: true,
    });
    render(<Search />);
    expect(screen.getByText(/fish pie/i)).toBeInTheDocument();
  });
});
