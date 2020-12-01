var http = require("http");
const config = require("config");
const Helper = require("./helper");

let strInput = '${sparkCommand} --deploy-mode ${spark.deploy-mode} --packages ${spark.packages} --jars ${spark.jars} --py-files ${spark.py-files} ${spark_application.options} ${spark_application.app} "{ \"appName\": ${spark_application.appName}, \"filePath\": {\"read\": ${current.s3.bucket}/${current.s3.key}, \"write\": ${current.s3.bucket}/${current.batchId}/+transform+timestamp/${current.fileName}}, ${spark_application.args} }';

let port = 8080;

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" })
    response.end("working..");

}).listen(port, () => {

    //  console.log("listening on port: " + port);
});

let keys = [];
keys = Helper.GetKeysFromString(strInput);
let finalString = Helper.ReplaceKeysWithValues(strInput, keys);

console.log(finalString);
