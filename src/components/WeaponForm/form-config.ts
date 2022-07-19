import * as yup from 'yup';

export const fileInputs = [
  { name: 'weaponImage.png', accept: '.png', label: 'Картинка оружия (.png)' },
  { name: 'bulletImage.png', accept: '.png', label: 'Картинка пули (.png)' },
  { name: 'fireImage.png', accept: '.png', label: 'Картинка огня (.png)' },
  { name: 'shotSound.mp3', accept: '.mp3', label: 'Звук выстрела (.mp3)' },
  { name: 'reloadSound.mp3', accept: '.mp3', label: 'Звук перезарядки (.mp3)' },
];

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Обязательное поле')
    .max(50, 'Максимальная длина - 50'),
  damage: yup
    .number()
    .required('Обязательное поле')
    .typeError('Введенное значение должно быть числом'),
  spread: yup
    .number()
    .required('Обязательное поле')
    .typeError('Введенное значение должно быть числом')
    .min(0, 'Минимальное значение - 0'),
  rateOfFire: yup
    .number()
    .required('Обязательное поле')
    .typeError('Введенное значение должно быть числом')
    .min(0, 'Минимальное значение - 0'),
  reloadSpeed: yup
    .number()
    .required('Обязательное поле')
    .typeError('Введенное значение должно быть числом')
    .min(0, 'Минимальное значение - 0'),
  firingRange: yup
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
