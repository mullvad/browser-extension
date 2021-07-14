interface ExtsStatus {
  [extensionID: string]: Boolean;
}

export async function checkInstalledExts(ids: string[]): Promise<ExtsStatus> {
  // List all installed extensions
  const allExtensions = await browser.management.getAll();
  const extsStatus = {} as ExtsStatus;

  ids.forEach((id) => {
    const isInstalled = allExtensions.filter((ext) => ext.id === id).length === 1;
    extsStatus[id] = isInstalled;
  });

  return extsStatus;
}
