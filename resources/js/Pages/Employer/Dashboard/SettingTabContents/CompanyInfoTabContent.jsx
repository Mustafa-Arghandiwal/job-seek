
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import RichTextEditor from "../../../../Components/RichTextEditor";
import Select from "../../../../Components/Select";
import DatePicker from "../../../../Components/DatePicker";
import { LinkIcon, SmallSpinnerIcon, UploadIcon2, TrashIcon } from "../../../../utils/svgs";



export default function CompanyInfoTabContent() {


    const { props } = usePage({})
    const profilePic = props.auth.user?.emp_profile_picture ? "/storage/" + props.auth.user.emp_profile_picture : null
    const coverPhoto = props.auth.user?.emp_cover_photo ? "/storage/" + props.auth.user.emp_cover_photo : null
    console.log(props.auth.user)
    const employer = props.auth.user
    const { data, setData, processing, progress, post } = useForm({
        logo: null,
        banner: null,
        companyName: employer.full_name || '',
        companyType: employer.company_type || '',
        industryType: employer.industry_type || '',
        teamSize: employer.team_size || '',
        establishDate: (employer.establish_date)?.slice(0, -3) || '',
        companyWebsite: employer.company_website || '',
        aboutCompany: employer.about || '',
    })

    const [logoName, setLogoName] = useState('')
    const [logoDragging, setLogoDragging] = useState(false)
    const [logoSizeTooBig, setLogoSizeTooBig] = useState(false)


    const [bannerName, setBannerName] = useState('')
    const [bannerDragging, setBannerDragging] = useState(false)
    const [bannerSizeTooBig, setBannerSizeTooBig] = useState(false)



    const handleSelectChange = (field, option) => {
        setData(prev => ({
            ...prev,
            [field]: option
        }))
    }

    const handleYearEstablishedChange = (option) => {
        setData(prevData => ({
            ...prevData,
            establishDate: option
        }))
    }


    const [successMsg, setSuccessMsg] = useState('')
    useEffect(() => {
        if (props.flash.compInfoSuccess) {
            setSuccessMsg(props.flash.compInfoSuccess)
        }
    }, [props.flash.compInfoSuccess])

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [successMsg])



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

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/employer/settings/company-info', {
            onSuccess: () => {
                setSuccessMsg(props.flash.compInfoSuccess)
                setLogoName('')
                setBannerName('')
            }

        })
    }


    return (



        <form onSubmit={handleSubmit}>

            <h2 className="text-lg font-medium text-customGray-900">Company Logo & Banner</h2>

            <div className="flex flex-col md:flex-row mt-5 gap-4 md:gap-12 ">

                <div className=" min-w-40 max-w-60 shrink-0 relative">
                    <span className="text-sm text-customGray-900 ">Company Logo</span>
                    <label onDragOver={e => { e.preventDefault(); setLogoDragging(true) }} onDrop={e => {
                        e.preventDefault()
                        setLogoDragging(false)
                        setData('logo', e.dataTransfer.files[0])
                        setLogoName(shortenFilename(e.dataTransfer.files[0].name))
                        if (e.dataTransfer.files[0].size > 5 * 1024 * 1024) {
                            setLogoSizeTooBig(true)
                        } else {
                            setLogoSizeTooBig(false)
                        }

                    }}
                        htmlFor="logo" className={`relative text-center text-nowrap min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center cursor-pointer hover:shadow-lg active:shadow-none
                                                    border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${logoDragging && 'scale-110 drop-shadow-2xl'} `}>

                        <div className="absolute inset-0 bg-center bg-cover rounded-md "
                            style={{ backgroundImage: `url(${profilePic})` }}>
                        </div>
                        {profilePic &&
                            <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        }

                        <div className="z-10 break-all rounded-md flex flex-col items-center">
                            <input type="file" id="logo" className="hidden" onChange={e => {
                                setData('logo', e.target.files[0])
                                setLogoName(shortenFilename(e.target.files[0].name))
                                if (e.target.files[0].size > 5 * 1024 * 1024) {
                                    setLogoSizeTooBig(true)
                                } else {
                                    setLogoSizeTooBig(false)
                                }
                            }} accept="image/*" />

                            <UploadIcon2 className="text-customGray-300" />
                            <p className={`text-sm mt-3 ${profilePic ? "text-customGray-200" : "text-customGray-700"}`}>Browse photos or drop here</p>
                            <p className={`text-xs ${profilePic ? "text-customGray-200" : "text-customGray-500"}`}>Max photo size is 5 MB</p>
                            {logoName ? <p className={`text-xs mt-4 max-w-40 text-wrap ${profilePic ? "text-primary-300" : "text-primary-600"}`}>Selected: {logoName}</p> :
                                <p className={`text-xs mt-4 max-w-40 text-wrap ${profilePic ? "text-customGray-200" : "text-customGray-500"}`}>No photo selected yet</p>
                            }

                            {(progress && data.logo !== null) &&
                                <SmallSpinnerIcon className="absolute bottom-2 right-2 size-5 animate-spin-fast duration-75" />
                            }
                        </div>
                    </label>

                    <div className="text-sm w-full text-danger-600" >
                        {(logoSizeTooBig && 'File size is too big. Max file size is 5 MB.') || props.errors.logo}
                    </div>

                    {profilePic &&
                        <button type="button" onClick={() => router.delete(`/employer/delete-profile-picture`)}
                            className="group flex items-center gap-1 bg-danger-400 text-white mt-1 cursor-pointer px-2 py-1 hover:bg-danger-500 duration-150 rounded-md border text-sm">
                            <TrashIcon />
                            Delete Image</button>
                    }

                </div>


                <div className="flex flex-col items-start  gap-6 w-full">
                    <div className=" min-w-40 w-full  shrink-0 relative">
                        <span className="text-sm text-customGray-900 ">Banner Image</span>
                        <label onDragOver={e => { e.preventDefault(); setBannerDragging(true) }} onDrop={e => {
                            e.preventDefault()
                            setBannerDragging(false)
                            setData('banner', e.dataTransfer.files[0])
                            setBannerName(shortenFilename(e.dataTransfer.files[0].name))
                            if (e.dataTransfer.files[0].size > 5 * 1024 * 1024) {
                                setBannerSizeTooBig(true)
                            } else {
                                setBannerSizeTooBig(false)
                            }

                        }}
                            htmlFor="banner" className={`relative text-center text-nowrap min-h-60 mt-2 px-[20px] py-[47px] flex flex-col items-center justify-center cursor-pointer hover:shadow-lg active:shadow-none
                                                    border rounded-md border-dashed border-customGray-200/70 bg-customGray-50/40 hover:bg-customGray-50 duration-150 ${bannerDragging && 'scale-110 drop-shadow-2xl'} `}>

                            <div className="absolute inset-0 bg-center bg-cover rounded-md "
                                style={{ backgroundImage: `url(${coverPhoto})` }}>
                            </div>
                            {coverPhoto &&
                                <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                            }

                            <div className="z-10 break-all rounded-md flex flex-col items-center">
                                <input type="file" id="banner" className="hidden" onChange={e => {
                                    setData('banner', e.target.files[0])
                                    setBannerName(shortenFilename(e.target.files[0].name))
                                    if (e.target.files[0].size > 5 * 1024 * 1024) {
                                        setBannerSizeTooBig(true)
                                    } else {
                                        setBannerSizeTooBig(false)
                                    }
                                }} accept="image/*" />

                                <UploadIcon2 className="text-customGray-300" />
                                <p className={`text-sm mt-3 ${coverPhoto ? "text-customGray-200" : "text-customGray-700"}`}>Browse photos or drop here</p>
                                <p className={`text-xs ${coverPhoto ? "text-customGray-200" : "text-customGray-500"}`}>Max photo size is 5 MB</p>
                                {bannerName ? <p className={`text-xs mt-4 max-w-40 text-wrap ${coverPhoto ? "text-primary-300" : "text-primary-600"}`}>Selected: {bannerName}</p> :
                                    <p className={`text-xs mt-4 max-w-40 text-wrap ${coverPhoto ? "text-customGray-200" : "text-customGray-500"}`}>No photo selected yet</p>
                                }

                                {(progress && data.banner !== null) &&
                                    <SmallSpinnerIcon className="absolute bottom-2 right-2 size-5 animate-spin-fast duration-75" />
                                }
                            </div>
                        </label>

                        <div className="text-sm  w-full text-danger-600" >
                            {(bannerSizeTooBig && 'File size is too big. Max file size is 5 MB.') || props.errors.banner}
                        </div>

                        {coverPhoto &&
                            <button type="button" onClick={() => router.delete(`/employer/delete-banner`)}
                                className="group flex items-center gap-1 bg-danger-400 text-white mt-1 cursor-pointer px-2 py-1 hover:bg-danger-500 duration-150 rounded-md border text-sm">
                                <TrashIcon />
                                Delete Image</button>
                        }

                    </div>

                </div>



            </div>


            <hr className="border-none h-[1px] bg-customGray-50 my-8" />



            <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-2 ">

                <div className="flex flex-col w-full  min-w-44 relative sm:col-span-2">
                    <label htmlFor="comapnyName" className="text-sm text-customGray-900">Company Name</label>
                    <input type="text" placeholder="e.g. Acme Inc." id="companyName" value={data.companyName} onChange={(e) => setData('companyName', e.target.value)} className="mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-[11px] px-[18px]" />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.companyName}
                    </div>
                </div>



                <div className="relative w-full ">
                    <label className="text-sm text-customGray-900">Company Type</label>
                    <Select options={['Agency', 'Government', 'NGO', 'Private', 'Startup', 'UN']} placeholder={data.companyType} onValueChange={(option) => handleSelectChange('companyType', option)} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.companyType || ''}
                    </div>
                </div>

                <div className="relative w-full ">
                    <label className="text-sm text-customGray-900">Industry Type</label>
                    <Select options={['Agriculture', 'Construction', 'Education', 'Energy', 'Finance', 'Government', 'Healthcare', 'Legal', 'Manufacturing', 'Media', 'Real Estate', 'Retail', 'Technology', 'Transportation']} placeholder={data.industryType} onValueChange={(option) => handleSelectChange('industryType', option)} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.industryType || ''}
                    </div>
                </div>

                <div className="relative w-full ">
                    <label className="text-sm text-customGray-900">Team Size</label>
                    <Select options={['1-10', '11-50', '51-100', '101-500', '501-1000', '1001-5000', '5000+']} placeholder={data.teamSize} onValueChange={(option) => handleSelectChange('teamSize', option)} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.teamSize || ''}
                    </div>
                </div>

                <div className="  relative w-full ">
                    <label className="text-sm text-customGray-900" htmlFor="dob">Year of Establishment</label>
                    <DatePicker handleChange={handleYearEstablishedChange} currentDate={data.establishDate} type={'month'} dateRange={'past'} />
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.establishDate || ''}
                    </div>
                </div>

                <div className="w-full md:max-w-1/2  relative sm:col-span-2">
                    <label htmlFor="companyWebsite" className="text-sm text-customGray-900">Company Website</label>
                    <div className="flex items-center gap-3 border mt-2 rounded-md border-customGray-100 placeholder:text-customGray-400 outline-none focus-within:ring-1 focus-within:ring-primary-500 pl-3 pr-[18px]">
                        <LinkIcon className="h-6 w-6 text-primary-500" />
                        <input type="text" placeholder="Website url..." id="companyWebsite" value={data.companyWebsite} onChange={(e) => setData('companyWebsite', e.target.value)} className="w-full outline-none placeholder:text-customGray-400 text-customGray-900 py-3" />
                    </div>
                    <div className="text-sm w-full text-danger-600 min-h-5" >
                        {props.errors.companyWebsite}
                    </div>
                </div>
            </div>


            <div className="relative mt-6">
                <label className="text-sm text-customGray-900">About Company</label>
                <RichTextEditor content={data.aboutCompany} onChange={newContent => setData('aboutCompany', newContent)}
                    placeholder="Write down about your company here. Let the candidate know who you are..." />
                <div className="text-sm w-full text-danger-600 min-h-5" >
                    {props.errors.aboutCompany || ''}
                </div>
            </div>



            <div className="flex flex-wrap items-center gap-2 mt-8">
                <button disabled={processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    Save Changes
                </button>
                <span className={`text-success-500 h-6 w-52 sm:w-auto text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                    {successMsg}
                </span>
            </div>


        </form>
    )
}
