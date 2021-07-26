const express = require('express');

const app = express();
const port = 8900;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    let printer = require("printer");

    printer.printDirect({data: req.body.data
        , type: 'RAW'
        , success:function(jobID){
            console.log("sent to printer with ID: "+jobID);
            res.send('Printed')
        }
        , error:function(err){
            console.log(err);
            res.send('Error Printing')
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})