import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import TodoItem from './todoItem'
import AddItem from './addItem';
import About from './about'
import './css/index.css'


const TODO_KEYS = "todos";

class TodoComponent extends React.Component {
    constructor(props) {
        super(props);
        let data = localStorage.getItem(TODO_KEYS);
        console.log('todo data is :' + data);
        this.state = {
            todos: JSON.parse(data) || [] //有数据就解析，没有的话就为空数组
        }
    }

    handleAdd = (val) => {
        console.log('saved data is :' + val)
        const todos = this.state.todos;
        todos.push(val)
        this.setState({
            todos
        })
        localStorage.setItem(TODO_KEYS, JSON.stringify(todos))
    }
    handleDelete = (index) => {
        console.log('删除的条目为：' + index);
        let todos = this.state.todos;
        todos = todos.filter(function (val, i) {
            return index !== i;
        });
        console.log(todos);
        this.setState({
            todos
        })
        localStorage.setItem(TODO_KEYS, JSON.stringify(todos));
    };

    render() {
        let subTitle = null;
        let itemLength = this.state.todos.length;
        if (itemLength % 2 === 0) {
            subTitle = <h3>明日复明日, 明日何其多 count：{itemLength}</h3>;
        } else {
            subTitle = <h3>今日事, 今日毕 count：{itemLength}</h3>;
        }

        const list = this.state.todos.map((val, index) => {
            return <TodoItem key={index} index={index} val={val} onDelete={this.handleDelete}/>;
        });

        return (
            <div>
                <Link to="/about">关于About</Link>
                {this.props.showTime && <h2>GTD记事本</h2>}
                {subTitle}
                {
                    itemLength === 0
                        ? (<p>恭喜你, 任务全部完成!</p>)
                        : (<ul>{list}</ul>)
                }
                <AddItem onInputChanges={this.handleAdd}/>
            </div>
        )
    }

}

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path={'/'} exact={true} render={() => <TodoComponent showTime={true}/>}/>
                    <Route path={'/about'} component={About}/>

                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);


