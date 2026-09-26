import { Link } from 'react-router-dom';
import './Footer.css';
import {useLanguage} from "./LanguageContext.jsx";

function Footer({footerPosition}) {
	const { t } = useLanguage();

	return (
		<footer
			className={`footer footer-${footerPosition}`}
			// style={{order: -1}}
		>
			<Link to="/">{t("footer.home")}</Link>
			<Link to="/about">{t("footer.about")}</Link>
			<Link to="/settings">{t("footer.settings")}</Link>
		</footer>
	)
}

export default Footer;