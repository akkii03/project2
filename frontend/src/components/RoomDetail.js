import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';



export default function RoomDetail() {
  const [apiData,setApiData] = useState();
  const [loading,setLoading] = useState(true);
  const {id,toDate,fromDate} = useParams();
  const startDate = moment(toDate,"DD-MM-YYY");
  const endDate = moment(fromDate,"DD-MM-YYY");

const totalDays = moment.duration(endDate.diff(startDate)).asDays()+1;
  
let user = JSON.parse(localStorage.getItem("userInfo"));

 useEffect(()=>{
  setLoading(true)
  axios.get(`http://localhost:8080/book/${id}`)
  .then(result=>{
    console.log(result.data)
    setApiData(result.data[0])
    setLoading(false)
  })
  .catch(err=>console.log("api not called due to ",err))
 },[])



function Booking(token) {
  console.log(token)
  const {id} = JSON.parse(localStorage.getItem("userInfo"));
  const bookingInfo={
    room:apiData.name,
    roomid:apiData._id,
    userid:id,
    fromdate:toDate,
    todate:fromDate,
    totalamount:totalDays*apiData.rent,
    totaldays:totalDays,
    transactionid:"1234",
    token:token
  }

  axios.post("http://localhost:8080/booking",bookingInfo)
  .then(result=>console.log("result is ",result))
  .catch(err=>console.log("api is not called due to ",err));
}

  return (
    <>
    {
      loading?"loading...":(
        <div className='bookScreen'>
      <h1 style={{display:"flex",justifyContent:"center" ,color:"white"}} className='bookingTitle'>{apiData.name}</h1>
     <div className='sliderImg'>
     <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={apiData.images[0]} className="d-block w-100 imgslide" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={apiData.images[1]} className="d-block w-100 imgslide" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={apiData.images[0]} className="d-block w-100 imgslide "  alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
    </div>
     </div>
     <div className='bookSummary'>
     <div className='bookingDetails'>
     <h1 style={{display:"flex",justifyContent:"center" ,color:"white"}}>Booking Details</h1>
        <hr/>
        <b>
          <p>Name :{user.name}</p>
          <p>From Date :{toDate}</p>
          <p>To Date :{fromDate}</p>
          <p>Max Count :{apiData.maxcount}</p>
          
        </b>
     </div>

     <div className='amountDetails'>
     <h1 style={{display:"flex",justifyContent:"center" ,color:"white"}}>Amount Details</h1>
        <hr/>
        <b>
          <p>Total Days :{totalDays}</p>
          <p>Per Day :{apiData.rent}</p>
          <p>Total Amount :  ₹{totalDays*apiData.rent}/-</p>
        </b>
        
        <StripeCheckout
        amount={(totalDays*apiData.rent)*100}
        currency="INR"
        token={Booking}
        stripeKey="pk_test_51LpFctSDoeu8fmcmXBPpelT6kB0uxVg8H1SeYEh0XhN9IhW8YluLjbyPNKkTDLQYlsqltBjQykROfSQHp9P80vCk004eOGUOZz"
      >
        <button>PayNow</button>
      </StripeCheckout>
     </div>
     </div>
    </div>
      )
    }
    </>
  )
}
