import React, { useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import './App.css';
import { Todolist, TaskType } from './Todolist';
export type filterValue = 'all' | 'active' | 'completed';
export type TodoListType = {
	id: string;
	title: string;
	filter: filterValue;
};
function App() {
	let todoList_1 = v1();
	let todoList_2 = v1();
	//
	type TaskStateType = {
		[key: string]: Array<TaskType>;
	};
	//
	let [tasks, setTask] = useState<TaskStateType>({
		[todoList_1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false },
			{ id: v1(), title: 'Git', isDone: false },
		],
		[todoList_2]: [
			{ id: v1(), title: 'bread', isDone: false },
			{ id: v1(), title: 'milk', isDone: true },
			{ id: v1(), title: 'coca-cola', isDone: false },
			{ id: v1(), title: 'sugar', isDone: true },
			{ id: v1(), title: 'salt', isDone: false },
		],
	});
	//
	let [todoLists, setTodoList] = useState<Array<TodoListType>>([
		{ id: todoList_1, title: 'What to learn', filter: 'all' },
		{ id: todoList_2, title: 'What to buy', filter: 'all' },
	]);
	//
	//
	function changeChecked(id: string, bool: boolean, todoListsId: string) {
		tasks[todoListsId] = tasks[todoListsId].map((t) =>
			t.id === id ? { ...t, isDone: bool } : t
		);
		setTask({ ...tasks });
	}
	//
	function changeTaskTitle(id: string, title: string, todoListsId: string) {
		tasks[todoListsId] = tasks[todoListsId].map((t) =>
			t.id === id ? { ...t, title: title } : t
		);
		setTask({ ...tasks });
	}
	//
	function addTask(v: string, todoListsId: string) {
		const task = { id: v1(), title: v, isDone: false };
		tasks[todoListsId] = [task, ...tasks[todoListsId]];
		setTask({ ...tasks });
	}
	//
	function removeTask(idTask: string, todoListsId: string) {
		tasks[todoListsId] = tasks[todoListsId].filter((f) => {
			if (f.id !== idTask) {
				return true;
			} else {
				return false;
			}
		});
		setTask({ ...tasks });
	}
	//
	function addFilterBtn(f: filterValue, todoId: string) {
		let todo = todoLists.map((tl) => {
			if (tl.id === todoId) {
				return { ...tl, filter: f };
			} else {
				return tl;
			}
		});
		setTodoList(todo);
	}
	function changeTodoListTitle(title: string, todoId: string) {
		let todo = todoLists.map((tl) => {
			if (tl.id === todoId) {
				return { ...tl, title };
			} else {
				return tl;
			}
		});
		setTodoList(todo);
	}
	//
	function removeTodoList(todoID: string) {
		let removeTodo = todoLists.filter((f) => {
			if (f.id !== todoID) {
				return true;
			} else {
				return false;
			}
		});
		setTodoList(removeTodo);
		delete tasks[todoID];
		setTask({ ...tasks });
	}
	//
	function addTodoList(title: string) {
		const newTodoListID = v1();
		const newTodoList: TodoListType = {
			id: newTodoListID,
			title: title,
			filter: 'all',
		};
		setTodoList([newTodoList, ...todoLists]);
		setTask({ ...tasks, [newTodoListID]: [] });
	}
	//
	return (
		<div className='App'>
			<AddItemForm addItem={addTodoList} />

			{todoLists.map((tl) => {
				function windowTask() {
					if (tl.filter === 'active') {
						return tasks[tl.id].filter((f) => f.isDone === false);
					}
					if (tl.filter === 'completed') {
						return tasks[tl.id].filter((f) => f.isDone === true);
					} else {
						return tasks[tl.id];
					}
				}
				//
				return (
					<Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={windowTask()}
						removeTask={removeTask}
						addFilterBtn={addFilterBtn}
						addTask={addTask}
						changeChecked={changeChecked}
						filter={tl.filter}
						removeTodoList={removeTodoList}
						changeTaskTitle={changeTaskTitle}
						changeTodoListTitle={changeTodoListTitle}
					/>
				);
			})}
		</div>
	);
}

export default App;
