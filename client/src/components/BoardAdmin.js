import React, { useState, useEffect, useMemo } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Search from "./Search";

function BoardAdmin() {
  const [content, setContent] = useState([{}]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataLoad, setDataLoad] = useState(true);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        setLoading(false);
        setDataLoad(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      });
  }, []);

  const updateData = () => {
    content.map(_data => (
      _data.createdAt = _data.createdAt.substring(0, 10)
    ))

    content.map(_data => (
      _data.roles[2] ? _data.roles[0].name = _data.roles[2].name :
        _data.roles[1] ? _data.roles[0].name = _data.roles[1].name
          : null
    ))
  }

  const memoData = useMemo(() => {
    let computedData = content;

    if (search) {
      computedData = computedData.filter(
        _data =>
          _data.username.toLowerCase().includes(search.toLowerCase())
          || _data.email.toLowerCase().includes(search.toLowerCase())
          || _data.roles[0].name.toLowerCase().includes(search.toLowerCase())
          || _data.createdAt.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedData;

  }, [content, search])

  if (loading) {
    return <div></div>
  }

  if (!dataLoad) {
    updateData();
    setDataLoad(true)
  }

  return (
    <div className="frame">

      <div className="search">
        <Search
          onSearch={value => {
            setSearch(value);
          }}
        />
      </div>

      <table className="table table-striped small">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {memoData.map((data, index) => (
            <tr className="big" key={index}>
              <td>{data.id}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data.roles[0].name}</td>
              <td>{data.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardAdmin;