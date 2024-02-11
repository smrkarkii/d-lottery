import { ethers } from "ethers";

let signer = null;
let provider;

if (window.ethereum) {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
} else {
  window.alert("Please install metamask");
}
