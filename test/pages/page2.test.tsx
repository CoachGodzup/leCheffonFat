import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Page2 from "@/app/page2/page";
import { useStore } from "@/store";

const mockPush = jest.fn();
const mockReset = jest.fn();
const mockSetPage2 = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("zustand/shallow", () => ({
  useShallow: (fn: unknown) => fn,
}));

const mockAreas = [
  { strArea: "Italian" },
  { strArea: "Mexican" },
  { strArea: "French" },
];

jest.mock("@/service/meal-db-service", () => ({
  filterByCategory: () => Promise.resolve({ meals: mockAreas }),
}));

jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: (name: string) => ({ name }),
    handleSubmit:
      (fn: (data: unknown) => void) => (e: { preventDefault: () => void }) => {
        e.preventDefault();
        fn({ area: "Italian" });
      },
    formState: { errors: {} },
    reset: mockReset,
  }),
}));

describe("Page2", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSetPage2.mockClear();
    mockReset.mockClear();
    jest.mocked(useStore).mockImplementation((selector) => {
      const state = {
        category: "",
        area: "",
        calls: [],
        setPage1: jest.fn(),
        setPage2: mockSetPage2,
        resetForm: jest.fn(),
        logRequest: jest.fn(),
        resetHistory: jest.fn(),
        remove: jest.fn(),
        setLike: jest.fn(),
      };
      return selector(state);
    });
  });

  it("renders without crashing", async () => {
    render(<Page2 />);
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /where are you cooking from/i }),
      ).toBeInTheDocument(),
    );
  });

  it("renders the heading", async () => {
    render(<Page2 />);
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /where are you cooking from/i }),
      ).toBeInTheDocument(),
    );
  });

  it("renders area select dropdown", async () => {
    render(<Page2 />);
    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { name: /area/i }),
      ).toBeInTheDocument();
    });
  });

  it("renders area options from API", async () => {
    render(<Page2 />);
    await waitFor(() => {
      const areaSelect = screen.getByRole("combobox", { name: /area/i });
      expect(areaSelect).toBeInTheDocument();
      expect(areaSelect.children.length).toBe(mockAreas.length + 1);
    });
  });

  it("renders a back link to page1", async () => {
    render(<Page2 />);
    await waitFor(() => {
      const link = screen.getByRole("link", { name: /back/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/page1");
    });
  });

  it("renders a submit button", async () => {
    render(<Page2 />);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /complete/i }),
      ).toBeInTheDocument(),
    );
  });

  it("navigates to recommendation on submit", async () => {
    const user = userEvent.setup();
    render(<Page2 />);

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /complete/i }),
      ).toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: /complete/i }));

    expect(mockPush).toHaveBeenCalledWith("/recommendation");
  });

  describe("store integration", () => {
    it("uses empty form when store has no cached values", async () => {
      render(<Page2 />);

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledWith({ area: "" });
      });
    });

    it("hydrates form fields from cached store values on mount", async () => {
      jest.mocked(useStore).mockImplementation((selector) => {
        const state = {
          category: "Beef",
          area: "Italian",
          calls: [],
          setPage1: jest.fn(),
          setPage2: mockSetPage2,
          resetForm: jest.fn(),
          logRequest: jest.fn(),
          resetHistory: jest.fn(),
          remove: jest.fn(),
          setLike: jest.fn(),
        };
        return selector(state);
      });

      render(<Page2 />);

      await waitFor(() => {
        expect(mockReset).toHaveBeenCalledWith({
          area: "Italian",
        });
      });
    });

    it("saves form values to store on submit", async () => {
      const user = userEvent.setup();
      render(<Page2 />);

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /complete/i }),
        ).toBeInTheDocument(),
      );

      await user.click(screen.getByRole("button", { name: /complete/i }));

      expect(mockSetPage2).toHaveBeenCalledWith({
        area: "Italian",
      });
    });
  });
});
