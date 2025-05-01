import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Select from "../../../../Components/Select";



export default function ProfileTabContent() {

    // These two props are different!
    const { props } = usePage()
    const { data, setData, post, errors, processing, progress } = useForm({
        fullName: props.auth.user.full_name,
        profilePicture: null,
        title: props.auth.user.title || '',
        experience: props.auth.user.experience || '',
        educations: props.auth.user.education_level || '',
        personalWebsite: props.auth.user.website || '',
    })

    const [fileName, setFileName] = useState('')
    const [dragging, setDragging] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')


    useEffect(() => {
        if (successMsg) {

            const timer = setTimeout(() => setSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [successMsg])

    useEffect(() => {
        if (props.flash.success) {
            setSuccessMsg(props.flash.success)
        }
    }, [props.flash.success])
    //
    const handleBasicSubmit = (e) => {
        e.preventDefault()
        setSuccessMsg('')
        post('/candidate/settings/profile/basic', {
            onSuccess: () => {
                router.reload({ only: ['auth.user', 'flash'] })
                setFileName('')
                setSuccessMsg(props.flash.success)
            }
        })
    }


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

    return (

        <form onSubmit={handleBasicSubmit} className="flex flex-col md:flex-row  gap-12 "> {/*enctype="multipart/form-data" ??? ans: auto-handled by inertia.js*/}

            <div className=" min-w-40 max-w-60 shrink-0  relative">
                <span className="text-sm text-customGray-900 ">Profile Picture</span>
                <label onDragOver={e => { e.preventDefault(); setDragging(true) }} onDrop={e => {
                    e.preventDefault()
                    setDragging(false)
                    setData('profilePicture', e.dataTransfer.files[0])
                    setFileName(e.dataTransfer.files[0].name)
                }}
                    htmlFor="profilePic" className={`relative text-center text-nowrap min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center  text-gray-900 cursor-pointer
                                                    border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${dragging && 'scale-110 drop-shadow-2xl'} `}>

                    <input type="file" id="profilePic" className="hidden" onChange={e => {
                        setData('profilePicture', e.target.files[0])
                        setFileName(e.target.files[0].name)
                    }} accept="image/*" />

                    {/* {progress && ( */}
                    {/*     <div className="w-full bg-primary-50 rounded-full h-2 absolute -bottom-3"> */}
                    {/*         <div className="bg-primary-500 h-2 rounded-full transition-all duration-200" */}
                    {/*             style={{ width: `${progress?.percentage || 0}%` }}> */}
                    {/*         </div> */}
                    {/*     </div> */}
                    {/* )} */}
                    <img src="/dashboard/upload-cloud.png" className="pointer-events-none w-12 h-12" alt="file upload" />
                    <p className="text-sm text-gray-700 mt-3">Browse photo or drop here</p>
                    <p className="text-xs text-gray-500">Max photo size is 5 MB</p>
                    <p className={`text-xs  mt-4 max-w-40  text-wrap ${fileName ? 'text-primary-600' : 'text-gray-500'}`}>
                        {fileName ? `Selected: ${fileName}` : 'No photo selected yet'}
                    </p>

                    {(progress && data.profilePicture !== null) &&
                        <svg viewBox="0 0 24 24" className="absolute bottom-2 right-2 size-5 animate-spin-fast duration-75" >
                            <path
                                className="text-primary-200"
                                fill="currentColor"
                                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                opacity=".25"
                            />
                            <path
                                className="text-primary-500"
                                fill="currentColor"
                                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                            />
                        </svg>

                    }
                </label>


            </div>


            <div className="flex flex-col items-start gap-6 w-full">

                <div className="flex flex-col lg:flex-row gap-4 w-full  max-w-[680px]">
                    <div className="flex flex-col w-full lg:w-1/2 min-w-44 relative">
                        <label htmlFor="fullName" className="text-sm text-customGray-900">Full name</label>
                        <input type="text" placeholder="e.g. Eqbal Sharaf" id="fullName" value={data.fullName} onChange={(e) => setData('fullName', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {props.errors.fullName}
                        </span>
                    </div>

                    <div className="flex flex-col w-full lg:w-1/2 min-w-44 relative">
                        <label htmlFor="title" className="text-sm text-customGray-900">Title</label>
                        <input type="text" placeholder="e.g. Web Developer" id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {props.errors.title}
                        </span>
                    </div>
                </div>


                <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[680px]">
                    <div className="relative flex flex-col w-full lg:w-1/2 min-w-44">
                        <label className="text-sm text-customGray-900 mb-2">Experience</label>
                        <Select options={["No Experience", "0-2", "2-4", "4+"]} placeholder={data.experience} onValueChange={handleSelectExperience} />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {props.errors.experience}
                        </span>
                    </div>
                    <div className="relative flex flex-col w-full lg:w-1/2 min-w-44">
                        <label className="text-sm text-customGray-900 mb-2">Educations</label>
                        <Select options={["School Graduate", "Bachelor", "Master"]} placeholder={data.educations} onValueChange={handleSelectEducations} />
                        <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                            {props.errors.educations}
                        </span>
                    </div>
                </div>


                <div className="w-full max-w-[680px] relative">
                    <label htmlFor="personalWebsite" className="text-sm text-customGray-900">Personal Website</label>
                    <div className="flex items-center gap-3 border rounded-md border-customGray-100 placeholder:text-customGray-400 outline-none focus-within:ring-1 focus-within:ring-primary-500 pl-3 pr-[18px]">
                        <img src="/dashboard/url.png" alt="link icon" className="h-6 w-6" />
                        <input type="text" placeholder="Website url..." id="personalWebsite" value={data.personalWebsite} onChange={(e) => setData('personalWebsite', e.target.value)} className="w-full outline-none placeholder:text-customGray-400 text-customGray-900 py-3" />
                    </div>
                    <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                        {props.errors.personalWebsite}
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button disabled={processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                        Save Changes
                    </button>
                    <span className={`text-success-500 h-6 w-52 text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {successMsg}
                    </span>
                </div>


            </div>

        </form>
    )
}
