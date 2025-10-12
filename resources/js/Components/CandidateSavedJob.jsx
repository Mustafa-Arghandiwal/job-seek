import { router } from "@inertiajs/react"
import { useState } from "react"
import { DollarIcon, LocationIcon, CalendarIcon, ExpiredIcon, BookmarkIcon, RightArrowIcon } from "../utils/svgs"
import TextAvatar from "./TextAvatar"


export default function CandidateSavedJob(props) {

    const [bookmarked, setBookmarked] = useState(true)
    const handleBookmark = () => {
        setBookmarked(prev => !prev)

        router.post(`/candidate/saved-jobs/${props.vacancyId}`, {}, {
            onSuccess: (page) => {
                if (page.props?.bookmarked !== undefined) {
                    setBookmarked(page.props.bookmarked)
                }
            },
            onError: () => {
                setBookmarked(prev => !prev)
            }
        })
    }

    return (
        <div className="relative border-b border-customGray-100 border border-t-transparent border-x-transparent hover:rounded-lg  hover:border-primary-500 flex flex-col lg:flex-row min-w-[260px] sm:w-full justify-between gap-3 items-center p-4 duration-150 ">
            <div className="flex gap-5">
                {props.logo ?
                    <div style={{ backgroundImage: `url(${"/storage/" + props.logo})` }} className="h-16 min-w-16 bg-cover bg-center rounded-sm"></div>
                    :
                    <TextAvatar name={props.companyName} className="h-16 min-w-16 rounded-sm text-2xl" />
                }
                <div className="flex flex-col gap-3.5">
                    <div className="flex gap-2 items-center flex-wrap ">
                        <h4 title={props.title} className=" text-customGray-900 font-medium  line-clamp-3">{props.title}</h4>
                        <span className="px-2 grid items-center text-sm bg-primary-50 text-primary-500 rounded-full cursor-default">{props.type}</span>
                    </div>
                    <div className="flex gap-1 sm:gap-2 flex-wrap ">
                        <div className="flex items-center gap-1 text-customGray-600 text-sm ">
                            <LocationIcon className="text-customGray-300" />
                            <span>{props.location || "Remote"}</span>
                        </div>
                        <div className="flex items-center  text-customGray-600 text-sm ">
                            <DollarIcon className="text-customGray-300" />
                            <span>{props.salary}</span>
                        </div>
                        {props.deadline ?
                            <div className="flex items-center gap-1 text-customGray-600 text-sm ">
                                <CalendarIcon className="text-customGray-300" />
                                <span>{props.deadline}</span>
                            </div>
                            :

                            <div className="text-danger-500 flex items-center gap-0.5  text-sm ">
                                <ExpiredIcon />
                                Expired
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="flex gap-3 items-center mx-auto sm:mx-0 ">
                <button
                    onClick={handleBookmark}
                    title={bookmarked ? "Remove from Saved Jobs" : "Add to Saved Jobs"} className="p-4  rounded-sm cursor-pointer hover:bg-primary-50">
                    <BookmarkIcon bookmarked={bookmarked} className="text-primary-500" />
                </button>
                <button onClick={() => router.get(`/vacancies/${props.vacancyId}`)} className="group flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    Apply Now
                    <RightArrowIcon className="w-6 h-6 text-primary-500 group-disabled:text-primary-200 group-hover:text-white duration-150" />
                </button>

            </div>
        </div>
    )
}
