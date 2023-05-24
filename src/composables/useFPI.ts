import { ref } from 'vue';

const isFPI = ref(false);

const checkFPI = async () => {
  try {
    const { value } = await browser.privacy.websites.firstPartyIsolate.get({});
    isFPI.value = value;
  } catch (error) {
    console.error(error);
  }
};

const useFPI = () => {
  checkFPI();

  return { isFPI };
};

export default useFPI;
