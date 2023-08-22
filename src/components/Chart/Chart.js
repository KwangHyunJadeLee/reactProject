import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    
    // data point values still is an array. 
    // We can use the spread operator here to pull out all the array elements and add them as standalone arguments to this max method.
    const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
