import { abi, contractAddress } from "./constants.js"
import { ethers } from "./ethers-5.6.esm.min.js"
const connectButton = document.getElementById("connectBtn")
const fundButton = document.getElementById("fundBtn")
const balanceButton = document.getElementById("balanceBtn")
const withdrawBtn = document.getElementById("withdrawBtn")
console.log(ethers)

const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
        console.log("Meta Mask is available")
        await window.ethereum.request({ method: "eth_requestAccounts" })
        connectButton.innerHTML = "Connected"
        console.log("Connected")
    } else {
        connectButton.innerHTML = "Please Install metamask"
        console.log("No metamask")
    }
}

const fund = async () => {
    const ethAmt = document.getElementById("ethAmt").value
    console.log(`Funding with ${ethAmt}....`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const txeRes = await contract.fund({
                value: ethers.utils.parseEther(ethAmt),
            })
            await listenForTransactionMine(txeRes, provider)
        } catch (e) {
            console.log(e)
        }
    }
}

const getBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}

const withdraw = async () => {
    if (typeof window.ethereum !== "undefined") {
        console.log("Withdrawing...")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const txe = await contract.withdraw()
            await listenForTransactionMine(txe, provider)
        } catch (e) {
            console.log(e)
        }
    }
}

function listenForTransactionMine(txeRes, provider) {
    console.log(`Mining ${txeRes.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(txeRes.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `,
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getBalance
withdrawBtn.onclick = withdraw
