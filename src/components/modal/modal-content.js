import { useState, useEffect } from 'react'
import Modal from "../modal";
import './modal.sass'

const ModalContent = ({heading, children, setCards, card, type, setOpen}) => {
    const newCardData = {...card}

    const [errors,setErrors] = useState({})
    const [userData, setUserData] = useState([])
    const [formData, setFormData] = useState(newCardData)

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({...formData, [name]:value})
    }


    const handleSubmit = (e) =>{
        e.preventDefault()

        let newUserData = userData

        const validated = validateForm(formData)

        if(validated) {
            if(type !== 'edit')
            {
                let data = {
                    ...formData,
                    id: new Date().getTime()
                }

                newUserData.push(data)

                setUserData(newUserData)

                //refresh lists on homepage
                setCards(newUserData)

                // Convert data into json
                const jsonData = JSON.stringify(newUserData)
    
                // Store the JSON string in local storage with a specific key
                localStorage.setItem('userData', jsonData);
            } else {
            let data = formData    

                //getting updated array 
                const updatedUserData = userData.map((obj) => {
                    if (obj.id === data.id) {
                      return data; // Replace with the new object
                    } else {
                      return obj; // Keep the original object
                    }
                  });
    
                setUserData(updatedUserData)

                //refresh lists on homepage
                setCards(updatedUserData)

                // Convert data into json
                const jsonData = JSON.stringify(newUserData)
    
                // Store the JSON string in local storage with a specific key
                localStorage.setItem('userData', jsonData);          
            }  
            // close the modal after submition
            setOpen(false)  
        }
    }


// put this inside utils folder [todo]
    const validateForm = (formData) =>{
        let errors = {}

        if(!formData['user-name']) errors['user-name'] = 'Name is required!' 
        
        if(!formData.age) errors.age = 'Age is required!'

        if(!formData.dob) errors.dob = 'Date of Birth is required!'

        if(!formData.food) errors.food = 'Select food item!'

        if(!formData.hobbies) errors.hobbies = 'Add your hobby!'

        if(!formData.gender) errors.gender = 'Select your gender!'

        if(formData?.hobbies?.length > 150) errors.hobbies = 'Not more than 150 characters'


        setErrors(errors)
        if(!Object.keys(errors).length){
            return true
        } 
        return false
    }



    return(
        <Modal>
            <div className="modal--content">
                <div className="modal--content-container">
                <div className="modal--heading">{heading}</div>
                <div className="modal--form">
                    <form onSubmit={handleSubmit} className={type==='view' && 'unclickable'}>
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
                            <select name="food" selected={formData?.food} onChange={handleChange}>
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