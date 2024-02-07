// NewAnnouncement.jsx

import React from "react";
import "./NewAnnouncement.css";

function NewAnnouncements({ announcements }) {
  return (
    <div>
      <h2>New Announcements</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Announcement Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcement, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{announcement.title}</td>
              <td>{announcement.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewAnnouncements;
