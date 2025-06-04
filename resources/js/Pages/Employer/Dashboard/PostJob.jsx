

import { useForm, usePage } from "@inertiajs/react"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"
import Select from "../../../Components/Select"
import DatePicker from "../../../Components/DatePicker"
import RichTextEditor from "../../../Components/RichTextEditor"



function Overview() {

    const { props } = usePage({})
    const { data, setData, errors } = useForm({
        jobTitle: '',
        salaryType: '',
        salaryFormat: 'Fixed Amount',
        fixedSalary: '',
        minSalary: '',
        maxSalary: '',
        education: '',
        experience: '',
        jobLevel: '',
        jobType: '',
        workMode: '',
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


    const handleSubmit = (e) => {
        e.preventDefault()
    }



    return (
        <form onSubmit={handleSubmit}>

            <h1 className="font-medium text-2xl text-customGray-900 ">Post a Job</h1>

            <div className="mt-8">

                <div className="flex  flex-col w-full  min-w-44 ">
                    <label htmlFor="jobTitle" className="text-sm text-customGray-900">Job Title</label>
                    <input type="text" placeholder="e.g. Finance Officer" id="jobTitle" value={data.jobTitle} onChange={(e) => setData('jobTitle', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.jobTitle}
                    </div>
                </div>


                <div className="mt-3">

                    <h2 className="text-lg font-medium text-customGray-900">Salary</h2>

                    <div>
                        <div className="flex lg:gap-5  lg:items-center  flex-col lg:flex-row ">

                            <div className=" mt-3 w-full max-w-64  min-w-32  ">
                                <label className="text-sm text-customGray-900">Salary Type</label>
                                <Select options={['Hourly', 'Daily', 'Weekly', 'Monthly', 'Commission-based', 'Negotiable']} placeholder={data.salaryType} onValueChange={(option) => handleSelectChange('salaryType', option)} />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {props.errors.salaryType || ''}
                                </div>
                            </div>

                            {
                                !['', 'Commission-based', 'Negotiable'].includes(data.salaryType) &&

                                <div className="w-full  max-w-fit flex flex-col xs:flex-row  gap-2 xs:gap-4 lg:mt-5 text-customGray-900 text-sm ">
                                    <label className="cursor-pointer flex  gap-1">
                                        <input type="radio" name="salaryFormat" value="Fixed Amount" checked={data.salaryFormat === 'Fixed Amount'} onChange={e => setData('salaryFormat', e.target.value)} className="cursor-pointer" />
                                        <span>Fixed Amount</span>
                                    </label>
                                    <label className="cursor-pointer flex  gap-1" >
                                        <input type="radio" name="salaryFormat" value="Salary Range" checked={data.salaryFormat === 'Salary Range'} onChange={e => setData('salaryFormat', e.target.value)} className="cursor-pointer" />
                                        <span>Salary Range</span>
                                    </label>

                                </div>

                            }
                        </div>


                        {
                            (!['', 'Commission-based', 'Negotiable'].includes(data.salaryType) && data.salaryFormat === 'Fixed Amount') &&

                            <div className=" flex flex-col w-full min-w-32 max-w-64 mt-4">
                                <label htmlFor="salary" className="text-sm text-customGray-900">Salary</label>
                                <input type="number" placeholder="Salary..." id="salary" value={data.salary} onChange={(e) => setData('salary', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {props.errors.salary || ''}
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
                                        {props.errors.minSalary || ''}
                                    </div>
                                </div>

                                <div className="flex flex-col w-full min-w-32 max-w-64 ">
                                    <label htmlFor="maxSalary" className="text-sm text-customGray-900">Max Salary</label>
                                    <input type="number" placeholder="Max salary..." id="maxSalary" value={data.maxSalary} onChange={(e) => setData('maxSalary', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                                    <div className="text-sm w-full text-danger-600 min-h-5" >
                                        {props.errors.maxSalary || ''}
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
                            {props.errors.education || ''}
                        </div>
                    </div>

                    <div className="w-full max-w-64  min-w-32">
                        <label className="text-sm text-customGray-900">Experience</label>
                        <Select options={["No experience", "Less than 1 year", "1–2 years", "2–5 years", "5–7 years", "7–10 years", "10+ years"]} placeholder={data.experience} onValueChange={(option) => handleSelectChange('experience', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.experience || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32  ">
                        <label className="text-sm text-customGray-900">Job Level</label>
                        <Select options={["Entry Level", "Junior", "Mid Level", "Senior", "Lead", "Manager", "Director", "Executive"]} placeholder={data.jobLevel} onValueChange={(option) => handleSelectChange('jobLevel', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.jobLevel || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32  ">
                        <label className="text-sm text-customGray-900">Job Type</label>
                        <Select options={["Full-Time", "Part-Time", "Freelance", "Internship", "Temporary"]} placeholder={data.jobType} onValueChange={(option) => handleSelectChange('jobType', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.jobType || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32  ">
                        <label className="text-sm text-customGray-900">Work Mode</label>
                        <Select options={["Remote", "On-site", "Hybrid"]} placeholder={data.workMode} onValueChange={(option) => handleSelectChange('workMode', option)} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.workMode || ''}
                        </div>
                    </div>


                    <div className="w-full max-w-64  min-w-32">
                        <label className="text-sm text-customGray-900" htmlFor="dob">Application Deadline</label>
                        <DatePicker handleChange={handleDeadlineChange} currentDate={data.deadline} type={'date'} />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.deadline || ''}
                        </div>
                    </div>

                </div>

                <div className="">
                    <div className="relative mt-6">
                        <label className="font-medium text-sm text-customGray-900">Job Description</label>
                        <RichTextEditor content={data.description} onChange={newContent => setData('description', newContent)}
                            placeholder="Add your job description..." />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.description || ''}
                        </div>
                    </div>

                    <div className="relative mt-6">
                        <label className="font-medium text-sm text-customGray-900">Responsibilities</label>
                        <RichTextEditor content={data.responsibilities} onChange={newContent => setData('responsibilities', newContent)}
                            placeholder="Add your job responsibilities..." />
                        <div className="text-sm w-full text-danger-600 min-h-5" >
                            {props.errors.responsibilities || ''}
                        </div>
                    </div>

                </div>




            </div>
        </form>
    )
}


Overview.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Overview
