const exp = require("express");
const app = exp();
const path = require("path");

// Make sure this path points to your React build output folder
const dir = path.join(__dirname, '..', 'frontEnd', 'dist');

app.use(exp.static(dir));

console.log(`Serving static files from ${dir}`);

app.get('/', (req, res) => {
  res.json({
    name:"harsh"
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
