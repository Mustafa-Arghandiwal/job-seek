import { createPortal } from "react-dom"
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "../Candidate/socialMediaSvgs"
import { useEffect, useRef, useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { CloseXIcon } from "../../utils/svgs"


export default function CandidateProfileModal({ showModal, setShowModal, candidate, coverLetter, savedCandidates }) {

    const root = document.getElementById("react-portal-root")

    const candidateId = candidate?.candidate[0].id ? candidate.candidate[0].id : null
    const [bookmarked, setBookmarked] = useState(false)
    useEffect(() => {
        if (candidateId) {
            setBookmarked(savedCandidates.includes(candidateId))
        }
    }, [candidateId, savedCandidates])

    const handleBookmark = () => {
        setBookmarked(prev => !prev)

        router.post(`/employer/saved-candidates/${candidateId}`, {}, {
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

    const modalRef = useRef(null)
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)

    }, [])

    const candidateDetails = candidate?.candidate[0]
    const title = candidateDetails?.title
    const profilePicture = candidateDetails?.profile_picture ? "/storage/" + candidateDetails.profile_picture : "/chess_pattern.png"
    const biography = candidateDetails?.biography
    const dob = candidateDetails?.dob ? new Date(candidateDetails.dob).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }) : null
    const city = candidateDetails?.city
    const maritalStatus = candidateDetails?.marital_status
    const gender = candidateDetails?.gender
    const experience = candidateDetails?.experience
    const educations = candidateDetails?.education_level
    const website = candidateDetails?.website
    const phone = candidateDetails?.phone
    const email = candidateDetails?.email

    const socialLinks = candidate?.socialLinks ? candidate.socialLinks : []
    const socialIcons = socialLinks.map(link => {
        if (link.social_type === "LinkedIn") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <LinkedInIcon />
                </a>
            )

        } else if (link.social_type === "X") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <TwitterIcon />
                </a>
            )
        } else if (link.social_type === "GitHub") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <GitHubIcon />
                </a>
            )
        } else if (link.social_type === "Instagram") {
            return (
                <a href={link.url} target="_blank" key={link.id} className=" text-primary-50 hover:text-primary-100">
                    <InstagramIcon />
                </a>
            )
        }
        else {
            return null
        }
    })


    return (
        createPortal(
            <div className={`inset-0 bg-black/60  z-50  fixed flex justify-center items-center transition-opacity duration-200 ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

                <div ref={modalRef} className="relative w-[80vw] h-[80dvh] z-40  overflow-y-scroll scrollbar-custom rounded-xl p-6 sm:p-12 bg-white  ">


                    <div className="sticky z-10 flex justify-end -mt-2 sm:-mt-6 -mr-6 sm:-mr-9 -top-5 sm:-top-7">
                        <button type="button" onClick={() => setShowModal(false)} className="bg-primary-50 rounded-full grid place-items-center w-7 sm:w-10 h-7 sm:h-10  cursor-pointer active:scale-95">
                            <CloseXIcon className="text-primary-500 w-4 sm:w-6" />
                        </button>
                    </div>
                    {/* header */}
                    <div className="py-8  flex items-center flex-wrap gap-4 justify-center xs:justify-between ">

                        <div className="flex gap-6 items-center flex-col xs:flex-row">
                            <div className="h-20 min-w-20 bg-cover bg-center rounded-full " style={{ backgroundImage: `url(${profilePicture})` }}></div>
                            <div className=" flex flex-col gap-[10px] ">
                                <h2 className="text-2xl font-medium text-customGray-900 text-center xs:text-left">{candidateDetails?.full_name}</h2>
                                {title && <span className="block text-customGray-600 text-sm sm:text-base line-clamp-1">{title}</span>}

                            </div>
                        </div>

                        <div className="">
                            <div className="flex gap-1 xs:gap-3 flex-col items-center xs:flex-row">
                                <button
                                    onClick={handleBookmark}
                                    title={bookmarked ? "Remove from Saved Candidates" : "Add to Saved Candidates"} className="p-4 rounded-sm cursor-pointer hover:bg-primary-50">
                                    <svg width="18" height="18" viewBox="0 0 14 19" fill={`${bookmarked ? "#0A65CC" : "none"}`} xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13 18L6.99931 14.25L1 18V1.5C1 1.30109 1.07902 1.11032 1.21967 0.96967C1.36032 0.829018 1.55109 0.75 1.75 0.75H12.25C12.4489 0.75 12.6397 0.829018 12.7803 0.96967C12.921 1.11032 13 1.30109 13 1.5V18Z"
                                            stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                <div className="flex  flex-col items-center relative">
                                    <a href={email ? `mailto:${email}` : undefined}
                                        className={`${email ? "bg-primary-500 hover:bg-primary-600 cursor-pointer" : "bg-primary-200 cursor-default"} group flex gap-2 rounded-sm font-semibold text-white px-6 py-3 duration-150 text-nowrap`}>
                                        <svg className="text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 5.25L12 13.5L3 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.3628 12L3.23047 18.538" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20.7692 18.5381L13.6367 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Send Email
                                    </a>
                                    {!email &&
                                        <span className="text-center absolute -bottom-9 text-xs max-w-40 mt-1 block text-customGray-700 ">No email provided by candidate</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>




                    {/* middle section */}
                    <div className="flex flex-col lg:flex-row gap-10 mt-12  lg:justify-between ">

                        <div className="lg:max-w-[600px]  w-full ">
                            <div className="mt-4 min-h-[200px] sm:min-h-[365px]">
                                <h2 className="text-customGray-900 text-xl font-medium">Cover Letter</h2>
                                {coverLetter
                                    ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900 [&_a]:text-primary-500 [&_a]:underline"
                                        dangerouslySetInnerHTML={{ __html: coverLetter }} />
                                    : <p className="text-customGray-400 min-h-[200px] sm:min-h-[365px] mt-4">Not Provided</p>}

                            </div>

                            <hr className="mt-8 text-customGray-200"></hr>

                            <div className="mt-4 min-h-[200px] sm:min-h-[365px]">
                                <h2 className="text-customGray-900 text-xl font-medium">Biography</h2>
                                {biography
                                    ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900 [&_a]:text-primary-500 [&_a]:underline "
                                        dangerouslySetInnerHTML={{ __html: biography }} />
                                    : <p className="text-customGray-400 min-h-[200px] sm:min-h-[365px] mt-4">Not Provided</p>}

                            </div>

                            <hr className="mt-4 sm:mt-8 text-customGray-200"></hr>

                            <span className="text-customGray-700 text-sm  mt-8 block">Follow me on Social Media</span>

                            {socialIcons.length !== 0 ?

                                <div className="flex gap-3 mt-4 flex-wrap">
                                    {socialIcons}
                                </div>
                                :
                                <p className="text-customGray-400 text-sm mt-4">No social links added yet.</p>
                            }
                        </div>

                        <div className="">

                            <div className="space-y-3 sm:space-y-0  max-w-[340px] w-full flex  flex-col sm:flex-row flex-wrap gap-4  p-4 sm:p-8 border border-primary-200  rounded-lg">

                                <div className=" min-w-32 ">
                                    <div className="flex sm:flex-col items-center sm:items-start gap-2">
                                        <img className="w-6 h-6" src="/candidate-profile-icons/cake.png" />
                                        <p className="text-xs mt-2 text-customGray-500 max-w-32">DATE OF BIRTH</p>
                                    </div>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${dob ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{dob || "Not provided"}</p>
                                </div>

                                <div className=" min-w-32 ">
                                    <div className="flex sm:flex-col items-center sm:items-start gap-2">
                                        <img className="w-6 h-6" src="/candidate-profile-icons/location.png" />
                                        <p className="text-xs mt-2 text-customGray-500 max-w-32">CITY</p>
                                    </div>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${city ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{dob || "Not provided"}</p>
                                </div>



                                <div className=" min-w-32 ">
                                    <div className="flex sm:flex-col items-center sm:items-start gap-2">
                                        <img className="w-6 h-6" src="/candidate-profile-icons/marital-status.png" />
                                        <p className="text-xs mt-2 text-customGray-500 max-w-32">MARITAL STATUS</p>
                                    </div>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${maritalStatus ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{maritalStatus || "Not provided"}</p>
                                </div>

                                <div className=" min-w-32 ">
                                    <div className="flex sm:flex-col items-center sm:items-start gap-2">
                                        <img className="w-6 h-6" src="/candidate-profile-icons/gender.png" />
                                        <p className="text-xs mt-2 text-customGray-500 max-w-32">GENDER</p>
                                    </div>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${gender ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{gender || "Not provided"}</p>
                                </div>

                                <div className=" min-w-32 ">
                                    <div className="flex sm:flex-col items-center sm:items-start gap-2">
                                        <img className="w-6 h-6" src="/candidate-profile-icons/experience.png" />
                                        <p className="text-xs mt-2 text-customGray-500 max-w-32">EXPERIENCE</p>
                                    </div>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${experience ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{experience || "Not provided"}</p>
                                </div>


                                <div className=" min-w-32 ">
                                    <div className="flex sm:flex-col items-center sm:items-start gap-2">
                                        <img className="w-6 h-6" src="/candidate-profile-icons/grad-cap.png" />
                                        <p className="text-xs mt-2 text-customGray-500 max-w-32">EDUCATIONS</p>
                                    </div>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${educations ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{educations || "Not provided"}</p>
                                </div>

                            </div>



                            {/*contact info*/}
                            <div className="border border-primary-200 rounded-lg p-8 mt-6 max-w-[340px]  w-full">

                                <h3 className="text-customGray-900 font-medium text-xl ">Contact Information</h3>

                                <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                    <div className="w-8 h-8 shrink-0">
                                        <img src="/single-employer-view-icons/website.png" className="-0" />
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-customGray-500">WEBSITE</p>
                                        <p className={`mt-2 text-sm max-w-[290px] break-all ${website ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{website || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                    <div className="w-8 h-8 shrink-0">
                                        <img src="/single-employer-view-icons/phone.png" className="" />
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-customGray-500">PHONE</p>
                                        <p className={`mt-2 text-sm max-w-[290px] break-all ${phone ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{phone || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-6 ">
                                    <div className="w-8-h-8 shrink-0">
                                        <img src="/single-employer-view-icons/envelope.png" className="shrink-0" />
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-customGray-500">EMAIL ADDRESS</p>
                                        <p className={`mt-2 text-sm max-w-[290px] break-all ${email ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{email || "Not provided"}</p>
                                    </div>
                                </div>

                            </div>



                        </div>

                    </div>




                </div>

            </div>, root

        )
    )
}
