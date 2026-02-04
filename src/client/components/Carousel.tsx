import { useEffect, useRef } from "react";
import {type Film } from "../../shared/types";
import FilmCard from "./FilmCard";

interface Props {
  title: string;
  films: Film[];
  category: string;
}


export default function Carousel({ title, films, category }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const formatCategory = (c?: string) =>
    c ? c.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()) : "";

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    const scrollSpeed = 1;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const interval = setInterval(() => {
      scrollPos += scrollSpeed;
      if (scrollPos > maxScroll) {
        scrollPos = 0;
      }
      scrollContainer.scrollLeft = scrollPos;
    }, 30);

    return () => clearInterval(interval);
  }, [films]);

  return (
    <section className="carousel">
      <h2 className="carousel-title">
       
        {category && (
          <span className={`carousel-badge ${category}`}>{formatCategory(category)}</span>
        )}
      </h2>

      <div className="carousel-row" ref={scrollRef} data-testid="carousel-row">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} category={category} />
        ))}
      </div>
    </section>
  );
}
