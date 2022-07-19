import * as yup from 'yup';

export const fileInputs = [
  { name: 'mapImage.png', accept: '.png', label: 'Картинка (.png)' },
];

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Обязательное поле')
    .max(50, 'Максимальная длина - 50'),
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
