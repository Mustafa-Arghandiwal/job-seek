import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"



export default function DashboardApplication(props) {

    const appDetails = props.appDetails
    const profilePic = appDetails?.profile_picture ? "/storage/" + appDetails.profile_picture : "/chess_pattern.png"
    const appliedAt = new Date(appDetails?.applied_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })



    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id, data: { type: "Application", details: appDetails } });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style} className={` border bg-white opacity-50 rounded-sm p-4 mt-3
                ${props.columnId === "all" ? "border-customGray-200" : "border-success-400"}`}>
                <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={profilePic} className=" w-full h-full object-cover" />
                    </div>
                    <div>
                        <span className="block text-customGray-900 text-sm font-medium">{appDetails?.full_name || "Not provided"}</span>
                        <span className="mt-1 block text-sm text-customGray-500">{appDetails?.title || "Title not provided"}</span>
                    </div>
                </div>
                <hr className="mt-4 text-customGray-200" />

                <ul className="text-customGray-600 list-disc ml-4 mt-4 text-sm space-y-1">
                    <li>City: {appDetails?.city || "Not provided"}</li>
                    <li>Education: {appDetails?.education_level || "Not provided"}</li>
                    <li>Applied on {appliedAt}</li>
                </ul>

                <button onClick={() => console.log('downloading...')} className="flex gap-1.5 items-center mt-4 cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.71875 8.59375L10 11.8741L13.2812 8.59375" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 3.125V11.8727" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.875 11.875V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-primary-500 font-medium text-sm">Download CV</span>
                </button>


            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`mx-auto   bg-white rounded-sm p-4 mt-3 cursor-grab border
            ${props.columnId === "all" ? "border-customGray-200" : "border-success-400"}`}
        // onMouseDown={(e) => e.currentTarget.style.cursor = "grabbing"} onMouseUp={(e) => e.currentTarget.style.cursor = "grab"}
        >
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={profilePic} className=" w-full h-full object-cover" />
                </div>
                <div>
                    <span className="block text-customGray-900 text-sm font-medium">{appDetails?.full_name || "Not provided"}</span>
                    <span className="mt-1 block text-sm text-customGray-500">{appDetails?.title || "Title not provided"}</span>
                </div>
            </div>
            <hr className="mt-4 text-customGray-200" />

            <ul className="text-customGray-600 list-disc ml-4 mt-4 text-sm space-y-1">
                <li>City: {appDetails?.city || "Not provided"}</li>
                <li>Education: {appDetails?.education_level || "Not provided"}</li>
                <li>Applied on {appliedAt}</li>
            </ul>

            <button onClick={() => console.log('downloading...')} className="flex gap-1.5 items-center mt-4 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.71875 8.59375L10 11.8741L13.2812 8.59375" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 3.125V11.8727" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.875 11.875V16.25C16.875 16.4158 16.8092 16.5747 16.6919 16.6919C16.5747 16.8092 16.4158 16.875 16.25 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.6919C3.19085 16.5747 3.125 16.4158 3.125 16.25V11.875" stroke="#0A65CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-primary-500 font-medium text-sm">Download CV</span>
            </button>

        </div>

    )
}
