import React, { useState } from 'react';
import axios from 'axios';



export default function Register() {
  const[alert,setAlert] = useState(false)
  const [user,setUser] = useState(
    {
      name:"",email:"",password:"",cpassword:""
    }
  )
  let name,value;
  function handel (e) {
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value})
    
  }

  function registerData() {
    if(user.password==user.cpassword) {
      setAlert(false)
      const{name,email,password,cpassword} = user;
      axios.post("http://localhost:8080/register",{
        name,email,password,cpassword
      })
      .then(result=>{console.log("result is ",result)
        window.location.href = "/login"
      })
      .catch(err=>console.log("api is not called due to ",err))
    }
    else{
      setAlert(true)
      console.log("password not match")
    
 
    }
  }
  
  return (
 
  <div>
    <div className='row justify-content-center authScreen '>
   
      <div className='col-md-5 form '>
      {
        alert?(<div class="alert alert-danger" role="alert">
        Password and Confirm password must be same
      </div>):""
      }
        <div >
          <h1>Register</h1>
          <input type="text" className="form-control" id="name" name='name' onChange={handel} placeholder="Name" required/>
          <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={handel} required aria-describedby="emailHelp" placeholder='Email'/>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={handel} name='password' required placeholder='Password'/>
          <input type="password" className="form-control" id="cpassword" onChange={handel} name="cpassword" required placeholder='Confirm-Passowrd'/>
          <button className='Registerbtn ' onClick={registerData}>Register</button>
        </div>

      </div>

    </div>
     
  </div>
  )
}
