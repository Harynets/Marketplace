import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { calculatePriceWithDiscount } from "../../../utils/calculatePriceWithDiscount";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImageIcon from "@mui/icons-material/Image";

interface Props {
    product: ProductInterface;
}

function ProductCard({ product }: Props) {
    let mainImage;
    if (product.images.length > 0) {
        mainImage = product.images.filter((image) => {
            return image.is_main_image;
        })[0];
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                width: { xs: "98%", sm: "48%", md: "32%", xl: "24%" },
                display: "flex",
                flexDirection: "column",
                padding: "14px",
                marginBottom: "14px",
            }}
        >
            <Box sx={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {product.images.length > 0 ? (
                    <Link href={`/product/${product.id}`}>
                        <Avatar sx={{ width: "100%", height: "270px" }} variant="square" src={mainImage!.image} />
                    </Link>
                ) : (
                    <ImageIcon color="disabled" sx={{ fontSize: "100px" }} />
                )}
            </Box>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Link href={`/product/${product.id}`}>
                    <Typography variant="h6" fontSize={17}>
                        {product.name}
                    </Typography>
                </Link>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: "12px" }}>
                <Box>
                    {product.discount ? (
                        <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            color="textSecondary"
                            sx={{ textDecoration: "line-through", fontSize: "15px" }}
                        >
                            {product.price} ₴
                        </Typography>
                    ) : null}
                    <Typography variant="h6" color="red" fontWeight="bold">
                        {calculatePriceWithDiscount(product.price, product.discount)} ₴
                    </Typography>
                </Box>
                <Box>
                    <Button color="main" variant="outlined" href="#">
                        <ShoppingCartIcon />
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default ProductCard;
