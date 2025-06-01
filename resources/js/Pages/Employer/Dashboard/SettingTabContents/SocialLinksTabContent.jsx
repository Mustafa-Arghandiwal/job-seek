import SocialLinksItem from "../../../../Components/SocialLinkItem"
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";


export default function SocialLinksTabContent() {


    const { props } = usePage()
    const linksFromDB = props.auth.user.social_links || []
    const socialLinkTypes = ["LinkedIn", "X", "GitHub", "Instagram"]

    const initialLinks = socialLinkTypes.map(type => {
        const fromDb = linksFromDB.find(link => link.type === type)
        return {
            type,
            url: fromDb?.url || '',
            selectedBy: fromDb ? linksFromDB.indexOf(fromDb) : null
        }
    })
    const { data, setData, transform, errors, clearErrors, processing, post } = useForm({
        links: initialLinks
    })
    const selectedCount = data.links.filter(link => link.selectedBy !== null).length
    const isAddBtnDisabled = selectedCount >= socialLinkTypes.length

    const addLink = () => {
        const nextIndex = selectedCount
        const unusedLink = data.links.find((l) => l.selectedBy === null)
        if (!unusedLink) return

        setData((prev) => ({
            ...prev,
            links: prev.links.map((l) =>
                l.type === unusedLink.type ? { ...l, url: '', selectedBy: nextIndex } : l
            ),
        }))
    }



    const handleRemoveLink = (linkNumber) => {
        clearErrors()
        setData((prev) => ({
            ...prev,
            links: prev.links.map((l) => {
                if (l.selectedBy === linkNumber) {
                    return { ...l, url: "", selectedBy: null }
                } else if (l.selectedBy > linkNumber) {
                    return { ...l, selectedBy: l.selectedBy - 1 }
                }
                return l
            }),
        }))
    }


    const handleSelect = (linkType, linkNumber) => {
        setData(prev => ({
            ...prev,
            links: prev.links.map(linkObj => {
                if (linkObj.type === linkType) {
                    return { ...linkObj, selectedBy: linkNumber }
                } else if (linkObj.selectedBy === linkNumber) {
                    return { ...linkObj, selectedBy: null }
                } else {
                    return linkObj
                }
            })
        }))
    }


    const handleSetUrl = (linkType, linkUrl) => {
        setData(prev => ({
            ...prev,
            links: prev.links.map(linkObj => {
                if (linkType === linkObj.type) {
                    return { ...linkObj, url: linkUrl }
                } else {
                    return linkObj
                }
            })
        }))
    }



    const [successMsg, setSuccessMsg] = useState('')

    useEffect(() => {
        if (successMsg) {

            const timer = setTimeout(() => setSuccessMsg(''), 5000)
            return () => clearTimeout(timer)
        }
    }, [successMsg])

    useEffect(() => {
        if (props.flash.socialLinksSuccess) {
            setSuccessMsg(props.flash.socialLinksSuccess)
        }
    }, [props.flash.socialLinksSuccess])



    transform(data => ({
        ...data,
        links: data.links.filter(link => link.selectedBy !== null)
    }))

    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccessMsg('')
        post('/candidate/settings/social-links', {
            onSuccess: () => {
                setSuccessMsg(props.flash.socialLinksSuccess)
            }
        })

    }

    return (

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {data.links
                .filter((l) => l.selectedBy !== null)
                .sort((a, b) => a.selectedBy - b.selectedBy)
                .map((linkObj) => (
                    <SocialLinksItem
                        key={linkObj.type}
                        linkNumber={linkObj.selectedBy}
                        linkObjects={data.links}
                        onValueChange={handleSelect}
                        handleRemoveLink={handleRemoveLink}
                        handleSetUrl={handleSetUrl}
                        error={errors}
                    />
                ))
            }

            <button onClick={addLink}
                type="button" disabled={isAddBtnDisabled} className={`flex w-full  max-w-[860px] justify-center items-center text-sm  gap-2 disabled:text-customGray-300 disabled:hover:bg-customGray-50 disabled:cursor-not-allowed text-customGray-900 bg-customGray-50 rounded-md py-3 px-2 cursor-pointer hover:bg-primary-500 hover:text-white duration-75`} >
                <svg className="rotate-45" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" />
                    <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.5 12.5L7.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Add New Social Link</span>
            </button>

            <div className="flex flex-wrap  items-center gap-2">
                <button disabled={processing} className="text-nowrap px-8 py-4 text-white rounded-sm bg-primary-500 hover:bg-primary-600 disabled:bg-primary-100 font-semibold cursor-pointer">
                    Save Changes
                </button>
                <span className={`text-success-500  h-6 w-52 text-sm ${successMsg ? 'opacity-100' : 'opacity-0'}  transition-all duration-300 `}>
                    {successMsg}
                </span>
            </div>
        </form>
    )

}

