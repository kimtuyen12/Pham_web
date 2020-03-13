/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var logoff = {};

logoff.UI = function (id) {
    console.log("called logoff");
    var content = ` 
            <div id="msgArea"></div>
        `;
    document.getElementById(id).innerHTML = content;
    logoff.logoff('msgArea');

};

logoff.logoff = function (msgId) {
    var contentDOM = document.getElementById(msgId);
    var myUrl = "webAPIs/logoffAPI.jsp";
    console.log("logoff.logoff ready to invoke web API with this url: " + myUrl);
    console.log("making ajax call");
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: msgId
    });
    function success(obj) {
        if (!obj) {
            contentDOM += "logoff.logoff(success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("logoff.logoff (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);
        contentDOM.innerHTML += obj.errorMsg;
        return;
    }
    ;
};