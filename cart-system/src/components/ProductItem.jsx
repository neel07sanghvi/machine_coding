import React from "react";
import { useCartCtx, useThemeCtx } from "../contexts/ContextPlus";

const Product = ({ product }) => {
	const cartCtx = useCartCtx();
	const themeCtx = useThemeCtx();

	const cartState = cartCtx.rootState;
	const isAddedInCart = Boolean(cartState && cartState[product.id]);
	const isOutOfStock = !product.quantity;

	const fnAddToCart = () => {
		if (!isAddedInCart && !isOutOfStock) {
			cartCtx.addItem(product);
		}
	};

	return (
		<div
			key={product.id}
			style={{
				height: "400px",
				width: "300px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<img
				src={product.imageURL}
				alt={product.type}
				style={{
					height: "100%",
					width: "90%",
					objectFit: "cover",
					paddingTop: "10px",
				}}
			/>
			<div
				style={{
					width: "90%",
					display: "flex",
					flexDirection: "column",
					paddingTop: "10px",
					paddingBottom: "10px",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						height: "40px",
						alignItems: "center",
					}}
				>
					<span>{product.name}</span>
					<button
						style={{
							backgroundColor:
								isAddedInCart || isOutOfStock ? themeCtx.darkBgColor : "black",
							color: "white",
							border: "none",
							outline: "none",
							width: "100px",
							height: "100%",
							cursor: !isAddedInCart && !isOutOfStock ? "pointer" : undefined,
						}}
						onClick={fnAddToCart}
					>
						{isAddedInCart
							? "Added to cart"
							: isOutOfStock
							? "Out of stock"
							: "Add to cart"}
					</button>
				</div>
				<span>Rs. {product.price}</span>
			</div>
		</div>
	);
};

export default Product;
