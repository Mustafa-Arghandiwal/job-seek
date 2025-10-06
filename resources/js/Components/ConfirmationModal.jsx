import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DangerIcon } from "../utils/svgs";



export default function ConfirmationModal(props) {



    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if ((modalRef.current && !modalRef.current.contains(e.target)) && (props.expireJobBtn.current && !props.expireJobBtn.current.contains(e.target))) {
                props.setShowModal(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const root = document.getElementById("react-portal-root")
    return createPortal(

        // wrapper
        <div className={`fixed inset-0 z-[100] flex items-center justify-center ${props.showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>

            {/* overlay */}
            <div className={`absolute inset-0 bg-black/70  backdrop:blur-sm  `}>
            </div>


            <div ref={modalRef} role="dialog" aria-modal="true" className="shadow-2xl z-50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 justify-center items-center max-w-80 min-w-60  text-center
           bg-white rounded-md px-4 py-5 ">

                <DangerIcon className="w-16 h-16" />


                <div>
                    <p className="text-customGray-900 font-medium text-xl">Are you sure you want to expire this job?</p>
                    <p className="text-customGray-900 text-sm">The job will no longer be visible to candidates and no new applications can be submitted.</p>
                </div>

                <div className="flex gap-3">
                    <button type="button" onClick={() => props.setShowModal(false)}
                        className="cursor-pointer border border-customGray-100 hover:bg-customGray-50 rounded-md font-medium text-customGray-900 py-2 px-0.5 min-w-28 duration-100">
                        Cancel
                    </button>

                    <button onClick={()=>{props.handleExpireJob(); props.setShowModal(false)}}
                        className="rounded-md  py-2 px-0.5 min-w-28 bg-danger-500 text-white cursor-pointer hover:bg-danger-600 duration-100">
                        Yes
                    </button>
                </div>
            </div>

        </div>,
        root
    )
}
