export const closePopup = () => {
  // The delay is added to stop a new empty browser window from opening
  // when installing the extension from the popup
  setTimeout(() => {
    window.close();
  }, 100);
};
