import React, { useState } from 'react';
import { nanoid } from 'nanoid'

import Form from './components/Form';
import Table from './components/Table';

import TrainingModel from './model/model';

import './App.css';

const App = () => {
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	const [form, setForm] = useState({
		userDate: '',
		userDistance: '',
	});

	const handleInputChange = (e) => {
		if (!e) return;
		const { name, value } = e.target;
		
		setForm(prev => ({ ...prev, [name]: value }));
	}

	const validateForm = (date, distance) => {
		const dateRegExp = /^\s*(\d{2})\.(\d{2})\.(\d{4})\s*$/g;
		const distanceRegExp = /^[0-9.]*$/gm;

		if (dateRegExp.test(date) && distanceRegExp.test(distance)) {
			return true
		}

		return false;
	}

	const handleItemAdd = () => {
		if (!validateForm(form.userDate, form.userDistance)) {
			setError('Проверьте данные!');
			return;
		}

		const isSameDate = list.some(item => item.date === form.userDate);

		if (isSameDate) {
			setList(prev => prev.map(item => 
				(item.date === form.userDate) ? { ...item, distance: +item.distance + +form.userDistance } : item));
			setForm({ userDate: '', userDistance: '' });
			setError('');
			return;
		}

		setList(prev => [...prev, new TrainingModel(nanoid(), form.userDate, form.userDistance)]);
		setForm({ userDate: '', userDistance: '' });
		setError('');
	}

	const handleEditedItemAdd = () => {
		setList(prev => [
			...prev.filter(item => item.date !== form.userDate),
			new TrainingModel(nanoid(), form.userDate, form.userDistance)
		]);
		setIsEdit(false);
		setError('');
		setForm({ userDate: '', userDistance: '' });
	}

	const handleItemEdit = (date, distance) => {
		setForm({ userDate: date, userDistance: distance, });
		setIsEdit(true);
		setError('');
	}
	const handleItemRemove = (id) => {
		setList(prev => prev.filter(item => item.id !== id));
		setError('');
		setIsEdit(false);
	}

	return (
		<React.Fragment>
			<div className="app__wrapper">
				<Form 
					form={form} 
					onInputsChange={handleInputChange}
					onAdd={handleItemAdd}
					isEdit={isEdit}
					onEditAdd={handleEditedItemAdd}
				/>
				<Table 
					onEdit={handleItemEdit}
					onRemove={handleItemRemove}
					items={list}
					error={error}
					isEdit={isEdit}
				/>
			</div>
		</React.Fragment>
	);
}

export default App;
