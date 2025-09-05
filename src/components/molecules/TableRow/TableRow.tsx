'use client';

import { CaseData } from '@/types';

interface TableRowProps {
  case: CaseData;
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({ case: caseItem, index }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {caseItem.associatedCase}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {caseItem.targetValue}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {caseItem.appliedDate}
      </td>
    </tr>
  );
};

export default TableRow;
