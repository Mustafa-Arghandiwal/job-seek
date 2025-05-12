import { useState } from "react"
import SocialLinksItem from "../../../../Components/SocialLinkItem"



export default function SocialLinksTabContent() {

    const [links, setLinks] = useState([
        { type: 'LinkedIn', url: '', selectedBy: null },
        { type: 'X', url: '', selectedBy: null },
        { type: 'GitHub', url: '', selectedBy: null },
        { type: 'Instagram', url: '', selectedBy: null }
    ])

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
    const [socialLinksItemsArray, setSocialLinksItemsArray] = useState([])

    const addLink = () => {
        setSocialLinksItemsArray(prevArr => (
            [...prevArr, <SocialLinksItem linkNumber={prevArr.length} linkObjects={links} onValueChange={handleSelect} />]
        ))
    }

    console.log(links)
    return (
        <form className="flex flex-col gap-6">
            {/* <SocialLinksItem linkNumber={0} linkObjects={links} onValueChange={handleSelect} /> */}
            {/* <SocialLinksItem linkNumber={1} linkObjects={links} onValueChange={handleSelect} /> */}
            {/* <SocialLinksItem linkNumber={2} linkObjects={links} onValueChange={handleSelect} /> */}
            {/* <SocialLinksItem linkNumber={3} linkObjects={links} onValueChange={handleSelect} /> */}

            {socialLinksItemsArray}
            <button onClick={addLink}
                type="button" className="flex justify-center items-center text-sm  gap-2 text-gray-900 bg-customGray-50 rounded-md py-3 px-2 cursor-pointer hover:bg-primary-500 hover:text-white duration-75" >
                <svg className="rotate-45" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" />
                    <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.5 12.5L7.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Add New Social Link</span>
            </button>
        </form>
    )
}
