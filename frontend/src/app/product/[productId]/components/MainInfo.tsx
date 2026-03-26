import { Box, Button, Paper, Rating, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import RateReviewIcon from "@mui/icons-material/RateReview";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    data: ProductInterface;
}

function MainInfo({ data }: Props) {
    return (
        <Box
            sx={{
                width: { md: "55%", xs: "100%" },
                paddingLeft: { md: "16px", xs: "0px" },
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" fontWeight={"bold"} sx={{ marginBottom: "14px" }}>
                    {data.name}
                </Typography>

                <Box sx={{ display: "flex" }}>
                    <Rating
                        sx={{ marginBottom: "14px" }}
                        // get average rating value
                        defaultValue={
                            data.reviews.reduce((sum: number, currentValue: ReviewInterface) => sum + currentValue.rating, 0) /
                            data.reviews.length
                        }
                        precision={0.1}
                        readOnly
                    />
                    <Typography color="textSecondary" sx={{ marginBottom: "14px", marginLeft: "14px" }}>
                        <RateReviewIcon sx={{ marginRight: "3px" }} />
                        {data.reviews.length}
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: "14px", display: "flex" }}>
                    <Typography color="textSecondary">{"Продавець:\u00A0"}</Typography>
                    <Typography>{data.seller}</Typography>
                </Box>
                {data.is_available ? (
                    <Typography sx={{ color: "green", marginBottom: "14px" }}>
                        <CheckIcon /> в наявності
                    </Typography>
                ) : (
                    <Typography sx={{ color: "red", marginBottom: "14px" }}>
                        <CloseIcon /> немає в наявності
                    </Typography>
                )}

                {data.discount ? (
                    <Box sx={{ marginBottom: "14px" }}>
                        <Typography
                            variant="h6"
                            fontWeight={"bold"}
                            color="textSecondary"
                            sx={{ textDecoration: "line-through", fontSize: "17px" }}
                        >
                            {data.price} ₴
                        </Typography>
                        <Typography variant="h4" fontWeight={"bold"} sx={{ color: "red" }}>
                            {(Number(data.price) * ((100 - data.discount) / 100)).toFixed(2)} ₴
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="h4" fontWeight={"bold"} sx={{ marginBottom: "14px" }}>
                        {data.price} ₴
                    </Typography>
                )}

                <Button
                    sx={{ marginBottom: "14px" }}
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    disabled={!data.is_available}
                >
                    Купити
                </Button>
            </Box>

            <Box>
                <Paper elevation={2} sx={{ padding: "7px", marginY: "12px" }}>
                    <Typography>
                        <VerifiedUserIcon sx={{ marginRight: "3px" }} />
                        Товар має гарантію від виробника. Обміняти або повернути можна протягом 14 днів після покупки
                    </Typography>
                </Paper>
                <Paper elevation={2} sx={{ padding: "7px", marginY: "12px" }}>
                    <Typography>
                        <AccountBalanceWalletIcon sx={{ marginRight: "3px" }} />
                        Оплачуйте покупку карткою при оформленні замовлення або готівкою при отриманні товару
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default MainInfo;
