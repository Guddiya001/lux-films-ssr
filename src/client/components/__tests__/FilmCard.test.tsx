import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FilmCard from "../FilmCard";

const mockFilm = {
  id: 1,
  title: "Test Movie",
  overview: "Test",
  poster_path: "/test.jpg",
  backdrop_path: ""
};

test("renders film title", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  expect(screen.getByText("Test Movie")).toBeInTheDocument();
});

test("renders film poster", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  const img = screen.getByAltText("Test Movie");
  expect(img).toBeInTheDocument();
  expect(img.getAttribute("src")).toContain("/test.jpg");
});

test("film card link contains film id", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  const link = screen.getByRole("link");
  expect(link.getAttribute("href")).toContain("/film/1");
});

test("renders without crashing with minimal props", () => {
  render(
    <BrowserRouter>
      <FilmCard
        film={{ id: 2, title: "Another Movie", overview: "", poster_path: "", backdrop_path: "" }}
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Another Movie")).toBeInTheDocument();
});

test("includes category in link href when provided", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} category="popular" />
    </BrowserRouter>
  );

  const link = screen.getByRole("link");
  expect(link.getAttribute("href")).toBe("/film/1?category=popular");
});

test("link href has empty category when category is not provided", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  const link = screen.getByRole("link");
  expect(link.getAttribute("href")).toBe("/film/1?category=undefined");
});

test("image src is constructed correctly with TMDB base URL", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  const img = screen.getByAltText("Test Movie");
  expect(img.getAttribute("src")).toBe("https://image.tmdb.org/t/p/w200/test.jpg");
});

test("film card has correct class name", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  const link = screen.getByRole("link");
  expect(link).toHaveClass("film-card");
});

test("handles film with missing poster_path", () => {
  const filmWithoutPoster = { ...mockFilm, poster_path: "" };

  render(
    <BrowserRouter>
      <FilmCard film={filmWithoutPoster} />
    </BrowserRouter>
  );

  const img = screen.getByAltText("Test Movie");
  expect(img.getAttribute("src")).toBe("https://image.tmdb.org/t/p/w200");
});

test("renders film title in paragraph element", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  const titleElement = screen.getByText("Test Movie");
  expect(titleElement.tagName).toBe("P");
});

test("link is navigable", () => {
  render(
    <BrowserRouter>
      <FilmCard film={mockFilm} />
    </BrowserRouter>
  );

  const link = screen.getByRole("link");
  expect(link).toBeInTheDocument();
  expect(link.getAttribute("href")).toBe("/film/1?category=undefined");
});
