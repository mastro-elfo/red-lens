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

		this.clearDisplay();
		this.idle();
	}

	componentWillUnmount(){
		clearTimeout(this.timeout);
	}

	render() {
		return (
			<div className="App" style={styles.App}>
				<ul className="Filters" style={styles.Filters}>
					<li onClick={()=>this.setState({filter: 0})} className={this.state.filter === 0 ? 'selected' : ''}><span>&times;</span></li>
					<li onClick={()=>this.setState({filter: 1})} className={this.state.filter === 1 ? 'selected' : ''}><span>1</span></li>
					<li onClick={()=>this.setState({filter: 2})} className={this.state.filter === 2 ? 'selected' : ''}><span>2</span></li>
				</ul>
				<ReactCenter className="Center" style={styles.Center}>
					<img ref="display" src="" alt="Loading..." className={'filter'+this.state.filter}/>
				</ReactCenter>
				<canvas ref="canvas" width={this.state.width} height={this.state.height}></canvas>
				<video ref="video">Video stream not available.</video>
			</div>
		);
	}

	clearDisplay(){
		let context = this.refs.canvas.getContext('2d');
	    context.fillStyle = "#AAA";
	    context.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
	    this.refs.display.setAttribute('src', this.refs.canvas.toDataURL('image/png'));
	}

	takePicture(){
		this.refs.canvas.getContext('2d').drawImage(this.refs.video, 0, 0, this.state.width, this.state.height);
		this.refs.display.setAttribute('src', this.refs.canvas.toDataURL('image/png'));
	}

	idle() {
		this.timeout = setTimeout(() => {
			this.takePicture();
			this.idle();
		}, 0);
	}
}

export default App;
