import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const SKILLS = ["c", "vscode", "react", "typescript", "css3", "html5", "javascript", "python", "sass", "express", "nodejs", "mysql"];

export default function About(): React.JSX.Element {
  return (
    <div className="about-page">
      <div className="about-text-container">
        <h2>Hi, I'm Tomas.</h2>
        <p>
          I'm a second year Computer Science student at the University of Alberta. I'm currently exploring and discovering the many branches the
          Computer Science field has to offer. I'm always learning and creating, eager to find out what new tool or approach I can learn next in
          order to continue to grow as a developer. I am currently learning C and working on various personal web projects involving React, Sass,
          TypeScript, SQL, NodeJS, Express, etc.
          <br />
          <br />
          I'm also passionate about various other activities such as photography (<Link to={"/photography"}>check out my work</Link>), origami,
          learning (non-programming) languages, collecting and listening to physical media, travelling, etc. These are just some of the things I
          love to spend my free time on.
        </p>
      </div>
      <div className="about-skills-container">
        <h2>My Skills</h2>
        <div className="skills">
          {SKILLS.map((skill) => (
            <img
              src={`https://raw.githubusercontent.com/devicons/devicon/master/icons/${skill}/${skill}-original.svg`}
              title={skill}
              alt={skill}
              key={skill}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
