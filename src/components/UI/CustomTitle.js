const CustomTitle = () => {
    //when i hover on the title it should show a div with the text "hello world"
    return (
        <div
            className="custom-div"
            style={{
                display: isHovering ? "block" : "none",
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "10px",
            }}
        >
            <p>Custom information goes here.</p>
        </div>
    );
};

export default CustomTitle;
