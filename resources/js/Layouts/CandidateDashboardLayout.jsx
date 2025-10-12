import { Link, router, usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import { CloseXIcon, DashboardIcon, OverviewIcon, SimpleBriefCaseIcon, BookmarkIcon, GearIcon, AnimatedLogoutIcon } from "../utils/svgs"
import { SidebarOpen } from "lucide-react"

export default function CandidateDashboardLayout({ children }) {
    const { url } = usePage()

    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768)
    const [isMd, setIsMd] = useState(window.innerWidth >= 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMd(window.innerWidth >= 768)
            setIsOpen(window.innerWidth >= 768)

        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="relative grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]  h-[calc(100dvh-138px-40px)] overflow-hidden px-2.5 xl:px-[150px] 2xl:px-[230px] ">

            {/* open sidebar */}
            <button onClick={() => setIsOpen(true)} className={` absolute  block md:hidden top-1 left-1 ${isOpen && 'hidden'} cursor-pointer`}>
                <SidebarOpen className="text-customGray-700 w-5.5 h-5.5" />
            </button>

            <nav className={`text-nowrap bg-white md:bg-transparent z-30 h-[calc(100%-178px)] md:h-auto fixed md:static flex w-[200px] transition-transform flex-col pt-6  border-r border-r-customGray-100 ${isOpen ? '-translate-x-0' : '-translate-x-full overflow-hidden border-r-0'} duration-300`}>

                <div className="flex justify-center items-center gap-4 mb-3">
                    <h2 className={` text-customGray-400 font-medium  text-xs `}>CANDIDATE DASHBOARD</h2>

                    {/* close sidebar */}
                    <button onClick={() => setIsOpen(false)} className="block md:hidden rounded-full cursor-pointer text-customGray-700">
                        <CloseXIcon className="text-customGray-600" />
                    </button>
                </div>

                <Link onClick={() => setTimeout(() => !isMd && setIsOpen(false), 150)} href="/candidate/dashboard/overview" className={` ${url === '/candidate/dashboard/overview' ? 'before:h-full bg-primary-50 text-primary-500 hover:bg-primary-50 hover:text-primary-500 ' : 'before:h-0'} relative group before:absolute before:bg-primary-500 before:left-0 before:w-1 before:top-0   flex gap-4 items-center px-5 py-3 text-customGray-500 text-sm font-medium hover:text-customGray-900 hover:bg-customGray-50 before:rounded-4xl before:duration-150 before:ease-in-out `}>
                    <OverviewIcon className="shrink-0" />
                    <span>Overview</span>
                </Link>

                <Link onClick={() => setTimeout(() => !isMd && setIsOpen(false), 150)} href="/candidate/applied-jobs" className={` ${url.startsWith('/candidate/applied-jobs') ? 'before:h-full bg-primary-50 text-primary-500 hover:bg-primary-50 hover:text-primary-500 ' : 'before:h-0'} relative group before:absolute before:bg-primary-500 before:left-0 before:w-1 before:top-0   flex gap-4 items-center px-5 py-3 text-customGray-500 text-sm font-medium hover:text-customGray-900 hover:bg-customGray-50 before:rounded-4xl before:duration-150 before:ease-in-out `}>
                    <SimpleBriefCaseIcon className="shrink-0" />
                    <span>Applied Jobs</span>
                </Link>

                <Link onClick={() => setTimeout(() => !isMd && setIsOpen(false), 150)} href="/candidate/saved-jobs" className={` ${url.startsWith('/candidate/saved-jobs') ? 'before:h-full bg-primary-50 text-primary-500 hover:bg-primary-50 hover:text-primary-500 ' : 'before:h-0'} relative group before:absolute before:bg-primary-500 before:left-0 before:w-1 before:top-0   flex gap-4 items-center px-5 py-3 text-customGray-500 text-sm font-medium hover:text-customGray-900 hover:bg-customGray-50 before:rounded-4xl before:duration-150 before:ease-in-out `}>
                    <BookmarkIcon bookmarked={false} className="shrink-0" />
                    <span>Saved Jobs</span>
                </Link>

                <Link onClick={() => setTimeout(() => !isMd && setIsOpen(false), 150)} href="/candidate/dashboard/settings" className={` ${url.startsWith('/candidate/dashboard/settings') ? 'before:h-full bg-primary-50 text-primary-500 hover:bg-primary-50 hover:text-primary-500 ' : 'before:h-0'} relative group before:absolute before:bg-primary-500 before:left-0 before:w-1 before:top-0   flex gap-4 items-center px-5 py-3 text-customGray-500 text-sm font-medium hover:text-customGray-900 hover:bg-customGray-50 before:rounded-4xl before:duration-150 before:ease-in-out `}>
                    <GearIcon className="shrink-0" />
                    <span>Settings</span>
                </Link>


                <button onClick={() => router.post('/sign-out')}
                    className="group flex mt-auto gap-4 items-center px-5 py-3 text-white text-sm font-medium bg-danger-400 hover:bg-danger-500 rounded-sm duration-150 cursor-pointer">
                    <AnimatedLogoutIcon className="shrink-0 w-9" />
                    <span>Logout</span>
                </button>
            </nav>

            <main className="overflow-y-auto scrollbar-custom py-12 px-4 md:px-12 2xl:pr-32 w-[100vw] md:w-auto ">
                {children}
            </main>
        </div>
    )
}



