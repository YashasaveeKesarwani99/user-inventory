import './card.sass';
import { useEffect, useState } from 'react';
import UserModal from '../forms/user-modal';
import { getIconClasses } from '../../utils/get-icon-classes';
import { disableScrolling } from '../../utils/disable-scrolling';

const Card = ({card, setCards, cards}) =>{

    const [open, setOpen] = useState(false)
    const [type,setType] = useState("")
    const [iconClass, setIconClass] = useState("")


    const handleOpen = (type) =>{
        setType(type)
        setOpen(true)
    }

    // Get icon class according to the age
    useEffect(()=>{
        getIconClasses({setIconClass, card})
    },[card])

    // Disable scrolling when modal is on display
    useEffect(()=>{
        disableScrolling(open)
    },[open])


    // Delete card functionality
    const deleteHandler = () => {
        const updatedCards = cards.filter((singleCard)=> singleCard.id !== card.id)
        setCards(updatedCards)

        const jsonData = JSON.stringify(updatedCards)
        localStorage.setItem('userData', jsonData)
    }

    return(
        <>
       {open && type && <UserModal type={type} setOpen={setOpen} card={card} setCards={setCards}/>}
        <div className='card--container'>
            <div className='card--default-row'>
                <div className='card--name'>{card['user-name'].toUpperCase()}</div>
                <div className={`card--icon ${iconClass}`}></div>  
            </div>
            <div className='card--second-row-container'>
                {Object.keys(card).sort().map(ele =>{
                    return(
                        ele !=='user-name' && ele !== 'id' &&
                        <div className='card--second-row' key={ele}>
                        <div>{ele.toUpperCase()} :</div>
                        <div className='card--properties'>{card[ele]}</div>
                        </div>
                    )
                })}  
            </div>           
            <div className='card--third-row'>
                <button onClick={deleteHandler}>DELETE</button>
                <button onClick={()=>handleOpen("view")}>VIEW</button>
                <button onClick={()=>handleOpen("edit")}>EDIT</button>
            </div>
        </div>
        </>
    )
}

export default Card;