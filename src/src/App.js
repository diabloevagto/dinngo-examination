import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWeb3React } from '@web3-react/core';

const {
  utils: { parseEther, formatEther },
} = ethers;

export default function App() {
  const context = useWeb3React();
  const { register, handleSubmit, errors } = useForm();
  const [sending, setSending] = useState(false);
  const [balance, setBalance] = useState(0);

  const { library, account } = context;

  const updateBalance = useCallback(() => {
    library
      .getBalance(account)
      .then((balance) => {
        setBalance(formatEther(balance));
      })
      .catch(() => {
        setBalance(0);
      });
  }, [account, library]);

  useEffect(() => {
    updateBalance();
  }, [updateBalance]);

  const onSubmit = useCallback(
    ({ address, value }) => {
      library
        .getSigner(account)
        .sendTransaction({
          to: address,
          value: parseEther(value),
        })
        .then((signature) => {
          setSending(true);
          signature.wait().then((v) => {
            setSending(false);
            updateBalance();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [account, library, updateBalance],
  );

  return (
    <div>
      <h3>eth balance: {balance}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            name="address"
            placeholder="address"
            defaultValue={account}
            ref={register({ required: true })}
          />
          {errors.address && <span>address is required</span>}
        </div>
        <div>
          <input
            name="value"
            placeholder="eth amount"
            ref={register({ required: true, max: balance })}
          />
          {errors.value && <span>amount is required</span>}
        </div>
        <div>
          <button type="submit" disabled={sending}>
            send
          </button>
        </div>
      </form>

      {sending && <h3>sending</h3>}
    </div>
  );
}
