import { useEffect, useRef } from "react"



export default function DeleteModal(props) {

    const modalRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if ((modalRef.current && !modalRef.current.contains(e.target) && (props.deleteAccountBtnRef.current && !props.deleteAccountBtnRef.current.contains(e.target)))) {
                props.setShowDeleteModal(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])



    return (

        // wrapper
        <div className={`fixed inset-0 z-40 flex items-center justify-center ${props.showDeleteModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>

            {/* overlay */}
            <div  className={`absolute inset-0 bg-black/70  backdrop:blur-sm  `}>
            </div>


            <div ref={modalRef} role="dialog" aria-modal="true" className="shadow-2xl z-50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 justify-center items-center max-w-80 min-w-60  text-center
           bg-white rounded-md px-4 py-5 ">

                <svg className="w-16 h-16" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2888 3.85999L1.8188 18C1.64417 18.3024 1.55177 18.6453 1.55079 18.9945C1.54981 19.3437 1.64029 19.6871 1.81323 19.9905C1.98616 20.2939 2.23553 20.5467 2.53651 20.7238C2.83749 20.9009 3.1796 20.9962 3.5288 21H20.4688C20.818 20.9962 21.1601 20.9009 21.4611 20.7238C21.7621 20.5467 22.0114 20.2939 22.1844 19.9905C22.3573 19.6871 22.4478 19.3437 22.4468 18.9945C22.4458 18.6453 22.3534 18.3024 22.1788 18L13.7088 3.85999C13.5305 3.5661 13.2795 3.32311 12.98 3.15447C12.6805 2.98584 12.3425 2.89725 11.9988 2.89725C11.6551 2.89725 11.3171 2.98584 11.0176 3.15447C10.7181 3.32311 10.4671 3.5661 10.2888 3.85999Z" fill="#E05151" />
                    <path d="M12 9V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 17H12.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>


                <div>
                    <p className="font-bold text-lg text-customGray-900 ">Delete Account</p>
                    <p className="text-customGray-900">You are going to delete this account. Are you sure?</p>
                </div>

                <div className="flex gap-3">
                    <button type="button" onClick={() => props.setShowDeleteModal(false)}
                        className="cursor-pointer border border-customGray-100 hover:bg-customGray-50 rounded-md font-medium text-customGray-900 py-2 px-0.5 min-w-28 duration-100">
                        No, Keep It.
                    </button>

                    <button
                        className="rounded-md  py-2 px-0.5 min-w-28 bg-danger-500 text-white cursor-pointer hover:bg-danger-600 duration-100">
                        Yes, Delete!
                    </button>
                </div>
            </div>



        </div>
    )
}
