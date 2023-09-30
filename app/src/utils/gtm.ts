import TagManager from 'react-gtm-module'

const gtmId = import.meta.env.MODE === 'development' ? import.meta.env.VITE_GTM_DEVELOPMENT : import.meta.env.VITE_GTM_PRODUCTION;

console.log(gtmId)

const initGTM = () => {
  const tagManagerArgs = {
    gtmId: gtmId
  };

  TagManager.initialize(tagManagerArgs);
}

export default initGTM;


