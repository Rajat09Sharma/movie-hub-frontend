import { useNavigate } from "react-router-dom"

export const MovieCard = ({ id, title, description, userName }) => {


    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${id}`);
    }

    return (
        <div className="w-full text-white bg-gray-800 rounded-xl shadow-lg shadow-gray-600 cursor-pointer  transition-transform" onClick={handleClick}>
            <div className="p-4 space-y-5">
                <div className="mb-3 flex justify-between">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    {/* <div className="flex gap-2">
                        <p>up</p>
                        <p>down</p>
                    </div> */}
                </div>
                <p className="text-gray-400 text-sm mt-2">{description}</p>
                <p className="text-gray-500 text-xs mt-3 italic">
                    Recommended by {userName}
                </p>
            </div>
        </div>
    )
}
