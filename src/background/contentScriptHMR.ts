import { isForbiddenUrl } from '@/env';

// Firefox fetch files from cache instead of reloading changes from disk,
// hmr will not work as Chromium based browser
browser.webNavigation.onCommitted.addListener(({ frameId, url }) => {
  // Filter out non main window events.
  if (frameId !== 0) return;

  if (isForbiddenUrl(url)) return;
});
