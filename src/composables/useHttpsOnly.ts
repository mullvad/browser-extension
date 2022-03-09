import { privacy } from 'webextension-polyfill';

const useHttpsOnly = async () => {
  const { value: httpsOnlyMode } = await privacy.network.httpsOnlyMode.get({});
  // Possible values returned are: "never", "always", "private_browsing"
  return httpsOnlyMode === 'always';
};

export default useHttpsOnly;
