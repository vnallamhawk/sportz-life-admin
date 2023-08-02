const Table = ({
  tableHeader,
  tableBody,
  tableFooter,
}: {
  tableHeader: JSX.Element;
  tableBody: JSX.Element;
  tableFooter?: JSX.Element;
}) => {
  return (
    <table className="w-full min-w-max table-auto">
      <thead> {tableHeader}</thead>
      <tbody className="text-sm font-light text-gray-600">{tableBody} </tbody>
      {tableFooter}
    </table>
  );
};

export default Table;
