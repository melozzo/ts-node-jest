
const   validatePhone = ( phone:string )=>{
    let valid:boolean =/^[2-9]\d{2}-\d{3}-\d{4}$/.test(phone);
    
    return valid;
}

export default validatePhone
