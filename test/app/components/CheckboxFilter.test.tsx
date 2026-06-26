import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxFilter from "@/components/atoms/CheckboxFilter/CheckboxFilter";

describe("CheckboxFilter", () => {
  const options = [
    { value: true, label: "Liked" },
    { value: false, label: "Disliked" },
    { value: null, label: "Unrated" },
  ];

  it("renders the legend", () => {
    render(
      <CheckboxFilter
        legend="Filter by rating"
        options={options}
        value={[]}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByText("Filter by rating")).toBeInTheDocument();
  });

  it("renders all options as checkboxes", () => {
    render(
      <CheckboxFilter
        legend="Filter"
        options={options}
        value={[]}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByLabelText("Liked")).toBeInTheDocument();
    expect(screen.getByLabelText("Disliked")).toBeInTheDocument();
    expect(screen.getByLabelText("Unrated")).toBeInTheDocument();
  });

  it("checks boxes that are in the value array", () => {
    render(
      <CheckboxFilter
        legend="Filter"
        options={options}
        value={[true, null]}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByLabelText("Liked")).toBeChecked();
    expect(screen.getByLabelText("Disliked")).not.toBeChecked();
    expect(screen.getByLabelText("Unrated")).toBeChecked();
  });

  it("calls onChange with value added when checking an unchecked box", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <CheckboxFilter
        legend="Filter"
        options={options}
        value={[]}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Liked"));

    expect(onChange).toHaveBeenCalledWith([true]);
  });

  it("calls onChange with value removed when unchecking a checked box", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <CheckboxFilter
        legend="Filter"
        options={options}
        value={[true, false, null]}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Liked"));

    expect(onChange).toHaveBeenCalledWith([false, null]);
  });
});
