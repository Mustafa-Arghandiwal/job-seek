
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

  if (fixedSalary) {
    return `$${fixedSalary.toLocaleString()}${salaryFrequency}`;
  }

  const min = minSalary?.toLocaleString();
  const max = maxSalary?.toLocaleString();

  return `$${min}–${max}${salaryFrequency}`;
}
