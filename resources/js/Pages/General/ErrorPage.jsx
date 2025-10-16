import { Link } from "@inertiajs/react"
import EmployerLayout from "../../Layouts/EmployerLayout"
import Layout from "../../Layouts/Layout"
import { DangerIcon, NotFoundIllustration, RightArrowIcon } from "../../utils/svgs"
import { AlertTriangleIcon } from "lucide-react"



function ErrorPage({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: 'Oops! Page not found',
        403: 'Sorry! Access denied',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: "The page you're looking for doesn't exist or may have been removed.",
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    return (
        <div className={`${status !== 404 && "h-[100dvh]"} flex flex-col xl:flex-row py-12 sm:py-24 px-4 sm:px-12 gap-12 xl:gap-16  justify-center items-center`}>
            <div className="max-w-[380px] ">
                <h1 className="font-medium text-customGray-900 text-2xl sm:text-4xl">{title}</h1>
                <p className="mt-3 sm:mt-6 text-lg text-customGray-700" >{description}</p>

                <div className="mt-4 sm:mt-8 flex gap-4">
                    <Link href="/" className="bg-primary-500 font-semibold flex items-center gap-2 rounded-[3px] py-3 px-6 text-white hover:bg-primary-600 cursor-pointer duration-150">Home <RightArrowIcon /></Link>
                    <button onClick={() => window.history.back()} className="text-primary-500 py-3 px-6 font-semibold rounded-[3px] border border-primary-50 hover:bg-primary-50 hover:border-primary-500 hover:text-primary-600 cursor-pointer duration-150">Go back</button>
                </div>
            </div>


            {/* <DangerIcon className="w-full max-w-[800px] h-full max-h-[600px]"/> */}
            <div className="">
                {status === 404 ?
                    <NotFoundIllustration className="w-full max-w-[800px] h-full max-h-[600px]" />
                    :
                    <DangerIcon className="w-3xs sm:w-xs h-full"/>
                }
            </div>
        </div>
    )
}


ErrorPage.layout = page => {
    const userType = page.props.auth.user?.user_type
    return userType === 'employer' ? <EmployerLayout children={page} /> : <Layout children={page} />

}

export default ErrorPage
