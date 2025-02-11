import express from "express";

const app = express();

// app.get('/', (req, res) => {
//   res.sendFile("C:/Users/81804/souhatsu/サーバー/project/WEBapp/index.html");
// });

app.use(express.static("WEBapp"));
app.use(express.json());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

let ID = 1;
app.post('/NewUser', (req, res) => {
  res.json(ID);
  ID++;
  console.log(`[NewUser] ID: ${ID}`);
});

const SwitchStatus = [0,0,0,0];
app.post('/KasaTouroku', (req, res) => {
  const { id, hole } = req.body;
  SwitchStatus[hole] = id; 
  res.json();
  console.log(`[KasaTouroku] id: ${id}, hole: ${hole}, status: ${SwitchStatus}`);
});

app.post('/KasaStatus', (req, res) => {
  res.json(SwitchStatus);
  console.log(`[KasaStatus] status: ${SwitchStatus}`);
});

app.post('/KasaIn', (req, res) => {
  const hole = req.body.hole;
  SwitchStatus[hole] = -1;
  res.json();
  console.log(`[KasaIn] hole: ${hole}, status: ${SwitchStatus}`);
});

app.post('/KasaOut', (req, res) => {
  const hole = req.body.hole;
  SwitchStatus[hole] = 0;
  res.json();
  console.log(`[KasaOut] hole: ${hole}, status: ${SwitchStatus}`);
});

