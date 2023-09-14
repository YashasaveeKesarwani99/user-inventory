// to be added - best way to add background colors inside the icon 

import { useEffect, useState } from 'react';
import UserModal from '../forms/user-modal';
import './card.sass';

const Card = ({card, setCards, cards}) =>{

    const [open, setOpen] = useState(false)
    const [type,setType] = useState("")
    const [iconClass, setIconClass] = useState("")


    const handleOpen = (type) =>{
        setType(type)
        setOpen(true)
    }

    useEffect(()=>{
        if(card.age < 25) setIconClass('green')
        else if (card.age > 25 && card.age < 50) setIconClass('pink')
        else setIconClass('yellow')
    },[card])


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
                {Object.keys(card).map(ele =>{
                    return(
                        ele !=='user-name' && ele !== 'id' &&
                        <div className='card--second-row'>
                        <div>{ele.toUpperCase()} :</div>
                        <div className='card--properties'>{card[ele]}</div>
                        </div>
                    )
                })}             
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