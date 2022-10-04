import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';


export default function ResponsiveAppBar() {
 
  const info = JSON.parse(localStorage.getItem("userInfo"));
  let userInfo;
  if(info){
    userInfo = info.name
  }
function logout () {
  console.log("logout button clicked");
  localStorage.removeItem("userInfo");
  window.location.href = "/login";
}

  return (
    <div>
      <AppBar style={{color:"white",backgroundColor:"black"}}> 
        <Toolbar>
        <Link to="/">
        <Typography style={{fontSize:"40px"}}>StayEzy</Typography>
        </Link>

        <div className='navItem'>
        <div className='navLinks'>
        <Link to="/rooms">
        Rooms
        </Link>
        </div >
        {
          userInfo?(<>
            <div className="dropdown loginMenu">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {userInfo}
  </button>
  <ul class="dropdown-menu">
    <li><a className="dropdown-item" href="#">Bookings</a></li>
    <li><a className="dropdown-item"  onClick={logout}>Logout</a></li>
  </ul>
</div>          
          </>):(<>
            <div  className='navLinks'>
            <Link to="/register">
            Register
            </Link>
            </div>
          <div  className='navLinks'>
          <Link to="/login">
        
            Login
            </Link>
           </div>
          </>)
        }
        </div>
       
        </Toolbar>
      </AppBar>
    </div>
  )
}
