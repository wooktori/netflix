import { useQuery } from "@tanstack/react-query";
import { getImages, getMovies, IGetMovies } from "../api";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const sliderVar = {
  hidden: { x: "calc(100% + 0.25rem)" },
  visible: { x: 0 },
  exit: { x: "calc(-100% - 0.25rem)" },
};
const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { type: "tween", delay: 0.5, duration: 0.3 },
  },
};
const titleVar = {
  hover: { opacity: 1, transition: { delay: 0.5, duration: 0.3 } },
};

const offset = 6;

export default function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMovies>({
    queryKey: ["movies", "playing"],
    queryFn: getMovies,
  });
  const [index, setIndex] = useState(0);
  const [isEnd, setisEnd] = useState(false);
  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +movieMatch.params.movieId!);

  const increaseIndex = () => {
    if (data) {
      if (isEnd) return;
      toggleEnd();
      const totalMovie = data.results.length - 1;
      const page = Math.floor(totalMovie / offset) - 1;
      setIndex((prev) => (prev === page ? 0 : prev + 1));
    }
  };
  const toggleEnd = () => setisEnd((prev) => !prev);
  const boxClick = (id: number) => {
    navigate(`/movies/${id}`);
  };
  const overLayClick = () => {
    navigate("/");
  };
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-[200vh] overflow-x-hidden">
          <div
            onClick={increaseIndex}
            className={`h-dvh bg-cover flex flex-col justify-center p-14 text-white-first`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${getImages(
                data?.results[0].backdrop_path || ""
              )})`,
            }}
          >
            <div className="text-6xl mb-10">{data?.results[0].title}</div>
            <div className="text-2xl w-1/2">{data?.results[0].overview}</div>
          </div>
          <div className="relative -top-20">
            <AnimatePresence onExitComplete={toggleEnd} initial={false}>
              <motion.div
                variants={sliderVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 1 }}
                key={index}
                className="grid grid-cols-6 gap-1 absolute w-full boxes"
              >
                {data?.results
                  .slice(1)
                  .slice(index * offset, index * offset + offset)
                  .map((movie) => (
                    <motion.div
                      layoutId={movie.id + ""}
                      key={movie.id}
                      onClick={() => boxClick(movie.id)}
                      variants={boxVar}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      className=" text-white h-48 bg-cover bg-center cursor-pointer"
                      style={{
                        backgroundImage: `url(${getImages(
                          movie.backdrop_path || "",
                          "w500"
                        )})`,
                      }}
                    >
                      <motion.div
                        variants={titleVar}
                        className="p-2 bg-inherit absolute w-full bottom-0 text-white text-center opacity-0"
                      >
                        <div>{movie.title}</div>
                      </motion.div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {movieMatch ? (
              <>
                <motion.div
                  onClick={overLayClick}
                  className="fixed top-0 w-full h-full bg-black/50 opacity-0"
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <motion.div
                  layoutId={movieMatch.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                  className="w-2/5 h-4/5 bg-black-third absolute left-0 right-0 m-auto rounded-2xl overflow-hidden "
                >
                  {clickedMovie && (
                    <>
                      <div
                        className="w-full bg-cover bg-center h-96"
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${getImages(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <div className="text-white-second p-4 text-4xl relative -top-20">
                        {clickedMovie.title}
                      </div>
                      <div className="text-white-second p-4 relative -top-20 ">
                        {clickedMovie.overview}
                      </div>
                    </>
                  )}
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
