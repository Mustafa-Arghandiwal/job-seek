
import Tab from "../../../Components/Tab"
import Tabs from "../../../Components/Tabs"
import tab_svgs from "./tab_svgs.jsx"
import EmployerLayout from "../../../Layouts/EmployerLayout.jsx"
import EmployerDashboardLayout from "../../../Layouts/EmployerDashboardLayout.jsx"
import CompanyInfoTabContent from "./SettingTabContents/CompanyInfoTabContent.jsx"
import FoundingInfoTabContent from "./SettingTabContents/FoundingInfoTabContent.jsx"


function Settings() {

    return (
        <div>
            <h1 className="font-medium text-2xl ">Settings</h1>

            <Tabs>
                <Tab title="Company Info" icon={tab_svgs.companyInfo}>
                    <CompanyInfoTabContent/>
                </Tab>


                <Tab title="Founding Info" icon={tab_svgs.foundingInfo}>
                    <FoundingInfoTabContent/>
                </Tab>

                {/* <Tab title="Social Links" icon={tab_svgs.socialMedia}> */}
                {/*     <SocialLinksTabContent /> */}
                {/* </Tab> */}

                {/* <Tab title="Account" icon={tab_svgs.account}> */}
                {/*     <AccountTabContent /> */}
                {/* </Tab> */}
            </Tabs>



        </div>
    )
}


Settings.layout = page => (
    <EmployerLayout>
        <EmployerDashboardLayout children={page} />
    </EmployerLayout>

)

export default Settings
