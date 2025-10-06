import { Link, router, usePage } from "@inertiajs/react";
import { formatSalary } from "../utils/formatSalary";
import { CalendarIcon, DollarIcon, LocationIcon, RightArrowIcon } from "../utils/svgs";


export default function Job(props) {


    const userType = usePage().props.auth.user?.user_type
    const logo = props?.logo ? `/storage/${props.logo}` : '/chess_pattern.png'
    const salary = formatSalary(props.salaryType, props.fixedSalary, props.minSalary, props.maxSalary)
    const deadline = new Date(props.deadline).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <Link href={`/vacancies/${props.id}`} className=" relative border border-primary-50 flex min-w-[260px]  sm:w-full justify-between gap-3 flex-wrap sm:flex-nowrap items-center p-8  rounded-xl
            hover:shadow-xl peer duration-150 snap-center hover:border-primary-500 ">
            <div className=" ">

                <div className=" flex gap-5 min-h-20 ">
                    <div
                        className="h-16 min-w-16 bg-cover bg-center rounded-md"
                        style={{ backgroundImage: `url(${logo})` }}
                    ></div>

                    <div className="flex flex-col  justify-around">

                        <div className="flex gap-2 flex-wrap items-center  w-32 sm:w-auto break-words  ">
                            <h4 title={props.title} className="text-[#191F33] font-medium text-base line-clamp-3  md:text-xl">{props.title}</h4>
                            <span className="px-2 grid items-center text-sm bg-primary-50 text-primary-500 rounded-[52px] cursor-default">{props.type}</span>
                        </div>

                        <div className="hidden sm:flex gap-1 flex-wrap">
                            <div className="flex items-center gap-1 text-customGray-600 text-sm "><LocationIcon className="text-customGray-300" />{props.location || "Remote"}</div>
                            <div className="flex items-center text-sm text-customGray-600"><DollarIcon className="text-customGray-300" />{salary}</div>
                            <div className="flex items-center gap-1 text-customGray-600 text-sm"><CalendarIcon className="text-customGray-300" />{deadline}</div>
                        </div>
                    </div>
                </div>


                <div className="flex sm:hidden gap-1  flex-col">
                    <div className="flex items-center gap-1 text-customGray-600 text-sm "><LocationIcon className="text-customGray-300" />{props.location || "Remote"}</div>
                    <div className="flex items-center text-sm text-customGray-600"><DollarIcon className="text-customGray-300" />{salary}</div>
                    <div className="flex items-center gap-1 text-customGray-600 text-sm"><CalendarIcon className="text-customGray-300" />{deadline}</div>
                </div>



            </div>

            <div className="flex gap-3 items-center mx-auto sm:mx-0 ">
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.get(`/vacancies/${props.id}`) }}
                    className="group flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    {userType === "candidate" ? "Apply Now" : "View Job"}
                    <RightArrowIcon className="w-6 h-6 text-primary-500 group-hover:text-white duration-150"/>

                </button>

            </div>
        </Link>
    )
}
