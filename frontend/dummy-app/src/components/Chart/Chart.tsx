import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export interface ChartProps {
  data: Array<{
    date: string;
    value: number;
  }>
}

export const Chart = ({ data }: ChartProps) => {
  const [filter, setFilter] = useState("DAILY");
  const [filteredData, setFilteredData] = useState([]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 100]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const filterOptions = () => {
    const reducedData = [];
    if (filter === "DAILY") {
      setFilteredData(data);
    }
    if (filter === "MONTHLY") {
      data?.reduce(function (res, value) {
        let dateByMonth = `${new Date(value.date).getFullYear()}-${(new Date(value.date).getMonth() + 1) < 10 ? `0${new Date(value.date).getMonth() + 1}` : new Date(value.date).getMonth() + 1}`;
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

      setFilteredData(reducedData);
    }

    if (filter === "YEARLY") {
      data?.reduce(function (res, value) {
        let dateByYear = `${new Date(value.date).getFullYear()}`;
        if (!res[dateByYear]) {
          res[dateByYear] = { date: dateByYear };

          Object.keys(value).forEach(function (key) {
            if (key != 'date') {
              res[dateByYear][key] = 0;
            }
          })

          reducedData.push(res[dateByYear])
        }

        Object.keys(value).forEach(function (key) {
          if (key != 'date') {
            res[dateByYear][key] += value[key];
          }
        })

        return res;
      }, {});

      setFilteredData(reducedData);
    }
  }

  const setYAxis = () => {
    let highest = Number.NEGATIVE_INFINITY;
    data?.forEach(nav => {
      if (nav.value > highest) {
        highest = nav.value;
      }
    });
    setYAxisDomain([0, Number((highest + 50).toFixed(0))]);
  };

  useEffect(() => {
    filterOptions();
    setYAxis();
  }, [filter, setFilter, data]);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="relative">
      <div className="w-100">
        <button
          onClick={() => setFilter("DAILY")}
          className={`px-6 py-2 border mr-4 ${filter === "DAILY" ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : ''} ridian-border`}
        >
          Daily
        </button>
        <button
          onClick={() => setFilter("MONTHLY")}
          className={`px-6 py-2 border mr-4 ${filter === "MONTHLY" ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : ''} ridian-border`}
        >
          Monthly
        </button>
        <button
          onClick={() => setFilter("YEARLY")}
          className={`px-6 py-2 border mr-4 ${filter === "YEARLY" ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : ''} ridian-border`}
        >
          Yearly
        </button>
      </div>
      <div className="absolute mt-8 w-100 h-[32rem]">
        <LineChart width={500} height={475} data={filteredData}>
          <Line type="step" dataKey="value" stroke="transparent" dot={null} />
          <YAxis domain={yAxisDomain} />
        </LineChart>
      </div>
      <div className="relative z-20 w-100 overflow-x-scroll mt-8  h-[32rem]">
        <ResponsiveContainer width={(100 * filteredData?.length) < 10000 ? "100%" : (100 * filteredData?.length || "100%")} height="100%">
          <LineChart width={(100 * filteredData?.length) < 800 ? 800 : 100 * filteredData?.length} height={500} data={filteredData}>
            <Line type="linear" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#333" strokeDasharray="10" />
            <XAxis dataKey="date" />
            <YAxis domain={yAxisDomain} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};