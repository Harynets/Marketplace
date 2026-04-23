import { CartInterface } from "@/app/types/CartInterface";
import { Avatar, Paper, Stack, Typography } from "@mui/material";

interface Props {
    data: CartInterface | undefined;
}

function ProductsToPurchase({ data }: Props) {
    return (
        <Paper variant="outlined" sx={{ marginLeft: "28px", padding: "16px", marginTop: "20px" }}>
            <Stack spacing={2}>
                <Typography variant="h5">Товари в замовленні</Typography>

                {data?.cart_items.map((item) => {
                    let mainImage: string | undefined = item.product.images.find((value) => {
                        if (value.is_main_image) {
                            return value;
                        }
                    })?.image;

                    return (
                        <Paper variant="outlined" sx={{ display: "flex", marginTop: "16px", padding: "10px" }} key={item.id}>
                            <Avatar
                                sx={{
                                    height: "95px",
                                    width: "95px",
                                }}
                                variant="rounded"
                                src={mainImage}
                            ></Avatar>
                            <Typography sx={{ marginLeft: "12px" }}>{item.product.name}</Typography>
                        </Paper>
                    );
                })}
            </Stack>
        </Paper>
    );
}

export default ProductsToPurchase;
