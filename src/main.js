import { mapDomElements } from "./DOMconnection.js"
import { getShowByKey } from "./api.js"
import { createDomElem } from "./DOMconnection.js"
import { getShowById } from "./api.js"


class TvApp{
    constructor(){
        this.viewElem = {}
        this.selectedName = "harry"
        this.initialize()
    }

    initialize = () => {
        this.connectDomElem()
        this.setupListeners()
        this.fetchAndDisplayShows()
    }

    connectDomElem = () => {
        const listOfValues = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
        this.viewElem = mapDomElements(listOfValues, 'id')
    }

    setupListeners = () => {
        this.viewElem.showSearchView.addEventListener("keydown", this.handleSubmit)
        this.viewElem.searchButton.addEventListener("click", this.handleSubmit)
    }

//Input submit function
    handleSubmit = (event) => {
        if(event.key === "Enter" || event.type === "click"){
            this. selectedName = this.viewElem.showSearch.value
            this.fetchAndDisplayShows()
        }
    }

//Function of api server connection by key word filter
    fetchAndDisplayShows = () => {
        getShowByKey(this.selectedName)
        .then(shows => {
            this.renderCard(shows)
        })
    }

//Open card with details function
    openShowWithDetails = (event) => {
        const id = event.target.dataset.showId

        getShowById(id).then(show => {
            const card = this.displayShowCard(show, true)
            this.viewElem.showPreview.appendChild(card)
            this.viewElem.showsWrapper.classList.add('show-wrapper__hidden')
        })
    }

//Close card with details function
    closeShowWithDetails = (event) => {
        const id = event.target.dataset.showId
        const closeBtn = document.querySelector(`[id="showPreview"] [data-show-id="${id}"]`)
        closeBtn.removeEventListener("click", this.closeShowWithDetails)
        this.viewElem.showPreview.innerHTML = ""
        this.viewElem.showsWrapper.classList.remove('show-wrapper__hidden')
    }

//Function of creating card for each show
    renderCard = (shows) => {
        Array.from(document.querySelectorAll('[data-show-id]')).forEach(btn => btn.removeEventListener("click", this.openShowWithDetails)
        )

        this.viewElem.showsWrapper.innerHTML = ""
        this.viewElem.showPreview.innerHTML = ""
        this.viewElem.showsWrapper.classList.remove('show-wrapper__hidden')

        for(const {show} of shows){
            const card = this.displayShowCard(show)
            this.viewElem.showsWrapper.appendChild(card)
        }
    }

//Card elements display function
    displayShowCard = (show, isDetailed) => {
        const divCard = createDomElem('div', 'card', null, null)
        const divCardBody = createDomElem('div', 'card-body', null, null)
        const h5 = createDomElem('h5', 'card-title', show.name, null)
        const btn = createDomElem('button', 'btn btn-primary', "Show details")
        let img, p

        const regex = /[^<a-z>/]\w*/g

        if(show.image){
            if(isDetailed){
                img = createDomElem('img', 'card-img-top', null, show.image.original)
            }
            else{
                img = createDomElem('img', 'card-img-top', null, show.image.medium)
            }
        }
        else{
            img = createDomElem('img', 'card-img-top', null, 'http://via.placeholder.com/210x95')
        }

        if(show.summary){
            if(isDetailed){
                p = createDomElem('p', 'card-text', show.summary.match(regex).join(""), null)
            }
            else{
                p = createDomElem('p', 'card-text', `${show.summary.match(regex).join("").slice(0, 80)}...`, null)
            }
        }
        else{
            p = createDomElem('p', 'card-text', "There is no text jet", null)
        }

        btn.dataset.showId = show.id

        if(isDetailed){
            btn.addEventListener("click", this.closeShowWithDetails)
            btn.innerText = "Close details"
        }
        else{
            btn.addEventListener("click", this.openShowWithDetails)
        }

        divCard.appendChild(divCardBody)
        divCardBody.appendChild(img)
        divCardBody.appendChild(h5)
        divCardBody.appendChild(p)
        divCardBody.appendChild(btn)

        return divCard
    }

}

document.addEventListener("DOMContentLoaded", new TvApp())