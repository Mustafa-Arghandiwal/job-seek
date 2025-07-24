import { usePage } from "@inertiajs/react"
import Layout from "../../Layouts/Layout"
import Employer from "../../Components/Employer"
import { useEffect, useRef, useState } from "react"



function FindEmployers() {

    const [showFilter, setShowFilter] = useState(false)
    const filterBtn = useRef(null)
    const filterDropDown = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if ((filterBtn.current && !filterBtn.current.contains(e.target)) && (filterDropDown.current && !filterDropDown.current.contains(e.target))) {
                setShowFilter(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)

    }, [filterBtn, filterDropDown])

    return (
        <div className="xl:px-[150px] 2xl:px-[230px] ">
            <div className=" mt-8 px-3 xs:px-10  lg:hidden relative ">
                <button ref={filterBtn} onClick={() => setShowFilter(prev => !prev)} className="flex text-nowrap gap-3 px-4 py-2 text-white rounded-[3px] bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11.25L12 20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 3.75L12 8.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.75 18.75L18.7501 20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18.7501 3.75L18.75 15.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 15.75H16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.25007 15.75L5.25 20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.25 3.75L5.25007 12.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 12.75H7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.25 8.25H9.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Filter
                </button>

                <div ref={filterDropDown} className={`drop-shadow-xl  rounded-lg p-5 absolute z-20 bg-white ${showFilter ? 'opacity-100' : 'opacity-0 pointer-events-none'} duration-100`}>
                    <p className="font-medium text-customGray-400 uppercase text-xs">Organization Type</p>
                    <div className="flex flex-col gap-3 mt-3">
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="all" /> <span className="ml-2">All</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="government" /> <span className="ml-2">Government</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="privateCompany" /> <span className="ml-2">Private Company</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="startup" /> <span className="ml-2">Startup</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="agency" /> <span className="ml-2">Agency</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="ngo" /> <span className="ml-2">NGO</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="un" /> <span className="ml-2">UN</span>
                        </label>


                    </div>
                </div>

            </div>

            <div className="min-h-[512px] flex ">
                <div className=" max-w-96 w-full  py-6 px-8  hidden lg:block  ">
                    <div className=" flex flex-col gap-4 border rounded-xl sticky top-4 pl-8 pb-8 pt-6 border-customGray-50">
                        <p className="font-medium text-customGray-900 text-lg">Organization Type</p>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="all" /> <span className="ml-2">All</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="government" /> <span className="ml-2">Government</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="privateCompany" /> <span className="ml-2">Private Company</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="startup" /> <span className="ml-2">Startup</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="agency" /> <span className="ml-2">Agency</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="ngo" /> <span className="ml-2">NGO</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="un" /> <span className="ml-2">UN</span>
                        </label>

                    </div>
                </div>

                <div className=" h-dvh w-full  px-3 xs:px-10 py-6 flex flex-col gap-6" >
                    <Employer logo='' companyName="Data Entry Clerk" location="Kabul" />
                    <Employer logo='' companyName="Motion Graphic Designer" location="Kabul" />
                    <Employer logo='' companyName="Junior Telecommunications officer" location="Kabul" />
                </div>
            </div>
        </div>
    )
}

FindEmployers.layout = page => <Layout children={page} />
export default FindEmployers
