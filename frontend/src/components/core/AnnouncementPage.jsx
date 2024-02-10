// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import CreateAnnouncement from "./CreateAnnouncement.jsx";
import "./AnnouncementPage.css";

/**
 * @returns {React.JSX.Element}
 */
function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/announcements", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data);
      });
  }, []);

  const handleCreateAnnouncement = (announcement) => {
    fetch("http://localhost:8888/announcement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(announcement)
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        // @ts-expect-error
        setAnnouncements([...announcements, announcement]);
        alert("Announcement Created!");
      } else if (res.status >= 400 && res.status < 600) {
        res.json().then((data) => {
          alert("Error: " + data?.error);
        });
      }
    });
  };

  return (
    <div>
      <h1>Announcement Page</h1>
      <CreateAnnouncement onAnnouncementCreated={handleCreateAnnouncement} />
      <div className="announcements">
        <h2>Announcements</h2>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((/** @type {{title:String,description:string}} */ a, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{a.title}</td>
                <td>{a.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnnouncementPage;
