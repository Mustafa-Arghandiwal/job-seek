import { router } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import { shortenFilename } from "../utils/shortenFilename"
import { DocumentIcon, EyeIcon, TrashIcon } from "../utils/svgs"


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

    const handlePreview = () => {
        //This is for when the resume was served public
        // const pdfUrl = `${import.meta.env.VITE_STORAGE_URL}/${props.path}`
        // window.open(pdfUrl, '_blank').focus()

        window.open(`/candidate/settings/profile/resume/${props.id}`, '_blank')


    }



    return (
        <form onSubmit={handleDelete} className="relative w-72 max-h-20 flex-initial  p-5 flex items-center justify-between bg-customGray-50/50 rounded-md hover:shadow-lg hover:bg-customGray-50 duration-150">
            <div className="flex  items-center gap-3 ">
                <DocumentIcon className="shrink-0" />
                <div className="flex flex-col gap-1 ">
                    <p className="text-customGray-900 break-all line-clamp-2  text-sm font-medium" title={props.fileName}>{shortenFilename(props.fileName, 27)}</p>
                    <span className="text-customGray-600 text-sm">{fileSize}</span>
                </div>
            </div>


            <button type="button" ref={threeDotsBtnRef} onClick={() => setShowDeleteBtn(prev => !prev)} className="shrink-0 cursor-pointer active:scale-110">
                <img src="/three_dots.png" />
            </button>


            <div ref={deleteModalRef} className={`bg-white min-w-32 rounded-md absolute right-5 top-2/3 shadow-lg z-10 ${showDeleteBtn ? 'max-h-40 py-2' : 'max-h-0 py-0'} overflow-hidden transition-all duration-75`}>

                <button type="button" onClick={handlePreview}
                    className="text-primary-500 flex gap-1 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                    <EyeIcon className="h-5 w-5"/>
                    <span className="text-sm font-medium">View</span>
                </button>

                <button className=" text-danger-500 flex gap-1 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                    <TrashIcon />
                    <span className="text-sm font-medium ">Delete</span>
                </button>

            </div>

        </form>

    )
}



