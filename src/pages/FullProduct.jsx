import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FullProduct() {
	const [product, setProduct] = useState();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					`https://6579f84c1acd268f9afa80e7.mockapi.io/products/${id}`,
				);
				setProduct(data);
				console.log('data', data);
			} catch (error) {
				console.log('error', error);
			}
		})();
	}, []);

	return (
		<div>
			{product && (
				<>
					<img src={product.imageUrl} />
					<h2>{product.name}</h2>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt at in impedit incidunt
					eos earum tempora consectetur velit rem nihil minus tenetur suscipit molestiae, voluptates
					illo, eius odit ducimus dolor?
				</>
			)}
		</div>
	);
}

export default FullProduct;
