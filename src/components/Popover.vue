<template>
  <div class="popover">
    <md-button
      class="popover-trigger md-dense md-primary md-raised"
      @click="handlePopoverTriggerClick()"
    >
      {{ computedPopoverLabel }}
    </md-button>
    <md-list
      class="popover-items md-dense"
      v-if="menuIsVisible"
    >
      <md-list-item
        v-for="(item, index) in items"
        :key="index"
        class="popover-item"
        v-bind:class="{ active: item.isActive() }"
        @click="handleItemClick(item)"
      >
        {{ item.getLabel() }}
      </md-list-item>
    </md-list>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import ItemInterface from './Popover/ItemInterface';

@Component
export default class Popover extends Vue {
  @Prop() private items!: ItemInterface[];

  @Prop({
    default: (): (item?: ItemInterface) => void => {
      return (): void => { /* no-op */ };
    },
  }) private onItemClick!: (item?: ItemInterface) => void;

  @Prop() private popoverLabel!: string;

  @Prop({ default: false }) private seen!: boolean;

  private menuIsVisible: boolean = this.seen;

  get computedPopoverLabel(): string {
    return (this.popoverLabel || '').trim() || 'Nothing selected.';
  }

  @Emit()
  private handlePopoverTriggerClick(): void {
    this.menuIsVisible = !this.menuIsVisible;
  }

  @Emit()
  private handleItemClick(item: ItemInterface): void {
    this.onItemClick(item);
    this.menuIsVisible = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .popover {
    display: inline-block;
    max-width: 300px;
    min-width: 200px;
  }

  .popover .popover-trigger {
    margin: 0;
    text-align: left;
    text-transform: none;
    width: 100%;
  }

  .popover .popover-item.active .md-list-item-container {
    color: var(--md-theme-demo-light-primary-on-background,#448aff);
  }
</style>
