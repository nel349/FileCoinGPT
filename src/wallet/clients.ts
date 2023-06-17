import { Chain, createWalletClient, custom } from "viem";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const currentChain = sepolia as Chain;

export const publicClient = createPublicClient({
    chain: currentChain,
    transport: http(),
});


export const walletClient = async () => {
    const [account] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    return createWalletClient({
        chain: currentChain,
        transport: typeof (window as any).ethereum !== 'undefined' ? custom((window as any).ethereum) : http(),
        account: account,
    });
}