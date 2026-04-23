import * as Yup from "yup";
import { string } from "yup";

export const purchaseDetailsSchema = Yup.object({
    first_name: string().required("Введіть своє ім'я"),
    last_name: string().required("Введіть своє прізвище"),
    patronymic: string().required("Введіть своє по батькові"),
    address: string().required("Введіть місце для доставки").min(10, "Дане поле не може містити менше 10 символів"),
});
