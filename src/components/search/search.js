import React, {Component} from 'react';
import 'react-input-range/lib/css/index.css';
import {DateRangePicker, SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Input from './input'
import './search.css';
import moment from 'moment';

class Search extends Component {

    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.startDataChange = this.startDataChange.bind(this);

        this.state = {
            searchedItems: [{code: "", name: ""}],
            singleFlightsItems: [],
            returnFlightsItems: [],
            originCity: '',
            destinationCity: '',
            startDate: moment(),
            endDate: moment(),
            returnTrip: true,
        }

        this.fetchCityData()
    }

    fetchCityData() {
        fetch("https://mcf-flight-search-engine.herokuapp.com/api/v1/cities")
            .then(response => response.json())
            .then(res => {
                let filterItems = res.data.result
                this.setState({
                    lists: res.data.result,
                    searchedItems: filterItems
                });
                console.log(this.state.searchedItems)

            })
            .catch(err => {
                console.log('No internet connection found. App is running in offline mode.');
                console.log(err);
                this.fetchCityData()
            });
    }

    fetchFlightsData() {
        let url = "https://mcf-flight-search-engine.herokuapp.com/api/v1/flights?origin=" + this.state.originCity +
            "&destination=" + this.state.destinationCity +
            "&departure-date=" + moment(this.state.startDate).format("YYYY-MM-DD")
        console.log(url)

        //single trip
        if (!this.state.returnTrip) {
            fetch(url)
                .then(response => response.json())
                .then(res => {
                    this.state.singleFlightsItems = res.data.result
                    this.state.returnFlightsItems = []

                    this.props.callback(this.state);
                    console.log(this.state.singleFlightsItems)
                })
                .catch(err => {
                    console.log(err)
                    this.fetchFlightsData()
                });
            return
        }
        //return trip
        let fullUrl = url + "&return-date=" + moment(this.state.endDate).format("YYYY-MM-DD")
        fetch(fullUrl)
            .then(response => response.json())
            .then(res => {
                this.state.returnFlightsItems = res.data.result
                this.state.singleFlightsItems = []
                this.props.callback(this.state);
                console.log(this.state.returnFlightsItems)
            })
            .catch(err => {
                console.log(err)
                this.fetchFlightsData()
            });
    }

    onSearchSubmit() {
        this.state.originCity = this.fromChild.state.inputValue
        this.state.destinationCity = this.toChild.state.inputValue
        console.log(this.state);
        this.fetchFlightsData()
    }

    tabSwitch(tab) {
        let returnTrip = (tab === 1) ? false : true;
        this.setState({returnTrip});
    }

    startDataChange(date) {
        this.state.startDate = moment(date)
        console.log(this.state);
    }

    render() {

        return (
            <div className="search__box">

                <ul className="tabs" style={{textAlign: 'center', width: 200}}>
                    <li className={"tab" + (this.state.returnTrip ? '' : ' active')}
                        onClick={() => this.tabSwitch(1)}>One way
                    </li>

                    <li className={"tab" + (this.state.returnTrip ? ' active' : '')}
                        onClick={() => this.tabSwitch(2)}>Return
                    </li>
                </ul>

                <div className="form" >
                    From:<br/>
                    <Input id='is1' listName='apts' onRef={(ref) => this.fromChild = ref}
                           searchedItems={this.state.searchedItems} />
                    <br/> <br/>
                    To:<br/>
                    <Input id='is2' listName='apts' onRef={(ref) => this.toChild = ref}
                           searchedItems={this.state.searchedItems}/>
                    <br/>
                    <br/>

                    {this.state.returnTrip ||
                        <div>
                            <label className="block">Departure date </label>
                            <div className="DateRangePicker">

                                <SingleDatePicker
                                    date={this.state.startDate} // momentPropTypes.momentObj or null
                                    onDateChange={this.startDataChange}  // PropTypes.func.isRequired
                                    focused={this.state.focused} // PropTypes.bool
                                    onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                                    id="your_unique_id" // PropTypes.string.isRequired,
                                />
                            </div>
                        </div>
                    }

                    {this.state.returnTrip &&
                        <div>
                            <label className="block">Departure date > Return date</label>
                            <div className="DateRangePicker">
                                <DateRangePicker
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                    onDatesChange={({
                                                        startDate,
                                                        endDate
                                                    }) => this.setState({
                                        startDate: moment(startDate),
                                        endDate: moment(endDate)
                                    })} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                                />
                            </div>
                        </div>
                    }

                    <button className="form__submit" type="submit" onClick={this.onSearchSubmit}>Search</button>
                </div>
            </div>
        )
    }
}

export default Search;