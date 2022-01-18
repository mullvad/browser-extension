import { useQuery } from 'vue-query';

const useHTTPSOnly = () => {
  const getHTTPSOnlyModeStatus = async () => {
    const { value: HTTPSOnlyMode } = await browser.privacy.network.httpsOnlyMode.get({});

    // Possible values returned are: "never", "always", "private_browsing"
    const HTTPSOnly = HTTPSOnlyMode == 'always' ? true : false;
    console.log('HTTPSOnly :>> ', HTTPSOnly);
    return HTTPSOnly;
  };
  return useQuery('HTTPSOnlyMode', getHTTPSOnlyModeStatus, { cacheTime: 0 });
};

export default useHTTPSOnly;
