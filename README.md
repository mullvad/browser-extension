# Mullvad extension

Mullvad Privacy Companion is a Firefox extension giving an easy access to privacy settings. It will
also give information on your connection, and if you're using Mullvad, it will also allow you to
configure socks proxy.

## Development

Run `npm run serve` to automatically rebuild the extension when changes are saved.

In another terminal, run `npm run start` to start a development instance of Firefox with the
extension or `npm run debug` to also open the console in a separate window. The extension will
automatically reload when changes are saved.

The developer tools can be accessed by clicking on `inspect` in `about:debugging`.

## Build

Run `npm run build` to generate a new .zip, it zill be created in the `artifacts` folder.

## Testing in Firefox

The extension can be installed alongside current extensions. The extension will automatically unload
when Firefox is closed.

To install an extension temporarily:

- open Firefox
- enter "about:debugging" in the URL bar
- click "This Firefox"
- click "Load Temporary Add-on"
- open `mullvad-extension.zip` file; or the extension's directory and select any file inside the
  extension.

## Permissions

Permissions are automatically accepted when testing the extension (see `Resources` below). This
extension needs access to the following permissions:

- `privacy` to disable webRTC
- `browserSettings` to disable webRTC
- `proxy` to configure socks proxy
- `storage` to save preferences
- `<all_urls>` to handle requests through proxy

## Resources

- [MDN Browser Extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Extension workshop](https://extensionworkshop.com/)
- [Testing persistent and restart features](https://extensionworkshop.com/documentation/develop/testing-persistent-and-restart-features/)
- [Testing permission requests](https://extensionworkshop.com/documentation/develop/test-permission-requests/)
