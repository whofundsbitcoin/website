"use client";

import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import { ExternalLink, Search } from "lucide-react";
import FundingStats from "@/components/funding/FundingStats";
import FilterSelects from "@/components/funding/FilterSelects";
import FundingTable from "@/components/funding/FundingTable";
import { ThemeToggle } from "../ThemeToggle";
import aggregatesData from "@/data/funding_aggregates.json";
import FootnotesSection from "./FootnotesSection";

export interface FundingEntry {
  funder: string;
  recipient: string;
  amount: string;
  date: string;
  source_url: string;
  notes: string;
}

const GITHUB_CSV_URL =
  "https://raw.githubusercontent.com/bitcoin-dev-project/who-funds-bitcoin-development/refs/heads/main/funding.csv";

export default function FundingPage() {
  const [fundingData, setFundingData] = useState<FundingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFunder, setSelectedFunder] = useState<string>("all");
  const [selectedRecipient, setSelectedRecipient] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc");

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery !== "" ||
      selectedFunder !== "all" ||
      selectedRecipient !== "all" ||
      selectedYear !== "all"
    );
  }, [searchQuery, selectedFunder, selectedRecipient, selectedYear]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GITHUB_CSV_URL);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setFundingData(results.data as FundingEntry[]);
            setIsLoading(false);
          },
          error: (error: any) => {
            setError("Error parsing CSV data");
            setIsLoading(false);
            console.error("CSV parsing error:", error);
          },
        });
      } catch (error) {
        setError("Error loading funding data");
        setIsLoading(false);
        console.error("Error loading funding data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to parse YYYY/MM dates
  const parseDateString = (dateStr: string) => {
    if (!dateStr) return 0;
    const [year, month] = dateStr.split("/").map((num) => parseInt(num));
    return new Date(year, month ? month - 1 : 0).getTime();
  };

  // Sort function for dates
  const sortData = (data: FundingEntry[]) => {
    return [...data].sort((a, b) => {
      const dateA = parseDateString(a.date);
      const dateB = parseDateString(b.date);
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });
  };

  // Filter and sort the data
  const filteredData = useMemo(() => {
    // First apply all filters
    const filtered = fundingData.filter((row) => {
      const matchesSearch =
        searchQuery === "" ||
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesFunder =
        selectedFunder === "all" || row.funder === selectedFunder;

      const matchesRecipient =
        selectedRecipient === "all" || row.recipient === selectedRecipient;

      const matchesYear =
        selectedYear === "all" ||
        (row.date && row.date.startsWith(selectedYear));

      return matchesSearch && matchesFunder && matchesRecipient && matchesYear;
    });

    // Then sort the filtered data
    return sortData(filtered);
  }, [
    fundingData,
    searchQuery,
    selectedFunder,
    selectedRecipient,
    selectedYear,
    sortData,
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header with theme toggle */}
      <div className="absolute top-0 right-0 p-4">
        <ThemeToggle />
      </div>

      {/* Hero Section - Above the fold */}
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black">
          <div className="max-w-5xl w-full mx-auto text-center space-y-8">
            {/* Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white font-tektur">
              <span>WHO FUNDS ₿ITCOIN</span>{" "}
              <span className="max-[480px]:text-5xl">DEVELOPMENT?</span>
            </h1>
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Publicly disclosed bitcoin development funding, excluding
              downstream allocations
            </p>

            {/* Stats Card */}
            <div className="mt-12 mb-8 font-tektur">
              {!isLoading && !error && (
                <FundingStats
                  data={filteredData}
                  aggregateData={aggregatesData}
                  searchQuery={searchQuery}
                  selectedFunder={selectedFunder}
                  selectedRecipient={selectedRecipient}
                  selectedYear={selectedYear}
                />
              )}
            </div>

            {/* Additional Information */}
            <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
              <p className="text-gray-600 dark:text-gray-300">
                Bitcoin is open-source and decentralized. No single entity
                should control it. But equally, no single entity is responsible
                for improving it. It is easy for Bitcoin users and companies to
                free-ride without contributing to Bitcoin development — a
                classic tragedy of the commons.{" "}
                <a
                  href="https://www.matthuang.com/funding_bitcoin_development/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-600 hover:text-orange-500 dark:hover:text-orange-400 text-sm opacity-50 hover:opacity-100 transition-all"
                >
                  ↗
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="px-4 md:px-14 pb-16 bg-white dark:bg-black">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[400px] text-red-500">
              {error}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Search Input */}
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-8 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Filter Selects */}
                  <FilterSelects
                    rawData={fundingData}
                    filteredData={filteredData}
                    selectedFunder={selectedFunder}
                    selectedRecipient={selectedRecipient}
                    selectedYear={selectedYear}
                    onFunderChange={setSelectedFunder}
                    onRecipientChange={setSelectedRecipient}
                    onYearChange={setSelectedYear}
                    onReset={() => {
                      setSelectedFunder("all");
                      setSelectedRecipient("all");
                      setSelectedYear("all");
                    }}
                  />
                </div>

                <FundingTable
                  data={filteredData}
                  aggregateData={aggregatesData}
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  showAggregates={!hasActiveFilters}
                />
              </div>

              <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div>
                  Showing {filteredData.length} of {fundingData.length} entries
                </div>
                <div className="flex items-center gap-1">
                  Contribute your data on{" "}
                  <a
                    href="https://github.com/bitcoin-dev-project/who-funds-bitcoin-development"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 inline-flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <FootnotesSection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
