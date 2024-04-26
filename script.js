//your code here
let robotContainer = document.querySelector('.robot-section');


let imagesClassNames = ["img1", "img2", "img3","img4","img5"]

let imagesClassNames2 = [...imagesClassNames, imagesClassNames[Math.floor(Math.random()*imagesClassNames.length)] ]



function deleteElement(array, index){
      
     for(let i = index; i<=array.length-2; i++){
         array[i] = array[i+1]
     }
     array.pop()
     console.log(array)
     return array
}

for(let i = 1; i<=6; i++){
    let counter = Math.floor(Math.random()*imagesClassNames2.length) 
   
     let imageTag = document.createElement('img');
     console.log(counter)
     imageTag.className =  imagesClassNames2[counter];
     imageTag.id = "pic"+i;
     robotContainer.append(imageTag);
     // can I modify my array:
     let newArray = deleteElement(imagesClassNames2, counter)
     imagesClassNames2 = [...newArray]
    
}

//generate an h3 tag 

let heading3 = document.createElement('h3');
heading3.innerText = "Please click on the identical tiles to verify that you are not a robot."
heading3.id = "h3"
robotContainer.append(heading3);




let images = document.querySelectorAll('img')

for(let t of images){
    t.addEventListener("click", validate)
}

let click = 0
let resetBtnGenerated = false
let verifyBtnGenerated = false
let previousImgaeId = ""
function validate(event_details){
    console.log("heyyyyyy")
    let currentImageId = event_details.target.id
    if(previousImgaeId != currentImageId){
      click++ 
      previousImgaeId = currentImageId
    }
     
    // lets highlight the image
      event_details.target.classList.add("selected")

     if(click == 1 && !resetBtnGenerated){
          let resetBtn = document.createElement('button');
          resetBtn.id = "reset";
          resetBtn.innerText = "Reset";
          resetBtn.addEventListener("click", reset)
          robotContainer.append(resetBtn);
          resetBtnGenerated = true
     }
     else if(click == 2 && !verifyBtnGenerated){
         let verifyBtn = document.createElement('button');
         verifyBtn.id = "verify";
         verifyBtn.innerText = "Verify";
            verifyBtn.addEventListener("click", verify)
         robotContainer.append(verifyBtn);
            verifyBtnGenerated = true
     }
    
     else if(click==3){
        let verifyBtn = document.querySelector("#verify")
        verifyBtn.remove()
     }

}


function reset(){
    let images = document.querySelectorAll(".selected")
    for(let t of images){
        t.classList.remove("selected")
    }
    let resetBtn = document.querySelector("#reset")
    // resetBtn.style.dispaly = "none"
    resetBtn.remove()
    click = 0
    resetBtnGenerated = false
    verifyBtnGenerated = false
    previousImgaeId = ""

    let verifyBtn = document.querySelector("#verify")
    if(verifyBtn){
        verifyBtn.remove()
    }
}

function verify(){
    let selectedImages = document.querySelectorAll(".selected")
     let para = document.createElement('p');
     para.id = "para"
    if(selectedImages[0].className == selectedImages[1].className){
        para.innerText = "You are a human. Congratulations!."
    }
    else{
        para.innerText = " We can't verify you as a human. You selected the non-identical tiles."
    }
    robotContainer.append(para)
}