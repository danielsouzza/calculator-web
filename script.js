const main = document.querySelector('.main'),
    allElements = main.querySelectorAll('.symbol'),
    preview_input = main.querySelector('#preview-input'),
    preview_output = main.querySelector('.preview-output')

var parenthesesOpened = 0;
var parenthesesClosed = 0;
const insert = (result) =>{
    increaseFont(preview_input)
    decrementFont(preview_output)
    preview_input.value += result
}



function clear(){
    let correntResult = preview_input.value
    let size = correntResult.length
    increaseFont(preview_input)
    decrementFont(preview_output)
    
    preview_input.value = correntResult.substring(0,size-1)
}

const clearAll = () => {
    preview_input.value = ""
    preview_output.innerHTML = "0"
    increaseFont(preview_input)
    decrementFont(preview_output)
}


const canBeCalculate = ()=>{
    return parenthesesClosed == parenthesesOpened
           
}


const calculate = () => {
    let correntResult = preview_input.value
    if(canBeCalculate() && correntResult){
        let result = eval(correntResult)
        preview_output.innerHTML = result
        increaseFont(preview_output)
        decrementFont(preview_input)
    }
}

const increaseFont = (element) =>{
    element.classList.add("increase-font")
    element.classList.remove("decrement-font")
}

const decrementFont = (element) =>{
    element.classList.remove("increase-font")
    element.classList.add("decrement-font")
}

const isNumber = (result) => {
    return !isNaN(result)
}

const isParentheses = (result) =>{
    let is = false;

    if(result == "("){
        parenthesesOpened++
        is = true
    }else if(result == ")"){
        parenthesesClosed++
        is = true
    }
    return is
}

const isParenthesesOrPont = (result) => {
    return isParentheses(result) | result == "."
}

const isSymbolMath = (id) => {
    return id >= "14" && id <= "17"
}

const isValid = (content,id) => {
    return isSymbolMath(id) ||
           isParenthesesOrPont(content) ||
           isNumber(content)
}

const clickedIquals = (id) => {
    return id == "18"
}


const listeningOnclick = (element) =>{
    let id = element.target.id
    let result = element.target.innerHTML
    if(isValid(result,id)){
        insert(result)
    }else if(isBackspace(id)){
        clear()
    }else if(isclearAll(id)){
        clearAll()
    }else if(clickedIquals){
        calculate()
    }
}

const isBackspace = (id) =>{
    return id == "12"
}

const isclearAll = (id) =>{
    return id == "21"
}

allElements.forEach(element => {
    element.addEventListener("click",listeningOnclick)
});