import { createFormSlice } from "@/store/slices/form-slice";
import type { FormSlice } from "@/store/slices/form-slice";

describe("createFormSlice", () => {
  let set: jest.Mock;
  let slice: FormSlice;

  beforeEach(() => {
    set = jest.fn();
    slice = createFormSlice(set);
  });

  it("returns initial state", () => {
    expect(slice.category).toBe("");
    expect(slice.area).toBe("");
    expect(slice.ingredients).toEqual([]);
  });

  describe("setPage1", () => {
    it("sets category and area", () => {
      slice.setPage1({ category: "5", area: "Italian" });
      expect(set).toHaveBeenCalledWith({
        category: "5",
        area: "Italian",
      });
    });

    it("overwrites previous values", () => {
      slice.setPage1({ category: "3", area: "Japanese" });
      expect(set).toHaveBeenCalledWith({
        category: "3",
        area: "Japanese",
      });
    });
  });

  describe("setPage2", () => {
    it("sets ingredients", () => {
      slice.setPage2({ ingredients: ["chicken", "rice"] });
      expect(set).toHaveBeenCalledWith({
        ingredients: ["chicken", "rice"],
      });
    });
  });

  describe("resetForm", () => {
    it("resets to initial state", () => {
      slice.resetForm();
      expect(set).toHaveBeenCalledWith({
        category: "",
        area: "",
        ingredients: [],
      });
    });
  });
});
