<template>
  <div id="app">
    <h1>Vue Popover</h1>
    <Popover
      v-bind:items="popoverItems"
      v-bind:onItemClick="onItemClick"
      v-bind:popoverLabel="popoverLabel"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import { MdButton, MdList } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import Item from '@/components/Popover/Item';
import ItemInterface from '@/components/Popover/ItemInterface';
import Popover from '@/components/Popover.vue';

Vue.use(MdButton);
Vue.use(MdList);

@Component({
  components: {
    Popover,
  },
})
export default class App extends Vue {
  private popoverItems: ItemInterface[] = [
    new Item('apples', false),
    new Item('oranges', false),
    new Item('bananas', false),
  ];

  private popoverLabel: string = '';

  @Emit()
  private onItemClick(item: ItemInterface): void {
    this.popoverLabel = item.getLabel();

    this.popoverItems = this.popoverItems.map((i: ItemInterface): ItemInterface => {
      if (item === i) {
        return new Item(i.getLabel(), true);
      }

      return new Item(i.getLabel(), false);
    });
  }
}
</script>

<style lang="scss">
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  body {
    margin: 1em auto;
    text-align: center;
  }
</style>
