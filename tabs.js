class tabs {
    constructor(contentElem, tabElem, win) {
        this.contentElem = contentElem
        this.tabElem = tabElem
        this.tabContent = {}
        this.win = win
    }

    add = (name, content, select) => {
        this.tabContent[name] = content
        const tabElem = document.createElement("tabElement")
        tabElem.style.left = ((Object.keys(this.tabContent).length - 1) * 200) + "px"
        tabElem.innerText = name
        tabElem.id = name
        tabElem.onclick = () => {
            this.select(name)
        }
        const tabCloseButton = document.createElement("tabCloseButton")
        tabCloseButton.onclick = () => {
            setTimeout(() => this.close(name), 100)
        }
        const tabCloseButtonImage = document.createElement("img")
        tabCloseButtonImage.src = "close.png"
        tabCloseButton.appendChild(tabCloseButtonImage)
        tabElem.appendChild(tabCloseButton)
        this.tabElem.appendChild(tabElem)
        if (select) {
            this.select(name)
        }
    }

    currentTab = () => {
        if (!this.selectedTab) {
            return null;
        }
        return {
            close: () => {
                this.close(this.selectedTab.id)
            },
            name: this.selectedTab.id
        }
    }

    close = (name) => {
        if (this.amount() === 1) {
            this.win.close()
        }
        this.select(this.getNextTab(name))
        delete this.tabContent[name]
        document.querySelector(`[id='${name}']`).remove()
    }

    select = (name) => {
        if (this.selectedTab) {
            this.selectedTab.classList.remove("selected")
        }
        this.selectedTab = document.querySelector(`[id='${name}']`)
        console.log(`[id='${name}']`)
        this.selectedTab.classList.add("selected")
        this.contentElem.value = this.tabContent[name]
        numberLines(0)
        updateHighlighting()
        getType()
    }

    getNextTab = (name) => {
        for (let i = 0; i < Object.keys(this.tabContent).length; i++) {
            if (Object.keys(this.tabContent)[i] === name) {
                if (i !== 0) {
                    return Object.keys(this.tabContent)[i - 1]
                } else {
                    for (let j = 0; j < Object.keys(this.tabContent).length; j++) {
                        document.querySelector(`[id='${Object.keys(this.tabContent)[j]}']`).style.left = (Number.parseInt(document.querySelector(`[id='${Object.keys(this.tabContent)[j]}']`).style.left) - 200) + "px"
                    }
                    return Object.keys(this.tabContent)[i + 1]
                }
            }
        }
    }

    amount = () => {
        return Object.keys(this.tabContent).length
    }

    setContent = (name, content) => {
        this.tabContent[name] = content
    }
}