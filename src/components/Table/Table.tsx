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
      <tbody className="text-base font-medium leading-tight text-neutral-400">
        {tableBody}{" "}
      </tbody>
      {tableFooter}
    </table>
  );
};

export default Table;
