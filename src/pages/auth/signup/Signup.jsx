import "./Signup.css";
import React, { useState } from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  //inital the navigation huk
  const navigate = useNavigate();
  //state declaration for user inputs
  const [formData, SetformData] = useState({email:'', name:'', password:''});
  //method for handaling user input
  const handleInputChange = (event) => {
    const {name,value} = event.target;
    SetformData({...formData,[name]:value})
  }

  //method for submit user input into server
  const submitUserInput = async(e) => {
    e.preventDefault();
    //calling api and connected with server
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const result = await response.json();
      console.log(result);
      navigate("/login");
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
        <h1>Signup</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} placeholder="enter email here" onChange={handleInputChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" name="name" value={formData.name} placeholder="enter name here" onChange={handleInputChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} placeholder="enter password here" onChange={handleInputChange}/>
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">Signup</Button>
      </Form>
    </div>
  )
}

export default Signup;