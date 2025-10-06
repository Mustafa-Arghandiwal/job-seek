import { Link, router } from "@inertiajs/react"
import { BriefCaseIcon, LocationIcon, RightArrowIcon } from "../utils/svgs"


export default function Employer(props) {
    const logoPath = props.logo ? "/storage/" + props.logo : "/chess_pattern.png"
    const location = props.location || "Not provided"

    const goToEmployerPage = () => {
        router.visit(`/employers/${props.id}`)
    }

    return (
        <div onClick={goToEmployerPage} className="relative border border-customGray-50 flex flex-wrap items-center sm:items-stretch flex-col sm:flex-row sm:flex-nowrap min-w-[260px]  sm:w-full justify-between gap-3 p-5 sm:p-8  rounded-xl peer duration-150 hover:border-primary-500 cursor-pointer ">
            <div className="flex gap-5">
                <div
                    className="h-16 min-w-16 bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${logoPath})` }}
                ></div>
                <div className="flex flex-col gap-3.5 ">
                    <div className="flex gap-2 flex-wrap items-center  break-words h-12 md:h-14   overflow-hidden">
                        <h4 title={props.companyName} className="text-customGray-900 font-medium text-base line-clamp-2  md:text-xl  ">{props.companyName}</h4>
                    </div>

                    <div className="hidden sm:flex gap-2.5 flex-wrap">
                        <div className="flex items-center gap-1 text-customGray-600 text-sm">
                            <LocationIcon className="w-5 h-5 text-customGray-300" />
                            {location}</div>
                        <div className="flex items-center gap-1 text-customGray-600 text-sm">
                            <BriefCaseIcon className="w-5 h-5 text-customGray-300" />
                            {props.openPositions || "No"} open position{props.openPositions === 1 ? "" : "s"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex sm:hidden gap-1 sm:gap-4 flex-col">
                <div className="flex items-center gap-1 text-customGray-600 text-sm">
                    <LocationIcon className="w-5 h-5 text-customGray-300" />
                    {location}</div>
                <div className="flex items-center gap-1 text-customGray-600 text-sm">
                    <BriefCaseIcon className="w-5 h-5 text-customGray-300" />
                    {props.openPositions || "No"} open position{props.openPositions === 1 ? "" : "s"}
                </div>
            </div>

            <div className="flex gap-3 items-center  ">
                <Link href={`/employers/${props.id}#open-positions-section`} onClick={(e) => e.stopPropagation()}
                    className="group flex gap-3 text-sm sm:text-base rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    Open Positions

                    <RightArrowIcon className="text-primary-500 w-6 h-6 group-hover:text-white duration-150" />

                </Link>

            </div>
        </div>
    )
}
