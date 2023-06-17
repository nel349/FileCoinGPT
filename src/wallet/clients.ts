import { createWalletClient, custom } from "viem";
import { createPublicClient, http } from "viem";
import { filecoinCalibration } from "viem/chains";

export const currentChain = filecoinCalibration;

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