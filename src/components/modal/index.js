// higher order component for modals
import './modal.sass'

const Modal = ({children})=>{

    return(
        <div className="modal">
            {children}
        </div>
    )

}

export default Modal