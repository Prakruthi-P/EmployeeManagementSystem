import React, { useState } from 'react'
import './style.css'
import 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error,setError]=useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3000/auth/adminlogin", values)
            .then(result => {
            if (result.data.loginStatus){
                navigate('/dashboard')
            }else{
                setError(result.data.Error)
            }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center  vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-warning'>
                   <strong> {error && error}</strong>
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'> Email: </label>
                        <input type='email' name="email" autoComplete='off' placeholder='Enter email' className='form-control rounded-0' onChange={(e) => setValues({ ...values, email: e.target.value })}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'> Password: </label>
                        <input type='password' name="password" placeholder='Enter password' className='form-control rounded-0' onChange={(e) => setValues({ ...values, password: e.target.value })}></input>
                    </div>
                    <button className='btn btn-success w-100 rouded-0' >Login</button>
                </form>

            </div>
        </div>
    )
}
export default Login