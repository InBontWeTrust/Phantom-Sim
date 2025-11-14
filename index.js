const draftValues = [
[1,3000],
[2,2481],
[3,2178],
[4,1962],
[5,1795],
[6,1659],
[7,1543],
[8,1443],
[9,1355],
[10,1276],
[11,1205],
[12,1140],
[13,1080],
[14,1024],
[15,973],
[16,924],
[17,879],
[18,836],
[19,796],
[20,757],
[21,721],
[22,686],
[23,653],
[24,621],
[25,590],
[26,561],
[27,533],
[28,505],
[29,479],
[30,454],
[31,429],
[32,405],
[33,382],
[34,360],
[35,338],
[36,317],
[37,297],
[38,277],
[39,257],
[40,238],
[41,220],
[42,202],
[43,184],
[44,167],
[45,150],
[46,134],
[47,118],
[48,102],
[49,86],
[50,71],
[51,57],
[52,42],
[53,28],
[54,14],
[55,0]

]

let draftOrder = [
[1,"West Coast"],
[2,"West Coast"],
[3,"Richmond"],
[4,"Richmond"],
[5,"Essendon"],
[6,"Essendon"],
[7,"Melbourne"],
[8,"Melbourne"],
[9,"Carlton"],
[10,"Hawthorn"],
[11,"Carlton"],
[12,"Greater Western Sydney"],
[13,"West Coast"],
[14,"Western Bulldogs"],
[15,"Gold Coast"],
[16,"Adelaide"],
[17,"Brisbane"],
[18,"Gold Coast"],
[19,"Geelong"],
[20,"Fremantle"],
[21,"Essendon"],
[22,"Hawthorn"],
[23,"Brisbane"],
[24,"Gold Coast"],
[25,"North Melbourne"],
[26,"North Melbourne"],
[27,"Essendon"],
[28,"Gold Coast"],
[29,"Gold Coast"],
[30,"Essendon"],
[31,"Sydney"],
[32,"Sydney"],
[33,"Western Bulldogs"],
[34,"West Coast"],
[35,"Greater Western Sydney"],
[36,"Gold Coast"],
[37,"Melbourne"],
[38,"Richmond"],
[39,"Collingwood"],
[40,"Geelong"],
[41,"West Coast"],
[42,"Sydney"],
[43,"Carlton"],
[44,"Brisbane"],
[45,"Collingwood"],
[46,"North Melbourne"],
[47,"Fremantle"],
[48,"Adelaide"],
[49,"Port Adelaide"],
[50,"St Kilda"],
[51,"Brisbane"],
[52,"Gold Coast"],
[53,"Western Bulldogs"],
[54,"Carlton"],
[55,"Adelaide"],
[56,"Collingwood"],
[57,"Brisbane"],
[58,"Collingwood"],
[59,"Hawthorn"],
[60,"Sydney"],
[61,"Adelaide"],
[62,"St Kilda"],
[63,"Melbourne"],
[64,"Fremantle"],
[65,"Melbourne"],
[66,"Hawthorn"],
[67,"Collingwood"],
[68,"Richmond"],
[69,"Port Adelaide"],
[70,"St Kilda"],
[71,"Sydney"],
[72,"Fremantle"],
[73,"Greater Western Sydney"],
[74,"Port Adelaide"]



]

let picksUsed = 
{
    "Adelaide": [0,2],
    "Brisbane": [0,4],
    "Carlton": [0,3],
    "Collingwood": [0,4],
    "Essendon": [0,5],
    "Fremantle": [0,2],
    "Geelong": [0,2],
    "Gold Coast": [0,6],
    "Greater Western Sydney": [0,2],
    "Hawthorn": [0,3],
    "Melbourne": [0,4],
    "North Melbourne": [0,3],
    "Port Adelaide": [0,1],
    "Richmond": [0,3],
    "St Kilda": [0,2],
    "Sydney": [0,4],
    "West Coast": [0,5],
    "Western Bulldogs": [0,3]
}


let selectedPlayers = []

let finished = 0

let currentPick = 1

const selection = document.getElementById("player-select")
const club = document.getElementById("club-select")

const pickToTrade = document.getElementById("trade-pick")
const clubToTrade = document.getElementById("trade-select")

function updateTradablePicks() {

    while (pickToTrade.options.length > 0) {
        pickToTrade.remove(0);
    }
    console.log(currentPick)
    for(let i = currentPick-1; i < draftOrder.length; i++) {
        let opt = draftOrder[i][0];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        pickToTrade.appendChild(el);
    }
}

function tradePick() {
    draftOrder[pickToTrade.value-1][1] = clubToTrade.value
    clearTable()
    GenerateTable()
    document.getElementById("current-club").innerText = "Current Club: " + draftOrder[currentPick-1][1]
    document.getElementById("picks-used-info").innerText = draftOrder[currentPick-1][1] + " Picks Used: " + picksUsed[draftOrder[currentPick-1][1]][0] + " Max Picks: " + picksUsed[draftOrder[currentPick-1][1]][1]

}

document.addEventListener("DOMContentLoaded", function() {
        // Your JavaScript code here
        updateTradablePicks();

    });

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
    let biddingInfo = document.getElementById("bidding-info")
    let matchingString = "Bid Points Matching - N/A "

    let fullSelectedPlayer = selectedPlayer
    selectedPlayer = selectedPlayer.replace(/\s*\(.*?\)\s*/g, "").trim();

    for (let counter = 0; counter < selectedPlayers.length; counter++){
        if (selectedPlayer == selectedPlayers[counter]){
            window.alert("Player already selected")
            player.value = ""
            return
        }
    }

    for (let m = 0; m < playersList.childElementCount; m++){
        if (playersList.children[m].value == fullSelectedPlayer){
            playersList.children[m].remove()
        }
    }

    if (currentPick < 19){
        bidValue = Math.round((draftValues[bid-1][1]) * 0.9)}
    else {
        if (bid < 37)
        {
            bidValue = Math.round((draftValues[bid-1][1]) - 84)
        }
        else {
            bidValue = 1
        }
    }
    
    let clubPoints = 0
    let picksToRemove = []

    if (selectedClub == "Yes") {
    if (selectedPlayer == "Zeke Uwland") {
        selectedClub = "Gold Coast"
    }
    else if (selectedPlayer == "Dylan Patterson") {
        selectedClub = "Gold Coast"
    }
    else if (selectedPlayer == "Adam Sweid") {
        selectedClub = "Essendon"
    }
    else if (selectedPlayer == "Daniel Annable") {
        selectedClub = "Brisbane"
    }
    else if (selectedPlayer == "Beau Addinsall") {
        selectedClub = "Gold Coast"
    }
    else if (selectedPlayer == "Harry Dean") {
        selectedClub = "Carlton"
    }
    else if (selectedPlayer == "Jack Ison") {
        selectedClub = "Carlton"
    }
    else if (selectedPlayer == "Kye Fincher") {
        selectedClub = "St Kilda"
    }
    else if (selectedPlayer == "Lachlan Carmichael") {
        selectedClub = "Sydney"
    }
    else if (selectedPlayer == "Max King") {
        selectedClub = "Sydney"
    }
    else if (selectedPlayer == "Harry Kyle") {
        selectedClub = "Sydney"
    }
    else if (selectedPlayer == "Will Darcy") {
        selectedClub = "Western Bulldogs"
    }
    else if (selectedPlayer == "Hussien El Achkar") {
        selectedClub = "Essendon"
    }
    else if (selectedPlayer == "Zac McCarthy") {
        selectedClub = "Collingwood"
    }
    else if (selectedPlayer == "Wes Walley") {
        selectedClub = "West Coast"
    }
    else if (selectedPlayer == "Tylah Williams") {
        selectedClub = "West Coast"
    }
    else if (selectedPlayer == "Charlie Banfield") {
        selectedClub = "West Coast"
    }
    else if (selectedPlayer == "Koby Evans") {
        selectedClub = "West Coast"
    }
    else if (selectedPlayer == "Jai Murray") {
        selectedClub = "Gold Coast"
    }
    else if (selectedPlayer == "Koby Coulson") {
        selectedClub = "Gold Coast"
    }
    else if (selectedPlayer == "Kalani White") {
        selectedClub = "Melbourne"
    }
    else if (selectedPlayer == "Toby Whan") {
        selectedClub = "Fremantle"
    }
    else if (selectedPlayer == "Tyan Prindable") {
        selectedClub = "Brisbane"
    }
    else if (selectedPlayer == "Isaac Waller") {
        selectedClub = "Brisbane"
    }
    else if (selectedPlayer == "Jesse Mellor") {
        selectedClub = "Geelong"
    }
    else if (selectedPlayer == "Louis Kellaway") {
        selectedClub = "Richmond"
    }
    else {
        selectedClub = "No"
    }
    }
    else {
        selectedClub = "No"
    }
    



    if (selectedClub == "No"){
        clearTable()
    }
    else if (selectedClub == draftOrder[currentPick-1][1]){
        clearTable()
        bidValue = 0
    }


    
    
    else {
    if (currentPick < 37) { 
    for (let i = currentPick - 1; i<55; i++){
        if (draftOrder[i][1] == selectedClub) {
            
            if (clubPoints<bidValue){
                picksToRemove.push(draftOrder[i][0])
                clubPoints += draftValues[i][1]
            }
            
        }
    }
    }
    else {
        for (let i = currentPick - 1; i<draftOrder.length; i++){
        if (draftOrder[i][1] == selectedClub) {
            let nextPick = 0
            if (nextPick == 0){
                picksToRemove.push(draftOrder[i][0])
                nextPick = 1
            }
            
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
    matchingString = "Bid Points Matching: " +selectedClub +  " lose: "
    for (let k = 0; k<= 55; k++){
        for (let l = 0; l<picksToRemove.length; l++){
            
            if (picksToRemove[l] == draftOrder[k][0]){
                console.log('r')
                console.log(picksToRemove[l])
                matchingString = matchingString.concat(String(picksToRemove[l])," ")
                console.log(matchingString)
                draftOrder = draftOrder.slice(0,k).concat(draftOrder.slice(k+1))
            }
        }
    }
    
    for (let j = 0; j<draftValues.length; j++){
        if (pickDiff >= draftValues[j][1]){
            console.log("pick " + (j+1))
            draftOrder = draftOrder.slice(0,j).concat([[j+1, selectedClub]]).concat(draftOrder.slice(j))
            matchingString = matchingString.concat(selectedClub, " gain: ",String(j+1))
            break
        }
        
    }
    }

    console.log(matchingString)
    if ((clubPoints-bidValue) < -1) {
        if (picksToRemove.length == 0) {
            matchingString = matchingString.concat("N/A", " Points Deficit: ", String(clubPoints-bidValue))
        }
        else {
        matchingString = matchingString.concat(" Points Deficit: ", String(clubPoints-bidValue))
        }
    }
    console.log(clubPoints-bidValue)

    //console.log(draftOrder)
    

    ReassignPickNums()
    console.log(selectedPlayer)}
    selectedPlayers.push(selectedPlayer)
    console.log(selectedPlayers)
    GenerateTable()
    picksToRemove = []
    clubPoints = 0

    console.log(draftOrder[currentPick-1][1])
    picksUsed[draftOrder[currentPick-1][1]][0] += 1

    
    currentPick += 1



    document.getElementById("current-pick").innerText = "Current Pick: " + currentPick
    document.getElementById("current-club").innerText = "Current Club: " + draftOrder[currentPick-1][1]
    document.getElementById("bidding-info").innerText = matchingString
    document.getElementById("picks-used-info").innerText = draftOrder[currentPick-1][1] + " Picks Used: " + picksUsed[draftOrder[currentPick-1][1]][0] + " Max Picks: " + picksUsed[draftOrder[currentPick-1][1]][1]
    player.value = ""
    clubPicker.selectedIndex = 0

    

    updateTradablePicks();

    

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
    picksUsed[draftOrder[currentPick-1][1]][0] -= 1
    document.getElementById("picks-used-info").innerText = draftOrder[currentPick-1][1] + " Picks Used: " + picksUsed[draftOrder[currentPick-1][1]][0] + " Max Picks: " + picksUsed[draftOrder[currentPick-1][1]][1]
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
        if (i < 55){
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
        if (i < 55){
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