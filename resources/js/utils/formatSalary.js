export function formatSalary(salaryType, fixedSalary, minSalary, maxSalary) {
    if (["Commission-based", "Negotiable"].includes(salaryType)) {
        return salaryType;
    }

    const frequencyMap = {
        Hourly: "/hour",
        Daily: "/day",
        Weekly: "/week",
        Monthly: "/month",
    };

    const salaryFrequency = frequencyMap[salaryType] || "";

    // helper: format to K if >= 1000
    const formatNumber = (num) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`;
        }
        return num.toString();
    };

    if (fixedSalary) {
        return `$${formatNumber(fixedSalary)}${salaryFrequency}`;
    }

    const min = minSalary ? formatNumber(minSalary) : null;
    const max = maxSalary ? formatNumber(maxSalary) : null;

    if (min && max) {
        return `$${min}–${max}${salaryFrequency}`;
    } else if (min) {
        return `$${min}${salaryFrequency}`;
    } else if (max) {
        return `$${max}${salaryFrequency}`;
    }

    return "";
}
