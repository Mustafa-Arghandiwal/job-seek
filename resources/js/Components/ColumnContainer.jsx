import { SortableContext, useSortable } from "@dnd-kit/sortable";
import DashboardApplication from "./DashboardApplication";


export default function ColumnContainer(props) {



    const {
        setNodeRef,
    } = useSortable({ id: props.id, data: { type: "Column" } });




    return (

        <div ref={setNodeRef}  className="rounded-md bg-customGray-100 px-4 py-4  min-w-56 max-w-[450px]
            touch-none min-h-screen border border-customGray-200 ">
            <h3  className="text-customGray-900 text-sm">
                {props.title} ({props.applications.length})
            </h3>
            <SortableContext items={props.applications.map(app => app.id)}>
                {props.applications.map(app => (
                    <DashboardApplication key={app.id} id={app.id} columnId={app.columnId} name={app.name} title={app.title} />
                ))}
            </SortableContext>
        </div>
    )
}
