import { Component } from "../core/core";
import todoStore, { deleteAll, getCategory, reoreder } from "../store/todo";
import TodoItem from "./TodoItem";
import Sortable from "sortablejs";

export default class TodoList extends Component {
  constructor() {
    super({
      tagName: "section",
    });
    todoStore.subscribe("todos", () => {
      this.render();
    });
    todoStore.subscribe("status", () => {
      this.render();
    });
    todoStore.subscribe("message", () => {
      this.render();
    });
  }
  render() {
    let todoList;
    switch (todoStore.state.status) {
      case "all":
        todoList = todoStore.state.todos;
        break;
      case "reception":
        todoList = todoStore.state.todos.filter((todo) =>
          todo.title.includes("주문접수")
        );
        break;
      case "delivery":
        todoList = todoStore.state.todos.filter((todo) =>
          todo.title.includes("배달중")
        );
        break;
      case "complete":
        todoList = todoStore.state.todos.filter((todo) =>
          todo.title.includes("배달완료")
        );
        break;
      default:
        break;
    }

    this.el.innerHTML = /* html */ `
      <div class="category">
        <div class="category-item" status="all">전체주문</div>
        <div class="category-item" status="reception">주문접수</div>
        <div class="category-item" status="delivery">배달중</div>
        <div class="category-item" status="complete">배달완료</div>
      </div>

      ${
        todoList.length === 0
          ? `<div class="message">${todoStore.state.message}</div>`
          : '<ul class="todo-list"></ul>'
      }
      <span class="material-symbols-outlined ${
        todoStore.state.todos.some((todo) => todo.done === true)
          ? "all-delete"
          : "none-delete"
      }">delete</span>
    `;

    const todoListEl = this.el.querySelector(".todo-list");
    if (todoListEl) {
      new Sortable(todoListEl, {
        animation: 150,
        handle: ".handle",
        onEnd: function (e) {
          const { oldIndex, newIndex } = e;
          const todoIds = todoStore.state.todos.map((todo) => todo.id);
          const movedElement = todoIds[oldIndex];
          todoIds.splice(oldIndex, 1);
          todoIds.splice(newIndex, 0, movedElement);

          // UI 즉시 변경
          todoStore.state.todos.splice(oldIndex, 1);
          todoStore.state.todos.splice(
            newIndex,
            0,
            todoStore.state.todos[oldIndex]
          );
          reoreder(todoIds);
        },
      });
    }

    todoListEl?.append(
      ...todoList.map((todo, index) => new TodoItem({ todo, index }).el)
    );

    const categories = this.el.querySelectorAll(".category-item");
    categories.forEach((category) => {
      category.addEventListener("click", () => {
        getCategory(category.getAttribute("status"));
      });
      todoStore.state.status === category.getAttribute("status")
        ? category.classList.add("active")
        : category.classList.remove("active");
    });

    const deleteButton = this.el.querySelector(".all-delete");
    deleteButton?.addEventListener("click", () => {
      const isDoneIds = todoStore.state.todos
        .filter((todo) => todo.done === true)
        .map((todo) => todo.id);
      deleteAll(isDoneIds);
    });
  }
}
