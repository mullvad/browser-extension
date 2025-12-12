import { it, describe, expect } from 'vitest';

import unique from '@/helpers/unique';

describe('unique', function () {
  it('should return the same input if unique', () => {
    const servers = [
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
    ];
    expect(unique(servers, 'id')).toStrictEqual(servers);
  });

  it('should remove single duplicate', () => {
    const servers = [
      { id: 1, name: 'One' },
      { id: 1, name: 'Two' },
    ];
    expect(unique(servers, 'id')).toStrictEqual([{ id: 1, name: 'Two' }]);
  });

  it('should remove all duplicates', () => {
    const servers = [
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
      { id: 1, name: 'Three' },
      { id: 2, name: 'Four' },
    ];
    expect(unique(servers, 'id')).toStrictEqual([
      { id: 1, name: 'Three' },
      { id: 2, name: 'Four' },
    ]);
  });
});
