var React = require('react')
var ReactDOM = require('react-dom')

var Hello = React.createClass ({
    render: function() {
        return (
            <h1>
            Hello, React!
            </h1>
        )
    }
})

ReactDOM.render(<Hello />, document.getElementById('container'))


// var React = require('react')
// var ReactDOM = require('react-dom')

// var EntryList = React.createClass({
// 	loadEntriesFromServer: function(){
// 		$.ajax({
// 			url: this.props.url,
// 			datatype: 'json',
// 			cache: false,
// 			success: function(data) {
// 				this.setState({data: data});
// 			}.bind(this)
// 		})
// 	},

// 	getInitialState: function() {
// 		return {data: []};
// 	},

// 	componentDidMount: function() {
// 		this.loadEntriesFromServer();
// 		setInterval(this.loadEntriesFromServer, this.props.pollInterval)
// 	},
// 	render: function() {
// 		if(this.state.data){
// 			console.log('Data!')
// 			var entryNodes = this.state.data.map(function(entry){
// 				return <li> {entry.weight} </li>
// 			})
// 		}
// 		return (
// 			<div>
// 				<h1>Hello React!</h1>
// 				<ul>
// 					{entryNodes}
// 				</ul>
// 			</div>
// 		)
// 	}
// })

// ReactDOM.render(<EntryList url='/api/' pollInterval={1000} />, document.getElementById('container'))