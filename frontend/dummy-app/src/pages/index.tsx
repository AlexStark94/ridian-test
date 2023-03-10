'use client';

import React, { useEffect, useState } from 'react';
import { Nav } from "../components/Nav/Nav";
import { PlaceTrade } from "../components/PlaceTrade/PlaceTrade";
import { Returns } from "../components/Returns/Returns";
import { api } from '../services/api';

export default function Page() {
  const [navs, setNavs] = useState(null);
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    getNavs();
    getTopTenReturns();
  }, []);

  const getNavs = async () => {
    const { data }: any = await api.get(`/navs`);
    const hourlyNavs = [];
    const dailyNavs = [];

    for (let i in data.hourly_navs["1"]) {
      hourlyNavs.push({
        date: i,
        value: data.hourly_navs["1"][i]
      });
    }

    for (let i in data.daily_navs["1"]) {
      dailyNavs.push({
        date: i,
        value: data.daily_navs["1"][i]
      });
    }

    setNavs({
      hourlyNavs,
      dailyNavs
    });
  }

  const getTopTenReturns = async () => {
    const { data } = await api.get(`/top_10`);

    const promises = data?.top_10?.map((symbol: string) =>
      api.get(`/return_${symbol}`).then(({ data }) => {
        return {
          symbol,
          return: data.return
        }
      })
    );

    const symbolsWithReturns = await Promise.all(promises);

    setSymbols(symbolsWithReturns);
  }

  return (
    <div className="mt-8 mb-20">
      <div className="">
        <Nav data={navs} />
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Returns returns={symbols} />
        <PlaceTrade />
      </div>
    </div>
  );
}