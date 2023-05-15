import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function App() {
  const [str, setStr] = useState("");
  const [words, setwords] = useState([]);
  const [freq, setfreq] = useState([]);
  const [isgraph, setisgraph] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "https://www.terriblytinytales.com/test.txt"
      );
      setStr(data.data);
    };

    getData();
  });
  const countWords = (words) => {
    const frequency = {};
    for (let i = 0; i < words.length; i++) {
      if (frequency[words[i]]) {
        frequency[words[i]]++;
      } else {
        frequency[words[i]] = 1;
      }
    }
    const sortedArray = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => `${word}: ${count}`);
    return sortedArray;
  };
  const myFun = () => {
    let words = str.match(/[a-zA-Z]+/g);
    const ans = countWords(words);
    var w = [];
    var f = [];
    for (let i = 0; i < 20; i++) {
      const temp = ans[i].split(":");
      w.push(temp[0]);
      f.push(parseInt(temp[1]));
      setisgraph(true);
    }
    setfreq(f);
    setwords(w);
  };
  return (
    <div className="App">
      {isgraph === false ? (
        <div className="main">
          <img src="https://www.terriblytinytales.com/img/home/ttt.svg" alt="ttt"></img>
          <h1>Terribly Tiny Tales Assignment</h1>
          <button className="butn" onClick={myFun}>Submit</button>
        </div>
      ) : (
        <div className="chart">
          <Chart
            type="bar"
            width={1000}
            height={600}
            series={[
              {
                name: "Word Frequency",
                data: freq,
              },
            ]}
            options={{
              colors: ["#F44336"],
              plotOptions: {
                bar: {
                  columnWidth: "99%",
                  horizontal: false,
                  borderRadius: 1,
                },
              },
              title: {
                text: "Histogram for 20 most occuring words",
                style: { fontSize: 20 },
              },
              xaxis: {
                tickPlacement: "on",
                categories: words,
                title: {
                  text: "Words",
                },
                labels: {
                  show: true,
                  rotateAlways: true,
                  rotate: -30,
                  hideOverlappingLabels: false,
                },
              },

              yaxis: {
                title: {
                  text: "Frequencies",
                },
              },
              chart: {
                toolbar: {
                  show: true,
                  offsetX: 0,
                  offsetY: 0,
                  tools: {
                    download: 'Export',
                    selection: true,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                    customIcons: [],
                  },
                  export: {
                    csv: {
                      filename: undefined,
                      columnDelimiter: ",",
                      headerCategory: "category",
                      headerValue: "value",
                      dateFormatter(timestamp) {
                        return new Date(timestamp).toDateString();
                      },
                    },
                    svg: {
                      filename: undefined,
                    },
                    png: {
                      filename: undefined,
                    },
                  },
                  autoSelected: "zoom",
                },
              },
            }}
          ></Chart>
        </div>
      )}
    </div>
  );
}

export default App;
