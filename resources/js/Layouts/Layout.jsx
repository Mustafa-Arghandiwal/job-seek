import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { BriefCaseIcon, MenuIcon, SearchIcon, SpinnerIcon, UserIcon, GearIcon, EyeIconThin, LogoutIcon } from "../utils/svgs";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "../Pages/Candidate/socialMediaSvgs";
import FooterLink from "../Components/FooterLink";
import SearchItem from "../Components/SearchItem";
import CandidateProfileView from "../Components/CandidateProfileView";
import TextAvatar from "../Components/TextAvatar";


export default function Layout({ children }) {

    const { url, props } = usePage()
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const menuBtnRef = useRef(null)
    const menuRef = useRef(null)
    //Will be null if guest
    const user = props.auth.user
    const { post } = useForm()
    const profilePicPath = props.auth.user?.profile_picture
    const headerProfilePic = profilePicPath ? `/storage/${profilePicPath}` : null

    const dashboardUrls = [
        '/candidate/dashboard/overview',
        '/candidate/applied-jobs',
        '/candidate/saved-jobs',
        '/candidate/dashboard/settings',
    ]

    // ----------------------Profile icon dropdown------------------
    const [profileDropdown, setProfileDropdown] = useState(false)
    const profileRef = useRef(null)
    const profileDropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileDropdown(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])
    // -------------------------------------------------------------

    // ----------------------Profile icon dropdown------------------
    const [showModal, setShowModal] = useState(false)
    const [candidate, setCandidate] = useState(null)

    const userId = props.auth.user?.id
    useEffect(() => {
        if (showModal) {
            fetch(`/candidates/${userId}`)
                .then(res => res.json())
                .then(data => setCandidate(data))
        }

    }, [showModal])
    // -------------------------------------------------------------

    // ----------------------Header show and hide logic------------------
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 138) {
                setIsVisible(true);
            } else {
                if (currentScrollY > lastScrollY.current) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    useEffect(() => {

        const handleClickOutside = (e) => {
            if (menuBtnRef.current && !menuBtnRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)) {
                setDropdownVisible(false)

            }

        }
        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    useEffect(() => {
        return router.on('finish', () => {
            setDropdownVisible(false)
        })

    }, [])



    const searchBarRef = useRef(null)
    const searchModalRef = useRef(null)
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e) => {

            if ((searchBarRef.current && !searchBarRef.current.contains(e.target)) && (searchModalRef.current && !searchModalRef.current.contains(e.target))) {
                setIsTyping(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)

    }, [])


    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (term) => {
        const trimmedTerm = term?.trim() || ''

        setIsLoading(true)
        if (trimmedTerm !== '') {
            fetch(`/search?term=${encodeURIComponent(trimmedTerm)}`)
                .then(res => res.json())
                .then(data => {
                    setIsLoading(false)
                    return setSearchResults(data.results)
                })
                .catch(err => console.log(err))
        }
    }

    const searchItems = searchResults.map(res => (
        <SearchItem key={res.id} id={res.id} companyName={res.employer.user.full_name} logo={res.employer.detail?.logo_path} title={res.job_title} location={res.city} setIsTyping={setIsTyping} />

    ))

    let searchModalContent
    if (isLoading) {
        searchModalContent = <div className="min-h-32 bg-white text-customGray-400 grid place-items-center">
            <SpinnerIcon className="animate-spin-fast w-8 h-8 text-primary-400" />
        </div>
    } else {
        if (searchItems.length > 0) {
            searchModalContent = searchItems
        } else {
            searchModalContent = <div className="min-h-32 text-customGray-400 grid place-items-center">No Results</div>
        }
    }



    return (
        <div className="h-screen">
            <header className={`${!dashboardUrls.includes(url) ? "fixed" : "sticky"} w-full top-0 bg-white shadow-lg  z-50 transition-transform duration-300 ${isVisible || dashboardUrls.includes(url) ? 'transform-none' : '-translate-y-full'}`}>
                <nav className="h-12 border-b border-b-customGray-50 flex items-center px-3 xl:px-24">
                    <ul className="text-customGray-600 text-sm gap-4 hidden sm:flex ">
                        <li><Link href="/" className={`${url === '/' ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-4 transition-all after:duration-200 after:ease-in-out`}>Home</Link></li>
                        <li><Link href="/vacancies" className={`${url.startsWith('/vacancies') ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-4 transition-all after:duration-200 after:ease-in-out`} >Find Job</Link></li>
                        <li><Link href="/employers" className={`${url.startsWith('/employers') ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-4 transition-all after:duration-200 after:ease-in-out`} >Find Employers</Link></li>
                        <li><Link href="/candidate/dashboard/overview" className={`${dashboardUrls.some(item => url.startsWith(item)) ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-4 transition-all after:duration-200 after:ease-in-out`} >Dashboard</Link></li>
                        <li><Link href="/contact" className={`${url === '/contact' ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-4 transition-all after:duration-200 after:ease-in-out`} >Contact Us</Link></li>
                    </ul>





                    <Link href="/" className="flex sm:hidden items-center gap-1">
                        <BriefCaseIcon className="w-8 text-primary-500" />
                        <span className="text-customGray-900 font-semibold text-lg ">JobSeek</span>
                    </Link>
                    <button ref={menuBtnRef} onClick={() => setDropdownVisible(prev => !prev)} className="cursor-pointer sm:hidden w-6 h-6 relative ml-auto">
                        <MenuIcon className="text-customGray-900 absolute top-1/2 -translate-y-1/2 active:scale-95" />
                    </button>
                </nav>

                <section className="h-[90px] border-b  border-b-customGray-50 flex justify-between gap-2 px-3 xl:px-24 items-center">

                    <div className=" w-full sm:flex gap-4 ">
                        <Link href="/" className="hidden sm:flex items-center gap-1">
                            <BriefCaseIcon className="w-10 text-primary-500" />
                            <span className="text-customGray-900 font-semibold text-lg sm:text-2xl">JobSeek</span>
                        </Link>
                        <div className="relative w-full max-w-[800px]">
                            <div ref={searchBarRef} className=" flex items-center rounded-sm border border-customGray-100 px-4 pr-0 focus-within:ring focus-within:ring-primary-500">
                                <SearchIcon className="text-primary-500" />
                                <input type="text" placeholder="Search jobs..."
                                    className="px-3.5 h-12 w-full outline-0  text-customGray-900"
                                    onFocus={(e) => setIsTyping(e.target.value.length > 0)}
                                    onChange={(e) => { handleSearch(e.target.value); setIsTyping(e.target.value.length > 0); }}
                                />
                            </div>
                            <div ref={searchModalRef} className={`w-full max-h-64 bg-white shadow-xl rounded-sm overflow-y-auto overflow-hidden scrollbar-custom absolute mt-2 opacity-0  z-50 duration-200 ${isTyping ? "opacity-100 pointer-events-auto" : "pointer-events-none"}`}>
                                {searchModalContent}
                            </div>
                        </div>
                    </div>

                    {
                        user ?
                            <div className="hidden sm:flex relative">
                                <div ref={profileRef} onClick={() => setProfileDropdown(prev => !prev)} className="h-12 w-12 grid place-items-center rounded-full border-2 overflow-hidden border-primary-500 group">
                                    {headerProfilePic ?
                                        <img src={headerProfilePic} alt="profile picture" className="h-full w-full cursor-pointer active:scale-100  hover:scale-110 duration-100" />
                                        :
                                        <TextAvatar name={props.auth.user.full_name} className="h-full w-full hover:scale-110 active:scale-100 cursor-pointer" />
                                    }
                                </div>
                                <div ref={profileDropdownRef} className={`text-customGray-600  bg-white  w-38  shadow-lg top-13 right-0 text-sm absolute rounded-md border overflow-hidden border-customGray-50
                                    ${profileDropdown ? "opacity-100" : "opacity-0 pointer-events-none"} duration-150`}>
                                    <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-2 py-2 w-full hover:text-primary-500 hover:bg-[#E8F1FF] duration-150 cursor-pointer">
                                        <EyeIconThin className="w-5 h-5" />View my profile
                                    </button>
                                    <Link className="flex items-center gap-1.5 px-2 py-2 w-full hover:text-primary-500 hover:bg-[#E8F1FF] duration-150 cursor-pointer" href="/candidate/dashboard/settings">
                                        <GearIcon className="w-5 h-5" />Settings
                                    </Link>
                                    <button onClick={() => router.post('/sign-out')} className="group flex items-center gap-1.5 py-2 px-2 hover:text-white hover:bg-danger-400 duration-150 w-full cursor-pointer">
                                        <LogoutIcon className="w-5 h-5" /> Logout
                                    </button>
                                </div>
                            </div>

                            :
                            <div className="hidden md:flex gap-2">
                                <Link className="text-primary-500 hover:text-primary-600 border-primary-100 hover:border-primary-600 hover:bg-primary-50 font-semibold border rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-in">Sign In</Link>
                                <Link className="text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-up">Create Account</Link>
                            </div>

                    }
                </section>




            </header>

            <div ref={menuRef} className={`fixed z-50 shadow-lg bg-white w-full pb-6 px-6 rounded-b-2xl ${dropdownVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"} transition-all duration-300 ease-in-out`}>
                <ul className="mt-1 text-sm text-customGray-600 w-full ">
                    <li className=""><Link href="/" className="w-full py-4 block h-full border-b border-b-customGray-100 hover:text-primary-500 duration-75">Home</Link></li>
                    <li className=""><Link href="/vacancies" className="w-full py-4 block h-full border-b border-b-customGray-100 hover:text-primary-500 duration-75">Find Job</Link></li>
                    <li className=""><Link href="/employers" className="w-full py-4 block h-full border-b border-b-customGray-100 hover:text-primary-500 duration-75">Find Employers</Link></li>
                    <li className=""><Link href="/candidate/dashboard/overview" className="w-full py-4 block h-full border-b border-b-customGray-100 hover:text-primary-500 duration-75">Dashboard</Link></li>
                    <li className=""><Link href="/support" className="w-full py-4 block h-full border-b border-b-customGray-100 hover:text-primary-500 duration-75">Support</Link></li>
                </ul>
                {user ?

                    <div className="flex gap-2 mt-6 items-center flex-wrap xs:flex-nowrap">
                        {/* <Link href="/candidate/dashboard/settings" className="h-12 w-12 grid place-items-center rounded-full border-2 overflow-hidden border-primary-500"> */}
                        {/*     {headerProfilePic ? */}
                        {/*         <img src={headerProfilePic} alt="profile picture" className="h-full w-full  hover:scale-110 duration-100" /> */}
                        {/*         : */}
                        {/*         <TextAvatar name={props.auth.user.full_name} className="h-full w-full" /> */}
                        {/*     } */}
                        {/* </Link> */}
                        <Link href="/candidate/dashboard/settings" className="text-primary-600 bg-primary-50  justify-center w-40  text-sm flex items-center p-2 gap-1 rounded-sm">
                            <GearIcon className="w-5 h-5" />Settings
                        </Link>
                        <button type="button" onClick={() => {setShowModal(true); setDropdownVisible(false) }} className="text-primary-600 bg-primary-50  text-sm w-40 justify-center  rounded-sm   flex items-center gap-1 px-2 py-2">
                            <EyeIconThin className="w-5 h-5" />View my profile
                        </button>

                        {/* <form onSubmit={handleSubmit}> */}
                        {/*     <button type="submit" className="bg-danger-500 text-white px-2 py-1 text-sm rounded-[3px] cursor-pointer hover:bg-danger-600 duration-100">Logout</button> */}
                        {/* </form> */}
                    </div>

                    :

                    <div className="flex gap-2 mt-6 ">
                        <Link className="text-primary-500 hover:text-primary-600 border-primary-100 hover:border-primary-600 hover:bg-primary-50 font-semibold border  rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-in">Sign In</Link>
                        <Link className="text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-up">Create Account</Link>
                    </div>
                }

            </div>


            <main className={`relative  ${!dashboardUrls.includes(url) ? "mt-[138px]" : ""} `}>
                <div className={`fixed inset-0 bg-[#18191C]/60 ${dropdownVisible ? 'opacity-100 z-40' : 'opacity-0 -z-50'}`}></div>
                {children}
            </main>

            {
                //If we are inside dashboard, render a simpler footer
                dashboardUrls.some(dashUrl => url.startsWith(dashUrl))
                    ?
                    <footer className=" col-span-2 px-8  h-10 flex justify-center items-center border-t border-customGray-100  ">
                        <p className="text-xs text-center text-customGray-500 ">&copy; 2025 JobSeek – Eqbal and Mustafa. All rights reserved. Not that anyone cares.</p>
                    </footer>

                    :
                    //main footer
                    <footer>
                        <div className="flex flex-col gap-8 bg-black/90 ">
                            <div className="grid grid-cols-2 grid-rows-auto gap-y-8 gap-x-2 py-8 px-4 lg:grid-rows-1 lg:grid-cols-6 lg:px-12 max-w-[1320px] mx-auto">
                                <div className="flex flex-col gap-4 col-span-2">
                                    <Link href="/" className="flex items-center gap-1 hover:text-primary-500 text-white duration-150">
                                        <BriefCaseIcon className="" />
                                        <span className="font-semibold text-2xl">JobSeek</span>
                                    </Link>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-customGray-600 text-lg">
                                            Call now: <span className="text-white text-lg">+93-777-777-777</span>
                                        </p>
                                        <p className="text-customGray-600 text-sm">
                                            Shar-e-Naw, Kabul, Afghanistan
                                        </p>
                                    </div>

                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-white font-medium text-xl">Quick Links</h3>
                                    <ul className="flex flex-col gap-3 text-customGray-600 ">
                                        <FooterLink href="/">Home</FooterLink>
                                        <FooterLink href="/about">About</FooterLink>
                                        <FooterLink href="/sign-in">Sign In</FooterLink>
                                        <FooterLink href="/sign-up">Sign Up</FooterLink>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-white font-medium text-xl">Candidate</h3>
                                    <ul className="flex flex-col gap-3 text-customGray-600 ">
                                        <FooterLink href="/vacancies">Browse Jobs</FooterLink>
                                        <FooterLink href="/employers">Browse Employers</FooterLink>
                                        <FooterLink href="/candidate/dashboard/overview">Candidate Dashboard</FooterLink>
                                        <FooterLink href="/candidate/dashboard/settings">Candidate Settings</FooterLink>
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-4 min-w-48">
                                    <h3 className="text-white font-medium text-xl">Employers</h3>
                                    <ul className="flex flex-col gap-3 text-customGray-600 max-w-34">
                                        <FooterLink href="sign-up?user_type=employer">Post a Job</FooterLink>
                                        <FooterLink href="sign-up?user_type=employer">Employer Dashboard</FooterLink>
                                        <FooterLink href="sign-up?user_type=employer">Employer Settings</FooterLink>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-white font-semibold text-xl">Support</h3>
                                    <ul className="flex flex-col gap-3 text-customGray-600 ">
                                        <FooterLink href="" className="">Faqs</FooterLink>
                                        <FooterLink href="" className="">Terms & Conditions</FooterLink>
                                        <FooterLink href="" className="">Contact</FooterLink>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-customGray-900 ">
                                <div className="flex items-center flex-col lg:flex-row gap-2 lg:justify-between max-w-[1320px] px-4 py-4 lg:px-12 mx-auto">
                                    <p className="text-customGray-600 text-sm order-2 lg:order-1">&copy; 2024 JobSeek - All rights reserved.</p>
                                    <div className=" flex gap-1 order-1 lg:order-2">
                                        <a href="#" ><LinkedInIcon className="text-transparent hover:text-white duration-150" /></a>
                                        <a href="#"><FacebookIcon className="text-transparent hover:text-white duration-150" /></a>
                                        <a href="#"><InstagramIcon className="text-transparent hover:text-white duration-150" /></a>
                                        <a href="#"><YouTubeIcon className="text-transparent hover:text-white duration-150" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>

            }

            <CandidateProfileView profileDropdownRef={profileDropdownRef.current} showModal={showModal} setShowModal={setShowModal} candidateData={candidate}
            />
        </div>
    )
}


