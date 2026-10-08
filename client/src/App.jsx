import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

  const getStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const addStudent = async () => {
    if (!name || !course || !age) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/students",
        {
          name,
          course,
          age,
        }
      );

      setName("");
      setCourse("");
      setAge("");

      getStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const updateStudent = async () => {
    try {
      await axios.put(
        `http://localhost:5000/students/${editingId}`,
        {
          name,
          course,
          age,
        }
      );

      setEditingId(null);
      setName("");
      setCourse("");
      setAge("");

      getStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/students/${id}`
      );

      getStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>
        {editingId
          ? "Update Student"
          : "Add Student"}
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) =>
          setCourse(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) =>
          setAge(e.target.value)
        }
      />

      <br />
      <br />

      {editingId ? (
        <button onClick={updateStudent}>
          Update Student
        </button>
      ) : (
        <button onClick={addStudent}>
          Add Student
        </button>
      )}

      <hr />

      <h2>Student List</h2>

      {students.map((student) => (
        <div
          key={student._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button
            onClick={() =>
              editStudent(student)
            }
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteStudent(student._id)
            }
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;