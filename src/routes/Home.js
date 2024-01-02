import AddTodo from "../components/AddTodo";
import Headline from "../components/Headline";
import TodoList from "../components/TodoList";
import { Component } from "../core/core";
import { getTodos } from "../store/todo";

export default class Home extends Component {
  render() {
    const headline = new Headline().el;
    const addTodo = new AddTodo().el;
    const todoList = new TodoList().el;
    this.el.classList.add("container");

    this.el.append(headline, addTodo, todoList);
    getTodos();
  }
}
