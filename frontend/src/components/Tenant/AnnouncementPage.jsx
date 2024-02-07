import React, { useState, useEffect } from "react";
import NewAnnouncements from "./NewAnnouncement";
import "./AnnouncementPage.css";

const CreateAnnouncement = ({ onCreateAnnouncement }) => {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");

  const handleTitleChange = (event) => {
    setAnnouncementTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setAnnouncementDescription(event.target.value);
  };

  const handleCreateAnnouncement = () => {
    // Check if both Announcement Title and Description are provided
    if (announcementTitle && announcementDescription) {
      // Create a new announcement object
      const newAnnouncement = {
        title: announcementTitle,
        description: announcementDescription
      };

      // Pass the new announcement to the parent component
      onCreateAnnouncement(newAnnouncement);

      // Clear the form after creating the announcement
      setAnnouncementTitle("");
      setAnnouncementDescription("");
    }
  };

  return (
    <div>
      <h2>Create New Announcement</h2>
      <label>
        Announcement Title:
        <input type="text" value={announcementTitle} onChange={handleTitleChange} />
      </label>
      <br />

      <label>
        Announcement Description:
        <textarea value={announcementDescription} onChange={handleDescriptionChange} />
      </label>
      <br />

      <button type="button" onClick={handleCreateAnnouncement}>
        Create Announcement
      </button>
    </div>
  );
};

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Load data from local storage when component mounts
    const announcementData = localStorage.getItem("announcementData");
    const storedAnnouncements = announcementData ? JSON.parse(announcementData) : [];
    setAnnouncements(storedAnnouncements);
  }, []);

  const handleCreateAnnouncement = (newAnnouncement) => {
    // Update the announcements array
    setAnnouncements([...announcements, newAnnouncement]);

    // Store the updated data in local storage
    localStorage.setItem("announcementData", JSON.stringify([...announcements, newAnnouncement]));
  };

  return (
    <div>
      <h1>Announcement Page</h1>
      <CreateAnnouncement onCreateAnnouncement={handleCreateAnnouncement} />
      <NewAnnouncements announcements={announcements} />
      {/* Additional components or display for existing announcements can be added here */}
    </div>
  );
};

export default AnnouncementPage;
