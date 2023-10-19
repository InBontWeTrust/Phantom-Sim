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

let draftOrder = [[1,"West Coast"],
[2,"North Melbourne"],
[3,"North Melbourne"],
[4,"Hawthorn"],
[5,"Western Bulldogs"],
[6,"Melbourne"],
[7,"GWS"],
[8,"Geelong"],
[9,"Essendon"],
[10,"Adelaide"],
[11,"Melbourne"],
[12,"Sydney"],
[13,"St Kilda"],
[14,"Adelaide"],
[15,"North Melbourne"],
[16,"GWS"],
[17,"North Melbourne"],
[18,"North Melbourne"],
[19,"Collingwood"],
[20,"Adelaide"],
[21,"St Kilda"],
[22,"Carlton"],
[23,"West Coast"],
[24,"Gold Coast"],
[25,"Geelong"],
[26,"Gold Coast"],
[27,"Gold Coast"],
[28,"Carlton"],
[29,"Richmond"],
[30,"Brisbane"],
[31,"Essendon"],
[32,"Gold Coast"],
[33,"Collingwood"],
[34,"Fremantle"],
[35,"Essendon"],
[36,"Gold Coast"],
[37,"West Coast"],
[38,"Gold Coast"],
[39,"Brisbane"],
[40,"St Kilda"],
[41,"Richmond"],
[42,"Melbourne"],
[43,"GWS"],
[44,"Hawthorn"],
[45,"Sydney"],
[46,"Fremantle"],
[47,"Hawthorn"],
[48,"Western Bulldogs"],
[49,"Hawthorn"],
[50,"Western Bulldogs"],
[51,"Brisbane"],
[52,"Western Bulldogs"],
[53,"Western Bulldogs"],
[54,"Brisbane"],
[55,"Sydney"],
[56,"Western Bulldogs"],
[57,"North Melbourne"],
[58,"West Coast"],
[59,"GWS"],
[60,"Fremantle"],
[61,"Essendon"],
[62,"Hawthorn"],
[63,"Hawthorn"],
[64,"Fremantle"],
[65,"Richmond"],
[66,"Gold Coast"],
[67,"Brisbane"],
[68,"Richmond"],
[69,"Western Bulldogs"],
[70,"Carlton"],
[71,"Gold Coast"],
[72,"Western Bulldogs"],
[73,"Port Adelaide"],
[74,"Gold Coast"],
[75,"Western Bulldogs"],
[76,"Geelong"],
[77,"GWS"],
[78,"Carlton"],
[79,"GWS"],
[80,"Collingwood"],
[81,"West Coast"],
[82,"North Melbourne"],
[83,"Hawthorn"],
[84,"Gold Coast"],
[85,"Fremantle"],
[86,"Richmond"],
[87,"Geelong"],
[88,"Essendon"],
[89,"Adelaide"],
[90,"Western Bulldogs"],
[91,"Sydney"],
[92,"St Kilda"],
[93,"Melbourne"],
[94,"Geelong"],
[95,"GWS"],
[96,"Carlton"],
[97,"Brisbane"],
[98,"Collingwood"],
[99,"Port Adelaide"],
[100,"Port Adelaide"],


]

let selectedPlayers = []


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
    clearTable()
    draftOrder = draftOrder.slice(0,currentPick-1).concat(draftOrder.slice(currentPick))
    
    GenerateTable()

}

function Bid() {


    
    const clubPicker = document.getElementById("club-select")
    const pickBid = document.getElementById("pick-bid")
    const player = document.getElementById("player-select")
    let selectedPlayer = player.value
    let selectedClub = clubPicker.value
    let bid = currentPick
    let bidValue = 0
    if (currentPick < 19){
        bidValue = Math.round((draftValues[bid-1][1]) * 0.8)}
    else {
        if (Math.round((draftValues[bid-1][1]) - 197 > 0))
        {
            bidValue = Math.round((draftValues[bid-1][1]) - 197)
        }
        else {
            
        }
    }
    let clubPoints = 0
    let picksToRemove = []


    if (selectedPlayer == "Jed Walter") {
        selectedClub = "Gold Coast"
    }
    if (selectedPlayer == "Jake Rogers") {
        selectedClub = "Gold Coast"
    }
    if (selectedPlayer == "Ethan Read") {
        selectedClub = "Gold Coast"
    }
    if (selectedPlayer == "Jordan Croft") {
        selectedClub = "Western Bulldogs"
    }
    if (selectedPlayer == "Will Graham") {
        selectedClub = "Gold Coast"
    }
    if (selectedPlayer == "Will McCabe") {
        selectedClub = "Hawthorn"
    }
    if (selectedPlayer == "Kynan Brown") {
        selectedClub = "Melbourne"
    }
    if (selectedPlayer == "Caiden Cleary") {
        selectedClub = "Sydney"
    }
    if (selectedPlayer == "Luamon Lual") {
        if (currentPick > 40) {
        selectedClub = "Western Bulldogs"}
    }



    if (selectedClub == "NA"){
        clearTable()
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


    
    if (pickDiff == 0) {
        console.log("nothing")
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
    selectedPlayers.pop()
    clearTable()
    GenerateTable()
    currentPick -= 1
    document.getElementById("current-pick").innerText = "Current Pick: " + currentPick
    document.getElementById("current-club").innerText = "Current Club: " + draftOrder[currentPick-1][1]
    player.value = ""
    clubPicker.selectedIndex = 0

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
        console.log(selectedPlayers[i])
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
    temp_link.download = "YourPhantomDraft.csv";
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