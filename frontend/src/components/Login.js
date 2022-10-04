import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const[alert,setAlert] = useState(false)
    const [user,setUser] = useState(
        {
          email:"",password:""
        }
      )
      let name,value;
      function handel (e) {
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value})
      }
    

    function registerData() {
        const{email,password} = user;
      axios.post("http://localhost:8080/login",{
        email,password
      })
      .then (result=>{
        if(result.data.name==undefined) {
          setAlert(true);
        }
        else{
          localStorage.setItem("userInfo",JSON.stringify({name:result.data.name,id:result.data.id}));
          window.location.href="/"
        }
    })
      .catch(err=>console.log("api is not called due to ",err))
    }

  return (
    <div>
    <div className='row justify-content-center authScreen '>
  
      <div className='col-md-5 form '>
      {
        alert?(<div className="alert alert-danger" role="alert">
        invalid credentials
      </div>):""
      }
        <div >
          <h1>Login</h1>
          <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={handel} required aria-describedby="emailHelp" placeholder='Email'/>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={handel} name='password' required placeholder='Password'/>
          <button className='Registerbtn ' onClick={registerData}>Login</button>
        </div>

      </div>

    </div>
     
  </div>
  )
}
