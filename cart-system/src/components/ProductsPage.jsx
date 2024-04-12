import React from "react";
import Header from "./Header";
import ProductsFilter from "./ProductsFilter";
import ProductsMain from "./ProductsMain";

const ProductsPage = () => {
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
					justifyContent: "space-between",
					overflow: "auto",
				}}
			>
				<ProductsFilter />
				<ProductsMain />
			</div>
		</div>
	);
};

export default ProductsPage;
