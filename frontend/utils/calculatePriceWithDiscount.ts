export const calculatePriceWithDiscount = (priceWithoutDiscount: string, discount: number | undefined): string => {
    if (discount === undefined) {
        return priceWithoutDiscount;
    }
    return (Number(priceWithoutDiscount) * ((100 - discount) / 100)).toFixed(2);
};
