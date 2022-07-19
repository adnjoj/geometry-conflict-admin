<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let imageSrc = '';
  export let title = '';

  const dispatch = createEventDispatcher();

  const onEditClick = () => dispatch('edit-click');
  const onDeleteClick = () => dispatch('delete-click');
</script>

<article class="card" on:click>
  <div class="card__image-container">
    <img class="card__image" src={imageSrc} alt="card item" />
  </div>

  <div class="card__buttons-container">
    <img
      class="card__button"
      src="/edit.svg"
      alt="edit"
      on:click={onEditClick}
    />

    <img
      class="card__button"
      src="/delete.svg"
      alt="delete"
      on:click={onDeleteClick}
    />
  </div>

  <h3 class="card__title">{title}</h3>
</article>

<style lang="scss">
  @import './Card.scss';
</style>
