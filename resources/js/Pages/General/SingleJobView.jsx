import { useForm, usePage } from "@inertiajs/react"
import Layout from "../../Layouts/Layout"
import { formatSalary } from "../../utils/formatSalary"
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon, YouTubeIcon, GitHubIcon } from "../Candidate/socialMediaSvgs"
import { createPortal } from "react-dom"
import { useEffect, useRef, useState } from "react"
import Select from "../../Components/Select"
import RichTextEditor from "../../Components/RichTextEditor"



function SingleJobView({ employer, vacancy, resumes }) {


    const dropdownResumes = resumes.map(resume => resume.file_name)


    const handleSelectChange = (index) => {
        setData('resumeId', resumes[index].id)
        setResumeName(dropdownResumes[index])
    }

    //just for <select>'s placeholder
    const [resumeName, setResumeName] = useState('')

    const { data, setData, post, errors, processing } = useForm({
        resumeId: '',
        coverLetter: ''
    })
    const { flash } = usePage().props

    console.log(flash.applySuccess)
    console.log(errors)

    let resumeError
    if (errors.resumeId) {
        resumeError = errors.resumeId.replace(/\bId\b/i, '')
    }


    const handleApply = (e) => {
        e.preventDefault()
        post(`/jobs/${vacancy.id}/applications`)
    }

    const logo = employer.detail?.logo_path ? "/storage/" + employer.detail.logo_path : "/chess_pattern.png"
    const jobTitle = vacancy.job_title
    const companyWebsite = employer.detail?.company_website
    const companyPhone = employer.contact?.phone
    const companyEmail = employer.contact?.email
    const companyType = employer.detail?.company_type
    const companyIndustry = employer.detail?.industry_type
    const companySize = employer.detail?.team_size
    const companyName = employer.user?.full_name


    const companyFoundingDate = new Date(employer.detail?.establish_date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    const jobPostDate = new Date(vacancy.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    const deadline = new Date(vacancy.deadline).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)
    const jobEducation = vacancy.education
    const location = vacancy?.city || "Remote"
    const jobType = vacancy.job_type
    const jobExperience = vacancy.experience
    const description = vacancy.description
    const responsibilities = vacancy.responsibilities

    const socialLinks = employer?.social_link
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
    const [showModal, setShowModal] = useState(false)

    const modalRef = useRef(null)
    const successRef = useRef(null)
    const handleOutsideClick = (e) => {
        if ((modalRef.current && !modalRef.current.contains(e.target)) || successRef.current && !successRef.current.contains(e.target)) {
            setShowModal(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)

    }, [])




    // const relatedJobs = vacancies.map(vacancy => {
    //     const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)

    //     return <OpenPosition key={vacancy.id} title={vacancy.job_title} city={vacancy?.city} companyName={companyName}
    //         jobType={vacancy.job_type} salary={salary} logo={logo} />
    // })
    const relatedJobs = []


    return (
        <div className="px-4 sm:px-12 lg:px-24 xl:px-48 pb-30  ">
            <div className="py-8  flex items-center flex-wrap gap-4 justify-center xs:justify-between ">

                <div className="flex gap-6 items-center  flex-col xs:flex-row">
                    <div className="h-24 min-w-24 bg-cover bg-center rounded-full " style={{ backgroundImage: `url(${logo})` }}></div>
                    <div className="flex flex-col gap-3 items-center xs:items-start">
                        <div className="flex gap-2 items-center flex-wrap justify-center xs:justify-start">
                            <h2 className="text-2xl font-medium text-customGray-900 text-center xs:text-left">{jobTitle}</h2>
                            <div className="bg-[#E8F1FF] text-[#0066FF] rounded-full text-sm grid place-items-center h-6 px-3">{jobType}</div>
                        </div>


                        {(companyWebsite || companyPhone || companyEmail) &&
                            <div className="flex flex-wrap gap-2 text-customGray-700 justify-center xs:justify-start">
                                {companyWebsite &&
                                    <div className="flex gap-1 items-center ">
                                        <img src="/link_blue.png" className="h-5 w-5" />
                                        <p className="break-all">{companyWebsite}</p>
                                    </div>
                                }
                                {companyPhone &&
                                    <div className="flex gap-1 items-center">
                                        <img src="/phone_blue.png" className="h-5 w-5" />
                                        <p>{companyPhone}</p>
                                    </div>

                                }
                                {companyEmail &&
                                    <div className="flex gap-1 items-center">
                                        <img src="/envelope_blue.png" className="h-5 w-5" />
                                        <p className="break-all">{companyEmail}</p>
                                    </div>
                                }

                            </div>
                        }

                    </div>

                </div>

                <div className=" ">
                    <div className="flex gap-1 xs:gap-3 flex-col items-center xs:flex-row">
                        <button className="p-4  rounded-sm cursor-pointer hover:bg-primary-50">
                            <svg width="18" height="18" viewBox="0 0 14 19" fill={`${false ? "#0A65CC" : "none"}`} xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13 18L6.99931 14.25L1 18V1.5C1 1.30109 1.07902 1.11032 1.21967 0.96967C1.36032 0.829018 1.55109 0.75 1.75 0.75H12.25C12.4489 0.75 12.6397 0.829018 12.7803 0.96967C12.921 1.11032 13 1.30109 13 1.5V18Z"
                                    stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <button onClick={(e) => { e.stopPropagation(); setShowModal(true) }} className="group flex gap-3 rounded-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 cursor-pointer px-6 py-3 duration-150 text-nowrap">Apply Now
                            <svg className="text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-customGray-500 text-xs text-right mt-2">Job expires on: <span className="text-danger-500">{deadline}</span></p>

                </div>

            </div>


            {/* middle section */}
            <div className="flex flex-col lg:flex-row gap-10 mt-8  justify-between">

                <div className=" max-w-[700px] ">
                    <h2 className="text-customGray-900 text-xl font-medium">Job Description</h2>
                    {(description && description.trim() !== "")
                        ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900"
                            dangerouslySetInnerHTML={{ __html: description }} />
                        : <p className="text-customGray-400 mt-4">Not Provided</p>}


                    <h2 className="text-black text-lg font-medium mt-8">Responsibilities</h2>
                    {(responsibilities && responsibilities.trim() !== "")
                        ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900"
                            dangerouslySetInnerHTML={{ __html: responsibilities }} />
                        : <p className="text-customGray-400 mt-4">Not Provided</p>}

                </div>


                <div className="">

                    <div className="p-8 border border-primary-200  rounded-lg lg:min-w-[400px] max-w-[600px] ">
                        <h3 className="font-medium text-xl text-customGray-900">Job Overview</h3>
                        <div className="mt-6 flex flex-wrap  gap-8 sm:gap-2">
                            <div className=" min-w-40 ">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/founded-in.png" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500 max-w-32">JOB POSTED:</p>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{jobPostDate}</p>
                                </div>
                            </div>
                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/timer.png" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">JOB EXPIRE ON:</p>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{deadline}</p>
                                </div>
                            </div>


                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/grad_cap.png" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">EDUCATION:</p>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{jobEducation}</p>
                                </div>
                            </div>



                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/wallet.png" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">SALARY:</p>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{salary}</p>
                                </div>
                            </div>
                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/location.png" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">LOCATION:</p>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{location}</p>
                                </div>
                            </div>

                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <img src="/single-employer-view-icons/industry-type.png" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">EXPERIENCE</p>
                                    <p className={`mt-2 text-sm  sm:h-10 sm:max-w-32 font-medium text-customGray-900`}>{jobExperience}</p>
                                </div>
                            </div>



                        </div>

                    </div>



                    <div className="p-8 mt-6 border border-primary-200  rounded-lg  lg:min-w-[400px] max-w-[600px]">
                        <div className="flex gap-4  items-center">
                            <div className="h-16 min-w-16 bg-cover bg-center rounded-md " style={{ backgroundImage: `url(${logo})` }}></div>
                            <div>
                                <p className="text-customGray-900 font-medium text-xl">{companyName}</p>
                                <p className="text-sm text-customGray-500 mt-2">{companyIndustry}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex gap-2  justify-between">
                                <p className="text-customGray-600">Founded in:</p>
                                {
                                    companyFoundingDate ? <p className=" text-customGray-900">{companyFoundingDate}</p> : <p className="text-customGray-500">Not provided</p>
                                }
                            </div>

                            <div className="flex gap-2  justify-between mt-4">
                                <p className="text-customGray-600">Organization type:</p>
                                {
                                    companyType ? <p className="text-customGray-900">{companyType}</p> : <p className="text-customGray-500">Not provided</p>
                                }
                            </div>

                            <div className="flex justify-between gap-2  mt-4">
                                <p className="text-customGray-600">Company size:</p>
                                {
                                    companySize ? <p className="text-customGray-900">{companySize}</p> : <p className="text-customGray-500">Not provided</p>
                                }
                            </div>

                            <div className="flex justify-between gap-2  mt-4">
                                <p className="text-customGray-600">Phone:</p>
                                {
                                    companyPhone ? <p className="text-customGray-900">{companyPhone}</p> : <p className="text-customGray-500">Not provided</p>
                                }
                            </div>

                            <div className="flex justify-between gap-2  mt-4">
                                <p className="text-customGray-600">Email:</p>
                                {
                                    companyEmail ? <p className="text-customGray-900 break-all">{companyEmail}</p> : <p className="text-customGray-500">Not provided</p>
                                }
                            </div>

                            <div className="flex justify-between gap-2  mt-4">
                                <p className="text-customGray-600">Website:</p>
                                {
                                    companyWebsite ? <p className="text-customGray-900 break-all">{companyWebsite}</p> : <p className="text-customGray-500">Not provided</p>
                                }
                            </div>
                        </div>


                        {socialIcons.length !== 0 &&
                            <div className="mt-8">
                                <div className="flex gap-3 mt-4 flex-wrap">
                                    {socialIcons}
                                </div>
                            </div>
                        }


                    </div>


                </div>

            </div>

            <hr className="mt-8 text-customGray-200 "></hr>


            <div className="mt-20">
                <h3 className="text-customGray-900 mb-12 ml-4 font-medium text-4xl">Related Jobs</h3>
                {relatedJobs.length !== 0 ?
                    <div className="pb-5 px-4 flex gap-6 sm:flex-wrap   scroll-smooth snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto  sm:overflow-visible">
                        {relatedJobs}
                    </div>
                    :
                    <div className="grid px-4 place-items-center h-[10dvh] text-customGray-500 text-lg text-center sm:text-xl">
                        No related jobs at the moment.
                    </div>
                }
            </div>



            {/* Apply job modal */}
            {createPortal(
                <div className={`inset-0 bg-black/60  z-50  fixed flex justify-center items-center transition-opacity duration-200 ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {flash.applySuccess ?
                        <div ref={successRef} className="grid place-items-center text-center text-success-500 font-semibold max-w-[80vw] sm:max-w-[60vw] xl:max-w-[40vw] rounded-xl p-8 absolute top-[20dvh] sm:top-[30dvh] left-1/2 -translate-x-1/2 bg-white  ">
                            {flash.applySuccess}

                            <button type="button" onClick={() => setShowModal(false)} className="cursor-pointer p-3 rounded-full bg-primary-50 absolute -right-6 -top-6">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.75 5.25L5.25 18.75" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.75 18.75L5.25 5.25" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        :
                        <form onSubmit={handleApply} ref={modalRef} className="max-w-[80vw] sm:max-w-[60vw] xl:max-w-[40vw] rounded-xl p-8 absolute top-[10dvh] sm:top-[30dvh] left-1/2 -translate-x-1/2   bg-white  ">

                            <h3 className="text-customGray-900 font-medium text-lg">Apply to: {jobTitle}</h3>

                            <div className="mt-4">
                                <label className="text-sm text-customGray-900">Choose Resume/CV</label>
                                <Select options={dropdownResumes} placeholder={resumeName} onValueChange={handleSelectChange} indexNeeded={true} />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {resumeError}
                                </div>
                            </div>

                            <div className="mt-2">
                                <label className="text-sm text-customGray-900">Cover Letter</label>
                                <RichTextEditor content={data.coverLetter} onChange={newContent => setData('coverLetter', newContent)} menuOnTop={true}
                                    placeholder="Write a short note to the employer about your background, skills, and why you’re excited about this role..." />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {errors.coverLetter}
                                </div>

                            </div>


                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">

                                <button type="button" onClick={() => setShowModal(false)} className="order-2 sm:order-1 text-primary-500 bg-primary-50 w-full sm:w-44  py-3 px-1 font-semibold rounded-sm cursor-pointer
                               hover:bg-primary-100 hover:text-primary-600 ">Cancel</button>
                                <button disabled={processing} className="disabled:bg-primary-100 order-1 sm:order-2 group flex gap-3 justify-center rounded-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 w-full sm:w-44 cursor-pointer px-1 py-3 duration-150 text-nowrap">Apply Now
                                    <svg className="text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                            </div>

                            <div className="mt-3 min-h-5 w-full text-danger-600 text-sm">
                                {errors[0]}
                            </div>



                            <button type="button" onClick={() => setShowModal(false)} className="cursor-pointer p-3 rounded-full bg-primary-50 absolute -right-6 -top-6">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.75 5.25L5.25 18.75" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.75 18.75L5.25 5.25" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    }
                </div>, root

            )}



        </div>
    )
}



SingleJobView.layout = page => <Layout children={page} />
export default SingleJobView
