import sortExtensions from '@/composables/useExtensions/sortExtensions';
import { Extension } from '@/composables/useExtensions/Extension.types';

describe('sortExtensions', () => {
  it('should sort extensions alphabetically', () => {
    const extensions = [
      {
        id: 'uBlock',
        name: 'uBlock Origin',
        installed: false,
        enabled: false,
        ignored: false,
      },
      {
        id: 'CookieAutoDelete',
        name: 'Cookie AutoDelete',
        installed: false,
        enabled: false,
        ignored: false,
      },
      {
        id: 'PrivacyBadger',
        name: 'Privacy Badger',
        installed: false,
        enabled: false,
        ignored: false,
      },
    ] as Extension[];
    const sortedExtensions = sortExtensions(extensions);
    expect(sortedExtensions.map(({ id }) => id)).toStrictEqual([
      'CookieAutoDelete',
      'PrivacyBadger',
      'uBlock',
    ]);
  });
  
  it('should sort installed extensions last', () => {
    let extensions = [
      {
        id: 'uBlock',
        name: 'uBlock Origin',
        installed: false,
        enabled: false,
        ignored: false,
      },
      {
        id: 'CookieAutoDelete',
        name: 'Cookie AutoDelete',
        installed: true,
        enabled: true,
        ignored: false,
      },
      {
        id: 'PrivacyBadger',
        name: 'Privacy Badger',
        installed: false,
        enabled: false,
        ignored: false,
      },
    ] as Extension[];
    let sortedExtensions = sortExtensions(extensions);
    expect(sortedExtensions.map(({ id }) => id)).toStrictEqual([
      'PrivacyBadger',
      'uBlock',
      'CookieAutoDelete',
    ]);
    
    extensions = [
      {
        id: 'uBlock',
        name: 'uBlock Origin',
        installed: true,
        enabled: false,
        ignored: false,
      },
      {
        id: 'CookieAutoDelete',
        name: 'Cookie AutoDelete',
        installed: true,
        enabled: false,
        ignored: false,
      },
      {
        id: 'PrivacyBadger',
        name: 'Privacy Badger',
        installed: false,
        enabled: false,
        ignored: false,
      },
    ] as Extension[];
    sortedExtensions = sortExtensions(extensions);
    expect(sortedExtensions.map(({ id }) => id)).toStrictEqual([
      'PrivacyBadger',
      'CookieAutoDelete',
      'uBlock',
    ]);
  });
  
  it('should sort disabled extensions before installed, and alphabetically', () => {
    let extensions = [
      {
        id: 'uBlock',
        name: 'uBlock Origin',
        installed: false,
        enabled: false,
        ignored: false,
      },
      {
        id: 'CookieAutoDelete',
        name: 'Cookie AutoDelete',
        installed: true,
        enabled: false,
        ignored: false,
      },
      {
        id: 'PrivacyBadger',
        name: 'Privacy Badger',
        installed: true,
        enabled: true,
        ignored: false,
      },
    ] as Extension[];
    
    let sortedExtensions = sortExtensions(extensions);
    
    expect(sortedExtensions.map(({ id }) => id)).toStrictEqual([
      'uBlock',
      'CookieAutoDelete',
      'PrivacyBadger',
    ]);
    
    extensions = [
      {
        id: 'uBlock',
        name: 'uBlock Origin',
        installed: true,
        enabled: false,
        ignored: false,
      },
      {
        id: 'CookieAutoDelete',
        name: 'Cookie AutoDelete',
        installed: true,
        enabled: false,
        ignored: false,
      },
      {
        id: 'PrivacyBadger',
        name: 'Privacy Badger',
        installed: false,
        enabled: false,
        ignored: false,
      },
    ] as Extension[];
    sortedExtensions = sortExtensions(extensions);
    expect(sortedExtensions.map(({ id }) => id)).toStrictEqual([
      'PrivacyBadger',
      'CookieAutoDelete',
      'uBlock',
    ]);
  });
  
  it('should sort ignored extensions before installed and disabled, and alphabetically', () => {
    let extensions = [
      {
        id: 'uBlock',
        name: 'uBlock Origin',
        installed: false,
        enabled: false,
        ignored: false,
      },
      {
        id: 'CookieAutoDelete',
        name: 'Cookie AutoDelete',
        installed: true,
        enabled: true,
        ignored: false,
      },
      {
        id: 'PrivacyBadger',
        name: 'Privacy Badger',
        installed: false,
        enabled: false,
        ignored: true,
      },
    ] as Extension[];
    let sortedExtensions = sortExtensions(extensions);
    expect(sortedExtensions.map(({ id }) => id)).toStrictEqual([
      'uBlock',
      'PrivacyBadger',
      'CookieAutoDelete',
    ]);
    
    extensions = [
      {
        id: 'uBlock',
        name: 'uBlock Origin',
        installed: false,
        enabled: false,
        ignored: true,
      },
      {
        id: 'CookieAutoDelete',
        name: 'Cookie AutoDelete',
        installed: true,
        enabled: true,
        ignored: false,
      },
      {
        id: 'PrivacyBadger',
        name: 'Privacy Badger',
        installed: false,
        enabled: false,
        ignored: true,
      },
    ] as Extension[];
    sortedExtensions = sortExtensions(extensions);
    expect(sortedExtensions.map(({ id }) => id)).toStrictEqual([
      'PrivacyBadger',
      'uBlock',
      'CookieAutoDelete',
    ]);
  });
});
