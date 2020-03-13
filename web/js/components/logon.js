/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var logon = {};

logon.UI = function (id) {
    var content = ` 
        <div class='logon'> <br/>
            Email Address <input type="text" id="logonEmailAddress"/> &nbsp;
            Password <input type="password" id="logonPassword"/> &nbsp;
            <input type="button" value="Submit" onclick="logon.findUser('logonEmailAddress','logonPassword','msgArea')"/> <br/> <br/>
            <div id="msgArea"></div>
        </div>
        `;
    document.getElementById(id).innerHTML = content;
};

logon.findUser = function (emailId, pwId, msgId) {
    console.log("logon.findUser");
    var targetDOM = document.getElementById(msgId);
    targetDOM.innerHTML = "";

    var desiredEmail = escape(document.getElementById(emailId).value);
    var desiredPassword = escape(document.getElementById(pwId).value);

    // the JS escape function cleans input so it can be used as a URL paramenter
    var myUrl = "webAPIs/logonAPI.jsp?email=" + desiredEmail + "&password=" + desiredPassword;
    console.log("logon.findUser ready to invoke web API with this url: " + myUrl);
    console.log("making ajax call");
    
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: emailId
    });

    function success(obj) {
        // var obj = JSON.parse(hreq.responseText); // this already done by function ajax2...
        if (!obj) {
            targetDOM.innerHTML += "logon.findUser(success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("logon.findUser (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);
        if (obj.errorMsg.length > 0) {
            targetDOM.innerHTML += "Database Error Encountered: " + obj.errorMsg;
            return;
        } else if (obj.length === 0) {
            targetDOM.innerHTML = "No Web User with email " + desiredEmail + " and password " + desiredPassword + " was found in the Database.";
        } else {
            var msg = "Welcome Web User " + obj.webUserId;
            msg += "<br/> &nbsp; Birthday: " + obj.birthday;
            msg += "<br/> &nbsp; MembershipFee: " + obj.membershipFee;
            msg += "<br/> &nbsp; User Role: " + obj.userRoleId + " " + obj.userRoleType;
            msg += "<br/> <img src ='" + obj.image + "'>";
            targetDOM.innerHTML = msg;
        }
    } 
};
