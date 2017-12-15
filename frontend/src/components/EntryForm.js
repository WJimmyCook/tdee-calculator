import React, {Component} from 'react'
import { Alert, Button, Jumbotron,  Form } from 'reactstrap';
import { postEntryAction } from '../actions/entries';
import { connect } from 'react-redux';

import TextInput from './TextInput'

export default class EntryForm extends Component {
  state = {
    date: null,
    weight: '',
    calories: ''
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type ===
        'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    // this.primaryInput.focus();
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.date, this.state.weight, this.state.calories)
  }

  render() {
    const errors = this.props.errors || {}

    return (
        <Form onSubmit={this.onSubmit}>
          <h1>Create Entry</h1>
          {errors.non_field_errors?<Alert color="danger">{errors.non_field_errors}</Alert>:""}
          <TextInput name="weight" label="Weight" error={errors.weight} getRef={input => this.primaryInput = input} onChange={this.handleInputChange}/>
          <TextInput name="calories" label="Calories" error={errors.calories} onChange={this.handleInputChange}/>
          <Button type="submit" color="primary" size="lg">Submit</Button>
        </Form>
    )
  }
}
