import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import History from "@/app/history/page";
import { useStore } from "@/store";

const mockCalls = [
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
  {
    recipeId: "52803",
    title: "Kumpir",
    imageUrl: "",
    timestamp: 1_719_446_400_000,
    like: false,
    inputs: { category: "Vegetarian", area: "Turkish" },
  },
];

describe("History", () => {
  beforeEach(() => {
    useStore.setState({
      calls: mockCalls,
    });
  });

  it("renders heading", () => {
    render(<History />);

    expect(
      screen.getByRole("heading", { name: /history/i }),
    ).toBeInTheDocument();
  });

  it("renders filter and sort controls", () => {
    render(<History />);

    expect(
      screen.getByRole("group", { name: /filter by rating/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sort/i })).toBeInTheDocument();
  });

  it("shows 'No meals found' when calls is empty", () => {
    useStore.setState({ calls: [] });

    render(<History />);

    expect(screen.getByText("No meals found.")).toBeInTheDocument();
  });

  it("renders entries from the store", () => {
    render(<History />);

    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText("Fish pie")).toBeInTheDocument();
    expect(screen.getByText("Kumpir")).toBeInTheDocument();
  });

  it("renders entries as links to recommendation page", () => {
    render(<History />);

    expect(
      screen.getByRole("link", { name: /pizza margherita/i }),
    ).toHaveAttribute("href", "/recommendation/99999");
  });

  it("filters by liked entries when liked checkbox is toggled", async () => {
    const user = userEvent.setup();
    render(<History />);

    await user.click(screen.getByLabelText("Liked"));

    expect(screen.queryByText("Pizza Margherita")).not.toBeInTheDocument();
    expect(screen.getByText("Fish pie")).toBeInTheDocument();
    expect(screen.queryByText("Kumpir")).not.toBeInTheDocument();
  });

  it("filters by disliked entries when disliked checkbox is toggled", async () => {
    const user = userEvent.setup();
    render(<History />);

    await user.click(screen.getByLabelText("Disliked"));

    expect(screen.queryByText("Pizza Margherita")).not.toBeInTheDocument();
    expect(screen.queryByText("Fish pie")).not.toBeInTheDocument();
    expect(screen.getByText("Kumpir")).toBeInTheDocument();
  });

  it("filters by unrated entries when unrated checkbox is toggled", async () => {
    const user = userEvent.setup();
    render(<History />);

    await user.click(screen.getByLabelText("Unrated"));

    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.queryByText("Fish pie")).not.toBeInTheDocument();
    expect(screen.queryByText("Kumpir")).not.toBeInTheDocument();
  });

  it("sorts by timestamp ascending by default", () => {
    render(<History />);

    const entries = screen.getAllByRole("listitem");
    expect(entries[0]).toHaveTextContent("Kumpir");
    expect(entries[1]).toHaveTextContent("Fish pie");
    expect(entries[2]).toHaveTextContent("Pizza Margherita");
  });
});
