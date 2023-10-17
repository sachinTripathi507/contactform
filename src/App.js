import React, { useState } from 'react';
import './App.css';
import Gmail from './gmail.png';
import Phone from './number.png';
import Name from './name.png';
import Loadingcomponent from './Loading';

const key = '';//paste your apilayer api key
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const App = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handler(e) {
    let el = document.getElementById(e.target.name);
    let data = e.target.value;
    // console.log(data);
    if (el.id === 'name') {
      setName(data);
      if (data.length > 2) {

        el.style.border = '2px solid green';
      } else el.style.border = '2px solid red';
    }
    else if (el.id === 'mail') {
      setMail(data);
      if (emailRegex.test(data)) {
        el.style.border = '2px solid green'
      } else el.style.border = '2px solid red'

    }
    else if (el.id === 'number') {
      setNumber(data);
      if (data.length === 10) {
        el.style.border = '2px solid green'
      } else el.style.border = '2px solid red'

    }
    else if (el.id === 'message') {
      setMessage(data);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("apikey", key);

    var raw = {
      name: name,
      email: mail,
      number: number,
      message: message,
    }

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: raw,
    };

    fetch(`https://api.apilayer.com/mem_db/lpush/${key}`, requestOptions)
    .then(response => {
        setLoading(false);
        
        if (response.status === 200) {
          alert("you have succesfully registered");
          return response.json();
        }
      })
      .then(result => alert(`you are ${result.items} in the queue`))
      .catch
      (error =>{ 
        setLoading(false);
        console.log('error', error)});
  }

  return (
    <div className='app'>
      {loading?(
        <Loadingcomponent/>):
      (
    <div className='main'>
      <div className='form'>
        <h2>send us a message</h2>
        <p>you can contact us with anything related toour products. <br></br>we'll get in touch with you as soon as possible.</p>
        <form>
          <label >Your Name</label><br></br>
          <div className='data' id='name'>
            <img src={Name} className='logo' alt='name'></img>
            <input type='text' name='name' placeholder='name here..' onChange={handler} required></input><br></br>
          </div>
          <label >Email address</label> <br></br>
          <div className='data' id='mail'>
            <img src={Gmail} alt='mail' className='logo'></img>
            <input type='gmail' name='mail' placeholder='Email here..' onChange={handler} required></input><br></br>
          </div>
          <label>Phone</label> <br></br>
          <div className='data' id='number'>
            <img src={Phone} className='logo' alt='call'></img>
            <input type='number' src='' name='number' placeholder='Number here..' onChange={handler} required></input><br></br>
          </div>
          <label >Your Message</label><br></br>
          <div>
            <input type='text' id='message' name='message' required onChange={handler}></input><br></br>
          </div>
          <button type="submit" className='alert' onClick={handleSubmit}>contact us</button>
        </form>
      </div>
      <div className='info'>
        <div className='one'>
          <img src={Gmail} alt='source' className='logo1'></img>
          <h3 >Find us at the office</h3>

        </div>
        <p>adsfg gfdgfg jghjngnyh<br></br>
          244656 fdfdd<br></br>
          romania</p>
        <div className='one'>
          <img src={Gmail} alt='source' className='logo1'></img>
          <h3>Give us a ring</h3>
        </div>
        <p>adsfg gfdgfg jghjngnyh<br></br>
          244656 fdfdd<br></br>
          romania</p>
        <div className='one'>
          <img src={Gmail} alt='source' className='logo1'></img>
          <h3>legal information</h3>
        </div>
        <p>adsfg gfdgfg jghjngnyh<br></br>
          244656 fdfdd<br></br>
          romania</p></div>
    </div>
    )}
    </div>

  )
}

export default App