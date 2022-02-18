import { useEffect } from 'react';

const config = {
  BAREMETRICS_TOKEN: 'REPLACE-ME-WITH-YOUR-CANCELLATION-INSIGHTS-TOKEN',
  NODE_ENV: 'production'
}

function loadScript () {
  return new Promise((resolve) => {
    if (window.barecancel && window.barecancel.created) return resolve();

    const script = document.createElement('script');
    script.src = 'https://baremetrics-barecancel.baremetrics.com/js/application.js'
    script.async = !0 
    document.body.appendChild(script) 
    script.onload = () => {
      window.barecancel.created = true;
      resolve();
    }
  });
}

function useBarecancel(accountDetails, cancelPlan) { 
  const stripeCustomerId = accountDetails?.subscriptionDetail?.customer;
  useEffect(() => {
    const resetParams = () => {
      window.barecancel.params = { 
        access_token_id: config.BAREMETRICS_TOKEN,
        customer_oid: stripeCustomerId,
        comment_required: true,
        test_mode: config.NODE_ENV !== 'production',
        callback_send: cancelPlan, 
      } 
      console.log(window.barecancel.params.customer_oid)
    }
    loadScript().then(resetParams);
  }, [stripeCustomerId, cancelPlan]) }

export default useBarecancel;