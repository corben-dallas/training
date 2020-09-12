import React from 'react';
import PropTypes from 'prop-types';

const Form = ({
	form, 
	onInputsChange,
	onAdd,
	isEdit,
	onEditAdd,
}) => (
	<div className="form__content">
		<input 
			type='text'
			onChange={onInputsChange}
			name='userDate'
			value={form.userDate}
			placeholder='Введите дату (дд.мм.гггг)'
			className="form__input form__input--date"
			autoComplete='off'
			disabled={isEdit}
		/>
		<input 
			type="text"
			onChange={onInputsChange}
			name='userDistance'
			value={form.userDistance}
			placeholder='Введите расстояние (км)'
			className="form__input form__input--distance"
			autoComplete='off'
		/>
		<button 
			onClick={isEdit ? onEditAdd : onAdd}
			disabled={!form.userDistance || !form.userDate}
			className={`form__input form__input--button ${!form.userDistance || !form.userDate ? 'form__input--button-disabled' : ''}`}
		>
			Добавить
		</button>
	</div>
);

Form.propTypes = {
	form: PropTypes.shape({
		userDistance: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		userDate: PropTypes.string,
	}).isRequired,
	onInputsChange: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired,
}

export default Form;
