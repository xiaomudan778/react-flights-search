import React, { Component } from 'react';
import './flights.css';
import moment from 'moment';
import logo from '../../assets/images/flight_icon.png';


class FlightDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReturnTrip: false,
      bookingText: 'Book this flight'
    }
  }

  render() {    
      if(this.props.FlightData==undefined) {
          return (<span></span>)
      }

      let flight = []
      let returnTrip= [];

      if (!this.props.isReturnTrip) {
          flight = this.props.FlightData;
      } else {
          flight = this.props.FlightData.departingFlight;

          returnTrip = this.props.FlightData.returningFlight
          returnTrip.depart_time = moment(returnTrip.time.departure).format("hh:mm A");
          returnTrip.arrive_time = moment(returnTrip.time.arrival).format("hh:mm A");
          returnTrip.number = returnTrip.flightNo;
          returnTrip.from_code = returnTrip.from.code;
          returnTrip.to_code = returnTrip.to.code;
          returnTrip.currency = returnTrip.price.currency;
          returnTrip.price = returnTrip.price.amount;
      }

      flight.depart_time = moment(flight.time.departure).format("hh:mm A");
      flight.arrive_time = moment(flight.time.arrival).format("hh:mm A");
      flight.number = flight.flightNo;
      flight.from_code = flight.from.code;
      flight.to_code = flight.to.code;
      flight.currency = flight.price.currency;
      flight.price = flight.price.amount;

    return (
      <div className="flight" ref="flightRef">
        <div className="flight__details" >
                 <div className="flight__logo">
                     <img src={logo} className="header__logo" alt="logo" />
                 </div>
             <div className="flight__timings">
              <div className="flight__departure">
              <h3 className="flight__price">{flight.currency} {flight.price}</h3>
              <p className="flight__number">{flight.number.toUpperCase()}</p>
              <p className="flight__codes">{flight.from_code} &raquo; {flight.to_code}</p>
              <p className="flight__depart__time">Depart: {flight.depart_time}</p>
              <p className="flight__arrive__time">Arrive: {flight.arrive_time}</p>
            </div>
                 {
                     this.props.isReturnTrip &&
                     <div className="flight__logo">
                         <img src={logo} className="header__logo" alt="logo" />
                     </div>
                 }
                 {
               this.props.isReturnTrip &&

              <div className="flight__return">
                <h3 className="flight__number">{returnTrip.currency} {returnTrip.price}</h3>
                <p className="flight__number">{returnTrip.number.toUpperCase()}</p>
                <p className="flight__codes">{returnTrip.from_code} &raquo; {returnTrip.to_code}</p>
                <p className="flight__depart__time">Depart: {returnTrip.depart_time}</p>
                <p className="flight__arrive__time">Arrive: {returnTrip.arrive_time}</p>
              </div>
            }          
          </div>
        </div>
      </div>    
      );

 }
}

export default FlightDetails;