import { useQuery } from "@tanstack/react-query";
import { getImages, getMovies, IGetMovies } from "../api";

export default function Home() {
  const { data, isLoading } = useQuery<IGetMovies>({
    queryKey: ["movies", "playing"],
    queryFn: getMovies,
  });
  console.log(data, isLoading);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-[200vh]">
          <div>
            <div
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
          </div>
        </div>
      )}
    </>
  );
}
