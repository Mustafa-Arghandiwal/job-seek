import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEffect, useState } from "react"
import { DownloadIcon, EyeIcon, UserIcon } from "../utils/svgs"
import CandidateProfileModal from "../Pages/General/CandidateProfileModal"
import TextAvatar from "./TextAvatar"



export default function DashboardApplication(props) {

    const appDetails = props.appDetails
    const profilePic = appDetails.profile_picture
    const appliedAt = new Date(appDetails?.applied_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const [showModal, setShowModal] = useState(false)

    const [candidate, setCandidate] = useState(null)

    useEffect(() => {
        if (showModal) {
            fetch(`/employer/vacancies/${props.vacancyId}/applications/${appDetails.id}/candidate`)
                .then(res => res.json())
                .then(data => setCandidate(data))
            // .then(err => console.log(err))
        }

    }, [showModal])


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id, data: { type: "Application", details: appDetails } });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className={` border bg-white opacity-50 rounded-sm p-4 mt-3
                ${props.columnId === "all" ? "border-customGray-200" : "border-success-400"}`}>
                <div className="flex gap-3">
                    {profilePic ?
                        <div style={{ backgroundImage: `url(${"/storage/" + profilePic})` }} className="w-12 h-12 bg-cover bg-center rounded-full"></div>
                        :
                        <TextAvatar name={appDetails.full_name} className="h-12 min-w-12 rounded-full text-lg" />
                    }
                    <div>
                        <span className="block text-customGray-900 text-sm font-medium">{appDetails?.full_name || "Not provided"}</span>
                        <span className="mt-1 block text-sm text-customGray-500">{appDetails?.title || "Title not provided"}</span>
                    </div>
                </div>
                <hr className="mt-4 text-customGray-200" />

                <ul className="text-customGray-600 list-disc ml-4 mt-4 text-sm space-y-1">
                    {/* <li>City: {appDetails?.city || "Not provided"}</li> */}
                    {/* <li>Education: {appDetails?.education_level || "Not provided"}</li> */}
                    <li>Applied on {appliedAt}</li>
                </ul>

                <div className="flex flex-col gap-2 sm:gap-3 mt-3 flex-wrap">
                    <a className="flex w-fit gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500">
                        <DownloadIcon />
                        <span className="font-medium text-xs">Download CV</span>
                    </a>

                    <button className="w-fit flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500">
                        <EyeIcon className="w-[18px] h-[18px]" />
                        <span className="font-medium  text-xs">View CV</span>
                    </button>

                    <button
                        className="flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500 w-fit">
                        <UserIcon className="w-[18px] h-[18px]" />
                        <span className="  font-medium  text-xs">View Profile</span>
                    </button>
                </div>


            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...(showModal ? {} : listeners)} className={`mx-auto  bg-white rounded-sm p-4 mt-3 cursor-grab border
            ${props.columnId === "all" ? "border-customGray-200" : "border-success-400"}`}
        >
            <div className="flex gap-3">
                {profilePic ?
                    <div style={{ backgroundImage: `url(${"/storage/" + profilePic})` }} className="w-12 h-12 bg-cover bg-center rounded-full"></div>
                    :
                    <TextAvatar name={appDetails.full_name} className="h-12 min-w-12 rounded-full text-lg" />
                }
                <div>
                    <span className="block text-customGray-900 text-sm font-medium">{appDetails?.full_name || "Not provided"}</span>
                    <span className="mt-1 block text-sm text-customGray-500">{appDetails?.title || "Title not provided"}</span>
                </div>
            </div>
            <hr className="mt-4 text-customGray-200" />

            <ul className="text-customGray-600 list-disc ml-4 mt-4 text-sm space-y-1">
                {/* <li>City: {appDetails?.city || "Not provided"}</li> */}
                {/* <li>Education: {appDetails?.education_level || "Not provided"}</li> */}
                <li>Applied on {appliedAt}</li>
            </ul>


            <div className="flex flex-col gap-2 sm:gap-3 mt-3 flex-wrap">
                <a href={`/applications/${appDetails.id}/resume/download`} className="flex w-fit gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500">
                    <DownloadIcon />
                    <span className="font-medium text-xs">Download CV</span>
                </a>

                <button onClick={() => window.open(`/applications/${appDetails.id}/resume`, '_blank')} className="w-fit flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500">
                    <EyeIcon className="w-[18px] h-[18px]" />
                    <span className="font-medium  text-xs">View CV</span>
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); setShowModal(true) }}
                    className="flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500 w-fit">
                    <UserIcon className="w-[18px] h-[18px]" />
                    <span className="  font-medium  text-xs">View Profile</span>
                </button>
            </div>



            <CandidateProfileModal showModal={showModal} setShowModal={setShowModal} candidate={candidate} coverLetter={appDetails.cover_letter} savedCandidates={props.savedCandidates} />


        </div>

    )
}
