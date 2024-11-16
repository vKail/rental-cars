import { SideBar } from "@/core/layout/dashboard/side-bar"


const DashboardLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className="flex flex-wrap  ">
            <div className="flex  p-0">
                <SideBar/>
            </div>
            <div className="flex  p-4">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout

