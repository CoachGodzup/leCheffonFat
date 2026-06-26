import { render, screen, waitFor } from "@testing-library/react";

import RecipeImage from "@/components/atoms/RecipeImage/RecipeImage";

describe("RecipeImage", () => {
  it("renders an image with alt text when src is valid", () => {
    render(
      <RecipeImage
        src="https://example.com/img.jpg"
        alt="Test meal"
        width={400}
        height={200}
      />,
    );

    expect(screen.getByRole("img", { name: "Test meal" })).toBeInTheDocument();
  });

  it("shows placeholder when src is empty", () => {
    const { container } = render(
      <RecipeImage src="" alt="Test meal" width={400} height={200} />,
    );

    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test meal" })).toBeInTheDocument();
  });

  it("shows placeholder when image fails to load", async () => {
    const { container } = render(
      <RecipeImage
        src="https://example.com/broken.jpg"
        alt="Broken meal"
        width={400}
        height={200}
      />,
    );

    const img = container.querySelector("img")!;
    img.dispatchEvent(new Event("error", { bubbles: true }));

    await waitFor(() => {
      expect(container.querySelector("img")).not.toBeInTheDocument();
    });
  });

  it("renders with fill layout", () => {
    render(
      <RecipeImage
        src="https://example.com/img.jpg"
        alt="Filled meal"
        fill
        sizes="100vw"
      />,
    );

    expect(
      screen.getByRole("img", { name: "Filled meal" }),
    ).toBeInTheDocument();
  });
});
