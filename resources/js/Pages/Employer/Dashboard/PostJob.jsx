

import { Link, useForm, usePage } from "@inertiajs/react"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"
import Select from "../../../Components/Select"
import DatePicker from "../../../Components/DatePicker"
import RichTextEditor from "../../../Components/RichTextEditor"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import confetti from "canvas-confetti"
import { RightArrowIcon } from "../../../utils/svgs"




function PostJob() {

    const { props } = usePage({})


    const { data, setData, reset, errors, processing, post } = useForm({
        jobTitle: '',
        salaryType: '',
        salaryFormat: '',
        fixedSalary: '',
        minSalary: '',
        maxSalary: '',
        education: '',
        experience: '',
        jobLevel: '',
        jobType: '',
        jobCategory: '',
        workMode: '',
        city: '',
        deadline: '',
        description: '',
        responsibilities: '',

    })


    const handleSelectChange = (field, option) => {
        setData(prev => ({
            ...prev,
            [field]: option,
        }))
    }
    const handleDeadlineChange = (value) => {
        setData(prev => ({
            ...prev,
            deadline: value
        }))
    }



    const root = document.getElementById("react-portal-root")
    const [successModalVisible, setSuccessModalVisible] = useState(true)
    const successModalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (successModalRef.current && !successModalRef.current.contains(e.target)) {
                setSuccessModalVisible(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        post('/employer/vacancies', {
            onSuccess: () => {
                reset()
            }
        })

    }

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
        if (props.flash.postJobSuccess) showConfetti()
    }, [props.flash.postJobSuccess])


    return (
        <form onSubmit={handleSubmit}>
            <h1 className="font-medium text-2xl text-customGray-900 ">Post a Job</h1>

            <div className="mt-8 w-full  ">

                <div className="flex  flex-col w-full  min-w-44 ">
                    <label htmlFor="jobTitle" className="text-sm text-customGray-900">Job Title</label>
                    <input type="text" placeholder="e.g. Finance Officer" id="jobTitle" value={data.jobTitle} onChange={(e) => setData('jobTitle', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {errors.jobTitle}
                    </div>
                </div>


                <div className="mt-3">

                    <h2 className="text-lg font-medium text-customGray-900">Salary</h2>

                    <div>
                        <div className="flex gap-3 lg:gap-5  lg:items-center  flex-col lg:flex-row ">
                            <div className=" mt-3 w-full max-w-64  min-w-32  ">
                                <label className="text-sm text-customGray-900">Salary Type</label>
                                <Select options={['Hourly', 'Daily', 'Weekly', 'Monthly', 'Commission-based', 'Negotiable']} placeholder={data.salaryType} onValueChange={(option) => handleSelectChange('salaryType', option)} />
                                <div className="text-sm w-full text-danger-600 min-h-5 " >
                                    {errors.salaryType || ''}
                                </div>
                            </div>

                            {
                                !['', 'Commission-based', 'Negotiable'].includes(data.salaryType) &&

                                <div className=" lg:mt-6 relative">
                                    <div className="w-full  max-w-fit  flex flex-col xs:flex-row gap-2 xs:gap-4  text-customGray-900 text-sm ">
                                        <label className="cursor-pointer flex  gap-1">
                                            <input type="radio" name="salaryFormat" value="Fixed Amount" checked={data.salaryFormat === 'Fixed Amount'} onChange={e => setData('salaryFormat', e.target.value)} className="cursor-pointer" />
                                            <span>Fixed Amount</span>
                                        </label>
                                        <label className="cursor-pointer flex  gap-1" >
                                            <input type="radio" name="salaryFormat" value="Salary Range" checked={data.salaryFormat === 'Salary Range'} onChange={e => setData('salaryFormat', e.target.value)} className="cursor-pointer" />
                                            <span>Salary Range</span>
                                        </label>

                                    </div>

                                    <div className="text-sm w-full text-danger-600 min-h-5 lg:absolute lg:-bottom-[35px]" >
                                        {errors.salaryFormat || ''}
                                    </div>
                                </div>

                            }
                        </div>


                        {
                            (!['', 'Commission-based', 'Negotiable'].includes(data.salaryType) && data.salaryFormat === 'Fixed Amount') &&

                            <div className=" flex flex-col w-full min-w-32 max-w-64 mt-4">
                                <label htmlFor="salary" className="text-sm text-customGray-900">Salary</label>
                                <input type="number" placeholder="Salary..." id="salary" value={data.fixedSalary} onChange={(e) => setData('fixedSalary', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {errors.fixedSalary || ''}
                                </div>
                            </div>
                        }

                        {
                            (!['', 'Commission-based', 'Negotiable'].includes(data.salaryType) && data.salaryFormat === 'Salary Range') &&

                            <div className="flex gap-2 xs:gap-5 flex-wrap xs:flex-nowrap mt-4">
                                <div className="flex flex-col w-full min-w-32 max-w-64 ">
                                    <label htmlFor="minSalary" className="text-sm text-customGray-900">Min Salary</label>
                                    <input type="number" min="0" placeholder="Min salary..." id="minSalary" value={data.minSalary} onChange={(e) => setData('minSalary', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                                    <div className="text-sm w-full text-danger-600 min-h-5" >
                                        {errors.minSalary || ''}
                                    </div>
                                </div>

                                <div className="flex flex-col w-full min-w-32 max-w-64 ">
                                    <label htmlFor="maxSalary" className="text-sm text-customGray-900">Max Salary</label>
                                    <input type="number" min="0" placeholder="Max salary..." id="maxSalary" value={data.maxSalary} onChange={(e) => setData('maxSalary', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                                    <div className="text-sm w-full text-danger-600 min-h-5" >
                                        {errors.maxSalary || ''}
                                    </div>
                                </div>
                            </div>
                        }


                    </div>
                </div>


                <h2 className="text-lg font-medium text-customGray-900 mt-3">Additional Details</h2>

                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-2 mt-3">

                    <div className="w-full max-w-64  min-w-32">
                        <label className="text-sm text-customGray-900">Education</label>
                        <Select options={["No formal education", "High School Diploma", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate (PhD)", "Professional Certification", "Other"]} placeholder={data.education} onValueChange={(option) => handleSelectChange('education', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.education || ''}
                        </div>
                    </div>

                    <div className="w-full max-w-64  min-w-32">
                        <label className="text-sm text-customGray-900">Experience</label>
                        <Select options={["No experience", "Less than 1 year", "1–2 years", "2–5 years", "5–7 years", "7–10 years", "10+ years"]} placeholder={data.experience} onValueChange={(option) => handleSelectChange('experience', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.experience || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32  ">
                        <label className="text-sm text-customGray-900">Job Level</label>
                        <Select options={["Entry Level", "Junior", "Mid Level", "Senior", "Lead", "Manager", "Director", "Executive"]} placeholder={data.jobLevel} onValueChange={(option) => handleSelectChange('jobLevel', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.jobLevel || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32  ">
                        <label className="text-sm text-customGray-900">Job Type</label>
                        <Select options={["Full-Time", "Part-Time", "Freelance", "Internship", "Temporary"]} placeholder={data.jobType} onValueChange={(option) => handleSelectChange('jobType', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.jobType || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32  ">
                        <label className="text-sm text-customGray-900">Job Category</label>
                        <Select options={['Management & Operations', 'Finance & Accounting', 'Technology & Engineering', 'Health & Education', 'Logistics', 'Manufacturing', 'Media & Art', 'Agriculture', 'Other']}
                            placeholder={data.jobCategory} onValueChange={(option) => handleSelectChange('jobCategory', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.jobCategory || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32  ">
                        <label className="text-sm text-customGray-900">Work Mode</label>
                        <Select options={["Remote", "On-site", "Hybrid"]} placeholder={data.workMode} onValueChange={(option) => handleSelectChange('workMode', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.workMode || ''}
                        </div>
                    </div>

                    {['On-site', 'Hybrid'].includes(data.workMode) &&

                        <div className="flex  flex-col max-w-64 min-w-32 ">
                            <label htmlFor="city" className="text-sm text-customGray-900">City</label>
                            <input type="text" placeholder="e.g. Kabul" id="city" value={data.city} onChange={(e) => setData('city', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                            <div className="text-sm w-full text-danger-600 min-h-5" >
                                {errors.city}
                            </div>
                        </div>

                    }



                    <div className="w-full max-w-64  min-w-32">
                        <label className="text-sm text-customGray-900" htmlFor="dob">Application Deadline</label>
                        <DatePicker handleChange={handleDeadlineChange} currentDate={data.deadline} type={'date'} dateRange={'future'} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.deadline || ''}
                        </div>
                    </div>

                </div>

                <div className="">
                    <div className="relative mt-6">
                        <label className="font-medium text-sm text-customGray-900">Job Description</label>
                        <RichTextEditor content={data.description} onChange={newContent => setData('description', newContent)}
                            placeholder="Add your job description..." />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.description || ''}
                        </div>
                    </div>

                    <div className="relative mt-6">
                        <label className="font-medium text-sm text-customGray-900">Responsibilities</label>
                        <RichTextEditor content={data.responsibilities} onChange={newContent => setData('responsibilities', newContent)}
                            placeholder="Add your job responsibilities..." />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {errors.responsibilities || ''}
                        </div>
                    </div>

                </div>

            </div>


            <div className="flex flex-wrap items-center gap-2 mt-6">
                <button disabled={processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    Save Changes
                </button>
            </div>

            {createPortal(
                (
                    props.flash.postJobSuccess &&
                    <div className={`inset-0 bg-black/60  z-50  fixed flex justify-center items-center transition-opacity duration-200 ${successModalVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div ref={successModalRef} className="grid place-items-center text-center text-success-500  max-w-[260px] sm:max-w-[360px] w-full rounded-xl p-8 absolute top-[30dvh] sm:top-[40dvh] left-1/2 -translate-x-1/2  bg-white ">
                            <p>Job Posted Successfully!</p>
                            <p>Candidates can now apply for your job.</p>
                            <Link href="/vacancies" className="flex gap-1 items-center rounded-sm text-primary-500 hover:text-primary-600 border border-primary-50 hover:border-primary-600 hover:bg-primary-50 mt-3 px-4 py-2 duration-150 text-nowrap">View Jobs<RightArrowIcon className="w-5 text-primary-500" /></Link>
                            <button type="button" onClick={() => setSuccessModalVisible(false)} className="cursor-pointer p-2 rounded-full bg-primary-50 absolute -right-4 -top-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.75 5.25L5.25 18.75" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M18.75 18.75L5.25 5.25" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ),
                root
            )}

        </form>
    )
}


PostJob.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default PostJob
