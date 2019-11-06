import React from 'react';
import './ExchangeRates.scss';

interface RatesProps {
}

interface RatesState {
    error: any,
    isLoaded: boolean,
    rates: any
}

class ExchangeRates extends React.Component<RatesProps, RatesState> {
    ratesWs = new WebSocket('wss://streaming.cryptocompare.com/');

    ratesConnectionOptions = {
        "action": "SubAdd",
        "subs":
            [
                "0~coinbase~ETH~USD",
                "30~coinbase~ETH~USD",
                "0~coinbase~ETH~BTC",
                "30~coinbase~ETH~BTC"
            ],
        "api_key": "YOUR_API_KEY"
    };

    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rates: []
        };
    }


    componentDidMount() {
        fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,ETH,EUR,JPY,ILS,BNB,CAD,AUD")
            .then(res => res.json())
            .then(
                (result) => {
                    let tempRates = [];
                    for (let [key, value] of Object.entries(result)) {
                        tempRates.push({
                            key,
                            value
                        });
                    }
                    this.setState({
                        isLoaded: true,
                        rates: tempRates
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

        this.ratesWs.onopen = () => {
            console.log('connected');
        };

        this.ratesWs.send(JSON.stringify(this.ratesConnectionOptions));

        this.ratesWs.onmessage = evt => {
            const message = JSON.parse(evt.data);
            // will require data transformation
            // this.setState({rates: message});
            console.log(message);
        };

        this.ratesWs.onclose = () => {
            console.log('disconnected');
        };
    }

    render() {
        return (
            <ul className="exchange-rates-list">
                {this.state.rates.map((rate: any) => {
                    return (
                        <li key={rate.key} className="exchange-rates-item">
                            <span>{rate.key}</span><span>{rate.value}</span>
                        </li>
                    );
                })}
            </ul>
        );
    }

}

export default ExchangeRates;