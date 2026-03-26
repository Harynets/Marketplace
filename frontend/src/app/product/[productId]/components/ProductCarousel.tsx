import { Box } from "@mui/material";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Props {
    images: ProductImageInterface[];
}

function ProductCarousel({ images }: Props) {
    // ensure main image is first
    const sortedImages = [...images].sort((a, b) => {
        return Number(b.is_main_image) - Number(a.is_main_image);
    });

    return (
        <Box sx={{ width: { md: "45%", xs: "100%" }, paddingRight: "12px" }}>
            <Swiper
                style={{ display: "flex", alignItems: "center" }}
                spaceBetween={1}
                slidesPerView={1}
                navigation={true}
                modules={[Pagination, Navigation]}
            >
                {sortedImages.map((value) => (
                    <SwiperSlide key={value.id}>
                        <img src={value.image} alt={"Товар"} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}

export default ProductCarousel;
