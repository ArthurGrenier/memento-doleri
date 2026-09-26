import { createContext, useContext, useState } from "react";
import translations from "../data/translation.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
	const [language, setLanguage] = useState(() => {
		return localStorage.getItem("language") || "en";
	});

	function changeLanguage(newLanguage) {
		setLanguage(newLanguage);
		localStorage.setItem("language", newLanguage);
	}

	function t(path) {
		const keys = path.split(".");

		return keys.reduce(
			(object, key) => object?.[key],
			translations[language]
		) || path;
	}

	return (
		<LanguageContext.Provider
			value={{
				language,
				changeLanguage,
				t,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	return useContext(LanguageContext);
}
