const app = require('express')();
const fetch = require('node-fetch');
const server = require('http').createServer(app);
const socket = require('socket.io')(server, {
  cors: {
    "origin": '*'
  }
});

socket.on('connect', socket => {
  async function getData() {
    try {
      const request = await fetch("https://coinranking1.p.rapidapi.com/coins?timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0", {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
          'X-RapidAPI-Key': '99510c389cmshc9c0d6d7ed4b13dp192328jsn7f6d6aeaa859'
        }
      });

      const response = await request.json();
      socket.emit('data', response.data.coins);

    } catch (err) {
      console.log(err);
    }
  }

  getData();
  //setInterval(getData, 6000);

})

server.listen(3001, () => console.log('Server running on port 3001'));