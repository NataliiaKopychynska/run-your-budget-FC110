const customStyles = {
    control: (base) => ({
        ...base,
        background: "transparent",
        border: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: 0,
        boxShadow: "none",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "8px",
        fontSize: "18px",
        color: "#ffffff",
        marginBottom: "12px",
        textAlign: "left",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#ffffff",
    }),
    placeholder: (base) => ({
        ...base,
        color: "#ffffff",
        opacity: 0.6,
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "8px",
        background: "linear-gradient(180deg, #533DBA 0%, #50309A 36%, #6A46A5 61%, #855DAF 100%)",
        color: "#FBFBFB",
        marginTop: 0,
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#50309A" : "transparent",
        color: state.isFocused ? "#FF868D" : "#FBFBFB",
        cursor: "pointer",
        textAlign: "left",
    }),
    menuList: (base) => ({
        ...base,
        maxHeight: "200px",
        overflowY: "auto",
        paddingTop: 0,
        paddingBottom: 0,
        scrollbarColor: "#fff #50309A",
        scrollbarWidth: "thin",
    }),
    indicatorsContainer: (base) => ({
        ...base,
        paddingRight: "12px",
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        color: "#FBFBFB",
    }),
};

export default customStyles;