import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Select from "../../../../Components/Select";
import ResumeBox from "../../../../Components/ResumeBox";



export default function ProfileTabContent() {

    const { props } = usePage()
    const dbResumes = props.auth.user.resumes



    const basicForm = useForm({
        fullName: props.auth.user.full_name,
        profilePicture: null,
        title: props.auth.user.title || '',
        experience: props.auth.user.experience || '',
        educations: props.auth.user.education_level || '',
        personalWebsite: props.auth.user.website || '',
    })
    const [fileName, setFileName] = useState('')
    const [dragging, setDragging] = useState(false)
    const [profileSuccessMsg, setProfileSuccessMsg] = useState('')
    const [resumeSuccessMsg, setResumeSuccessMsg] = useState('')

    const [pdfSizeTooBig, setPdfSizeTooBig] = useState(false)
    const [profileSizeTooBig, setProfileSizeTooBig] = useState(false)




    const resumeForm = useForm({
        resume: null
    })
    const [resumeName, setResumeName] = useState('')
    const [resumeDragging, setResumeDragging] = useState('')





    // Messages --------------------------------------------------------
    useEffect(() => {
        if (props.flash.profileSuccess) {
            setProfileSuccessMsg(props.flash.profileSuccess)
        }
    }, [props.flash.profileSuccess])

    useEffect(() => {
        if (props.flash.resumeUploadSuccess || props.flash.resumeDeleteSuccess) {
            setResumeSuccessMsg(props.flash.resumeUploadSuccess || props.flash.resumeDeleteSuccess)
        }
    }, [props.flash])

    useEffect(() => {
        if (profileSuccessMsg) {
            const timer = setTimeout(() => setProfileSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [profileSuccessMsg])

    useEffect(() => {
        if (resumeSuccessMsg) {
            const timer = setTimeout(() => setResumeSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [resumeSuccessMsg])

    // --------------------------------------------------------


    const handleSelectExperience = (option) => {
        basicForm.setData(prevData => ({
            ...prevData,
            experience: option
        }))
    }
    const handleSelectEducations = (option) => {
        basicForm.setData(prevData => ({
            ...prevData,
            educations: option
        }))
    }

    //GPT generated function, not gonna take any credits for it
    function shortenFilename(filename, maxLength = 30) {
        if (filename.length <= maxLength) return filename;

        const extIndex = filename.lastIndexOf('.');
        const extension = extIndex !== -1 ? filename.slice(extIndex) : '';
        const base = filename.slice(0, extIndex !== -1 ? extIndex : filename.length);

        const visibleChars = maxLength - extension.length - 3;
        const start = base.slice(0, Math.ceil(visibleChars / 2));
        const end = base.slice(-Math.floor(visibleChars / 2));

        return `${start}...${end}${extension}`;
    }


    //_____________________________________________________________________________________________
    const handleBasicSubmit = (e) => {
        e.preventDefault()
        setProfileSuccessMsg('')
        basicForm.post('/candidate/settings/profile/basic', {
            onSuccess: () => {
                router.reload({ only: ['auth.user', 'flash'] })
                setFileName('')
            }
        })
    }

    const handleResumeUpload = e => {
        e.preventDefault()
        setResumeSuccessMsg('')
        resumeForm.post('/candidate/settings/profile/resumes/create', {
            onSuccess: () => {
                setResumeName('')
            }
        })
    }

    //_____________________________________________________________________________________________



    return (


        <div className="pb-4">
            <form onSubmit={e => {
                e.preventDefault()
                if (!profileSizeTooBig) {
                    handleBasicSubmit(e)
                }

            }} className=""> {/*enctype="multipart/form-data" ??? ans: auto-handled by inertia.js*/}

                <h2 className="text-lg font-medium text-customGray-900">Basic Information</h2>

                <div className="flex flex-col md:flex-row mt-5 gap-12 ">

                    <div className=" min-w-40 max-w-60 shrink-0 relative">
                        <span className="text-sm text-customGray-900 ">Profile Picture</span>
                        <label onDragOver={e => { e.preventDefault(); setDragging(true) }} onDrop={e => {
                            e.preventDefault()
                            setDragging(false)
                            basicForm.setData('profilePicture', e.dataTransfer.files[0])
                            setFileName(shortenFilename(e.dataTransfer.files[0].name))
                            setResumeName(shortenFilename(e.dataTransfer.files[0].name))
                            if (e.dataTransfer.files[0].size > 5 * 1024 * 1024) {
                                setProfileSizeTooBig(true)
                            } else {
                                setProfileSizeTooBig(false)
                            }

                        }}
                            htmlFor="profilePic" className={`relative text-center text-nowrap min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center  text-gray-900 cursor-pointer hover:shadow-lg active:shadow-none
                                                    border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${dragging && 'scale-110 drop-shadow-2xl'} `}>

                            <input type="file" id="profilePic" className="hidden" onChange={e => {
                                basicForm.setData('profilePicture', e.target.files[0])
                                setFileName(shortenFilename(e.target.files[0].name))
                                if (e.target.files[0].size > 5 * 1024 * 1024) {
                                    setProfileSizeTooBig(true)
                                } else {
                                    setProfileSizeTooBig(false)
                                }
                            }} accept="image/*" />

                            <img src="/dashboard/upload-cloud.png" className="pointer-events-none w-12 h-12" alt="file upload" />
                            <p className="text-sm text-gray-700 mt-3">Browse photo or drop here</p>
                            <p className="text-xs text-gray-500">Max photo size is 5 MB</p>
                            <p className={`text-xs  mt-4 max-w-40  text-wrap ${fileName ? 'text-primary-600' : 'text-gray-500'}`}>
                                {fileName ? `Selected: ${fileName}` : 'No photo selected yet'}
                            </p>

                            {(basicForm.progress && basicForm.data.profilePicture !== null) &&
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

                        <span className="text-xs block w-full  absolute  text-danger-600" >
                            {(profileSizeTooBig && 'File size is too big. Max file size is 5 MB.') || props.errors.profilePicture}
                        </span>


                    </div>


                    <div className="flex flex-col items-start gap-6 w-full">

                        <div className="flex flex-col lg:flex-row gap-4 w-full  max-w-[680px]">
                            <div className="flex flex-col w-full lg:w-1/2 min-w-44 relative">
                                <label htmlFor="fullName" className="text-sm text-customGray-900">Full name</label>
                                <input type="text" placeholder="e.g. Eqbal Sharaf" id="fullName" value={basicForm.data.fullName} onChange={(e) => basicForm.setData('fullName', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                                <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                                    {props.errors.fullName}
                                </span>
                            </div>

                            <div className="flex flex-col w-full lg:w-1/2 min-w-44 relative">
                                <label htmlFor="title" className="text-sm text-customGray-900">Title</label>
                                <input type="text" placeholder="e.g. Web Developer" id="title" value={basicForm.data.title} onChange={(e) => basicForm.setData('title', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                                <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                                    {props.errors.title}
                                </span>
                            </div>
                        </div>


                        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-[680px]">
                            <div className="relative flex flex-col w-full lg:w-1/2 min-w-44">
                                <label className="text-sm text-customGray-900 mb-2">Experience</label>
                                <Select options={["No Experience", "0-2", "2-4", "4+"]} placeholder={basicForm.data.experience} onValueChange={handleSelectExperience} />
                                <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                                    {props.errors.experience}
                                </span>
                            </div>
                            <div className="relative flex flex-col w-full lg:w-1/2 min-w-44">
                                <label className="text-sm text-customGray-900 mb-2">Educations</label>
                                <Select options={["School Graduate", "Bachelor", "Master"]} placeholder={basicForm.data.educations} onValueChange={handleSelectEducations} />
                                <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                                    {props.errors.educations}
                                </span>
                            </div>
                        </div>


                        <div className="w-full max-w-[680px] relative">
                            <label htmlFor="personalWebsite" className="text-sm text-customGray-900">Personal Website</label>
                            <div className="flex items-center gap-3 border rounded-md border-customGray-100 placeholder:text-customGray-400 outline-none focus-within:ring-1 focus-within:ring-primary-500 pl-3 pr-[18px]">
                                <img src="/dashboard/url.png" alt="link icon" className="h-6 w-6" />
                                <input type="text" placeholder="Website url..." id="personalWebsite" value={basicForm.data.personalWebsite} onChange={(e) => basicForm.setData('personalWebsite', e.target.value)} className="w-full outline-none placeholder:text-customGray-400 text-customGray-900 py-3" />
                            </div>
                            <span className="text-xs w-full text-danger-600 absolute left-0 -bottom-4" >
                                {props.errors.personalWebsite}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <button disabled={basicForm.processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                                Save Changes
                            </button>
                            <span className={`text-success-500 h-6 w-52 text-sm ${profileSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                                {profileSuccessMsg}
                            </span>
                        </div>


                    </div>
                </div>
            </form>



            <hr className="border-none h-[1px] bg-customGray-50 my-8" />



            <div className="">

                <div className="flex gap-2 flex-wrap  items-center ">
                    <h2 className="text-lg font-medium text-customGray-900">Your CV/Résumés</h2>
                    <span className={`text-success-500 h-6 w-52 text-sm  flex items-center ${resumeSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {resumeSuccessMsg}
                    </span>
                </div>

                <div className="flex gap-6 flex-wrap   mt-5">
                    {dbResumes.map((item) => (
                        <ResumeBox key={item.resume_id} delete={resumeForm.delete} id={item.resume_id} path={item.path} fileName={item.file_name} size={item.size} shortenFilename={shortenFilename} setSuccessMsg={setResumeSuccessMsg} />
                    ))}

                    <div className="relative w-72 flex-initial">
                        <label htmlFor="resume" onDragOver={e => { e.preventDefault(); setResumeDragging(true) }}
                            onDrop={e => {
                                e.preventDefault()
                                setResumeDragging(false)
                                resumeForm.setData('resume', e.dataTransfer.files[0])
                                setResumeName(shortenFilename(e.dataTransfer.files[0].name))
                                if (e.dataTransfer.files[0].size > 10 * 1024 * 1024) {
                                    setPdfSizeTooBig(true)
                                } else {
                                    setPdfSizeTooBig(false)
                                }

                            }}
                            className={`flex gap-3   p-5 max-h-20 items-center rounded-md active:shadow-none
                                        border border-dashed border-customGray-200/70  hover:shadow-lg duration-150 cursor-pointer ${resumeDragging && 'scale-110 bg-customGray-50 drop-shadow-2xl'}`}>

                            <input type="file" accept="application/pdf" id="resume" className="hidden" onChange={e => {
                                resumeForm.setData('resume', e.target.files[0])
                                setResumeName(shortenFilename(e.target.files[0].name))
                                if (e.target.files[0].size > 10 * 1024 * 1024) {
                                    setPdfSizeTooBig(true)
                                } else {
                                    setPdfSizeTooBig(false)
                                }
                            }} />

                            <div>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.9961 28C22.6235 28 27.9961 22.6274 27.9961 16C27.9961 9.37258 22.6235 4 15.9961 4C9.36868 4 3.99609 9.37258 3.99609 16C3.99609 22.6274 9.36868 28 15.9961 28Z" stroke="#0A65CC" strokeWidth="2" strokeMiterlimit="10" />
                                    <path d="M11.0039 16H21.0039" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.9961 11V21" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div>
                                <p className="text-customGray-900 break-words line-clamp-2 text-sm font-medium" >Add CV/Résumé (pdf only)</p>
                                <p className={`text-xs ${resumeName ? 'text-primary-500 font-medium' : 'text-customGray-600'}`}>
                                    {resumeName ? `Selected: ${resumeName}` : 'Browse files or drop here'}
                                </p>
                            </div>



                        </label>

                        <div>

                            <span className="text-xs w-full text-danger-600 " >
                                {(pdfSizeTooBig && 'File size is too big. Max file size is 10 MB.') || props.errors.maxResumesExceed || props.errors.resume}
                            </span>

                            {resumeName &&
                                <form onSubmit={e => {
                                    e.preventDefault()
                                    if (!pdfSizeTooBig) {
                                        handleResumeUpload(e)
                                    }
                                }}>
                                    <button className="absolute  flex -bottom-[33px] right-0 text-sm p-1 bg-primary-500 text-white font-medium justify-center gap-1 items-center rounded-md hover:bg-primary-600 cursor-pointer shadow-lg active:scale-95 duration-75">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.75 10H17.5C17.6658 10 17.8247 10.0658 17.9419 10.1831C18.0592 10.3003 18.125 10.4592 18.125 10.625V15.625C18.125 15.7908 18.0592 15.9497 17.9419 16.0669C17.8247 16.1842 17.6658 16.25 17.5 16.25H2.5C2.33424 16.25 2.17527 16.1842 2.05806 16.0669C1.94085 15.9497 1.875 15.7908 1.875 15.625V10.625C1.875 10.4592 1.94085 10.3003 2.05806 10.1831C2.17527 10.0658 2.33424 10 2.5 10H6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 10V1.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.25 5.625L10 1.875L13.75 5.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.6875 14.0625C15.2053 14.0625 15.625 13.6428 15.625 13.125C15.625 12.6072 15.2053 12.1875 14.6875 12.1875C14.1697 12.1875 13.75 12.6072 13.75 13.125C13.75 13.6428 14.1697 14.0625 14.6875 14.0625Z" fill="currentColor" />
                                        </svg>
                                        <span>Upload</span>
                                    </button>
                                </form>
                            }

                        </div>


                    </div>





                </div>



            </div>


        </div>

    )
}
