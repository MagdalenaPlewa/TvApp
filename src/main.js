import { mapDomElements } from "./DOMconnection.js"
import { getShowByKey } from "./api.js"
import { createDomElem } from "./DOMconnection.js"

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
        console.log(this.viewElem)
    }

    setupListeners = () => {
        this.viewElem.showSearchView.addEventListener("keydown", this.handleSubmit)
        this.viewElem.searchButton.addEventListener("click", this.handleSubmit)

    }

    handleSubmit = (event) => {
        if(event.key === "Enter" || event.type === "click"){
            this. selectedName = this.viewElem.showSearch.value

            this.fetchAndDisplayShows()
        }
    }

    fetchAndDisplayShows = () => {
        getShowByKey(this.selectedName).then(shows => {
            this.renderCard(shows)
        })
    }

    renderCard = (shows) => {

        for(const {show} of shows){
            this.displayShowCard(show)
            console.log(show)
        }
    }

//     <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>

    displayShowCard = (show) => {
        const divCard = createDomElem('div', 'card', null, null)
        const divCardBody = createDomElem('div', 'card-body', null, null)
        const h5 = createDomElem('h5', 'card-title', show.name, null)
        const p = createDomElem('p', 'card-text', show.summary, null)

        this.viewElem.showsWrapper.appendChild(divCard)
        divCard.appendChild(divCardBody)
        divCardBody.appendChild(h5)
        divCardBody.appendChild(p)

        
    }

}

document.addEventListener("DOMContentLoaded", new TvApp())