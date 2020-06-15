import React, { Component } from 'react';
import { PropTypes } from "prop-types";

export class TodoItem extends Component {

    getStyle(){
        // long way to define conditional style 
        /*if(this.props.todo.completed){
            return {
                textDecoration: 'line-through'
            }
        }else{
            return {
                textDecoration: 'none'
            }
        }*/

        //short way to define conditional style using ternary operator
        return {
            //add multiple styles in a single function
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px dotted #ccc',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }

    //use arrow function to remove the 'this' undefined error or simply use onChange={this.markComplete.bind(this)}
    // markComplete = (e) => {
    //     console.log(this.props);
    // }

    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
                    {title}
                    <button style={btnStyle} onClick={this.props.delTodo.bind(this, id)}>x</button>
                </p>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: 'white',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right',
    fontWeight: 'bold'
}

export default TodoItem
