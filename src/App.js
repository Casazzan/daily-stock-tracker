import React from 'react'

import Card from './Compenents/Card'
import Submitter from './Compenents/Submitter'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbols: ["MSFT"],
        }
    }

    clickHandler() {
        const inputElement = document.getElementById('submitter');
        this.searchSymbol(inputElement.value);
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
        if (this.isValidInput(inputVal)) {
            this.setState({
                symbols: this.state.symbols.concat([inputVal]),
            })
        }
    }


    isValidInput(str) {
        if (str) {
            try {
                fetch(this.props.urlFront + str + this.props.urlBack);
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
            <div id='main'>
                {cardItems}
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