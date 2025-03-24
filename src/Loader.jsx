const Loader = () => {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
          color: "#fff",
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      >
         Loading...
      </div>
    );
  };
  
  export default Loader;
  