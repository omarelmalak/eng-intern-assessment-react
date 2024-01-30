import React from 'react';
import { useState } from "react";
import StopWatch from './components/StopWatch';
import LapResetButton from './components/buttons/LapResetButton';
import StartStopButton from './components/buttons/StartStopButton';
import 'bootstrap/dist/css/bootstrap.css';
import styled from "styled-components";


export default function App() {
  const lightModeBackground = {
    fontFamily: 'Tahoma',
    fontSize: '100px',
    fontWeight: 'bold',
    minWidth: '100%',
    minHeight: '100vh',


    // linear-gradient(to top, transparent, #9bce39, #87ceeb)
    background: 'linear-gradient(to bottom right,rgba(34, 224, 114, 0.5) 0%, transparent 25%), linear-gradient(to bottom left, rgba(155, 206, 57, 0.6) 0%, transparent 25%), linear-gradient(to bottom, rgba(172, 236, 250, 1) 0%, transparent 50%), linear-gradient(to top, rgba(244, 255, 249, 0.8) 100%, transparent 100%)',
    color: '#000000',
    outline: 'none',

  }

  const currentMode = lightModeBackground;

  // CREATE STYLED TEXTS USING npm package "styled-components"
  const H1StyledText = styled.h1`

  font-family: 'Verdana';
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  line-height: 1.5;
  text-align: center;
`;

  const H2StyledText = styled.h1`

  font-family: 'Verdana';
  font-size: 40px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
`;

  const H3StyledText = styled.h1`

  font-family: 'Verdana';
  font-size: 20px;
  line-height: 1;
  text-align: center;
`;

  return (
    <div className="container text-center" style={currentMode}>
      <div className="container" style={{ height: '2vh' }}></div>
      <img src={"https://i.imgur.com/gQLIYSm.png"} alt="" />
      <H1StyledText>
        watchify
      </H1StyledText>


      <H2StyledText>
        The *unofficial* stopwatch partner of Shopify
      </H2StyledText>


      <H3StyledText>
        by Omar El Malak
      </H3StyledText>



      <div className="container" style={{ height: '5vh' }}></div>
      <StopWatch></StopWatch>


    </div>
  );
}