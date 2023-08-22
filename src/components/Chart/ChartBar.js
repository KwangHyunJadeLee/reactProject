import "./ChartBar.css";
const ChartBar = (props) => {
  let barFillheight = "0%";

  if (props.maxValue > 0) {
    barFillheight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
        //   Adding dynamic style property in React. Basically it is added by Object.
        //   if case of that the name of property include dash('-'), quote around the property name is needed or camel case version
        //   ex) 'background-color' or backgroundColor
          style={{ height: barFillheight }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
};
export default ChartBar;
