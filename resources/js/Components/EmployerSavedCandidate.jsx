
import { router } from "@inertiajs/react"
import { useEffect, useState } from "react"
import CandidateProfileModal from "../Pages/General/CandidateProfileModal"
import SavedCandidateProfileModal from "../Pages/General/SavedCandidateProfileModal"
import { BookmarkIcon, RightArrowIcon} from "../utils/svgs"


export default function EmployerSavedCandidate(props) {


    const [showModal, setShowModal] = useState(false)
    const [candidate, setCandidate] = useState(null)
    useEffect(() => {
        if (showModal) {
            fetch(`/employer/saved-candidates/${props.candidateId}`)
                .then(res => res.json())
                .then(data => setCandidate(data))
        }

    }, [showModal])



    const [bookmarked, setBookmarked] = useState(true)
    const handleBookmark = () => {
        setBookmarked(prev => !prev)

        router.post(`/employer/saved-candidates/${props.candidateId}`, {}, {
            onSuccess: (page) => {
                if (page.props?.bookmarked !== undefined) {
                    setBookmarked(page.props.bookmarked)
                }
            },
            onError: () => {
                setBookmarked(prev => !prev)
            }
        })
    }

    return (
        <div className=" relative border-b border-customGray-100 border border-t-transparent border-x-transparent hover:rounded-lg  hover:border-primary-500 flex min-w-[260px]  sm:w-full justify-between gap-3 flex-col sm:flex-row items-center p-4 duration-150 ">
            <div className="flex gap-5">
                <div
                    className="h-16 min-w-16 bg-cover bg-center rounded-sm"
                    style={{ backgroundImage: `url(${props.profilePic})` }}
                ></div>
                <div className="  flex flex-col gap-3.5">
                    <div className="flex gap-1 flex-col break-words">
                        <h4 title={props.name} className="text-center sm:text-left text-customGray-900 text-lg font-medium  line-clamp-3">{props.name}</h4>
                        <span className="block text-customGray-500 text-sm text-center sm:text-left">{props.title}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 items-center mx-auto sm:mx-0 ">
                <button
                    onClick={handleBookmark}
                    title={bookmarked ? "Remove from Saved Jobs" : "Add to Saved Jobs"} className="p-4  rounded-sm cursor-pointer hover:bg-primary-50">
                    <BookmarkIcon bookmarked={bookmarked} className="text-primary-500" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); setShowModal(true) }}
                    className="group disabled:cursor-auto   flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    View Profile
                    <RightArrowIcon className="w-6 h-6 text-primary-500 group-disabled:text-primary-200 group-hover:text-white duration-150" />
                </button>

            </div>


            <SavedCandidateProfileModal showModal={showModal} setShowModal={setShowModal}
                candidateData={candidate}
                // savedCandidates={props.savedCandidates}
            />
        </div>
    )
}
