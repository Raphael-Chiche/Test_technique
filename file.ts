import fs from "node:fs";
import { parse } from "csv-parse";

const parser = parse({ delimiter: ",", columns: true }, function (err, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("output.json", jsonData);
});

fs.createReadStream("properties.csv").pipe(parser);
