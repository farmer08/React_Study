import React from "react";
import './css/addItem.css'

class AddItem extends React.Component {
    handleAddData = (e) => {
        e.preventDefault(); // 阻止默认事件

        console.log(this.inputNote.value)
        this.props.onInputChanges(this.inputNote.value);
        this.inputNote.value = "";

    };

    render() {
        return (
            <form className='add-item' onSubmit={this.handleAddData}>
                {/*通过ref获取input节点的引用*/}
                <input type="text" required ref={(input) => {
                    this.inputNote = input
                }}/>
                <input type="submit" value="添加"/>

            </form>
        )

    }
}

export default AddItem;