
import CandidateAppliedJob from "../../../Components/CandidateAppliedJob"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import { formatSalary } from "../../../utils/formatSalary"
import PaginationLinks from "../../../utils/getPaginationLinks"

function AppliedJobs({ applications }) {


    const applicationEls = applications.data.map(app => {
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
            <h1 className="text-lg text-customGray-900 font-medium flex gap-1">Applied Jobs
                <span className="text-customGray-400 font-normal">({applications.total})</span>
            </h1>

            {applications.data.length !== 0 ?
                <div>
                    <table className="mt-5 w-full text-left overflow-x-auto min-w-[600px] ">
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

                    <PaginationLinks paginator={applications} />

                </div>

                :

                <div className="h-[40dvh] mt-2 grid place-items-center font-medium text-lg text-customGray-600 ">Your applications will appear here.</div>
            }


        </>
    )
}


AppliedJobs.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default AppliedJobs
