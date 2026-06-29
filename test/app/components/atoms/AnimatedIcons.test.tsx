import { render, screen } from "@testing-library/react";

import AnimatedIcons from "@/components/atoms/AnimatedIcons/AnimatedIcons";

describe("AnimatedIcons", () => {
  it("renders icons inside an aria-hidden container", () => {
    const { container } = render(<AnimatedIcons />);

    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("renders icon divs with CSS custom properties for positioning", () => {
    const { container } = render(<AnimatedIcons />);

    const sprites = container.querySelectorAll(
      "div[class] > div",
    ) as NodeListOf<HTMLDivElement>;

    expect(sprites.length).toBeGreaterThanOrEqual(1);

    for (const sprite of sprites) {
      expect(sprite.style.getPropertyValue("--x")).toBeTruthy();
      expect(sprite.style.getPropertyValue("--y")).toBeTruthy();
      expect(sprite.style.getPropertyValue("transition-duration")).toBeTruthy();
    }
  });

  it("renders correct number of sprites", () => {
    const { container } = render(<AnimatedIcons />);

    const sprites = container.querySelectorAll(
      "div[class] > div",
    ) as NodeListOf<HTMLDivElement>;

    expect(sprites.length).toBe(10);
  });
});
