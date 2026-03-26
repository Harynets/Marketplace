"use client";

import { Avatar, Backdrop, Box, Paper, Rating, Typography } from "@mui/material";
import ReviewSummary from "./ReviewSummary";
import { useState } from "react";

interface Props {
    reviews: ReviewInterface[];
}

function Reviews({ reviews }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [openImage, setOpenImage] = useState<string>();
    return (
        <>
            <Box id="reviews" sx={{ marginY: "40px" }}>
                <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: "18px" }}>
                    Відгуки
                </Typography>
                {reviews.length ? (
                    <ReviewSummary reviews={reviews} />
                ) : (
                    <Typography variant="h3" align="center">
                        Відгуків немає
                    </Typography>
                )}

                {reviews.map((value) => {
                    const date = new Date(value.created_at);

                    return (
                        <Paper variant="outlined" key={value.id} sx={{ marginY: "16px", padding: "18px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography fontWeight="bold">{value.user_name}</Typography>
                                <Typography color="textSecondary">{date.toLocaleDateString("uk-UA")}</Typography>
                            </Box>
                            <Rating defaultValue={value.rating} precision={1} readOnly />

                            <Typography sx={{ whiteSpace: "pre-line", marginTop: "10px" }} align="justify">
                                {value.text}
                            </Typography>
                            {value.image ? (
                                <Avatar
                                    sx={{ cursor: "pointer", height: "100px", width: "100px", marginTop: "16px" }}
                                    src={value.image}
                                    onClick={() => {
                                        setOpen(true);
                                        setOpenImage(value.image);
                                    }}
                                    variant="rounded"
                                ></Avatar>
                            ) : null}
                        </Paper>
                    );
                })}
            </Box>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={() => {
                    setOpen(false);
                }}
            >
                <img src={openImage} alt="Прикріплене фото" />
            </Backdrop>
        </>
    );
}

export default Reviews;
