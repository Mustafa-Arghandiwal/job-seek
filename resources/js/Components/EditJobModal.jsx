import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Select from "./Select";
import RichTextEditor from "./RichTextEditor";
import DatePicker from "./DatePicker";



export default function EditJobModal({ close, showModal, vacancy}) {

    const { props } = usePage({})
    const { data, setData, reset, errors, processing, put } = useForm({
        jobTitle: vacancy.job_title,
        salaryType: vacancy.salary_type,
        salaryFormat: vacancy.salary_format || '',
        fixedSalary: vacancy.fixed_salary || '',
        minSalary: vacancy.min_salary || '',
        maxSalary: vacancy.max_salary || '',
        education: vacancy.education,
        experience: vacancy.experience,
        jobLevel: vacancy.job_level,
        jobType: vacancy.job_type,
        workMode: vacancy.work_mode,
        city: vacancy.city || '',
        deadline: vacancy.deadline,
        description: vacancy.description,
        responsibilities: vacancy.responsibilities,

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


    const [successMsg, setSuccessMsg] = useState('')
    useEffect(() => {
        if (props.flash.editJobSuccess) {
            setSuccessMsg(props.flash.editJobSuccess)
        }
    }, [props.flash.editJobSuccess])

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [successMsg])

    const handleSubmit = (e) => {
        e.preventDefault()
        put(`/employer/vacancies/${vacancy.id}`)

    }

    const root = document.getElementById("react-portal-root")
    return createPortal(
        <div className={`inset-0 bg-black/60 z-50  fixed flex justify-center items-center transition-opacity duration-200 ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative w-[80dvw] h-[80dvh] bg-white   rounded-xl p-7 sm:p-12 overflow-y-auto scrollbar-custom">
                <div className="sticky  z-10 flex justify-end -mt-6 -mr-6 sm:-mr-10 -top-6 sm:-top-10">
                    <button onClick={close} className="bg-white  w-7 sm:w-10 h-7 sm:h-10 rounded-full border border-customGray-200 grid place-items-center cursor-pointer active:scale-95">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.625 4.375L4.375 15.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.625 15.625L4.375 4.375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>




                {/* form here */}
                <form onSubmit={handleSubmit}>

                    <h1 className="font-medium text-2xl text-customGray-900 ">Edit Job: {vacancy.job_title}</h1>

                    <div className="mt-8">

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
                                            <input type="number" placeholder="Min salary..." id="minSalary" value={data.minSalary} onChange={(e) => setData('minSalary', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                                            <div className="text-sm w-full text-danger-600 min-h-5" >
                                                {errors.minSalary || ''}
                                            </div>
                                        </div>

                                        <div className="flex flex-col w-full min-w-32 max-w-64 ">
                                            <label htmlFor="maxSalary" className="text-sm text-customGray-900">Max Salary</label>
                                            <input type="number" placeholder="Max salary..." id="maxSalary" value={data.maxSalary} onChange={(e) => setData('maxSalary', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
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
                        <span className={`text-success-500 h-6 w-52 text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                            {successMsg}
                        </span>
                    </div>
                </form>




            </div>
        </div>,
        root
    )
}
