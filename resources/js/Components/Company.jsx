import { Link, router } from "@inertiajs/react";
import { LocationIcon } from "../utils/svgs";
import TextAvatar from "./TextAvatar";


export default function Company(props) {

    return (
        <div onClick={() => router.visit(`/employers/${props.id}`)}
            className="flex flex-col justify-between cursor-pointer sm:gap-8 border min-h-[200px] sm:h-auto border-customGray-50 rounded-xl p-6 sm:p-8 max-w-[300px]
            min-w-[220px] sm:min-w-[290px]  hover:shadow-2xl hover:border-primary-500 duration-150 snap-center bg-white">
            <div className="flex gap-4 ">
                {props.logo ?
                    <div style={{ backgroundImage: `url(${"/storage/" + props.logo})` }} className="h-10 sm:h-16 min-w-10 sm:min-w-16 bg-cover bg-center rounded-sm"></div>
                    :
                    <TextAvatar name={props.name} className="h-10 sm:h-16 min-w-10 sm:min-w-16 rounded-sm text-2xl" />
                }

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-center items-center gap-2  flex-wrap">
                        <div className="h-[58px]  max-w-full">
                            <h4 title={props.name} className="text-[#191F33] font-medium text-base sm:text-lg line-clamp-2">{props.name}</h4>
                            {props.location &&
                                <div className="flex items-center gap-1 text-[#5E6670] text-sm mt-1">
                                    <LocationIcon className="w-[18px] h-[18px] text-customGray-300" />
                                    {props.location}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Link href={`/employers/${props.id}#open-positions-section`} onClick={(e) => e.stopPropagation()}
                className="rounded-sm text-sm sm:text-base font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 grid place-items-center py-3 duration-150 text-nowrap cursor-pointer   ">
                Open Positions
            </Link>
        </div>
    )
}
