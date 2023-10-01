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
    <table className="mt-1 w-full min-w-max table-auto border-separate border-spacing-y-3 place-self-center">
      <thead> {tableHeader}</thead>
      <tbody className="text-sm font-light text-gray-600">{tableBody} </tbody>
      {tableFooter}
    </table>
  );
};

export default Table;
