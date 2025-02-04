import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FundingEntry {
  funder: string;
  recipient: string;
  amount: string;
  date: string;
  source_url: string | null;
  notes: string | null;
}

interface AggregateEntry {
  funder: string;
  recipientCount: number;
  amount: string;
  source_url: string;
  notes: string;
}

interface FundingStatsProps {
  data: FundingEntry[];
  aggregateData: AggregateEntry[];
  searchQuery?: string;
  selectedFunder: string;
  selectedRecipient: string;
  selectedYear: string;
}

const FundingStats: React.FC<FundingStatsProps> = ({
  data,
  aggregateData,
  searchQuery = "",
  selectedFunder = "all",
  selectedRecipient = "all",
  selectedYear = "all",
}) => {
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery !== "" ||
      selectedFunder !== "all" ||
      selectedRecipient !== "all" ||
      selectedYear !== "all"
    );
  }, [searchQuery, selectedFunder, selectedRecipient, selectedYear]);

  // Process data and calculate totals
  const { uniqueFunders, uniqueRecipients, yearRange, formattedTotals } =
    useMemo(() => {
      // For individual donations
      const funders = new Set(data.map((d) => d.funder));
      const recipients = new Set(data.map((d) => d.recipient));

      // Calculate year range from individual donations
      const years = data
        .map((d) => parseInt(d.date.split("/")[0]))
        .filter(Boolean);
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      // Calculate totals including both individual and aggregate data
      let totalUSD = 0;
      let totalBTC = 0;

      // Process individual donations
      data.forEach((entry) => {
        if (!entry.amount || entry.amount === "NA") return;
        const amountStr = entry.amount.replace(/,/g, "");
        const match = amountStr.match(/^(\d+(?:\.\d+)?)\s*(BTC|USD)?$/);

        if (match) {
          const [, value, currency] = match;
          const numValue = parseFloat(value);

          if (currency === "BTC") {
            totalBTC += numValue;
          } else {
            totalUSD += numValue;
          }
        }
      });

      // Add aggregate data if no filters are active
      if (!hasActiveFilters) {
        // Add unique funders and their recipient counts from aggregates
        aggregateData.forEach((agg) => {
          funders.add(agg.funder);

          // Process aggregate amounts
          const amountStr = agg.amount.replace(/,/g, "");
          const match = amountStr.match(/^(\d+(?:\.\d+)?)\s*(BTC|USD)?$/);

          if (match) {
            const [, value, currency] = match;
            const numValue = parseFloat(value);

            if (currency === "BTC") {
              totalBTC += numValue;
            } else {
              totalUSD += numValue;
            }
          }
        });

        // Add recipient counts from aggregates
        const additionalRecipients = aggregateData.reduce(
          (sum, agg) => sum + agg.recipientCount,
          0
        );
        for (let i = 0; i < additionalRecipients; i++) {
          recipients.add(`aggregate_recipient_${i}`);
        }
      }

      return {
        uniqueFunders: funders.size,
        uniqueRecipients: recipients.size,
        yearRange: { minYear, maxYear },
        formattedTotals: formatCurrencies(totalUSD, totalBTC),
      };
    }, [data, aggregateData, hasActiveFilters]);

  // Generate dynamic subtitle based on filters
  const subtitle = useMemo(() => {
    const parts = [];

    // Funder part
    if (selectedFunder !== "all") {
      parts.push(`from ${selectedFunder}`);
    } else {
      parts.push(
        `from ${uniqueFunders} ${uniqueFunders === 1 ? "funder" : "donors"}`
      );
    }

    // Recipient part
    if (selectedRecipient !== "all") {
      parts.push(`to ${selectedRecipient}`);
    } else {
      parts.push(
        `to ${uniqueRecipients} ${
          uniqueRecipients === 1 ? "recipient" : "recipients"
        }`
      );
    }

    // Year part
    if (selectedYear !== "all") {
      parts.push(`in ${selectedYear}`);
    } else if (yearRange.minYear && yearRange.maxYear) {
      if (yearRange.minYear === yearRange.maxYear) {
        parts.push(`in ${yearRange.minYear}`);
      } else {
        parts.push(`from ${yearRange.minYear} to ${yearRange.maxYear}`);
      }
    }

    if (hasActiveFilters) {
      parts.push("(excluding aggregate donations)");
    }

    return parts.join(" ");
  }, [
    selectedFunder,
    selectedRecipient,
    selectedYear,
    uniqueFunders,
    uniqueRecipients,
    yearRange,
    hasActiveFilters,
  ]);

  return (
    <div className="w-full max-w-2xl mx-auto px-10">
      <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-orange-100 dark:border-gray-800 shadow-xl">
        <CardHeader className="flex flex-col items-center pb-2">
          <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Total Public Donations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pt-0">
          <div className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-2">
            {formattedTotals}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to format currency amounts
const formatCurrencies = (usd: number, btc: number): string => {
  const usdStr = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usd);

  if (btc === 0) return usdStr;
  if (usd === 0) return `${btc.toFixed(2)} BTC`;
  return `${usdStr} & ${btc.toFixed(2)} BTC`;
};

export default FundingStats;
