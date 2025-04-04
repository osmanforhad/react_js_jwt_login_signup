import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Col, Container, Row, Table} from "react-bootstrap";

const Dashboard = () => {
  //check the user is authenticated or not
  const token = localStorage.getItem("token");
  //setup state
  const [users, Setusers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //method for fetching users frob db
    const fetchUsers = async() => {
      try {
        //caaling the api
       const response =  await fetch("http://localhost:8000/api/users", {
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        const result = await response.json();
        Setusers(result);
      } catch (error) {
        console.error(error);
      }
    }
    //if the user is authorized then show data
    if(token){
      fetchUsers();
    } else{
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <Container className="mt-5">
      <Row>
        <Col>
        <h1 className="text-center">Dashboard</h1>
        <Table striped borderd hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard;