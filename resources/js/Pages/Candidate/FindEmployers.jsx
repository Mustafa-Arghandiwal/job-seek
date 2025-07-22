import { usePage } from "@inertiajs/react"
import Layout from "../../Layouts/Layout"
import Employer from "../../Components/Employer"



function FindEmployers() {

    console.log(usePage().props.employers)
    return (
        <div className="xl:px-[150px] 2xl:px-[230px] ">
            <div className=" mt-8 px-3 xs:px-10  lg:hidden ">
                <button className="flex text-nowrap gap-3 px-4 py-2 text-white rounded-[3px] bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
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
            </div>

            <div className="min-h-[512px] flex ">
                <div className=" max-w-96 w-full  py-6 px-8  hidden lg:block  border">
                    <div className=" flex flex-col gap-4 border rounded-xl sticky pl-8 pb-8 pt-6 border-customGray-50">
                        <p className="font-medium text-customGray-900 text-lg">Organization Type</p>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="government" /> <span className="ml-2">Government</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="ngo" /> <span className="ml-2">NGO</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="privateCompany" /> <span className="ml-2">Private Company</span>
                        </label>
                        <label className="cursor-pointer w-fit text-sm text-customGray-700">
                            <input type="radio" name="orgType" value="agency" /> <span className="ml-2">Agency</span>
                        </label>

                    </div>
                </div>

                <div className=" h-dvh w-full  px-3 xs:px-10 py-6 flex flex-col gap-6" >
                    <Employer logo='' companyName="something" location="Kabul" />
                    <Employer logo='' companyName="something" location="Kabul" />
                </div>
            </div>
        </div>
    )
}

FindEmployers.layout = page => <Layout children={page} />
export default FindEmployers
