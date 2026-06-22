import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page1 from "@/app/page1/page";

const mockPush = jest.fn();
const mockReset = jest.fn();
const mockSetPage1 = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("zustand/shallow", () => ({
  useShallow: (fn: unknown) => fn,
}));

const mockCategories = [
  {
    idCategory: "1",
    strCategory: "Beef",
    strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
    strCategoryDescription:
      "Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]",
  },
  {
    idCategory: "2",
    strCategory: "Chicken",
    strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png",
    strCategoryDescription:
      "Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.",
  },
];

jest.mock("@/service/meal-db-service", () => ({
  getCategories: () => Promise.resolve({ categories: mockCategories }),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: (name: string) => ({ name }),
    handleSubmit:
      (fn: (data: unknown) => void) => (e: { preventDefault: () => void }) => {
        e.preventDefault();
        fn({ category: "Beef" });
      },
    formState: { errors: {} },
    reset: mockReset,
  }),
}));

import { useStore } from "@/store";

describe("Page1", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSetPage1.mockClear();
    mockReset.mockClear();
    jest.mocked(useStore).mockImplementation((selector) => {
      const state = {
        category: "",
        area: "",
        setPage1: mockSetPage1,
        setPage2: jest.fn(),
        resetForm: jest.fn(),
      };
      return selector(state);
    });
  });

  it("renders without crashing", async () => {
    render(<Page1 />);
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /what's on your mind's menu/i }),
      ).toBeInTheDocument(),
    );
  });

  it("renders the heading", async () => {
    render(<Page1 />);
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /what's on your mind's menu/i }),
      ).toBeInTheDocument(),
    );
  });

  it("renders category select dropdown", async () => {
    render(<Page1 />);
    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /category/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders category options from API", async () => {
    render(<Page1 />);
    await waitFor(() => {
      const categorySelect = screen.getByRole("combobox", {
        name: /category/i,
      });
      expect(categorySelect).toBeInTheDocument();
      expect(categorySelect.children.length).toBe(mockCategories.length + 1);
    });
  });

  it("does not render area select dropdown", async () => {
    render(<Page1 />);
    await waitFor(() => {
      expect(
        screen.queryByRole("combobox", { name: /area/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("renders a submit button", async () => {
    render(<Page1 />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument(),
    );
  });

  it("navigates to page2 on submit", async () => {
    const user = userEvent.setup();
    render(<Page1 />);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(mockPush).toHaveBeenCalledWith("/page2");
  });

  describe("store integration", () => {
    it("uses empty form when store has no cached values", async () => {
      render(<Page1 />);

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledWith({ category: "" });
      });
    });

    it("hydrates form fields from cached store values on mount", async () => {
      jest.mocked(useStore).mockImplementation((selector) => {
        const state = {
          category: "Beef",
          area: "Italian",
          setPage1: mockSetPage1,
          setPage2: jest.fn(),
          resetForm: jest.fn(),
        };
        return selector(state);
      });

      render(<Page1 />);

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledWith({
          category: "Beef",
        });
      });
    });

    it("saves form values to store on submit", async () => {
      const user = userEvent.setup();
      render(<Page1 />);

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /next/i }),
        ).toBeInTheDocument(),
      );

      await user.click(screen.getByRole("button", { name: /next/i }));

      expect(mockSetPage1).toHaveBeenCalledWith({
        category: "Beef",
      });
    });
  });
});
