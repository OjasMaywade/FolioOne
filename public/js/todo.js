

document.querySelector(".post").addEventListener("click", ()=>{
    let val_1 = document.querySelector(".title").value;
    let val_2 = document.querySelector(".description").value;
    let sendObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "title": val_1, "completed": false, "description": val_2 })
       
    }
    fetch("http://localhost:3000/todos/", sendObj)
    .then(response => response.json())
        .then(response => 
            {
                //console.log(response)
                var parentNode = document.querySelector(".to-do")
            var childElement = document.createElement("div")
            var grandChildElement1 = document.createElement("p");
            var grandChildElement2 = document.createElement("p");
            grandChildElement1.innerHTML = JSON.stringify(response.title);
            grandChildElement2.innerHTML = JSON.stringify(response.description);
            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            parentNode.appendChild(childElement);
        }
    )
        .catch(err => console.error(err));
     
})

//document.querySelector(".get").addEventListener("click", ()=>{
   function getData(){
    let sendObj = {
        method: "GET",
    }
    fetch("http://localhost:3000/todos/", sendObj)
    .then(response => response.json())
    .then(res => 
        {   
            var parentNode = document.querySelector(".to-do")
            for(i=0;i<5;i++){
            var childElement = document.createElement("div")
            var grandChildElement1 = document.createElement("p");
            var grandChildElement2 = document.createElement("p");
            var grandChildElement3 = document.createElement("button");
            grandChildElement1.innerHTML = JSON.stringify(res[i].title);
            grandChildElement2.innerHTML = JSON.stringify(res[i].description);
            grandChildElement3.innerHTML = "delete";
           // grandChildElement3.setAttribute("id", i);
            document.querySelectorAll("button")[i].addEventListener("click", (event)=>{
                var id = event.target.id;
                let sendObj = {
                    method: "DELETE"
                }
                fetch(`http://localhost:3000/todos/${id}`, sendObj)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
            })
            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            childElement.appendChild(grandChildElement3);
            parentNode.appendChild(childElement);
            
           }
        })
    .catch(err => console.error(err));

}
//})
getData();

