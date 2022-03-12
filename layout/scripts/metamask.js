
window.userWalletAddress = null
const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')
const whitelist = document.getElementById('whitelist')
iswhitelist.style.visibility='hidden'
var whitelist_address = [
    "0x046659bB263FD831e3e1383E7AcB6c37B622b29f,tester1", 
    "0x753664aFD19BaBbd0c2BEdd3A77e6609eEB54DA4,tester2"
];

function toggleButton() {
if (!window.ethereum) {
    loginButton.innerText = 'MetaMask is not installed'
    loginButton.classList.remove('bg-purple-500', 'text-white')
    loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
    return false
}

loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
    console.error(e.message)
    return
    })
if (!accounts) { return }

window.userWalletAddress = accounts[0]
userWallet.innerText = window.userWalletAddress+"\r您好，本網站偵測到此地址不在社員列表裡面，如有問題請私訊粉專，謝謝！"
loginButton.innerText = 'Sign out of MetaMask'


for(i=0;i<whitelist_address.length;i++)
{
    if(accounts[0] == whitelist_address[i].split(",")[0].toLowerCase())
    {
        iswhitelist.style.visibility=''
        userWallet.innerText = whitelist_address[i].split(",")[1]+"社員，您好"
        break
    }
}

loginButton.removeEventListener('click', loginWithMetaMask)
setTimeout(() => {
    loginButton.addEventListener('click', signOutOfMetaMask)
}, 200)
}

function signOutOfMetaMask() {
window.userWalletAddress = null
userWallet.innerText = ''
loginButton.innerText = 'Sign in with MetaMask'
iswhitelist.style.visibility='hidden'

loginButton.removeEventListener('click', signOutOfMetaMask)
setTimeout(() => {
    loginButton.addEventListener('click', loginWithMetaMask)
}, 200)
}

window.addEventListener('DOMContentLoaded', () => {
toggleButton()
});
