import { Button, ButtonGroup } from "@mui/material";

function ProductNavigation() {
    const navigationButtons = [
        { title: "Опис", navigateTo: "#description" },
        { title: "Характеристики", navigateTo: "#specifications" },
        { title: "Відгуки", navigateTo: "#reviews" },
    ];
    return (
        <ButtonGroup variant="outlined" sx={{ marginBottom: "12px" }}>
            {navigationButtons.map((value, index) => {
                return (
                    <Button key={index} href={value.navigateTo} color="success" size="large">
                        {value.title}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
}

export default ProductNavigation;
