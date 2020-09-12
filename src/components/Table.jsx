import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const Table = ({
	onEdit,
	onRemove,
	items,
	error,
}) => {
	return (
		<div className="list">
			{!!error.length && 
				<div className="list__error">
					{error}
				</div>
			}
			{!!items.length &&
				<div className="list__header">
					<div className="list__item--row list__item--date">Дата</div>
					<div className="list__item--row list__item--distance">Дистанция, км</div>
					<div className="list__item--row list__item--actions">Действия</div>
				</div>
			}
			{
				items
					.sort((a, b)=> {
						a = a.date.split('.').reverse().join('');
						b = b.date.split('.').reverse().join('');
						return a > b ? 1 : a < b ? -1 : 0;
					})
					.map(item => 
						<Item 
							{...item}
							key={item.id}
							onRemove={onRemove}
							onEdit={onEdit}
						/>)
			}
		</div>
	)
}

Table.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		date: PropTypes.string,
		distance: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
		])
	})).isRequired,
	onRemove: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
}

export default Table;
