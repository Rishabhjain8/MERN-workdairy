// import logo from './logo.svg';
import './App.css';
import { Navbar } from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './Components/Home';
import { About } from './Components/About';
import NoteState from './context/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Alert from './Components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState('light');

  const showMessage = ((mesaage, type) => {
    setAlert({
      msg: mesaage,
      type: type
    })

    setTimeout(() =>{
      setAlert(null);      
    }, 1500)
  })

  const onToggleMode = () => {
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = "#042743";
      showMessage('Dark mode is enabled', 'success');
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = "white";
      showMessage('Light mode is enabled', 'success');
    }
  }

  return (
    <NoteState>
    <Router>
      <Navbar showMessage = {showMessage} mode={mode} onToggleMode={onToggleMode}/>
      <Alert alert = {alert}/>
      <Routes>
        if(localStorage.getItem('token')){
          <Route exact path = "/" element={<Home showMessage={showMessage} mode={mode}/>} />
        }
        else{
          <Route exact path = "/login" element={<Login showMessage={showMessage} mode={mode}/>} />
        }
        <Route exact path = "/about" element={<About mode={mode}/>}/>
        <Route exact path = "/login" element={<Login showMessage={showMessage} mode={mode}/>}/>
        <Route exact path = "/signup" element={<SignUp showMessage={showMessage} mode={mode}/>}/>
      </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
