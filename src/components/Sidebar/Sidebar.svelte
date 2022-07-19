<script lang="ts">
  import { link } from 'svelte-routing';

  const items = [
    { id: 1, label: 'Оружие', href: '/weapons' },
    // { id: 2, label: 'Снаряжение', href: '/equipment' },
    { id: 3, label: 'Обоймы', href: '/clips' },
    { id: 4, label: 'Скины', href: '/skins' },
    { id: 5, label: 'Игровые объекты', href: '/game-objects' },
    { id: 6, label: 'Карты', href: '/maps' },
  ];

  $: activeItemId =
    items.find(({ href }) => document.location.pathname.startsWith(href))?.id ??
    0;
</script>

<aside class="sidebar">
  <nav>
    {#each items as item}
      <a
        href={item.href}
        class={`sidebar__item ${
          activeItemId === item.id ? 'sidebar__item__active' : ''
        }`}
        use:link
      >
        {item.label}
      </a>
    {/each}
  </nav>
</aside>

<style lang="scss">
  @import './Sidebar.scss';
</style>
