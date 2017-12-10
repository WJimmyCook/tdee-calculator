import React from 'react';

class Day extends React.Component {

  render(){
    return (
      <div className="dayEntry">
        <input value={this.props.weight}/>
        <input value={this.props.calories}/> 
      </div>
    )
  }
}

const entry = {
  weight: 150,
  calories: 2120
};
