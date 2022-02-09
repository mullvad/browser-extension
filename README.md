![ci](https://github.com/mullvad/browser-extension/actions/workflows/ci.yml/badge.svg)

# Mullvad Privacy Companion

Mullvad Privacy Companion is a Firefox extension helping you improve your online privacy by
recommending extensions and browser settings. It also displays information about the connection.
When using Mullvad, it provides a one-click access to
[proxy servers](https://mullvad.net/en/help/socks5-proxy/).

## Development

### **Environment**

Build with:

- Node 16.13.0
- Npm 8.3.0

_If you use `nvm`, run `nvm use` to automatically set these versions._

For:

- Firefox: last version (>89)

### **Developing**

The first time, run `npm install` to install the necessary packages.

Then:

- run `npm run dev` to automatically rebuild the extension when changes are saved.
- run `npm run start` in another terminal to start a development instance of Firefox with the
  extension loaded. The extension will automatically reload when changes are saved.

The developer tools can be started by clicking on the `inspect` in the debugging tab (automatically
opened).

### **Building**

Run `npm run pack:xpi` to create the extension in the root folder. There are other build options
which you can view in `package.json`.

### **Testing**

The extension can be installed alongside current extensions. The extension will automatically unload
when Firefox is closed.

To install an extension temporarily:

- open Firefox
- enter "about:debugging#/runtime/this-firefox" in the URL bar
- click "Load Temporary Add-on"
- open `extension.xpi` file.

## Permissions required

Permissions are automatically accepted when testing the extension (see `Resources` below). This
extension needs access to the following permissions:

- `management` to be able to recommend third party extensions
- `privacy` to disable webRTC
- `proxy` to configure and use Mullvad proxy servers
- `storage` to save preferences
- `*://*.mullvad.net/*` to get proxy servers list and display your connection information (See
  `Network requests` for details)

## Network requests

Two external network requests are made by the extension:

- `api.mullvad.net` to get the lastest proxy servers (Frequency: each time the
  `Select proxy server location` drawer is opened)
- `am.i.mullvad.net` to get the connection information (Frequency: each time the popup is started
  and each time the proxy is connected/disconnected)

External links are marked with the following icon:
![External Link icon](https://github.com/feathericon/feathericon/blob/master/src/svg/link-external.svg)
