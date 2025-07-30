import { Link } from "@inertiajs/react"



export default function Employer(props) {
    const logoPath = props.logo ? "/storage/" + props.logo : "/chess_pattern.png"
    const location = props.location || "Location not specified"


    return (
        <Link href={`/employers/${props.id}`} className=" relative border border-customGray-50 flex flex-wrap flex-col sm:flex-row sm:flex-nowrap min-w-[260px]  sm:w-full justify-between gap-3  sm:items-center p-5 sm:p-8  rounded-xl peer duration-150 hover:border-primary-500 cursor-pointer ">
            <div className="flex gap-5">
                <div
                    className="h-16 min-w-16 bg-cover bg-center rounded-md"
                    style={{backgroundImage: `url(${logoPath})`}}
                ></div>
                <div className="flex flex-col gap-3.5 ">
                    <div className="flex gap-2 flex-wrap items-center  break-words h-12 md:h-14   overflow-hidden">
                        <h4 title={props.companyName} className="text-customGray-900 font-medium text-base line-clamp-2  md:text-xl  ">{props.companyName}</h4>

                    </div>
                    <div className="flex gap-1 sm:gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5 text-customGray-600 text-sm  ">
                            <svg className="shrink-0" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.25 9.16699C19.25 15.5837 11 21.0837 11 21.0837C11 21.0837 2.75 15.5837 2.75 9.16699C2.75 6.97896 3.61919 4.88054 5.16637 3.33336C6.71354 1.78619 8.81196 0.916992 11 0.916992C13.188 0.916992 15.2865 1.78619 16.8336 3.33336C18.3808 4.88054 19.25 6.97896 19.25 9.16699Z" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11 11.917C12.5188 11.917 13.75 10.6858 13.75 9.16699C13.75 7.64821 12.5188 6.41699 11 6.41699C9.48122 6.41699 8.25 7.64821 8.25 9.16699C8.25 10.6858 9.48122 11.917 11 11.917Z" stroke="#C5C9D6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {location}</div>
                        <div className="flex items-center gap-1 text-customGray-600 text-sm">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_1754_48742)">
                                    <path d="M18.5635 6.1875H3.43848C3.05878 6.1875 2.75098 6.4953 2.75098 6.875V17.875C2.75098 18.2547 3.05878 18.5625 3.43848 18.5625H18.5635C18.9432 18.5625 19.251 18.2547 19.251 17.875V6.875C19.251 6.4953 18.9432 6.1875 18.5635 6.1875Z" stroke="#C5C9D6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.4375 6.1875V4.8125C14.4375 4.44783 14.2926 4.09809 14.0348 3.84023C13.7769 3.58237 13.4272 3.4375 13.0625 3.4375H8.9375C8.57283 3.4375 8.22309 3.58237 7.96523 3.84023C7.70737 4.09809 7.5625 4.44783 7.5625 4.8125V6.1875" stroke="#C5C9D6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.2511 10.8545C16.7437 12.3052 13.8972 13.0669 11.0004 13.0623C8.1041 13.0669 5.25808 12.3054 2.75098 10.8552" stroke="#C5C9D6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.96875 10.3125H12.0312" stroke="#C5C9D6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1754_48742">
                                        <rect width="22" height="22" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            1 open position
                        </div>



                    </div>
                </div>
            </div>

            <div className="flex gap-3 items-center  ">
                <button className="group flex gap-3 text-sm sm:text-base rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    Open Positions
                    <svg className="text-primary-500 group-hover:text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>


                </button>

            </div>
        </Link>
    )
}
