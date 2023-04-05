/**
 *
 * PageLoader
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Dimmer = styled.div`
  display: flex;
  opacity: 1;
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 1em;
  line-height: 1;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-transition: background-color 0.5s linear;
  transition: background-color 0.5s linear;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  will-change: opacity;
  z-index: 1;

  &:before {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const Loader = styled.div`
   display: block;
   position: absolute;
   top: 50%;
   left: 50%;
   margin: 0;
   text-align: center;
   z-index: 1000;
   -webkit-transform: translateX(-50%) translateY(-50%);
   transform: translateX(-50%) translateY(-50%);
   width: 2.28571429rem;
   height: 2.28571429rem;
   font-size: 1em;
   color: #0395d0;
 
   &:before {
     position: absolute;
     content: '';
     top: 0;
     left: 50%;
     width: 100%;
     height: 100%;
     border-radius: 500rem;
     border: .2em solid rgba(0,0,0,.1);
   }
 
   &:after {
     position: absolute;
     content: '';
     top: 0;
     left: 50%;
     width: 100%;
     height: 100%;
     -webkit-animation: loader .6s linear;
     animation: loader .6s linear;
     -webkit-animation-iteration-count: infinite;
     animation-iteration-count: infinite;
     border-radius: 500rem;
     border-color: #0d969c transparent transparent;
     border-style: solid;
     border-width: .2em;
     -webkit-box-shadow: 0 0 0 1px transparent;
     box-shadow: 0 0 0 1px transparent;
   }
 
   @keyframes loader {
     0% {
       transform: rotate(0deg);
     }
     100% {
       transform: rotate(360deg);
     }
   }
 }
 `;

function PageLoader() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Dimmer>
        <Loader />
      </Dimmer>
    </div>
  );
}

PageLoader.propTypes = {};

export default PageLoader;
