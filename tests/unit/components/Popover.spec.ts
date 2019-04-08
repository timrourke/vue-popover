import { shallowMount } from '@vue/test-utils';
import Popover from '../../../src/components/Popover.vue';
import Item from '../../../src/components/Popover/Item';

describe('Popover.vue', () => {
  it('renders items passed to it', () => {
    const expectedLabels = [
      'foo',
      'bar',
      'baz',
    ];

    const items = expectedLabels.map((label) => new Item(label));

    const wrapper = shallowMount(Popover, {
      propsData: { items },
    });

    expect(wrapper.text().replace(/[^\w]+/g, '')).toMatch(expectedLabels.join(''));
  });
});
