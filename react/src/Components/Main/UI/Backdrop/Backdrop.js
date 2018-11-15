import React from 'react';
import classes from './Backdrop.css';

const Backdrop = (props) =>  props.show ? <div onClick={props.hide} className={classes.Backdrop}></div> : null;

export default Backdrop;
