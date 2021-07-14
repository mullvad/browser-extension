# Mullvad extension

Mullvad Privacy Companion is a Firefox extension giving an easy access to privacy settings. It will
also give information on your connection, and if you're using Mullvad, it will also allow you to
configure socks proxy.

## Development

### **Environment**

Build on:

- Node 14.16.1
- Npm 6.14.13
- Ubuntu 20.04

For:

- Firefox: last version (>89)

### **Developing**

Run `npm run serve` to automatically rebuild the extension when changes are saved.

In another terminal, run `npm run start` to start a development instance of Firefox with the
extension or `npm run debug` to also open the console in a separate window. The extension will
automatically reload when changes are saved.

The developer tools can be started by clicking on `This Firefox` in `about:debugging`, then
`inspect`.

### **Building**

Run `npm run build` to generate a new .zip, it will be created in an `artifacts` folder.

### **Testing**

The extension can be installed alongside current extensions. The extension will automatically unload
when Firefox is closed.

To install an extension temporarily:

- open Firefox
- enter "about:debugging" in the URL bar
- click "This Firefox"
- click "Load Temporary Add-on"
- open `mullvad-extension.zip` file; or the extension's folder and select any file inside of it.

## Permissions required

Permissions are automatically accepted when testing the extension (see `Resources` below). This
extension needs access to the following permissions:

- `privacy` to disable webRTC
- `browserSettings` to disable webRTC
- `proxy` to configure socks proxy
- `storage` to save preferences
- `<all_urls>` to handle requests through proxy
- `management` to be able to recommend third party extensions
