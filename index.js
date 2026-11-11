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
[1,"Essendon"],
[2,"Richmond"],
[3,"West Coast"],
[4,"Melbourne"],
[5,"Richmond"],
[6,"Sydney"],
[7,"Port Adelaide"],
[8,"Gold Coast"],
[9,"Greater Western Sydney"],
[10,"St Kilda"],
[11,"Collingwood"],
[12,"Port Adelaide"],
[13,"Carlton"],
[14,"Melbourne"],
[15,"Adelaide"],
[16,"St Kilda"],
[17,"Essendon"],
[18,"Carlton"],
[19,"Fremantle"],
[20,"Greater Western Sydney"],
[21,"Brisbane"],
[22,"Port Adelaide"],
[23,"West Coast"],
[24,"Port Adelaide"],
[25,"Essendon"],
[26,"Greater Western Sydney"],
[27,"Brisbane"],
[28,"Brisbane"],
[29,"Hawthorn"],
[30,"Collingwood"],
[31,"Carlton"],
[32,"Adelaide"],
[33,"North Melbourne"],
[34,"Port Adelaide"],
[35,"Adelaide"],
[36,"Geelong"],
[37,"Hawthorn"],
[38,"Sydney"],
[39,"Sydney"],
[40,"Fremantle"],
[41,"St Kilda"],
[42,"Western Bulldogs"],
[43,"Adelaide"],
[44,"Richmond"],
[45,"Brisbane"],
[46,"Port Adelaide"],
[47,"Sydney"],
[48,"Melbourne"],
[49,"North Melbourne"],
[50,"Carlton"],
[51,"Melbourne"],
[52,"Western Bulldogs"],
[53,"Western Bulldogs"],
[54,"Adelaide"],
[55,"Geelong"],
[56,"West Coast"],
[57,"Greater Western Sydney"],
[58,"Fremantle"],
[59,"Carlton"],
[60,"Geelong"],
[61,"Fremantle"],
[62,"North Melbourne"],
[63,"Collingwood"],
[64,"Collingwood"],
[65,"Collingwood"],
[66,"Hawthorn"],
[67,"Carlton"],
[68,"Fremantle"],
[69,"Essendon"],
[70,"Gold Coast"],
[71,"Western Bulldogs"],
[72,"Gold Coast"],
[73,"Carlton"],
[74,"Hawthorn"],
[75,"Essendon"],
[76,"Richmond"],
[77,"Gold Coast"],
[78,"Essendon"],
[79,"Melbourne"],
[80,"Essendon"]



]

let picksUsed = 
{
    "Adelaide": [0,3],
    "Brisbane": [0,4],
    "Carlton": [0,4],
    "Collingwood": [0,4],
    "Essendon": [0,5],
    "Fremantle": [0,3],
    "Geelong": [0,3],
    "Gold Coast": [0,1],
    "Greater Western Sydney": [0,3],
    "Hawthorn": [0,3],
    "Melbourne": [0,4],
    "North Melbourne": [0,3],
    "Port Adelaide": [0,6],
    "Richmond": [0,4],
    "St Kilda": [0,3],
    "Sydney": [0,4],
    "West Coast": [0,4],
    "Western Bulldogs": [0,4]
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
    console.log("I can trade"+ currentPick + pickToTrade.options.length)
    for(let i = currentPick-1; i < draftOrder.length; i++) {
        let opt = i+1;
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
        Bid(null);
    
        
    }
    if (e.code === "ArrowDown") {
        club.select();
    }

});

club.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        Bid(null);
        selection.select();
    }});

function Select() {
    
    const playerPick = document.getElementById("player-select")
    let selectedPlayerPick = playerPick.value
    selectedPlayers.push(selectedPlayerPick)
    console.log(selectedPlayers)
    
    //GenerateTable()
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
    document.getElementById("picks-used-info").innerText = draftOrder[currentPick-1][1] + " Picks Used: " + picksUsed[draftOrder[currentPick-1][1]][0] + " Maximum Picks: " + picksUsed[draftOrder[currentPick-1][1]][1]
    }

}

const playersList = document.getElementById("players")
let endfirst = 20
let r2p1 = 21
let r2p2 = 22
let r2p3 = 23

function Bid(auto) {


    
    const clubPicker = document.getElementById("club-select")
    const pickBid = document.getElementById("pick-bid")
    const player = document.getElementById("player-select")
    let selectedPlayer = player.value
    let selectedClub = clubPicker.value
    let bid = currentPick
    let bidValue = 0
    let biddingInfo = document.getElementById("bidding-info")
    let matchingString = "Bid Points Matching: N/A "
    let pickDiff = 0

    if (auto == null) {}
    else {
        selectedPlayer = auto
        if (picksUsed[draftOrder[currentPick-1][1]][0] >= picksUsed[draftOrder[currentPick-1][1]][1]) {
            pass()
            updateTradablePicks();
            return
        }

         
    }
    

    let fullSelectedPlayer = selectedPlayer
    selectedPlayer = selectedPlayer.replace(/\s*\(.*?\)\s*/g, "").trim();

    for (let counter = 0; counter < selectedPlayers.length; counter++){
        if (selectedPlayer == selectedPlayers[counter]){
            window.alert("Player already selected")
            player.value = ""
            return
        }
    }

    let nodiscount = ["Adelaide", "Carlton", "Collingwood", "Geelong", "Melbourne", "Western Bulldogs"]
    let tenloading = ["Hawthorn", "Sydney"]
    let twentyloading = ["Brisbane", "Fremantle"]

    
    
    let clubPoints = 0
    let picksToRemove = []

    if (selectedClub == "Yes") {
    if (selectedPlayer == "Archie Hill") {
        selectedClub = "Gold Coast"
    }
    else if (selectedPlayer == "Blake Justice") {
        selectedClub = "Essendon"
    }
    else if (selectedPlayer == "Caylen Murray") {
        selectedClub = "Brisbane"
    }

    else if (selectedPlayer == "Cody Walker") {
        selectedClub = "Carlton"
    }
    else if (selectedPlayer == "Khaled El Souki") {
        selectedClub = "Western Bulldogs"
    }
    else if (selectedPlayer == "Douglas Cochrane") {
        selectedClub = "Port Adelaide"
    }
    else if (selectedPlayer == "Mason McGroder") {
        selectedClub = "Sydney"
    }
    else if (selectedPlayer == "Jake Medved") {
        selectedClub = "Sydney"
    }
    else if (selectedPlayer == "Henry Meaney") {
        selectedClub = "Sydney"
    }

    else if (selectedPlayer == "Finlay Yeo") {
        selectedClub = "Fremantle"
    }
    else if (selectedPlayer == "Lucas Robinson") {
        selectedClub = "Fremantle"
    }
    else if (selectedPlayer == "Anthony Long") {
        selectedClub = "Adelaide"
    }
    else if (selectedPlayer == "Garrison Kehn") {
        selectedClub = "West Coast"
    }
    else if (selectedPlayer == "Harper Banfield") {
        selectedClub = "West Coast"
    }
    else if (selectedPlayer == "Tanner Armstrong") {
        selectedClub = "Richmond"
    }
    else if (selectedPlayer == "Cooper Hodge") {
        selectedClub = "Hawthorn"
    }
    else if (selectedPlayer == "Keenan Boi") {
        selectedClub = "Hawthorn"
    }
    else if (selectedPlayer == "Aidan McCartney") {
        selectedClub = "North Melbourne"
    }
    else if (selectedPlayer == "Ethan Matthews") {
        selectedClub = "Greater Western Sydney"
    }
    else {
        selectedClub = "No"
    }
    }
    else {
        selectedClub = "No"
    }
    

    if (currentPick < 37){
        if (nodiscount.includes(selectedClub)){
        bidValue = Math.round((draftValues[bid-1][1]))}
        else if (tenloading.includes(selectedClub)){
            bidValue = Math.round((draftValues[bid-1][1]) * 1.1)
        }
        else if (twentyloading.includes(selectedClub)){
            bidValue = Math.round((draftValues[bid-1][1]) * 1.2)
        }
        else {
            bidValue = Math.round((draftValues[bid-1][1]) * 0.9)
        }
    }
    else {

        bidValue = 1
        
    }

    if (selectedClub == "No"){
        clearTable()
    }
    else if (selectedClub == draftOrder[currentPick-1][1]){
        clearTable()
        bidValue = 0
    }


    
    
    else {
        maxtwopickscount = 0
    if (currentPick < 37) { 
    for (let i = currentPick - 1; i<55; i++){
        if (draftOrder[i][1] == selectedClub) {
            if (maxtwopickscount == 2){
                break
            }
            if (clubPoints<bidValue){
                picksToRemove.push(draftOrder[i][0])
                clubPoints += draftValues[i][1]
                maxtwopickscount += 1
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
    pickDiff = clubPoints-bidValue

    if (pickDiff < -412) {
        alert("Cannot match bid for " + selectedPlayer + ", deficit is " + String(pickDiff))
        player.value = ""
    }
    else {

        if (currentPick <= endfirst) {
        endfirst += 1
        console.log("added bid to first")
        }
        if (currentPick <= r2p1) {
        r2p1 += 1
        console.log("added bid to first")
        }
        if (currentPick <= r2p2) {
        r2p2 += 1
        console.log("added bid to first")
        }
        if (currentPick <= r2p3) {
        r2p3 += 1
        console.log("added bid to first")
        }
    

    if (bidValue == 0){
        clearTable()
        draftOrder = draftOrder.slice(0,currentPick-1).concat([[currentPick, selectedClub]]).concat(draftOrder.slice(currentPick-1))
    }


    
    if (pickDiff == 0 && selectedClub == draftOrder[currentPick-1][1]) {
        
            //console.log("pick " + (j+1))
            clearTable()
            
        

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
                if (picksToRemove[l]+1 <= endfirst) {
                    endfirst -= 1
                    console.log("removed from first")
                }
                if (picksToRemove[l]+1 <= r2p1) {
                    r2p1 -= 1
                    console.log("removed from first")
                }
                if (picksToRemove[l]+1 <= r2p2) {
                    r2p2 -= 1
                    console.log("removed from first")
                }
                if (picksToRemove[l]+1 <= r2p3) {
                    r2p3 -= 1
                    console.log("removed from first")
                }
               
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
            if (j+1 <= endfirst) {
                endfirst += 1
                console.log("added new first")
            }
            if (j+1 <= r2p1) {
                r2p1 += 1
                console.log("added new first")
            }
            if (j+1 <= r2p2) {
                r2p2 += 1
                console.log("added new first")
            }
            if (j+1 <= r2p3) {
                r2p3 += 1
                console.log("added new first")
            }
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
    console.log(selectedPlayer)}}

    if (pickDiff > -412) {
    selectedPlayers.push(selectedPlayer)
    console.log("pushed")
    console.log(selectedPlayers)
    GenerateTable()
    picksToRemove = []
    clubPoints = 0

    console.log(draftOrder[currentPick-1][1])
    picksUsed[draftOrder[currentPick-1][1]][0] += 1

    
    currentPick += 1

    if (currentPick == endfirst + 1) {
        clearTable()
        draftOrder = draftOrder.slice(0,r2p1).concat([[currentPick, "Essendon"]]).concat(draftOrder.slice(r2p1))
        console.log(draftOrder)
        r2p2 += 1
        r2p3 += 1

        draftOrder = draftOrder.slice(0,r2p2).concat([[currentPick+2, "Richmond"]]).concat(draftOrder.slice(r2p2))
        console.log(draftOrder)
        r2p3 += 1

        draftOrder = draftOrder.slice(0,r2p3).concat([[currentPick+4, "West Coast"]]).concat(draftOrder.slice(r2p3))
        console.log(draftOrder)
        ReassignPickNums()
        GenerateTable()

    }

    document.getElementById("current-pick").innerText = "Current Pick: " + currentPick
    document.getElementById("current-club").innerText = "Current Club: " + draftOrder[currentPick-1][1]
    document.getElementById("bidding-info").innerText = matchingString
    document.getElementById("picks-used-info").innerText = draftOrder[currentPick-1][1] + " Picks Used: " + picksUsed[draftOrder[currentPick-1][1]][0] + " Maximum Picks: " + picksUsed[draftOrder[currentPick-1][1]][1]
    player.value = ""
    clubPicker.selectedIndex = 0

    

    updateTradablePicks();

    for (let m = 0; m < playersList.childElementCount; m++){
        if (playersList.children[m].value == fullSelectedPlayer){
            playersList.children[m].remove()
        }
    }

    }
    else {
        clearTable()
        GenerateTable()
    }

    console.log(endfirst)

    

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
    document.getElementById("picks-used-info").innerText = draftOrder[currentPick-1][1] + " Picks Used: " + picksUsed[draftOrder[currentPick-1][1]][0] + " Maximum Picks: " + picksUsed[draftOrder[currentPick-1][1]][1]
    ///clubPicker.selectedIndex = 0
    

    }
}
/*
function importTrades() {
    if (currentPick == 1) {
        draftOrder = [
            [1,"West Coast"],
            [2,"West Coast"],
            [3,"Richmond"],
            [4,"Richmond"],
            [5,"Essendon"],
            [6,"Essendon"],
            [7,"Melbourne"],
            [8,"Melbourne"],
            [9,"Essendon"],
            [10,"Hawthorn"],
            [11,"North Melbourne"],
            [12,"Greater Western Sydney"],
            [13,"West Coast"],
            [14,"Gold Coast"],
            [15,"Western Bulldogs"],
            [16,"Adelaide"],
            [17,"Brisbane"],
            [18,"Gold Coast"],
            [19,"Geelong"],
            [20,"Fremantle"],
            [21,"Carlton"],
            [22,"Hawthorn"],
            [23,"Brisbane"],
            [24,"Gold Coast"],
            [25,"Carlton"],
            [26,"North Melbourne"],
            [27,"Carlton"],
            [28,"Gold Coast"],
            [29,"Western Bulldogs"],
            [30,"Carlton"],
            [31,"Sydney"],
            [32,"Sydney"],
            [33,"Gold Coast"],
            [34,"West Coast"],
            [35,"Gold Coast"],
            [36,"Gold Coast"],
            [37,"Melbourne"],
            [38,"Richmond"],
            [39,"Collingwood"],
            [40,"Geelong"],
            [41,"West Coast"],
            [42,"Sydney"],
            [43,"Essendon"],
            [44,"Brisbane"],
            [45,"Collingwood"],
            [46,"Carlton"],
            [47,"Fremantle"],
            [48,"Gold Coast"],
            [49,"Gold Coast"],
            [50,"St Kilda"],
            [51,"Brisbane"],
            [52,"Gold Coast"],
            [53,"Gold Coast"],
            [54,"North Melbourne"],
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
            [74,"Port Adelaide"]]
        clearTable()
        GenerateTable()
    }
    else {
        window.alert("Cannot import trades after draft has started.")
    }
}
*/
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

function auto() {
    selectedIndex = Math.floor((((Math.random()**1.8) * (currentPick)**.8)+0.001));
    console.log(playersList.options[selectedIndex].value)
    Bid(playersList.options[selectedIndex].value)

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
        if (club.innerText == "Essendon") {
            club.classList.add("Essendon")
        }
        if (club.innerText == "Adelaide") {
            club.classList.add("Adelaide")
        }
        if (club.innerText == "Brisbane") {
            club.classList.add("Brisbane")
        }
        if (club.innerText == "Carlton") {
            club.classList.add("Carlton")
        }
        if (club.innerText == "Collingwood") {
            club.classList.add("Collingwood")
        }
        if (club.innerText == "Fremantle") {
            club.classList.add("Fremantle")
        }
        if (club.innerText == "Geelong") {
            club.classList.add("Geelong")
        }
        if (club.innerText == "Gold Coast") {
            club.classList.add("GoldCoast")
        }
        if (club.innerText == "Greater Western Sydney") {
            club.classList.add("GWS")
        }
        if (club.innerText == "Hawthorn") {
            club.classList.add("Hawthorn")
        }
        if (club.innerText == "Melbourne") {
            club.classList.add("Melbourne")
        }
        if (club.innerText == "North Melbourne") {
            club.classList.add("NorthMelbourne")
        }
        if (club.innerText == "Port Adelaide") {
            club.classList.add("PortAdelaide")
        }
        if (club.innerText == "Richmond") {
            club.classList.add("Richmond")
        }
        if (club.innerText == "St Kilda") {
            club.classList.add("StKilda")
        }
        if (club.innerText == "Sydney") {
            club.classList.add("Sydney")
        }
        if (club.innerText == "West Coast") {
            club.classList.add("WestCoast")
        }
        if (club.innerText == "Western Bulldogs") {
            club.classList.add("WesternBulldogs")
        }

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
        if (club.innerText == "Essendon") {
            club.classList.add("Essendon")
        }
        if (club.innerText == "Adelaide") {
            club.classList.add("Adelaide")
        }
        if (club.innerText == "Brisbane") {
            club.classList.add("Brisbane")
        }
        if (club.innerText == "Carlton") {
            club.classList.add("Carlton")
        }
        if (club.innerText == "Collingwood") {
            club.classList.add("Collingwood")
        }
        if (club.innerText == "Fremantle") {
            club.classList.add("Fremantle")
        }
        if (club.innerText == "Geelong") {
            club.classList.add("Geelong")
        }
        if (club.innerText == "Gold Coast") {
            club.classList.add("GoldCoast")
        }
        if (club.innerText == "Greater Western Sydney") {
            club.classList.add("GWS")
        }
        if (club.innerText == "Hawthorn") {
            club.classList.add("Hawthorn")
        }
        if (club.innerText == "Melbourne") {
            club.classList.add("Melbourne")
        }
        if (club.innerText == "North Melbourne") {
            club.classList.add("NorthMelbourne")
        }
        if (club.innerText == "Port Adelaide") {
            club.classList.add("PortAdelaide")
        }
        if (club.innerText == "Richmond") {
            club.classList.add("Richmond")
        }
        if (club.innerText == "St Kilda") {
            club.classList.add("StKilda")
        }
        if (club.innerText == "Sydney") {
            club.classList.add("Sydney")
        }
        if (club.innerText == "West Coast") {
            club.classList.add("WestCoast")
        }
        if (club.innerText == "Western Bulldogs") {
            club.classList.add("WesternBulldogs")
        }
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