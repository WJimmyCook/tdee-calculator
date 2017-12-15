import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import EntryForm from '../components/EntryForm'
import { postEntryAction } from  '../actions/entries'

const PostEntry = (props) => {
  return (
     <div className="entry-page">
       <EntryForm {...props}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  entries: state.entries
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (date, weight, calories) => {
    dispatch(postEntryAction(date, weight, calories))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEntry);
