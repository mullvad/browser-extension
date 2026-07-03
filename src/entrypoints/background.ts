import { defineBackground } from 'wxt/utils/define-background';
import { addExtensionsListeners } from '@/helpers/extensions';
import { initProxyListeners } from '@/helpers/proxyListeners';
import { initConfig } from '@/helpers/config';

export default defineBackground({
  persistent: true,
  main() {
    // Add listeners on extension actions
    addExtensionsListeners();

    // Add listeners for proxy actions
    initProxyListeners();

    // Fetch and save the conncheck config
    void initConfig();
  },
});
