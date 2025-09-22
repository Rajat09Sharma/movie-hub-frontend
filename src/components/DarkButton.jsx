

export const DarkButton = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className=" w-10/12 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer md:w-fit ">
            {children}
        </button>
    )
}
