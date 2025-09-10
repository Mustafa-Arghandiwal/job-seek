
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";


export default function EmployerLayout({ children }) {

    const { url, props } = usePage()
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const menuBtnRef = useRef(null)
    const menuRef = useRef(null)
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    //Will be null if guest
    const user = props.auth.user
    const { post } = useForm()
    const profilePictureStorageLink = props.auth.user?.emp_profile_picture
    //if no profile pic, use placeholder
    const headerProfilePic = profilePictureStorageLink ? `/storage/${profilePictureStorageLink}` : '/User.png'

    const dashboardUrls = [
        '/employer/dashboard/overview',
        '/employer/dashboard/post-job',
        '/employer/dashboard/my-jobs',
        '/employer/saved-candidates',
        '/employer/dashboard/settings',
        '/employer/vacancies'
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/sign-out')
    }

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (dropdownVisible || currentScrollY <= 138) {
            setIsVisible(true);
            return;
        }

        if (currentScrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, dropdownVisible]);


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


    return (
        <div className="h-screen">
            <header className={`sticky top-0 bg-white shadow-lg  z-50 transition-transform duration-300 ${isVisible || dashboardUrls.includes(url) ? 'transform-none' : '-translate-y-full'}`}>
                <nav className="h-12 border-b border-b-customGray-50 flex justify-between items-center px-3 xl:px-24">
                    <ul className="text-customGray-600 text-sm gap-4 hidden md:flex ">
                        <li><Link href="/" className={`${url === '/' ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-3.5 transition-all after:duration-200 after:ease-in-out`}>Home</Link></li>
                        <li><Link href="/vacancies" className={`${url.startsWith('/vacancies') ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-3.5 transition-all after:duration-200 after:ease-in-out`} >Jobs</Link></li>
                        <li><Link href="/employer/dashboard/overview" className={`${(dashboardUrls.includes(url) || url.startsWith('/employer/vacancies')) ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-3.5 transition-all after:duration-200 after:ease-in-out`} >Dashboard</Link></li>
                        <li><Link href="/support" className={`${url === '/support' ? 'after:w-full text-primary-500' : 'after:w-0'} relative after:absolute after:bg-primary-500 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 pb-3.5 transition-all after:duration-200 after:ease-in-out`} >Support</Link></li>
                    </ul>

                    <div className=" flex gap-1">
                        <img className="h-6 w-6" src="/PhoneCall.png"></img> <span className="text-customGray-900 text-sm font-medium">+93-777-777-777</span>
                    </div>




                    <button ref={menuBtnRef} onClick={() => setDropdownVisible(prev => !prev)} className="cursor-pointer md:hidden w-6 h-6 relative">
                        <img src="/fi_menu.png" className={`absolute top-1/2 -translate-y-1/2  ${dropdownVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-150`} alt="open menu icon" />
                        <img src="/X.png" className={` absolute top-1/2 -translate-y-1/2 ${dropdownVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`} alt="close menu icon" />
                    </button>




                </nav>

                <section className="h-[90px] border-b  border-b-customGray-50 flex justify-between gap-5 px-3 xl:px-24 items-center">

                    <div className="flex gap-9 sm:gap-11  ">
                        <Link href="/" className="flex items-center gap-1">
                            <img src="/briefcase.svg" className="w-8 sm:w-10" />
                            <span className="text-customGray-900 font-semibold text-lg sm:text-2xl">JobSeek</span>
                        </Link>
                        <form>
                            <div className="flex items-center w-[60svw] md:w-[45svw]  rounded-sm border border-customGray-100 px-4 pr-0 focus-within:ring focus-within:ring-primary-500">
                                <img src="/fi_search.png" className="h-6" />
                                <input type="text" placeholder="Search Jobs..."
                                    className="px-3.5 h-12 w-full outline-0  text-customGray-900" />
                            </div>
                        </form>

                    </div>

                    {
                        user ?
                            <div className="hidden md:flex gap-2 items-center">
                                <Link href="/employer/dashboard/settings" className="h-12 w-12 rounded-full border-2 overflow-hidden border-primary-500">
                                    <img src={headerProfilePic} alt="profile picture" className="h-full w-full  hover:scale-105 duration-100" />
                                </Link>

                                <form onSubmit={handleSubmit}>
                                    <button type="submit" className="bg-danger-500 text-white px-2 py-1 text-sm rounded-[3px] cursor-pointer hover:bg-danger-600 duration-100">Logout</button>
                                </form>
                            </div>

                            :
                            <div className="hidden md:flex gap-2">
                                <Link className="text-primary-500 hover:text-primary-600 border-primary-100 hover:border-primary-600 hover:bg-primary-50 font-semibold border  rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-in">Sign In</Link>
                                <Link className="text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-up">Create Account</Link>
                            </div>

                    }
                </section>




            </header>

            <div ref={menuRef} className={`fixed z-50 shadow-lg bg-white w-full pb-6 px-6 rounded-b-2xl ${dropdownVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"} transition-all duration-300 ease-in-out`}>
                <ul className="mt-1 text-sm text-customGray-600 w-full ">
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="/">Home</Link></li>
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="/nothing-for-now">Find Candidates</Link></li>
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="/employer/dashboard/overview">Dashboard</Link></li>
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="/support">Support</Link></li>
                </ul>
                {user ?

                    <div className="flex gap-2 mt-6 items-center">
                        <Link href="/employer/dashboard/settings" className="h-12 w-12 rounded-full border-2 overflow-hidden border-primary-500">
                            <img src={headerProfilePic} className="h-full w-full  hover:scale-105 duration-100" />
                        </Link>

                        <form onSubmit={handleSubmit}>
                            <button type="submit" className="bg-danger-500 text-white px-2 py-1 text-sm rounded-[3px] cursor-pointer hover:bg-danger-600 duration-100">Logout</button>
                        </form>
                    </div>

                    :

                    <div className="flex gap-2 mt-6 ">
                        <Link className="text-primary-500 hover:text-primary-600 border-primary-100 hover:border-primary-600 hover:bg-primary-50 font-semibold border  rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-in">Sign In</Link>
                        <Link className="text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-up">Create Account</Link>
                    </div>
                }

            </div>


            <main className="relative">
                <div className={`fixed inset-0 bg-[#18191C]/60 ${dropdownVisible ? 'opacity-100 z-40' : 'opacity-0 -z-50'}`}></div>
                {children}
            </main>

            {
                //If we are inside dashboard, render a simpler footer
                dashboardUrls.some(dashUrl => url.startsWith(dashUrl))
                    ?
                    <footer className=" col-span-2 px-8  h-10 flex justify-center items-center border-t border-customGray-100  ">
                        <p className="text-xs text-center  text-customGray-500 ">&copy; 2025 JobSeek – Eqbal and Mustafa. All rights reserved. Not that anyone cares.</p>
                    </footer>

                    :
                    <footer>
                        <div className="flex flex-col gap-8 bg-customGray-900">
                            <div className="grid grid-cols-2 grid-rows-auto gap-y-8 gap-x-2 py-8 px-4 lg:grid-rows-1 lg:grid-cols-6 lg:gap-x-4 lg:px-12 max-w-[1320px] mx-auto">
                                <div className="flex flex-col gap-4 col-span-2">
                                    <div className="flex items-center gap-1">
                                        <img src="/briefcase.svg" />
                                        <span className="font-semibold text-2xl text-white">JobSeek</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-customGray-400">
                                            Call now: <span className="text-white">+93-777-777-777</span>
                                        </p>
                                        <p className="text-customGray-400">
                                            6391 Elgin St. Celina, Delaware 10299, New York, United States of America
                                        </p>
                                    </div>

                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-white font-semibold text-xl">Quick Links</h3>
                                    <ul className="flex flex-col gap-3">
                                        <li className="text-customGray-400">
                                            <Link href="" className="">About</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Contact</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Pricing</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Blog</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-white font-semibold text-xl">Candidate</h3>
                                    <ul className="flex flex-col gap-3">
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Browse Jobs</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Browse Employers</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Candidate Dashboard</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Saved Jobs</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-white font-semibold text-xl">Employers</h3>
                                    <ul className="flex flex-col gap-3">
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Post a Job</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Browse Candidates</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Employers Dashboard</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Applications</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-white font-semibold text-xl">Support</h3>
                                    <ul className="flex flex-col gap-3">
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Faqs</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Privacy Policy</Link>
                                        </li>
                                        <li className="text-customGray-400">
                                            <Link href="" className="">Terms & Conditions</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-customGray-600 ">
                                <div className="flex justify-center items-center lg:justify-between max-w-[1320px] px-4 py-4 lg:px-12 mx-auto">
                                    <p className="text-customGray-400">@ 2024 MyJob - Job Portal. All rights reserved.</p>
                                    <div className=" hidden lg:flex lg:gap-1">
                                        <img src="/briefcase.svg" className="" />
                                        <img src="/briefcase.svg" className="" />
                                        <img src="/briefcase.svg" className="" />
                                        <img src="/briefcase.svg" className="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>

            }

        </div>
    )
}


