alert("JS ACTIVATED!");
var selectedIndex=-1;
// document.querySelector("#changeIT").addEventListener("change", function() 
// {
//     alert("Clicked ITooo");
//     console.log("Changed It");
//     selectedIndex = this.selectedIndex;
//     console.log("selectedIndex: ",selectedIndex);
//     console.log(myArr[0].userName);
// });
document.querySelector("#abcd").addEventListener("click", function() 
{
    alert("Clicked");
    console.log("heyh! button");
});

document.querySelector("#changeIT").addEventListener("change", function() {
    alert("Clicked ITooo");
    console.log("Changed It");
    var selectedIndex = this.selectedIndex;
    console.log("selectedIndex: ", selectedIndex);

    // Get the 'to' select element
    var toSelect = document.querySelector("select[name='to']");

    // Clear existing options
    toSelect.innerHTML = "";

    // Populate 'to' select with options excluding the selected option in 'from' select
    for (var i = 0; i < myArr.length; i++) {
        if (i !== selectedIndex) {
            var option = document.createElement("option");
            option.value = myArr[i].userId;
            option.textContent = myArr[i].userId + " || " + myArr[i].userName;
            toSelect.appendChild(option);
        }
    }
});