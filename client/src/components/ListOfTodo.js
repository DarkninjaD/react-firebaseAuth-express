import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ListOfTodo({ token }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    const res = await axios.get("http://localhost:5000/api/todos", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setData(res.data);
  };

  return (
    <div>
      <h1>List of todo</h1>
      {data && data.todos.map((task) => <div>{task.title}</div>)}
    </div>
  );
}
