import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import { v4 as uuid } from 'uuid'; // if use api post request then no need to use uuid
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(res => this.setState({ todos: res.data }))
  }

  // Toggle Complete Todo
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // Delete Todo
  delTodo = (id) => {

    // if api is not used then only this line will use
    /*this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });*/

    // if use api delete request then
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));

  }

  addTodo = (title) => {
    /*const newTodo = {
      id: uuid(),
      title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] });*/

    // if use api post request then no need to use above commented code

    axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));

  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
