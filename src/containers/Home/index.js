import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import './style.css'
import {NavLink} from 'react-router-dom';

function Home(props) {

  return (
    <Layout sidebar> 
      {/* <Jumbotron style={{ margin: "5rem", backgroundColor: "#fff" }} className="text-center">
        <h1>Welcome to Admin Dashboard</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      </Jumbotron> */}
    </Layout>
  );
}

export default Home;
