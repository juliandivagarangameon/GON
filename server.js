// server.js
const express = require('express');
const { sendIfNewWallet } = require('./sendGON');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Send GON Token</h2>
    <form action="/send-gon" method="POST">
      <lable>Platform: </label><br />
      <input type="text" name="hosting" required /><br />
      <label>Game ID / Email:</label><br />
      <input type="text" name="email" required /><br />
      <label>Wallet Address:</label><br />
      <input type="text" name="wallet" required /><br /><br />
      <lable>Score</label><br />
      <input type="text" name="score" /> <br /><br />
      <button type="submit">Send GON</button>
    </form>
  `);
});

app.post('/send-gon', async (req, res) => {
  const { email, wallet,score } = req.body;
  const result = await sendIfNewWallet(email, wallet,score);

  if (result.status === 'success') {
    res.send(`
      <h3>${result.message}</h3>
      <p>Tx Hash: <code>${result.txHash}</code></p>
      <a href="/">← Go back</a>
    `);
  } else {
    res.send(`
      <h3>${result.message}</h3>
      <a href="/">← Try again</a>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
