import React from "react";
import style from "./Progressbar.module.css";

function ProgressBar({ password, confirmPassword }) {
  function calculatePasswordStrength() {
    if (!password || !confirmPassword) return;
    const partLength = Math.ceil(password.length / 4);

    const passwordParts = [
      password.slice(0, partLength),
      password.slice(partLength, partLength * 2),
      password.slice(partLength * 2, partLength * 3),
      password.slice(partLength * 3),
    ];

    const confirmPasswordParts = [
      confirmPassword.slice(0, partLength),
      confirmPassword.slice(partLength, partLength * 2),
      confirmPassword.slice(partLength * 2, partLength * 3),
      confirmPassword.slice(partLength * 3),
    ];

    let strength = 0;

    for (let i = 0; i < 4; i++) {
      if (passwordParts[i] === confirmPasswordParts[i]) {
        strength += 1;
      }
    }
    return strength;
  }

  const strength = calculatePasswordStrength();

  const strengthColors = [
    "#ff0000", // дуже слабкий (0)
    "#ff6600", // слабкий (1)
    "#ffcc00", // середній (2)
    "#00FFFF", // хороший (3)
    "#00ff00", // сильний (4)
  ];

  const strengthBarStyles = {
    width: `${strength ? strength * 25 : 0}%`,
    backgroundColor: strengthColors[strength] || "#ff0000", // за замовчуванням червоний, якщо сили пароля немає
    filter:
      strength > 0
        ? `drop-shadow(0px 1px 8px rgba(${strengthColors[strength].slice(
            1
          )}, 0.50))`
        : "none",
  };

  return (
    <div className={style.passwordStrengthContainer}>
      <div className={style.strengthBar} style={strengthBarStyles}></div>
    </div>
  );
}

export default ProgressBar;
