import { useState, useEffect } from 'react'
import Modal from "../modal";
import './modal.sass'
import { getValidatedForm } from '../../utils/get-validated-form';

const ModalContent = ({heading, children, setCards, card, type, setOpen}) => {

    // Initializing controlled components
    let newCardData = {...card}
    if(!card){
        newCardData = {
            'user-name':'',
            'dob': '',
            'age': '',
            'food':'',
            'hobbies':'',
            'gender':''
        }
    }

    const [errors,setErrors] = useState({})
    const [userData, setUserData] = useState([])
    const [formData, setFormData] = useState(newCardData)

    // Modal close on outside click
    window.addEventListener('click', (e)=>{
        if(e.target.className === 'modal' && e.target.className !== 'modal--content') setOpen(false)
    })

    useEffect(()=>{
        const localData = localStorage.getItem('userData')

        if(localData){
            const parsedData = JSON.parse(localData)

            setUserData(parsedData)
        }
    },[])

    // Handling onChange events of form elements
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({...formData, [name]:value})
    }


    const handleSubmit = (e) =>{
        e.preventDefault()

        let newUserData = userData

        // Form Validation
        const validated = getValidatedForm({formData, setErrors})

        if(validated) {
            
            // If EDIT modal is open
            if(type !== 'edit')
            {
                let data = {
                    ...formData,
                    id: new Date().getTime()
                }

                // Add new user object locally
                newUserData.push(data)

                // Updating local state
                setUserData(newUserData)

                // Refresh lists on homepage
                setCards(newUserData)

                // Convert data into json
                const jsonData = JSON.stringify(newUserData)
    
                // Store the JSON string in local storage with a specific key
                localStorage.setItem('userData', jsonData);
            } 

            // if ADD modal is open
            else {
            let data = formData    

                // Getting updated array 
                const updatedUserData = userData.map((obj) => {
                    if (obj.id === data.id) {
                      return data; // Replace with the new object
                    } else {
                      return obj; // Keep the original object
                    }
                  });
    
                // Updating local array
                setUserData(updatedUserData)

                // Refresh lists on homepage
                setCards(updatedUserData)

                // Convert data into json
                const jsonData = JSON.stringify(updatedUserData)
    
                // Store the JSON string in local storage with a specific key
                localStorage.setItem('userData', jsonData);          
            }  

            // close the modal after submition
            setOpen(false)  
        }
    }

    return(
        <Modal>
            <div className="modal--content">
                <div className="modal--content-container">
                <div className="modal--heading">{heading}</div>
                <div className="modal--form">
                    <form onSubmit={handleSubmit} className={type==='view' ? 'unclickable' : undefined}>
                        <div>
                            <label>NAME</label>
                            <input
                                type="text"
                                name="user-name"
                                placeholder='John Doe'
                                value={formData?.['user-name']}
                                className="form--name"
                                onChange={handleChange}
                            />
                            {errors['user-name'] && <span className="error">{errors['user-name']}</span>}
                        </div>

                        <div>
                            <label>AGE</label>
                            <input
                                type="number"
                                name="age"
                                placeholder='23'
                                value={formData?.age}
                                className="form--age"
                                onChange={handleChange}
                            />
                            {errors.age && <span className="error">{errors.age}</span>}
                        </div>

                        <div>
                            <label>DOB</label>
                            <input
                                type="date"
                                name="dob"
                                placeholder='Select a date'
                                value={formData?.dob}
                                className="form--date"
                                onChange={handleChange}
                            />
                            {errors.dob && <span className="error">{errors.dob}</span>}
                        </div>

                        <div>
                            <label>GENDER</label>
                            <div className="modal--radio-buttons">
                            <label>
                             <input 
                                type="radio" 
                                name="gender" 
                                checked={formData?.gender === "male"}
                                onChange={handleChange}
                                value="male"
                                />
                                 Male
                            </label>
    
                            <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                checked={formData?.gender === "female"}
                                onChange={handleChange}
                                value="female"
                                />
                                 Female
                            </label>
                            </div>
                            {errors.gender && <span className="error">{errors.gender}</span>}
                        </div>

                        <div>
                            <label>FAVOURITE FOOD</label>
                            <select name="food" value={formData?.food} onChange={handleChange}>
                                <option value="">SELECT FOOD ITEM</option>
                                <option value="pizza">PIZZA</option>
                                <option value="burger">BURGER</option>
                                <option value="pasta">PASTA</option>
                            </select>
                            {errors.food && <span className="error">{errors.food}</span>}
                        </div>

                        <div>
                            <label>HOBBIES</label>
                            <textarea
                                name="hobbies"
                                value={formData?.hobbies}
                                onChange={handleChange}
                            />
                            {errors.hobbies && <span className="error">{errors.hobbies}</span>}
                        </div>

                        <div className="modal--buttons">
                        {children}
                      </div>                      
                    </form>
                </div>
                
                </div>

            </div>
        </Modal>
    )

}

export default ModalContent;