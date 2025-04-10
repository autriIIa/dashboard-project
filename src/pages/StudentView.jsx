import Header from "../components/Header";

const StudentView = (studentData) => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Vista usuario" />
      <h2>Bienvenido {studentData.name}</h2>
    </div>
  );
};

export default StudentView;
