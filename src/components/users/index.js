import { useState, useEffect } from "react";
import { addUsers, listOfUsers } from "../../config/constants";
import Card from "../card";
import UserModal from "../forms/user-modal";
import './users.sass'
import Pagination from "../pagination";


const Users = () => {

    const [open, setOpen] = useState(false)
    const [cards, setCards] = useState([])
    const [renderCards, setRenderCards] = useState([])

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
                    <Card key={card.name} card={card} setCards={setCards} cards={cards}
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