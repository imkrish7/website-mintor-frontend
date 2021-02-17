import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll } from '../actions/userAction';
import Card from './Card';
import styles from '../styles/list.module.scss';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			websites: [],
		};
	}

	componentDidMount() {
		this.props.getAll({});
	}

	componentDidUpdate(prevprops, prevState) {
		if (
			this.props.allResponse &&
			this.props.allResponse.success &&
			prevprops.allResponse &&
			this.props.allResponse !== prevprops.allResponse &&
			this.props.allResponse.data &&
			this.props.allResponse.data.data
		) {
			this.setState({
				websites: [...this.props.allResponse.data.data],
			});
		}
	}

	render() {
		return (
			<div className={styles.container}>
				{' '}
				{this.state.websites.length > 0 &&
					this.state.websites.map((entity, index) => {
						return <Link key={index} className={styles.link} to={`/${entity.name}`}><Card  data={entity} /></Link>;
					})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allResponse: state.getAllResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAll: (params) => dispatch(getAll(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
