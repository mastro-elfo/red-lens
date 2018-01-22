import React, { Component } from 'react';
import styles from './App.css';
import ReactCenter from 'react-center';

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			width: 0,
			height: 0,
			filter: 1
		}
	}

	componentDidMount(){
		navigator.getMedia = ( navigator.getUserMedia ||
	                           navigator.webkitGetUserMedia ||
	                           navigator.mozGetUserMedia ||
	                           navigator.msGetUserMedia);

		navigator.getMedia({
			video: true,
			audio: false
		}, (stream) => {
			if (navigator.mozGetUserMedia) {
   	        	this.refs.video.mozSrcObject = stream;
   	        }
			else {
				this.refs.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
   	        }
			this.refs.video.play();
		}, (err) => {
			console.log("An error occured! " + err);
		});

		this.refs.video.addEventListener('canplay', (ev) => {
			// const windowWidth = window.innerWidth;
			// const windowHeight = window.innerHeight;
			this.setState({
				width: this.refs.video.videoWidth,
				height: this.refs.video.videoHeight
			});
		});
	}

	componentWillUnmount(){}

	render() {
		return (
			<div className="App" style={styles.App}>
				<ul className="Filters" style={styles.Filters}>
					<li onClick={()=>this.setState({filter: 0})} className={this.state.filter === 0 ? 'selected' : ''}><span>&times;</span></li>
					<li onClick={()=>this.setState({filter: 1})} className={this.state.filter === 1 ? 'selected' : ''}><span>1</span></li>
					<li onClick={()=>this.setState({filter: 2})} className={this.state.filter === 2 ? 'selected' : ''}><span>2</span></li>
				</ul>
				<ReactCenter className="Center" style={styles.Center}>
					<video ref="video" className={'filter'+this.state.filter}>Video stream not available.</video>
				</ReactCenter>
			</div>
		);
	}
}

export default App;
