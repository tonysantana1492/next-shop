import { FC, useMemo, useState } from "react";
import Link from "next/link";
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { IProduct } from "../../interfaces";

interface Props {
	product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false);

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const producImage = useMemo(() => {
		return isHovered ? product.images[1] : product.images[0];
	}, [isHovered, product.images]);

	return (
		<Grid item xs={6} sm={4} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<Card>
				<Link href={`/product/${product.slug}`} prefetch={false}>
					<CardActionArea>
						{product.inStock === 0 && (
							<Chip
								color='primary'
								label=' Not available'
								sx={{ position: "absolute", zIndex: 99, top: "10px", left: "10px" }}
							/>
						)}
						<CardMedia
							component='img'
							className='fadeIn'
							image={producImage}
							alt={product.title}
							onLoad={() => setIsImageLoaded(true)}
						/>
					</CardActionArea>
				</Link>
			</Card>

			<Box sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }} className='fadeIn'>
				<Typography fontWeight={700}>{product.title}</Typography>
				<Typography fontWeight={500}>${product.price}</Typography>
			</Box>
		</Grid>
	);
};
