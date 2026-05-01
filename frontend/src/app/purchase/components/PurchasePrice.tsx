import { CartInterface } from "@/app/types/CartInterface";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

interface Props {
    data: CartInterface | undefined;
}

function PurchasePrice({ data }: Props) {
    return (
        <Paper variant="outlined" sx={{ marginLeft: "28px", padding: "16px" }}>
            <Stack spacing={1}>
                <Typography variant="h5">Разом</Typography>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6">Товари на суму</Typography>
                    <Typography>{data?.total_price} ₴</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6">Вартість доставки</Typography>
                    <Typography>за тарифами перевізника</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography>До сплати</Typography>
                    <Typography variant="h6">{data?.total_price} ₴</Typography>
                </Box>
            </Stack>
        </Paper>
    );
}

export default PurchasePrice;
