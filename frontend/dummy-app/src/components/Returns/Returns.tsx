import { SymbolWithReturn } from '../../types/returns';
import { Oval } from  'react-loader-spinner';

export interface ReturnsProps {
  returns: Array<SymbolWithReturn>;
}

export const Returns = ({ returns }: ReturnsProps) => {
  const getIcons = (symbol: string): string => {
    return `/icons/${symbol}.svg`;
  }

  return (
    <div className="relative bg-[#171618] p-8 mt-20 text-center rounded-xl min-h-[25rem]">
      <h1 className="text-xl mb-8 font-bold ridian-font">Top 10 🔥</h1>
      <div className="grid gap grid-cols-2">
        {
          returns && returns.length < 1 &&
          <div className="col-span-2 text-center justify-center mt-16">
            <div className="w-fit mx-auto text-center justify-center">
              <Oval
                height={80}
                width={80}
                color="#743ad5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#d53a9d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
            <p className="mt-8">Loading...</p>
          </div>
        }
        <div>
          {
            returns && returns.map((ret, index) => (
              <div key={index} className="flex border p-2 ridian-border">
                <img className="h-[1.5rem] mr-2" src={getIcons(ret?.symbol)} alt="" />
                <p className="font-bold">
                  {ret?.symbol}
                </p>
              </div>
            ))
          }
        </div>
        <div>
          {
            returns && returns.map((ret, index) => (
              <div key={index} className="border p-2 ridian-border">
                <p className={`${ret?.return > 0 ? 'text-[#6fe36f]' : 'text-[#f35656]'}`}>
                  {ret?.return.toFixed(6)} %
                </p>
              </div>
            ))
          }
        </div>
      </div>
      <img className="absolute bottom-[-5rem] rotate-180 left-[-10rem] z-[-10]" src="/images/background-shadow.svg" alt="" />
    </div>
  );
};