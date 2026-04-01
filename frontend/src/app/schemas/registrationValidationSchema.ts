import * as Yup from "yup";

export const registrationValidationSchema = Yup.object({
    first_name: Yup.string().max(100, "Ім'я не може бути довшим за 100 символів").required("Обов’язкове поле"),
    last_name: Yup.string().max(100, "Прізвище не може бути довшим за 100 символів").required("Обов’язкове поле"),
    email: Yup.string().email("Введіть правильну адресу електронної пошти").required("Обов’язкове поле"),
    password: Yup.string()
        .min(6, "Мінімум 6 символів")
        .matches(/^(?=.*[A-ZА-ЯЇЄҐІ]).*$/, "В паролі має бути хоча б 1 велика літера")
        .matches(/^(?=.*[^a-zа-яїєґіA-ZА-ЯЇЄҐІ]).*$/, "В паролі має бути хоча б 1 знак відмінний від букви")
        .required("Обов’язкове поле"),
});
