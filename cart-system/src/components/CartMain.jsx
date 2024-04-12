import React from "react";
import { useCartCtx, useThemeCtx } from "../contexts/ContextPlus";
import CartItem from "./CartItem";

const CartMain = () => {
	const themeCtx = useThemeCtx();
	const cartCtx = useCartCtx();

	const cartState = cartCtx.rootState;
	const isCartEmpty = !Boolean(cartState && Object.keys(cartState).length > 0);
	const totalAmount = !isCartEmpty
		? Object.values(cartState).reduce((prev, value) => {
				return prev + value.count * value.product.price;
		  }, 0)
		: 0;

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					width: "80%",
					padding: "20px",
				}}
			>
				<p>Shopping Cart</p>
			</div>
			<div
				style={{
					width: "80%",
				}}
			>
				{!isCartEmpty ? (
					Object.keys(cartState).map((productId) => {
						const product = cartState[productId].product;
						return (
							<CartItem
								key={productId}
								product={product}
								onDelete={(id) => {
									cartCtx.removeItem(id);
								}}
								onChangeQuantity={(id, value) => {
									cartCtx.changeQuantity({
										id: id,
										quantity: value,
									});
								}}
							/>
						);
					})
				) : (
					<span> Your cart is empty! </span>
				)}
			</div>
			{!isCartEmpty && (
				<div
					style={{
						width: "50%",
						flex: 1,
						alignSelf: "start",
						marginLeft: "7%",
					}}
				>
					<div
						style={{
							height: "2px",
							width: "100%",
							backgroundColor: themeCtx.darkBgColor,
						}}
					/>
					<div
						style={{
							height: "50px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<b>Total amount: </b>{" "}
						<p style={{ paddingLeft: "10px" }}>Rs {totalAmount}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartMain;
