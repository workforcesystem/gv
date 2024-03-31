import React from "react";

// Dummy feedback data
const feedbackData = [
  "Great product! Really helped me in my work.",
  "Very user-friendly interface. Impressed!",
  "Could use some improvements, but overall good.",
];

const Documentation = () => {
  const cardStyle = {
    maxWidth: "500px",
    margin: "auto",
    marginTop: "20px",
  };

  const feedbackStyle = {
    padding: "15px",
    borderBottom: "1px solid #ccc",
  };

  return (
    <div className="container">
      <h2 className="text-center">Feedbacks</h2>
      <div style={cardStyle}>
        {feedbackData.map((feedback, index) => (
          <div key={index} className="card" style={feedbackStyle}>
            <div className="card-body">
              <p className="card-text">{feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
