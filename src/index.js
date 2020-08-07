import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

import "./../node_modules/minireset.css"
import "./style.css"

ReactDom.render(<App urlFront="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
    urlBack="&apikey=B6WDTRVM6XVHCW5V" />, document.getElementById('root'));