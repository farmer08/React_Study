import React from 'react'
import PropTypes from 'prop-types'
import './css/todoItem.css'


class TodoItem extends React.Component {
    handleClick= ()=>{
        this.props.onDelete(this.props.index);
    };
    render() {
        return (
            <li className="todo-item">
                <span className="item-name">{this.props.val}</span>
                <span className="item-remove" onClick={this.handleClick}>X</span>
            </li>
        )
    }
}

//props数据类型检查
TodoItem.propTypes = {
    index: PropTypes.number.isRequired,
    val: PropTypes.string
}
// 如果props未传入, 使用默认值
TodoItem.defaultProps = {
    val: "这是默认描述"
}
export default TodoItem
