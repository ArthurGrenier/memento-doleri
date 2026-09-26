import Footer from "../components/Footer.jsx";
import './Settings.css';
import {useState} from "react";
import {useLanguage} from "../components/LanguageContext.jsx";

function Settings({footerPosition, updateFooterPosition}) {
	const isTop = footerPosition === 'top';
	const {language, changeLanguage, t} = useLanguage();

	function handleToggle() {
		updateFooterPosition(isTop ? "bottom" : "top");
	}

	function handleLanguageChange(event) {
		setLanguage(event.target.value);
	}

	return (
		<main className="page">
			<div className="background" />

			<div className="hero">
				<h1>{t("settings.title")}</h1>
				<div className="setting-box">
					<div className="setting-row">
							<span>{t("settings.footer_top")}</span>

							<label className="switch">
								<input
									type="checkbox"
									checked={isTop}
									onChange={handleToggle}
								/>
								<span className="slider" />
							</label>
					</div>
					<div className="setting-row">
						<label htmlFor="language">{t("settings.language")}</label>

						<select
							id="language"
							value={language}
							onChange={(event) =>
								changeLanguage(event.target.value)}
							className="language-select"
						>
							<option value="en">English</option>
							<option value="fr">Français</option>
						</select>
					</div>
				</div>
			</div>

			<Footer footerPosition={footerPosition} />
		</main>
	)
}

export default Settings;