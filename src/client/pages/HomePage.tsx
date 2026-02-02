import { useEffect, useState } from "react";
import { getPopularFilms, getTopRatedFilms, getUpcomingFilms } from "../../shared/api";
import { type Film } from "../../shared/types";

export default function HomePage() {
  const [popular, setPopular] = useState<Film[]>([]);
  const [topRated, setTopRated] = useState<Film[]>([]);
  const [upcoming, setUpcoming] = useState<Film[]>([]);

  useEffect(() => {
    getPopularFilms().then(setPopular);
    getTopRatedFilms().then(setTopRated);
    getUpcomingFilms().then(setUpcoming);
  }, []);

  return (
    <>
      <h1>Films</h1>

      <h2>Popular</h2>
      {popular.map(f => <div key={f.id}>{f.title}</div>)}

      <h2>Top Rated</h2>
      {topRated.map(f => <div key={f.id}>{f.title}</div>)}

      <h2>Upcoming</h2>
      {upcoming.map(f => <div key={f.id}>{f.title}</div>)}
    </>
  );
}
