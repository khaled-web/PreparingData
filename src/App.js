import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  //useState
  const [loading, setLoading]=useState(true);
  const [person, setPerson]=useState(null);
  const [title, setTitle]=useState('name');
  const [value, setValue]=useState('random person');

  //preparingTheData
  const getPerson = async ()=>{
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0]
    const{email,phone}=person;
    const{large:image}=person.picture
    const{password}=person.login
    const{first, last}=person.name
    const{age}=person.dob
    const{street:{number, name}}=person.location
    const newPerson ={email, phone, image, password, age, street:`${number},${name}`, name:`${first} ${last}`}
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }
  //useEffect
  useEffect(()=>{
    getPerson()
  },[])

  //eventListener-handleValue
  const handleValue = (e)=>{
    if(e.target.classList.contains('icon')){
      const newValue = e.target.dataset.label;
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  return (
  <main> 
    <div className="block bcg-black"></div>
    <div className="block">
      <div className="container">
        <img src={(person && person.image)||defaultImage} alt="random user" className='user-img'/>
        <p className='user-title'> my {title} is</p>
        <p className='user-value'>{value}</p>
        <div className="values-list">
          <button className='icon' data-label="name" onMouseOver={handleValue}><FaUser/></button>

          <button className='icon' data-label="email" onMouseOver={handleValue}><FaEnvelopeOpen/></button>

          <button className='icon' data-label="age" onMouseOver={handleValue}><FaCalendarTimes/></button>

          <button className='icon' data-label="street" onMouseOver={handleValue}><FaMap/></button>

          <button className='icon' data-label="phone" onMouseOver={handleValue}><FaPhone/></button>

          <button className='icon' data-label="password" onMouseOver={handleValue}><FaLock/></button>
        </div>

      </div>
      <button className='btn' type='button' onClick={getPerson}>
        {loading?'loading':'random user'}
      </button>
    </div>
  </main>
    )
}

export default App
