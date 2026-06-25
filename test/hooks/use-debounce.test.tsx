import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("updates debounced value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } },
    );

    rerender({ value: "ab", delay: 300 });
    expect(result.current).toBe("a");

    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe("ab");
  });

  it("cancels previous timer on value change", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: "a", delay: 300 } },
    );

    rerender({ value: "ab", delay: 300 });
    act(() => jest.advanceTimersByTime(100));

    rerender({ value: "abc", delay: 300 });
    act(() => jest.advanceTimersByTime(100));

    expect(result.current).toBe("a");

    act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe("abc");
  });
});
