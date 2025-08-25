import Layout from "../../Layouts/Layout"
import Select from "../../Components/Select"
import OpenPosition from "../../Components/OpenPosition"
import { useState } from "react"
import { router } from "@inertiajs/react"
import { formatSalary } from "../../utils/formatSalary"



function FindJob(props) {


    const [filter, setFilter] = useState("Latest")

    const handleSelectChange = (option) => {
        if(option === filter) return //this is to prevent reduntant filter requests

        setFilter(option)
        router.get('/vacancies', { filter: option }, { preserveState: true, preserveScroll: true })
    }

    const vacancies = props.vacancies.map(vacancy => {
        const logo = vacancy.employer.detail?.logo_path ? "/storage/" + vacancy.employer.detail.logo_path : null
        const compName = vacancy.employer.user.full_name
        const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)

        return (
            < OpenPosition key={vacancy.id} id={vacancy.id} title={vacancy.job_title} city={vacancy.city} companyName={compName} jobType={vacancy.job_type} salary={salary} logo={logo} />
        )
    })


    return (
        <div className="px-4 xl:px-[120px] pb-16 md:pb-36">

            <div className=" h-20 mt-5">
                <div className="text-sm text-customGray-900 max-w-44">
                    <Select options={["Latest", "Expiring Today"]} placeholder={filter} onValueChange={handleSelectChange} />
                </div>

            </div>

            {vacancies.length !== 0 ?
                    // grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6  w-fit mx-auto
                <div className="min-h-[30dvh]
                    flex gap-6 flex-wrap justify-center
                    ">
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
