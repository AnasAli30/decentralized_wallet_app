import { useState,useEffect } from "react";
import "./Main.css";


function Accounts({web3,setAddress}) {
  const [provider,setProvider] = useState(null);
  const [Balance,setBalance] = useState(null);
  const [account,setAccount] = useState(null);
  useEffect(()=>{
    async function allAccount(){
      setProvider("ganache");
      const select = document.querySelector("#selectNumber");
      const options = await web3.eth.getAccounts();
      console.log(options);
      for(let i =0;i<options.length;i++){
        let opt = options[i];
        let element = document.createElement("option");
        element.textContent=opt;
        element.value=opt;
        select.appendChild(element);
      }
    }
    web3 && allAccount();
  },[web3]);


    async function selectAccount(){
      let selectedAccount = document.querySelector("#selectNumber").value;
      console.log(selectedAccount);
      if(selectedAccount && selectedAccount!="select an account"){
        setAddress(selectedAccount)
        const accountBalace = await web3.eth.getBalance(selectedAccount);
        const etherBalace = web3.utils.fromWei(accountBalace,"ether");
        setBalance(etherBalace);
        setAccount(selectedAccount);
      }
      
    }

  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="">Select an account</label>
        <select 
        className="innerBox"
         id="selectNumber"
          onChange={selectAccount
        }>
          <option>Select an acount</option>
          
          
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance:{Balance}</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
