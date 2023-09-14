import './user-modal.sass'
import ModalContent from "../modal/modal-content";


const AddUser = ({setOpen, type, setCards, card}) => {

    const handleClose = () => setOpen(false)

    const heading = `${type.toUpperCase()} USER`

    return(
        <ModalContent heading={heading} setCards={setCards} card={card} type={type} setOpen={setOpen}>
            {type==='view' ?
                <button onClick={handleClose} type="button">CLOSE</button>
            :<>
                <button onClick={handleClose} className="cancel" type="button">CANCEL</button>
                <button type="submit" >SUBMIT</button>
            </>
        }
        </ModalContent>
    )
}

export default AddUser;