import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface Props {
    specifications: Record<string, string>;
}

function Specifications({ specifications }: Props) {
    if (!specifications) return;

    return (
        <Box id="specifications" sx={{ marginY: "40px" }}>
            <Typography variant="h4" fontWeight={"bold"} sx={{ marginBottom: "18px" }}>
                Характеристики
            </Typography>

            <TableContainer component={Paper} variant="outlined">
                <Table sx={{ minWidth: 350 }} aria-label="customized table">
                    <TableBody>
                        {Object.keys(specifications).map((key, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell sx={index % 2 === 0 ? { backgroundColor: "#f5f5f5" } : {}} align="left">
                                        {key}
                                    </TableCell>
                                    <TableCell sx={index % 2 === 0 ? { backgroundColor: "#f5f5f5" } : {}} align="right">
                                        {specifications[key]}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Specifications;
