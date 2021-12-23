import { useBrowserStorage } from '@/composables/useBrowserStorage';
import { computed } from 'vue';
import { Extension, ExtensionInfo } from '@/composables/useExtensions/Extension.types';
import {
  defaultExtensions,
  defaultExtensionIds,
} from '@/composables/useExtensions/defaultExtensions';
import sortExtensions from '@/composables/useExtensions/sortExtensions';
import { storage } from 'webextension-polyfill';

const extensions = useBrowserStorage<Extension[]>('extensions', defaultExtensions);

const updateExtConfig = async (extensionInfo: ExtensionInfo, modification: Partial<Extension>) => {
  if (defaultExtensionIds.includes(extensionInfo.id)) {
    extensions.value = extensions.value.map((extension) => {
      return extension.id === extensionInfo.id ? { ...extension, ...modification } : extension;
    });
  }
};

const loadExtConfigs = async (): Promise<void> => {
  // Get installed addons
  const installedAddons = await browser.management.getAll();

  // Create a disabled extensions ID list
  const disabledIDs = installedAddons.filter((addon) => !addon.enabled).map((addons) => addons.id);

  const enabledIDs = installedAddons.filter((addon) => addon.enabled).map((addons) => addons.id);

  // HACK!
  // We need to get the "actual" value stored in local storage here.
  // Do not trust extensions.value since it contains defaultExtensions at this point in time
  const storedExtensionsData = await storage.local.get('extensions');
  const storedExtensions: Extension[] = JSON.parse(storedExtensionsData.extensions);
  
  extensions.value = storedExtensions.map((ext) => {
    if (disabledIDs.includes(ext.id)) {
      // ext disabled
      return { ...ext, installed: true, enabled: false };
    } else if (enabledIDs.includes(ext.id)) {
      // ext enabled
      return { ...ext, installed: true, enabled: true };
    }
    // ext to install
    return ext;
  });
};

const useExtensions = () => {
  // sortExtensions MUST NOT mutate the original list
  const sortedExtensions = computed(() => sortExtensions(extensions.value));

  const recommendedExtensions = computed(() =>
    extensions.value.filter(
      (extension) => !extension.ignored && (!extension.enabled || !extension.installed),
    ),
  );

  return { extensions: sortedExtensions, updateExtConfig, loadExtConfigs, recommendedExtensions };
};

export default useExtensions;
