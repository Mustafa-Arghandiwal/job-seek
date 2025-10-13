


export default function TextAvatarBanner({ name, className = "" }) {

    const colors = ["#94A3B8", "#F87171", "#FB923C", "#FBBF24", "#34D399", "#22D3EE", "#60A5FA", "#818CF8", "#A78BFA", "#F472B6"]

    const asciiSum = name.split('').map(char => char.charCodeAt(0)).reduce((acc, curr) => acc + curr, 0)
    const bgColor = colors[asciiSum % colors.length]

    return (
        <div style={{ backgroundColor: bgColor }} className={`font-bold grid place-items-center text-white duration-100 select-none ${className}`}>
            {name}
        </div>

    )
}
