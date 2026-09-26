import Footer from "../components/Footer.jsx";
import {useLanguage} from "../components/LanguageContext.jsx";

function Result({footerPosition, score, totalQuestions}) {
	const { t } = useLanguage();
	const scorePercentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

	function getResultComment() {
		if (scorePercentage === 100) {
			return t("result.comment_perfect");
		}

		if (scorePercentage >= 95) {
			return t("result.comment_tremendous");
		}

		if (scorePercentage >= 65) {
			return t("result.comment_very_good");
		}

		if (scorePercentage >= 55) {
			return t("result.comment_good");
		}

		if (scorePercentage >= 40) {
			return t("result.comment_ok");
		}

		if (scorePercentage >= 20) {
			return t("result.comment_not_that_good");
		}

		if (scorePercentage >= 5) {
			return t("result.comment_terrible");
		}

		if (scorePercentage === 0) {
			return t("result.comment_so_bad");
		}
	}

	return (
		<main className="page">
			<div className="background" />
			<div className="hero">
				<h1>{t("result.title")}</h1>
				<p>{t("result.score")} {scorePercentage}%</p>
				<p>{getResultComment()}</p>
			</div>
			<Footer footerPosition={footerPosition} />
		</main>
	)
}

export default Result;