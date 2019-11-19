import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styles from "./App.module.scss";
import MyChart from "./components/MyChart";

function App() {
  const [type, setType] = React.useState("close");
  const [days, setDays] = React.useState(7);
  const [yLabel, setYLabel] = React.useState();
  const [chartData, setChartData] = React.useState();
  const [fullData, setFullData] = React.useState([]);

  const handleDaysChange = event => {
    setDays(event.target.value);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  React.useEffect(() => {
    setFullData([
      {
        date: "01-Nov-19",
        close: 189044.7,
        count: 184
      },
      {
        date: "02-Nov-19",
        close: 241101.5,
        count: 210
      },
      {
        date: "03-Nov-19",
        close: 238441.1,
        count: 243
      },
      {
        date: "04-Nov-19",
        close: 189023.68,
        count: 198
      },
      {
        date: "05-Nov-19",
        close: 324775.4,
        count: 154
      },
      {
        date: "06-Nov-19",
        close: 158978.1,
        count: 133
      },
      {
        date: "07-Nov-19",
        close: 342512.2,
        count: 175
      },
      {
        date: "08-Nov-19",
        close: 135047.5,
        count: 148
      },
      {
        date: "09-Nov-19",
        close: 137623.85,
        count: 111
      },
      {
        date: "10-Nov-19",
        close: 115496.8,
        count: 101
      },
      {
        date: "11-Nov-19",
        close: 102030.0,
        count: 75
      },
      {
        date: "12-Nov-19",
        close: 125534.95,
        count: 112
      },
      {
        date: "13-Nov-19",
        close: 135241.3,
        count: 165
      },
      {
        date: "14-Nov-19",
        close: 251490.7,
        count: 321
      },
      {
        date: "15-Nov-19",
        close: 200259.04,
        count: 119
      },
      {
        date: "16-Nov-19",
        close: 86667.75,
        count: 78
      },
      {
        date: "17-Nov-19",
        close: 85286.3,
        count: 79
      },
      {
        date: "18-Nov-19",
        close: 66011.0,
        count: 67
      },
      {
        date: "19-Nov-19",
        close: 7809.12,
        count: 6
      }
    ]);
  }, []);

  React.useEffect(() => {
    if (type === "close") {
      setYLabel(() => value => {
        return value / 100000 + "L";
      });
    } else {
      setYLabel(() => value => {
        return value;
      });
    }

    setChartData(
      fullData.slice(0, days).map(x => {
        return {
          date: x.date,
          value: x[type]
        };
      })
    );
  }, [type, days, fullData]);

  return (
    <div>
      <div className={styles.pullRight}>
        <RadioGroup
          aria-label="position"
          name="position"
          value={type}
          onChange={handleTypeChange}
          row
        >
          <FormControlLabel
            value="close"
            control={<Radio color="primary" />}
            label="Amount"
            labelPlacement="start"
          />
          <FormControlLabel
            value="count"
            control={<Radio color="primary" />}
            label="Donors"
            labelPlacement="start"
          />
        </RadioGroup>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-label">Last</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={days}
            onChange={handleDaysChange}
          >
            <MenuItem value={7}>1 Week</MenuItem>
            <MenuItem value={14}>2 Weeks</MenuItem>
            <MenuItem value={30}>1 Month</MenuItem>
          </Select>
        </FormControl>
      </div>
      {chartData && <MyChart data={chartData} yLabel={yLabel}></MyChart>}
    </div>
  );
}

export default App;
