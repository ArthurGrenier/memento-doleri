import '../App.css';
import Footer from '../components/Footer';
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../components/LanguageContext.jsx";

function Home({footerPosition}) {

	const navigate = useNavigate();
	const { t } = useLanguage();

	function handleClick() {
		navigate("/quiz");
	}

	return (
		<main className="page">
			<div className="background" />

			<div className="hero">
				<h1>{t("home.title")}</h1>

				<button className="start-button" onClick={handleClick}>{t("home.button")}</button>
			</div>
			<Footer footerPosition={footerPosition} />
		</main>
	)
}

export default Home;