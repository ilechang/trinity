import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { useState } from "react";

export default function Tm() {
    const [showTooltip, setShowTooltip] = useState(false);

    const parts = [
        { number: 1, name: "Slide" },
        { number: 2, name: "Outter Barrel" },
        { number: 3, name: "Inner Barrel" },
        { number: 4, name: "Hop-up Bucking" },
        { number: 5, name: "Recoil Spring" },
        { number: 6, name: "Guide Rod" },
        { number: 7, name: "Nozzle" },
        { number: 8, name: "Nozzle Housing" },
        { number: 9, name: "Thumb Safety" },
        { number: 10, name: "Grip Safety" },
        { number: 11, name: "Grip"},
        { number: 12, name: "Magazine" },
    ];

    return (
        <>
            <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
                {/* Title */}
                <h2
                    className="archivo-black-regular hi-capa-title no-select text-center"
                    style={{
                        fontSize: "120px",
                        textAlign: "center",
                        width: "100%",
                        position: "absolute",
                        top: "-15%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "black",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                >
                    Tokyo Marui
                    <sup
                        style={{
                            marginLeft: "10px",
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#555",
                            pointerEvents: "auto",
                        }}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >⍰
                    </sup>
                     Compatibility
                </h2>

                {showTooltip && (
                    <span
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "white",
                            color: "black",
                            padding: "16px 18px",
                            borderRadius: "5px",
                            fontWeight: 300,
                            fontFamily: "'Arial', sans-serif",
                            fontSize: "16px",
                            zIndex: 9999,
                            pointerEvents: "none",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            maxWidth: "400px",
                            display: "block",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            textAlign: "left",
                            lineHeight: "1.5"
                        }}
                    >
                        Tokyo Marui is the golden standard in the airsoft industry. The more parts of a gun that are Tokyo Marui compatible, the easier it is to find replacement and upgrade parts.
                    </span>
                )}

                <Image
                    src="./images/爆炸圖.png"
                    alt="Exploded View"
                    style={{
                        width: "65%",  // ✅ Ensures it takes most of the column width
                        height: "auto",
                        position: "absolute",
                        top: "25%",
                        left: "5%",
                    }}
                />


<table
  style={{
    position: "absolute",
    top: "30%",
    left: "65%",
    width: "400px", // Adjust width as needed
    backgroundColor: "#f8f9fa", // Light grey background
    border: "2px solid #343a40", // Dark border
    fontFamily: "Arial, sans-serif", // Set font to Arial
    fontSize: "16px", // Adjust overall font size
    borderCollapse: "collapse", // Remove double borders
    textAlign: "center",
  }}
>
  {/* Table Header */}
  <thead
    style={{
      backgroundColor: "#343a40", // Dark theme for headers
      color: "white",
      fontSize: "20px", // Larger font for headers
      fontWeight: "bold", // Make headers bold
    }}
  >
    <tr>
      <th
        style={{
          padding: "5px",
          border: "1px solid #343a40",
          height: "30px", // Increase cell height
        }}
      >
        #
      </th>
      <th
        style={{
          padding: "5px",
          border: "1px solid #343a40",
          height: "40px", // Increase cell height
        }}
      >
        Part Name
      </th>
    </tr>
  </thead>

  {/* Table Body */}
  <tbody>
    {parts.map((part, index) => (
      <tr
        key={part.number}
        style={{
          backgroundColor: index % 2 === 0 ? "#e9ecef" : "#ffffff", // Striped effect
        }}
      >
        <td
          style={{
            padding: "5px",
            border: "1px solid #343a40",
            height: "40px", // Increase cell height
          }}
        >
          {part.number}
        </td>
        <td
          style={{
            padding: "5px",
            border: "1px solid #343a40",
            height: "40px", // Increase cell height
          }}
        >
          {part.name}
        </td>
      </tr>
    ))}
  </tbody>
</table>



            </div>
        </>
    );
}
