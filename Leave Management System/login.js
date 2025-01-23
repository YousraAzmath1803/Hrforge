
import React, { useState } from "react";
import styles from "./Login.module.css"; // Import the CSS module
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const login = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleContainer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.bodycontainer} >
    <div className={`${styles.container} ${isActive ? styles.active : ""}`} id="container">
      {/* Sign-Up Form */}
      <div className={`${styles.formContainer} ${styles.signUp}`}>
        <form className={styles.form}>
          <h1>Create Account</h1>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.icon}><FaGooglePlusG /></a>
            <a href="#" className={styles.icon}><FaFacebookF /></a>
            <a href="#" className={styles.icon}><FaGithub /></a>
            <a href="#" className={styles.icon}><FaLinkedinIn /></a>
          </div>
          <span>or use your email for registration</span>
          <input className={styles.input} type="text" placeholder="Name" />
          <input className={styles.input}  type="email" placeholder="Email" />
          <input className={styles.input}  type="password" placeholder="Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      {/* Sign-In Form */}
      <div className={`${styles.formContainer} ${styles.signIn}`}>
        <form className={styles.form}>
          <h1>Sign In</h1>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.icon}><FaGooglePlusG /></a>
            <a href="#" className={styles.icon}><FaFacebookF /></a>
            <a href="#" className={styles.icon}><FaGithub /></a>
            <a href="#" className={styles.icon}><FaLinkedinIn /></a>
          </div>
          <span>or use your email for login</span>
          <input className={styles.input}  type="email" placeholder="Email" />
          <input className={styles.input}  type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button type="button">Sign In</button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>
          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className={styles.hidden} onClick={toggleContainer}>Sign In</button>
          </div>
          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className={styles.hidden} onClick={toggleContainer}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default login;
