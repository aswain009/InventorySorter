import logo from './Images/logo.svg';
import './CSS/App.css';
import React, {useEffect, useState} from "react";

function App() {

  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:9000/testAPI')
        .then((res) => res.text())
        .then((data) => setMessage(data))
        .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{message}</h1>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
