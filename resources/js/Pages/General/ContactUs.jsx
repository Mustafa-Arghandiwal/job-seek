import { useForm, usePage } from "@inertiajs/react"
import EmployerLayout from "../../Layouts/EmployerLayout"
import Layout from "../../Layouts/Layout"
import { SendIcon } from "lucide-react"


function ContactUs() {

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    console.log(usePage().props)
    return (
        <div className="flex flex-col xl:flex-row py-12 sm:py-24 px-4 sm:px-12 gap-12 xl:gap-32 justify-center sm:items-center">
            <div className="max-w-[380px]">
                <h1 className="font-medium text-2xl sm:text-5xl text-customGray-900">We care about our users</h1>
                <p className="text-customGray-700 text-lg mt-4 sm:mt-8">
                    If you’ve got questions, inquiries, or feedback about jobs, hiring, or anything else, we’d love to hear from you!
                </p>
                <p className="text-customGray-700 text-lg ">
                    Reach out to our team for any support or to share your thoughts — we’re here to help.
                </p>
            </div>


            {/* <div className=" border bg-white rounded-xl border-customGray-100 shadow-xl p-4 sm:p-8 xl:p-12"> */}
            <form onSubmit={(e) => { e.preventDefault(); post('/contact/send') }} className=" sm:border bg-white rounded-xl border-customGray-100   sm:p-8 xl:p-12">
                <h3 className="font-medium text-xl sm:text-2xl text-customGray-900">Get in Touch</h3>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-4 sm:mt-8 ">
                    <div>
                        <input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                        <div className="text-sm text-danger-600 min-h-5" >
                            {errors.name}
                        </div>
                    </div>
                    <div>
                        <input type="text" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                        <div className="text-sm  text-danger-600 min-h-5" >
                            {errors.email}
                        </div>
                    </div>
                </div>

                <div>
                    <input type="text" placeholder="Subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} className="w-full mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring-1 focus:ring-primary-500 py-3 px-[18px]" />
                    <div className="text-sm  text-danger-600 min-h-5" >
                        {errors.subject}
                    </div>
                </div>

                <div>
                    <textarea placeholder="Message" value={data.message} onChange={(e) => setData('message', e.target.value)} className="resize-none min-h-32 w-full mt-2 rounded-md border border-customGray-100 placeholder:text-customGray-400 text-customGray-900 outline-none focus:ring focus:ring-primary-500 py-3 px-[18px] scrollbar-custom"></textarea>
                    <div className="text-sm text-danger-600 min-h-5" >
                        {errors.message}
                    </div>
                </div>

                <button className="w-full mt-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-sm flex gap-3 justify-center items-center py-4 cursor-pointer duration-100">
                    Send Message
                    <SendIcon />
                </button>

            </form>



        </div>
    )
}



ContactUs.layout = page => {
    const userType = page.props.auth.user?.user_type
    return userType === 'employer' ? <EmployerLayout children={page} /> : <Layout children={page} />

}

export default ContactUs
