import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Select from "../../../../Components/Select";
import ResumeBox from "../../../../Components/ResumeBox";
import { shortenFilename } from "../../../../utils/shortenFilename";
import { CircleAddIcon, TrashIcon, LinkIcon, SmallSpinnerIcon, UploadDriveIcon, UploadIcon2 } from "../../../../utils/svgs";
import { Asterisk } from "lucide-react";



export default function ProfileTabContent() {

    const { props } = usePage()
    const dbResumes = props.auth.user.resumes


    const profilePic = props.auth.user?.profile_picture ? "/storage/" + props.auth.user.profile_picture : null
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


    const handleSelectChange = (field, option) => {
        basicForm.setData(prev => ({
            ...prev,
            [field]: option
        }))
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
        resumeForm.post('/candidate/settings/profile/resumes', {
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

                <div className="flex flex-col md:flex-row mt-5 gap-12">

                    <div className="min-w-52 max-w-60 relative">
                        <span className="text-sm text-customGray-900 ">Profile Picture</span>
                        <label onDragOver={e => { e.preventDefault(); setDragging(true) }} onDrop={e => {
                            e.preventDefault()
                            setDragging(false)
                            basicForm.setData('profilePicture', e.dataTransfer.files[0])
                            setFileName(shortenFilename(e.dataTransfer.files[0].name))
                            if (e.dataTransfer.files[0].size > 5 * 1024 * 1024) {
                                setProfileSizeTooBig(true)
                            } else {
                                setProfileSizeTooBig(false)
                            }

                        }}
                            htmlFor="profilePic"
                            className={`relative text-center text-nowrap  min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center cursor-pointer hover:shadow-lg active:shadow-none
                                        border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${dragging && 'scale-110 drop-shadow-2xl'}`}
                        >
                            <div className="absolute inset-0 bg-center bg-cover rounded-md "
                                style={{ backgroundImage: `url(${profilePic})` }}>
                            </div>
                            {profilePic &&
                                <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                            }
                            <div className="z-10 break-all rounded-md flex flex-col items-center">
                                <input type="file" id="profilePic" className="hidden" onChange={e => {
                                    basicForm.setData('profilePicture', e.target.files[0])
                                    setFileName(shortenFilename(e.target.files[0].name))
                                    if (e.target.files[0].size > 5 * 1024 * 1024) {
                                        setProfileSizeTooBig(true)
                                    } else {
                                        setProfileSizeTooBig(false)
                                    }
                                }} accept="image/*" />
                                <UploadIcon2 className="text-customGray-300" />
                                <p className={`text-sm mt-3 ${profilePic ? "text-customGray-200" : "text-customGray-700"}`}>Browse photos or drop here</p>
                                <p className={`text-xs ${profilePic ? "text-customGray-200" : "text-customGray-500"}`}>Max photo size is 5 MB</p>
                                {fileName ? <p className={`text-xs mt-4 max-w-40 text-wrap ${profilePic ? "text-primary-300" : "text-primary-600"}`}>Selected: {fileName}</p> :
                                    <p className={`text-xs mt-4 max-w-40 text-wrap ${profilePic ? "text-customGray-200" : "text-customGray-500"}`}>No photo selected yet</p>
                                }

                                {(basicForm.progress && basicForm.data.profilePicture !== null) &&
                                    <SmallSpinnerIcon className="absolute bottom-2 right-2 size-5 animate-spin-fast duration-75" />
                                }

                            </div>

                        </label>

                        <div className="text-sm w-full  text-danger-600" >
                            {(profileSizeTooBig && 'File size is too big. Max file size is 5 MB.') || props.errors.profilePicture}
                        </div>

                        {profilePic &&
                            <button type="button" onClick={() => router.delete(`/candidate/delete-profile-picture`)}
                                className="group flex items-center gap-1 bg-danger-400 text-white mt-1 cursor-pointer px-2 py-1 hover:bg-danger-500 duration-150 rounded-md border text-sm">
                                <TrashIcon />
                                Delete Image</button>
                        }

                    </div>


                    <div className="flex flex-col items-start gap-2">

                        <div className="flex flex-col lg:flex-row gap-2 w-full max-w-full lg:max-w-[480px] 2xl:max-w-[800px]">
                            <div className="flex flex-col w-full lg:w-1/2  min-w-44 relative">
                                <label htmlFor="fullName" className="text-sm text-customGray-900 flex">Full name <Asterisk className="w-3 h-3 text-danger-500 "/> </label>
                                <input type="text" placeholder="e.g. Eqbal Sharaf" id="fullName" value={basicForm.data.fullName} onChange={(e) => basicForm.setData('fullName', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {props.errors.fullName}
                                </div>
                            </div>

                            <div className="flex flex-col w-full lg:w-1/2 min-w-44  relative">
                                <label htmlFor="title" className="text-sm text-customGray-900 flex">Title <Asterisk className="w-3 h-3 text-danger-500 "/></label>
                                <input type="text" placeholder="e.g. Web Developer" id="title" value={basicForm.data.title} onChange={(e) => basicForm.setData('title', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {props.errors.title}
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-full ">
                            <div className="relative flex flex-col w-full lg:w-1/2 min-w-44">
                                <label className="text-sm text-customGray-900 mb-2 flex">Experience <Asterisk className="w-3 h-3 text-danger-500 "/></label>
                                <Select options={["No Experience", "0-2", "2-4", "4+"]} placeholder={basicForm.data.experience} onValueChange={(option) => handleSelectChange('experience', option)} />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {props.errors.experience}
                                </div>
                            </div>
                            <div className="relative flex flex-col w-full lg:w-1/2 min-w-44">
                                <label className="text-sm text-customGray-900 mb-2 flex">Educations <Asterisk className="w-3 h-3 text-danger-500 "/></label>
                                <Select options={["School Graduate", "Bachelor", "Master"]} placeholder={basicForm.data.educations} onValueChange={(option) => handleSelectChange('educations', option)} />
                                <div className="text-sm w-full text-danger-600 min-h-5" >
                                    {props.errors.educations}
                                </div>
                            </div>
                        </div>


                        <div className="w-full max-w-[680px] relative">
                            <label htmlFor="personalWebsite" className="text-sm text-customGray-900">Personal Website (optional)</label>
                            <div className="flex items-center gap-3 mt-2 border rounded-md border-customGray-100 placeholder:text-customGray-400 outline-none focus-within:ring-1 focus-within:ring-primary-500 pl-3 pr-[18px]">
                                <LinkIcon className="h-6 w-6 text-primary-500" />
                                <input type="text" placeholder="Website url..." id="personalWebsite" value={basicForm.data.personalWebsite} onChange={(e) => basicForm.setData('personalWebsite', e.target.value)} className="w-full outline-none placeholder:text-customGray-400 text-customGray-900 py-3" />
                            </div>
                            <div className="text-sm w-full text-danger-600 min-h-5 " >
                                {props.errors.personalWebsite}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <button disabled={basicForm.processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                                Save Changes
                            </button>
                            <span className={`text-success-500 text-sm ${profileSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                                {profileSuccessMsg}
                            </span>

                            {Object.keys(basicForm.errors).length !== 0 &&
                                <span className="text-sm text-danger-600">Form contains errors, please review and try again.</span>
                            }

                        </div>


                    </div>
                </div>
            </form>



            <hr className="border-none h-[1px] bg-customGray-50 my-8" />



            <div className="">

                <div className="flex gap-2 flex-wrap  items-center ">
                    <h2 id="your-resumes" className="text-lg font-medium text-customGray-900">Your CVs / Résumés</h2>
                    <span className={`text-success-500 h-6 w-52 text-sm  flex items-center ${resumeSuccessMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                        {resumeSuccessMsg}
                    </span>
                </div>

                <div className="flex gap-6 flex-wrap   mt-5">
                    {dbResumes.map((item) => (
                        <ResumeBox key={item.resume_id} delete={resumeForm.delete} id={item.resume_id} path={item.path} fileName={item.file_name} size={item.size} setSuccessMsg={setResumeSuccessMsg} />
                    ))}

                    <div className="relative w-72 flex-initial">
                        <label htmlFor="resume" onDragOver={e => { e.preventDefault(); setResumeDragging(true) }}
                            onDrop={e => {
                                e.preventDefault()
                                setResumeDragging(false)
                                resumeForm.setData('resume', e.dataTransfer.files[0])
                                setResumeName(shortenFilename(e.dataTransfer.files[0].name, 25))
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
                                setResumeName(shortenFilename(e.target.files[0].name, 25))
                                if (e.target.files[0].size > 10 * 1024 * 1024) {
                                    setPdfSizeTooBig(true)
                                } else {
                                    setPdfSizeTooBig(false)
                                }
                            }} />

                            <div>
                                <CircleAddIcon className="text-primary-500" />
                            </div>

                            <div>
                                <p className="text-customGray-900 break-words line-clamp-2 text-sm font-medium" >Add CV/Résumé (pdf only)</p>
                                <p className={`text-xs ${resumeName ? 'text-primary-500 font-medium' : 'text-customGray-600'}`}>
                                    {resumeName ? `Selected: ${resumeName}` : 'Browse files or drop here'}
                                </p>
                            </div>



                        </label>

                        <div>

                            <div className="text-xs w-full text-danger-600 " >
                                {(pdfSizeTooBig && 'File size is too big. Max file size is 10 MB.') || props.errors.maxResumesExceed || props.errors.resume}
                            </div>

                            {resumeName &&
                                <form onSubmit={e => {
                                    e.preventDefault()
                                    if (!pdfSizeTooBig) {
                                        handleResumeUpload(e)
                                    }
                                }}>
                                    <button className="absolute  flex -bottom-[33px] right-0 text-sm p-1 bg-primary-500 text-white font-medium justify-center gap-1 items-center rounded-md hover:bg-primary-600 cursor-pointer shadow-lg active:scale-95 duration-75">
                                        <UploadDriveIcon />
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
