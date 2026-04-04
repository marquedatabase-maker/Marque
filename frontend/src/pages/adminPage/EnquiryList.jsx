import { useEffect, useState } from "react";
import api from "../../Services/api";

import "@fortawesome/fontawesome-free/css/all.min.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function EnquiryList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Server side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  useEffect(() => {
    fetchApplications(1);
  }, []);

  const fetchApplications = async (page) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/admission/get-admissions?page=${page}&limit=10`,
        {
          headers: { Authorization: localStorage.getItem("adminToken") },
        },
      );

      setData(Array.isArray(res.data.data) ? res.data.data : []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to load data");
      setData([]); // 🔥 VERY IMPORTANT
    } finally {
      setLoading(false);
    }
  };
  const handleReload = () => {
    fetchApplications(currentPage);
  };

  // Excel Download (current page data)
  const downloadExcel = async () => {
    try {
      const res = await api.get("/admission/get-all-admissions", {
        headers: { Authorization: localStorage.getItem("adminToken") },
      });

      const allData = res.data.data || [];

      const formattedData = allData.map((item, index) => ({
        "S.No": index + 1,
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Course: item.course,
        "Extra Info": item.extraInfo || "",
        "Applied Date": item.createdAt
          ? new Date(item.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const file = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(file, "All-Student-Enquiries.xlsx");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50  p-4 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1C33]">
              Applications Received
            </h1>
            <p className="text-sm text-slate-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="flex gap-3">
            {/* Reload Button */}
            <button
              onClick={handleReload}
              className="p-2.5 bg-[#0B1C33] text-white rounded-lg hover:bg-slate-800 flex gap-2"
            >
              <i className="fa-solid fa-rotate"></i>
              Reload
            </button>

            {/* Excel Button */}
            <button
              onClick={downloadExcel}
              className="p-2.5 bg-[#DC2626] text-white rounded-lg hover:bg-red-700 flex gap-2"
            >
              <i className="fa-solid fa-download"></i>
              Download Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b text-sm uppercase tracking-wider text-slate-600">
              <tr>
                <th className="p-4">
                  <div className="flex items-center gap-2">S.No</div>
                </th>

                <th className="p-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-user text-blue-500"></i>
                    Name
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-envelope text-green-500"></i>
                    Contact
                  </div>
                </th>

                <th className="p-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-book text-purple-500"></i>
                    Course
                  </div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-info text-red-500"></i>
                    Extra Info
                  </div>
                </th>

                <th className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <i className="fa-solid fa-clock text-orange-500"></i>
                    Date & Time
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center">
                    Loading...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="p-4">
                      {(currentPage - 1) * LIMIT + index + 1}
                    </td>
                    <td className="p-4 font-bold">{item.name}</td>
                    <td className="p-4">
                      <div>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-blue-600 hover:underline hover:text-blue-800"
                        >
                          {item.email}
                        </a>
                      </div>
                      <div className="text-l font-bold text-red-500">
                        {item.phone}
                      </div>
                    </td>
                    <td className="p-4">{item.course}</td>
                    <td className="p-4">{item.extraInfo}</td>
                    <td className="p-4 text-right text-xs">
                      {new Date(item.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center">
                    No enquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {!loading && (
            <div className="flex justify-between p-4 border-t bg-slate-50">
              <button
                onClick={() => fetchApplications(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={() => fetchApplications(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
