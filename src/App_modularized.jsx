import React, { useRef } from 'react';
import { useAFMState } from './state/useAFMState';
import Slide0 from './slides/Slide0';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';
import Slide16 from './slides/Slide16';
import Slide17 from './slides/Slide17';
import Slide18 from './slides/Slide18';
import Slide19 from './slides/Slide19';

export default function AFMLearningApp() {
  const state = useAFMState();
  const slideRefs = useRef([...Array(20)].map(() => React.createRef()));

  const slides = [
    <Slide0 refProp={slideRefs.current[0]} {...state} />,
    <Slide1 refProp={slideRefs.current[1]} {...state} />, 
    <Slide2 refProp={slideRefs.current[2]} {...state} />, 
    <Slide3 refProp={slideRefs.current[3]} {...state} />, 
    <Slide4 refProp={slideRefs.current[4]} {...state} />, 
    <Slide5 refProp={slideRefs.current[5]} {...state} />, 
    <Slide6 refProp={slideRefs.current[6]} {...state} />, 
    <Slide7 refProp={slideRefs.current[7]} {...state} />, 
    <Slide8 refProp={slideRefs.current[8]} {...state} />, 
    <Slide9 refProp={slideRefs.current[9]} {...state} />, 
    <Slide10 refProp={slideRefs.current[10]} {...state} />, 
    <Slide11 refProp={slideRefs.current[11]} {...state} />, 
    <Slide12 refProp={slideRefs.current[12]} {...state} />, 
    <Slide13 refProp={slideRefs.current[13]} {...state} />, 
    <Slide14 refProp={slideRefs.current[14]} {...state} />, 
    <Slide15 refProp={slideRefs.current[15]} {...state} />, 
    <Slide16 refProp={slideRefs.current[16]} {...state} />, 
    <Slide17 refProp={slideRefs.current[17]} {...state} />, 
    <Slide18 refProp={slideRefs.current[18]} {...state} />, 
    <Slide19 refProp={slideRefs.current[19]} {...state} />
  ];

  return <div>{slides[state.currentSlide]}</div>;
}
