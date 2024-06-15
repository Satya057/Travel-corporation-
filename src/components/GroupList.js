// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addGroup, setStatuses } from '../store';
// import Group from './Group';
// import axios from 'axios';

// const GroupList = () => {
//   const dispatch = useDispatch();
//   const groups = useSelector((state) => state.groups);

//   const handleAddGroup = () => {
//     const lastGroup = groups[groups.length - 1];
//     const nextFrom = lastGroup.to + 1;
//     const nextTo = nextFrom + 2 <= 10 ? nextFrom + 2 : 10;
//     if (nextFrom <= 10) {
//       dispatch(addGroup({ from: nextFrom, to: nextTo }));
//     }
//   };

//   const handleShowStatus = async () => {
//     const allStatuses = await Promise.all(
//       groups.map(async (group, index) => {
//         const groupStatuses = {};
//         for (let i = group.from; i <= group.to; i++) {
//           const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${i}`);
//           groupStatuses[i] = response.data.completed;
//         }
//         return { index, statuses: groupStatuses };
//       })
//     );

//     allStatuses.forEach(({ index, statuses }) => {
//       dispatch(setStatuses(index, statuses));
//     });
//   };

//   return (
//     <div className="group-list">
//       {groups.map((group, index) => (
//         <div key={index} className="group-container">
//           <Group index={index} group={group} />
//         </div>
//       ))}
//       <button className="show-status" onClick={handleShowStatus}>Show Status</button>
//       <button className="add-group" onClick={handleAddGroup}>+ Add Group</button>
//     </div>
//   );
// };

// export default GroupList;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup, setStatuses } from '../store';
import Group from './Group';
import axios from 'axios';

const GroupList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const [allTasksCovered, setAllTasksCovered] = useState(false);

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
      <button
        className="show-status"
        onClick={handleShowStatus}
        disabled={!allTasksCovered}
      >
        Show Status
      </button>
      <button className="add-group" onClick={handleAddGroup}>+ Add Group</button>
    </div>
  );
};

export default GroupList;
