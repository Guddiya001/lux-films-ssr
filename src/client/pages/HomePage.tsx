import { useEffect, useState } from "react";
import {
  getPopularFilms,
  getTopRatedFilms,
  getUpcomingFilms
} from "../../api"; 

import {type Film } from "../../shared/types";
import Carousel from "../components/Carousel";

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
      <h1 style={{paddingLeft:'20px'}}>Welcome to Lux Films</h1>
    <Carousel title="Popular" films={popular} category="popular" />
    <Carousel title="Top Rated" films={topRated} category="topRated" />
    <Carousel title="Upcoming" films={upcoming} category="upcoming" />

    </>
  );
}
