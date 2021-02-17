import { Component } from 'react';
import styles from '../styles/card.module.scss'
class Card extends Component{

	constructor(props){
		super(props);

	}

	render(){
		return <div className={styles.container}>
			<h2 className={styles.name}>{this.props.data && this.props.data.name}</h2>
			<p className={styles.subheader}>{ this.props.data && this.props.data.url}</p>
		</div>
	}
}


export default Card;
