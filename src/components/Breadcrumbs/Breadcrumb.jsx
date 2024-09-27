import Link from "next/link";

const Breadcrumb = ({ pageName, totalBet, totalReturn }) => {

  console.log('totalBet', totalBet)
  console.log('totalReturn', totalReturn)
  let pnl = totalReturn - totalBet
  
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            Current Bet: €{totalBet}
          </li>
          <li className="font-medium text-primary">-</li>
          {/* <li
            className={`font-medium ${totalReturn < totalBet ? 'text-red-500' : 'text-green-500'
              }`}
          >
            Current Return: €{totalReturn}
          </li> */}
          <li
            className={`font-medium ${pnl + 50 <= totalBet ? 'text-red-500' : 'text-green-500'
              }`}
          >
            P&L: €{pnl.toFixed(2)}
          </li>
        </ol>

      </nav>
    </div>
  );
};

export default Breadcrumb;
