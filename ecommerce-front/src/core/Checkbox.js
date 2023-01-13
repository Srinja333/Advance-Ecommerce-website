import React, { useEffect, useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (c) => () => {
    //returnthe first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategortId = [...checked]; //...checked is everything in the state
    //if currently checked was not already in checked state > push,">" means then we want to
    //else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategortId.push(c);
    } else {
      newCheckedCategortId.splice(currentCategoryId, 1);
    }
    //console.log(newCheckedCategortId);
    setChecked(newCheckedCategortId);
    handleFilters(newCheckedCategortId);
  };
  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check=label">{c.name}</label> 
    </li>
  ));
};
export default Checkbox;
