import { Box } from "@mui/material";
import ProductCard from "./components/ProductCard";

export default async function Home() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product_list/`);
    const data = await result.json();

    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", width: { xs: "95%", lg: "70%" } }}>
                {data.map((product: ProductInterface) => {
                    return <ProductCard key={product.id} product={product} />;
                })}
            </Box>
        </Box>
    );
}
