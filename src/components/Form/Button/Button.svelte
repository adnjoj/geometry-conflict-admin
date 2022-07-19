<button 
  {...$$props}
  on:click
  on:focus
  on:mouseover
  on:mouseenter
  on:mouseleave
>
  <slot></slot>
</button>

<style lang="scss">
  @import './Button.scss';
</style>