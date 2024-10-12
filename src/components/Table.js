const Table = ({ filters }) => {
  if (!Array.isArray(filters) || filters.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(filters[0]).map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filters.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
