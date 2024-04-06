import React, { useEffect, useRef, useState } from "react";

const Carousel = ({
	images = [],
	isLoading = false,
	imageLimit = images.length,
	imagePerSlide = 1,
	customPrevButton,
	customNextButton,
	onImgClick = () => {},
}) => {
	const imageRef = useRef();

	const [currIndex, setcurrIndex] = useState(0);
	const [imgWidth, setimgWidth] = useState(0);

	const goToPrev = () => {
		setcurrIndex((prev) => (prev === 0 ? imageLimit - 1 : prev - 1));
	};
	const goToNext = () => {
		setcurrIndex((prev) => (prev === imageLimit - 1 ? 0 : prev + 1));
	};

	useEffect(() => {
		if (images.length > 0) {
			setcurrIndex(0);
		}
	}, [images]);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div
			className="carousel"
			style={{
				width: imagePerSlide * imgWidth,
			}}
		>
			<div
				className="image-container"
				style={{
					transform: `translateX(-${currIndex * imgWidth}px)`,
				}}
			>
				{images
					.slice(0, imageLimit > images.length ? images.length : imageLimit)
					.map((image, index) => {
						return (
							<img
								ref={imageRef}
								onLoad={() => setimgWidth(imageRef?.current?.offsetWidth)}
								key={image.id}
								className="image"
								src={image.url}
								alt={image.title}
								onClick={() => onImgClick(image, index)}
							/>
						);
					})}
			</div>
			{customPrevButton instanceof Function ? (
				customPrevButton(goToPrev)
			) : (
				<button
					className="btn prev"
					onClick={goToPrev}
					disabled={currIndex === 0}
					style={{
						backgroundColor: currIndex === 0 ? "grey" : undefined,
						cursor: currIndex === 0 ? "default" : "pointer",
					}}
				>
					Prev
				</button>
			)}
			{customNextButton instanceof Function ? (
				customNextButton(goToNext)
			) : (
				<button
					className="btn next"
					onClick={goToNext}
					disabled={currIndex + imagePerSlide === imageLimit}
					style={{
						backgroundColor:
							currIndex + imagePerSlide === imageLimit ? "grey" : undefined,
						cursor:
							currIndex + imagePerSlide === imageLimit ? "default" : "pointer",
					}}
				>
					Next
				</button>
			)}
		</div>
	);
};

export default Carousel;
