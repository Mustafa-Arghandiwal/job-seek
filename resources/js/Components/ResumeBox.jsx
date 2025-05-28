import { useEffect, useRef, useState } from "react"


export default function ResumeBox(props) {


    const [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const deleteModalRef = useRef(null)
    const threeDotsBtnRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (deleteModalRef.current && !deleteModalRef.current.contains(e.target) && threeDotsBtnRef && !threeDotsBtnRef.current.contains(e.target)) {
                setShowDeleteBtn(false)
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)

    })


    let fileSize
    if (props.size === 0) {
        fileSize = "0 Bytes"
    } else if (props.size < 1024) {
        fileSize = props.size + " Bytes"
    } else if (props.size < 1024 * 1024) {
        fileSize = (props.size / 1024).toFixed(1) + " KB"
    } else if (props.size >= 1024 * 1024) {
        fileSize = (props.size / (1024 * 1024)).toFixed(1) + " MB"
    }

    const handleDelete = (e) => {
        e.preventDefault()
        props.setSuccessMsg()
        props.delete(`/candidate/settings/profile/resumes/${props.id}`)
    }

    return (
        <form onSubmit={handleDelete} className="relative w-72 max-h-20 flex-initial  p-5 flex items-center justify-between bg-customGray-50/50 rounded-md hover:shadow-lg hover:bg-customGray-50 duration-150">
            <div className="flex  items-center gap-3 ">
                <svg className="shrink-0" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.999 28H6.99805C6.73283 28 6.47848 27.8946 6.29094 27.7071C6.1034 27.5196 5.99805 27.2652 5.99805 27V5C5.99805 4.73478 6.1034 4.48043 6.29094 4.29289C6.47848 4.10536 6.73283 4 6.99805 4H18.999L25.999 11V27C25.999 27.1313 25.9732 27.2614 25.9229 27.3827C25.8727 27.504 25.799 27.6143 25.7061 27.7071C25.6133 27.8 25.503 27.8736 25.3817 27.9239C25.2604 27.9741 25.1303 28 24.999 28Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 4V11H26.001" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 17H20" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 21H20" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex flex-col gap-1 ">
                    <p className="text-customGray-900  text-sm font-medium" title={props.fileName}>{props.shortenFilename(props.fileName, 27)}</p>
                    <span className="text-customGray-600 text-sm">{fileSize}</span>
                </div>
            </div>


            <button type="button" ref={threeDotsBtnRef} onClick={() => setShowDeleteBtn(prev => !prev)} className="shrink-0 cursor-pointer active:scale-110">
                <img src="/three_dots.png" />
            </button>


            <div ref={deleteModalRef} className={`bg-white  min-w-32 rounded-md absolute right-5 top-2/3 shadow-lg z-10 ${showDeleteBtn ? 'max-h-40 py-2' : 'max-h-0 py-0'} overflow-hidden transition-all duration-75  `}>

                <button type="button" className="text-primary-500 flex gap-1 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3.54108C3.75 3.54108 1.25 10 1.25 10C1.25 10 3.75 16.4577 10 16.4577C16.25 16.4577 18.75 10 18.75 10C18.75 10 16.25 3.54108 10 3.54108Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 13.1251C11.7259 13.1251 13.125 11.726 13.125 10.0001C13.125 8.27417 11.7259 6.87506 10 6.87506C8.27411 6.87506 6.875 8.27417 6.875 10.0001C6.875 11.726 8.27411 13.1251 10 13.1251Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium">Preview</span>
                </button>

                <button className=" text-danger-500 flex gap-1 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.875 4.375L3.125 4.37501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.125 8.125V13.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.875 8.125V13.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.625 4.375V16.25C15.625 16.4158 15.5592 16.5747 15.4419 16.6919C15.3247 16.8092 15.1658 16.875 15 16.875H5C4.83424 16.875 4.67527 16.8092 4.55806 16.6919C4.44085 16.5747 4.375 16.4158 4.375 16.25V4.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.125 4.375V3.125C13.125 2.79348 12.9933 2.47554 12.7589 2.24112C12.5245 2.0067 12.2065 1.875 11.875 1.875H8.125C7.79348 1.875 7.47554 2.0067 7.24112 2.24112C7.0067 2.47554 6.875 2.79348 6.875 3.125V4.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-medium ">Delete</span>
                </button>

            </div>

        </form>

    )
}



