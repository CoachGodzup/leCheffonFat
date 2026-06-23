import { createHistorySlice, HistorySlice } from "@/store/slices/history-slice";

describe("createHistorySlice", () => {
  let set: jest.Mock;
  let get: jest.Mock;
  let slice: HistorySlice;

  beforeEach(() => {
    set = jest.fn((partial: Partial<HistorySlice>) => {
      Object.assign(slice, partial);
    });
    get = jest.fn(() => slice);
    slice = createHistorySlice(set, get);
  });

  it("starts empty", () => {
    expect(slice.calls).toEqual([]);
  });

  it("logRequest adds a call", () => {
    slice.logRequest({
      recipeId: "123",
      title: "Bistecca",
      imageUrl: "/img.jpg",
      inputs: { category: "Beef", area: "Italian" },
    });

    expect(set).toHaveBeenCalledWith({
      calls: [expect.objectContaining({ recipeId: "123", like: null })],
    });
  });

  it("does not add duplicate recipeId", () => {
    slice.logRequest({
      recipeId: "123",
      title: "Bistecca",
      imageUrl: "/img.jpg",
      inputs: { category: "Beef", area: "Italian" },
    });

    set.mockClear();

    slice.logRequest({
      recipeId: "123",
      title: "Bistecca",
      imageUrl: "/img.jpg",
      inputs: { category: "Beef", area: "Italian" },
    });

    expect(set).not.toHaveBeenCalled();
  });

  it("setLike updates like", () => {
    const timestamp = Date.now();
    slice.calls = [
      {
        recipeId: "123",
        title: "Bistecca",
        imageUrl: "/img.jpg",
        timestamp,
        like: null,
        inputs: { category: "Beef", area: "Italian" },
      },
    ];

    slice.setLike("123", true);

    expect(set).toHaveBeenCalledWith({
      calls: [
        {
          recipeId: "123",
          title: "Bistecca",
          imageUrl: "/img.jpg",
          timestamp,
          like: true,
          inputs: { category: "Beef", area: "Italian" },
        },
      ],
    });
  });

  it("resetHistory clears calls", () => {
    slice.resetHistory();
    expect(set).toHaveBeenCalledWith({ calls: [] });
  });
});
