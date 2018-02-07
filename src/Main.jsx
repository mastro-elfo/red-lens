import React, { Component } from 'react';
import styles from './App.css';
import ReactCenter from 'react-center';

export default class Main extends Component {
	constructor(props){
		super(props);

		this.state = {
			width: 0,
			height: 0,
			filter: 1
		}
	}

	componentDidMount(){
		// navigator.getMedia = (navigator.getUserMedia ||
	    //                       navigator.webkitGetUserMedia ||
	    //                       navigator.mozGetUserMedia ||
	    //                       navigator.msGetUserMedia);
        //
		// navigator.getMedia({
		// 	video: true,
		// 	audio: false
		// }, (stream) => {
		// 	if (navigator.mozGetUserMedia) {
   	    //     	this.refs.video.mozSrcObject = stream;
   	    //     }
		// 	else {
		// 		this.refs.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
   	    //     }
		// 	this.refs.video.play();
		// }, (err) => {
		// 	console.log("An error occured! " + err);
		// });

		this.refs.videoFilter.addEventListener('canplay', (ev) => {
			this.setState({
				// width: this.refs.video.videoWidth,
				// height: this.refs.video.videoHeight
				width: window.innerWidth,
				height: window.innerHeight
			});
		});

		navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				facingMode: {
					ideal: 'environment'
				},
				width: {
					max: window.innerWidth
				},
				height: {
					max: window.innerHeight
				}
			}
		}).then(stream => {
			this.refs.videoFilter.srcObject = stream;
		}).catch(err => {
			console.log('An error occurred', err);
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
					<video ref="videoFilter" className={'filter'+this.state.filter} autoPlay>Video stream not available.</video>
				</ReactCenter>
			</div>
		);
	}
}
