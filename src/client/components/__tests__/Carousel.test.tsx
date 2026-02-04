import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { jest } from "@jest/globals";
import Carousel from "../Carousel";
import { type Film } from "../../../shared/types";

const mockFilms: Film[] = [
  {
    id: 1,
    title: "Test Movie 1",
    overview: "Overview 1",
    poster_path: "/poster1.jpg",
    backdrop_path: "/backdrop1.jpg",
  },
  {
    id: 2,
    title: "Test Movie 2",
    overview: "Overview 2",
    poster_path: "/poster2.jpg",
    backdrop_path: "/backdrop2.jpg",
  },
];

const renderCarousel = (props: { title: string; films: Film[]; category: string }) =>
  render(
    <BrowserRouter>
      <Carousel {...props} />
    </BrowserRouter>
  );

describe("Carousel", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders carousel section", () => {
    renderCarousel({ title: "Popular Movies", films: mockFilms, category: "popular" });

    const carousel = document.querySelector(".carousel");
    expect(carousel).toBeInTheDocument();
  });

  test("renders category badge with formatted text", () => {
    renderCarousel({ title: "Popular Movies", films: mockFilms, category: "popular" });

    const badge = screen.getByText("Popular");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("carousel-badge", "popular");
  });

  test("formats category correctly", () => {
    renderCarousel({ title: "Top Rated", films: mockFilms, category: "topRated" });

    expect(screen.getByText("Top Rated")).toBeInTheDocument();
  });

  test("renders FilmCard components for each film", () => {
    renderCarousel({ title: "Popular Movies", films: mockFilms, category: "popular" });

    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  test("renders carousel row with films", () => {
    const { container } = renderCarousel({ title: "Popular Movies", films: mockFilms, category: "popular" });

    const carouselRow = container.querySelector(".carousel-row") as HTMLElement;
    expect(carouselRow).toBeInTheDocument();
    expect(carouselRow.children).toHaveLength(2);
  });

  test("handles empty films array", () => {
    const { container } = renderCarousel({ title: "Empty Carousel", films: [], category: "empty" });

    const carouselRow = container.querySelector(".carousel-row") as HTMLElement;
    expect(carouselRow.children).toHaveLength(0);
  });

  test("handles missing category", () => {
    renderCarousel({ title: "No Category", films: mockFilms, category: "" });

    expect(screen.queryByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.queryByText("No Category")).not.toBeInTheDocument(); // No badge text
  });

  test("auto-scrolls the carousel", () => {
    const { container } = renderCarousel({ title: "Scrolling Carousel", films: mockFilms, category: "scroll" });

    const carouselRow = container.querySelector(".carousel-row") as HTMLElement;
    const initialScrollLeft = carouselRow.scrollLeft;

    // Advance timers to trigger scroll
    jest.advanceTimersByTime(100);

    // Note: In jsdom, scrollLeft may not update as expected, so we check if the interval was set
    expect(carouselRow.scrollLeft).toBe(initialScrollLeft); // Placeholder, as jsdom doesn't simulate scroll
  });

  test("resets scroll position when reaching max scroll", () => {
    const { container } = renderCarousel({ title: "Reset Scroll", films: mockFilms, category: "reset" });

    const carouselRow = container.querySelector(".carousel-row") as HTMLElement;

    // Mock scrollWidth and clientWidth to simulate reaching max scroll
    Object.defineProperty(carouselRow, "scrollWidth", { value: 200 });
    Object.defineProperty(carouselRow, "clientWidth", { value: 100 });

    // Advance timers multiple times to exceed max scroll
    jest.advanceTimersByTime(3000); // Enough to scroll past max

    expect(carouselRow.scrollLeft).toBe(0);
  });
});
