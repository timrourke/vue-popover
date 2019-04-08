<template>
  <div class="popover">
    <ul>
      <li v-for="item in items">
        {{ item.getLabel() }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Item from './Popover/Item';

@Component
export default class Popover extends Vue {
  @Prop() private items!: Item[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
