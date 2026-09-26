import Footer from '../components/Footer.jsx';
import './About.css';
import '../App.css';
import {useLanguage} from "../components/LanguageContext.jsx";

function About({footerPosition}) {
	const { t } = useLanguage();

	return (
		<main className="page">
			<div className="background" />

			<div className="hero">
				<h1>{t("about.title")}</h1>
				<h2>{t("about.warning")}</h2>
				<p className="long-text">{t("about.warning_text")}</p>
				<h2>{t("about.how_it_work")}</h2>
				<p className="long-text">{t("about.how_it_work_text")}</p>
				<h2>{t("about.warning_bis")}</h2>
				<p className="long-text">{t("about.warning_bis_text")}</p>
				<h1>{t("about.acknowledgement")}</h1>
				<p className="long-text">{t("about.acknowledgement_text")}</p>
			</div>

			<Footer footerPosition={footerPosition} />
		</main>
	)
}

export default About;