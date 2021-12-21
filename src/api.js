export const getShowByKey = key => {
    return fetch(`https://api.tvmaze.com/search/shows?q=${key}`)
    .then(resp => resp.json())
}