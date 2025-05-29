
// import Tab from "../../../Components/Tab"
// import Tabs from "../../../Components/Tabs"
// import tab_svgs from "./tab_svgs.jsx"
// import ProfileTabContent from "./SettingTabContents/ProfileTabContent.jsx"
// import PersonalTabContent from "./SettingTabContents/PersonalTabContent.jsx"
// import SocialLinksTabContent from "./SettingTabContents/SocialLinksTabContent.jsx"
// import AccountTabContent from "./SettingTabContents/AccountTabContent.jsx"
import EmployerLayout from "../../../Layouts/EmployerLayout.jsx"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout.jsx"


function Settings() {

    return (
        <div>
            <h1 className="font-medium text-2xl ">Settings</h1>

            {/* <Tabs> */}
            {/*     <Tab title="Profile" icon={tab_svgs.profile}> */}
            {/*         <ProfileTabContent/> */}
            {/*     </Tab> */}


            {/*     <Tab title="Personal" icon={tab_svgs.personal}> */}
            {/*         <PersonalTabContent /> */}
            {/*     </Tab> */}

            {/*     <Tab title="Social Links" icon={tab_svgs.socialLinks}> */}
            {/*         <SocialLinksTabContent /> */}
            {/*     </Tab> */}

            {/*     <Tab title="Account" icon={tab_svgs.account}> */}
            {/*         <AccountTabContent /> */}
            {/*     </Tab> */}
            {/* </Tabs> */}



        </div>
    )
}


Settings.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Settings
