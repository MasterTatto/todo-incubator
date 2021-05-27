import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
export type filterValue = 'all' | 'active' | 'completed';
export type TodoListType = {
	id: string;
	title: string;
	filter: filterValue;
};
function App() {
	//const [filter, setFilter] = useState<filterValue>('all');
	//
	//

	//
	function changeChecked(id: string, bool: boolean, todoListsId: string) {
		let tasks = tasksObj[todoListsId];
		//
		const newTask = tasks.map((t) =>
			t.id === id ? { ...t, isDone: bool } : t
		);
		tasksObj[todoListsId] = newTask;
		setTask({ ...tasksObj });
	}
	//
	function addTask(v: string, todoListsId: string) {
		//
		const task = { id: v1(), title: v, isDone: false };
		let tasks = tasksObj[todoListsId];
		const newTasks = [task, ...tasks];
		tasksObj[todoListsId] = newTasks;
		setTask({ ...tasksObj });
	}
	//

	function removeTask(idTask: string, todoListsId: string) {
		let tasks = tasksObj[todoListsId];
		//
		const newTask = tasks.filter((f) => {
			if (f.id !== idTask) {
				return true;
			} else {
				return false;
			}
		});
		tasksObj[todoListsId] = newTask;
		setTask({ ...tasksObj });
	}
	//
	function addFilterBtn(f: filterValue, todoId: string) {
		let todo = todoLists.find((tl) => tl.id === todoId);
		if (todo) {
			todo.filter = f;
			setTodoList([...todoLists]);
		}
	}
	//
	let todoList_1 = v1();
	let todoList_2 = v1();
	//
	let [todoLists, setTodoList] = useState<Array<TodoListType>>([
		{ id: todoList_1, title: 'What to learn', filter: 'all' },
		{ id: todoList_2, title: 'What to buy', filter: 'all' },
	]);
	//
	function removeTodoList(todoID: string) {
		let removeTodo = todoLists.filter((f) => {
			if (f.id !== todoID) {
				return true;
			} else {
				return false;
			}
		});
		setTodoList(removeTodo)
		delete tasksObj[todoID]
		setTask({...tasksObj})
	}
	//
	let [tasksObj, setTask] = useState({
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
	return (
		<div className='App'>
			{todoLists.map((tl) => {
				function windowTask() {
					if (tl.filter === 'active') {
						return tasksObj[tl.id].filter((f) => f.isDone === false);
					}
					if (tl.filter === 'completed') {
						return tasksObj[tl.id].filter((f) => f.isDone === true);
					} else {
						return tasksObj[tl.id];
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
					/>
				);
			})}
		</div>
	);
}

export default App;
