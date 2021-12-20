import pluralize from '@/helpers/pluralize';

describe('pluralize', () => {
  it('should return correct plural word', () => {
    expect(pluralize('metal head', 0)).toBe('0 metal heads');
    expect(pluralize('metal head', 1)).toBe('1 metal head');
    expect(pluralize('metal head', 2)).toBe('2 metal heads');
    expect(pluralize('metal head', 15)).toBe('15 metal heads');
  });
});