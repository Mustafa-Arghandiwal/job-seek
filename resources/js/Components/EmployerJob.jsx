
import { useState, useRef, useEffect } from "react"



export default function EmployerJob() {

    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)
    const threeDotsBtnRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) && threeDotsBtnRef && !threeDotsBtnRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)

    })
    return (
        <tr className="border-b border-b-customGray-100">
            <td scope="row" className="p-5 whitespace-nowrap">
                <h3 className="text-customGray-900 font-medium ">UI/UX Designer</h3>
                <p className="text-sm text-customGray-500">Full Time &bull; 27 days remaining</p>

            </td>

            <td className="text-danger-500 text-sm p-5 whitespace-nowrap">
                <div className="flex items-center gap-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                        <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.5 12.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Expired
                </div>
            </td>


            <td className="text-customGray-600 text-sm p-5 whitespace-nowrap">
                <div className="flex items-center gap-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25 15C10.9424 15 13.125 12.8174 13.125 10.125C13.125 7.43261 10.9424 5.25 8.25 5.25C5.55761 5.25 3.375 7.43261 3.375 10.125C3.375 12.8174 5.55761 15 8.25 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                        <path d="M14.5703 5.43076C15.2408 5.24184 15.9441 5.1988 16.6326 5.30454C17.3212 5.41029 17.9791 5.66236 18.562 6.04377C19.1449 6.42519 19.6393 6.92709 20.012 7.51568C20.3846 8.10427 20.6268 8.76588 20.7221 9.45594C20.8175 10.146 20.764 10.8485 20.565 11.5161C20.366 12.1837 20.0263 12.8009 19.5687 13.3262C19.1111 13.8514 18.5463 14.2726 17.9123 14.5611C17.2782 14.8497 16.5897 14.9991 15.8931 14.9992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.5 18.5059C2.26138 17.4229 3.27215 16.539 4.44698 15.9288C5.62182 15.3186 6.92623 15.0001 8.25008 15C9.57393 14.9999 10.8784 15.3184 12.0532 15.9285C13.2281 16.5386 14.239 17.4225 15.0004 18.5054" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.8926 15C17.2166 14.999 18.5213 15.3171 19.6962 15.9273C20.8712 16.5375 21.8819 17.4218 22.6426 18.5054" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    23 Applications

                </div>
            </td>


            <td className="p-5 whitespace-nowrap">
                <div className="flex items-center gap-2">
                <button type="button" className="flex gap-3  font-semibold text-primary-500 hover:text-white bg-customGray-50 hover:bg-primary-500 cursor-pointer px-6 py-3 duration-150 text-nowrap">View Applications</button>
                <div className="relative">
                    <button type="button" ref={threeDotsBtnRef} onClick={() => setShowMenu(prev => !prev)} className=" cursor-pointer scale-110 active:scale-125  text-customGray-500" >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13.125C12.6213 13.125 13.125 12.6213 13.125 12C13.125 11.3787 12.6213 10.875 12 10.875C11.3787 10.875 10.875 11.3787 10.875 12C10.875 12.6213 11.3787 13.125 12 13.125Z" fill="currentColor" stroke="currentColor" />
                            <path d="M12 6.65039C12.6213 6.65039 13.125 6.14671 13.125 5.52539C13.125 4.90407 12.6213 4.40039 12 4.40039C11.3787 4.40039 10.875 4.90407 10.875 5.52539C10.875 6.14671 11.3787 6.65039 12 6.65039Z" fill="currentColor" stroke="currentColor" />
                            <path d="M12 19.6094C12.6213 19.6094 13.125 19.1057 13.125 18.4844C13.125 17.8631 12.6213 17.3594 12 17.3594C11.3787 17.3594 10.875 17.8631 10.875 18.4844C10.875 19.1057 11.3787 19.6094 12 19.6094Z" fill="currentColor" stroke="currentColor" />
                        </svg>
                    </button>

                    <div ref={menuRef} className={`bg-white  min-w-32 md:min-w-40 rounded-md absolute -left-32 top-11  shadow-lg z-10 ${showMenu ? 'max-h-40 py-2' : 'max-h-0 py-0'} overflow-hidden transition-all duration-75  `}>
                        <button type="button"
                            className="text-customGray-600 hover:text-primary-500 flex gap-1 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3.54108C3.75 3.54108 1.25 10 1.25 10C1.25 10 3.75 16.4577 10 16.4577C16.25 16.4577 18.75 10 18.75 10C18.75 10 16.25 3.54108 10 3.54108Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 13.1251C11.7259 13.1251 13.125 11.726 13.125 10.0001C13.125 8.27417 11.7259 6.87506 10 6.87506C8.27411 6.87506 6.875 8.27417 6.875 10.0001C6.875 11.726 8.27411 13.1251 10 13.1251Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-medium">View Details</span>
                        </button>

                        <button className=" text-customGray-600 hover:text-danger-500 flex gap-1 px-2  w-full min-h-8 items-center hover:bg-primary-50 transition-colors duration-150 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                                <path d="M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.5 12.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-medium ">Expire Job</span>
                        </button>

                    </div>
                </div>


                </div>

            </td>


        </tr>
    )
}



//  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//      <path d="M13.4375 8.125L8.85414 12.5L6.5625 10.3125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//  </svg>
// Active
