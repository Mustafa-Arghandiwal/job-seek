import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";


export default function Layout({ children }) {

    const {url} = usePage()
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const menuBtnRef = useRef(null)
    const menuRef = useRef(null)
    

    useEffect(() => {

        const handleClickOutside = (e) => {
            if(menuBtnRef.current && !menuBtnRef.current.contains(e.target) && 
            menuRef.current && !menuRef.current.contains(e.target)) {
                setDropdownVisible(false)
                
            }

        }
            document.addEventListener('click', handleClickOutside)

            return () => document.removeEventListener('click', handleClickOutside)
    }, [])

   useEffect(() => {

    const handleNavigate = () => {
        setDropdownVisible(false)
    }
    router.on('navigate', handleNavigate)
    return () => router.off('navigate', handleNavigate)
    
   }, [])


    return (
        <>
            <header className="">
                <nav className="h-12 bg-customGray-50 flex justify-between items-center px-3 xl:px-24">
                    <ul className="text-customGray-600 text-sm gap-4 hidden md:flex ">
                        <li><Link href="/" className={url==='/' ? 'border-b-2 border-b-primary-500 text-primary-500 pb-3.5': ''}>Home</Link></li>
                        <li><Link href="/find-job" className={url==='/find-job' ? 'border-b-2 border-b-primary-500 text-primary-500 pb-3.5': ''}>Find Job</Link></li>
                        <li><Link href="#" className={url==='/find-employers' ? 'border-b-2 border-b-primary-500 text-primary-500 pb-3.5': ''}>Find Employers</Link></li>
                        <li><Link href="#" className={url==='/dashboard' ? 'border-b-2 border-b-primary-500 text-primary-500 pb-3.5': ''}>Dashboard</Link></li>
                        <li><Link href="#" className={url==='/support' ? 'border-b-2 border-b-primary-500 text-primary-500 pb-3.5': ''}>Support</Link></li>
                    </ul>

                    <div className=" flex gap-1">
                        <img className="h-6 w-6" src="phoneCall.png"></img> <span className="text-customGray-900 text-sm font-medium">+93-777-777-777</span>
                    </div>

                    

                    
                        <button ref={menuBtnRef} onClick={() => setDropdownVisible(prev => !prev)} className="cursor-pointer md:hidden w-6 h-6 relative">
                            <img src="fi_menu.png" className={`absolute top-1/2 -translate-y-1/2  ${dropdownVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-150`} alt="open menu icon" />
                            <img src="X.png" className={` absolute top-1/2 -translate-y-1/2 ${dropdownVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`} alt="close menu icon" />
                        </button>
                    
                    
                    

                </nav>

                <section className="h-[90px] border-b border-b-customGray-50 flex justify-between gap-5 px-3 xl:px-24 items-center">

                    <div className="flex gap-9 sm:gap-11  ">
                        <div className="flex items-center gap-1">
                            <img src="briefcase.svg" className="w-8 sm:w-10"/>
                            <span className="text-customGray-900 font-semibold text-lg sm:text-2xl">JobSeek</span>
                        </div>
                        <form className=" ">
                            <div className="flex items-center w-[60svw] md:w-[45svw]  rounded-sm border border-customGray-100 px-4 pr-0 focus-within:ring focus-within:ring-primary-500">
                                <img src="fi_search.png" className="h-6"/>
                                <input type="text" placeholder="Search Jobs..." 
                                className="px-3.5 h-12 w-full outline-0  text-customGray-900" />
                            </div>
                        </form>

                    </div>

                    <div className="hidden md:flex gap-2">
                        <Link className="text-primary-500 hover:text-primary-600 border-primary-100 hover:border-primary-600 hover:bg-primary-50 font-semibold border  rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-in">Sign In</Link>
                        <Link className="text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-up">Create Account</Link>
                    </div>

                </section>


                

            </header>

            <div ref={menuRef} className={`absolute z-50 bg-white w-full pb-6 px-6 rounded-b-2xl ${dropdownVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"} transition-all duration-300 ease-in-out`}>
                <ul className="mt-1 text-sm text-customGray-600 w-full ">
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="/">Home</Link></li>
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="/find-job">Find Job</Link></li>
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="#">Find Employers</Link></li>
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="#">Dashboard</Link></li>
                    <li className="py-4 border-b border-b-customGray-100 hover:text-primary-500 duration-75"><Link href="#">Support</Link></li>
                </ul>
                <div className="flex gap-2 mt-6 ">
                        <Link className="text-primary-500 hover:text-primary-600 border-primary-100 hover:border-primary-600 hover:bg-primary-50 font-semibold border  rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-in">Sign In</Link>
                        <Link className="text-white bg-primary-500 hover:bg-primary-600 font-semibold rounded-[3px] px-6 py-3 duration-150 text-nowrap" href="/sign-up">Create Account</Link>
                </div>
            </div>



            <main className="relative">
                <div className={`absolute inset-0 bg-[#18191C]/60 ${dropdownVisible ? 'opacity-100' : 'opacity-0 -z-50'} transition-opacity duration-300`}></div>
                {children}
            </main>
        </>
    )
}


