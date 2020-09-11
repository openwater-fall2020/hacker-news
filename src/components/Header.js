import React from "react";
import { Container } from "react-bootstrap";

/**
 * @todo add functionality to buttons
 */
export const Header = () => {
  return (
    <Container style={style.container}>
      <p style={{ fontWeight: 'bold' }}>Hacker News</p>
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
      <p>submit</p>
      <p>|</p>
      <p>login</p>
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
  }
}

export default Header;