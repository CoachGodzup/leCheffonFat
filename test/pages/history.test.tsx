import { render, screen } from "@testing-library/react";
import { useStore } from "@/store";
import History from "@/app/history/page";

beforeEach(() => {
  useStore.setState({ calls: [] });
});

it("renders empty state", () => {
  render(<History />);
  expect(screen.getByText("No history yet.")).toBeInTheDocument();
});

it("renders calls", () => {
  useStore.setState({
    calls: [
      {
        recipeId: "123",
        title: "Bistecca",
        imageUrl: "/img.jpg",
        timestamp: 1700000000000,
        like: null,
        inputs: { category: "Beef", area: "Italian" },
      },
    ],
  });

  render(<History />);
  expect(screen.getByText("Bistecca")).toBeInTheDocument();
  expect(screen.getByText("Beef — Italian")).toBeInTheDocument();
});
