import React, {Component} from 'react';
import './input.css';


class Input extends Component {

    constructor(props) {
        super(props);

        this.toggleContainer = React.createRef();
        this.state = {
            searchedItems: props.searchedItems,
            inputValue: '',
        };
        if (this.props.onRef) this.props.onRef(this)
        this.change = this.change.bind(this);
    }

    change(event) {
        this.state.inputValue = event.target.value
        console.log(this.state)
    }

    render() {
        if (this.props.searchedItems.length == 0) {
            return
        }
        return (
            <div className='ui-input-search'>
                <select id="city" onChange={this.change}>
                    <option selected value=''></option>
                    {
                        this.props.searchedItems.map((item, key) => (
                            <option value={item.code}> {item.name} </option>
                        ))}
                </select>

            </div>
        );
    }
}

export default Input;
