import ModalContent from "../modal/modal-content";
import './user-modal.sass'

const AddUser = ({setOpen, type, setCards, card}) => {

    const handleClose = () => setOpen(false)

    const heading = `${type.toUpperCase()} USER`

    return(
        <ModalContent heading={heading} setCards={setCards} card={card} type={type} setOpen={setOpen}>
            {type==='view' ?
                <button onClick={handleClose} >CLOSE</button>
            :<>
                <button onClick={handleClose} className="cancel">CANCEL</button>
                <button type="submit" >SUBMIT</button>
            </>
        }
        </ModalContent>
    )
}

export default AddUser;