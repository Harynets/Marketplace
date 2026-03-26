import { Typography } from "@mui/material";

export default async function Home() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test/`);
    const text: { text: string } = await data.json();
    return (
        <Typography variant="h1" component="h2">
            {text.text}
        </Typography>
    );
}
