export const disableScrolling = (open) => {
    if(open)
    {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        window.document.body.style.overflow = 'hidden'
    } 

    else {
        window.document.body.style.overflow = 'scroll'
    }
}
