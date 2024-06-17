import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

//third-party
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

//images
import Logo from '../assets/logo.svg'
import { loginRoute } from '../utils/APIRoutes'

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    password: ''
  })
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
    }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      const { username, password } = values
      const { data } = await axios.post(loginRoute, {
        username,
        password
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      } else {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }
  const handleValidation = () => {
    const { username, password } = values

    if (username.trim().length === 0 || password.trim().length === 0) {
      toast.error(
        'Email and password required',
        toastOptions
      )
      return false
    }
    return true
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      img {
        height: 5rem;
      }
      h1 {
        color: white;
        text-transform: uppercase;
      }
    }
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`
export default Login
