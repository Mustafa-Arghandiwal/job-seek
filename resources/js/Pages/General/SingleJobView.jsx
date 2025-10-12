import { Link, router, useForm, usePage } from "@inertiajs/react"
import Layout from "../../Layouts/Layout"
import EmployerLayout from "../../Layouts/EmployerLayout"
import { formatSalary } from "../../utils/formatSalary"
import { TwitterIcon, LinkedInIcon, FacebookIcon, InstagramIcon, YouTubeIcon, GitHubIcon } from "../Candidate/socialMediaSvgs"
import { createPortal } from "react-dom"
import { useEffect, useRef, useState } from "react"
import Select from "../../Components/Select"
import RichTextEditor from "../../Components/RichTextEditor"
import confetti from "canvas-confetti"
import { BookmarkIcon, CloseXIcon, RightArrowIcon, LinkIcon, PhoneIcon, MailIcon, CalendarIcon, TimerIcon, WalletIcon, LocationUnderlinedIcon, SimpleBriefCaseIcon, GradCapIcon } from '../../utils/svgs'
import OpenPosition from "../../Components/OpenPosition"
import TextAvatar from "../../Components/TextAvatar"



function SingleJobView({ employer, vacancy, relatedVacancies, resumes, isBookmarked }) {

    const userType = usePage().props.auth.user.user_type

    const dropdownResumes = resumes ? resumes.map(resume => resume.file_name) : []

    const [bookmarked, setBookmarked] = useState(isBookmarked)
    const handleBookmark = () => {
        setBookmarked(prev => !prev)

        router.post(`/candidate/saved-jobs/${vacancy.id}`, {}, {
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


    let resumeError
    if (errors.resumeId) {
        resumeError = errors.resumeId.replace(/\bId\b/i, '')
    }


    const handleApply = (e) => {
        e.preventDefault()
        post(`/vacancies/${vacancy.id}/applications`)
    }

    const logo = employer.detail.logo_path
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

    const expired = new Date(vacancy.deadline).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
    let expireMsg
    if (vacancy.manually_expired) {
        expireMsg = "Job listing ended by employer"
    } else if (expired) {
        expireMsg = "Job expired on: "
    } else { expireMsg = "Job expires on: " }
    // expireMsg = (expired && !vacancy.manually_expired) ? "" : "Job expires on: "

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



    const relatedJobEls = relatedVacancies.map(vacancy => {
        const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)
        return <OpenPosition key={vacancy.id} id={vacancy.id} title={vacancy.job_title} city={vacancy?.city} companyName={companyName}
            jobType={vacancy.job_type} salary={salary} logo={logo} />
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


    const showConfetti = () => {
        confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
            colors: [
                "#E7F0FA",
                "#CEE0F5",
                "#9DC1EB",
                "#6CA3E0",
                "#3B84D6",
                "#0A65CC",
                "#0851A3",
                "#063D7A",
                "#042852",
                "#021429",
            ],
        });
    };
    useEffect(() => {
        if (flash.applySuccess) showConfetti()
    }, [flash.applySuccess])





    return (
        <div className="px-4 sm:px-12 lg:px-24 xl:px-48 pb-30  ">
            <div className="py-8  flex items-center flex-wrap gap-4 justify-center xs:justify-between ">

                <div className="flex gap-6 items-center  flex-col xs:flex-row">
                    {logo ?
                        <Link href={`/employers/${employer.id}`} style={{ backgroundImage: `url(${"/storage/" + logo})` }} className="h-24 min-w-24 bg-cover bg-center rounded-full hover:scale-105 duration-150" ></Link>
                        :
                        <Link href={`/employers/${employer.id}`}>
                            <TextAvatar name={companyName} className="h-24 min-w-24 rounded-full text-4xl hover:scale-105 active:scale-95 duration-150" />
                        </Link>
                    }
                    <div className="flex flex-col gap-3 items-center xs:items-start">
                        <div className="flex gap-2 items-center flex-wrap justify-center xs:justify-start">
                            <h2 className="text-2xl font-medium text-customGray-900 text-center xs:text-left">{jobTitle}</h2>
                            <div className="bg-[#E8F1FF] text-[#0066FF] rounded-full text-sm grid place-items-center h-6 px-3">{jobType}</div>
                        </div>


                        {(companyWebsite || companyPhone || companyEmail) &&
                            <div className="flex flex-wrap gap-2 text-customGray-700 justify-center xs:justify-start">
                                {companyWebsite &&
                                    <div className="flex gap-1 items-center ">
                                        <LinkIcon className="w-5 h-5 text-primary-500" />
                                        <p className="break-all">{companyWebsite}</p>
                                    </div>
                                }
                                {companyPhone &&
                                    <div className="flex gap-1 items-center">
                                        <PhoneIcon className="w-5 h-5 text-primary-500" />
                                        <p>{companyPhone}</p>
                                    </div>

                                }
                                {companyEmail &&
                                    <div className="flex gap-1 items-center">
                                        <MailIcon className="w-5 h-5 text-primary-500" />
                                        <p className="break-all">{companyEmail}</p>
                                    </div>
                                }

                            </div>
                        }

                    </div>

                </div>

                <div className=" ">
                    {userType === "candidate" &&
                        <div className="flex gap-1 xs:gap-3 flex-col items-center xs:flex-row">
                            <button onClick={handleBookmark} title={bookmarked ? "Remove from Saved Jobs" : "Add to Saved Jobs"} className="p-4  rounded-sm cursor-pointer hover:bg-primary-50">
                                <BookmarkIcon className="text-primary-500" bookmarked={bookmarked} />
                            </button>

                            <button
                                disabled={vacancy.manually_expired || expired}
                                onClick={(e) => { e.stopPropagation(); setShowModal(true) }}
                                className="group flex gap-3 disabled:bg-primary-200 disabled:cursor-default rounded-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                                Apply Now
                                <RightArrowIcon className="w-6 h-6" />
                            </button>
                        </div>
                    }


                    <p className={` ${vacancy.manually_expired ? "text-danger-400" : "text-customGray-500"} text-xs text-right mt-2`}>
                        {expireMsg}
                        {!vacancy.manually_expired &&
                            <span className="text-danger-500">{deadline}</span>
                        }
                    </p>

                </div>

            </div>


            {/* middle section */}
            <div className="flex flex-col lg:flex-row gap-10 mt-8  justify-between">

                <div className=" max-w-[700px] w-full ">
                    <h2 className="text-customGray-900 text-xl font-medium">Job Description</h2>
                    {(description && description.trim() !== "")
                        ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900 [&_a]:text-primary-500 [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: description }} />
                        : <p className="text-customGray-400 mt-4">Not Provided</p>}


                    <h2 className="text-customGray-900 text-lg font-medium mt-8">Responsibilities</h2>
                    {(responsibilities && responsibilities.trim() !== "")
                        ? <div className="mt-4 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-lg [&_h1,_h2,_h3]:text-customGray-900
                                [&_h1]:font-bold [&_h2,_h3]:font-semibold  [&_p]:text-customGray-600 [&_hr]:text-customGray-200
                                [&_ul]:list-disc [&_li]:ml-6  [&_ul_li::marker]:text-customGray-700
                                [&_ol]:list-decimal [&_ol_li]:ml-6 [&_ol_li::marker]:text-customGray-900  [&_a]:text-primary-500 [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: responsibilities }} />
                        : <p className="text-customGray-400 mt-4">Not Provided</p>}

                </div>


                <div className="">

                    <div className="p-8 border border-primary-200  rounded-lg lg:min-w-[400px] max-w-[600px] ">
                        <h3 className="font-medium text-xl text-customGray-900">Job Overview</h3>
                        <div className="mt-6 flex flex-wrap  gap-8 sm:gap-2">
                            <div className=" min-w-40 ">
                                <div className="w-8 h-8">
                                    <CalendarIcon className="w-8 h-8 text-primary-500" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500 max-w-32">JOB POSTED:</p>
                                    <p className={`mt-2 text-sm  sm:h-10  font-medium text-customGray-900`}>{jobPostDate}</p>
                                </div>
                            </div>
                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <TimerIcon />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">JOB EXPIRE ON:</p>
                                    <p className={`mt-2 text-sm  sm:h-10  font-medium text-customGray-900`}>{deadline}</p>
                                </div>
                            </div>


                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <GradCapIcon className="text-primary-500" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">EDUCATION:</p>
                                    <p className={`mt-2 text-sm  sm:h-10  font-medium text-customGray-900`}>{jobEducation}</p>
                                </div>
                            </div>



                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <WalletIcon />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">SALARY:</p>
                                    <p className={`mt-2 text-sm  sm:h-10  font-medium text-customGray-900`}>{salary}</p>
                                </div>
                            </div>
                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <LocationUnderlinedIcon />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">LOCATION:</p>
                                    <p className={`mt-2 text-sm  sm:h-10  font-medium text-customGray-900`}>{location}</p>
                                </div>
                            </div>

                            <div className=" min-w-40">
                                <div className="w-8 h-8">
                                    <SimpleBriefCaseIcon className="w-8 h-8 text-primary-500" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-customGray-500  max-w-32">EXPERIENCE</p>
                                    <p className={`mt-2 text-sm  sm:h-10  font-medium text-customGray-900`}>{jobExperience}</p>
                                </div>
                            </div>



                        </div>

                    </div>



                    <div className="p-8 mt-6 border border-primary-200  rounded-lg  lg:min-w-[400px] max-w-[600px]">
                        <div className="flex gap-4  items-center">
                            {logo ?
                                <Link href={`/employers/${employer.id}`} style={{ backgroundImage: `url(${"/storage/" + logo})` }} className="h-16 min-w-16 bg-cover bg-center rounded-md " ></Link>
                                :
                                <Link href={`/employers/${employer.id}`}>
                                    <TextAvatar name={companyName} className="h-16 border min-w-16 rounded-md text-2xl" />
                                </Link>
                            }
                            <div>
                                <Link href={`/employers/${employer.id}`} className="text-customGray-900 hover:text-primary-700 font-medium text-xl">{companyName}</Link>
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
                {relatedJobEls.length !== 0 ?
                    <div className="pb-5 px-4 flex gap-6 sm:flex-wrap sm:justify-center scroll-smooth snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto  sm:overflow-visible">
                        {relatedJobEls}
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
                        <div ref={successRef} className="grid place-items-center text-center text-success-500  max-w-[260px] sm:max-w-[300px] w-full rounded-xl p-8 absolute top-[30dvh] sm:top-[40dvh] left-1/2 -translate-x-1/2  bg-white ">
                            {flash.applySuccess}

                            <button type="button" onClick={() => setShowModal(false)} className="cursor-pointer p-3 rounded-full bg-primary-50 absolute -right-6 -top-6">
                                <CloseXIcon className="text-primary-500" />
                            </button>
                        </div>
                        :
                        <form onSubmit={handleApply} ref={modalRef} className="max-w-[80vw] sm:max-w-[60vw] xl:max-w-[40vw] w-full rounded-xl p-8 absolute top-[20dvh]  left-1/2 -translate-x-1/2   bg-white  ">

                            <h3 className="text-customGray-900 font-medium text-lg">Apply to: {jobTitle}</h3>

                            <div className="mt-4">
                                <label className="text-sm text-customGray-900">Choose Resume/CV</label>
                                {dropdownResumes.length === 0 &&
                                    <span className="text-danger-700 text-sm block">You haven't added any CVs yet.
                                        <Link className="text-primary-500 underline" href="/candidate/dashboard/settings"> Go to your dashboard</Link> to upload one.</span>

                                }
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
                                <button disabled={processing} className="disabled:bg-primary-100 order-1 sm:order-2 group flex gap-3 justify-center rounded-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 w-full sm:w-44 cursor-pointer px-1 py-3 duration-150 text-nowrap">
                                    Apply
                                </button>

                            </div>

                            <div className="mt-3 min-h-5 w-full text-danger-600 text-sm">
                                {errors[0]}
                            </div>



                            <button type="button" onClick={() => setShowModal(false)} className="cursor-pointer p-3 rounded-full bg-primary-50 absolute -right-6 -top-6">
                                <CloseXIcon className="text-primary-500" />
                            </button>
                        </form>
                    }
                </div>, root

            )}



        </div>
    )
}



SingleJobView.layout = page => {
    const userType = page.props?.auth?.user?.user_type
    if (userType === "employer") {
        return <EmployerLayout>{page}</EmployerLayout>
    }
    return <Layout>{page}</Layout>

}
export default SingleJobView



