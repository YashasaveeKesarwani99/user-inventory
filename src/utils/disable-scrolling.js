export const disableScrolling = (open) => {
    if(open) window.document.body.style.overflow = 'hidden'

    else {
        window.document.body.style.overflow = 'scroll'
    }
}
