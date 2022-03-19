import React, {Component} from 'react';
import moment from 'moment';
import FlightDetails from './flight-details';
import './flights.css';

class FlightsResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isReturnTrip: true,
            flightsItems: [{}],
            searchData: '',
            returnFlight: '',
        };
        this.checkFlightAvailability = this.checkFlightAvailability.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({searchData: nextProps.data});
    }


    checkFlightAvailability(flight) {
        let result = this.state.searchData;

        if ((result.originCity === flight.from_code) && (result.destinationCity === flight.to_code)) {
            if (result.returnTrip) {
                if ((moment(result.startDate._d).format("YYYY-MM-DD") === moment(flight.arrive_date).format("YYYY-MM-DD"))) {
                    flight.returnTrip = true;
                    flight.endDate = result.endDate;
                    return flight
                }
            } else {
                if ((moment(result.date._d).format("YYYY-MM-DD") === moment(flight.arrive_date).format("YYYY-MM-DD"))) {
                    flight.returnTrip = false;
                    return flight
                }
            }
        }

    }

    render() {

        var flightsAvailable = [];
        if (this.state.searchData === '') {
            return (
                <section className="flights">
                    <div className="flight__container">

                        <h2>Available Flights:</h2>
                        <span>  </span>
                    </div>
                </section>
            )
        } else if (!this.state.searchData.returnTrip) {
            flightsAvailable = this.state.searchData.singleFlightsItems.map((flight) => {
                return <FlightDetails FlightData={flight} isReturnTrip={false}></FlightDetails>
            });
        } else {
            flightsAvailable = this.state.searchData.returnFlightsItems.map((flight) => {
                return <FlightDetails FlightData={flight} isReturnTrip={true}></FlightDetails>
            });
        }

        let flightDetails = this.state.searchData;
        if (flightDetails) {
            flightDetails = {
                depart_day: moment(flightDetails.startDate).format("YYYY-MM-DD"),
                return_day: moment(flightDetails.endDate).format("YYYY-MM-DD"),
                date: moment(flightDetails.date).format("YYYY-MM-DD")
            };
        }

        return (
            <section className="flights">
                <div className="flight__container">

                    <h2>Available Flights:</h2>
                    <h2>
                        <span>  </span>
                    </h2>
                    <h3>
                        {flightsAvailable.length == 0 &&
                            <span> No flights found, choose another day. </span>
                        }
                    </h3>
                    {flightsAvailable}
                </div>
            </section>
        );
    }
}

export default FlightsResult;