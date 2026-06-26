import { renderToString } from "react-dom/server";

import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("renders children", () => {
    const html = renderToString(
      <RootLayout>
        <div>Test child</div>
      </RootLayout>,
    );
    expect(html).toContain("Test child");
  });
});
