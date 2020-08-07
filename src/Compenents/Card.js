import React from 'react'
import DataPoint from './DataPoint'

class Card extends React.Component {
    constructor() {
        super();
        this.state = {
            data: false,
        }
    }

    componentDidMount() {
        const url = this.props.urlFront + this.props.symbol + this.props.urlBack;
        /* fetch(url)
            .then(response => response.json())
            .then(data => {
                const obj = data["Time Series (Daily)"];
                const mostRecentEntry = obj[Object.keys(obj)[0]];
                this.setState(
                    {
                        data: mostRecentEntry,
                    }
                )
            }); */
    }

    getCloseColor() {
        if (this.state.data["1. open"] > this.state.data["4. close"]) {
            return "red";
        }
        else {
            return "green";
        }
    }

    render() {
        return (
            <div className="card" symbol={this.props.symbol}>
                <h1>{this.props.symbol}</h1>
                <div className="delete-card-btn" onClick={(e) => this.props.onDeleteClick(e)}>X</div>
                <div className="cardInfo">
                    <DataPoint type="Open" value={/* this.state.data["1. open"] */ "12000"} />
                    <DataPoint type="High" value={/* this.state.data["2. high"] */ "12000"} color="green" />
                    <DataPoint type="Low" value={/* this.state.data["3. low"] */ "12000"} color="red" />
                    <DataPoint type="Close" value={this.state.data["4. close"]} color={this.getCloseColor()} />
                </div>
            </div>
        )
    }
}

export default Card;