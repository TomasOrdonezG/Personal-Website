import React from "react";
import "./Contact.css";
import EmailForm from "./components/EmailForm/EmailForm";

export default function Contact() {
  document.title = "Tomas Ordonez - Contact";
  return (
    <div className="contact-page">
      <EmailForm />
    </div>
  );
}
