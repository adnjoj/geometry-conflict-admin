<script lang="ts">
  export let imageSrc = '';
</script>

<article class="card" on:click>
  <div class="card__image-container" style="padding-bottom: 2rem;">
    <img class="card__image" src={imageSrc} alt="card item" />
  </div>
</article>

<!-- svelte-ignore css-unused-selector -->
<style lang="scss">
  @import './ImageCard.scss';
</style>