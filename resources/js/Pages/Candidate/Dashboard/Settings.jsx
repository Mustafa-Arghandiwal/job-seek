import { useState } from "react"
import CandidateDashboardLayout from "../../../Layouts/CandidateDashboardLayout"
import Layout from "../../../Layouts/Layout"
import Tab from "../../../Components/Tab"
import Tabs from "../../../Components/Tabs"
import Select from "../../../Components/Select"
import { router, useForm, usePage } from "@inertiajs/react"
import tab_svgs from "./tab_svgs.jsx"
import ProfileTabContent from "./SettingTabContents/ProfileTabContent.jsx"



function Settings() {



    return (
        <div>
            <h1 className="font-medium text-2xl ">Settings</h1>

            <Tabs>
                <Tab title="Profile" icon={tab_svgs.profile}>
                    <ProfileTabContent/>
                </Tab>


                <Tab title="Personal" icon={tab_svgs.personal}><div>Profile Tab Contents</div></Tab>
                <Tab title="Social Links" icon={tab_svgs.socialLinks}><div>Social Links Tab Contents</div></Tab>
                <Tab title="Account" icon={tab_svgs.account}><div>Account Tab Contents</div></Tab>
            </Tabs>



        </div>
    )
}


Settings.layout = page => (
    <Layout>
        <CandidateDashboardLayout children={page} />
    </Layout>

)

export default Settings
