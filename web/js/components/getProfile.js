/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var getProfile = {};

getProfile.UI = function(id){
    console.log("called get profile");
    var content = ` 
             <style>
             #msgArea img { 
                height:250px;
                border-radius: 6px;
                box-shadow: 3px 3px 3px #444444;
            }
            </style> 
            <div id="msgArea"></div>
        `;
    document.getElementById(id).innerHTML = content;
    getProfile.profile('msgArea');
    
};

getProfile.profile = function (msgId) {
    var contentDOM = document.getElementById(msgId);
    var myUrl = "webAPIs/getProfileAPI.jsp";
    console.log("logon.getProfile ready to invoke web API with this url: " + myUrl);
    console.log("making ajax call");
    ajax2({
        url: myUrl,
        successFn: success,
        errorId: msgId
    });
    function success(obj) {
        if (!obj) {
            contentDOM += "logon.getProfile(success private fn): Http Request (from AJAX call) did not parse to an object.";
            return;
        }
        console.log("logon.getProfile (success private fn): the obj passed in by ajax2 is on next line.");
        console.log(obj);

        if (obj.errorMsg.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.errorMsg;
            return;
        } else if (obj.length === 0) {
            contentDOM.innerHTML = "No Web User with email logged in";
        } else {
            var msg = "Web User " + obj.webUserId;
            msg += "<br/> &nbsp; Birthday: " + obj.birthday;
            msg += "<br/> &nbsp; MembershipFee: " + obj.membershipFee;
            msg += "<br/> &nbsp; User Role: " + obj.userRoleId + " " + obj.userRoleType;
            msg += "<br/> <img src ='" + obj.image + "'>";
            contentDOM.innerHTML = msg;
        }
    };
};