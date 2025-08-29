// import React from "react";

// const videos = [
//   {
//     title: "The Cool Features Will Blow Your Mind",
//     subtitle: "by Elite Force, Distributor in the US",
//     url: "https://www.youtube.com/embed/QjtVHyLy5Jw?start=139",
//   },
//   {
//     title: "The Best Machining Quality from Taiwan",
//     subtitle: "by Baton Airsoft, Distributor in Japan",
//     url: "https://www.youtube.com/embed/cq4UiKn_ARU?start=54",
//   },
//   {
//     title: "Trinity Hi-CAPA in Action",
//     subtitle: "",
//     url: "https://www.youtube.com/embed/SzJyrLYJNk8?start=75",
//   },
// ];

// const Video = () => {
//   return (
//     <div
//       style={{
//         backgroundColor: "rgb(31,31,31)",
//         color: "white",
//         padding: "40px",
//         textAlign: "center",
//       }}
//     >
//       {/* Header */}
//       <h2
//         style={{
//           fontSize: "80px",
//           fontWeight: "bold",
//           textTransform: "uppercase",
//           fontFamily: "Archivo Black, sans-serif",
//         }}
//       >
//         LET'S HEAR WHAT OTHERS SAY ABOUT THE SSP5
//       </h2>

//       {/* Video Section */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "50px",
//           maxWidth: "1600px",
//           margin: "auto",
//           marginTop: "60px",
//           flexWrap: "wrap",
//         }}
//       >
//         {videos.map((video, index) => (
//           <div key={index} style={{ flex: "1", minWidth: "300px", maxWidth: "450px" }}>
//             <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "5px" }}>{video.title}</h3>
//             {video.subtitle && (
//               <p style={{ fontSize: "16px", marginBottom: "10px", color: "gray" }}>{video.subtitle}</p>
//             )}
//             <iframe
//               width="100%"
//               height="300"
//               src={video.url}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         ))}
//       </div>

//       {/* Quote Section */}
//       <div
//         style={{
//           marginTop: "80px",
//           marginBottom: "60px",
//           fontFamily: "Archivo Black, sans-serif",
//           fontSize: "35px",
//           fontWeight: "bold",
//         }}
//       >
//         "The <span style={{ color: "red" }}>FERRARI</span> of Handguns"
//       </div>
//     </div>
//   );
// };

// export default Video;












import React from "react";

const videos = [
  {
    title: '"The Cool Features Will <span style="color:rgb(255,0,51);">Blow Your Mind</span>"',
    subtitle: "by Elite Force, Distributor in the US",
    url: "https://www.youtube.com/embed/QjtVHyLy5Jw?start=139",
    align: "left",
  },
  {
    title: '"<span style="color:rgb(255,0,51)">The Best Machining Quality</span> from Taiwan"',
    subtitle: "by Baton Airsoft, Distributor in Japan",
    url: "https://www.youtube.com/embed/cq4UiKn_ARU?start=54",
    align: "right",
  },
  {
    title: "Trinity Hi-CAPA in Action",
    subtitle: "",
    url: "https://www.youtube.com/embed/SzJyrLYJNk8?start=75",
    align: "left",
  },
];

const Video = () => {
  return (
    <div
      style={{
        backgroundColor: "",
        color: "white",
        padding: "40px",
        textAlign: "center",
        marginBottom:"60px"
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: "80px",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: "Archivo Black, sans-serif",
          marginBottom:"90px"
        }}
      >
        LET'S HEAR WHAT OTHERS SAY 
      </h2>

      {/* Video Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "110px",
          maxWidth: "2000px",
          fontFamily: "Archivo Black, sans-serif",
          margin: "auto",
          marginTop: "60px",
        }}
      >
        {videos.map((video, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: video.align === "left" ? "row" : "row-reverse",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              width: "100%",
              maxWidth: "1100px",
            }}
          >
            <iframe
              width="50%"
              height="300"
              src={video.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div style={{ textAlign: "left", maxWidth: "480px" }}>
            <h3 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "5px" }} dangerouslySetInnerHTML={{ __html: video.title }}></h3>
              {video.subtitle && (
                <p style={{ fontSize: "16px", marginBottom: "10px", color: "gray" }}>{video.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Video;
