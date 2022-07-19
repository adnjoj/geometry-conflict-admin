<script lang="ts">
  import type { FieldInputProps, FieldMetaProps } from 'sveltik';

  export let field: FieldInputProps;
  export let meta: FieldMetaProps;
  export let props: any;

  const { value, ...restFieldProps } = field;
  const { type, ...restProps } = props;

  let labelText = 'Выбрать файл';

  const handleChange: svelte.JSX.FormEventHandler<HTMLInputElement> = (
    event,
  ) => {
    labelText =
      (event.target as HTMLInputElement).files?.[0]?.name ?? 'Выбрать файл';

    field.handleInput({
      target: {
        name: field.name,
        value: (event.target as HTMLInputElement).files[0],
      },
    });
  };
</script>

<div class="file-input__wrapper">
  <input
    class="file-input"
    {...restFieldProps}
    {...restProps}
    type="file"
    on:blur={field.handleBlur}
    on:change={handleChange}
  />

  <label style={meta.error ? 'border-color: tomato' : ''} for={props.id}>
    {labelText}
  </label>
</div>

<style lang="scss">
  @import './FileInput.scss';
</style>
