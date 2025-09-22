

import CandidateSavedJob from "../../../Components/CandidateSavedJob"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import { formatSalary } from "../../../utils/formatSalary"
import PaginationLinks from "../../../utils/getPaginationLinks"


function SavedJobs({ savedVacancies }) {


    const savedJobs = savedVacancies.data.map(vacancy => {
        const logoPath = vacancy.logo_path ? "/storage/" + vacancy.logo_path : "/chess_pattern.png"
        const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)
        const today = new Date()
        const endDate = new Date(vacancy.deadline)
        const remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        let remainingMsg
        if (remainingDays >= 0 && !vacancy.manually_expired) {
            remainingMsg = `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'} remaining`
        }

        return <CandidateSavedJob key={vacancy.id} vacancyId={vacancy.vacancy_id} logo={logoPath} title={vacancy.job_title}
            type={vacancy.job_type} location={vacancy.city} salary={salary} deadline={remainingMsg} />

    })

    return (
        <div className="">
            <h1 className="text-customGray-900 font-medium text-lg flex gap-1">Saved Jobs
                <span className="font-normal text-customGray-400">({savedVacancies.data.length})</span>
            </h1>

            <div className="mt-2">
                {savedVacancies.data.length !== 0 ?
                    <>
                        {savedJobs}
                        <PaginationLinks paginator={savedVacancies} />

                    </>

                    :
                    <div className="h-[40dvh] grid place-items-center font-medium text-lg text-customGray-600 ">You have no saved jobs.</div>
                }
            </div>
        </div>
    )
}


SavedJobs.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default SavedJobs
