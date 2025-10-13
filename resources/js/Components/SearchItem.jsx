import { Link } from "@inertiajs/react";
import { LocationIcon } from "../utils/svgs";
import TextAvatar from "./TextAvatar";


export default function SearchItem({ id, logo, companyName, title, location, setIsTyping }) {


    return (
        <Link href={`/vacancies/${id}`} onClick={() => setIsTyping(false)}
            className="flex px-4 py-3 items-center gap-2 sm:gap-4 w-full hover:bg-customGray-50/60 cursor-pointer duration-150">

            {logo ?
                <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-sm bg-cover shrink-0 bg-center" style={{ backgroundImage: `url(${"/storage/" + logo})` }}></div>
                :
                <TextAvatar name={companyName} className="h-8 sm:h-10 w-8 rounded-sm  sm:w-10 shrink-0" />
            }
            <div>
                <p className=" text-customGray-900 text-sm sm:text-lg break-words line-clamp-2 ">{title}</p>
                <div className="flex items-center gap-1 text-customGray-600 text-xs sm:text-sm">
                    <LocationIcon className="text-customGray-300 w-4 " />
                    {location || "Remote"}
                </div>

            </div>
        </Link>
    )
}
