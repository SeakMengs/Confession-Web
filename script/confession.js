
//*Credit https://stackoverflow.com/questions/17772260/textarea-auto-height
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}