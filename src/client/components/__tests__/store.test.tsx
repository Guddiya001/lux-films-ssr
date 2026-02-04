import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react";
import { WishlistProvider, useWishlist } from "../../../shared/store";
import { type Film } from "../../../shared/types";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const mockFilm: Film = {
  id: 1,
  title: "Test Movie",
  overview: "Test overview",
  poster_path: "/test.jpg",
  backdrop_path: "/backdrop.jpg",
};

const mockFilm2: Film = {
  id: 2,
  title: "Test Movie 2",
  overview: "Test overview 2",
  poster_path: "/test2.jpg",
  backdrop_path: "/backdrop2.jpg",
};

describe("WishlistProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
  });

  test("renders children", () => {
    render(
      <WishlistProvider>
        <div>Test Child</div>
      </WishlistProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("initializes with empty wishlist", () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    expect(result.current.items).toEqual([]);
  });

  test("loads wishlist from localStorage on mount", () => {
    const savedWishlist = [mockFilm];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedWishlist));

    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    expect(result.current.items).toEqual(savedWishlist);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("wishlist");
  });

  test("saves wishlist to localStorage when items change", () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    act(() => {
      result.current.addToWishlist(mockFilm);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "wishlist",
      JSON.stringify([mockFilm])
    );
  });

  test("addToWishlist adds film to wishlist", () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    act(() => {
      result.current.addToWishlist(mockFilm);
    });

    expect(result.current.items).toEqual([mockFilm]);
  });

  test("addToWishlist does not add duplicate films", () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    act(() => {
      result.current.addToWishlist(mockFilm);
      result.current.addToWishlist(mockFilm);
    });

    expect(result.current.items).toEqual([mockFilm]);
    expect(result.current.items).toHaveLength(1);
  });

  test("addToWishlist adds multiple different films", () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    act(() => {
      result.current.addToWishlist(mockFilm);
      result.current.addToWishlist(mockFilm2);
    });

    expect(result.current.items).toEqual([mockFilm, mockFilm2]);
    expect(result.current.items).toHaveLength(2);
  });

  test("useWishlist throws error when used outside provider", () => {
    expect(() => {
      renderHook(() => useWishlist());
    }).toThrow("useWishlist must be inside provider");
  });

  test("handles invalid localStorage data gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid json");

    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    expect(result.current.items).toEqual([]);
  });

  test("context value includes items and addToWishlist", () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    expect(result.current).toHaveProperty("items");
    expect(result.current).toHaveProperty("addToWishlist");
    expect(typeof result.current.addToWishlist).toBe("function");
    expect(Array.isArray(result.current.items)).toBe(true);
  });

  test("persists wishlist across re-renders", () => {
    const { result, rerender } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    act(() => {
      result.current.addToWishlist(mockFilm);
    });

    rerender();

    expect(result.current.items).toEqual([mockFilm]);
  });
});
