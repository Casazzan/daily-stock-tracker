import React from 'react'

import Card from './Compenents/Card'
import Submitter from './Compenents/Submitter'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbols: ["MSFT", "AAPL", "FB", "TSLA"],
        }
    }

    clickHandler() {
        const inputElement = document.getElementById('submitter');
        this.searchSymbol(inputElement.vlalue);
    }

    deleteClickHandler(e) {
        const cardSymbol = e.target.parentElement.getAttribute('symbol');
        this.setState({
            symbols: this.state.symbols.filter((symbol) => { //conserves immutability by not using splice
                return symbol !== cardSymbol;
            })
        });
    }

    searchSymbol(symbol) {
        const inputVal = formatInput(symbol);
        if (!this.state.symbols.includes(inputVal) && this.isValidInput(inputVal)) {
            this.setState({
                symbols: this.state.symbols.concat([inputVal]),
            })
        }
        document.getElementById('submitter').value = "";
    }


    isValidInput(str) {
        if (str) {
            try {
                fetch(this.props.urlFront + str + this.props.urlBack).then(response => response.json()).then(data => {
                    if (data["Note"]) {
                        console.log("Too many queries per minute. Max of 5. Sorry, that is all that is available for free");
                        return false;
                    }
                    if (data["Error"]) {
                        console.log(data["Error:"])
                        return false;
                    }
                });
                return true;
            } catch (error) {
                console.log('error: ', error);
                return false;
            }
        }
        return false;
    }


    render() {
        const cardItems = this.state.symbols.map((symb) =>
            <Card
                key={symb}
                symbol={symb}
                urlFront={this.props.urlFront}
                urlBack={this.props.urlBack}
                onDeleteClick={(e) => this.deleteClickHandler(e)}
            />
        )
        return (
            <div>
                <div id='disclaimer'>Disclaimer!<br></br>Max of 5 API queries per minute
                <p>Sorry, I'm cheap :)</p>
                </div>
                <div id='main'>
                    {cardItems}
                </div>
                <Submitter
                    onClick={() => this.clickHandler()}
                    search={(symbol) => this.searchSymbol(symbol)}
                />
            </div>
        )
    }
}

function formatInput(str) {
    const trimStr = str.match(/([^\s]+)/)[1];
    if (trimStr) {
        return trimStr.toUpperCase();
    }
    else {
        return null;
    }
}


export default App;