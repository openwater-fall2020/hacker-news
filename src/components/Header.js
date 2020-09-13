import React from "react";
import { Container } from "react-bootstrap";
import Cookies from 'js-cookie';

/**
 * @todo add functionality to buttons
 */
export const Header = () => {
  return (
    <Container style={style.container}>
      <a href="/" style={style.aBold}>Hacker News</a>
      <a href="/post" style={style.a}> submit </a>
      <p style={style.p}>|</p>
      {Cookies.get('username') ?
        <p style={style.p}>{Cookies.get('username')}</p>
        :
        <a href="/login" style={style.a}>login</a>
      }
    </Container>
  )
};

const style = {
  container: {
    display: 'flex',
    backgroundColor: '#ff6600',
    paddingTop: '0px',
    paddingBottom: '0px',
    justifyContent: 'flex-start'
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: '10px'
  },
  aBold: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: '10px',
    fontWeight: 'bold',
  },
  p: {
    marginRight: '10px'
  }
}

export default Header;
