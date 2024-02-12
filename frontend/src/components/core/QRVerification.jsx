// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

function QRVerification() {
  const savedAccount = localStorage.getItem("account");
  const { id } = savedAccount ? JSON.parse(savedAccount) : { id: -1 };

  useEffect(() => {
    fetch("http://localhost:5173/qr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ acc_id: id })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        }
      });
  }, [id]);

  return (
    <div>
      <h1>VERIFY YOUR QR CODE</h1>
      <QRCodeSVG value={`http://localhost:5173/qr/${id}`} />
    </div>
  );
}

export default QRVerification;
