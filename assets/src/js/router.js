import React, { Component } from 'react';
import { connect } from 'react-redux'
import initial from 'modules'

class Router extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	console.log(this.props);
    return (<div>
    	<p>{this.props.loading}</p>
    </div>);
  }
}
function mapStateToProps(state) {
	console.log(state.initial.loading);
  return { loading: state.initial.loading }
}
// function mapActionToProps(action) {
// 	return {
// 		loading: action.loading
// 	}
// }
export default connect(mapStateToProps)(Router)

