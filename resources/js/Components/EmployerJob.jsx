
import { useState, useRef, useEffect } from "react"
import EditJobModal from "./EditJobModal"
import { Link, useForm } from "@inertiajs/react"
import ConfirmationModal from "./ConfirmationModal"
import { ActiveIcon, ExpiredIcon, ThreeDotsIcon, UsersIcon, PenIcon, EyeIcon, CircleXIcon } from "../utils/svgs"



export default function EmployerJob({ vacancy }) {


    const {post} = useForm()
    const [showEditJobModal, setShowEditJobModal] = useState(false)

    const today = new Date()
    const endDate = new Date(vacancy.deadline)
    const remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let remainingMsg

    if (remainingDays >= 0) {
        if(vacancy.manually_expired) {
            remainingMsg = "Expired by User"
        } else {
        remainingMsg = `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'} remaining`
        }
    } else if (remainingDays < -9) {
        remainingMsg = `Expired on ${endDate.getDate()} ${monthNames[endDate.getMonth()]} ${endDate.getFullYear()}`
    } else {
        remainingMsg = remainingDays === -1 ? `Expired ${Math.abs(remainingDays)} day ago` : `Expired ${Math.abs(remainingDays)} days ago`
    }


    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)
    const threeDotsBtnRef = useRef(null)


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) && threeDotsBtnRef && !threeDotsBtnRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)

    }, [menuRef, threeDotsBtnRef])



    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const expireJobBtn = useRef(null)


    const handleExpireJob = () => {
        post(`/employer/vacancies/${vacancy.id}/expire`)
    }



    return (
        <tr className="border-b border-b-customGray-100">
            <td scope="row" className="p-5 whitespace-nowrap">
                <h3 className="text-customGray-900 font-medium ">{vacancy.job_title}</h3>
                <p className="text-sm text-customGray-500">{vacancy.job_type} &bull; {remainingMsg}</p>

            </td>

            <td className={`${remainingDays >= 0 && !vacancy.manually_expired ? "text-success-500" : "text-danger-500"} text-sm p-5 whitespace-nowrap`}>
                <div className="flex items-center gap-1">
                    {remainingDays >= 0 && !vacancy.manually_expired ?
                        <>
                            <ActiveIcon />
                            Active
                        </>
                        :
                        <>
                            <ExpiredIcon />
                            Expired

                        </>
                    }
                </div>
            </td>


            <td className="text-customGray-600 text-sm p-5 whitespace-nowrap">
                <div className="flex items-center gap-1">
                    <UsersIcon className="w-6 h-6"/>
                    {vacancy.applications_count} Applicant{vacancy.applications_count !== 1 && 's'}

                </div>
            </td>


            <td className="p-5 whitespace-nowrap">
                <div className="flex items-center gap-2 ">
                    <Link href={`/employer/vacancies/${vacancy.id}/applications`} type="button" className="flex gap-3  font-semibold text-primary-500 hover:text-white bg-customGray-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap rounded-sm">View Applications</Link>
                    <div className="relative">
                        <button type="button" ref={threeDotsBtnRef} onClick={() => setShowMenu(prev => !prev)} className="hover:bg-customGray-50 py-[10px] px-2 rounded-sm cursor-pointer group scale-110 text-customGray-500" >
                            <ThreeDotsIcon className="group-active:scale-125 duration-100" />
                        </button>

                        <div ref={menuRef} className={`bg-white  min-w-32 md:min-w-40  border-customGray-50 rounded-md absolute -left-32 top-11  shadow-lg z-10 ${showMenu ? 'max-h-40 py-2 border' : 'max-h-0 py-0'} overflow-hidden transition-all duration-75  `}>
                            <button type="button" disabled={remainingDays < 0 || vacancy.manually_expired} onClick={() => { setShowEditJobModal(true); setShowMenu(false) }}
                                className="text-customGray-600  hover:text-primary-500 disabled:hover:bg-transparent disabled:cursor-default  disabled:text-customGray-200   flex gap-1.5 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                                <PenIcon />
                                <span className="text-sm font-medium">Edit Job</span>
                            </button>

                            <Link href={`/vacancies/${vacancy.id}`} type="button"
                                className="text-customGray-600 hover:text-primary-500  flex gap-1.5 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                                <EyeIcon className="w-5 h-5"/>
                                <span className="text-sm font-medium">View Job</span>
                            </Link>

                            <button type="button" disabled={remainingDays < 0 || vacancy.manually_expired} ref={expireJobBtn} onClick={() => setShowConfirmationModal(true)}
                                className=" text-customGray-600 hover:text-primary-500 disabled:hover:bg-transparent disabled:cursor-default  disabled:text-customGray-200  flex gap-1.5 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                                <CircleXIcon />
                                <span className="text-sm font-medium ">Expire Job</span>
                            </button>

                        </div>
                    </div>


                </div>

            </td>

            <EditJobModal close={() => setShowEditJobModal(false)} showModal={showEditJobModal} vacancy={vacancy} />
            <ConfirmationModal  showModal={showConfirmationModal} setShowModal={setShowConfirmationModal} expireJobBtn={expireJobBtn} handleExpireJob={handleExpireJob}/>


        </tr>
    )
}



