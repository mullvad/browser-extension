![ci](https://github.com/mullvad/browser-extension/actions/workflows/ci.yml/badge.svg)

# Mullvad Browser Extension

Mullvad Browser Extension is a Firefox extension improving your browser experience while using
Mullvad VPN. It also displays information about the connection, recommends optimal DNS settings, and
a one-click access to [proxy servers](https://mullvad.net/en/help/socks5-proxy/).

## Download

You can visit our [download page](https://mullvad.net/en/download/browser/extension) to get the
latest release.

The extension is also available here on Github in the
[Releases](https://github.com/mullvad/browser-extension/releases).

## Permissions

Mullvad Browser Extension requires the following permissions:

- `management` to be able to recommend third party extensions
- `privacy` to disable webRTC
- `proxy` to configure and use Mullvad proxy servers
- `storage` to save preferences
- `search` to recommend other search engines
- `*://*.mullvad.net/*` to get proxy servers list and display your connection information (See
  `Network requests` for details)

_Permissions are automatically accepted when testing the extension._

## Network requests

Two external network requests are made by the extension:

- `api.mullvad.net` to get the lastest proxy servers (Frequency: each time the
  `Select proxy server location` drawer is opened)
- `am.i.mullvad.net` to get the connection information (Frequency: each time the popup is started
  and each time the proxy is connected/disconnected)

## Development

### **Environment**

Build with:

- Node 18.14.2
- Npm 9.5.0

_If you use `nvm`, run `nvm use` to automatically set these versions._

For:

- Firefox: last version (>91.1.0)

### **Developing**

The first time, use `npm install` to install the necessary packages.

To start the extension in a a temporary and clean browser:

- use `npm run dev` to automatically rebuild the extension when changes are saved.
- use `npm start` in another terminal to start a development instance of Firefox with the extension
  loaded. The extension will automatically reload when changes are saved.

The developer tools can be started by clicking on the `inspect` in the debugging tab (automatically
opened).

### **Building**

- use `npm run build` to build the extension **first**
- use `npm run pack:xpi` to create `.xpi` file in the root folder

_There are other build options which you can view in `package.json`._

### **Testing the extension in your browser**

You can only install the extension temporarily when it is not signed by Mozilla. To do so:

- open Firefox
- enter "about:debugging#/runtime/this-firefox" in the URL bar
- click "Load Temporary Add-on"
- open `extension.xpi` file.

The extension will automatically unload when Firefox is closed.

### **Testing restart and persisting features**

You can use the `restart` script to test restart and persisting features (like settings saved to
local storage). It will require some manual configuration:

- go to `about:profiles` and create a new Firefox profile
- go to `package.json` and change the `restart` script with your own Firefox profile path
- go to `about:config` and set both `extensions.webextensions.keepStorageOnUninstall` and
  `extensions.webextensions.keepUuidOnUninstall` to `true`.

[Learn more](https://extensionworkshop.com/documentation/develop/testing-persistent-and-restart-features/)

## Permissions

Mullvad Browser Extension requires the following permissions:

- `management` to be able to recommend third party extensions
- `privacy` to disable webRTC
- `proxy` to configure and use Mullvad proxy servers
- `storage` to save preferences
- `search` to recommend other search engines
- `*://*.mullvad.net/*` to get proxy servers list and display your connection information (See
  `Network requests` for details)

_Permissions are automatically accepted when testing the extension._

## Network requests

Two external network requests are made by the extension:

- `api.mullvad.net` to get the lastest proxy servers (Frequency: each time the
  `Select proxy server location` drawer is opened)
- `am.i.mullvad.net` to get the connection information (Frequency: each time the popup is started
  and each time the proxy is connected/disconnected)

_External links are marked with this icon_
![External Link icon](https://github.com/feathericon/feathericon/blob/master/src/svg/link-external.svg)

## Source code

Source code is available in the [Github repo](https://github.com/mullvad/browser-extension).
