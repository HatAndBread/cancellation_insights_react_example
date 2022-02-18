import useBarecancel from './useBarecancel';
import { useState } from 'react';

const customers = ['cus_INSERT_CUSTOMER_OID_HERE', 'cus_INSERT_OTHER_CUSTOMER_OID_HERE']

function App() {
  const [accountDetails, setAccountDetails] = useState({subscriptionDetail: {customer: customers[0]}})
  useBarecancel(accountDetails, () => console.log('Cancelling customer'));
  return (
    <div className="App">
      <button id="barecancel-trigger">Click me to cancel</button>
      <br/>
      <button onClick={()=>{
        accountDetails.subscriptionDetail.customer === customers[0]
          ? setAccountDetails({subscriptionDetail: {customer: customers[1]}})
          : setAccountDetails({subscriptionDetail: {customer: customers[0]}})
      }}>Change Customer</button>
      <p>Current customer oid: {accountDetails.subscriptionDetail.customer}</p>
    </div>
  );
}

export default App;
