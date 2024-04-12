import React from "react";

const CartItem = ({ product, onDelete, onChangeQuantity }) => {
	const quantity = product.quantity;
	const quantityArr = Array.from({ length: quantity });

	return (
		<div
			style={{
				height: "100px",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "10px",
			}}
		>
			<div
				style={{
					height: "80px",
					width: "80px",
				}}
			>
				<img
					src={product.imageURL}
					alt={product.type}
					style={{
						height: "100%",
						width: "100%",
						objectFit: "cover",
					}}
				/>
			</div>
			<div
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "start",
					alignItems: "center",
					flex: 1,
				}}
			>
				<div
					style={{
						padding: "10px",
						width: "10%",
						fontWeight: 600,
					}}
				>
					<p>{product.name}</p>
					<p>Rs.{product.price}</p>
				</div>
				<div
					style={{
						height: "40%",
						width: "40%",
						display: "flex",
						justifyContent: "space-evenly",
						padding: "10px",
					}}
				>
					{quantityArr.length > 0 && (
						<>
							<select
								name="quantity"
								id="quantity"
								style={{
									width: "100px",
								}}
								onChange={(e) =>
									onChangeQuantity(product.id, parseInt(e.target.value))
								}
							>
								{quantityArr.map((_, index) => {
									return (
										<option key={index} value={index + 1}>
											qty: {index + 1}
										</option>
									);
								})}
							</select>
							<button
								type="button"
								style={{
									width: "100px",
									backgroundColor: "transparent",
									outline: "none",
									border: "1px solid black",
									cursor: "pointer",
								}}
								onClick={() => onDelete(product.id)}
							>
								Delete
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartItem;
