const handleError = (err) => {
  console.log(err.message);
  let errors = {email:'',password:'',username:''};
  if (err.message === "email") errors.email = "Can not find this email";
  if(err.message ==='User'){
    errors['username']=  'Unknown username';
    return errors;
  }
  else if(err.message === 'Password'){
    errors['password']=  'Wrong password';
    return errors;
  }
  if(err?.code === 11000){
      if(Object.keys(err.keyValue)[0] === 'email'){
          errors['email'] = "This Email is already in use";
      }
      else{
          errors['user'] = "This User is already in use";
      }
  }
  if (err.message.includes("account validation failed")){
      Object.values(err.errors).forEach(({properties})=>{
          errors[properties.path] = properties.message;
      })
  }
  return errors;
}
module.exports = handleError;