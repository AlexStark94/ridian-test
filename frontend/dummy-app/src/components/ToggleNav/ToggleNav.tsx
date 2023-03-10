export interface ToggleNavProps {
  onClick: (boolean) => void;
  tabs: Array<string>;
  value: boolean;
}

export const ToggleNav = ({ onClick, value, tabs }: ToggleNavProps) => {
  return (
    <div className="w-100 text-center mb-8 ridian-font text-xl">
      <div
        onClick={() => onClick(false)}
        className={`border-b-2 inline-block px-8 py-4 cursor-pointer ${!value ? 'ridian-border' : ''}`}
      >
        <p>{tabs[0]}</p>
      </div>
      <div 
        onClick={() => onClick(true)}
        className={`border-b-2 inline-block px-8 py-4 cursor-pointer ${value ? 'ridian-border' : ''}`}
      >
        <p>{tabs[1]}</p>
      </div>
    </div>
  );
};