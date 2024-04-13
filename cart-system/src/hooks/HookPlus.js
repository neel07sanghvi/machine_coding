import { useEffect, useState } from "react";

export function useWindowResize() {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	function setWindowType(width) {
		const windowType = getWindowType(width);

		switch (windowType) {
			case "Desktop":
				setIsDesktop(true);
				setIsTablet(false);
				setIsMobile(false);
				break;
			case "Tablet":
				setIsTablet(true);
				setIsDesktop(false);
				setIsMobile(false);
				break;
			case "Mobile":
				setIsMobile(true);
				setIsDesktop(false);
				setIsTablet(false);
				break;
		}
	}

	useEffect(() => {
		function handleChange() {
			setWindowType(window.innerWidth);
		}

		window.addEventListener("resize", handleChange);

		return () => {
			window.removeEventListener("resize", handleChange);
		};
	}, []);

	useEffect(() => {
		setWindowType(window.innerWidth);
	}, []);

	return {
		isMobile,
		isTablet,
		isDesktop,
	};
}

function getWindowType(width) {
	if (width < 1300 && width >= 850) {
		return "Tablet";
	} else if (width < 850) {
		return "Mobile";
	} else {
		return "Desktop";
	}
}
