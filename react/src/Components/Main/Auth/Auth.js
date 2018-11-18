import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Auth.css';
import axios from 'axios';

export class Auth extends Component {
  
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  inputChangedHandler = (event, ctrlName) => {
    const updatedControls = {
      ...this.state.controls,
      [ctrlName]: {
        ...this.state.controls[ctrlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[ctrlName].validation),
        touched: true
      }
    }

    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    if(this.state.isSignup) {
      axios.post('http://localhost:5000/auth/signin', {
        name: this.state.controls.name.value,
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      }).then(res => {
        localStorage.setItem('userId', res.data._id);
        this.props.history.push('/main');
      }).catch(err => console.log(err));
    } else {
      axios.post('http://localhost:5000/auth/login', {
        username: this.state.controls.email.value,
        password: this.state.controls.password.value
      }).then(res => {
        localStorage.setItem('userId', res.data._id);
        this.props.history.push('/main');
      }).catch(err => console.log(err))
    }
  }

  changeAuthState = () => {
    const authState = !this.state.isSignup;
    this.setState({ isSignup: authState });
  }
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));  

    return (
      <div className='Authenticate'>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
        </form>
        <Button btnType="Danger" clicked={this.changeAuthState}>{!this.state.isSignup ? 'Or SIGNUP' : 'Or SIGNIN'}</Button>
      </div>
    );
  }
}

export default Auth;
