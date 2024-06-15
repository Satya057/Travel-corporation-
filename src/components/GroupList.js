import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, setStatuses } from '../store';
import Group from './Group';
import axios from 'axios';

const GroupList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const [allTasksCovered, setAllTasksCovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    checkAllTasksCovered();
  }, [groups]);

  const handleAddGroup = () => {
    const lastGroup = groups[groups.length - 1];
    const nextFrom = lastGroup ? lastGroup.to + 1 : 1;
    if (nextFrom > 10) {
      return;
    }
    const nextTo = nextFrom + 2 <= 10 ? nextFrom + 2 : 10;
    dispatch(addGroup({ from: nextFrom, to: nextTo }));
  };

  const handleShowStatus = async () => {
    if (!allTasksCovered) {
      setErrorMessage('You have not added all tasks from 1 to 10.');
      return;
    }

    const allStatuses = await Promise.all(
      groups.map(async (group, index) => {
        const groupStatuses = {};
        for (let i = group.from; i <= group.to; i++) {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${i}`);
          groupStatuses[i] = response.data.completed;
        }
        return { index, statuses: groupStatuses };
      })
    );

    allStatuses.forEach(({ index, statuses }) => {
      dispatch(setStatuses(index, statuses));
    });
    setErrorMessage(''); // Clear error message after successful status fetch
  };

  const checkAllTasksCovered = () => {
    const tasksCovered = new Array(10).fill(false);
    groups.forEach(group => {
      for (let i = group.from; i <= group.to; i++) {
        tasksCovered[i - 1] = true;
      }
    });
    setAllTasksCovered(tasksCovered.every(covered => covered));
  };

  return (
    <div className="group-list">
      {groups.map((group, index) => (
        <div key={index} className="group-container">
          <Group index={index} group={group} />
        </div>
      ))}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button
        className={`show-status ${!allTasksCovered ? 'disabled' : ''}`}
        onClick={handleShowStatus}
        disabled={!allTasksCovered}
      >
        Show Status
        {!allTasksCovered && <span className="tooltip">You have not added all tasks from 1 to 10.</span>}
      </button>
      <button className="add-group" onClick={handleAddGroup}>+ Add Group</button>
    </div>
  );
};

export default GroupList;
