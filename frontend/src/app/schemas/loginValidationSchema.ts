import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    email: Yup.string().email("Введіть правильну адресу електронної пошти").required("Обов’язкове поле"),
    password: Yup.string().required("Обов’язкове поле"),
});
