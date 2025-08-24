

import CandidateSavedJob from "../../../Components/CandidateSavedJob"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import { formatSalary } from "../../../utils/formatSalary"



function SavedJobs({ savedVacancies }) {


    const savedJobs = savedVacancies.map(vacancy => {
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
            <h1 className="text-customGray-900 font-medium text-lg">Saved Jobs</h1>

            <div className="mt-2">
                {savedVacancies.length !== 0 ?
                savedJobs
                    :
                    <div className="h-[40dvh] grid place-items-center font-medium text-lg text-customGray-600 ">You haven't saved any jobs yet.</div>
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
