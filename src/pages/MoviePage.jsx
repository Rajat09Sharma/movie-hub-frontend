import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { CommentModal } from "../components/CommentModal";
import { useSelector } from "react-redux";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";

//Separation of concerns, cumbersome component.

export const MoviePage = () => {
    const { id } = useParams();
    const userId = useSelector(state => state.auth.userId);
    const role = useSelector(state => state.auth.role);
    const axiosPrivate = useAxiosPrivate();

    const { loading: movieLoading, setLoading: setMovieLoading, error: movieError, setError: setMovieError, fetchedData: movie, setFetchedData: setMovieData } = useFetch();
    const { loading: commentLoading, setLoading: setCommentLoading, error: commentError, setError: setCommentError, fetchedData: comments, setFetchedData: setComments } = useFetch();
    const { loading: deleteLoading, setLoading: setDeleteLoading, error: deleteError, setError: setDeleteError } = useFetch();
    const { loading: voteLoading, setLoading: setVoteLoading, error: voteError, setError: setVoteError, fetchedData: voteType, setFetchedData: setVoteType } = useFetch();


    const [reFetch, setRefetch] = useState(false);
    const [openAddCommentModal, setOpenAddCommentModal] = useState(false);
    const [openEditCommentModal, setOpenEditCommentModal] = useState(false);

    const handleCommentDelete = async (commentid) => {
        setDeleteLoading(true);
        try {
            const response = await axiosPrivate.delete(`/comment/${commentid}`, { withCredentials: true });
            console.log("delete comment response", response.data);
            setRefetch((prev) => !prev);
        } catch (error) {
            console.log("delete comment", error);
            // setDeleteError(error?.response?.data?.message || error.message);
        } finally {
            setDeleteLoading(false);
        }
    }

    const handleMovieVote = async (vote) => {
        setVoteLoading(true);
        try {
            const response = await axiosPrivate.post(`/vote/${id}`, { voteType: vote }, { withCredentials: true });
            console.log("vote on movie response", response.data);
            setVoteType(vote);
        } catch (error) {
            console.log("vote on movie error", error);
            // setDeleteError(error?.response?.data?.message || error.message);
        } finally {
            setVoteLoading(false);
        }
    }

    useEffect(() => {
        const fetchMovie = async () => {
            setMovieLoading(true);
            try {
                const response = await axiosPrivate.get(`/movie/${id}`, { withCredentials: true });
                console.log("movie ", response.data);
                setMovieData(response.data.movie);

            } catch (error) {
                console.log("fetch movie error", error);
                setMovieError(error?.response?.data?.message || error.message);

            } finally {
                setMovieLoading(false);
            }
        }
        fetchMovie();
    }, [axiosPrivate])

    useEffect(() => {
        const fetchcomment = async () => {
            setCommentLoading(true);
            try {
                const response = await axiosPrivate.get(`/comment/${id}`, { withCredentials: true });
                console.log("comment ", response.data);
                setComments(response.data.comments);

            } catch (error) {
                console.log("fetch movie error", error);
                setCommentError(error?.response?.data?.message || error.message);

            } finally {
                setCommentLoading(false);
            }
        }
        fetchcomment();
    }, [axiosPrivate, reFetch])

    return (
        <>
            <div className="min-h-screen py-4 px-3">
                {movieLoading && <LoadingSpinner />}
                {
                    !movieLoading && !movieError && <div className="w-full text-white bg-gray-800 rounded-xl shadow-lg shadow-gray-600 cursor-pointer  transition-transform">
                        <div className="p-4 space-y-5">
                            <div className="mb-3 flex justify-between">
                                <h3 className="text-xl font-semibold">{movie.title}</h3>
                                <div className="flex gap-2 items-center">
                                    <p className={`cursor-pointer ${voteType == 'up' ? 'text-green-500' : ''}`} onClick={() => handleMovieVote("up")}><FaRegThumbsUp /></p>
                                    <p className={`cursor-pointer ${voteType == 'down' ? 'text-red-500' : ''}`} onClick={() => handleMovieVote("down")}><FaRegThumbsDown /></p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">{movie.description}</p>
                            <p className="text-gray-500 text-xs mt-3 italic">
                                Recommended by {movie.user_id?.name}
                            </p>
                        </div>
                        <div className="mb-5 p-4 space-y-3">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-lg font-bold">Comments</p>
                                {role == "user" && <button onClick={() => setOpenAddCommentModal(true)} className="py-2 px-2 bg-gray-600 text-white rounded-md cursor-pointer ">Add Comment</button>}
                            </div>
                            {comments.length == 0 && <p>No comment on this movie yet.</p>}
                            <CommentModal open={openAddCommentModal} onClose={() => setOpenAddCommentModal(false)} comment={""} id={id} onRefetch={() => setRefetch((prev) => !prev)} />
                            {commentLoading && <LoadingSpinner />}
                            {!commentLoading && !commentError && <div className="text-black h-5/6 overflow-x-auto space-y-3">
                                {
                                    comments.map((comment) => <div key={comment._id} className="w-full px-3 py-4 border border-gray-600 bg-white rounded-md">
                                        <p className="text-lg font-medium">{comment.body}</p>
                                        <p className="text-gray-500 text-xs mt-3 italic">commented by {comment.user_id.name}</p>
                                        <CommentModal open={openEditCommentModal} onClose={() => setOpenEditCommentModal(false)} comment={comment.body} id={comment._id} onRefetch={() => setRefetch((prev) => !prev)} />
                                        {role == "user" && comment.user_id._id == userId && <div className="text-right space-x-2">
                                            <button type="button" onClick={() => setOpenEditCommentModal(true)} className="py-2 px-2 bg-gray-900 text-white rounded-md cursor-pointer ">Edit</button>
                                            <button type="button" className="py-2 px-2 bg-red-400 text-white rounded-md cursor-pointer" onClick={() => handleCommentDelete(comment._id)} disabled={deleteLoading ? true : false}>{deleteLoading ? "Deleting..." : "Delete"}</button>
                                        </div>}
                                        {role == "admin" && <div className="text-right">
                                            <button type="button" className="py-2 px-2 bg-red-400 text-white rounded-md cursor-pointer" onClick={() => handleCommentDelete(comment._id)} disabled={deleteLoading ? true : false}>{deleteLoading ? "Deleting..." : "Delete"}</button>
                                        </div>
                                        }
                                    </div>
                                    )
                                }
                            </div>}
                        </div>
                    </div>
                }
            </div >
        </>
    )
}
