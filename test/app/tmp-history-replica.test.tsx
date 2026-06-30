import { render } from "@testing-library/react";
import React from "react";

import HistoryTest from "@/app/history-test/page";

jest.mock("@/store", () => ({
  useStore: (selector) => selector({ calls: [] }),
}));

test("replica renders", () => {
  const { container } = render(React.createElement(HistoryTest));
  expect(container.querySelector("section")).toBeInTheDocument();
  expect(container.querySelector("h1")).toHaveTextContent("History");
});
