module.exports = {
    dbSaveError:(err)=>{
       const errors = {email:'', password:''};

       //For Logging in with email not valid
       if(err.message == 'Email is in correct'){
        errors.email='Email is not correct'
       }

       //For Logging in with wrong password
       if(err.message == 'Paasword is incorrect'){
        errors.password="Password is wrong";
         }

       if(err.code == 11000){
         console.log(err.code)
    errors.email = 'This email is already registered';
    console.log(errors)
    return errors;
    }

      if(err.message.includes('users validation failed')){
          Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
          });
        }
        return errors
      }
}