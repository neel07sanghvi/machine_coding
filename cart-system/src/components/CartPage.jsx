import React from "react";
import Header from "./Header";
import CartMain from "./CartMain";

const CartPage = () => {
	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Header headerType="cart" />
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					marginTop: "50px",
					justifyContent: "space-between",
					overflow: "scroll",
				}}
			>
				<CartMain />
			</div>
		</div>
	);
};

export default CartPage;
