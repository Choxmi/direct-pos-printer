const express = require('express');

const app = express();
const port = 8900;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let receiptNo = 'S0102001'

let receiptHeader = `
**********************************************
             INDIRA PHONE CENTER\n
              T.P : 071-5568088
            Behind the bus stand
            New Shopping Complex
                Deraniyagala
            Receipt No:  `+receiptNo+`
**********************************************\n
`;

app.post('/', (req, res) => {
    let printer = require("printer");
    console.log(req.body);
    printer.printDirect({data: receiptHeader + req.body.data + '\n\n\n'
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