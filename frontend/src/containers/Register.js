import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import RegisterForm from '../components/RegisterForm'
import {register} from  '../actions/auth'
import {authErrors, isAuthenticated} from '../reducers'

const Register = (props) => {
  if(props.isAuthenticated) {
     return  <Redirect to='/' />
  }

  return (
     <div className="register-page">
       <RegisterForm {...props}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  errors: authErrors(state),
  isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (email, username, password) => {
    dispatch(register(email, username, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
