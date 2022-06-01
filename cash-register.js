function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let finalChange = [];

   change = change * 100;

  let tempReg = [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER",0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
  ];
  for(let i = 0; i < cid.length; i++){
    cid[i][1] = cid[i][1] * 100;
  }
  let currencyUnits = {
    8: 10000,
    7: 2000,
    6: 1000,
    5: 500,
    4: 100,
    3: 25,
    2: 10,
    1: 5,
    0: 1
  }



  for(let i = 9; i >= 0; i -= 1){
    let div = parseInt(change/currencyUnits[i]) > 0;
      if(change > 0){
      if(div){
        for(let j = parseInt(change/currencyUnits[i]); j > 0; j--){
          if(cid[i][1] > 0){
          change = change - currencyUnits[i];
          cid[i][1] -= currencyUnits[i];
          tempReg[i][1] += currencyUnits[i];
       }
       }
       finalChange.push(tempReg[i]);
      }  
    }
  }

  for(let i = 0; i < finalChange.length; i++){
    finalChange[i][1] = finalChange[i][1]/100;
  }
  let emptyCid = 0;
  for(let i = 0; i < cid.length; i++){
    emptyCid += cid[i][1];
  }
  let sumFinal = 0;
  
  for(let i = 0; i < finalChange.length; i++){
    sumFinal += finalChange[i][1];
  }


  if(sumFinal < change){
  return {status: "INSUFFICIENT_FUNDS", change: []};
}

  if(emptyCid == 0){
    return {status: "CLOSED", change: tempReg};
  }



  return {status: "OPEN", change: finalChange};
}
