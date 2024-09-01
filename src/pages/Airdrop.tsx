import TokenAirdrop from '@/components/TokenAirdrop'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from 'react'

const Airdrop = () => {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className='bg-slate-800'>
            {isClient && <TokenAirdrop />}
            <div>
                {isClient && <WalletMultiButton />}
            </div>
        </div>
    );
};

export default Airdrop;
