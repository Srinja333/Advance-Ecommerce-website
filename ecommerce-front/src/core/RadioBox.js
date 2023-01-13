import React, { useEffect, useState, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  //console.log(typeof(prices));
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    //console.log("hay event");
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
        <input
        onChange={handleChange}
        value={`${p._id}`}
        name={p} //for select one price at one time
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check=label">{p.name}</label>
    </div>
  ));
  
};
export default RadioBox;
