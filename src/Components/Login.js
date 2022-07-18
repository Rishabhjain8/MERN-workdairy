import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const {showMessage} = props;
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const data = await response.json();
          if(data.success){
            localStorage.setItem('token', data.authToken);
            navigate("/");
            showMessage("Logged In successfully", "success");
          }
          else{
            showMessage("Invalid Credentials", "danger");
          }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-3'>
            <h2 className='mt-3' style={{color: props.mode === 'dark'?'white':'black'}}>Login to start your journey with WorkDiary</h2>
            <form className='mt-2'  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{color: props.mode === 'dark'?'white':'black'}}>Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{color: props.mode === 'dark'?'white':'black'}}>Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login