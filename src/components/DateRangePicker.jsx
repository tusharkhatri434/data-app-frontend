// DateRangePicker.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../utils/appDataSlice';
import { useNavigate } from 'react-router-dom';

const DateRangePicker = () => {
  const [startValue, setStartDate] = useState('2022-01-01');
  const [endValue, setEndDate] = useState('2022-12-12');
  const [ageValue,setAge] = useState(25);
  const [genderValue,setGender] = useState("");
  const navigate = useNavigate();
 
  const dispatch = useDispatch();

  // Handle Start Date Change
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    // Optional: Clear the end date if the new start date is later than the current end date
    if (event.target.value > endValue) {
      setEndDate('');
    }
  };

  // Handle End Date Change
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filterhandler = ()=>{
    const startDate = startValue || null;
    const endDate = endValue || null;
    const age = ageValue || null;  
    const gender = genderValue || null;  
    const bar = 'A'; 
    const filter = {startDate,endDate,age,gender,bar};
    // console.log('filter',filter);
    dispatch(setFilters(filter));
    navigate(`?start=${startDate}&end=${endDate}&age=${age}&gender=${gender}&bar=${bar}`,{replace:true});
  }

  return (
    <div className='flex flex-wrap items-center justify-center m-10'>
      <div className='m-3'>
        <label>From: </label>
        <input
        className='border-2 border-black ml-1'
          type="date"
          value={startValue}
          onChange={handleStartDateChange}
          max={endValue} // The max allowed "From" date is the selected "To" date
        />
      </div>

      <div className='m-2'>
        <label>To: </label>
        <input
        className='border-2 border-black ml-2'
          type="date"
          value={endValue}
          onChange={handleEndDateChange}
          min={startValue} // The min allowed "To" date is the selected "From" date
          disabled={!startValue} // Disable the "To" date until "From" is selected
        />
      </div>
      <div className='m-2'>
        <label>Age:</label>
        <input onChange={(e)=>setAge(e.target.value)} className='border-2 border-black ml-1' type="number" placeholder='20' min={15} max={30} value={ageValue}/>
      </div>
      <div className='m-2'>
        <label>Gender:</label>
        <input onChange={(e)=>setGender(e.target.value)} className='border-2 border-black ml-1' type="text" placeholder='Gender' value={genderValue}/>
      </div>
      <button onClick={filterhandler} className='bg-slate-700 text-white px-5 rounded-lg ml-2'>Apply</button>
    </div>
  );
};

export default DateRangePicker;
