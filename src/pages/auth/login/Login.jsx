import React, { useState } from 'react';
import "./Login.css";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Login = () => {
  //inital the navigation huk
  const navigate = useNavigate();
  //state declaration for user inputs
  const [formData, SetformData] = useState({email:'', password:''});
  //method for handaling user input by state
  const handleInputChange = (event) => {
    const {name,value} = event.target;
    SetformData({...formData,[name]:value})
  }

  //method for submit user input into server
  const submitUserInput = async(e) => {
    //calling api and connected with server
    try {
      e.preventDefault();
     await axios.post("http://localhost:8000/api/login", formData)
            .then((response) => {
                toast.success(response.data.message,{position:"top-right"});
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            })   
    } catch (error) {
      console.error(error.message);
    } finally{
      //after submiting clear user input and empty the form fields
      SetformData({
        email:"",
        name:"",
        password:"",
      })
    }
  }
  return (
    <div className="center-from">
      <Form onSubmit={submitUserInput}>
        <h1>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} placeholder="enter email here" onChange={handleInputChange}/>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} placeholder="enter password here" onChange={handleInputChange}/>
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">Login</Button>
      </Form>
    </div>
  )
}

export default Login;