import React from "react";

export default function page() {
  return (
    <div className="text-white flex flex-col gap-6 p-8">
      <h1 className="font-bold text-xl">Data Deletion Instructions</h1>
      <p>
        If you want to delete your data associated with our app, please follow
        these steps:
      </p>
      <ol>
        <li>Log out of the app by clicking "Logout" in the settings menu.</li>
        <li>
          If you have further concerns about your data, please contact us at{" "}
          <a href="mailto:alexcoder257@gmail.com" className="text-blue-500">
            alexcoder257@gmail.com
          </a>
          .
        </li>
      </ol>
      <p>Thank you for using our app!</p>
    </div>
  );
}
