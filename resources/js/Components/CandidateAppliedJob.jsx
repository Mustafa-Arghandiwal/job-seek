import { router } from "@inertiajs/react";


export default function CandidateAppliedJob(props) {



    return (

        <tr className=" border-b border-b-customGray-100">
            <td scope="row" className="p-5 whitespace-nowrap duration-150">
                <div className="flex gap-5 ">
                    <div
                        className="h-14 min-w-14 bg-cover bg-center rounded-sm"
                        style={{ backgroundImage: `url(${props.logo})` }}
                    ></div>
                    <div className="  flex flex-col gap-3.5">
                        <div className="flex gap-2 flex-wrap items-center  w-32 sm:w-auto break-words">
                            <h4 title={props.title} className=" text-customGray-900 font-medium  line-clamp-3">{props.title}</h4>
                            <span className="px-2 grid items-center text-sm bg-primary-50 text-primary-500 rounded-full cursor-default">{props.type}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row min-w-auto xs:min-w-[180px] sm:min-w-[380px] lg:min-w-[420px]  gap-1 sm:gap-4  ">
                            <div className="flex items-center gap-1 text-customGray-500 text-sm ">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.25 9.16699C19.25 15.5837 11 21.0837 11 21.0837C11 21.0837 2.75 15.5837 2.75 9.16699C2.75 6.97896 3.61919 4.88054 5.16637 3.33336C6.71354 1.78619 8.81196 0.916992 11 0.916992C13.188 0.916992 15.2865 1.78619 16.8336 3.33336C18.3808 4.88054 19.25 6.97896 19.25 9.16699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11 11.917C12.5188 11.917 13.75 10.6858 13.75 9.16699C13.75 7.64821 12.5188 6.41699 11 6.41699C9.48122 6.41699 8.25 7.64821 8.25 9.16699C8.25 10.6858 9.48122 11.917 11 11.917Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>{props.city || "Remote"}</span>
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
                        </div>
                    </div>
                </div>


            </td>


            <td scope="row" className="text-customGray-600 text-sm p-5 whitespace-nowrap duration-150">
                {props.appliedAt}
            </td>

            <td scope="row" className="p-5 whitespace-nowrap  " >
                <button onClick={() => router.get(`/vacancies/${props.vacancyId}`)}  className="group disabled:cursor-auto   flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    View Job
                </button>
            </td>
        </tr>


    )

}
