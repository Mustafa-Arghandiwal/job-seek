import { Link } from "@inertiajs/react";
import { LineChartIcon } from "../utils/svgs";


export default function Category(props) {
    const params = new URLSearchParams({filterCategory: props.name}).toString()
    return (
        <Link href={`/vacancies?${params}`}
            className="min-w-[200px] lg:min-w-auto w-[200px] lg:w-auto shadow-lg cursor-pointer border border-primary-50 hover:border-primary-300 group transition-all duration-150  rounded-xl grid place-items-center gap-6  py-8 snap-center">
            <div className="h-18 w-18 bg-primary-50 rounded-full grid place-items-center text-primary-500 group-hover:text-white group-hover:bg-primary-500 duration-150">
                {props.icon}
            </div>
            <div className="flex flex-col gap-1.5 w-full items-center px-2">
                <span className="text-[18191c] text-xl sm:text-2xl text-center">{props.name}</span>
                <span className="text-customGray-500 text-sm sm:text-base">{props.openCount} open position{props.openCount !== 1 ? "s" : ""}</span>
            </div>
        </Link>
    )
}
