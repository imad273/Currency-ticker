import { io } from "socket.io-client";

// use Localhost endpoint for testing
const socket = io("ws://localhost:3001");
//const socket = io("https://cur-ticker2.herokuapp.com/");

socket.on("connect", () => {
  console.log("Connected");
})

socket.on('data', data => {
  console.log(data);

  const par = document.getElementById("show");

  //par.innerHTML = data[0].price;

  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    tbody.innerHTML += `
      <tr>
        <td class='name'>
          <img class='curIcn' src="${data[i].iconUrl}" alt="">
          <div>
            <span>${data[i].name}</span>
            <p>${data[i].symbol}</p>
          </div>
        </td>
        <td>$ ${new Intl.NumberFormat().format(data[i].price) <= 1 ? data[i].price.slice(0, 7) : new Intl.NumberFormat().format(data[i].price)}</td>
        <td>$ ${new Intl.NumberFormat().format(data[i].marketCap).slice(0, 5)} Billion</td>
        <td>
          ${data[i].change[0] === "-" ?
        `<p class='red'>${data[i].change}%</p>`
        :
        `<p class='green'>+${data[i].change}%</p>`
      }</td>
          <td>
            <div class='Chart'>
              <canvas class="myChart"></canvas>
            </div>
          </td>`;
  }

  var charts = document.getElementsByClassName("myChart");

  for (var i = 0; i < data.length; i++) {
    const labels = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];

    const ChartData = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: '#FF7977',
        borderColor: 'rgb(255, 99, 132)',
        data: [
          // * For Loop doesn't work here, So I used a hardcoded array
          // ! Some times the returned data is null, So I check the data and Change all the null values to the next value
          data[i].sparkline[0] === null ? data[i].sparkline[0 + 1].slice(0, 3) : data[i].sparkline[0].slice(0, 3),
          data[i].sparkline[2] === null ? data[i].sparkline[2 + 1].slice(0, 3) : data[i].sparkline[2].slice(0, 3),
          data[i].sparkline[4] === null ? data[i].sparkline[4 + 1].slice(0, 3) : data[i].sparkline[4].slice(0, 3),
          data[i].sparkline[6] === null ? data[i].sparkline[6 + 1].slice(0, 3) : data[i].sparkline[6].slice(0, 3),
          data[i].sparkline[8] === null ? data[i].sparkline[8 + 1].slice(0, 3) : data[i].sparkline[8].slice(0, 3),
          data[i].sparkline[10] === null ? data[i].sparkline[10 + 1].slice(0, 3) : data[i].sparkline[10].slice(0, 3),
          data[i].sparkline[12] === null ? data[i].sparkline[12 + 1].slice(0, 3) : data[i].sparkline[12].slice(0, 3),
          data[i].sparkline[14] === null ? data[i].sparkline[14 + 1].slice(0, 3) : data[i].sparkline[14].slice(0, 3),
          data[i].sparkline[16] === null ? data[i].sparkline[16 + 1].slice(0, 3) : data[i].sparkline[16].slice(0, 3),
          data[i].sparkline[18] === null ? data[i].sparkline[18 + 1].slice(0, 3) : data[i].sparkline[18].slice(0, 3),
          data[i].sparkline[20] === null ? data[i].sparkline[20 + 1].slice(0, 3) : data[i].sparkline[20].slice(0, 3),
          data[i].sparkline[22] === null ? data[i].sparkline[22 + 1].slice(0, 3) : data[i].sparkline[22].slice(0, 3),
          data[i].sparkline[24] === null ? data[i].sparkline[24 + 1].slice(0, 3) : data[i].sparkline[24].slice(0, 3),
          data[i].sparkline[26] === null ? data[i].sparkline[26 + 1].slice(0, 3) : data[i].sparkline[26].slice(0, 3)
        ],
        tension: 0.5,
        pointStyle: 'none',
      }]
    };

    const config = {
      type: 'line',
      data: ChartData,
      responsive: true,
      options: {
        events: [],
        elements: {
          point: {
            radius: 0
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          xAxis: {
            display: false
          },
          yAxis: {
            display: false
          }
        }
      }
    };

    const myChart = new Chart(
      charts[i],
      config
    );
  }

});

//socket.emit('test', "hello world")