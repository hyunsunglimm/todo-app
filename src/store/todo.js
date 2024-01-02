import axios from "../utils/axios";
import { Store } from "../core/core";

const store = new Store({
  todos: [],
  status: "all",
  loading: false,
  deleteAllLoading: false,
  message: "",
});

export default store;

export function getCategory(status) {
  store.state.status = status;
}

export async function getTodos() {
  store.state.loading = true;
  store.state.message = "";
  try {
    const res = await axios.get("/todos");
    store.state.todos = res.data;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    store.state.loading = false;
    store.state.message = "주문목록이 없습니다.";
  }
}

// 가장 큰 order값 얻기
export function getOrder() {
  const orders = store.state.todos.map((todo) => todo.order);
  return Math.max(...orders);
}

export async function addTodo(title, order) {
  store.state.loading = true;
  try {
    const res = await axios.post("/todos", {
      title: `[주문접수] ${title}`,
      order: order === -Infinity ? 1 : order,
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    getTodos();
    store.state.loading = false;
  }
}

export async function updateTodo(id, title, order, done, status) {
  try {
    const res = await axios.put(`/todos/${id}`, {
      title: status ? `[${status}] ${title}` : title,
      done,
      order,
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    getTodos();
  }
}

export async function deleteTodo(id) {
  try {
    const res = await axios.delete(`/todos/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    getTodos();
  }
}

export async function deleteAll() {
  store.state.deleteAllLoading = true;
  const todoIds = store.state.todos
    .filter((todo) => todo.done === true)
    .map((todo) => todo.id);
  try {
    const res = await axios.delete("/todos/deletions", {
      todoIds: todoIds,
    });
  } catch (error) {
    console.error(error);
  } finally {
    getTodos();
    store.state.deleteAllLoading = false;
  }
}
