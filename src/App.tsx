import React from 'react';
import './App.scss';
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <div>
                    <h1>Exchange Rates</h1>
                    <ExchangeRates></ExchangeRates>
                </div>
            </div>
        );
    }
}

export default App;
