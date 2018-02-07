import React, { Component } from 'react';
import styles from './App.css';
import ReactCenter from 'react-center';
// import 'font-awesome/css/font-awesome.min.css';
import {ICONS} from './Icons';

export default class Test extends Component {
	constructor(props){
		super(props);

		this.state = {
			width: 0,
			height: 0,
			filter: 1
		}
	}

	componentDidMount(){
		this.refs.videoFilter.addEventListener('canplay', (ev) => {
			this.setState({
				width: this.refs.video.videoWidth,
				height: this.refs.video.videoHeight
			});
		});

		navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				facingMode: {
					ideal: 'environment'
				}
			}
		}).then(stream => {
			this.refs.videoFilter.srcObject = stream;
			this.refs.video.srcObject = stream;
		}).catch(err => {
			console.log('An error occurred', err);
		});
	}

	componentWillUnmount(){}

	render() {
		const LensSize = this.state.width > this.state.height ? this.state.width : this.state.height;
		return (
			<div className="App" style={styles.App}>
				<ul className="Filters" style={styles.Filters}>
					<li onClick={()=>this.setState({filter: 0})} className={this.state.filter === 0 ? 'selected' : ''}><span>&times;</span></li>
					<li onClick={()=>this.setState({filter: 1})} className={this.state.filter === 1 ? 'selected' : ''}><span><img alt="" src={ICONS['magnifier']} style={{width: '1em', height: '1em'}}/></span></li>
				</ul>

				<ReactCenter className="Center" style={styles.Center}>
					<video ref="video" autoPlay style={{width: this.state.width, height: this.state.height}}>Video stream not available.</video>
					<div className="videoContainer" style={{opacity: this.state.filter?1:0, width: LensSize /1.5, height: LensSize /1.5}}>
						<video ref="videoFilter" className={'filter'+this.state.filter} autoPlay style={{width: this.state.width*2, height: this.state.height *2, marginLeft: -this.state.width /1.5, marginTop: -this.state.height /1.5}}>Video stream not available.</video>
					</div>
				</ReactCenter>
			</div>
		);
	}
}


/*
navigator.getMedia = (navigator.getUserMedia ||
					  navigator.webkitGetUserMedia ||
					  navigator.mozGetUserMedia ||
					  navigator.msGetUserMedia);

navigator.getMedia({
	video: true,
	audio: false
}, (stream) => {
	if (navigator.mozGetUserMedia) {
		this.refs.videoFilter.mozSrcObject = stream;
	}
	else {
		this.refs.videoFilter.src = (window.URL || window.webkitURL).createObjectURL(stream);
	}
	this.refs.videoFilter.play();
}, (err) => {
	console.log("An error occured! " + err);
});

this.refs.videoFilter.addEventListener('canplay', (ev) => {
	this.setState({
		// width: this.refs.video.videoWidth,
		// height: this.refs.video.videoHeight
		width: window.innerWidth,
		height: window.innerHeight
	});
});
 */
