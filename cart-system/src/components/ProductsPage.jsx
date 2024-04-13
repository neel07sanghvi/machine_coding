import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import ProductsFilter from "./ProductsFilter";
import ProductsMain from "./ProductsMain";

const ProductsPage = () => {
	const URL =
		"https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

	const [loading, setloading] = useState(false);
	const [products, setProducts] = useState();

	const originalProducts = useRef();

	const fetchProducts = async () => {
		try {
			const response = await fetch(URL);
			const data = await response.json();
			setProducts(data);
			originalProducts.current = data;
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
				height: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Header />
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					marginTop: "50px",
					overflow: "auto",
				}}
			>
				<ProductsFilter
				products={products}
					originalProducts={originalProducts.current}
					cbSetProducts={setProducts}
					loading={loading}
				/>
				<ProductsMain
					products={products}
					originalProducts={originalProducts}
					cbSetProducts={setProducts}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default ProductsPage;
