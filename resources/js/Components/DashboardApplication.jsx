import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { router, usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { GitHubIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "../Pages/Candidate/socialMediaSvgs"



export default function DashboardApplication(props) {

    const appDetails = props.appDetails
    const profilePic = appDetails?.profile_picture ? "/storage/" + appDetails.profile_picture : "/chess_pattern.png"
    const appliedAt = new Date(appDetails?.applied_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })


    const socialLinks = [{social_type:"LinkedIn", url:"google.com", id:1, }]
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

    const root = document.getElementById("react-portal-root")
    const modalRef = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)

    }, [])



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
                    <li>City: {appDetails?.city || "Not provided"}</li>
                    <li>Education: {appDetails?.education_level || "Not provided"}</li>
                    <li>Applied on {appliedAt}</li>
                </ul>

                <div className="">
                    <a className="flex gap-1 items-center mt-4 cursor-pointer text-primary-600 hover:text-primary-500">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.71875 8.59375L10 11.8741L13.2812 8.59375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 3.125V11.8727" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.875 11.875V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-medium text-xs">Download CV</span>
                    </a>

                    <button className="flex gap-1 items-center mt-4 cursor-pointer text-primary-600 hover:text-primary-500">
                        {/* <button onClick={() => router.get(`/applications/${appDetails.id}/resume`)}  className="flex gap-1 items-center mt-4 cursor-pointer text-primary-500"> */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-medium  text-xs">View CV</span>
                        {/* <span>{usePage().props.errors.fileDeleted}</span> */}
                    </button>

                    <button className="flex gap-1 items-center mt-4 cursor-pointer text-primary-600 hover:text-primary-500">
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
        // onMouseDown={(e) => e.currentTarget.style.cursor = "grabbing"} onMouseUp={(e) => e.currentTarget.style.cursor = "grab"}
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
                <li>City: {appDetails?.city || "Not provided"}</li>
                <li>Education: {appDetails?.education_level || "Not provided"}</li>
                <li>Applied on {appliedAt}</li>
            </ul>


            <div className="flex flex-col  flex-wrap">
                <a href={`/applications/${appDetails.id}/resume/download`} className="flex gap-1 items-center mt-4 cursor-pointer text-primary-600 hover:text-primary-500">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.71875 8.59375L10 11.8741L13.2812 8.59375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 3.125V11.8727" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.875 11.875V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium text-xs">Download CV</span>
                </a>

                <button onClick={() => window.open(`/applications/${appDetails.id}/resume`, '_blank')} className="flex gap-1 items-center mt-4 cursor-pointer text-primary-600 hover:text-primary-500">
                    {/* <button onClick={() => router.get(`/applications/${appDetails.id}/resume`)}  className="flex gap-1 items-center mt-4 cursor-pointer text-primary-500"> */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium  text-xs">View CV</span>
                    {/* <span>{usePage().props.errors.fileDeleted}</span> */}
                </button>

                <button onClick={(e) => { e.stopPropagation(); setShowModal(true) }} className="flex gap-1 items-center mt-4 cursor-pointer text-primary-600 hover:text-primary-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                        <path d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="  font-medium  text-xs">View Profile</span>
                </button>
            </div>



            {createPortal(
                <div className={`inset-0 bg-black/60  z-50  fixed flex justify-center items-center transition-opacity duration-200 ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

                    <div ref={modalRef} className="relative w-[80vw] h-[80dvh] z-40  overflow-y-scroll scrollbar-custom rounded-xl p-8 bg-white  ">


                        <div className="sticky  z-10 flex justify-end -mt-6  -mr-6 -top-7">
                            <button type="button" onClick={() => setShowModal(false)} className="bg-white text-customGray-900 border border-customGray-100 rounded-full  p-2  cursor-pointer active:scale-95">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.75 5.25L5.25 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.75 18.75L5.25 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        {/* header */}
                        <div className="py-8 flex items-center flex-wrap gap-4 justify-center xs:justify-between ">

                            <div className="flex gap-6 items-center flex-col xs:flex-row">
                                <div className="h-20 min-w-20 bg-cover bg-center rounded-full " style={{ backgroundImage: `url(/chess_pattern.png)` }}></div>
                                <div className=" flex flex-col gap-[10px] ">
                                    <h2 className="text-2xl font-medium text-customGray-900 text-center xs:text-left">Mustafa</h2>
                                    <span className="block text-customGray-600 text-sm sm:text-base line-clamp-1">Farmer for Now</span>
                                </div>
                            </div>

                            <div className="">
                                <div className="flex gap-1 xs:gap-3 flex-col items-center xs:flex-row">
                                    <button className="p-4  rounded-sm cursor-pointer hover:bg-primary-50">
                                        <svg width="18" height="18" viewBox="0 0 14 19" fill={`${true ? "#0A65CC" : "none"}`} xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13 18L6.99931 14.25L1 18V1.5C1 1.30109 1.07902 1.11032 1.21967 0.96967C1.36032 0.829018 1.55109 0.75 1.75 0.75H12.25C12.4489 0.75 12.6397 0.829018 12.7803 0.96967C12.921 1.11032 13 1.30109 13 1.5V18Z"
                                                stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    <button onClick={(e) => { console.log(e) }} className="group flex gap-2 rounded-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                                        <svg className="text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 5.25L12 13.5L3 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.3628 12L3.23047 18.538" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20.7692 18.5381L13.6367 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Send Email
                                    </button>
                                </div>
                            </div>
                        </div>




                        {/* middle section */}
                        <div className="  flex flex-col lg:flex-row gap-10 mt-12  lg:justify-around">

                            <div className="max-w-[600px]  w-full ">
                                <h2 className="text-customGray-900 text-xl font-medium">Biography</h2>
                                {false
                                    ? <div className="mt-4 space-y-4 min-h- [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900"
                                        dangerouslySetInnerHTML={{ __html: "<p>Hi</p>" }} />
                                    : <p className="text-customGray-400 min-h-[400px] mt-4">Not Provided</p>}

                                <hr className="mt-8 text-customGray-200"></hr>

                                <span className="text-customGray-700 text-sm  mt-8 block">Follow me on Social Media</span>

                                {socialIcons.length !== 0 ?

                                    <div className="flex gap-3 mt-4 flex-wrap">
                                        {socialIcons}
                                    </div>
                                    :
                                    <p className="text-customGray-400 mt-4">Not provided</p>
                                }
                            </div>

                            <div className="">

                                <div className="  max-w-[340px] w-full flex  flex-col sm:flex-row flex-wrap gap-4  p-8 border border-primary-200  rounded-lg">

                                    {/* <div className=" flex flex-col gap-6 "> */}
                                    <div className=" min-w-32 ">
                                        <div className="w-6 h-6">
                                            <img src="/candidate-profile-icons/cake.png" />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xs text-customGray-500 max-w-32">DATE OF BIRTH</p>
                                            {/* <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${establishDate ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{establishDate || "Not provided"}</p> */}
                                        </div>
                                    </div>
                                    <div className=" min-w-32">

                                        <div className="w-6 h-6">
                                            <img src="/candidate-profile-icons/location.png" />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xs text-customGray-500  max-w-32">CITY</p>
                                            {/* <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${orgType ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{orgType || "Not provided"}</p> */}
                                        </div>
                                    </div>
                                    {/* </div> */}


                                    {/* <div className=" flex flex-col gap-6 "> */}
                                    <div className=" min-w-32">
                                        <div className="w-6 h-6">
                                            <img src="/candidate-profile-icons/marital-status.png" />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xs text-customGray-500  max-w-32">MARITAL STATUS</p>
                                            {/* <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${teamSize ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{teamSize || "Not provided"}</p> */}
                                        </div>
                                    </div>
                                    <div className=" min-w-32">
                                        <div className="w-6 h-6">
                                            <img src="/candidate-profile-icons/gender.png" />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xs text-customGray-500  max-w-32">GENDER</p>
                                            {/* <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${industryType ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{industryType || "Not provided"}</p> */}
                                        </div>
                                    </div>

                                    {/* </div> */}

                                    <div className=" min-w-32">
                                        <div className="w-6 h-6">
                                            <img src="/candidate-profile-icons/experience.png" />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xs text-customGray-500  max-w-32">EXPERIENCE</p>
                                            {/* <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${industryType ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{industryType || "Not provided"}</p> */}
                                        </div>
                                    </div>

                                    <div className=" min-w-32">
                                        <div className="w-6 h-6">
                                            <img src="/candidate-profile-icons/grad-cap.png" />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xs text-customGray-500  max-w-32">EDUCATIONS</p>
                                            {/* <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 ${industryType ? "font-medium text-customGray-900" : "text-customGray-400"}`}>{industryType || "Not provided"}</p> */}
                                        </div>
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
                                            {/* <p className={`mt-2 text-sm max-w-[290px] break-all ${website ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{website || "Not provided"}</p> */}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 py-6 border-b border-b-customGray-100">
                                        <div className="w-8 h-8 shrink-0">
                                            <img src="/single-employer-view-icons/phone.png" className="" />
                                        </div>
                                        <div className="">
                                            <p className="text-xs text-customGray-500">PHONE</p>
                                            {/* <p className={`mt-2 text-sm max-w-[290px] break-all ${phone ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{phone || "Not provided"}</p> */}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-6 ">
                                        <div className="w-8-h-8 shrink-0">
                                            <img src="/single-employer-view-icons/envelope.png" className="shrink-0" />
                                        </div>
                                        <div className="">
                                            <p className="text-xs text-customGray-500">EMAIL ADDRESS</p>
                                            {/* <p className={`mt-2 text-sm max-w-[290px] break-all ${email ? "text-customGray-900 font-medium" : "text-customGray-400"}`}>{email || "Not provided"}</p> */}
                                        </div>
                                    </div>

                                </div>



                            </div>

                        </div>




                    </div>

                </div>, root

            )}

        </div>

    )
}
