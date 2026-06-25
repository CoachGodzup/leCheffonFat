import { render, screen, fireEvent } from "@testing-library/react";
import { useStore } from "@/store";
import History from "@/app/history/page";

beforeEach(() => {
  useStore.setState({ calls: [] });
});

it("renders empty state", () => {
  render(<History />);
  expect(screen.getByText("History")).toBeInTheDocument();
});

it("renders all calls when no filter active", () => {
  useStore.setState({
    calls: [
      {
        recipeId: "1",
        title: "Bistecca",
        imageUrl: "/img.jpg",
        timestamp: 1700000000000,
        like: null,
        inputs: { category: "Beef", area: "Italian" },
      },
      {
        recipeId: "2",
        title: "Sushi",
        imageUrl: "/img.jpg",
        timestamp: 1700000001000,
        like: true,
        inputs: { category: "Seafood", area: "Japanese" },
      },
      {
        recipeId: "3",
        title: "Taco",
        imageUrl: "/img.jpg",
        timestamp: 1700000002000,
        like: false,
        inputs: { category: "Beef", area: "Mexican" },
      },
    ],
  });

  render(<History />);
  expect(screen.getByText("Bistecca")).toBeInTheDocument();
  expect(screen.getByText((t) => t.includes("Sushi"))).toBeInTheDocument();
  expect(screen.getByText((t) => t.includes("Taco"))).toBeInTheDocument();
});

it("filters by liked", () => {
  useStore.setState({
    calls: [
      {
        recipeId: "1",
        title: "Bistecca",
        imageUrl: "/img.jpg",
        timestamp: 1700000000000,
        like: null,
        inputs: { category: "Beef", area: "Italian" },
      },
      {
        recipeId: "2",
        title: "Sushi",
        imageUrl: "/img.jpg",
        timestamp: 1700000001000,
        like: true,
        inputs: { category: "Seafood", area: "Japanese" },
      },
    ],
  });

  render(<History />);
  fireEvent.click(screen.getByRole("checkbox", { name: /Liked/ }));
  expect(screen.getByText((t) => t.includes("Sushi"))).toBeInTheDocument();
  expect(screen.queryByText("Bistecca")).not.toBeInTheDocument();
});

it("filters by unknown", () => {
  useStore.setState({
    calls: [
      {
        recipeId: "1",
        title: "Bistecca",
        imageUrl: "/img.jpg",
        timestamp: 1700000000000,
        like: null,
        inputs: { category: "Beef", area: "Italian" },
      },
      {
        recipeId: "2",
        title: "Sushi",
        imageUrl: "/img.jpg",
        timestamp: 1700000001000,
        like: true,
        inputs: { category: "Seafood", area: "Japanese" },
      },
    ],
  });

  render(<History />);
  fireEvent.click(screen.getByLabelText("Unrated"));
  expect(screen.getByText("Bistecca")).toBeInTheDocument();
  expect(
    screen.queryByText((t) => t.includes("Sushi")),
  ).not.toBeInTheDocument();
});
