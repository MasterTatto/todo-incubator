import React from 'react';
import AddItemForm from './AddItemForm';
import { filterValue } from './App';
import EditSpan from './EditSpan';
//
export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};
//
type PropsType = {
	title: string;
	tasks: Array<TaskType>;
	removeTask: (id: string, todoid: string) => void;
	addFilterBtn: (v: filterValue, id: string) => void;
	addTask: (v: string, todoid: string) => void;
	changeChecked: (id: string, bool: boolean, todoid: string) => void;
	changeTaskTitle: (id: string, title: string, todoid: string) => void;
	filter: filterValue;
	id: string;
	removeTodoList: (id: string) => void;
	changeTodoListTitle: (title: string, todoId: string) => void;
};
//
export function Todolist(props: PropsType) {
	const liItem = props.tasks.map((t) => {
		const removeTask = () => props.removeTask(t.id, props.id);
		//
		function changeTitle(title: string) {
			props.changeTaskTitle(t.id, title, props.id);
		}
		//
		return (
			<li className={t.isDone ? 'done' : ''} key={t.id}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={(e) =>
						props.changeChecked(t.id, e.currentTarget.checked, props.id)
					}
				/>
				<EditSpan title={t.title} changeTitle={changeTitle} />
				{/* <span >{t.title}</span> */}
				<button onClick={removeTask}>X</button>
			</li>
		);
	});
	//
	function addtask(value: string) {
		props.addTask(value, props.id);
	}
	//
function changeTodoListTitle(title:string) {
props.changeTodoListTitle(title,props.id)
}
	//
	return (
		<div>
			<h3>
				<EditSpan
					title={props.title}
					changeTitle={changeTodoListTitle}
				/>
				<button onClick={() => props.removeTodoList(props.id)}>X</button>
			</h3>
			<AddItemForm addItem={addtask} />
			<ul>{liItem}</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'btn' : ''}
					onClick={() => props.addFilterBtn('all', props.id)}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'btn' : ''}
					onClick={() => props.addFilterBtn('active', props.id)}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'btn' : ''}
					onClick={() => props.addFilterBtn('completed', props.id)}
				>
					Completed
				</button>
			</div>
		</div>
	);
}
