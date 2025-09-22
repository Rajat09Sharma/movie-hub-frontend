

export const LightButton = ({ children, onClick }) => {
    return (
        <button className="w-10/12 bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold cursor-pointer md:w-fit" onClick={onClick}>
            {children}
        </button>
    )
}
