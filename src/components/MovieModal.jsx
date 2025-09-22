
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useFetch } from "../hooks/useFetch";
import { ErrorBox } from "./ErrorBox";
import { Modal } from "./Modal"


export const MovieModal = ({ open, onClose }) => {

    const { loading, setLoading, error, setError } = useFetch();
    const axiosPrivate = useAxiosPrivate();
    const navigate=useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);

        try {
            const response = await axiosPrivate.post("/movie", data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log("movie modal response", response.data);
            onClose();
            navigate("/movies");
        } catch (error) {
            console.log("Recomend Movie Modal error", error);
            setError(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }

        setTimeout(() => setError(""), 3000)
        event.target.reset();
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                {error && <ErrorBox>{error}</ErrorBox>}
                <h2 className="text-lg font-semibold text-center">Recommend a movie</h2>
                <form onSubmit={handleSubmit} className="flex-col justify-between space-y-2.5 border border-gray-500 p-4 rounded-md">
                    <div className='flex-col mb-4'>
                        <label className='text-lg font-medium px-2'>Title</label>
                        <input className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='text' name='title' placeholder='Enter title' />
                    </div>
                    <div className='flex-col mb-4'>
                        <label className='text-lg font-medium px-2'>Description</label>
                        <textarea className='w-full mt-2 py-3 px-2 bg-white border border-gray-400 rounded-md' type='text' cols={15} name='description' placeholder='Enter description' />
                    </div>
                    <div className="text-right space-x-2">
                        <button type="button" onClick={onClose} className="py-2 px-2 bg-red-400 text-white rounded-md cursor-pointer" disabled={loading ? true : false}>Cencel</button>
                        <button type="submit" className="py-2 px-2 bg-gray-600 text-white rounded-md cursor-pointer " disabled={loading ? true : false}>{loading ? "Recomending......." : "Recommend"}</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
