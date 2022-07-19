<script lang="ts">
  import type { FieldInputProps } from 'sveltik';

  export let field: FieldInputProps;
  export let props: any;
</script>

<div class="checkbox__wrapper">
  <input 
    class="checkbox"
    {...field} 
    {...props}
    type="checkbox"
    on:input={field.handleInput}
    on:blur={field.handleBlur}
    checked={field.value}
  />

  <label for={props.id}></label>
</div>

<style lang="scss">
  @import './Checkbox.scss';
</style>