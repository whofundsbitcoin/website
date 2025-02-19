import React from "react";

const FootnotesSection = () => {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Notes on Methodology
      </h3>
      <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
        <p id="incomplete-amount" className="scroll-mt-20">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Incomplete Amounts:{" "}
          </span>
          {`The "+" symbol indicates that the total amount shown is incomplete,
          as not all donations from this source has been publicly disclosed or
          verified. The actual total is likely higher than the amount shown.`}
        </p>
        <p>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Inclusion Criteria:{" "}
          </span>
          This tracker only includes publicly verifiable donations. Many
          organizations and individuals may contribute more than what is shown
          here, but we only include amounts that can be independently verified
          through public sources.
        </p>
        <p>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Aggregated Data:{" "}
          </span>
          Some entries represent aggregated funding over time. These are shown
          separately at the top of the table to provide a more complete picture
          of long-term funding patterns.
        </p>
      </div>
    </div>
  );
};

export default FootnotesSection;
