function highlight(lang, text) {
    if (lang === "md/wysiwyg") {
        const italics = text.match(/(?<!\*)\*[^*]+\*(?!\*)/g)
        if (italics) {
            for (let i = 0; i < italics.length; i++) {
                text = text.replace(italics[i], `<em>${italics[i]}</em>`)
            }
        }
        const bold = text.match(/(?<!\*)\*\*[^*]+\*\*(?!\*)/g)
        if (bold) {
            for (let i = 0; i < bold.length; i++) {
                text = text.replace(bold[i], `<strong>${bold[i]}</strong>`)
            }
        }
        const boldItalics = text.match(/\*\*\*[^*]+\*\*\*/g)
        if (boldItalics) {
            for (let i = 0; i < boldItalics.length; i++) {
                text = text.replace(boldItalics[i], `<strong><em>${boldItalics[i]}</em></strong>`)
            }
        }
        const headings = text.match(/#+\s.+/g)
        if (headings) {
            for (let i = 0; i < headings.length; i++) {
                text = text.replace(headings[i], `<h${headings[i].match(/#+/)[0].split("").length}>${headings[i]}</h${headings[i].match(/#+/)[0].split("").length}>`)
            }
        }
    }
    return text.replaceAll("\n", "<br>").replaceAll(" ", "&nbsp;")
}