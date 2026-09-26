import {useEffect, useState} from "react";
import {useLanguage} from "../components/LanguageContext.jsx";
import "../App.css";
import "./Quiz.css";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";

function Quiz({
				footerPosition,
				setScore,
				score,
				questions,
			}) {
	const navigate = useNavigate();
	const {language, t} = useLanguage();

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isValidated, setIsValidated] = useState(false);

	const currentQuestion = questions[currentQuestionIndex];
	const questionTranslation = currentQuestion.translation[language];

	const isLastQuestion =
		currentQuestionIndex === questions.length - 1;

	useEffect(() => {
		setScore(0);
	}, [setScore]);

	function handleAnswerSelect(answerKey) {
		if (isValidated) {
			return;
		}

		setSelectedAnswer(answerKey);
	}

	function handleNextQuestion() {
		if (isLastQuestion) {
			return;
		}

		setCurrentQuestionIndex(
			(previousIndex) => previousIndex + 1
		);

		setSelectedAnswer(null);
		setIsValidated(false);
	}

	function normalizeAnswer(answer) {
		return answer
		.trim()
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	}

	function getOptionText(optionKey) {
		const option = questionTranslation.options.find(
			(option) => Object.keys(option)[0] === optionKey
		);

		return option ? option[optionKey] : "";
	}

	function getAnswerClass(answerKey) {
		if (!isValidated) {
			return selectedAnswer === answerKey
				? "selected"
				: "";
		}

		if (answerKey === questionTranslation.answer) {
			return "correct";
		}

		if (answerKey === selectedAnswer) {
			return "incorrect";
		}

		return "";
	}

	function isCurrentAnswerCorrect() {
		if (currentQuestion.type === "mcq") {
			return selectedAnswer === questionTranslation.answer;
		}

		return (
			normalizeAnswer(selectedAnswer) ===
			normalizeAnswer(questionTranslation.answer)
		);
	}

	function handleValidate() {
		if (!selectedAnswer?.trim() || isValidated) {
			return;
		}

		const isCorrect = isCurrentAnswerCorrect();

		if (isCorrect) {
			setScore((previousScore) => previousScore + 1);
		}

		setIsValidated(true);
	}

	function handleSeeResult() {
		navigate("/result");
	}

	function getCorrectAnswerText() {
		if (currentQuestion.type === "mcq") {
			return getOptionText(questionTranslation.answer);
		}

		return questionTranslation.answer;
	}

	return (
		<main className="page">
			<div className="background" />
			<div className="hero">
				<div className="quiz-page">
					<div className="quiz-card">
						<div className="quiz-card-header">
							<p className="quiz-header-infos">
								{t("quiz.difficulty")}{" "}
								{currentQuestion.difficulty}
							</p>

							<p className="quiz-header-infos">
								{t("quiz.question_number")}{" "}
								{currentQuestionIndex + 1} /{" "}
								{questions.length}
							</p>

							<p className="quiz-header-infos">
								{t("quiz.score")} {score}
							</p>
						</div>

						<h2>{questionTranslation.question}</h2>

						{currentQuestion.type === "mcq" && (
							<div className="answers">
								{questionTranslation.options.map(
									(option) => {
										const answerKey =
											Object.keys(option)[0];

										const answerText =
											option[answerKey];

										return (
											<button
												key={answerKey}
												type="button"
												className={`answer-button ${getAnswerClass(
													answerKey
												)}`}
												onClick={() =>
													handleAnswerSelect(
														answerKey
													)
												}
												disabled={isValidated}
											>
												{answerText}
											</button>
										);
									}
								)}
							</div>
						)}

						{currentQuestion.type === "text" && (
							<input
								type="text"
								className={`text-answer ${
									isValidated
										? isCurrentAnswerCorrect()
											? "correct"
											: "incorrect"
										: ""
								}`}
								placeholder={t("quiz.placeholder")}
								value={selectedAnswer || ""}
								onChange={(event) =>
									setSelectedAnswer(
										event.target.value
									)
								}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										handleValidate();
									}
								}}
								disabled={isValidated}
							/>
						)}

						{!isValidated ? (
							<button
								type="button"
								className="validate-button"
								onClick={handleValidate}
								disabled={!selectedAnswer}
							>
								{t("quiz.validate_response_button")}
							</button>
						) : !isLastQuestion ? (
							<button
								type="button"
								className="validate-button"
								onClick={handleNextQuestion}
							>
								{t("quiz.next_question_button")}
							</button>
						) : (
							<button
								type="button"
								className="validate-button"
								onClick={handleSeeResult}
							>
								{t("quiz.look_result_button")}
							</button>
						)}

						{isValidated && (
							<p
								className={
									isCurrentAnswerCorrect()
										? "feedback correct-text"
										: "feedback incorrect-text"
								}
							>
								{isCurrentAnswerCorrect()
									? t("quiz.good_answer")
									: `${t(
										"quiz.wrong_answer"
									)} ${getCorrectAnswerText()}`}
							</p>
						)}

					</div>
				</div>
			</div>
			<Footer footerPosition={footerPosition} />
		</main>
	);
}

export default Quiz;
