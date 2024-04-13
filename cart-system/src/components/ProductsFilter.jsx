import React, { useCallback } from "react";
import { useRef } from "react";

const ProductsFilter = ({ loading, originalProducts, cbSetProducts }) => {
	const colorArray = originalProducts?.map((product) => product.color);
	const uniqueColors = [...new Set(colorArray)];

	const genderArray = originalProducts?.map((product) => product.gender);
	const uniqueGenders = [...new Set(genderArray)];

	const typeArray = originalProducts?.map((product) => product.type);
	const uniqueTypes = [...new Set(typeArray)];

	const products = useRef();

	const padding = "3px";

	const spanStyle = {
		fontWeight: 700,
		fontSize: "18px",
	};
	const typeStyle = {
		padding: "3px",
	};

	const handleFilter = useCallback(
		(e, filteredType) => {
			if (e.target.tagName === "INPUT") {
				const isChecked = e.target.checked;
				const filteredValue = e.target.id;

				if (isChecked) {
					const newProducts = originalProducts.filter(
						(prod) => prod[filteredType] === filteredValue
					);
					const filteredProdcuts = [
						...new Set([...newProducts, ...(products.current ?? [])]),
					];

					products.current = filteredProdcuts;

					cbSetProducts(filteredProdcuts);
				} else {
					const newProducts = products.current.filter(
						(prod) => prod[filteredType] !== filteredValue
					);
					const filteredProdcuts =
						newProducts && newProducts.length > 0
							? newProducts
							: originalProducts;

					products.current =
						newProducts && newProducts.length > 0 ? newProducts : undefined;

					cbSetProducts(filteredProdcuts);
				}
			}
		},
		[originalProducts]
	);

	return (
		<div
			style={{
				height: "100%",
				width: "20%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					height: "80%",
					width: "80%",
					boxShadow: "2px 2px 5px 5px rgba(0,0,0,0.1)",
					overflow: "scroll",
					padding: "20px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
				}}
			>
				{loading ? (
					<p>Loading...</p>
				) : (
					<>
						<div onClick={(e) => handleFilter(e, "color")}>
							<span style={spanStyle}>Color</span>
							{uniqueColors.map((color) => {
								return (
									<div key={color} style={typeStyle}>
										<input
											type="checkbox"
											name={color}
											id={color}
											key={color}
										/>
										<label>{color}</label>
										<br />
									</div>
								);
							})}
						</div>
						<div onClick={(e) => handleFilter(e, "gender")}>
							<span style={spanStyle}>Gender</span>
							{uniqueGenders.map((gender) => {
								return (
									<div key={gender} style={typeStyle}>
										<input
											type="checkbox"
											name={gender}
											id={gender}
											key={gender}
										/>
										<label>{gender}</label>
										<br />
									</div>
								);
							})}
						</div>
						<div onClick={(e) => handleFilter(e, "type")}>
							<span style={spanStyle}>Type</span>
							{uniqueTypes.map((type) => {
								return (
									<div key={type} style={typeStyle}>
										<input type="checkbox" name={type} id={type} key={type} />
										<label>{type}</label>
										<br />
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductsFilter;
