import Layout from "../../Layouts/Layout"
import Select from "../../Components/Select"
import OpenPosition from "../../Components/OpenPosition"
import { useState } from "react"
import { router } from "@inertiajs/react"



function FindJob(props) {


    const [filter, setFilter] = useState("Latest")

    const handleSelectChange = (option) => {
        if(option === filter) return //this is to prevent reduntant filter requests

        setFilter(option)
        router.get('/candidate/find-job', { filter: option }, { preserveState: true, preserveScroll: true })
    }

    console.log(props.vacancies)
    const vacancies = props.vacancies.map(vacancy => {
        const logo = vacancy.employer.detail?.logo_path ? "/storage/" + vacancy.employer.detail.logo_path : null
        const compName = vacancy.employer.user.full_name

        let salary
        let salaryFrequency
        const salaryType = vacancy.salary_type
        switch (salaryType) {
            case "Hourly":
                salaryFrequency = "/hour"
                break;
            case "Daily":
                salaryFrequency = "/day"
                break;
            case "Weekly":
                salaryFrequency = "/week"
                break;
            case "Monthly":
                salaryFrequency = "/month"
                break;
            default:
                break;
        }

        if (['Commission-based', 'Negotiable'].includes(salaryType)) {
            salary = salaryType
        } else {
            if (vacancy.fixed_salary) {
                salary = `$${vacancy.fixed_salary.toLocaleString()}${salaryFrequency}`;
            } else {
                const min = vacancy.min_salary.toLocaleString();
                const max = vacancy.max_salary.toLocaleString();
                salary = `$${min} – $${max}${salaryFrequency}`;
            }
        }
        return (
            < OpenPosition key={vacancy.id} title={vacancy.job_title} city={vacancy.city} companyName={compName} jobType={vacancy.job_type} salary={salary} logo={logo} />
        )
    })


    return (
        <div className="px-4 xl:px-[120px] border  pb-16 md:pb-36">

            <div className=" h-20 mt-5">
                <div className="text-sm text-customGray-900 max-w-44">
                    <Select options={["Latest", "Expiring Today"]} placeholder={filter} onValueChange={handleSelectChange} />
                </div>

            </div>

            {vacancies.length !== 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-y-6 gap-x-12 w-fit mx-auto">
                    {vacancies}
                </div>
                :

                <div className="grid px-4 place-items-center h-[30dvh] text-customGray-500 text-lg text-center sm:text-xl">
                    No Results
                </div>


            }



        </div>
    )
}


FindJob.layout = page => <Layout children={page} />

export default FindJob
