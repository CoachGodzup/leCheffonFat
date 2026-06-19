import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("renders children", () => {
    render(
      <RootLayout>
        <div>Test child</div>
      </RootLayout>,
    );
    expect(screen.getByText("Test child")).toBeInTheDocument();
  });
});
