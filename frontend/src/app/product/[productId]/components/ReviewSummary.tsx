import { Box, LinearProgress, Paper, Rating, Typography } from "@mui/material";

interface Props {
    reviews: ReviewInterface[];
}

function ReviewSummary({ reviews }: Props) {
    const averageRating = (
        reviews.reduce((sum: number, currentValue: ReviewInterface) => sum + currentValue.rating, 0) / reviews.length
    ).toFixed(2);

    return (
        <Paper
            elevation={3}
            sx={{ padding: "16px", marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h4" fontWeight="bold">
                        {averageRating}
                    </Typography>
                    <Typography sx={{ marginLeft: "8px" }}>({reviews.length} відгуків)</Typography>
                </Box>
                <Rating
                    defaultValue={Number(averageRating)}
                    precision={0.1}
                    sx={{
                        fontSize: {
                            md: 24,
                            lg: 30,
                        },
                    }}
                    readOnly
                ></Rating>
            </Box>
            <Box sx={{ width: "55%" }}>
                {new Array(5).fill(null).map((_, index) => {
                    return (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                            <Rating
                                defaultValue={index + 1}
                                precision={1}
                                max={index + 1}
                                sx={{
                                    fontSize: {
                                        xs: 18,
                                        lg: 24,
                                    },
                                }}
                                readOnly
                            ></Rating>
                            <LinearProgress
                                sx={{
                                    width: { xs: "45%", sm: "55%", md: "70%" },
                                    height: "9px",
                                    marginLeft: "10px",
                                    borderRadius: "5px",
                                    backgroundColor: "lightgrey",
                                    "& .MuiLinearProgress-bar": { backgroundColor: "#faaf00" },
                                }}
                                variant="determinate"
                                value={
                                    (100 *
                                        reviews.filter((value) => {
                                            return value.rating == index + 1;
                                        }).length) /
                                    reviews.length
                                }
                            ></LinearProgress>
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
}

export default ReviewSummary;
