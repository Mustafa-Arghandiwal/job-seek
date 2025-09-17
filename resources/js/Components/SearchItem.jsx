import { Link } from "@inertiajs/react";
import { LocationIcon } from "../utils/svgs";


export default function SearchItem({id, logo, title, location, setIsTyping}) {


    return (
        <Link href={`/vacancies/${id}`} onClick={() => setIsTyping(false)}
            className="flex px-4 py-3 items-center gap-2 sm:gap-4 w-full hover:bg-customGray-50/60 cursor-pointer duration-150">
            <div className="h-8 sm:h-10 w-8 sm:w-10 bg-cover shrink-0 bg-center" style={{backgroundImage: `url(${logo ? "/storage/" + logo : '/chess_pattern.png'})`}}>
            </div>
            <div>
                <p className=" text-customGray-900 text-sm sm:text-lg break-words line-clamp-2 ">{title}</p>
                <div className="flex items-center gap-1 text-customGray-600 text-xs sm:text-sm">
                    <LocationIcon className="text-customGray-300 w-4 "/>
                    {location || "Remote"}
                </div>

            </div>
        </Link>
    )
}
