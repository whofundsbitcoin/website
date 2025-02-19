import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export const aggregatesData = [
  {
    funder: "Spiral",
    recipientCount: 15,
    amount: "12,500,000 USD",
    source_url: "https://spiral.xyz/",
    notes: "Grants Program",
  },
  {
    funder: "HRF",
    recipientCount: 8,
    amount: "5,500,000 USD",
    source_url: "https://hrf.org/devfund",
    notes: "Bitcoin Development Fund",
  },
  {
    funder: "BitMEX",
    recipientCount: 10,
    amount: "1,624,166 USD",
    source_url: "https://blog.bitmex.com/grants/",
    notes: "Open Source Developer Grant Program",
    source_urls: [
      "https://blog.bitmex.com/donation/",
      "https://blog.bitmex.com/2019-ford-bitcoin-grant/",
      "https://blog.bitmex.com/continued-support-of-bitcoin-development-hdr-provides-a-2nd-gift-to-the-mit-dci/",
      "https://blog.bitmex.com/hdr-global-trading-increases-bitcoin-developer-grant-to-us100000/",
      "https://blog.bitmex.com/bitcoin-developer-grant-provided-to-gleb-naumenko/",
      "https://blog.bitmex.com/hdr-okcoin-join-forces-to-provide-a-us150000-grant-to-bitcoin-c%c6%92ore-developer-amiti-uttarwar/",
      "https://blog.bitmex.com/bitcoin-developer-grant-provided-to-jeremy-rubin/",
      "https://blog.bitmex.com/bitcoin-developer-grant-provided-to-calvin-kim/",
      "https://blog.bitmex.com/100x-group-provides-third-grant-to-bitcoin-maintainer-michael-ford/",
      "https://blog.bitmex.com/renewal-of-calvin-kims-bitcoin-developer-grant/",
      "https://blog.bitmex.com/renewal-of-gleb-naumenkos-bitcoin-developer-grant/",
      "https://blog.bitmex.com/new-open-source-bitcoin-developer-grant-for-sjors-provoost-2/",
      "https://blog.bitmex.com/chris-coverdale/",
      "https://blog.bitmex.com/rene-pickhardt/",
      "https://blog.bitmex.com/renewal-of-gleb-naumenkos-bitcoin-developer-grant-3/",
      "https://blog.bitmex.com/renewal-of-chris-coverdales-bitcoin-developer-grant/",
      "https://blog.bitmex.com/renewal-of-rene-pickhardts-bitcoin-developer-grant/",
      "https://blog.bitmex.com/renewal-of-sjors-provoosts-bitcoin-developer-grant/",
      "https://blog.bitmex.com/renewal-of-chris-coverdales-bitcoin-developer-grant-2/",
      "https://blog.bitmex.com/renewal-of-rene-pickhardts-bitcoin-developer-grant-2/",
      "https://blog.bitmex.com/renewal-of-sjors-provoosts-bitcoin-developer-grant-2/",
      "https://blog.bitmex.com/brink-sponsorship/",
      "https://blog.bitmex.com/renewal-of-chris-coverdales-bitcoin-developer-grant-3/",
      "https://blog.bitmex.com/renewal-of-rene-pickhardts-bitcoin-developer-grant-3/",
    ],
  },
  {
    funder: "Superlunar",
    recipientCount: 13,
    amount: "1,225,000 USD",
    source_url: "https://superlunar.com/fund",
    notes: "An extension of the Gemini Opportunity Fund",
    source_urls: [
      "http://web.archive.org/web/20221122065633/https://www.gemini.com/blog/gemini-opportunity-fund-launches-to-support-bitcoin-core-developers",
      "http://web.archive.org/web/20221122065633/https://www.gemini.com/blog/gemini-opportunity-fund-launches-to-support-bitcoin-core-developers",
      "https://www.gemini.com/blog/gemini-opportunity-fund-donates-to-mits-digital-currency-initiative",
      "https://www.gemini.com/blog/gemini-supports-bitcoin-ecosystem-with-usd25k-mempool-space-sponsorship",
      "https://www.gemini.com/blog/gemini-to-sponsor-bitcoin-core-developer-amiti-uttarwar",
      "https://www.gemini.com/blog/gemini-to-sponsor-bitcoin-core-developers-dhruv-mehta-and-jarol-rodriguez",
      "https://www.gemini.com/blog/gemini-to-sponsor-bitcoin-core-developers-dhruv-mehta-and-jarol-rodriguez",
      "https://www.gemini.com/blog/gemini-sponsors-bitcoin-core-maintainer-fanquake",
      "https://www.superlunar.com/post/raising-the-free-and-rebellious-with-dhruv-mehta",
      "https://www.superlunar.com/post/beautifying-bitcoin-with-jarol-rodriguez",
      "https://superlunar.com/post/creating-new-chains-for-bitcoin",
      "https://www.superlunar.com/post/analyzing-data-and-describing-elephants-with-josie",
      "https://www.superlunar.com/post/africas-new-generation-of-bitcoin-developers",
    ],
  },
];
export interface AggregateEntry {
  funder: string;
  recipientCount: number;
  amount: string;
  source_url: string;
  notes: string;
}

interface FundingAggregatesTableProps {
  data: AggregateEntry[];
}

const FundingAggregatesTable: React.FC<FundingAggregatesTableProps> = ({
  data,
}) => {
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Table view for desktop
  const TableView: React.FC = () => (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Donor
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Recipients
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Amount
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Source
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Notes
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              No aggregate data available
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {row.funder}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {row.recipientCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {row.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {row.source_url ? (
                  <a
                    href={row.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
                  >
                    Link <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-6 py-4 text-sm">{row.notes || ""}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  // Card view for mobile
  const CardView: React.FC = () => (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="text-center py-10 text-sm text-gray-500 dark:text-gray-400">
          No aggregate data available
        </div>
      ) : (
        data.map((row, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col border border-gray-200 dark:border-gray-700"
          >
            {/* Header with Funder and Amount */}
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium text-base">{row.funder}</div>
              <div className="text-sm font-medium">{row.amount}</div>
            </div>

            {/* Recipients Count */}
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              {row.recipientCount} recipients
            </div>

            {/* Notes (if they exist) */}
            {row.notes && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {row.notes}
              </div>
            )}

            {/* Footer with Source */}
            <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Source:
                </span>
                {row.source_url ? (
                  <a
                    href={row.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
                  >
                    Link <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="overflow-x-auto md:rounded-lg md:border md:border-gray-200 md:dark:border-gray-700">
      <div className="hidden md:block">
        <TableView />
      </div>
      <div className="md:hidden">
        <CardView />
      </div>
    </div>
  );
};

export default FundingAggregatesTable;
