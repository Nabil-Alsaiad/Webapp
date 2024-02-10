import React from "react";
import PropTypes from "prop-types";

CreateAnnouncement.propTypes = {
  onAnnouncementCreated: PropTypes.func.isRequired
};

/**
 * @param {object} options
 * @param {(announcement: {title:string,description:string}) => void} options.onAnnouncementCreated
 * @returns {React.JSX.Element}
 */
function CreateAnnouncement({ onAnnouncementCreated }) {
  const handleCreateAnnouncement = () => {
    /** @type {HTMLInputElement | null} */
    // @ts-expect-error
    const titleEl = document.getElementById("create-announcement-title");

    /** @type {HTMLTextAreaElement | null} */
    // @ts-expect-error
    const descriptionEl = document.getElementById("create-announcement-description");

    if (!titleEl || !descriptionEl) {
      alert("Title and description are required");
      return;
    }

    onAnnouncementCreated({
      title: titleEl.value.trim(),
      description: descriptionEl.value.trim()
    });

    titleEl.value = "";
    descriptionEl.value = "";
  };

  return (
    <div className="create-announcement">
      <h2>Create New Announcement</h2>
      <label>
        Title
        <input id="create-announcement-title" type="text" />
      </label>
      <label>
        Description
        <textarea id="create-announcement-description" />
      </label>
      <button type="button" onClick={handleCreateAnnouncement}>
        Create
      </button>
    </div>
  );
}

export default CreateAnnouncement;
