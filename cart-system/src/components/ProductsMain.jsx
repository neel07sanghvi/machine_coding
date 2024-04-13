import React, { useCallback, useEffect, useRef, useState } from "react";
import Product from "./ProductItem";
import { useThemeCtx } from "../contexts/ContextPlus";
import { useWindowResize } from "../hooks/HookPlus";

const ProductsMain = ({
	loading,
	products,
	originalProducts,
	cbSetProducts,
}) => {
	const themeCtx = useThemeCtx();
	const inputRef = useRef();

	const { isMobile, isTablet } = useWindowResize();

	const handleSearch = (value) => {
		if (value && originalProducts.current) {
			const newValue = value.split(" ").map((str) => str.toLowerCase());

			const filteredProducts = [];

			Object.values(originalProducts.current).forEach((product) => {
				const isAppearedInSearch = newValue.some(
					(str) =>
						str.includes(product.name.toLowerCase()) ||
						str.includes(product.type.toLowerCase()) ||
						str.includes(product.color.toLowerCase())
				);

				if (isAppearedInSearch) {
					filteredProducts.push(product);
				}
			});

			cbSetProducts(filteredProducts);
		}

		inputRef.current.value = null;
	};

	useEffect(() => {
		const handleInputEnter = (e) => {
			if (e.key === "Enter") {
				handleSearch(inputRef.current.value);
			}
		};

		inputRef.current.addEventListener("keydown", handleInputEnter);

		return () => {
			inputRef.current.removeEventListener("keydown", handleInputEnter);
		};
	}, []);

	return (
		<div
			style={{
				height: "100%",
				width: "80%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingTop: "30px",
			}}
		>
			<div
				style={{
					display: "flex",
					height: "40px",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<input
					ref={inputRef}
					type="search"
					name="search"
					id="product-search"
					placeholder="Search for products..."
					style={{
						height: "100%",
						padding: "10px",
						border: "none",
						borderBottom: "1px solid black",
						outline: "none",
					}}
				/>
				<p
					style={{
						backgroundColor: themeCtx.darkBgColor,
						padding: "10px",
						color: "white",
						marginLeft: "5px",
						cursor: "pointer",
					}}
					onClick={() => handleSearch(inputRef.current.value)}
				>
					🔍
				</p>
			</div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: isTablet
							? "1fr 1fr"
							: isMobile
							? "1fr"
							: "1fr 1fr 1fr",
						gap: "20px",
						marginTop: "50px",
					}}
				>
					{products && products.length > 0 ? (
						products?.map((product) => (
							<Product product={product} key={product.id} />
						))
					) : (
						<div> Opps! No products found!</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ProductsMain;
