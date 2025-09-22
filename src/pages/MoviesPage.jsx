import { useEffect } from "react";
import { MovieCard } from "../components/MovieCard"
import { useFetch } from "../hooks/useFetch"

import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorBox } from "../components/ErrorBox";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";


export const MoviesPage = () => {

    const { loading, setLoading, fetchedData, setFetchedData, error, setError } = useFetch();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                //change axios to axiosprivate
                const response = await axiosPrivate.get("/movie", { withCredentials: true });
                console.log("fetch movies :", response.data);
                setFetchedData([...response.data.movies]);
            } catch (err) {
                console.log("fetch movies error", err);
                setError(err?.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [setError, setLoading, setFetchedData, axiosPrivate])

    return (
        <>
            <div className="min-h-screen px-3 py-4">
                {loading && <LoadingSpinner />}
                {!loading && error && <ErrorBox>{error}, please try again later.</ErrorBox>}
                {!loading && !error && <div className="w-11/12 mx-auto space-y-3.5">
                    {
                        fetchedData.map((movie) => <MovieCard key={movie._id} id={movie._id} title={movie.title} description={movie.description} userName={movie.user_id.name} />
                        )
                    }
                </div>
                }
            </div>
        </>
    )
}
