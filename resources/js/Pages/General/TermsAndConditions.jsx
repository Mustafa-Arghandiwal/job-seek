import { useRef } from "react"
import EmployerLayout from "../../Layouts/EmployerLayout"
import Layout from "../../Layouts/Layout"


function TermsAndConditions() {

    const firstRef = useRef(null)
    const secondRef = useRef(null)
    const thirdRef = useRef(null)
    const fourthRef = useRef(null)

    const handleScroll = (theRef) => {
        theRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div className="relative pt-12 pb-20 px-4 sm:px-12 flex justify-center md:gap-24 lg:gap-32 ">
            <div className="max-w-[870px] text-customGray-600 leading-relaxed">
                <h2 ref={firstRef} className="text-customGray-900 font-medium text-3xl scroll-mt-36">
                    1. Terms & Conditions
                </h2>
                <p className="mt-6">
                    Praesent placerat dictum elementum. Nam pulvinar urna vel lectus maximus, eget faucibus turpis hendrerit. Sed iaculis molestie arcu, et accumsan nisi. Quisque molestie velit vitae ligula luctus bibendum. Duis sit amet eros mollis, viverra ipsum sed, convallis sapien. Donec justo erat, pulvinar vitae dui ut, finibus euismod enim. Donec velit tortor, mollis eu tortor euismod, gravida lacinia arcu.
                </p>
                <ul className="list-disc pl-6 mt-6">
                    <li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
                    <li>Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.</li>
                    <li>Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.</li>
                    <li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
                    <li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
                </ul>


                <h2 ref={secondRef} className="text-customGray-900 font-medium text-3xl mt-12 scroll-mt-36">2. Limitations</h2>
                <p className="mt-6">
                    Praesent placerat dictum elementum. Nam pulvinar urna vel lectus maximus, eget faucibus turpis hendrerit. Sed iaculis molestie arcu, et accumsan nisi. Quisque molestie velit vitae ligula luctus bibendum. Duis sit amet eros mollis, viverra ipsum sed, convallis sapien. Donec justo erat, pulvinar vitae dui ut, finibus euismod enim. Donec velit tortor, mollis eu tortor euismod, gravida lacinia arcu.
                </p>
                <ul className="list-disc pl-6 mt-6">
                    <li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
                    <li>Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.</li>
                    <li>Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.</li>
                    <li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
                    <li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
                </ul>

                <h2 ref={thirdRef} className="text-customGray-900 font-medium text-3xl mt-12 scroll-mt-36">3. Security</h2>
                <p className="mt-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare eu purus. Fusce eu rhoncus mi, quis ultrices lacus. Phasellus id pellentesque nulla. Cras erat nisi, mattis et efficitur et, iaculis a lacus. Fusce gravida augue quis leo facilisis.
                </p>


                <h2 ref={fourthRef} className="text-customGray-900 font-medium text-3xl mt-12 scroll-mt-36">4. Privacy Policy</h2>
                <p className="mt-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare eu purus. Fusce eu rhoncus mi, quis ultrices lacus. Phasellus id pellentesque nulla. Cras erat nisi, mattis et efficitur et, iaculis a lacus. Fusce gravida augue quis leo facilisis.
                </p>
                <ul className="list-disc pl-6 mt-6">
                    <li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
                    <li>Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.</li>
                    <li>Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.</li>
                    <li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
                    <li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
                </ul>
                <p className="mt-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare eu purus. Fusce eu rhoncus mi, quis ultrices lacus. Phasellus id pellentesque nulla. Cras erat nisi, mattis et efficitur et, iaculis a lacus. Fusce gravida augue quis leo facilisis.
                </p>

            </div>

            <div className="px-6 border-l border-customGray-200 text-sm h-fit sticky top-38 min-w-fit hidden md:block">
                <p className="text-customGray-500 ">Table of contents</p>
                <ol className="list-decimal ml-5 text-customGray-900 mt-3 ">
                    <button onClick={() => handleScroll(firstRef)} className="hover:underline block cursor-pointer"><li>Terms & Conditions</li></button>
                    <button onClick={() => handleScroll(secondRef)} className="hover:underline block cursor-pointer"><li>Limitations</li></button>
                    <button onClick={() => handleScroll(thirdRef)} className="hover:underline block cursor-pointer"><li>Security</li></button>
                    <button onClick={() => handleScroll(fourthRef)} className="hover:underline block cursor-pointer"><li>Privacy Policy</li></button>
                </ol>
            </div>
        </div>
    )
}

TermsAndConditions.layout = page => {
    const userType = page.props.auth.user?.user_type
    return userType === 'employer' ? <EmployerLayout children={page} /> : <Layout children={page} />

}

export default TermsAndConditions
