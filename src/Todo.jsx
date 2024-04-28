import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Link, useParams } from "react-router-dom";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState();
  const [reload, setReload] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((item) => setTodo(item.data))
      .catch((err) => console.error(err));
  }, [reload]);

  const createTodo = () => {
    axios
      .post("http://localhost:3000/", {
        title: title,
        description: description,
        duration: duration,
        date: date,
      })
      .then(() => console.log("create success"))
      .catch((err) => console.error(err));
    console.log({ title, description, duration, date });
    setReload(!reload);
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/${id}`)
      .then(() => console.log("delete success"))
      .catch((err) => console.error(err));
    setReload(!reload);
  };

  const editTodo = (id) => {
    axios.get(`http://localhost:3000/${id}`).then((item) => {
      setTitle(item.data.title),
        setDescription(item.data.description),
        setDuration(item.data.duration),
        setDate(item.data.date);
    });
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3000/${id}`, {
        title: title,
        description: description,
        duration: duration,
        date: date,
      })
      .then(() => console.log("data updated"))
      .catch((err) => console.error(err));
    setReload(!reload);
  };

  return (
    <>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        ></input>
        <input value={date} onChange={(e) => setDate(e.target.value)}></input>
        <button onClick={() => createTodo()}>create todo</button>
        <button onClick={() => confirmEdit()}>confirm edit</button>
      </div>

      <table border={1}>
        <tr>
          <th>title</th>
          <th>description</th>
          <th>duration</th>
          <th>date</th>
        </tr>
        <tbody>
          {todo.map((e, index) => (
            <tr key={index}>
              <td>{e.title}</td>
              <td>{e.description}</td>
              <td>{e.duration}</td>
              <td>{e.date}</td>
              <td>
                <Link to ={`/todo/${e._id}`}><button onClick={() => editTodo(e._id)}>edit</button></Link>
              </td>
              <td>
                <button onClick={() => deleteTodo(e._id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Todo;
