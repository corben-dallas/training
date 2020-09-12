import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Item = ({
	id,
	date,
	distance,
	onEdit,
	onRemove,
}) => {
	const [edit, setEdit] = useState(false);

	return (
		<div className={`list__item ${edit ? 'list__item--edit' : ''}`}>
			<div className="list__item--row list__item--date">{date}</div>
			<div className="list__item--row list__item--distance">{distance}</div>
			<div className="list__item--row list__item--actions">
				<div 
					className="action action--edit"
					onClick={() => {onEdit(date, distance); setEdit(true);} }
				>
					<span className="material-icons">edit</span>
				</div>
				<div 
					className="action action--remove"
					onClick={() => onRemove(id)}
				>
					<span className="material-icons">delete</span>
				</div>
			</div>
		</div>
	);
}

	Item.propTypes = {
	id: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	distance: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]).isRequired,
	onRemove: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
}

export default Item;
