import { router } from "@inertiajs/react";
import { DollarIcon, LocationIcon } from "../utils/svgs";


export default function CandidateAppliedJob(props) {



    return (

        <tr className=" border-b border-b-customGray-100">
            <td scope="row" className="px-2 py-5 whitespace-nowrap duration-150">
                <div className="flex gap-5">
                    <div
                        className="h-14 min-w-14 bg-cover bg-center rounded-sm"
                        style={{ backgroundImage: `url(${props.logo})` }}
                    ></div>
                    <div className="flex flex-col gap-3.5  ">
                        <div className="flex gap-2  items-center">
                            <h4 title={props.title} className="text-customGray-900 font-medium max-w-80 text-wrap line-clamp-1">{props.title}</h4>
                            <span className="px-2 grid items-center text-sm bg-primary-50 text-primary-500 rounded-full cursor-default">{props.type}</span>
                        </div>
                        <div className="flex  gap-4">
                            <div className="flex items-center gap-1 text-customGray-500 text-sm ">
                                <LocationIcon />
                                <span>{props.city || "Remote"}</span>
                            </div>
                            <div className="flex items-center  text-customGray-500 text-sm ">
                                <DollarIcon />
                                <span>{props.salary}</span>
                            </div>
                        </div>
                    </div>
                </div>


            </td>


            <td scope="row" className="text-customGray-600 text-sm px-2 py-5 whitespace-nowrap duration-150">
                {props.appliedAt}
            </td>

            <td scope="row" className="px-2 py-5 whitespace-nowrap  " >
                <button onClick={() => router.get(`/vacancies/${props.vacancyId}`)}  className="group disabled:cursor-auto   flex gap-3 rounded-sm font-semibold text-primary-500 hover:text-white bg-primary-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">
                    View Job
                </button>
            </td>
        </tr>


    )

}
