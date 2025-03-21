import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ["movies", "playing"],
        queryFn: getMovies,
    });
    console.log(data, isLoading);
    return <div className="bg-gray-400 h-[200vh]">Home</div>;
}
