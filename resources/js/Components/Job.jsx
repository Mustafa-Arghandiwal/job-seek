

export default function Job(props) {


    return (
        <div className=" relative border border-primary-50 flex min-w-[260px]  sm:w-full justify-between gap-3 flex-wrap items-center p-8  rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:shadow-xl peer duration-150 snap-center">
            <div className="flex gap-5">
                <div
                    className="h-16 min-w-16 bg-cover bg-center"
                    style={{ backgroundImage: `url(${props.employerLogo})` }}
                ></div>
                {/* <img src={props.employerLogo} /> */}
                <div className="flex flex-col gap-3.5">
                    <div className="flex gap-2 flex-wrap items-center  w-32 sm:w-auto break-words">
                        <h4 title={props.jobTitle} className="text-[#191F33] font-medium text-base line-clamp-3  md:text-xl">{props.jobTitle}</h4>
                        <span className="px-2 grid items-center text-sm bg-primary-50 text-primary-500 rounded-[52px] cursor-default">{props.jobType}</span>
                    </div>
                    <div className="flex gap-1 sm:gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[#5E6670] text-sm "><img src="/map-pin.png" className="h-5" />{props.jobLocation}</div>
                        <div className="flex items-center gap-1 text-[#5E6670] text-sm"><img src="/calendar.png" className="h-5" />{props.jobDeadline}</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 items-center mx-auto sm:mx-0 ">
                <img className="hover:bg-primary-50 p-1 rounded-[5px] duration-100 absolute top-2 right-2 sm:top-0 sm:right-0 sm:relative cursor-pointer " src={props.bookmarkIcon} />
                <button className="group flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">Apply Now

                    <svg className="text-primary-500 group-hover:text-white duration-150" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>


                </button>

            </div>
        </div>
    )
}
