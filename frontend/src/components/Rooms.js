import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
const { RangePicker } = DatePicker;


export default function Rooms() {
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/allrooms")
      .then((result) => {
        setApiData(result.data);
        setDuplicateRooms(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("api is not called due to ", err);
        window.location.href = "*";
      });
  }, []);

  function filterByDates(dates) {
    setToDate(moment(dates[0]).format("DD-MM-YYYY"));
    setFromDate(moment(dates[1]).format("DD-MM-YYYY"));
    let tempRooms = [];
    let available = false;
    //traverse in the rooms database

    for (let room of duplicateRooms) {
      if (room.currentbooking.length > 0) {
        for (let booking of room.currentbooking) {
          // 1.check dates are b/w them
          if (
            !moment(
              moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) &&
            !moment(
              moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            )
          ) {
            // then dates not equal to selected dates
            if (
              moment(dates[0]).format("DD-MM-YYYY") != booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") != booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") != booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") != booking.todate
            ) {
              available = true;
            }
          }
        }
      }
      if ((available = true || room.currentbooking.length == 0)) {
        tempRooms.push(room);
      }
      console.log("api room is update ")
      setApiData(tempRooms);
    }
  }

  return (
    <div>
      <div className="filter">
        <div className="date">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDates} />
        </div>
      </div>
      <div className="parent">
        {loading ? (
          <div className="loading">
            <CircularProgress
              style={{
                width: "300px",
                height: "50px",
                paddingLeft: "50px",
                color: "green",
                fontSize: "300px",
              }}
              color="green"
            />
          </div>
        ) : (
          apiData.map((item) => {
            return (
              <div className="card">
                <img src={item.images[0]} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h2 className="card-title">{apiData[0].name}</h2>
                  <h4>Max Count:{item.maxcount}</h4>
                  <h4>Phone:{item.phone}</h4>
                  <h4>type:{item.roomtype}</h4>
                  <h4>
                    Price:
                    <span className="badge bg-secondary price">
                      {apiData[0].rent}₹
                    </span>
                  </h4>
                  {fromDate && toDate ? (
                    <Link to={`/book/${item._id}/${toDate}/${fromDate}`}>
                      <button className="view">View Details</button>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
