import React from "react";
import { Link } from "react-router-dom";

import { Container } from "react-bootstrap";

/**
 * @todo add functionality to buttons
 */
export const Header = () => {
  return (
    <Container style={style.container}>
      <a href="/" style={{ fontWeight: 'bold' }, style.a}>Hacker News</a>
      <p>new</p>
      <p >|</p>
      <p>past</p>
      <p>|</p>
      <p>comments</p>
      <p>|</p>
      <p>ask</p>
      <p>|</p>
      <p>show</p>
      <p>|</p>
      <p>jobs</p>
      <p>|</p>
	  <a href="/post" style={style.a}> submit </a>      
	  <p>|</p>
      <a href="/login" style={style.a}>login</a>
    </Container>
  )
};

const style = {
  container: {
    display: 'flex',
    backgroundColor: '#ff6600',
    paddingTop: '0px',
    paddingBottom: '0px',
    justifyContent: 'space-between'
  },
  a: {
    textDecoration: 'none',
    color: 'inherit'
  }
}

export default Header;
