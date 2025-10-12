import { Link } from "@inertiajs/react";
import { LocationIcon } from "../utils/svgs";
import TextAvatar from "./TextAvatar";

export default function OpenPosition(props) {


    return (
        <Link href={`/vacancies/${props.id}`} className="bg-white relative border border-primary-50 hover:border-primary-500 flex flex-col
             xs:h-[242px] w-[400px]   justify-between  p-8  rounded-xl  hover:shadow-xl
             duration-150 snap-center cursor-pointer">

            <div className="flex gap-5">
                {props.logo ?
                    <div style={{ backgroundImage: `url(${"/storage/" + props.logo})` }} className="h-14 min-w-14 bg-cover bg-center rounded-sm" ></div>
                    :
                    <TextAvatar name={props.companyName} className="h-14 min-w-14 rounded-sm text-2xl" />
                }
                <div className="flex gap-1.5 flex-col w-32 sm:w-auto break-words">
                    <h4 className="text-[#191F33] font-medium  line-clamp-3  text-xl">{props.companyName}</h4>
                    <div className="flex items-center gap-1.5 text-[#5E6670] text-sm ">
                        <LocationIcon className="text-customGray-500 w-5 h-5" />
                        {props.city || "Remote"}</div>
                </div>
            </div>

            <p title={props.title} className="text-customGray-900 line-clamp-2  font-medium text-xl mt-2">{props.title}</p>
            <div className="flex flex-wrap items-center gap-2">
                <p className="text-customGray-600 text-sm">{props.jobType}</p>
                <div className="text-customGray-600">&bull;</div>
                <p className="text-customGray-600 text-sm">{props.salary}</p>
            </div>

        </Link>
    )

}
