import React from 'react'

class Submitter extends React.Component {
    constructor() {
        super();
        this.state = {
            list: false,
        }
    }
    handleChange(e) {
        const val = e.target.value;
        if (!val) {
            this.setState({
                list: false,
            })
            return;
        }
        fetch("https://ticker-2e1ica8b9.now.sh/keyword/" + val)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    list: data,
                })
                return;
            })
            .catch((error) =>
                //if search is unsuccesful, set false
                this.setState({
                    list: false,
                })
            )
    }

    handleListClick(e) {
        const symbol = e.currentTarget.getAttribute('data-key');
        this.props.search(symbol);
    }

    getList() {
        const inputOptions = [];
        if (this.state.list) {
            for (let i = 0; i < this.state.list.length; i++) {
                if (i >= 5) break;
                const pair = this.state.list[i];
                const pairSymbol = pair["symbol"];
                const pairName = pair["name"];
                inputOptions.push(
                    <li
                        className="input-option"
                        key={pairSymbol}
                        data-key={pairSymbol}
                        onClick={(e) => this.handleListClick(e)}
                    >
                        <div className="symbol">{pairSymbol}</div>
                        <div className="name">{pairName}</div>
                    </li>
                );
            }
        }
        return inputOptions;
    }

    emptyList() {
        this.setState({
            list: false,
        });
    }

    render() {
        const inputOptions = this.getList();
        return (
            <div id="submitter-container">
                <div>
                    <input
                        type="text"
                        placeholder="Stock symbol"
                        id="submitter"
                        onChange={(e) => this.handleChange(e)}
                        onBlur={() => this.emptyList()}
                    >
                    </input>
                    {inputOptions &&
                        <ul>
                            {inputOptions}
                        </ul>
                    }
                </div>
                <button
                    type="button"
                    title="Add Stock"
                    onClick={() => this.props.onClick()}
                >
                    +</button>
            </div>
        )
    }
}

export default Submitter