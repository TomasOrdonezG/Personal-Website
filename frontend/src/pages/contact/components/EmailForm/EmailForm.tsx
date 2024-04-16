import React from "react";
import "./EmailForm.css";
import * as db from "../../../../database";
import { ContactEmailInfo } from "../../../../models";

const defaultContactEmailInfo: ContactEmailInfo = {
  name: "",
  email: "",
  message: "",
};
export default function EmailForm(): React.JSX.Element {
  // * Form
  const [oldName, setOldName] = React.useState<string>("");
  const messageRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [contactEmailInfo, setContactEmailInfo] = React.useState<ContactEmailInfo>(defaultContactEmailInfo);
  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactEmailInfo((v) => ({ ...v, [name]: value }));
  };

  // * Notification
  const [notify, setNotify] = React.useState<"error" | "success" | false>(false);
  const Notification = (): React.JSX.Element => {
    setTimeout(() => {
      setNotify(false);
    }, 7000);
    return (
      <div
        className="notification"
        style={{
          backgroundColor: notify === "success" ? "#9de0af" : "#e07070",
        }}
      >
        {notify === "success" ? "Sent. Thank you for your message " + oldName + "!" : "Error: The message failed to send, try again later."}
      </div>
    );
  };

  return (
    <div className="email-form-page">
      <img src={require("../../../photography/assets/portugal/i2.jpg")} alt="contact-side" draggable={false} />

      <form
        className="email-form"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            if (contactEmailInfo) {
              db.Contact.sendEmail(contactEmailInfo);
              setNotify("success");
              setOldName(contactEmailInfo.name);
              setContactEmailInfo(defaultContactEmailInfo);
            }
          } catch (err) {
            setNotify("error");
          }
        }}
      >
        <table>
          <tr>
            <td>
              <input
                autoComplete="off"
                className="name-input input-item"
                value={contactEmailInfo.name}
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                autoComplete="off"
                className="email-input input-item"
                value={contactEmailInfo.email}
                type="text"
                placeholder="Email"
                name="email"
                onChange={onChange}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="message-td" onClick={() => messageRef.current?.focus()}>
              <textarea
                className="message-input input-item"
                value={contactEmailInfo.message}
                ref={messageRef}
                placeholder="Message"
                name="message"
                onChange={onChange}
                required
              />
            </td>
          </tr>
        </table>

        <button type="submit">Send Message</button>
        {notify && <Notification />}
      </form>
    </div>
  );
}
