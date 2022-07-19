import * as yup from 'yup';

export const fileInputs = [
  { name: 'clipImage.png', accept: '.png', label: 'Картинка обоймы (.png)' },
];

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Обязательное поле')
    .max(50, 'Максимальная длина - 50'),
  bulletsAmount: yup
    .number()
    .required('Обязательное поле')
    .typeError('Введенное значение должно быть числом')
    .min(0, 'Минимальное значение - 0'),
  weight: yup
    .number()
    .required('Обязательное поле')
    .typeError('Введенное значение должно быть числом')
    .min(0, 'Минимальное значение - 0'),
});

export const validate = (values) => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
  } catch (error) {
    const errors = {};

    error.inner.forEach(({ path, errors: [firstError] }) => {
      errors[path] = firstError;
    });

    return errors;
  }

  return {};
};
