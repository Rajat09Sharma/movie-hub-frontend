import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"


export const Modal = ({ children, open, onClose }) => {

    const dialogRef = useRef();

    useEffect(() => {
        if (open) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [open])

    return createPortal(
        <>
            <dialog ref={dialogRef} className="w-[90%] max-w-md m-auto rounded-lg p-6 bg-white text-slate-900 [&::-webkit-backdrop]:bg-black/60 [&::backdrop]:bg-black/60 shadow-2xl border-none"
            >
                <header className="flex justify-end mb-4">
                    <button onClick={onClose} className="p-2 rounded hover:bg-slate-100 cursor-pointer"> ✕</button>
                </header>
                <div className="space-y-4">

                    {children}
                </div>
            </dialog>
        </>,
        document.getElementById("modal")
    )
}
