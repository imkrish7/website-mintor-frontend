import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styles from './styles/app.module.scss';
import List from './views/List';
import Add from './views/Add';
import Detail from './views/Details';

function App() {
	const [toggleAdd, setToggleAdd] = useState(false);

	return (
		<Router>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.wrapper}>
					<h1 className={styles.header_text}>Moniter</h1>
					</div>
				</div>
				<main className={styles.main}>
					<Switch>
						<Route exact path="/" component={List}></Route>
						<Route exact path="/add" component={Add}></Route>
						<Route exact path="/:name" component={Detail} />
					</Switch>
				</main>
				<div className={styles.btn_wrapper}>
					{!toggleAdd ? (
						<Link to="/add" className={styles.link}>
							<button onClick={() => setToggleAdd(!toggleAdd)} className={styles.btn}>
								+
							</button>
						</Link>
					) : (
						<Link to="/" className={styles.link}>
							<button onClick={() => setToggleAdd(!toggleAdd)} className={styles.btn}>
								x
							</button>
						</Link>
					)}
				</div>
			</div>
		</Router>
	);
}

export default App;
