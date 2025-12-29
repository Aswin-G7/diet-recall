import "./PlanCard.css";

const PlanCard = ({
  mealType,
  title,
  description,
  calories,
  serving = "1 Serving",
  time = "—",
}) => {
  return (
    <div className="plan-card-wrapper">
      <div className="card">
        <div className="content">
          
          {/* BACK */}
          <div className="back">
            <div className="back-content">
              <h3>{mealType}</h3>
              <p>{calories} kcal</p>
            </div>
          </div>

          {/* FRONT */}
          <div className="front">
            <div className="img">
              <div className="circle" />
              <div className="circle" id="right" />
              <div className="circle" id="bottom" />
            </div>

            <div className="front-content">
              <small className="badge">{mealType}</small>

              <div className="description">
                <div className="title">
                  <p>
                    <strong>{title}</strong>
                  </p>
                </div>

                <p className="card-footer">
                  {time} &nbsp; | &nbsp; {serving}
                </p>

                <p className="calories">{calories} kcal</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlanCard;
