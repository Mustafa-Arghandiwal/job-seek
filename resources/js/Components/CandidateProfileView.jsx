import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "../Pages/Candidate/socialMediaSvgs"
import { CloseXIcon, RightArrowIcon } from "../utils/svgs"
import { Link } from "@inertiajs/react"


export default function CandidateProfileView({ candidateData, showModal, setShowModal, profileDropdownRef }) {

    const root = document.getElementById("react-portal-root")

    const modalRef = useRef(null)
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target) && profileDropdownRef && !profileDropdownRef.contains(e.target)) {
            setShowModal(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)

    }, [])

    const candidateDetails = candidateData?.candidate
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

    const socialLinks = candidateData?.socialLinks ? candidateData.socialLinks : []
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


                    <div className="sticky z-10 flex justify-end -mt-2 sm:-mt-6 -mr-5 sm:-mr-9 -top-5 sm:-top-7">
                        <button type="button" onClick={() => setShowModal(false)} className="bg-primary-50 rounded-full grid place-items-center w-7 sm:w-10 h-7 sm:h-10  cursor-pointer active:scale-95">
                            <CloseXIcon className="text-primary-500 w-4 sm:w-6" />
                        </button>
                    </div>
                    {/* header */}
                    <div className="py-8  flex items-center flex-col lg:flex-row gap-4 justify-center lg:justify-between ">

                        <div className="flex gap-6 items-center flex-col xs:flex-row ">
                            <div className="h-20 min-w-20 bg-cover bg-center rounded-full " style={{ backgroundImage: `url(${profilePicture})` }}></div>
                            <div className=" flex flex-col gap-[10px] text-center xs:text-left">
                                <h2 className="text-2xl font-medium text-customGray-900  ">{candidateDetails?.full_name}</h2>
                                {title && <span className="block text-customGray-600 text-sm sm:text-base line-clamp-1">{title}</span>}

                            </div>
                        </div>

                        <div className="flex flex-col gap-2 max-w-72 text-center items-center">
                            <p className="text-sm text-customGray-600">
                                This is how employers will see your profile when you apply for a job.
                            </p>
                            <Link onClick={() => setShowModal(false)} href="/candidate/dashboard/settings"
                            className="flex items-center gap-1 text-white rounded-sm text-sm bg-primary-500 hover:bg-primary-600 cursor-pointer px-3 py-2 duration-150 text-nowrap">Edit Profile<RightArrowIcon /></Link>
                        </div>
                    </div>




                    {/* middle section */}
                    <div className="flex flex-col lg:flex-row gap-10 mt-12  lg:justify-between ">

                        <div className="lg:max-w-[600px]  w-full ">
                            <h2 className="text-customGray-900 text-xl font-medium">Biography</h2>
                            {biography
                                ? <div className="mt-4 min-h-[200px] sm:min-h-[365px] space-y-4 min-h- [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900 [&_a]:text-primary-500 [&_a]:underline "
                                    dangerouslySetInnerHTML={{ __html: biography }} />
                                : <p className="text-customGray-400 min-h-[200px] sm:min-h-[365px] mt-4">Not Provided</p>}

                            <hr className="mt-8 text-customGray-200"></hr>

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
