import './users.sass'
import Card from "../card";
import Pagination from "../pagination";
import { useState, useEffect } from "react";
import UserModal from "../forms/user-modal";
import { addUsers, listOfUsers } from "../../config/constants";
import { disableScrolling } from "../../utils/disable-scrolling";


const Users = () => {

    const [open, setOpen] = useState(false)
    const [cards, setCards] = useState([])
    const [renderCards, setRenderCards] = useState([])

    // Adding/Initializing local state with data in local storage
    useEffect(()=>{
            const localData = localStorage.getItem('userData')

            if(localData){
                const parsedData = JSON.parse(localData)

                setCards(parsedData)
            }
    },[])

    const clickHandler = () =>{
        setOpen(true)
    }

    // Disable scroll when modal is in display
    useEffect(()=>{
        disableScrolling(open)
    },[open])

    return(
        <>
        {open && <UserModal type="add" setOpen={setOpen} setCards={setCards}/>}
        <div>
            <div className="users--header">
                <div className="users--list-of-users">{listOfUsers?.toUpperCase()}</div>
                <div>
                    <button className="users--add-users" onClick={clickHandler}>{addUsers?.toUpperCase()}</button>
                </div>
            </div>
            <div className="cards">
            {renderCards?.map(card =>{
                return (
                    <Card key={card.id} card={card} setCards={setCards} cards={cards}
                    />                    
                )
            })}
            </div>
            <Pagination cards={cards} setRenderCards={setRenderCards}/>
        </div>
        </>
    )

}


export default Users;