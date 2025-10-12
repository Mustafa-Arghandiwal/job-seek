


export default function ToolTip({className, text}) {

    return (
        <div className={`${className} absolute left-1/2 -translate-x-1/2`}>
            {text}
            <div className="absolute w-2 h-2 bg-inherit -bottom-1 left-1/2 -translate-x-1/2 rotate-45"></div>
        </div>
    )
}
