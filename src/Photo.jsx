export default function Photo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "60px 0",
        flexWrap: "wrap",
        background: "rgb(31,31,31)",
      }}
      className="my-5"
    >
      {[1, 2, 3, 4].map((num) => (
        <img
          key={num}
          src={`/images/landing/trinity${num}.jpg`}
          alt=""
          style={{
            width: "320px",
            borderRadius: "5px",
          }}
        />
      ))}
    </div>
  );
}