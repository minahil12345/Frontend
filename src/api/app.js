const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser"); // To read the csv file
const { spawn } = require("child_process");


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public folder

// Use express.urlencoded() for parsing form data
app.use(express.urlencoded({ extended: true }));

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" }); // Define the destination folder for uploaded files

// Route to render the form
app.get("/", (req, res) => {
  res.render("optimizeRoutes.ejs");
});

// Route to handle form submission with file upload
app.post("/optimizeRoutes", upload.single("csvFile"), (req, res) => {
  console.log(req.body); // This will contain the form data
  console.log(req.file); // This will contain information about the uploaded file
  const csvFilePath = req.file.path; // Get the path of the uploaded file
  console.log(csvFilePath);

  
//   open the file, read the content and delete the file
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log(results);
        //delete the file after reading
        fs.unlinkSync(csvFilePath);
      });


  // TODO -> 1. Call the distance matrix API
  // TODO -> 2. Make a json data file which will be used by the python script

  // Construct an absolute path to the Python script
  const pythonScriptPath = path.join(
    __dirname,
    "../algorithms/ABC/ABC-VRPTW.py"
  );
  const options = {
    cwd: path.dirname(pythonScriptPath),
  };
  // Spawn a child process in Node.js
  const pythonProcess = spawn("python3", [pythonScriptPath], options);

  // Collect data from script and send to browser
  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      return res.send(`Error running script: ${pythonScriptPath}`);
    } else {
      const resultsFile = path.join(__dirname, "../results/results.json");
      const resultsData = fs.readFileSync(resultsFile, "utf8");
      const resultsJson = JSON.parse(resultsData);
      res.render('assignRiders.ejs',{data:resultsJson});
    }
  });
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});