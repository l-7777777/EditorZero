class tabs {
    constructor(contentElem, tabElem) {
        this.contentElem = contentElem
        this.tabElem = tabElem
        this.tabContent = {}
    }

    add = (name, content, select) => {
        this.tabContent[name] = content
        const tabElem = document.createElement("tabElement")
        if (select) {
            if (this.selectedTab) {
                this.selectedTab.classList.remove("selected")
            }
            this.selectedTab = tabElem
            tabElem.classList.add("selected")
        }
        tabElem.style.left = ((Object.keys(this.tabContent).length - 1) * 200) + "px"
        tabElem.innerText = name
        tabElem.id = name
        this.tabElem.appendChild(tabElem)
    }

    currentTab = () => {
        if (!this.selectedTab) {
            return null;
        }
        return {
            close: () => {
                this.close(this.selectedTab.id)
            }
        }
    }

    close = (name) => {
        this.select(this.getNextTab(name))
        delete this.tabContent[name]
        document.querySelector(`[id='${name}']`).remove()
    }

    select = (name) => {
        if (this.selectedTab) {
            if (this.selectedTab) {
                this.selectedTab.classList.remove("selected")
            }
            this.selectedTab = document.querySelector(`[id='${name}']`)
            document.querySelector(`[id='${name}']`).classList.add("selected")
        }
    }

    getNextTab = (name) => {
        for (let i = 0; i < Object.keys(this.tabContent).length; i++) {
            if (Object.keys(this.tabContent)[i] === name) {
                return Object.keys(this.tabContent)[i - 1]
            }
        }
    }

    amount = () => {
        return Object.keys(this.tabContent).length
    }
}