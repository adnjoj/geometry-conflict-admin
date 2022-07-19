<script lang="ts">
  import type { FieldInputProps, FieldMetaProps } from 'sveltik';

  export let field: FieldInputProps;
  export let meta: FieldMetaProps;
  export let props: any;
</script>

<select 
  class="select"
  style={meta.error ? 'border-color: tomato' : ''}
  {...field} 
  {...props}
  on:input={field.handleInput}
  on:blur={field.handleBlur}
>
  <slot></slot>
</select>

<style lang="scss">
  @import './Select.scss';
</style>