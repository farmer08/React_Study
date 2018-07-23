import React from 'react';
import ReactDOM from 'react-dom';

class Jiayou extends React.Component {
    componentWillMount() {
        console.log("组件将要被卸载")
    }

    render() {
        return <h2>加油点！！！！</h2>
    }
}

class App extends React.Component {
    // setState
    constructor() {
        super();
        this.state = {
            count: 0,
            timeLeft: 10
        }
    }

    //组件已挂载
    componentDidMount() {
        this.timerId = setInterval(() => {
            //更新剩余时间
            if (this.isTimeUp()) {
                //停止计数任务
                clearInterval(this.timerId);

                return
            }
            this.setState({
                timeLeft: this.state.timeLeft - 1
            });
        }, 1000);
    }
    isTimeUp() {
        return this.state.timeLeft <= 0
    }

    //组件卸载
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    handClick = () => {
        if (this.isTimeUp()) {
            //时间到，不计数
            return
        }

        //点击后count++
        this.setState({
            count: this.state.count + 1
        })
    };

    render() {
        let tip = null;
        let jiayou = <Jiayou/>
        if (this.isTimeUp()) {
            jiayou = null;
            tip = <h3>时限已到，总计按了{this.state.count}次</h3>
        } else {
            tip = <h3>剩余时间{this.state.timeLeft}</h3>;
        }

        const btnStyle = {
            width: 300, height: 300, color: '#fff',
            backgroundColor: this.state.count % 2 === 0 ? 'red' : 'green', fontSize: 22
        };
        return (
            <div>
                <h2>计数器游戏，试试你的手速</h2>
                {tip}
                <button style={btnStyle}
                        onClick={this.handClick}>我是按钮{this.state.count}</button>
                {jiayou}
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
