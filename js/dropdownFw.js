// Sally's JS naming convention: every JS file shall be named for the single funtion 
// or object that is defined within the file (helps to organize and find code).
 
// Initialize the drop down framework by calling dropDownFw (below). You can pass in 
// a parameter that has properties dropHeader, dropContent, and hiddenRight if you want 
// to define them or you can not specify these and the fw will assign default values. 
// 
// Note: you have to use the "visibility" (hidden/visible) rather than "display" (none/block) 
// if you want to use transitions/animation on the open/close of the dropdown content elements. 

"use strict";

function dropdownFw(paramsIn) {
    
    // if nothing at all is passed in, assume an empty parameter object
    var params = paramsIn || {};
    
    // The parameter object can (optional) have three properties (next three assignment statements).

    // This is the classname of the drop down header menus (check style sheet and nav bar).
    var dropHeaderStyle = params.dropHeaderStyle || "dropHeader";

    // This is the classname of the drop down content menus (check style sheet and nav bar).
    var dropContentStyle = params.dropContentStyle || "dropContent";

    // A larger negative number (like -1000) for hiddenRight will make the drop down content 
    // elements slower to come in from the right (because it will be farther off screen 
    // when it begins to travel in from the right). 
    var hiddenRight = params.hiddenRight || "-500px";

    var headerList = document.getElementsByClassName(dropHeaderStyle);
    for (var i = 0; i < headerList.length; i++) {
        headerList[i].onclick = function () {

            // get the DOM element that is classed dropContentStyle which is a sibling 
            // of the dropHeader that was clicked. This is what we want to open or close.
            var parent = this.parentElement; // "this" means clicked DOM element.
            var dContent = parent.getElementsByClassName(dropContentStyle)[0];

            var dropContentList = document.getElementsByClassName(dropContentStyle);
            //console.log(dropContentList);

            // when one dropdown is clicked, make sure to close any other ones
            // that the user may have left open.
            for (var i = 0; i < dropContentList.length; i++) {
                if (dropContentList[i] !== dContent) {
                    hide(dropContentList[i]);
                }
            }

            // Tip: JS doesnt understand the initial CSS values (the values 
            // set by style sheet instead of by JS), unless you use the getComputedStyle
            // function. But you can avoid having to use getComputedStyle by having your  
            // if condition test for the way CSS does NOT have it initially set. 
            // (In other words, do not reverse the order of the if/else block.)                      
            if (dContent.style.visibility === "visible") {
                hide(dContent);
            } else {
                show(dContent);
            }

        };
    }


    // private function, makes element invisible (display:none cannot be used with transition/amimation).
    // By setting the right attribute to large negative number, the element will be placed far off screen
    // to the right and this will be where it starts when it is next made visible (for the "zoom in from 
    // right" animation). 
    function hide(ele) {
        ele.style.right = hiddenRight;
        ele.style.visibility = "hidden";
    }

    // private function, makes element visible.
    function show(ele) {
        ele.style.visibility = "visible";
        ele.style.right = "0px";
    }

    function hideAllDropContents() {
        var dropContentList = document.getElementsByClassName(dropContentStyle);
        for (var i = 0; i < dropContentList.length; i++) {
            hide(dropContentList[i]);
        }
    }


    // Close all dropdown content menus whenever the user clicks anything but a drop down header
    window.onclick = function (event) {
        if (!event.target.matches('.' + dropHeaderStyle)) {
            hideAllDropContents();
            //console.log("hiding all drop contents");
        } else {
            //console.log("not hiding all drop contents");
        }
    };

}