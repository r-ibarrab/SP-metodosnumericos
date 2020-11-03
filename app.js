
const ecuationsnum = document.querySelector('.ecuation-num');
const table = document.querySelector('.rows-container');
const answers = document.querySelector('.answers');
const start = document.querySelector('.start-button');


let numecuations=2;
let matriz1=[];
let matriz2=[];




function createInput(){
    const input = document.createElement('input');
    const inputContainer = document.createElement('span');
    inputContainer.classList.add('input-container');
    input.setAttribute("maxlength","7");
    input.setAttribute("type","number");
    input.setAttribute("value","0");
    input.setAttribute("onkeypress","handleChange(event)");
    input.classList.add('input-value')
    inputContainer.append(input)
    return inputContainer;

}

function deleteRow(){
   table.lastChild.remove();
   answers.lastChild.remove();
}

function deletInputs(){
    let hijos = table.children;


   for(let c=0;c<hijos.length;c++){
    hijos[c].lastChild.remove();
   }
}

function autofilling(){
    let hijos = table.children;

    for(let c=0;c<hijos.length;c++){
        let renglon = hijos[c];
        renglon = renglon.children;
       
        for(let j=0;j<renglon.length;j++){
            let nextvalue = (Math.random()/Math.random())*10;
            nextvalue = parseFloat(nextvalue).toFixed(3);
            renglon[j].children[0].value=nextvalue;
            renglon[j].children[0].style.color="white"

           
    
        }
    
   }
   let answershijos = answers.children;

   for(let c=0;c<answershijos.length;c++){
    answershijos[c].children[0].children[0].value=parseFloat((Math.random()/Math.random())*10).toFixed(3);

    }


}

function handleChange(e){
    e.target.style.color="white"
    

}

function gaussJordan(num){

    // let hijos = table.children;
    // let hola = answers.children
    // let time=100;
    

    // for(let c=0;c<hijos.length;c++){
    //     let renglon = hijos[c];
    //     renglon = renglon.children;
    //     let pivote = renglon[c].children[0].value
        
    //     for(let j=0;j<renglon.length;j++){
    //         setTimeout(()=>{
    //         renglon[j].children[0].style.border="3px solid white"
    //         const flotante = document.createElement('div')
    //         if(j===c){
    //             renglon[j].children[0].style.color="#F8E43E"
    //             renglon[j].children[0].value=renglon[j].children[0].value/pivote

    //         }else{
    //         renglon[j].children[0].value=parseFloat(renglon[j].children[0].value/pivote).toFixed(3)

    //         }

    //         flotante.textContent=`÷${pivote}`
    //         flotante.classList.add('flotante');
    //         renglon[j].append(flotante)
            
                
    //         },800+time)
    //         setTimeout(()=>{
    //             renglon[j].children[0].style.border="none"

                
    //         },950+time)
    //         time+=200;
    
    //     }
    //     setTimeout(()=>{
    //         hola[c].children[0].children[0].style.border="3px solid white"
    //         const flotante2 = document.createElement('div')
    //         flotante2.textContent=`÷${pivote}`
    //         flotante2.classList.add('flotante');
    //         hola[c].children[0].children[0].value=parseFloat(hola[c].children[0].children[0].value/pivote).toFixed(3)
    //         hola[c].children[0].append(flotante2)
    //     },800+time)
    //     setTimeout(()=>{
    //         hola[c].children[0].children[0].style.border="none"
    //         if(c===numecuations-1){
    //             alert('final')
    //             document.querySelector('.ecuation-table').style.pointerEvents="all"
    //             document.querySelectorAll('.ecuation-button')[0].style.pointerEvents="all"
    //             document.querySelectorAll('.ecuation-button')[1].style.pointerEvents="all"
    //             document.querySelector('.automatic-filling').style.pointerEvents="all"

    //         }
           
            
    //     },950+time)
       
    // }


    // matriz1 matriz2

    let aux2 = matriz2

    for(let i=0;i<num;i+=1){
       


        let piv = matriz1[i][i];

        for(let j=0;j<num;j++){

            matriz1[i][j] = matriz1[i][j] / piv;

        }

        aux2[i]= aux2[i] / piv;

        for(let j=0;j<num;j++){

            if(j!= i && matriz1[j][i]){

                let factor = matriz1[j][i];

                for(let k=0;k<num;k++){

                    matriz1[j][k]= matriz1[j][k] - (factor * matriz1[i][k])

                }

                aux2[j]= aux2[j] - ( factor * aux2[i]);
           
            }
        }

    }
    

    return aux2







}       






function gaussSeidell(iter){
    let matrizceros=[]

    for(let c=0;c<matriz2.length;c++){
        matrizceros.push(0)
    }

    for(let c=0;c<iter;c++){
        for(let i=0;i<numecuations;i++){
            matrizceros[i]=matriz2[i];
            for(let j=0;j<numecuations;j++){
                if(j!=i){
                    matrizceros[i]=matrizceros[i] - (matriz1[i][j] * matrizceros[j])
                }
            }
            matrizceros[i]=matrizceros[i] / matriz1[i][i]
        }
    }
    return matrizceros

    
}


function solve(){
    // document.querySelector('.ecuation-table').style.pointerEvents="none"
    // document.querySelector('.automatic-filling').style.pointerEvents="none"
    // document.querySelectorAll('.ecuation-button')[0].style.pointerEvents="none"
    // document.querySelectorAll('.ecuation-button')[1].style.pointerEvents="none"
    getMatrix();
    let results;
    if(document.querySelector('#option-selected').value == 1){
        results = gaussJordan(numecuations)
        

    }else{
        results = gaussSeidell(50)
        
    }

    document.querySelector('.blured-background ').style.display="flex"
    document.querySelector('.upper-card').style.display="flex"

    const content = document.querySelector('.upper-card_content')

    results.map((e,c)=>{
        let text = document.createElement('h1');
        text.textContent=`x${c} = ${e}`
        text.classList.add('results-text')
        content.appendChild(text);
    })


    
    

}



function closecard(){
        document.querySelector('.blured-background').style.display="none"
        document.querySelector('.upper-card').style.display="none"
    const content = document.querySelector('.upper-card_content')
    content.innerHTML=""
    

      
}

function getMatrix(){
    let hijos = table.children;
    matriz1=[];
    matriz2=[];

    for(let c=0;c<hijos.length;c++){
        let renglon = hijos[c];
        renglon = renglon.children;
  
        let aux=[]

        for(let j=0;j<renglon.length;j++){
            aux.push(renglon[j].children[0].value)
    
        }
        matriz1.push(aux);

    
   }


   let aux=[]
   let answershijos = answers.children;

   for(let c=0;c<answershijos.length;c++){
        aux.push(answershijos[c].children[0].children[0].value)
    }
    matriz2=aux
 

console.log(matriz1)
console.log(matriz2)

}


function addRow(){
    const row = document.createElement('div');
    row.classList.add('row')
    for(let c=0;c<numecuations;c++){
        let input = createInput();
        
        row.append(input)
    }
    const rowanswer = document.createElement('div');
    rowanswer.classList.add('row')
    rowanswer.append(createInput());

    answers.appendChild(rowanswer)
    
    table.appendChild(row);
}

function appendInput(){
    let hijos = table.children;
  

   for(let c=0;c<hijos.length;c++){
    hijos[c].appendChild(createInput());
   }
}

function sumone(){

    let num = parseInt(ecuationsnum.textContent);
    if(num<7){
        num+=1;
        numecuations=num;
        appendInput();
        addRow();
    }
    ecuationsnum.textContent = num;
}

function restone(){

    let num = parseInt(ecuationsnum.textContent);
    if(num>2){
        num-=1;
        numecuations=num;
        deletInputs();
        deleteRow();
    }
    ecuationsnum.textContent = num;
}