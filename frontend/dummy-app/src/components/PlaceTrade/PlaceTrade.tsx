import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { toastError, toastSuccess } from '../../utils/toasts';
import { getItemFromLocalStorage, useLocalStorage } from '../../hooks/useLocalStorage';
import { ToggleNav } from '../ToggleNav/ToggleNav';

const schema = yup
  .object({
    symbol: yup.string().max(50).min(3).required(),
  })
  .required();

export const PlaceTrade = () => {
  const [userTrades, setUserTrades] = useLocalStorage<Array<any>>('trades', []);
  const [tradeTabs, setTradeTabs] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (formData: FieldValues) => {
    await api.post(`/place_trade/${formData.symbol}`).then(({ data }) => {
      toastSuccess(data);
      const trades: Array<any> = userTrades;
      trades.push({
        symbol: formData.symbol,
        ...data
      })
      setUserTrades(trades);
    }, (error) => {
      toastError();
    });
  }

  const getTrades = () => {
    if (getItemFromLocalStorage('trades')) {
      setUserTrades(getItemFromLocalStorage('trades'));
    }
  }

  useEffect(() => {
    getTrades();
  }, []);

  return (
    <div className="relative bg-[#171618] p-8 mt-20 text-center rounded-xl h-fit">
      <ToggleNav onClick={setTradeTabs} value={tradeTabs} tabs={["Place Trade", "Your Trades"]} />
      {
        !tradeTabs &&
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-left mb-8">
              <input placeholder="Enter Symbol name" className="rounded border border-violet-500 h-10 w-[100%] mt-2 px-4 text-[#333]" {...register("symbol")} type="text" />
            </div>
            <button className="w-[100%] px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg" type="submit">Buy</button>
          </form>
        </div>
      }
      {
        tradeTabs && userTrades?.length > 0 &&
        <div className="px-8 py-4">
          {
            userTrades && userTrades?.map((trade, index) => (
              <div key={index} className="border p-3">
                <p className="text-sm">{trade.date} - "{trade.symbol}" Trade placed for $ {trade.price}</p>
              </div>
            ))
          }
        </div>
      }
      {
        tradeTabs && userTrades.length < 1 &&
        <div className="px-8 py-4">
          <p>
            There's no trades to show for now
          </p>
        </div>
      }

    </div>
  );
};