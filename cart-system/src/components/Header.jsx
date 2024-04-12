import React from "react";
import { useCartCtx, useThemeCtx } from "../contexts/ContextPlus";
import { useNavigate } from "react-router-dom";
import { CART_ROUTE, PRODUCTS_ROUTE } from "../App";

const Header = ({ headerType = "products" }) => {
	const theme = useThemeCtx();
	const cartCtx = useCartCtx();
	const navigate = useNavigate();

	const cartState = cartCtx.rootState;
	const totalItems =
		cartState && Object.keys(cartState).length
			? Object.keys(cartState).length
			: undefined;

	const activeBorderBottom = "1px solid black";

	return (
		<div
			style={{
				height: "50px",
				width: "100%",
				display: "flex",
				backgroundColor: theme.backgroundColor,
				position: "fixed",
				justifyContent: "space-between",
			}}
		>
			<p
				style={{
					marginLeft: "5%",
				}}
			>
				TeeRex Store
			</p>
			<div
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "space-between",
					marginRight: "5%",
				}}
			>
				<p
					style={{
						borderBottom: headerType === "products" && activeBorderBottom,
						cursor: "pointer",
					}}
					onClick={() => navigate(PRODUCTS_ROUTE)}
				>
					{"Products"}
				</p>
				<div
					style={{
						height: "100%",
						width: "40px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginLeft: "10px",
					}}
				>
					<span
						style={{
							backgroundColor: theme.darkBgColor,
							height: "70%",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							cursor: "pointer",
							position: "relative",
							borderBottom: headerType === "cart" && activeBorderBottom,
						}}
						onClick={() => navigate(CART_ROUTE)}
					>
						<span
							style={{
								position: "absolute",
								top: 0,
								right: 2,
								fontSize: "14px",
							}}
						>
							{totalItems ?? ""}
						</span>
						🛒
					</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
