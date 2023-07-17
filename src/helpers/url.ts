export const isValidURL = (tabURL: string) => {
  const url = new URL(tabURL);
  return isValidIPv4Chars(tabURL) || url.hostname ? true : false;
};

export const getHostname = (tabURL: string) => {
  let ipHostname = tabURL;
  if (isValidIPv4Chars(tabURL)) {
    // We can't use the same method as for domain name
    // because it would remove the subnet if present
    if (tabURL.endsWith('/')) {
      ipHostname = tabURL.slice(0, -1);
    }
    ipHostname = ipHostname.slice('http://'.length);
    return ipHostname;
  }
  return new URL(tabURL).hostname;
};

// This is just to detect when there's an IPv4 (and subnet)
// If the IP entered in the exception list is not valid, this is not our responsibility
function isValidIPv4Chars(tabURL: string) {
  let url = tabURL;
  if (tabURL.startsWith('http://')) {
    url = tabURL.slice('http://'.length);
  }
  return /^[0-9./]+$/.test(url);
}
