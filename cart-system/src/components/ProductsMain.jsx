import React, { useEffect, useState } from "react";
import Product from "./ProductItem";
import { useThemeCtx } from "../contexts/ContextPlus";

const ProductsMain = () => {
	const URL =
		"https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

	const [loading, setloading] = useState(false);
	const [products, setproducts] = useState();

	const themeCtx = useThemeCtx();

	const fetchProducts = async () => {
		try {
			const response = await fetch(URL);
			const data = await response.json();
			setproducts(data);
		} catch (error) {
			console.log("Error fetching data: ", error);
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {
		setloading(true);
		fetchProducts();
	}, []);

	return (
		<div
			style={{
				height: "100%",
				width: "70%",
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
						gridTemplateColumns: "1fr 1fr 1fr",
						gap: "20px",
						marginTop: "50px",
					}}
				>
					{products?.map((product) => (
						<Product product={product} key={product.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProductsMain;
