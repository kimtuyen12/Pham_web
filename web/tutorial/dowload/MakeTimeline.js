function makeWidget(params) {
    
    //getting id for placement of gallery on html page
    if (!params.id) {
        alert("params must have an 'id' property");
        return;
    }
    
    var widget = document.getElementById(params.id);

    //creating title of gallery with the title param 
    if (!params.title) {
        alert("params must have a 'title' property");
        return;
    }
    
    var galleryTitle = document.createElement("h1");
    galleryTitle.setAttribute("id", "gallery_title");
    galleryTitle.innerHTML = params.title;
    gallery.appendChild(galleryTitle);

    //going through each object in list and creating a post and modal element for it
    if (!params.list) {
        alert("params must have a 'list of objects' property");
        return;
    }
    
    
    for (i = 0; i < params.list.length; i++) {
        
        //creating gallery post div that holds post. Has class name gallery_column to specify size on page
        var galPosts = document.createElement("div");
        galPosts.classList.add("gallery_column");
        
        //creating post number for post in gallery
        var postNumber = i + 1;
        
        //creating post div that holds all elements of the object. Also creating the modal element for the object 
        //makes this div from the private functions makePost and makeModal
        var post = makePost(postNumber, params.list[i]);
        
        //appending the post div to the galPosts div
        galPosts.appendChild(post);
        
        //appending the col div to the gallery
        gallery.appendChild(galPosts);
    }



    
    
    //function called to make the modal element of the post
    function makeModal(obj) {
        //creating div to hold modal
        var modalElement = document.createElement("div");
        modalElement.classList.add("modal_element");

        //creating title and appending it to modal div
        var modalTitle = document.createElement("h1");
        modalTitle.classList.add("modal_title");
        modalTitle.innerHTML = obj.title;
        modalElement.appendChild(modalTitle);

        //creating container div to hold image and captions
        var modalContainer1 = document.createElement("div");
        modalContainer1.classList.add("modal_container");
        
        //creating image and adding it to container
        var modalImg = document.createElement("img");
        modalImg.classList.add("modal_img");
        modalImg.src = obj.image;
        modalContainer1.appendChild(modalImg);
        
        //creating caption (adding caption 1 and 2) and adding it to container
        var modalCaption = document.createElement("p");
        modalCaption.classList.add("modal_caption");
        modalCaption.innerHTML = obj.caption1 + "<br />" + obj.caption2;
        modalContainer1.appendChild(modalCaption);
        
        //appending container to modalElement
        modalElement.appendChild(modalContainer1);
        
        //creating second container to hold content
        var modalContainer2 = document.createElement("div");
        modalContainer2.classList.add("modal_container");

        //creating content and adding it to second container
        var modalContent = document.createElement("p");
        modalContent.classList.add("modal_content");
        modalContent.innerHTML = obj.content;
        modalContainer2.appendChild(modalContent);
        
        //appending second container to modalElement
        modalElement.appendChild(modalContainer2);

        //creating close button which closes modal element and appending it to modal div
        var modalClose = document.createElement("span");
        modalClose.classList.add("modal_close");
        modalClose.innerHTML = "&times";
        modalElement.appendChild(modalClose);

        //returning modal div
        return modalElement;
    }

};






