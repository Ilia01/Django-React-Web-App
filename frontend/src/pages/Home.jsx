import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = async (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status !== 204) {
          alert("error", "Something went wrong");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = async (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", {
        title: title,
        content: content,
      })
      .then((res) => {
        if (res.status !== 201) {
          alert("error", "Something went wrong");
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <main>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title"></label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <label htmlFor="content"></label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
        <input
          type="submit"
          value="Log Out"
          onClick={() => {
            localStorage.clear(); //  will refactor after saving more data in local storage. clearing tokens for now
            navigate("/login");
          }}
        />
      </form>
    </main>
  );
};

export default Home;
