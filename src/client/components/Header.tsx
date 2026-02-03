import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="header">
			<div className="header-content">
				<Link to="/" className="header-logo">
					🎬 Lux Films
				</Link>
				<nav className="header-nav">
					<Link to="/" className="header-link">Home</Link>
					<Link to="/wishlist" className="header-link">Wishlist</Link>
				</nav>
			</div>
		</header>
	);
}
