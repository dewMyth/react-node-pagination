// Create an Express app on Port 3000

const express = require("express");
const app = express();
const port = 5000;

const posts = require("./data.json");

// Cors
const cors = require("cors");

app.use(cors());

// Create a route for GET / that returns a message
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/posts/:pageNo", (req, res) => {
  const pageNo = req.params.pageNo;
  const pageSize = 10;

  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = pageNo * pageSize;

  const result = posts.slice(startIndex, endIndex);

  return res.json({
    result: {
      posts: result,
      total: posts.length,
      pageNo: pageNo,
    },
  });
});

// SAMPLE RESPONSE FOR GET /api/posts/1

// {
//   "result": {
//     "posts": [
//       {
//         "id": 1,
//         "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//         "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis ultricies ultricies, nunc nisl ultricies nunc, quis al
//       },
//       {
//         "id": 2,
//         "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//         "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis ultricies ultricies, nunc nisl ultricies nunc, quis al
//       },
//      ....
//     ],
//     "total": 100,
//     "pageNo": 1
//   }

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
