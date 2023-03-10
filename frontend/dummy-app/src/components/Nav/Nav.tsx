import { useState, useEffect } from "react";
import { ToggleNav } from "../ToggleNav/ToggleNav";
import { Chart } from "../Chart/Chart";

export interface NavProps {
  data: {
    hourlyNavs: Array<any>;
    dailyNavs: Array<any>;
  }
}

export const Nav = ({ data }: NavProps) => {
  const [hourlyTab, setHourlyTab] = useState(false);

  const [sortedDailyNavs, setSortedDailyNavs] = useState(data?.dailyNavs);
  const [sortedHourlyNavs, setSortedHourlyNavs] = useState(data?.hourlyNavs);

  const [combinedNavs, setCombinedNavs] = useState([]);

  useEffect(() => {
    setSortedDailyNavs(data?.dailyNavs?.sort(
      (a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      })
    );
  }, [data]);

  useEffect(() => {
    let reducedData = [];
    data?.hourlyNavs?.reduce(function (res, value, index) {
      const year = new Date(value.date.split(" ")[0]).getFullYear();
      const month = (new Date(value.date.split(" ")[0]).getMonth() + 1) < 10 ? `0${new Date(value.date.split(" ")[0]).getMonth() + 1}` : new Date(value.date.split(" ")[0]).getMonth() + 1;
      const day = (new Date(value.date.split(" ")[0]).getDay() + 1) < 10 ? `0${new Date(value.date.split(" ")[0]).getDay() + 1}` : new Date(value.date.split(" ")[0]).getDay() + 1;
      let dateByMonth = `${year}-${month}-${day}`;
      if (!res[dateByMonth]) {
        res[dateByMonth] = { date: dateByMonth };

        Object.keys(value).forEach(function (key) {
          if (key != 'date') {
            res[dateByMonth][key] = 0;
          }
        })

        reducedData.push(res[dateByMonth])
      }

      Object.keys(value).forEach(function (key) {
        if (key != 'date') {
          res[dateByMonth][key] += value[key];
        }
      })

      return res;
    }, {});

    setSortedHourlyNavs(reducedData);

  }, [data]);

  useEffect(() => {
    if (sortedDailyNavs && sortedHourlyNavs) {
      setCombinedNavs([...sortedDailyNavs, ...sortedHourlyNavs].sort(
        (a, b) => {
          if (a.date > b.date) {
            return 1;
          } else if (a.date < b.date) {
            return -1;
          } else {
            return 0;
          }
        }));
    }

  }, [sortedDailyNavs, sortedHourlyNavs]);



  return (
    <div className="relative">
      <ToggleNav onClick={setHourlyTab} value={hourlyTab} tabs={["Daily Navs", "Historical navs"]} />
      <div className="grid gap-4 grid-cols-1">
        {
          !hourlyTab &&
          <div
            className="w-100 p-8 inline-block align-top border-2 bg-[#171618] text-[#fcfcfd] rounded-lg h-[42rem] overflow-y-auto text-center ridian-border"
          >
            <Chart data={combinedNavs} />
          </div>
        }
        {
          hourlyTab &&
          <div
            className="p-8 inline-block align-top border-2 bg-[#171618] text-[#fcfcfd] h-[42rem] overflow-y-auto ridian-border"
          >
            {
              combinedNavs && combinedNavs.map((nav, index) => (
                <div key={index}>
                  {nav?.date} - {nav?.value}
                </div>
              ))
            }
          </div>
        }
      </div>
      <img className="w-[60rem] absolute bottom-[-15rem] right-[-15rem] z-[-10]" src="/images/background-shadow.svg" alt="" />
    </div>

  );
};