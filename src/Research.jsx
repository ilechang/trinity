import React from "react";

const problems = [
    {
        title: "Uncomfortable Grip",
        text: "Sharp edges and poor texturing make the Hi-Capa grip unfriendly for small hands."
    },
    {
        title: "Cumbersome Hop-up Adjustment",
        text: "Adjusting the hop-up requires disassembly, making it overly complicated."
    },
    {
        title: "Fragile Materials",
        text: "Plastic components wear out quickly under frequent, intense use."
    },
    {
        title: "Inconsistent Aftermarket Kits",
        text: "Third-party kits often have sizing issues, requiring manual fitting."
    }
];

const designGoals = [
    {
        title: "Lightweight Structure & Aesthetics",
        text: "Skeletonized cutouts reduce weight while adding visual appeal."
    },
    {
        title: "Improved Hop-up Mechanism",
        text: "Quick-adjust hop-up for faster and easier operation."
    },
    {
        title: "Competition Trigger",
        text: "Short-travel trigger for enhanced stability in rapid fire."
    },
    {
        title: "Complete Competition Kit",
        text: "Modular kit for competitive players to upgrade all components."
    },
    {
        title: "Standalone Parts Retail",
        text: "Key parts available individually for repair or upgrade."
    },
    {
        title: "Cost Efficiency",
        text: "Compatibility with existing production parts lowers costs."
    }
];

const designProcess = [
    {
        title: "User Research",
        text: [
            "Conducted interviews with 3 competitive shooters and 7 experienced skirmish players.",
            "Collected and tested a variety of airsoft pistols, analyzing grip textures and component ergonomics."
        ],
        time: "2022/03 – 2022/04"
    },
    {
        title: "Reverse Engineering",
        text: [
            "With original manufacturer authorization, analyzed and retained components that required no redesign, reducing development overhead."
        ],

        time: "2022/04 – 2022/05"
    },
    {
        title: "Key Component Redesign",
        text: [
            "Focused on the grip, slide, hop-up, and trigger to improve ergonomics and usability."
        ],

        time: "2022/05 – 2022/11"
    },
    {
        title: "Early Prototype Validation",
        text: [
            "Produced initial prototypes via 3D printing and provided them to test participants for ergonomic evaluation and feedback."
        ],
        time: "2022/05 – 2023/01"
    },
    {
        title: "Engineering Prototyping & Testing",
        text: [
            "Fabricated advanced prototypes using CNC machining, evaluating assembly tolerances and durability through iterative testing."
        ],
        time: "2023/02 – 2023/03"
    },
    {
        title: "Production Evaluation",
        text: [
            "Verified commonality of parts to ensure select components could be manufactured and sold individually.",
            "Studied different manufacturing methods to balance precision, strength, and cost."
        ],
        time: "2023/04"
    },
    {
        title: "Mass Production & Launch",
        text: [
            "Officially launched in 2023, distributed across Asia, Europe, and North America."
        ],

        time: "2023/05"
    }
];


export default function Research() {
    return (
        <div
            className="text-white w-100 py-5  "
            style={{ backgroundColor: "rgb(255,255,255)", position: "relative" }}
        >
            {/* Background Section */}
            <div className="mx-auto mt-5 mb-5" style={{ maxWidth: "1100px" }}>
                <h2 className="fw-bold mb-3 text-center text-dark">
                    Background – What is Airsoft?
                </h2>
                <p className="mb-5 text-center text-dark">
                    Airsoft is a recreational sport and competitive activity that uses
                    non-lethal air-powered guns to fire plastic BB pellets. Due to its
                    safe nature, it is also widely adopted by military and law
                    enforcement agencies for simulated combat training.
                </p>
                {/* <img src="./images/bgtry.webp" alt="" className="w-100 rounded rounded-4" /> */}
            </div>

            {/* Main Content */}
            <div className="mx-auto d-flex flex-column justify-content-center align-items-center text-center w-100 h-100" style={{ maxWidth: "1100px" }}>
                <div
                    className="rounded rounded-4 pt-5 pb-0 px-5 mb-5"
                    style={{
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)",
                        maxWidth: "1300px"
                    }}
                >
                    {/* Project Overview */}
                    <div className="d-flex flex-column flex-sm-row align-items-start my-5">
                        <img
                            src="./images/modify.jpg"
                            alt="Modify Logo"
                            className="me-3 mb-3 mb-sm-0"
                            style={{ width: "120px" }}
                        />
                        <div className="text-white rounded ms-sm-3 mb-5">
                            <h2 className="fw-bold text-start mb-3">Project Overview</h2>
                            <p className="mb-4 text-start">
                                Modify has historically specialized in airsoft upgrade parts. This
                                project represents a key milestone in the brand’s transition toward
                                becoming a complete firearm manufacturer. It is the first full pistol
                                developed and launched by Modify.
                            </p>
                        </div>
                    </div>


                    <div className="d-flex flex-column flex-sm-row align-items-start my-5">
                        <img
                            src="./images/tpsa1.webp"
                            alt="Modify Logo"
                            className="me-3 mb-3 mb-sm-0"
                            style={{ width: "120px" }}
                        />
                        <div className="text-white rounded ms-sm-3 mb-5">
                            <h2 className="fw-bold text-start mb-3">Collaboration</h2>
                            <p className="mb-4 text-start">
                                We collaborated with the Taiwan Practical Shooting Association(TPSA) and
                                interviewed several champion shooters. Based on their professional
                                insights, we selected the widely popular Tokyo Marui Hi-Capa system—
                                favored by both competitive shooters and airsoft skirmish players—
                                as the foundation for our design improvements.
                            </p>
                        </div>
                    </div>


           

                    {/* Problems */}
                    <h2 className="text-center my-3 fw-bold">Problem Identification</h2>
                    <div className="row g-4 mb-3">
                        {problems.map((item, index) => (
                            <div key={index} className="col-md-3 col-sm-6">
                                <div
                                    className="card h-100 border border-white rounded-3 py-3"
                                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                                >
                                    <div className="card-body text-center">
                                        <h5 className="text-white fw-bold">{item.title}</h5>
                                        <h4 className="text-white fw-bold m-0 p-0">-</h4>
                                        <p className="card-text text-white">{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Design Goals */}
                    <div className="container my-5 py-4">
                        <h2 className="text-center mb-3 fw-bold">Design Goals</h2>
                        <div className="row g-4">
                            {designGoals.map((goal, index) => (
                                <div key={index} className="col-md-4 col-sm-6">
                                    <div
                                        className="card h-100 border border-white rounded-3 py-3"
                                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                                    >
                                        <div className="card-body">
                                            <h5 className="text-white fw-bold">{goal.title}</h5>
                                            <h3 className="text-white fw-bold m-0 p-0">-</h3>
                                            <p className="card-text text-white">{goal.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container my-4 py-4">
                        <h2 className="text-center fw-bold mb-3">Design Process</h2>
                        {designProcess.map((step, index) => (
                            <div
                                key={index}
                                className="card border border-white rounded-3 p-3 mb-4"
                                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                            >
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        {/* 日期 col-2 */}
                                        <div className="col-md-4 mb-3 ">
                                            {step.time && (
                                                <h4 className="text-white fw-bold text-md-center text-start m-0">
                                                    {step.time}
                                                </h4>
                                            )}
                                        </div>

                                        {/* 文字 col-6 */}
                                        <div className="col-md-7 mb-3 mb-md-0">
                                            <h5 className="text-white fw-bold text-start ">{step.title}</h5>
                                            {Array.isArray(step.text) && (
                                                <ul className="text-white text-start m-0">
                                                    {step.text.map((line, i) => (
                                                        <li key={i}>{line}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* 圖片 col-4 */}
                                        {/* 圖片 col-4 */}
                                        <div className="col-md-4 d-flex justify-content-center justify-content-md-end gap-3 flex-wrap flex-lg-nowrap">
                                            {Array.isArray(step.pics) &&
                                                step.pics.length > 0 &&
                                                step.pics.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt={`Step Visual ${i + 1}`}
                                                        className="rounded shadow"
                                                        style={{ width: "50%", height: "auto" }}
                                                    />
                                                ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "90%",
                    zIndex: 10,
                    textAlign: "center",
                    display: window.innerWidth < 1200 ? "none" : "block", // 小於 1200px 隱藏
                }}
            >

                <img
                    src="/images/123.webp"
                    alt="Bottom Decoration"
                    style={{
                        width: "100%",
                    }}
                />
            </div>

        </div>
    );
}
