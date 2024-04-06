import { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./components/Carousel";

function App() {
	const [loading, setloading] = useState(false);
	const [images, setimages] = useState([]);

	const fetchImages = async (imageLimit) => {
		setloading(true);

		try {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/photos?_limit=${imageLimit}`
			);
			const data = await res.json();
			setimages(data);
		} catch (error) {
			console.log("Error fetching images: ", error);
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {
		fetchImages(8);
	}, []);

	return (
		<div className="carousel-container">
			<Carousel
				images={images}
				isLoading={loading}
				onImgClick={(image, index) => {}}
				imagePerSlide={3}
				// customPrevButton={(goToPrev) => (
				// 	<button className="btn prev" onClick={goToPrev}>
				// 		Prev
				// 	</button>
				// )}
				// customNextButton={(goToNext) => (
				// 	<button className="btn next" onClick={goToNext}>
				// 		Next
				// 	</button>
				// )}
			/>
		</div>
	);
}

export default App;
