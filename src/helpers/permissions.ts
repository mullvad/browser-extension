export const getProxyPermissions = async () => {
  return await browser.permissions.contains({
    permissions: ['proxy', 'tabs'],
    origins: ['<all_urls>'],
  });
};

export const requestProxyPermissions = async () => {
  return await browser.permissions.request({
    permissions: ['proxy', 'tabs'],
    origins: ['<all_urls>'],
  });
};
