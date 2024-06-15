 

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeGroup, updateGroup, setStatuses } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Group = ({ index, group }) => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statuses[index]);

  const handleRemove = () => {
    dispatch(removeGroup(index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateGroup(index, { ...group, [name]: Number(value) }));
  };

  const handleShowStatus = async () => {
    const groupStatuses = {};
    for (let i = group.from; i <= group.to; i++) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${i}`);
      groupStatuses[i] = response.data.completed;
    }
    dispatch(setStatuses(index, groupStatuses));
  };

  return (
    <div className="group">
      <div className="group-content">
        <button onClick={handleRemove} className="delete-button">
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <div className="group-details">
          <span className="group-label">Group {index + 1}</span>
          <div className="group-inputs">
            <label>From:</label>
            <input
              type="number"
              name="from"
              value={group.from}
              onChange={handleChange}
              min="1"
              max="10"
            />
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
            <label>To:</label>
            <input
              type="number"
              name="to"
              value={group.to}
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>
        </div>
        <div className="status-list">
          {statuses && Object.entries(statuses).map(([key, value]) => (
            <div key={key} className="status-item">
              ({key}) {value ? 'True' : 'False'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;


 