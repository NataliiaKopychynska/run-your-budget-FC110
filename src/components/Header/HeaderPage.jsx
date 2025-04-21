import s from "./Header.module.css";

const HeaderPage = () => {
  return (
    <header>
      <div className={s.headerContainer}>
        <div className={s.logoContainer}>
          <svg
            className={s.logoIcon}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5158 2.35193C11.3045 2.04909 10.0932 1.44342 9.18465 0.534912C8.27614 1.44342 7.0648 2.04909 5.85345 2.35193C6.15629 5.07745 7.0648 6.89447 9.18465 8.40865C11.3045 6.89447 12.5158 5.07745 12.5158 2.35193Z"
              fill="#FFC727"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.3044 13.6274L2.82495 3.63379V8.47916L9.48734 16.0501L11.3044 13.6274Z"
              fill="#FBFBFB"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.2129 12.719L15.847 8.47931V3.93677L10.0931 10.5992L12.2129 12.719Z"
              fill="#FBFBFB"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.5157 14.2335V16.959L15.8469 13.0222V10.2966L12.5157 14.2335Z"
              fill="#FBFBFB"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.15615 14.2335L2.82495 10.2966V13.0222L6.15615 16.959V14.2335Z"
              fill="#FBFBFB"
            />
          </svg>
          <p className={s.logoText}>Money Guard</p>
        </div>
        <div className={s.exitContainer}>
          <p className={s.name}>Name</p>
          <button className={s.exitBtn}>
            <svg
              className={s.exitIcon}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_34_6467)">
                <path
                  d="M11.2788 13.0708H12.6844V15.8818C12.6844 17.0443 11.7386 17.99 10.5761 17.99H2.10814C0.945786 17.99 0 17.0443 0 15.8818V2.10814C0 0.945786 0.945786 0 2.10814 0H10.5761C11.7386 0 12.6844 0.945786 12.6844 2.10814V4.91913H11.2788V2.10814C11.2788 1.72073 10.9637 1.40543 10.5761 1.40543H2.10814C1.72073 1.40543 1.40543 1.72073 1.40543 2.10814V15.8818C1.40543 16.2692 1.72073 16.5845 2.10814 16.5845H10.5761C10.9637 16.5845 11.2788 16.2692 11.2788 15.8818V13.0708ZM14.6872 5.68213L13.6934 6.67598L15.3096 8.29234H6.21922V9.69777H15.3096L13.6934 11.314L14.6872 12.3078L18 8.99506L14.6872 5.68213Z"
                  fill="white"
                  fill-opacity="0.6"
                />
              </g>
              <defs>
                <clipPath id="clip0_34_6467">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className={s.exitText}>Exit</p>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
