export const getValidatedForm = ({formData, setErrors}) => {
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
