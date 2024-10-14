import { useLocation } from 'react-router-dom';
import '../Table.css';

const Table = () => {
  const location = useLocation();
  const filters = location.state?.filters || [];


  // Export function
  const handleExport = async () => {
    try {
      // Prepare the data to send to the backend
      const exportData = { data: filters };

      
      // Make a POST request with the data as the payload
      const response = await fetch("http://localhost:8081/api/filters/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exportData.data), // Send data in the body
      });

      if (!response.ok) {
        throw new Error("Failed to export file");
      }

      // Get the response as a blob (binary large object)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob); // Create a URL for the blob

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `EXPORT_${Date.now()}.xlsx`; // Set the file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up after download

      window.URL.revokeObjectURL(url); // Revoke the URL after download
    } catch (error) {
      console.error("Error exporting file:", error);
    }
  };

  if (filters.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div>
        <button type="button" onClick={handleExport} className="btn btn-primary">
        Export to Excel
      </button>
         <div className="table-container">
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
  </div>
    </div>
   

  );
};

export default Table;
