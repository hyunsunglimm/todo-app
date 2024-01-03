import axios from "../utils/axios";
import { Store } from "../core/core";

const store = new Store({
  todos: [],
  status: "all",
  loading: false,
  message: "",
});

export default store;

export function getCategory(status) {
  store.state.status = status;
}

export async function getTodos(noLoading = false) {
  if (!noLoading) {
    store.state.loading = true;
  }
  store.state.message = "";
  try {
    const res = await axios.get("/todos");
    store.state.todos = res.data;
  } catch (error) {
    console.error(error);
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
    getTodos();
  } catch (error) {
    console.error(error);
  } finally {
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
    let foundTodo = store.state.todos.find((todo) => todo.id === id);
    Object.assign(foundTodo, res.data);
    // set함수를 호출하여 상태구독을 활성화시키기 위한 코드
    // set함수는 할당이 되어야 호출됨.
    store.state.todos = store.state.todos;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(id) {
  try {
    const res = await axios.delete(`/todos/${id}`);
  } catch (error) {
    console.error(error);
  } finally {
    getTodos();
  }
}

export async function deleteAll(todoIds) {
  try {
    const res = await axios.delete("/todos/deletions", {
      // data 속성 생략 불가!
      data: {
        todoIds,
      },
    });
    getTodos();
  } catch (error) {
    console.error(error);
  }
}

export async function reoreder(todoIds, todos) {
  try {
    const res = await axios.put(`/todos/reorder`, {
      // data 속성 생략!
      todoIds,
    });
    store.state.todos = todos;
  } catch (error) {
    console.error(error);
  }
}
