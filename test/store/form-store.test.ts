import { createFormSlice } from "@/store/slices/form-slice";
import type { FormSlice } from "@/store/slices/form-slice";

describe("createFormSlice", () => {
  let set: jest.Mock;
  let slice: FormSlice;

  beforeEach(() => {
    set = jest.fn();
    slice = createFormSlice(set, jest.fn(), jest.fn());
  });

  it("returns initial state", () => {
    expect(slice.category).toBe("");
    expect(slice.area).toBe("");
  });

  describe("setPage1", () => {
    it("sets category", () => {
      slice.setPage1({ category: "Beef" });
      expect(set).toHaveBeenCalledWith({
        category: "Beef",
      });
    });

    it("overwrites previous category", () => {
      slice.setPage1({ category: "Chicken" });
      expect(set).toHaveBeenCalledWith({
        category: "Chicken",
      });
    });
  });

  describe("setPage2", () => {
    it("sets area", () => {
      slice.setPage2({ area: "Italian" });
      expect(set).toHaveBeenCalledWith({
        area: "Italian",
      });
    });
  });

  describe("resetForm", () => {
    it("resets to initial state", () => {
      slice.resetForm();
      expect(set).toHaveBeenCalledWith({
        category: "",
        area: "",
      });
    });
  });
});
