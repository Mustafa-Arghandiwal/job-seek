import { router } from "@inertiajs/react"
import { useState } from "react"


export default function CandidateSavedJob(props) {

    const [bookmarked, setBookmarked] = useState(true)
    const handleBookmark = () => {
        setBookmarked(prev => !prev)

        router.post(`/candidate/saved-jobs/${props.vacancyId}`, {}, {
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
                    className="h-16 min-w-16 bg-cover bg-center rounded-sm"
                    style={{ backgroundImage: `url(${props.logo})` }}
                ></div>
                {/* <img src={props.employerLogo} /> */}
                <div className="  flex flex-col gap-3.5">
                    <div className="flex gap-2 flex-wrap items-center  w-32 sm:w-auto break-words">
                        <h4 title={props.title} className=" text-customGray-900 font-medium  line-clamp-3">{props.title}</h4>
                        <span className="px-2 grid items-center text-sm bg-primary-50 text-primary-500 rounded-full cursor-default">{props.type}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row min-w-auto xs:min-w-[180px] sm:min-w-[380px] lg:min-w-[420px]  gap-1 sm:gap-4 flex-wrap ">
                        <div className="flex items-center gap-1 text-customGray-500 text-sm ">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.25 9.16699C19.25 15.5837 11 21.0837 11 21.0837C11 21.0837 2.75 15.5837 2.75 9.16699C2.75 6.97896 3.61919 4.88054 5.16637 3.33336C6.71354 1.78619 8.81196 0.916992 11 0.916992C13.188 0.916992 15.2865 1.78619 16.8336 3.33336C18.3808 4.88054 19.25 6.97896 19.25 9.16699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11 11.917C12.5188 11.917 13.75 10.6858 13.75 9.16699C13.75 7.64821 12.5188 6.41699 11 6.41699C9.48122 6.41699 8.25 7.64821 8.25 9.16699C8.25 10.6858 9.48122 11.917 11 11.917Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>{props.location}</span>
                        </div>
                        <div className="flex items-center  text-customGray-500 text-sm ">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_7031_12765)">
                                    <path d="M11 2.0625V19.9375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.8125 7.5625C15.8125 7.11108 15.7236 6.66408 15.5508 6.24703C15.3781 5.82997 15.1249 5.45102 14.8057 5.13182C14.4865 4.81262 14.1075 4.55941 13.6905 4.38666C13.2734 4.21391 12.8264 4.125 12.375 4.125H9.28125C8.36957 4.125 7.49523 4.48716 6.85057 5.13182C6.20591 5.77648 5.84375 6.65082 5.84375 7.5625C5.84375 8.47418 6.20591 9.34852 6.85057 9.99318C7.49523 10.6378 8.36957 11 9.28125 11H13.0625C13.9742 11 14.8485 11.3622 15.4932 12.0068C16.1378 12.6515 16.5 13.5258 16.5 14.4375C16.5 15.3492 16.1378 16.2235 15.4932 16.8682C14.8485 17.5128 13.9742 17.875 13.0625 17.875H8.9375C8.02582 17.875 7.15148 17.5128 6.50682 16.8682C5.86216 16.2235 5.5 15.3492 5.5 14.4375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs><clipPath id="clip0_7031_12765"><rect width="22" height="22" fill="white" /></clipPath></defs>
                            </svg>
                            <span>{props.salary}</span>
                        </div>
                        {props.deadline ?
                            <div className="flex items-center gap-1 text-customGray-500 text-sm ">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_7031_14651)">
                                        <path d="M17.875 3.4375H4.125C3.7453 3.4375 3.4375 3.7453 3.4375 4.125V17.875C3.4375 18.2547 3.7453 18.5625 4.125 18.5625H17.875C18.2547 18.5625 18.5625 18.2547 18.5625 17.875V4.125C18.5625 3.7453 18.2547 3.4375 17.875 3.4375Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.125 2.0625V4.8125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.875 2.0625V4.8125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.4375 7.5625H18.5625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_7031_14651">
                                            <rect width="22" height="22" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span>{props.deadline}</span>
                            </div>
                            :

                            <div className="text-danger-500 flex items-center gap-0.5  text-sm ">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                    <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.5 12.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
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
                    <svg width="18" height="18" viewBox="0 0 14 19" fill={`${bookmarked ? "#0A65CC" : "none"}`} xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13 18L6.99931 14.25L1 18V1.5C1 1.30109 1.07902 1.11032 1.21967 0.96967C1.36032 0.829018 1.55109 0.75 1.75 0.75H12.25C12.4489 0.75 12.6397 0.829018 12.7803 0.96967C12.921 1.11032 13 1.30109 13 1.5V18Z"
                            stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button onClick={() => router.get(`/vacancies/${props.vacancyId}`)} disabled={!props.deadline} className="group disabled:cursor-auto disabled:bg-primary-50 disabled:text-primary-200 flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    Apply Now
                    <svg className="text-primary-500 group-disabled:text-primary-200 group-hover:text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

            </div>
        </div>
    )
}
