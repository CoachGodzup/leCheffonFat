import { render, screen } from "@testing-library/react";

import Sidebar from "@/components/organisms/Sidebar/Sidebar";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("@/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("zustand/shallow", () => ({
  useShallow: (fn: unknown) => fn,
}));

const mockUseStore = jest.requireMock("@/store").useStore;

describe("Sidebar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/page1");
    mockUseStore.mockImplementation((selector: (state: unknown) => unknown) => {
      const state = {
        calls: [],
        remove: jest.fn(),
      };
      return selector(state);
    });
  });

  it("renders the history heading", () => {
    render(<Sidebar />);

    expect(
      screen.getByRole("heading", { name: /history/i }),
    ).toBeInTheDocument();
  });

  it("renders the entry list with role='status'", () => {
    render(<Sidebar />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows 'No results found' when calls is empty", () => {
    render(<Sidebar />);

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("renders entries from store", () => {
    mockUseStore.mockImplementation((selector: (state: unknown) => unknown) => {
      const state = {
        calls: [
          {
            recipeId: "99999",
            title: "Pizza Margherita",
            imageUrl: "",
            timestamp: 1_719_619_200_000,
            like: null,
            inputs: { category: "Italian", area: "Italian" },
          },
          {
            recipeId: "52802",
            title: "Fish pie",
            imageUrl: "",
            timestamp: 1_719_532_800_000,
            like: true,
            inputs: { category: "Seafood", area: "British" },
          },
        ],
        remove: jest.fn(),
      };
      return selector(state);
    });

    render(<Sidebar />);

    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText("Fish pie")).toBeInTheDocument();
  });

  it("returns null on root path", () => {
    mockUsePathname.mockReturnValue("/");

    const { container } = render(<Sidebar />);

    expect(container).toBeEmptyDOMElement();
  });
});
