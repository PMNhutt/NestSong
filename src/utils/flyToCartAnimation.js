export const flyToCartAnimation = (e) => {
    const cardIconParentElement = document.getElementById('cartIcon')
    const parentElement = e?.target?.closest('.productCardWrapperJs') //get parent div by class productCardWrapperJs
    const imgElement = parentElement?.getElementsByClassName('productImageJS')?.[0]
    let imgElementClone = document.createElement('img')
    imgElementClone.src = imgElement?.style?.backgroundImage.slice(4, -1).replace(/"/g, "")
    imgElementClone?.classList.add('imageProductFly')
    if (document?.getElementsByClassName('shake')?.[0]) {
        cardIconParentElement.classList.remove('shake')
    }
    if (imgElementClone) {
        imgElementClone.style.position = 'fixed'
        imgElementClone.style.top = '20vh'
        imgElementClone.style.left = 'calc((100vw - calc(60vh * 3 / 4)) / 2)'
        imgElementClone.style.opacity = '1'
        imgElementClone.style.zIndex = '1000'
        imgElementClone.style.width = 'calc(60vh * 3 / 4)'
        imgElementClone.style.height = '60vh'
        imgElementClone.style.transition = 'all 0.35s ease-in-out'
        document.body?.appendChild(imgElementClone)

        if (cardIconParentElement) {
            const goToX = window.innerWidth > 769 ? (((window.innerWidth - 1320) / 2) + cardIconParentElement?.offsetLeft) : (cardIconParentElement?.offsetLeft)
            const goToY = cardIconParentElement?.offsetTop

            setTimeout(function () {
                imgElementClone.style.top = goToY + ((cardIconParentElement.offsetHeight - 24) / 2) +'px'
                imgElementClone.style.left = goToX + ((cardIconParentElement.offsetWidth - 24) / 2) + 'px'
                imgElementClone.style.opacity = '0.4'
                imgElementClone.style.width = '19px'
                imgElementClone.style.height = 'auto'
                setTimeout(function () {
                    cardIconParentElement.classList.add('shake')
                    imgElementClone.remove()
                }, 500)
            }, 100)
        }
    }
}
