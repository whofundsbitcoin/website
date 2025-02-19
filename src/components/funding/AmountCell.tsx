import React from "react";

interface AmountCellProps {
  amount: string;
  isIncomplete?: boolean;
}

const AmountCell: React.FC<AmountCellProps> = ({ amount, isIncomplete }) => {
  if (!amount || amount === "NA") return <span>{""}</span>;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("incomplete-amount");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isIncomplete) {
    return (
      <div className="inline-flex items-center gap-0.5">
        <span>{amount}</span>
        <button
          onClick={handleClick}
          className="text-orange-500 hover:text-orange-600 font-medium ml-0.5"
          title="Click for more information about incomplete amounts"
        >
          +
        </button>
      </div>
    );
  }

  return <span>{amount}</span>;
};

export default AmountCell;
