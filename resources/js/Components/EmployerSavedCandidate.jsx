
import { router } from "@inertiajs/react"
import { useState } from "react"


export default function EmployerSavedCandidate(props) {

    console.log(props)
    const [bookmarked, setBookmarked] = useState(true)
    const handleBookmark = () => {
        setBookmarked(prev => !prev)

        router.post(`/employer/saved-candidates/${props.candidateId}`, {}, {
            onSuccess: (page) => {
                if(page.props?.bookmarked !== undefined) {
                    setBookmarked(page.props.bookmarked)
                }
            },
            onError: () => {
                setBookmarked(prev => !prev)
            }
        })
    }

    return (
        <div className=" relative border-b border-customGray-100 border border-t-transparent border-x-transparent hover:rounded-lg  hover:border-primary-500 flex min-w-[260px]  sm:w-full justify-between gap-3 flex-wrap items-center p-4 duration-150 ">
            <div className="flex gap-5">
                <div
                    className="h-16 min-w-16 bg-cover bg-center  rounded-sm"
                    style={{ backgroundImage: `url(${props.profilePic})` }}
                ></div>
                <div className="  flex flex-col gap-3.5">
                    <div className="flex gap-1 flex-col  w-32 sm:w-auto break-words">
                        <h4 title={props.name} className="text-customGray-900 text-lg font-medium  line-clamp-3">{props.name}</h4>
                        <span className="block text-customGray-500 text-sm">{props.title}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 items-center mx-auto sm:mx-0 ">
                <button
                    onClick={handleBookmark}
                    title={bookmarked ? "Remove from Saved Jobs" : "Add to Saved Jobs"} className="p-4  rounded-sm cursor-pointer hover:bg-primary-50">
                    <svg width="18" height="18" viewBox="0 0 14 19" fill={`${bookmarked ? "#0A65CC" : "none"}`} xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13 18L6.99931 14.25L1 18V1.5C1 1.30109 1.07902 1.11032 1.21967 0.96967C1.36032 0.829018 1.55109 0.75 1.75 0.75H12.25C12.4489 0.75 12.6397 0.829018 12.7803 0.96967C12.921 1.11032 13 1.30109 13 1.5V18Z"
                            stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button onClick={() => router.get(`/vacancies/${props.vacancyId}`)} className="group disabled:cursor-auto   flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    View Profile
                    <svg className="text-primary-500 group-disabled:text-primary-200 group-hover:text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

            </div>
        </div>
    )
}
