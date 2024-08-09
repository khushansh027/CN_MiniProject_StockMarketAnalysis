const stocks = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "PYPL",
  "TSLA",
  "JPM",
  "NVDA",
  "NFLX",
  "DIS",
];
console.log("Stocks array:", stocks);

async function renderChart() {
  document.getElementById("chartCanvas").style.display = "none";
  let stockChartsData, stockStatsData, stockSummary;
  try {
    stockChartsData = await (
      await fetch(
        "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata"
      )
    ).json();
    stockStatsData = await (
      await fetch(
        "https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata"
      )
    ).json();
    stockSummary = await (
      await fetch(
        "https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata"
      )
    ).json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return;
  } finally {
    document.getElementById("chartCanvas").style.display = "flex";
    document.getElementById("waiting").style.display = "none";
  }

  // let options = {
  //   series: [
  //     {
  //       name: "AAPL",
  //       data: createChart(
  //         stockChartsData,
  //         stockStatsData,
  //         stockSummary,
  //         "AAPL",
  //         "5y"
  //       ),
  //     },
  //   ],
  //   chart: {
  //     id: "area-datetime",
  //     type: "area",
  //     height: 350,
  //     zoom: {
  //       autoScaleYaxis: true,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   markers: {
  //     size: 2,
  //     style: "hollow",
  //   },
  //   xaxis: {
  //     type: "datetime",
  //     min: createChart(
  //       stockChartsData,
  //       stockStatsData,
  //       stockSummary,
  //       "AAPL",
  //       "5y"
  //     )[0][0],
  //     tickAmount: 10,
  //   },
  //   tooltip: {
  //     x: {
  //       format: "dd MMM yyyy",
  //     },
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       shadeIntensity: 1,
  //       opacityFrom: 0.7,
  //       opacityTo: 0.9,
  //       stops: [0, 100],
  //     },
  //   },
  // };

  let options = {
    series: [
      {
        name: "AAPL",
        data: createChart(
          stockChartsData,
          stockStatsData,
          stockSummary,
          "AAPL",
          "5y"
        ),
      },
    ],
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 2,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      min: createChart(
        stockChartsData,
        stockStatsData,
        stockSummary,
        "AAPL",
        "5y"
      )[0][0],
      tickAmount: 10,
      labels: {
        style: {
          colors: "#FFFFFF",  // White color for x-axis labels
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF",  // White color for y-axis labels
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };
  
  let chart = new ApexCharts(
    document.querySelector("#chart-timeline"),
    options
  );
  chart.render();

  populateStockList(stockStatsData, chart, stockChartsData, stockSummary);

  document.querySelector("#one_month").onclick = () => {
    const arr = createChart(
      stockChartsData,
      stockStatsData,
      stockSummary,
      document.getElementById("stockName").textContent,
      "1mo"
    );
    chart.updateOptions({
      series: [
        {
          data: arr,
          name: document.getElementById("stockName").textContent,
        },
      ],
      xaxis: {
        min: arr[0][0],
      },
    });
  };

  document.querySelector("#three_months").onclick = () => {
    const arr = createChart(
      stockChartsData,
      stockStatsData,
      stockSummary,
      document.getElementById("stockName").textContent,
      "3mo"
    );
    chart.updateOptions({
      series: [
        {
          data: arr,
          name: document.getElementById("stockName").textContent,
        },
      ],
      xaxis: {
        min: arr[0][0],
      },
    });
  };

  document.querySelector("#one_year").onclick = () => {
    const arr = createChart(
      stockChartsData,
      stockStatsData,
      stockSummary,
      document.getElementById("stockName").textContent,
      "1y"
    );
    chart.updateOptions({
      series: [
        {
          data: arr,
          name: document.getElementById("stockName").textContent,
        },
      ],
      xaxis: {
        min: arr[0][0],
      },
    });
  };

  document.querySelector("#five_years").onclick = () => {
    const arr = createChart(
      stockChartsData,
      stockStatsData,
      stockSummary,
      document.getElementById("stockName").textContent,
      "5y"
    );
    chart.updateOptions({
      series: [
        {
          data: arr,
          name: document.getElementById("stockName").textContent,
        },
      ],
      xaxis: {
        min: arr[0][0],
      },
    });
  };
}

function populateStockList(
  stockStatsData,
  chart,
  stockChartsData,
  stockSummary
) {
  const stockListElement = document.getElementById("stockList");

  stocks.forEach((val) => {
    const stockDetailsElement = document.createElement("div");
    stockDetailsElement.classList.add("stockDetailsDiv");

    const stockButton = document.createElement("button");
    stockButton.classList.add("stockButton");
    const stockPriceElement = document.createElement("span"),
      stockProfitElement = document.createElement("span");
      stockPriceElement.classList.add("stockPriceElement");
      stockProfitElement.classList.add("stockProfitElement");
    stockButton.textContent = val;
    stockPriceElement.textContent = `$${stockStatsData.stocksStatsData[0][
      `${val}`
    ].bookValue.toFixed(2)}`;
    stockProfitElement.textContent = `${stockStatsData.stocksStatsData[0][
      `${val}`
    ].profit.toFixed(2)}%`;
    if (stockStatsData.stocksStatsData[0][`${val}`].profit > 0)
      stockProfitElement.style.color = "#8edf6b";
    else stockProfitElement.style.color = "red";

    stockDetailsElement.append(
      stockButton,
      stockPriceElement,
      stockProfitElement
    );
    stockButton.onclick = () => {
      const arr = createChart(
        stockChartsData,
        stockStatsData,
        stockSummary,
        val,
        "5y"
      );
      chart.updateOptions({
        series: [
          {
            data: arr,
            name: val,
          },
        ],
        xaxis: {
          min: arr[0][0],
        },
      });
    };
    stockListElement.append(stockDetailsElement);
  });
}

function createChart(
  stockChartsData,
  stockStatsData,
  stockSummary,
  brand,
  time
) {
  const timeArr =
    stockChartsData.stocksData[0][`${brand}`][`${time}`].timeStamp;
  const valArr = stockChartsData.stocksData[0][`${brand}`][`${time}`].value;
  const dataArr = [];
  let minVal = valArr[0].toFixed(2),
    maxVal = minVal;

  for (let i = 0; i < timeArr.length; i++) {
    const newArr = [timeArr[i] * 1000, valArr[i].toFixed(2)];
    minVal = Math.min(minVal, newArr[1]);
    maxVal = Math.max(maxVal, newArr[1]);
    dataArr.push(newArr);
  }

  document.getElementById("stockName").textContent = brand;
  document.getElementById("book_Value").textContent = `$${
    stockStatsData.stocksStatsData[0][`${brand}`].bookValue
  }`;
  document.getElementById("profit").textContent = `${
    stockStatsData.stocksStatsData[0][`${brand}`].profit
  }%`;
  if (stockStatsData.stocksStatsData[0][`${brand}`].profit > 0)
    document.getElementById("profit").style.color = "green";
  else document.getElementById("profit").style.color = "red";

  document.getElementById("stockSummary").textContent =
    stockSummary.stocksProfileData[0][`${brand}`].summary;
  document.getElementById(
    "stockMin"
  ).textContent = `Low value in the selected period of time= $${minVal}`;
  document.getElementById(
    "stockMax"
  ).textContent = `Peak value in the selected period of time= $${maxVal}`;

  return dataArr;
}

renderChart();

// css
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
