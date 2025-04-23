import { useState } from "react"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import Tab from "../../../Components/Tab"
import Tabs from "../../../Components/Tabs"
import Select from "../../../Components/Select"
import { useForm } from "@inertiajs/react"



function Settings() {

    const { data, setData, post, errors, processing, progress } = useForm({
        fullName: '',
        profilePicture: null,
        title: '',
        experience: '',
        educations: '',
        personalWebsite: '',
    })

    const [fileName, setFileName] = useState('')
    const [dragging, setDragging] = useState(false)

    const handleSelectExperience = (option) => {
        setData(prevData => ({
            ...prevData,
            experience: option
        }))
    }
    const handleSelectEducations = (option) => {
        setData(prevData => ({
            ...prevData,
            educations: option
        }))
    }

    const handleBasicSubmit = (e) => {
        e.preventDefault()
        post('/candidate/settings/personal/basic')
    }
    //just some svgs
    const iconSvgList = {
        personal: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                <path
                    d="M2.90527 20.2491C3.82736 18.6531 5.15322 17.3278 6.74966 16.4064C8.34611 15.485 10.1569 15 12.0002 15C13.8434 15 15.6542 15.4851 17.2506 16.4065C18.8471 17.3279 20.1729 18.6533 21.0949 20.2493"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        profile: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                />
                <path
                    d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                />
                <path
                    d="M5.98145 18.6913C6.54639 17.5806 7.40768 16.6478 8.46997 15.9963C9.53226 15.3448 10.7541 15 12.0003 15C13.2464 15 14.4683 15.3448 15.5306 15.9963C16.5929 16.6478 17.4542 17.5806 18.0191 18.6913"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        socialLinks: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                />
                <path
                    d="M3 12H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 20.758C14.0711 20.758 15.75 16.8367 15.75 11.9996C15.75 7.16248 14.0711 3.24121 12 3.24121C9.92893 3.24121 8.25 7.16248 8.25 11.9996C8.25 16.8367 9.92893 20.758 12 20.758Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                />
            </svg>
        ),
        account: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.90334 8.58739C5.07209 8.23114 5.26897 7.89364 5.49397 7.56551L5.45647 5.12801C5.45647 4.90301 5.55022 4.68739 5.72834 4.53739C6.60022 3.80614 7.59397 3.21551 8.69084 2.82176C8.90647 2.74676 9.14084 2.76551 9.32834 2.88739L11.419 4.14364C11.8127 4.11551 12.2065 4.11551 12.6002 4.14364L14.6908 2.88739C14.8877 2.77489 15.1221 2.74676 15.3377 2.82176C16.4065 3.20614 17.4096 3.77801 18.3002 4.52801C18.469 4.66864 18.5721 4.89364 18.5627 5.11864L18.5252 7.55614C18.7502 7.88426 18.9471 8.22176 19.1158 8.57801L21.244 9.75926C21.4408 9.87176 21.5815 10.0593 21.619 10.2843C21.8158 11.3999 21.8252 12.5624 21.619 13.6968C21.5815 13.9218 21.4408 14.1093 21.244 14.2218L19.1158 15.403C18.9471 15.7593 18.7502 16.0968 18.5252 16.4249L18.5627 18.8624C18.5627 19.0874 18.469 19.303 18.2908 19.453C17.419 20.1843 16.4252 20.7749 15.3283 21.1686C15.1127 21.2436 14.8783 21.2249 14.6908 21.103L12.6002 19.8468C12.2065 19.8749 11.8127 19.8749 11.419 19.8468L9.32834 21.103C9.13147 21.2155 8.89709 21.2436 8.68147 21.1686C7.61272 20.7843 6.60959 20.2124 5.71897 19.4624C5.55022 19.3218 5.44709 19.0968 5.45647 18.8718L5.49397 16.4343C5.26897 16.1061 5.07209 15.7686 4.90334 15.4124L2.77522 14.2311C2.57834 14.1186 2.43772 13.9311 2.40022 13.7061C2.20334 12.5905 2.19397 11.428 2.40022 10.2936C2.43772 10.0686 2.57834 9.88114 2.77522 9.76864L4.90334 8.58739Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    };



    return (
        <div>
            <h1 className="font-medium text-2xl ">Settings</h1>

            <Tabs>
                {/* candidate/dashboard/settings -> personal tab */}
                <Tab title="Personal" icon={iconSvgList.personal}>
                    <form onSubmit={handleBasicSubmit} className="flex flex-col md:flex-row  gap-12 "> {/*enctype="multipart/form-data" ??? ans: auto-handled by inertia.js*/}

                        <div className=" min-w-40 max-w-60 shrink-0">
                            <span className="text-sm text-customGray-900 ">Profile Picture</span>
                            <label onDragOver={e => {e.preventDefault(); setDragging(true)}} onDrop={e => {
                                e.preventDefault()
                                setDragging(false)
                                setData('profilePicture', e.dataTransfer.files[0])
                                setFileName(e.dataTransfer.files[0].name)
                            }}
                                htmlFor="profilePic" className={`relative text-center text-nowrap min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center  text-gray-900 cursor-pointer
                                                                border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${dragging && 'scale-110 drop-shadow-2xl'}`}>
                                <input type="file" id="profilePic" className="hidden" onChange={e => {
                                    setData('profilePicture', e.target.files[0])
                                    setFileName(e.target.files[0].name)
                                }} accept="image/*" />

                                {progress && (
                                    <div className="w-full bg-primary-50 rounded-full h-2 absolute -bottom-3">
                                        <div className="bg-primary-500 h-2 rounded-full transition-all duration-200"
                                            style={{ width: `${progress?.percentage || 0}%` }}>
                                        </div>
                                    </div>
                                )}
                                <img src="/dashboard/upload-cloud.png" className="w-12 h-12" alt="file upload" />
                                <p className="text-sm text-gray-700 mt-3">Browse photo or drop here</p>
                                <p className="text-xs text-gray-500">Max photo size is 5 MB</p>
                                <p className={`text-xs  mt-4 max-w-40 overflow-hidden ${fileName ? 'text-success-500' : 'text-gray-500'}`}>
                                    {fileName ? `${fileName}` : 'No photo selected yet'}
                                </p>

                            </label>
                        </div>


                        <div className="flex flex-col items-start gap-4 w-full">

                            <div className="flex flex-col lg:flex-row gap-4 w-full  max-w-[680px]">
                                <div className="flex flex-col w-full lg:w-1/2 min-w-44">
                                    <label htmlFor="fullName" className="text-sm text-customGray-900">Full name</label>
                                    <input type="text" placeholder="e.g. Eqbal Sharaf" id="fullName" value={data.fullName} onChange={(e) => setData('fullName', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                                </div>

                                <div className="flex flex-col w-full lg:w-1/2 min-w-44">
                                    <label htmlFor="title" className="text-sm text-customGray-900">Title</label>
                                    <input type="text" placeholder="e.g. Web Developer" id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                                </div>
                            </div>


                            <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[680px]">
                                <div className="flex flex-col w-full lg:w-1/2 min-w-44">
                                    <label className="text-sm text-customGray-900 mb-2">Experience</label>
                                    <Select options={["Option 1", "Option 2", "Option 3 "]} onValueChange={handleSelectExperience} />
                                </div>
                                <div className="flex flex-col w-full lg:w-1/2 min-w-44">
                                    <label className="text-sm text-customGray-900 mb-2">Educations</label>
                                    <Select options={["School Graduate", "Bachelor", "Master"]} onValueChange={handleSelectEducations} />
                                </div>
                            </div>


                            <div className="w-full max-w-[680px]">
                                <label htmlFor="personalWebsite" className="text-sm text-customGray-900">Personal Website</label>
                                <div className="flex items-center gap-3 border rounded-md border-customGray-100 placeholder:text-customGray-400 outline-none focus-within:ring-1 focus-within:ring-primary-500 pl-3 pr-[18px]">
                                    <img src="/dashboard/url.png" alt="link icon" className="h-6 w-6" />
                                    <input type="text" placeholder="Website url..." id="personalWebsite" value={data.personalWebsite} onChange={(e) => setData('personalWebsite', e.target.value)} className="w-full outline-none placeholder:text-customGray-400 text-customGray-900 py-3" />
                                </div>
                            </div>


                            <button className="px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                                Save Changes
                            </button>


                        </div>

                    </form>
                </Tab>




                <Tab title="Profile" icon={iconSvgList.profile}><div>Profile Tab Contents</div></Tab>
                <Tab title="Social Links" icon={iconSvgList.socialLinks}><div>Social Links Tab Contents</div></Tab>
                <Tab title="Account" icon={iconSvgList.account}><div>Account Tab Contents</div></Tab>
            </Tabs>



        </div>
    )
}


Settings.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default Settings
