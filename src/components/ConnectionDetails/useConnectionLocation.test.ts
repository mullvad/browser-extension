import useConnectionLocation from '@/components/ConnectionDetails/useConnectionLocation';
import { Connection } from '@/helpers/connCheck';

describe('useConnectionLocation test', function () {
  it('should handle empty input', () => {
    expect(useConnectionLocation({} as Connection)).toEqual('Unknown location');
  });
  
  it('should handle different inputs', () => {
    expect(useConnectionLocation({ city: 'Hellsinki' } as Connection)).toEqual('Hellsinki');
    expect(useConnectionLocation({ country: 'Hell' } as Connection)).toEqual('Hell');
    expect(useConnectionLocation({ city: 'Hellsinki', country: 'Hell' } as Connection)).toEqual('Hellsinki, Hell');
  });
});
