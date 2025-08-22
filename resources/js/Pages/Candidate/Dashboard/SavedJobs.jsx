

import CandidateFavoriteJob from "../../../Components/CandidateFavoriteJob"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import { formatSalary } from "../../../utils/formatSalary"



function FavoriteJobs({ savedVacancies }) {


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

        return <CandidateFavoriteJob key={vacancy.id} logo={logoPath} title={vacancy.job_title} type={vacancy.job_type}
                    location={vacancy.city} salary={salary} deadline={remainingMsg} />

    })

    return (
        <div className="">
            <h1 className="text-customGray-900 font-medium text-lg">Saved Jobs</h1>

            <div className="mt-2">
                {savedJobs}
            </div>
        </div>
    )
}


FavoriteJobs.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default FavoriteJobs
