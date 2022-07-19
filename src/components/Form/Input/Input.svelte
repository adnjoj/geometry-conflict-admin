<script lang="ts">
  import type { FieldInputProps, FieldMetaProps } from 'sveltik';

  export let field: FieldInputProps;
  export let meta: FieldMetaProps;
  export let props: any;
</script>

<input
  class="input"
  style={meta.error ? 'border-color: tomato' : ''}
  {...field}
  {...props}
  on:input={field.handleInput}
  on:blur={field.handleBlur}
/>

<style lang="scss">
  @import './Input.scss';
</style>
