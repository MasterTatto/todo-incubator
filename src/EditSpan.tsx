import React, { useState } from 'react';
type EditSpanPropsType = {
	title: string;
	changeTitle: (title: string) => void;
};
function EditSpan(props: EditSpanPropsType) {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [value, setValue] = useState(props.title);
	//
	function onEditMode() {
		setEditMode(true);
	}
	//
	function offEditMode() {
		setEditMode(false);
		props.changeTitle(value);
	}
	//
	return editMode ? (
		<input
			autoFocus
			onBlur={offEditMode}
			// value={value}
			onChange={(e) => {
				setValue(e.currentTarget.value);
			}}
			onKeyPress={(e) => {
				if (e.key === 'Enter') {
					offEditMode();
				}
			}}
		/>
	) : (
		<span onDoubleClick={onEditMode}>{props.title}</span>
	);
}

export default EditSpan;
