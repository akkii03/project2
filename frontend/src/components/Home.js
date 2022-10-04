import React, { useEffect, useState } from 'react';


export default function Home() {
  const [loginUser,setLoginUser] = useState();
  useEffect(()=>{
    const info = JSON.parse(localStorage.getItem("userInfo"))
    setLoginUser(info);
  },[])
  return (
   <div className='homeScrn'>
    <h1 className='hometext'>Home screen</h1>
    {loginUser?(<h1 className='hometext'>welcome back {loginUser.name}</h1>):""}
    
   </div>
  )
}
