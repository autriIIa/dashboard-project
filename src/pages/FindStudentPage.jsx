import { useState } from "react";
import { UserRoundSearch, List, X } from "lucide-react";
import Header from "../components/Header";

export default function FindStudentPage() {
  const [searchInput, setSearchInput] = useState("");
  const [viewMode, setViewMode] = useState("table"); // "table" or "list"

  // Sample student data - replace with your actual data source
  const studentData = [
    { id: 1, name: "John Doe", age: 20, class: "10A" },
    { id: 2, name: "Jane Smith", age: 19, class: "10B" },
    { id: 3, name: "Robert Johnson", age: 21, class: "11A" },
    { id: 4, name: "Emily Williams", age: 20, class: "11B" },
    { id: 5, name: "Michael Brown", age: 19, class: "10A" },
    { id: 6, name: "Sarah Davis", age: 21, class: "12A" },
  ];

  // Filter students based on search input
  const filteredStudents = studentData.filter((student) => {
    if (searchInput === "") return true;

    return (
      student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.class.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.id.toString().includes(searchInput) ||
      student.age.toString().includes(searchInput)
    );
  });

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "list" : "table");
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />
      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative flex items-center">
            <UserRoundSearch
              color="#6366f1"
              size={24}
              className="absolute left-4 z-10"
            />
            <input
              className="w-full bg-gray-800 text-gray-300 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700 p-4 pl-12 pr-12 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              type="text"
              placeholder="Busca al estudiante por nombre, numero de lista o grupo"
              name="text"
              id="student"
            />
            {searchInput && (
              <X
                size={20}
                className="absolute right-14 text-gray-400 cursor-pointer hover:text-gray-200"
                onClick={clearSearch}
              />
            )}
            <button
              className="absolute right-4 p-1 rounded-md hover:bg-gray-700 transition-colors"
              onClick={toggleViewMode}
              title={
                viewMode === "table"
                  ? "Switch to list view"
                  : "Switch to table view"
              }
            >
              <List size={22} color="#6366f1" />
            </button>
          </div>
        </div>

        {/* Results section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          {/* Results Header */}
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-indigo-400">
              Student Results
            </h2>
            <div className="text-gray-400">
              {filteredStudents.length}{" "}
              {filteredStudents.length === 1 ? "student" : "students"} found
            </div>
          </div>

          {/* No Results Message */}
          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <p>No students match your search criteria</p>
            </div>
          )}

          {/* Table View */}
          {viewMode === "table" && filteredStudents.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 bg-opacity-60">
                  <tr className="text-left">
                    <th className="p-4 font-medium">ID</th>
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Age</th>
                    <th className="p-4 font-medium">Class</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-30 transition-colors cursor-pointer"
                    >
                      <td className="p-4">{student.id}</td>
                      <td className="p-4 font-medium text-indigo-300">
                        {student.name}
                      </td>
                      <td className="p-4">{student.age}</td>
                      <td className="p-4">{student.class}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && filteredStudents.length > 0 && (
            <div className="divide-y divide-gray-700">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4 hover:bg-gray-700 hover:bg-opacity-30 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-indigo-300">
                        {student.name}
                      </h3>
                      <p className="text-gray-400">Class: {student.class}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">
                        ID: {student.id}
                      </div>
                      <div className="text-sm text-gray-400">
                        Age: {student.age}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
