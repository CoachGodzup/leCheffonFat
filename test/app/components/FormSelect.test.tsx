import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FormSelect from "@/components/molecules/FormSelect/FormSelect";

const mockRegister = jest.fn().mockReturnValue({});

const options = [
  { value: "1", label: "Beef" },
  { value: "2", label: "Chicken" },
];

describe("FormSelect", () => {
  it("renders the label and select element", () => {
    render(
      <FormSelect
        label="Category"
        name="category"
        options={options}
        register={mockRegister}
      />,
    );

    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders a placeholder option", () => {
    render(
      <FormSelect
        label="Category"
        name="category"
        options={options}
        register={mockRegister}
      />,
    );

    expect(
      screen.getByRole("option", { name: "Select a category" }),
    ).toBeInTheDocument();
  });

  it("renders the provided options", () => {
    render(
      <FormSelect
        label="Category"
        name="category"
        options={options}
        register={mockRegister}
      />,
    );

    expect(screen.getByRole("option", { name: "Beef" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Chicken" })).toBeInTheDocument();
  });

  it("displays error message when error prop is provided", () => {
    render(
      <FormSelect
        label="Category"
        name="category"
        options={options}
        error="This field is required"
        register={mockRegister}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "This field is required",
    );
  });

  it("sets aria-invalid to true when error is present", () => {
    render(
      <FormSelect
        label="Category"
        name="category"
        options={options}
        error="This field is required"
        register={mockRegister}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("sets aria-invalid to false when no error", () => {
    render(
      <FormSelect
        label="Category"
        name="category"
        options={options}
        register={mockRegister}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("selects an option on user interaction", async () => {
    const user = userEvent.setup();
    render(
      <FormSelect
        label="Category"
        name="category"
        options={options}
        register={mockRegister}
      />,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "1");

    expect(
      (screen.getByRole("option", { name: "Beef" }) as HTMLOptionElement)
        .selected,
    ).toBe(true);
  });
});
