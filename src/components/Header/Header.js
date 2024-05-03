import React from 'react';
import * as style from './Header.module.css';
import { DataContext } from '../DataProvider';

import styled from 'styled-components'

function Header() {
  const { randomItem, setApiWasRequested, setRequestWasHandled } = React.useContext(DataContext);

  function handleClick() {
    console.log('handling click')
    setApiWasRequested(true);
    setRequestWasHandled(false);
  }

  return (
    <>
      <header className={`${style.header} ${true ? style.headerSuccess : ''}`}>
        <h1>James Shapiro</h1>
      </header>
      <span>
        Invisible
        <span className={style.invisiblePlaceholder}>PLACEHOLDER</span>
        placeholder
        <span className={style.invisiblePlaceholder}>DEMO</span>
        Demo
      </span>
        
      <Button onClick={handleClick}>Invoke API (see console)</Button>
      <span>Random Data Context Item: {randomItem}</span>
    </>
  );
}

export default Header;

const Button = styled.button`
  padding: 20px;
  background-color: hsl(217, 100%, 61%);
  color: white;
  width: fit-content;
  border-radius: 8px;
  margin: 100px auto;
  border: 2px solid black;
`
