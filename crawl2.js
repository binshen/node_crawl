/**
 * Created by bin.shen on 28/12/2016.
 */

let co = require("co");
let request = require("co-request");
var jsdom = require("jsdom");
var fs = require("fs");

co(function* () {
    let response = yield request({
        method: "GET",
        uri: "http://shixin.court.gov.cn/index_publish_new.jsp",
        headers:{'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20"}
    });
    jsdom.env(response.body, function(err, window) {
        var $ = require("jquery")(window);
        var company = [];
        $("#TextContent1 tbody tr").each(function(){
            var td = $(this).find("td");
            company.push({ name: td.eq(0).text().trim(), num: td.eq(1).text().trim() });
        });
        fs.writeFileSync(__dirname + "/company.json", JSON.stringify(company, null, 4));

        var person = [];
        $("#TextContent2 tbody tr").each(function(){
            var td = $(this).find("td");
            person.push({ name: td.eq(0).text().trim(), num: td.eq(1).text().trim() });
        });
        fs.writeFileSync(__dirname + "/person.json", JSON.stringify(person, null, 4));
    });
}).catch(function (err) {
    console.log(err);
});