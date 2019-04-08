import { shallowMount } from '@vue/test-utils';
import Popover from '@/components/Popover.vue';

describe('Popover.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Popover, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
