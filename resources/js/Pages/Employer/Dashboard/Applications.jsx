import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout"
import EmployerLayout from "../../../Layouts/EmployerLayout"



function Applications({ vacancy }) {

    console.log(vacancy)
    return (
        <div className="">
            <h1 className="font-medium text-xl text-customGray-900">Applications for <span className="italic">{vacancy.job_title}</span></h1>
            <div className="grid grid-cols-[1fr_312px] gap-x-6 mt-6  w-fit">
                <div className="rounded-md bg-customGray-100 px-5 py-4 min-w-[312px] max-w-[880px] ">
                    <h3 className="text-customGray-900 text-sm">All Applications (xxx)</h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                    </div>

                </div>

                <div className="rounded-md bg-customGray-100 px-5 py-4 w-[312px]">
                    <h3 className="text-customGray-900 text-sm">Shortlisted (xx)</h3>
                    <div className="mt-3 flex flex-col gap-3">
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                        <div className="w-[272px] h-[218px] bg-white rounded-sm"></div>
                    </div>

                </div>


            </div>
        </div>
    )
}



Applications.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Applications
