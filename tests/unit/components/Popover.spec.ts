import { mount, shallowMount } from '@vue/test-utils';
import Popover from '../../../src/components/Popover.vue';
import Item from '../../../src/components/Popover/Item';
import ItemInterface from '@/components/Popover/ItemInterface';

describe('Popover.vue', () => {
  it('should have a default label', () => {
    const wrapper = shallowMount(Popover, {
      propsData: {},
      stubs: {
        'md-button': true,
      },
    });

    expect(wrapper.find('.popover-trigger').text()).toMatch('Nothing selected.');
  });

  it('should render the popover label passed to it', () => {
    const expectedPopoverLabel = 'some label other than default';

    const wrapper = shallowMount(Popover, {
      propsData: {
        popoverLabel: expectedPopoverLabel,
      },
      stubs: {
        'md-button': true,
      },
    });

    expect(wrapper.text()).toMatch(expectedPopoverLabel);
  });

  it('does not render items passed to it when menu is closed', () => {
    const expectedLabels = [
      'foo',
      'bar',
      'baz',
    ];

    const items = expectedLabels.map((label) => new Item(label, false));

    const wrapper = shallowMount(Popover, {
      propsData: {
        items,
        seen: false,
      },
      stubs: {
        'md-button': true,
      },
    });

    expect(wrapper.text()).toMatch('Nothing selected.');
  });

  it('renders items passed to it when menu is open', () => {
    const expectedLabels = [
      'foo',
      'bar',
      'baz',
    ];

    const items = expectedLabels.map((label) => new Item(label, false));

    const wrapper = shallowMount(Popover, {
      propsData: {
        items,
        seen: true,
      },
      stubs: {
        'md-button': true,
        'md-list': true,
        'md-list-item': true,
      },
    });

    expect(wrapper.text().replace(/[^\w]+/g, ''))
      .toMatch(expectedLabels.join(''));
  });

  it('opens menu when popover trigger clicked', () => {
    const expectedLabels = [
      'foo',
      'bar',
      'baz',
    ];

    const items = expectedLabels.map((label) => new Item(label, false));

    const MdButtonStub = {
      template: '<div class="popover-trigger" />',
    };

    const wrapper = shallowMount(Popover, {
      propsData: {
        items,
        seen: false,
      },
      stubs: {
        'md-button': MdButtonStub,
        'md-list': true,
        'md-list-item': true,
      },
    });

    expect(wrapper.find('.popover-items').exists()).toBe(false);

    wrapper.find('.popover-trigger').vm.$emit('click');

    expect(wrapper.find('.popover-items').exists()).toBe(true);
  });

  it('calls onItemClick with the item that was clicked', () => {
    const MdListItemStub = {
      template: '<li class="popover-item" />',
    };

    const item1 = new Item('item 1', false);
    const item2 = new Item('item 2', false);
    const items = [item1, item2];

    let clickedItemLabel = null;
    const onItemClick = (item: ItemInterface) => {
      clickedItemLabel = item.getLabel();
    };

    const wrapper = shallowMount(Popover, {
      propsData: {
        items,
        onItemClick,
        seen: true,
      },
      stubs: {
        'md-button': true,
        'md-list': true,
        'md-list-item': MdListItemStub,
      },
    });

    wrapper.findAll('.popover-item').at(0).vm.$emit('click');

    expect(clickedItemLabel).toBe(item1.getLabel());

    wrapper.find('.popover-trigger').vm.$emit('click');

    wrapper.findAll('.popover-item').at(1).vm.$emit('click');

    expect(clickedItemLabel).toBe(item2.getLabel());
  });
});
