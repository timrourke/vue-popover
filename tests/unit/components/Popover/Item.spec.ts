import Item from '../../../../src/components/Popover/Item';

describe('Item.ts', () => {
  it('has a label', () => {
    const expectedLabel = 'some label';

    const item = new Item(expectedLabel, false);

    expect(item.getLabel()).toBe(expectedLabel);
  });

  it('is active', () => {
    const item = new Item('unimportant', true);

    expect(item.isActive()).toBe(true);
  });

  it('is inactive', () => {
    const item = new Item('unimportant', false);

    expect(item.isActive()).toBe(false);
  });
});
