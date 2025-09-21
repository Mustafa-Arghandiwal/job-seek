import Layout from "../../Layouts/Layout"
import Select from "../../Components/Select"
import OpenPosition from "../../Components/OpenPosition"
import { useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { formatSalary } from "../../utils/formatSalary"
import EmployerLayout from "../../Layouts/EmployerLayout"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../Components/Pagination"



function FindJob(props) {


    const [filterDate, setFilterDate] = useState("Latest")
    const [filterCategory, setFilterCategory] = useState(props.filterCategory || "All Categories")

    const handleDateChange = (option) => {
        if (option === filterDate) return //this is to prevent reduntant filter requests

        setFilterDate(option)
        router.get('/vacancies', { filterDate: option, filterCategory: filterCategory }, { preserveState: true, preserveScroll: true })
    }

    const handleCategoryChange = (option) => {
        if (option === filterCategory) return //this is to prevent reduntant filter requests

        setFilterCategory(option)
        router.get('/vacancies', { filterDate: filterDate, filterCategory: option }, { preserveState: true, preserveScroll: true })
    }

    const vacancies = props.vacancies.data.map(vacancy => {
        const logo = vacancy.employer.detail?.logo_path ? "/storage/" + vacancy.employer.detail.logo_path : null
        const compName = vacancy.employer.user.full_name
        const salary = formatSalary(vacancy.salary_type, vacancy.fixed_salary, vacancy.min_salary, vacancy.max_salary)

        return (
            < OpenPosition key={vacancy.id} id={vacancy.id} title={vacancy.job_title} city={vacancy.city} companyName={compName} jobType={vacancy.job_type} salary={salary} logo={logo} />
        )
    })

    const { url } = usePage()
    const activeLink = props.vacancies.links.find(link => link.active)
    const activeLabel = activeLink ? Number(activeLink.label) : 1
    const lastLabel = Number(props.vacancies.last_page)
    const paginationLinks = props.vacancies.links.map((link, index) => {
        if (isNaN(link.label)) return
        const currLabel = Number(link.label)
        let show = false
        if (lastLabel <= 5) {
            show = true
        } else if (currLabel === activeLabel) {
            show = true
        } else if (activeLabel <= 2) {
            show = currLabel <= 5
        } else if (activeLabel >= lastLabel - 1) {
            show = currLabel >= lastLabel - 4
        } else {
            show = currLabel >= (activeLabel - 2) && currLabel <= (activeLabel + 2)
        }
        if (!show) return
        return (
            <PaginationItem key={index}>
                <PaginationLink href={link.url} isActive={link.url.endsWith(url)}>{link.label}</PaginationLink>
            </PaginationItem>
        )
    })


    return (
        <div className="px-4 xl:px-[120px] pb-16 md:pb-36">

            <div className="  mt-5  flex flex-col sm:flex-row gap-1 sm:gap-5">
                <div className="text-sm text-customGray-900 min-w-56">
                    <Select options={["Latest", "Expiring Today"]} placeholder={filterDate} onValueChange={handleDateChange} />
                </div>
                <div className="text-sm text-customGray-900 min-w-56">
                    <Select options={['All Categories', 'Management & Operations', 'Finance & Accounting', 'Technology & Engineering', 'Health & Education', 'Logistics', 'Manufacturing', 'Media & Art', 'Agriculture', 'Other']}
                        placeholder={filterCategory} onValueChange={handleCategoryChange} />
                </div>

            </div>

            {vacancies.length !== 0 ?
                <div className="min-h-[30dvh] mt-6 flex gap-6 flex-wrap justify-center">
                    {vacancies}
                </div>
                :

                <div className="grid px-4 place-items-center h-[30dvh] text-customGray-500 text-lg text-center sm:text-xl">
                    No Results
                </div>


            }



            <Pagination className=" mt-10">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={props.vacancies.prev_page_url} />
                    </PaginationItem>

                    {(props.vacancies.last_page > 5 && props.vacancies.current_page > 3) &&
                        < PaginationItem >
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    {paginationLinks}

                    {(props.vacancies.last_page > 5 && (props.vacancies.current_page <= (props.vacancies.last_page - 3))) &&
                        < PaginationItem >
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    <PaginationItem>
                        <PaginationNext href={props.vacancies.next_page_url} />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>

        </div >
    )
}


FindJob.layout = page => {

    const userType = page.props?.auth?.user?.user_type
    if (userType === "employer") {
        return <EmployerLayout>{page}</EmployerLayout>
    }
    return <Layout>{page}</Layout>
}

export default FindJob
