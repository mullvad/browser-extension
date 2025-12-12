import pluralize from '@/helpers/pluralize';
import { it, describe, expect } from 'vitest';


describe('pluralize', () => {
  it('should return correct plural word', () => {
    expect(pluralize('metal head', 0)).toBe('0 metal heads');
    expect(pluralize('metal head', 1)).toBe('1 metal head');
    expect(pluralize('metal head', 2)).toBe('2 metal heads');
    expect(pluralize('metal head', 15)).toBe('15 metal heads');

    expect(pluralize('city', 0, 'cities')).toBe('0 cities');
    expect(pluralize('city', 1, 'cities')).toBe('1 city');
    expect(pluralize('city', 2, 'cities')).toBe('2 cities');
    expect(pluralize('city', 15, 'cities')).toBe('15 cities');
  });
});
