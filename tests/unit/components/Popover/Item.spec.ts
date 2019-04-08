import Item from '../../../../src/components/Popover/Item';

describe('Item.ts', () => {
  it('has a label', () => {
    const expectedLabel = 'some label';

    const item = new Item(expectedLabel);

    expect(item.getLabel()).toBe(expectedLabel);
  });
});
