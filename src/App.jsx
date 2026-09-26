import { useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import questions from "./data/questions.json";

import './App.css'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Settings from './pages/Settings.jsx';
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";

function App() {
	const [footerPosition, setFooterPosition] = useState(() => {
		return localStorage.getItem("footerPosition") || 'bottom';
	});
	const [score, setScore] = useState(0);

	function updateFooterPosition(position) {
		setFooterPosition(position);
		localStorage.setItem("footerPosition", position);
	}

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Home footerPosition={footerPosition} />} />
				<Route path="/about" element={<About footerPosition={footerPosition} />} />
				<Route
					path="/settings"
					element={<Settings footerPosition={footerPosition} updateFooterPosition={updateFooterPosition} />}
				/>
				<Route
					path="/quiz"
					element={
						<Quiz footerPosition={footerPosition} setScore={setScore} score={score} questions={questions} />
					}
				/>
				<Route
					path="/result"
					element={
						<Result footerPosition={footerPosition} score={score} totalQuestions={questions.length} />
					}
				/>
			</Routes>
		</HashRouter>
	)
}

export default App
