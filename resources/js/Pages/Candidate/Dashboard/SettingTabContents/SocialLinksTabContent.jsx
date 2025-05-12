import { useEffect, useState } from "react"
import SocialLinksItem from "../../../../Components/SocialLinkItem"
import { useForm, usePage } from "@inertiajs/react"



export default function SocialLinksTabContent() {

    const { data, setData, errors, processing, post } = useForm({
        links:  [
            { type: 'LinkedIn', url: '', selectedBy: null },
            { type: 'X', url: '', selectedBy: null },
            { type: 'GitHub', url: '', selectedBy: null },
            { type: 'Instagram', url: '', selectedBy: null }
        ]
})

    const { props } = usePage()
    // const [links, setLinks] = useState([
    //     { type: 'LinkedIn', url: '', selectedBy: null },
    //     { type: 'X', url: '', selectedBy: null },
    //     { type: 'GitHub', url: '', selectedBy: null },
    //     { type: 'Instagram', url: '', selectedBy: null }
    // ])

    const handleSelect = (linkType, linkNumber) => {
        setLinks(prevLinks => {
            return prevLinks.map(linkObj => {
                if (linkObj.type === linkType) {
                    return { ...linkObj, selectedBy: linkNumber }
                } else if (linkObj.selectedBy === linkNumber) {
                    return { ...linkObj, selectedBy: null }
                } else {
                    return { ...linkObj }
                }
            })
        })
    }
    const [socialLinkIndices, setSocialLinkIndices] = useState([])

    const addLink = () => {
        // don't let add more select boxes than there are link types
        if (socialLinkIndices.length < data.links.length) {

            setSocialLinkIndices(prev => (
                [...prev, prev.length]
            ))
        }
    }

    const handleRemoveLink = (linkNumber) => {

        setSocialLinkIndices(prev => {
            const updated = prev.filter(i => i !== linkNumber)
            return updated.map((_, i) => i)
        })

        setLinks(prevLinks => (
            prevLinks.map(linkObj => {
                if (linkObj.selectedBy === linkNumber) {
                    return { ...linkObj, selectedBy: null }
                } else if (linkObj.selectedBy > linkNumber) {
                    return { ...linkObj, selectedBy: linkObj.selectedBy - 1 }
                } else {
                    return linkObj
                }
            })
        ))

    }

    const isAddBtnDisabled = socialLinkIndices.length >= data.links.length


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

    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccessMsg('')
        post('/candidate/settings/social-links', {
            onSuccess: () => {
                setSuccessMsg(props.flash.success)
            }
        })

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
            {
                socialLinkIndices.map(linkNumber => (
                    <SocialLinksItem
                        key={linkNumber}
                        linkNumber={linkNumber}
                        linkObjects={data.links}
                        onValueChange={handleSelect}
                        handleRemoveLink={handleRemoveLink}
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
