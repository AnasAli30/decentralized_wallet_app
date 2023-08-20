import { useState } from "react";
import "./Main.css";

function SendEther({web3,account}) {
  const [receipt,setReceipt] =useState(null);
  const [toggle,setToggle] =useState(null);


  function SendEther(event){
    event.preventDefault();
    const _to = document.querySelector("#to").value;
    const _value = document.querySelector("#value").value;
    const weivalue = web3.utils.toWei(_value,"ether");
    web3.eth.sendTransaction({
      from:account,
      to:_to,
      value:-_value,


    }).then(function(receipt){
      setReceipt(receipt);
      setToggle(true);
      

    })
  }

    return (
    <>
      <form className="box" onSubmit={SendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>(Json Response)</h3>
          <code>{toggle && JSON.stringify(receipt,["transactionHash","blockHash","blockNumber"],2)}</code>
        </pre>
      </div>
    </>
  );
}

export default SendEther;
