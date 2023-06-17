import { createWalletClient, custom } from "viem";
import { createPublicClient, http } from "viem";
import { Chain, filecoinCalibration } from "viem/chains";

const localnet: Chain = {
    id: 31415926,
    name: "Filecoin Hyperspace",
    network: "filecoin-hyperspace",
    nativeCurrency: {
        decimals: 18,
        name: "testnet filecoin",
        symbol: "tFIL",
    },
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:1234/rpc/v1"],
        },
        public: {
            http: ["http://127.0.0.1:1234/rpc/v1"],
        },
    },
};

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