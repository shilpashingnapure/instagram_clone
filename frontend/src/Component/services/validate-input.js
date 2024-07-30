// validate if user filled correct inputs
export const validate = (inputs) => {
    const newErrors = {};
    for(let [key , value ] of Object.entries(inputs)){
        if(!value){
            newErrors[key] = `${key} is required`;
        }
    }

    const isValidate = Object.keys(newErrors).length === 0;
    return { isValidate , newErrors};
}