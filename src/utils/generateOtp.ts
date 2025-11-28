import crypto from 'crypto';

const generateOtp = (lenght)=>{
    let otp = '';

    for(let i=0;i < lenght;i++){
      const  digit = crypto.randomInt(10);
      otp += digit.toString(); 
    }
    
    return otp;
}

export default generateOtp;