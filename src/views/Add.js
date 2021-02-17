import { Component } from 'react';
import { connect } from 'react-redux';
import { getAdd } from '../actions/userAction';
import styles from '../styles/add.module.scss';
class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			url: '',
			frequency: '',
			hasError: {
				isTrue: false,
				msg: '',
			},
			submit: false,
			success: false,
			validate: false,
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.addResponse &&
			this.props.addResponse &&
			this.props.addResponse.error &&
			this.props.addResponse !== prevProps.addResponse
		) {
			this.setState({
				hasError: {
					isTrue: true,
					msg: this.props.addResponse.error.data.msg,
				},
			});
		}

		if (
			prevProps.addResponse &&
			this.props.addResponse &&
			this.props.addResponse.success &&
			this.props.addResponse !== prevProps.addResponse
		) {
			this.setState({
				success: true,
			});
		}
	}
	handleChange = (e) => {
		const { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, url, frequency } = this.state;
		const params = { name, url, frequency };
		if(this.urlValidation()){
			this.props.add(params);
			this.setState({
				submit: true,
				name: '',
				url: '',
				frequency: '',
			});
		}
		
	};

	back = () => {
		this.setState({
			submit: false,
			hasError: {
				isTrue: false,
				msg: '',
			},
		});
	};

	urlValidation = () => {
		let {url} = this.state;
		if (url.length > 0) {
			let ws = url.match(/w/g);
			let dots = url.match(/\./g);
			let http = url.match(/^https?:\/\//g);
			return ws && ws.length === 3 && dots && dots.length === 2 && http && http.length === 1;
		}
	};

	render() {
		return (
			<div className={styles.container}>
				{this.state.success && (
					<div className={styles.success}>
						<h1 className={styles.success_text}>Congratulation!</h1>
						<p className={styles.subheader}>Website successfuly added.</p>
						
					</div>
				)}
				{this.state.hasError.isTrue && (
					<div className={styles.error}>
						<h1 className={styles.error_text}>Oops!</h1>
						<p className={styles.subheader}>{this.state.hasError.msg}</p>
						<p className={styles.subheader}>Sorry! try to register again..</p>
						<button onClick={this.back} className={styles.back_btn}>
							Back
						</button>
					</div>
				)}
				{!this.state.submit && (
					<div className={styles.form_wrapper}>
						<div className={styles.header}>
							<h1 className={styles.header_text}>Register</h1>
							<p className={styles.subheader}>Add a website to moniter</p>
						</div>
						<form onSubmit={this.handleSubmit} className={styles.form}>
							<section className={styles.input_wrapper}>
								<input
									required
									name="name"
									onChange={this.handleChange}
									value={this.state.name}
									placeholder="Name"
									className={[styles.input].join(' ')}
								></input>
							</section>
							<section className={styles.input_wrapper}>
								<input
									required
									name="url"
									onChange={this.handleChange}
									value={this.state.url}
									placeholder="Enter url"
									className={[styles.input, this.state.url.length > 1 && !this.urlValidation() ? styles.red : ''].join(' ')}
								></input>
									{this.state.url.length > 0 && !this.urlValidation() && <label className={styles.warning}>URL should be like this "http[s]?://www.xyz.com"</label>}
							</section>
							<section className={styles.input_wrapper}>
								<input
									name="frequency"
									onChange={this.handleChange}
									value={this.state.frequency}
									placeholder="Frequency(optional)"
									className={styles.input}
								></input>
							
							</section>
							<section className={styles.btn_wrapper}>
								<button className={styles.btn}>Submit</button>
							</section>
						</form>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		addResponse: state.addResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		add: (params) => dispatch(getAdd(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
