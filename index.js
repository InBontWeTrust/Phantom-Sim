const draftValues = [
[1,3000],
[2,2517],
[3,2234],
[4,2034],
[5,1878],
[6,1751],
[7,1644],
[8,1551],
[9,1469],
[10,1395],
[11,1329],
[12,1268],
[13,1212],
[14,1161],
[15,1112],
[16,1067],
[17,1025],
[18,985],
[19,948],
[20,912],
[21,878],
[22,845],
[23,815],
[24,785],
[25,756],
[26,729],
[27,703],
[28,677],
[29,653],
[30,629],
[31,606],
[32,584],
[33,563],
[34,542],
[35,522],
[36,502],
[37,483],
[38,465],
[39,446],
[40,429],
[41,412],
[42,395],
[43,378],
[44,362],
[45,347],
[46,331],
[47,316],
[48,302],
[49,287],
[50,273],
[51,259],
[52,246],
[53,233],
[54,220],
[55,207],
[56,194],
[57,182],
[58,170],
[59,158],
[60,146],
[61,135],
[62,123],
[63,112],
[64,101],
[65,90],
[66,80],
[67,69],
[68,59],
[69,49],
[70,39],
[71,29],
[72,19],
[73,9],
[74,0]
]

let draftOrder = [
    [1,"Richmond"],
    [2,"North Melbourne"],
    [3,"Carlton"],
    [4,"Adelaide"],
    [5,"Melbourne "],
    [6,"Richmond"],
    [7,"St Kilda"],
    [8,"St Kilda"],
    [9,"Melbourne"],
    [10,"Richmond"],
    [11,"Richmond"],
    [12,"West Coast"],
    [13,"Port Adelaide"],
    [14,"Fremantle"],
    [15,"GWS"],
    [16,"GWS"],
    [17,"Western Bulldogs"],
    [18,"Richmond"],
    [19,"Sydney"],
    [20,"Richmond"],
    [21,"GWS"],
    [22,"Sydney"],
    [23,"Richmond"],
    [24,"Richmond"],
    [25,"Western Bulldogs"],
    [26,"West Coast"],
    [27,"Brisbane"],
    [28,"Essendon"],
    [29,"Port Adelaide"],
    [30,"Fremantle"],
    [31,"Essendon"],
    [32,"St Kilda"],
    [33,"Hawthorn"],
    [34,"Brisbane"],
    [35,"Western Bulldogs"],
    [36,"Port Adelaide"],
    [37,"GWS"],
    [38,"Carlton"],
    [39,"Gold Coast"],
    [40,"Essendon"],
    [41,"Gold Coast"],
    [42,"Brisbane"],
    [43,"Brisbane"],
    [44,"Sydney"],
    [45,"Geelong"],
    [46,"Essendon"],
    [47,"St Kilda"],
    [48,"Western Bulldogs"],
    [49,"Brisbane"],
    [50,"Port Adelaide"],
    [51,"Gold Coast"],
    [52,"Collingwood"],
    [53,"Essendon"],
    [54,"Essendon"],
    [55,"Collingwood"],
    [56,"GWS"],
    [57,"Geelong"],
    [58,"Brisbane"],
    [59,"Sydney"],
    [60,"Collingwood"],
    [61,"Gold Coast"],
    [62,"North Melbourne"],
    [63,"Carlton"],
    [64,"Adelaide"],
    [65,"Essendon"],
    [66,"Collingwood"],
    [67,"Fremantle"],
    [68,"Carlton"],
    [69,"Carlton"],
    [70,"Hawthorn"],
    [71,"Carlton"],
    [72,"West Coast"],
    [73,"GWS"],
    [74,"Geelong"],
    [75,"Hawthorn"],
    [76,"North Melbourne"],
    [77,"West Coast"],
    [78,"Adelaide"],
    [79,"Melbourne"],
    [80,"St Kilda"],
    [81,"Fremantle"],
    [82,"Collingwood"],
    [83,"Western Bulldogs"],
    [84,"Geelong"],
    [85,"Sydney"],
    [86,"North Melbourne"],
    [87,"West Coast"],
    [88,"St Kilda"],
    [89,"Fremantle"],
    [90,"Western Bulldogs"],
    [91,"Sydney"],
    [92,"West Coast"]

]


let selectedPlayers = []

let finished = 0

let currentPick = 1

const selection = document.getElementById("player-select")
const club = document.getElementById("club-select")

selection.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        Bid();
    
        
    }
    if (e.code === "ArrowDown") {
        club.select();
    }

});

club.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        Bid();
        selection.select();
    }});

function Select() {
    
    const playerPick = document.getElementById("player-select")
    let selectedPlayerPick = playerPick.value
    selectedPlayers.push(selectedPlayerPick)
    console.log(selectedPlayers)
    
    GenerateTable()
}

function refresh(){
    location.reload();
}

function pass(){
    if (finished == 1){
        return
    }
    else {
    clearTable()
    draftOrder = draftOrder.slice(0,currentPick-1).concat(draftOrder.slice(currentPick))
    
    GenerateTable()

    document.getElementById("current-pick").innerText = "Current Pick: " + currentPick
    document.getElementById("current-club").innerText = "Current Club: " + draftOrder[currentPick-1][1]
    }

}

const playersList = document.getElementById("players")

function Bid() {


    
    const clubPicker = document.getElementById("club-select")
    const pickBid = document.getElementById("pick-bid")
    const player = document.getElementById("player-select")
    let selectedPlayer = player.value
    let selectedClub = clubPicker.value
    let bid = currentPick
    let bidValue = 0

    for (let counter = 0; counter < selectedPlayers.length; counter++){
        if (selectedPlayer == selectedPlayers[counter]){
            window.alert("Player already selected")
            player.value = ""
            return
        }
    }

    for (let m = 0; m < playersList.childElementCount; m++){
        if (playersList.children[m].value == selectedPlayer){
            playersList.children[m].remove()
        }
    }

    if (currentPick < 19){
        bidValue = Math.round((draftValues[bid-1][1]) * 0.8)}
    else {
        if (bid < 56)
        {
            bidValue = Math.round((draftValues[bid-1][1]) - 197)
        }
        else {
            bidValue = 0
        }
    }
    let clubPoints = 0
    let picksToRemove = []


    if (selectedPlayer == "Levi Ashcroft") {
        selectedClub = "Brisbane"
    }
    if (selectedPlayer == "Leo Lombard") {
        selectedClub = "Gold Coast"
    }
    if (selectedPlayer == "Isaac Kako") {
        selectedClub = "Essendon"
    }
    if (selectedPlayer == "Sam Marshall") {
        selectedClub = "Brisbane"
    }
    if (selectedPlayer == "Malakai Champion") {
        selectedClub = "West Coast"
    }
    if (selectedPlayer == "Ben Camporeale") {
        selectedClub = "Carlton"
    }
    if (selectedPlayer == "Lucas Camporeale") {
        selectedClub = "Carlton"
    }
    if (selectedPlayer == "Elwood Peckett") {
        selectedClub = "St Kilda"
    }
    if (selectedPlayer == "Lennox Hofmann") {
        selectedClub = "St Kilda"
    }
    if (selectedPlayer == "Tyler Welsh") {
        selectedClub = "Adelaide"
    }
    if (selectedPlayer == "Adrian Cole") {
        selectedClub = "St Kilda"
    }
    if (selectedPlayer == "Riak Andrew") {
        selectedClub = "Melbourne"
    }
    if (selectedPlayer == "Luke Quaynor") {
        selectedClub = "Collingwood"
    }
    if (selectedPlayer == "Cody Anderson") {
        selectedClub = "Hawthorn"
    }
    if (selectedPlayer == "Logan Smith") {
        selectedClub = "GWS"
    }
    if (selectedPlayer == "Joel Cochran") {
        selectedClub = "Sydney"
    }
    if (selectedPlayer == "River Stevens") {
        selectedClub = "North Melbourne"
    }
    if (selectedPlayer == "Benny Barrett") {
        selectedClub = "Port Adelaide"
    }
    if (selectedPlayer == "Ty Gallop") {
        selectedClub = "Brisbane"
    }
    if (selectedPlayer == "Jayden Nguyen") {
        selectedClub = "Essendon"
    }
    if (selectedPlayer == "Jaren Carr") {
        selectedClub = "Fremantle"
    }
    if (selectedPlayer == "Ricky Mentha") {
        selectedClub = "Melbourne"
    }




    if (selectedClub == "NA"){
        clearTable()
    }
    else if (selectedClub == draftOrder[currentPick][1]){
        clearTable()
        bidValue = 0
    }


    
    
    else {
    for (let i = currentPick - 1; i<74; i++){
        if (draftOrder[i][1] == selectedClub) {
            
            if (clubPoints<bidValue){
                picksToRemove.push(draftOrder[i][0])
                clubPoints += draftValues[i][1]
            }
            
        }
    }

    console.log(picksToRemove)
    let pickDiff = clubPoints-bidValue

    if (bidValue == 0){
        clearTable()
        draftOrder = draftOrder.slice(0,currentPick-1).concat([[currentPick, selectedClub]]).concat(draftOrder.slice(currentPick-1))
    }


    
    if (pickDiff == 0) {
        
            //console.log("pick " + (j+1))
            
            
        

    }
    
    else {

    

    


    //document.getElementById("bid-value").innerText = bidValue
    //document.getElementById("club-value").innerText = clubPoints

    const newPick = new Array(bid, selectedClub)

    clearTable()
    draftOrder = draftOrder.slice(0,bid-1).concat([newPick]).concat(draftOrder.slice(bid-1))
    
    console.log(draftOrder[0][0])

    for (let k = 0; k<= 73; k++){
        for (let l = 0; l<picksToRemove.length; l++){
            if (picksToRemove[l] == draftOrder[k][0]){
                console.log('r')
                console.log(picksToRemove)
                draftOrder = draftOrder.slice(0,k).concat(draftOrder.slice(k+1))
            }
        }
    }
    
    for (let j = 0; j<draftValues.length; j++){
        if (pickDiff >= draftValues[j][1]){
            console.log("pick " + (j+1))
            draftOrder = draftOrder.slice(0,j).concat([[j+1, selectedClub]]).concat(draftOrder.slice(j))
            break
        }
        
    }
    }

    

    console.log(draftOrder)

    ReassignPickNums()
    console.log(selectedPlayer)}
    selectedPlayers.push(selectedPlayer)
    console.log(selectedPlayers)
    GenerateTable()
    picksToRemove = []
    clubPoints = 0

    
    currentPick += 1

    document.getElementById("current-pick").innerText = "Current Pick: " + currentPick
    document.getElementById("current-club").innerText = "Current Club: " + draftOrder[currentPick-1][1]
    player.value = ""
    clubPicker.selectedIndex = 0

    

}

function undo() {
    
    if (currentPick > 1){
    let undonePlayer = selectedPlayers.pop()
    const undonePlayerNode = document.createElement("option")
    undonePlayerNode.innerHTML = undonePlayer
    playersList.prepend(undonePlayerNode)

    clearTable()
    GenerateTable()
    currentPick -= 1
    document.getElementById("current-pick").innerText = "Current Pick: " + currentPick
    document.getElementById("current-club").innerText = "Current Club: " + draftOrder[currentPick-1][1]
    ///clubPicker.selectedIndex = 0
    

    }
}

function clearTable() {
    for (let i = 1; i<=draftOrder.length; i++){
        document.getElementById("pick-table").deleteRow(1)
    }

}

function ReassignPickNums() {
    for (let i = 0; i<draftOrder.length; i++){
        draftOrder[i][0] = i+1
    } 
}

function GenerateTable() {
    for (let i = 0; i<draftOrder.length; i++){
        let t = document.createElement("tr")
        document.getElementById("pick-table").appendChild(t)
        const pick = document.createElement("td")
        const club = document.createElement("td")
        const points = document.createElement("td")
        const player = document.createElement("td")
        pick.innerText = i+1
        club.innerText = draftOrder[i][1]
        if (i < 74){
        points.innerText = draftValues[i][1]
        }
        else {
            points.innerText = 0        
        }
        if (i < selectedPlayers.length){
        player.innerText = selectedPlayers[i]
        console.log(selectedPlayers[i])
        }


        t.appendChild(pick)
        t.appendChild(club)
        t.appendChild(points)
        t.appendChild(player)
    }

    

}

function finish() {
    finished = 1
    clearTable()
    for (let i = 0; i<currentPick-1; i++){
        let t = document.createElement("tr")
        document.getElementById("pick-table").appendChild(t)
        const pick = document.createElement("td")
        const club = document.createElement("td")
        const points = document.createElement("td")
        const player = document.createElement("td")
        pick.innerText = i+1
        club.innerText = draftOrder[i][1]
        if (i < 74){
        points.innerText = draftValues[i][1]
        }
        else {
            points.innerText = 0        
        }
        if (i < selectedPlayers.length){
        player.innerText = selectedPlayers[i]
        }


        t.appendChild(pick)
        t.appendChild(club)
        t.appendChild(points)
        t.appendChild(player)
    }

    

}

function tableToCSV() {
 
    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');

    // Call this function to download csv file 
    downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    // Download csv file
    const d = new Date();
    var file_name = "YourPhantomDraft " + String(d.getDate()) + "/" + String(d.getMonth()) + "/" + String(d.getFullYear()) + ".csv"
    temp_link.download = file_name;
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}