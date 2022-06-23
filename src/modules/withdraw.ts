import { Base } from "./base";
import { fromatData } from "../util";

export class Withdraw extends Base {
  /*
    currency 	string 	true 	Crypto currency
    chain	string 	false 	Chain name, reference the GET/open/API/v2 / market/coin/list (Get currency information), multiple chain required (such as withdraw  USDT to OMNI must set this parameter to "OMNI",  withdraw  USDT to TRX must set this parameter to  "TRC - 20", withdraw  USDT to ERC20 must set this parameter to  "ERC - 20"), do not need to set this parameter if there is single chain, when the more details reference to the endpoint of  “Get currency information”.
    amount 	number 	true 	Withdraw amount 
    address	string 	true 	withdraw address Note: memo please use : for splicing 
    remark  	string  	false  	Note
  */

  public withdraw({ amount, currency, address }) {
    if ([amount, currency, address].some((str) => !str.trim())) {
      console.assert(false, `Some params are required`);
      return;
    }

    const res = this.signRequest("POST", "/asset/withdraw", {
      currency,
      chain: "ERC - 20",
      amount,
      address,
    });

    const rawData = JSON.parse(res.getBody());
    const formatDatas = fromatData(rawData);

    return formatDatas;
  }
}
