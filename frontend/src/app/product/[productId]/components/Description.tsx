import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
    description: string;
}

function Description({ description }: Props) {
    return (
        <Box id="description" sx={{ marginY: "40px" }}>
            <Typography variant="h4" fontWeight={"bold"} sx={{ marginBottom: "18px" }}>
                Опис
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }} align="justify">
                {description}
            </Typography>
        </Box>
    );
}

export default Description;
