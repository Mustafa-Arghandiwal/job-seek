import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { router, usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "../Pages/Candidate/socialMediaSvgs"
import CandidateProfileModal from "../Pages/General/CandidateProfileModal"



export default function DashboardApplication(props) {

    const appDetails = props.appDetails
    const profilePic = appDetails?.profile_picture ? "/storage/" + appDetails.profile_picture : "/chess_pattern.png"
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
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={profilePic} className=" w-full h-full object-cover" />
                    </div>
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
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.71875 8.59375L10 11.8741L13.2812 8.59375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 3.125V11.8727" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.875 11.875V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-medium text-xs">Download CV</span>
                    </a>

                    <button className="w-fit flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-medium  text-xs">View CV</span>
                    </button>

                    <button
                        className="flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500 w-fit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                            <path d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
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
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={profilePic} className=" w-full h-full object-cover" />
                </div>
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
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.71875 8.59375L10 11.8741L13.2812 8.59375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 3.125V11.8727" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.875 11.875V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium text-xs">Download CV</span>
                </a>

                <button onClick={() => window.open(`/applications/${appDetails.id}/resume`, '_blank')} className="w-fit flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium  text-xs">View CV</span>
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); setShowModal(true) }}
                    className="flex gap-1 items-center cursor-pointer text-primary-600 hover:text-primary-500 w-fit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                        <path d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="  font-medium  text-xs">View Profile</span>
                </button>
            </div>



            <CandidateProfileModal showModal={showModal} setShowModal={setShowModal} candidate={candidate} coverLetter={appDetails.cover_letter} savedCandidates={props.savedCandidates} />


        </div>

    )
}
