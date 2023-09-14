export const getIconClasses = ({setIconClass, card}) => {

    if(card.age < 25) setIconClass('green')
    else if (card.age > 25 && card.age < 50) setIconClass('pink')
    else setIconClass('yellow')
    
}
