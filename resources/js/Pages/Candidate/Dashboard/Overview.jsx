import { Link, usePage } from "@inertiajs/react"
import Job from "../../../Components/Job"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import { formatSalary } from "../../../utils/formatSalary"
import CandidateAppliedJob from "../../../Components/CandidateAppliedJob"
import { BriefCaseIcon, BookmarkIcon, RightArrowIcon } from "../../../utils/svgs"



function Overview({ appliedJobsCount, savedJobsCount, applications }) {

    const candidateName = usePage().props.auth.user.full_name


    const applicationEls = applications.map(app => {
        const logo = app.vacancy.employer.detail?.logo_path ? "/storage/" + app.vacancy.employer.detail.logo_path : "/chess_patter.png"
        const salary = formatSalary(app.vacancy.salary_type, app.vacancy.fixed_salary, app.vacancy.min_salary, app.vacancy.max_salary)
        const appliedAt = new Date(app.applied_at).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        return <CandidateAppliedJob key={app.id} vacancyId={app.vacancy_id} logo={logo} title={app.vacancy.job_title}
            type={app.vacancy.job_type} city={app.vacancy.city} salary={salary} appliedAt={appliedAt} />

    })



    return (
        <>
            <h2 className="font-medium text-lg text-customGray-900 ">Hello {candidateName}</h2>
            <p className="text-sm text-customGray-500 mt-2">Here are some highlights</p>


            <div className="flex sm:gap-6 flex-wrap sm:flex-nowrap">

                <div className="flex justify-between w-[312px] rounded-lg bg-primary-50 p-6 mt-6">
                    <div>
                        <div className="font-semibold text-customGray-900 text-2xl">{appliedJobsCount}</div>
                        <div className="text-customGray-600 text-sm">Applied Job{appliedJobsCount !== 1 && 's'}</div>
                    </div>
                    <div className="grid place-items-center p-4 bg-white rounded-[5px]">
                        <BriefCaseIcon className="w-8 h-8 text-primary-500" />
                    </div>
                </div>

                <div className="flex justify-between w-[312px] rounded-lg bg-warning-50 p-6 mt-6">
                    <div>
                        <div className="font-semibold text-customGray-900 text-2xl">{savedJobsCount}</div>
                        <div className="text-customGray-600 text-sm">Saved Job{savedJobsCount !== 1 && 's'}</div>
                    </div>
                    <div className="grid place-items-center p-4 bg-white rounded-[5px]">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 28L15.9991 23L8 28V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H23C23.2652 5 23.5196 5.10536 23.7071 5.29289C23.8946 5.48043 24 5.73478 24 6V28Z" fill="#FFF6E6" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

            </div>

            <div className="flex justify-between mt-8">
                <h3 className="font-medium text-customGray-900">Recently Applied Jobs</h3>
                {applications.length !== 0 &&
                    <Link href="/candidate/applied-jobs" className="flex items-center gap-1 cursor-pointer font-medium text-customGray-500 hover:text-primary-500 duration-100">
                        <span>View all</span>
                        <RightArrowIcon />
                    </Link>
                }
            </div>



            {applications.length !== 0 ?
                <div className="overflow-x-auto scrollbar-custom  ">
                    <table className="mt-5 w-full text-left  ">
                        <thead className="text-customGray-700 text-xs bg-customGray-50 rounded-sm ">
                            <tr>
                                <td className="px-5 py-3" scope="col">JOB</td>
                                <td className="px-5 py-3" scope="col">DATE APPLIED</td>
                                <td className="px-5 py-3" scope="col">ACTION</td>
                            </tr>
                        </thead>

                        <tbody>
                            {applicationEls}
                        </tbody>

                    </table>
                </div>
                :

                <div className="h-[25dvh] mt-6 flex items-center justify-center gap-2   text-customGray-600 ">
                    <p>You haven't applied to any jobs yet.</p>
                    <Link className="text-primary-500 underline" href="/vacancies">
                        Find a Job
                    </Link>

                </div>
            }



        </>
    )
}


Overview.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default Overview
