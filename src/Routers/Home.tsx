import { useQuery } from "@tanstack/react-query";
import { getImages, getMovies, IGetMovies } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const sliderVar = {
    initial: { x: "calc(100% + 0.25rem)" },
    animate: { x: 0 },
    exit: { x: "calc(-100% - 0.25rem)" },
};
const boxVar = (isFirst: boolean, isLast: boolean) => ({
    initial: {
        scale: 1,
        transformOrigin: isFirst
            ? "left center"
            : isLast
            ? "right center"
            : "center center",
    },
    hover: {
        scale: 1.3,
        y: -50,
        transformOrigin: isFirst
            ? "left center"
            : isLast
            ? "right center"
            : "center center",
        transition: { type: "tween", delay: 0.5, duration: 0.3 },
    },
});
const titleVar = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { delay: 0.5, duration: 0.3 } },
};

const offset = 6;

export default function Home() {
    const { data, isLoading } = useQuery<IGetMovies>({
        queryKey: ["movies", "playing"],
        queryFn: getMovies,
    });
    const [index, setIndex] = useState(0);
    const [isEnd, setisEnd] = useState(false);
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
                        <div className="text-6xl mb-10">
                            {data?.results[0].title}
                        </div>
                        <div className="text-2xl w-1/2">
                            {data?.results[0].overview}
                        </div>
                    </div>
                    <div className="relative -top-20">
                        <AnimatePresence
                            onExitComplete={toggleEnd}
                            initial={false}
                        >
                            <motion.div
                                variants={sliderVar}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 1 }}
                                key={index}
                                className="grid grid-cols-6 gap-1 absolute w-full"
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(
                                        index * offset,
                                        index * offset + offset
                                    )
                                    .map((movie, i, array) => {
                                        const isFirst = i === 0;
                                        const isLast = i === array.length - 1;
                                        return (
                                            <motion.div
                                                variants={boxVar(
                                                    isFirst,
                                                    isLast
                                                )}
                                                initial="initial"
                                                whileHover="hover"
                                                transition={{ type: "tween" }}
                                                key={movie.id}
                                                className="text-white h-48 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${getImages(
                                                        movie.backdrop_path ||
                                                            "",
                                                        "w500"
                                                    )})`,
                                                }}
                                            >
                                                <motion.div
                                                    variants={titleVar}
                                                    className="p-2 bg-inherit absolute w-full bottom-0 text-white text-center"
                                                >
                                                    {movie.title}
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </>
    );
}
