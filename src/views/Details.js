import { Component } from 'react';
import styles from '../styles/detail.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetail } from '../actions/userAction';

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: {
				isTrue: false,
				msg: '',
			},
			data: null,
			status: [],
		};
	}

	componentDidMount() {
		const { name } = this.props.match.params;
		this.props.getDetail({ name });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.detail && this.props.detail.success && this.props.detail != prevProps.detail) {
			this.setState({
				data: { ...this.props.detail.data.data },
				status: [...this.props.detail.data.status],
			});
		}

		if (prevProps.detail && this.props.detail.error && this.props.detail != prevProps.detail) {
			this.setState({
				hasError: {
					isTrue: true,
					msg: this.props.detail.error.data.msg,
				},
			});
		}
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.header_wrapper}>
					<h1 className={styles.header_text}>{this.state.data && this.state.data.name}</h1>
					<div className={styles.subdetail}>
						<p className={styles.lastcheck}>
							Latest Status: {this.state.data && this.state.data.latestStatus}
						</p>
						<p className={styles.lastcheck}>
							Last check:{' '}
							{new Date(this.state.data && this.state.data.lastUpdated.toString()).toUTCString()}
						</p>
					</div>
				</div>

				<div className={styles.detail_table}>
					<table className={styles.table}>
						<thead className={styles.thead}>
							<tr className={styles.row}>
								<th className={styles.td}>Date</th>
								<th className={styles.td}>Status</th>
							</tr>
						</thead>
						<tbody className={styles.tbody}>
							{this.state.status.length > 0 &&
								this.state.status.map((entity, index) => {
									return (
										<tr className={styles.row}>
											<td className={styles.td}>
												{entity.createdAt
													? new Date(entity.createAt).toISOString()
													: new Date().toISOString()}
											</td>
											<td className={styles.td}>{entity.status && entity.status}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				<div className={styles.detail}>
					<div className={styles.wrapper}>
						<div className={styles.detail_card}>
							<h3 className={styles.header_text}>Uptime</h3>
							<p className={styles.lastcheck}>
								Count: {this.state.data && this.state.data.upDetail.count}
							</p>
						</div>
						<div className={styles.detail_card}>
							<h3 className={styles.header_text}>Downtime</h3>
							<p className={styles.lastcheck}>
								Count: {this.state.data && this.state.data.downDetail.count}
							</p>
						</div>
					</div>
					<div className={styles.btn_wrapper}>
						<Link to="/" className={styles.back_btn}>
							Back
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		detail: state.detailResponse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDetail: (params) => dispatch(getDetail(params)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
