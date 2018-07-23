import React from 'react';
import ReactDOM from 'react-dom';


function BuySomeThing(props) {
    let money = parseFloat(props.money);
    if (Number.isNaN(money)) {
        return <p>输入错误</p>
    }
    if (money >= 10) {
        return <p>购买成功，金额；¥{money},找零:¥{Math.round((money - 10) * 1000) / 1000}</p>
    }
    return <p>购买失败，金额；¥{money}</p>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: '',
            unit: 'rmb'
        }
    }


    // 1美金 -> 6.7人民币
    toRMB = (money) => money * 6.7;

    // 6.7人民币 -> 1美金
    toUSD = (money) => money / 6.7;

    // 转换并保留三位小数
    // 1.5462686567164179 => 1.546
    // 1.5462686567164179 => 1546.2686567164179
    convert = (converter, money) => Math.round(converter(money) * 1000) / 1000;


    render() {
        let money = this.state.money;
        let unit = this.state.unit;
        const rmb = unit === 'rmb' ? money : this.convert(this.toRMB, money);// 美元转成人民币
        const usd = unit === 'usd' ? money : this.convert(this.toUSD, money);// 人民币转成美元
        return (
            <div>
                <h2>付款计数器，火币兑换</h2>
                <MoneyInput unit={'rmb'} money={rmb} onMoneyInput={(money) => {
                    this.setState({money: money, unit: 'rmb'})
                }}/>
                <MoneyInput unit={'usd'} money={usd} onMoneyInput={(money) => {
                    this.setState({money: money, unit: 'usd'})
                }}/>
                <BuySomeThing money={money}/>
            </div>
        )
    }
}

const unitNames = {
    rmb: '人民币',
    usd: '美元'
}

class MoneyInput extends React.Component {
    render() {
        return (
            <fieldset>
                <legend>
                    请输入付款金额 ({unitNames[this.props.unit]})
                </legend>
                <input type="text" value={this.props.money} onChange={(e) => {
                    let money = e.target.value;
                    money = money.substring(0, 6).replace(/[^\.\d]+/, '');
                    this.props.onMoneyInput(money)
                }}/>
            </fieldset>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);


