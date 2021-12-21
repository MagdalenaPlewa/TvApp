const _getElemByAtt = (value, attribute) => {
    return document.querySelector(`[${attribute}="${value}"]`)
}

export const mapDomElements = (values, attribute) => {
    const _viewElem = {}
    for(const value of values){
        _viewElem[value] = _getElemByAtt(value, attribute)
    }

    return _viewElem
}

export const createDomElem = (tagName, className, innerText, src) => {
    const tag = document.createElement(tagName)
    console.log(tag)
    tag.classList = className

    if(innerText) tag.innerText = innerText
    // if(src) tag.src = src

    return tag
}