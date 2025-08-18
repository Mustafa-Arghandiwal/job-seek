


//GPT generated function, not gonna take any credits for it
export function shortenFilename(filename, maxLength = 30) {
    if (filename.length <= maxLength) return filename;

    const extIndex = filename.lastIndexOf('.');
    const extension = extIndex !== -1 ? filename.slice(extIndex) : '';
    const base = filename.slice(0, extIndex !== -1 ? extIndex : filename.length);

    const visibleChars = maxLength - extension.length - 3;
    const start = base.slice(0, Math.ceil(visibleChars / 2));
    const end = base.slice(-Math.floor(visibleChars / 2));

    return `${start}...${end}${extension}`;
}
