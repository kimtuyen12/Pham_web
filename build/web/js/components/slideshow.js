function slideshow(id) {

    "use strict";

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
        <style>
            /* the html coder can "override" any slideShow CSS they want to */
            .slideShow{
                float: left; 
                box-sizing: border-box; 
                width: 33.3%;
            }
            .slideShow img {
                width: 85%;
            }

        </style> 
        
        <div id="slideId" style="float: left; padding: 25px;">
            <div style= "padding-bottom: 8px;">
                <input id="caption1"/>
                <button id="button1">Change caption</button>
            </div>
        </div>
        
        <div id="slideId2" style="float: left; padding: 25px; margin-bottom: 25px;">
            <div style= "padding-bottom: 8px;">
                <input id="caption2"/>
                <button id="button2">Change caption</button>
            </div>
        </div>
    `;

    document.getElementById(id).innerHTML = content;
    
    var ss;
    var ss2;

    ajax3({
        url: "webAPIs/listUsersAPI.jsp",
        successFn: success,
        errorEle: document.getElementById("slideId")
    });

    ajax3({
        url: "webAPIs/listUniversityAPI.jsp",
        successFn: success2,
        errorEle: document.getElementById("slideId2")
    });

    function success(userList) {
        userList = userList.webUserList;
        console.log(userList);

        ss = MakeSlideShow({
            slideShowEle: document.getElementById("slideId"), // id in which to render slideshow,
            objList: userList, // array of objects with image and caption
            picPropName: "image",
            userEmail: "userEmail"
        });
    }

    function success2(universityList) {
        universityList = universityList.universityList;
        console.log(universityList);

        ss2 = MakeSlideShow({
            slideShowEle: document.getElementById("slideId2"), // id in which to render slideshow,
            objList: universityList, // array of objects with image and caption
            picPropName: "universityImage",
            universityName: "universityName"
        });
    }
    
    var button1 = document.getElementById("button1");
    button1.onclick = function() {
        var newCaption = document.getElementById("caption1").value;
        ss.setNewCaption(newCaption);
    };
    
    var button2 = document.getElementById("button2");
    button2.onclick = function() {
        var newCaption = document.getElementById("caption2").value;
        ss2.setNewCaption(newCaption);
    };
}
;