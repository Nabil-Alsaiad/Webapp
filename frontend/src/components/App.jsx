// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function App() {
  const savedAccount = localStorage.getItem("loggedInAccount");
  const { accType } = savedAccount ? JSON.parse(savedAccount) : { accType: "" };

  const navigate = useNavigate();
  const [contentPage, setContentPage] = useState(<></>);

  useEffect(() => {
    if (savedAccount === null) {
      navigate("/login");
    }
  }, [navigate, savedAccount]);

  return (
    <div>
      <div>
        <Sidebar accType={accType} onContentPageChange={setContentPage} />
      </div>
      <div className="content">{contentPage}</div>
    </div>
  );
}

export default App;
