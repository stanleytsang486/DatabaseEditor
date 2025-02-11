let seasonTable;
let teamsTable;
let races_ids = []
let seasonResults;
let calendarData;
let pointsOrPos = "points"
let alphaReplace = "alphatauri"
let alpineReplace = "alpine"
let alfaReplace = "alfa"
let driverOrTeams = "drivers"
let isYearSelected = false
let engine_allocations;
let engine_names = { //this one is changed as the user adds engines, so it will stayhere
    1: "Ferrari",
    4: "Rbpt",
    7: "Mercedes",
    10: "Renault"
}


function resetViewer() {
    if (seasonTable) {
        seasonTable.destroy()
    }
    pointsOrPos = "points"
    if (teamsTable) {
        teamsTable.destroy()
    }
}

function resetYearButtons() {
    document.getElementById("yearButton").textContent = "Year"
    isYearSelected = false
    manage_show_tables()
    document.getElementById("yearButtonH2H").textContent = "Year"
    document.getElementById("yearPredictionButton").textContent = "Year"
    document.getElementById("yearPredictionModalButton").textContent = "Year"
}



/**
 * Pills for the drivers and teams tables
 */
document.getElementById("driverspill").addEventListener("click", function () {
    driverOrTeams = "drivers"
    manage_show_tables()
    add_marquees_viewer()
})

document.getElementById("teamspill").addEventListener("click", function () {
    driverOrTeams = "teams"
    manage_show_tables()
})


function manage_show_tables() {
    if (isYearSelected) {
        if (driverOrTeams === "drivers") {
            document.querySelector(".teams-table").classList.add("d-none")
            document.querySelector(".drivers-table").classList.remove("d-none")
        }
        else {
            document.querySelector(".teams-table").classList.remove("d-none")
            document.querySelector(".drivers-table").classList.add("d-none")
        }
    }
    else {
        document.querySelector(".teams-table").classList.add("d-none")
        document.querySelector(".drivers-table").classList.add("d-none")
    }
}

document.querySelectorAll("#tableTypeDropdown a").forEach(function (elem) {
    elem.addEventListener("click", function () {
        pointsOrPos = elem.dataset.value
        change_points_pos_drivers()
        change_points_pos_teams()
        document.querySelector("#tableTypeButton").textContent = elem.textContent
    })
})


function change_points_pos_drivers() {
    let datazone = document.querySelector(".drivers-table-data")
    let rows = datazone.querySelectorAll(".drivers-table-row")
    rows.forEach(function (row, index) {
        let cells = row.querySelectorAll(".drivers-table-normal")
        cells.forEach(function (cell) {
            let newCell = manageText(cell)
            cell.innerText = newCell.innerText
        })
    })
}

function change_points_pos_teams() {
    let datazone = document.querySelector(".teams-table-data")
    let rows = datazone.querySelectorAll(".teams-table-row")
    rows.forEach(function (row, index) {
        let cells = row.querySelectorAll(".teams-table-normal")
        cells.forEach(function (cell) {
            let newCell = manageTeamsText(cell)
            cell.innerHTML = newCell.innerHTML
        })
    })

}

function new_drivers_table(data) {
    calendarData = data
    races_ids = []
    let header = document.querySelector(".drivers-table-header")
    header.innerHTML = ""
    let driverDiv = document.createElement("div")
    driverDiv.classList = "drivers-table-driver bold-font"
    driverDiv.innerText = "DRIVER"
    let PositionDiv = document.createElement("div")
    PositionDiv.classList = "drivers-table-position bold-font"
    PositionDiv.innerText = "#"
    header.appendChild(PositionDiv)
    header.appendChild(driverDiv)
    data.forEach(function (elem) {
        races_ids.push(elem[0])
        let headerPos = document.createElement("div")
        headerPos.className = "drivers-table-normal bold-font flag-header"
        let headerPosFlag = document.createElement("img")
        race = races_map[elem[1]]
        flag_src = codes_dict[race]
        headerPosFlag.src = flag_src
        let headerPosDiv = document.createElement("div")
        headerPosDiv.classList.add("text-in-front")
        headerPosDiv.classList.add("bold-font")
        headerPosDiv.innerText = races_names[elem[1]]
        headerPos.appendChild(headerPosFlag)
        headerPos.appendChild(headerPosDiv)
        header.appendChild(headerPos)
    })
    let PointsDiv = document.createElement("div")
    PointsDiv.classList = "drivers-table-points bold-font"
    PointsDiv.innerText = "PTS"
    header.appendChild(PointsDiv)

}

function new_teams_table(data) {
    calendarData = data
    races_ids = []
    let header = document.querySelector(".teams-table-header")
    header.innerHTML = ""
    let driverDiv = document.createElement("div")
    driverDiv.classList = "teams-table-team bold-font"
    driverDiv.innerText = "TEAM"
    let PositionDiv = document.createElement("div")
    PositionDiv.classList = "teams-table-position bold-font"
    PositionDiv.innerText = "#"
    header.appendChild(PositionDiv)
    header.appendChild(driverDiv)
    data.forEach(function (elem) {
        races_ids.push(elem[0])
        let headerPos = document.createElement("div")
        headerPos.className = "teams-table-normal bold-font flag-header"
        let headerPosFlag = document.createElement("img")
        race = races_map[elem[1]]
        flag_src = codes_dict[race]
        headerPosFlag.src = flag_src
        let headerPosDiv = document.createElement("div")
        headerPosDiv.classList.add("text-in-front")
        headerPosDiv.classList.add("bold-font")
        headerPosDiv.innerText = races_names[elem[1]]
        headerPos.appendChild(headerPosFlag)
        headerPos.appendChild(headerPosDiv)
        header.appendChild(headerPos)
    })
    let PointsDiv = document.createElement("div")
    PointsDiv.classList = "teams-table-points bold-font"
    PointsDiv.innerText = "PTS"
    header.appendChild(PointsDiv)
}

function checkscroll() {
    let datazone = document.querySelector(".drivers-table-data")
    let pointscol = document.querySelector(".drivers-table-header").querySelector(".drivers-table-points")
    if (datazone.scrollHeight > datazone.clientHeight) {
        pointscol.style.width = "84px"
    }
    else {
        pointscol.style.width = "80px"
    }
}

function new_color_drivers_table() {
    let datazone = document.querySelector(".drivers-table-data")
    let rows = datazone.querySelectorAll(".drivers-table-row")
    rows.forEach(function (row, index) {
        let cells = row.querySelectorAll(".drivers-table-normal")
        cells.forEach(function (cell) {
            if (cell.dataset.pos === "1") {
                cell.classList.add("first")
            }
            else if (cell.dataset.pos === "2") {
                cell.classList.add("second")
            }
            else if (cell.dataset.pos === "3") {
                cell.classList.add("third")
            }
            if (cell.dataset.fastlap === "1") {
                cell.classList.add("fastest")
            }
            if (cell.dataset.qualy === "1") {
                cell.style.fontFamily = "Formula1Bold"
            }
        })
    })
}

function manage_teams_table_logos() {
    let logos = document.querySelectorAll(".teams-table-logo-inner")
    logos.forEach(function (logo) {
        if (logo.dataset.teamid === "1") {
            logo.className = "teams-table-logo-inner ferrari-team-table-logo"
        }
        else if (logo.dataset.teamid === "2") {
            // logo.className = "teams-table-logo-inner mclaren-team-table-logo"
            logo.src = "../assets/images/mclaren2.png"
        }
        else if (logo.dataset.teamid === "3") {
            logo.className = "teams-table-logo-inner redbull-team-table-logo"
        }
        else if (logo.dataset.teamid === "4") {
            logo.className = "teams-table-logo-inner merc-team-table-logo"
        }
        else if (logo.dataset.teamid === "5") {
            if (alpineReplace === "alpine") {
                logo.className = "teams-table-logo-inner alpine-team-table-logo"
            }
            else if (alpineReplace === "andretti") {
                logo.className = "teams-table-logo-inner ferrari-team-table-logo"
                logo.src = "../assets/images/andretti2.png"
            }
            else if (alpineReplace === "renault") {
                logo.className = "teams-table-logo-inner ferrari-team-table-logo"
                logo.src = "../assets/images/renault2.png"
            }
            else if (alpineReplace === "lotus") {
                logo.src = "../assets/images/lotus2.png"
            }
        }
        else if (logo.dataset.teamid === "6") {
            logo.className = "teams-table-logo-inner williams-team-table-logo"
            logo.src = "../assets/images/williams2.png"
        }
        else if (logo.dataset.teamid === "7") {
            logo.className = "teams-table-logo-inner haas-team-table-logo"
        }
        else if (logo.dataset.teamid === "8") {
            if (alphaReplace === "alphatauri") {
                logo.className = "teams-table-logo-inner alphatauri-team-table-logo"
            }
            else if (alphaReplace === "visarb") {
                logo.className = "teams-table-logo-inner merc-team-table-logo"
            }
            else if (alphaReplace === "hugo") {
                logo.className = "teams-table-logo-inner hugo-team-table-logo"
            }
            else if (alphaReplace === "toyota") {
                logo.className = "teams-table-logo-inner toyota-team-table-logo"
                logo.src = "../assets/images/toyota2.png"
            }
            else if (alphaReplace === "porsche") {
                logo.className = "teams-table-logo-inner porsche-team-table-logo"
            }
            else if (alphaReplace === "brawn") {
                logo.className = "teams-table-logo-inner brawn-team-table-logo"
                logo.src = "../assets/images/brawn2.png"
            }
        }
        else if (logo.dataset.teamid === "9") {
            if (alfaReplace === "alfa") {
                logo.className = "teams-table-logo-inner merc-team-table-logo"
            }
            else if (alfaReplace === "audi") {
                logo.className = "teams-table-logo-inner audi-team-table-logo"
            }
            else if (alfaReplace === "stake") {
                logo.className = "teams-table-logo-inner stake-team-table-logo"
            }
            else if (alfaReplace === "sauber") {
                logo.className = "teams-table-logo-inner ferrari-team-table-logo"
                logo.src = "../assets/images/sauber2.png"
            }
        }
        else if (logo.dataset.teamid === "10") {
            logo.className = "teams-table-logo-inner aston-team-table-logo"
        }
        else if (logo.dataset.teamid === "32") {
            logo.className = "teams-table-logo-inner custom-team-table-logo"
        }
    })
}

function manage_teams_table_names() {
    let names = document.querySelectorAll(".teams-table-team")
    names.forEach(function (name) {
        if (name.dataset.teamid === "5") {
            if (alpineReplace === "alpine") {
                name.firstChild.innerText = "ALPINE"
            }
            else if (alpineReplace === "andretti") {
                name.firstChild.innerText = "ANDRETTI"
            }
            else if (alpineReplace === "renault") {
                name.firstChild.innerText = "RENAULT"
            }
            else if (alpineReplace === "lotus") {
                name.firstChild.innerText = "LOTUS"
            }
        }
        else if (name.dataset.teamid === "8") {
            if (alphaReplace === "alphatauri") {
                name.firstChild.innerText = "ALPHA TAURI"
            }
            else if (alphaReplace === "visarb") {
                name.firstChild.innerText = "VISA CASHAPP RB"
            }
            else if (alphaReplace === "hugo") {
                name.firstChild.innerText = "HUGO"
            }
            else if (alphaReplace === "toyota") {
                name.firstChild.innerText = "TOYOTA"
            }
            else if (alphaReplace === "porsche") {
                name.firstChild.innerText = "PORSCHE"
            }
            else if (alphaReplace === "brawn") {
                name.firstChild.innerText = "BRAWN GP"
            }
        }
        else if (name.dataset.teamid === "9") {
            if (alfaReplace === "alfa") {
                name.firstChild.innerText = "ALFA ROMEO"
            }
            else if (alfaReplace === "audi") {
                name.firstChild.innerText = "AUDI"
            }
            else if (alfaReplace === "stake") {
                name.firstChild.innerText = "STAKE SAUBER"
            }
            else if (alfaReplace === "sauber") {
                name.firstChild.innerText = "SAUBER"
            }
        }
    })
}

function new_color_teams_table() {
    let datazone = document.querySelector(".teams-table-data")
    calendarData.forEach(function (race) {
        let id = race[0]
        let colCells = datazone.querySelectorAll(".teams-table-normal[data-raceid='" + id + "']");
        if (colCells.length > 0) {
            let values = [];
            colCells.forEach(function (cell, index) {
                let value = cell.dataset.points;
                values.push([value, index]);
                if (cell.dataset.quali1 === "1" || cell.dataset.quali2 === "1") {
                    cell.style.fontFamily = "Formula1Bold"
                }
                if (cell.dataset.fastlap1 === "1" || cell.dataset.fastlap2 === "1") {
                    cell.classList.add("fastest")
                }
            });
            values.sort((a, b) => b[0] - a[0]);
            let topThree = values.slice(0, 3);
            colCells[topThree[0][1]].classList.add("first");
            colCells[topThree[1][1]].classList.add("second");
            colCells[topThree[2][1]].classList.add("third");


        }
    })
}

function order_teams_table() {
    let datazone = document.querySelector(".teams-table-data")
    let rows = datazone.querySelectorAll(".teams-table-row")
    let ordered = Array.from(rows).sort((a, b) => parseInt(a.querySelector(".teams-table-position").innerText) - parseInt(b.querySelector(".teams-table-position").innerText))
    datazone.innerHTML = ""
    ordered.forEach(function (row, index) {
        let odd = index % 2 === 0
        if (odd) {
            row.classList.add("odd")
        }
        datazone.appendChild(row)
    })

}

function new_load_drivers_table(data) {
    seasonResults = data
    let datazone = document.querySelector(".drivers-table-data")
    datazone.innerHTML = ""
    data = data.slice(0, -1)
    data = new_order_drivers(data)
    data.forEach(function (driver, index) {
        let odd = index % 2 === 0
        let races_done = driver.slice(3).map(x => x[0])
        new_addDriver(driver, races_done, odd)
    })
    hoverListeners()
    checkscroll()
    new_color_drivers_table()
    add_marquees_viewer()
}

function new_order_drivers(array) {
    return array.sort((a, b) => a[2] - b[2]);
}

function update_logo(team, logo, newTeam) {
    if (team === "alpine") {
        alpineReplace = newTeam
        logos_disc[5] = logo
    }
    else if (team === "williams") {
        logos_disc[6] = logo
    }
    else if (team === "haas") {
        logos_disc[7] = logo
    }
    else if (team === "alphatauri") {
        alphaReplace = newTeam
        logos_disc[8] = logo
    }
    else if (team === "alfa") {
        alfaReplace = newTeam
        logos_disc[9] = logo
    }
}

function reloadTables() {
    let datazone = document.querySelector(".drivers-table-data")
    //if not empty
    if (datazone.innerHTML !== "") {
        new_drivers_table(calendarData)
        new_load_drivers_table(seasonResults)
        new_teams_table(calendarData)
        new_load_teams_table(seasonResults)
    }
}

function new_load_teams_table(data) {
    let pairTeamPos = data[data.length - 1]
    //create dict with dirst element of pair as key and second as value
    let pairTeamPosDict = {}
    pairTeamPos.forEach(function (pair) {
        pairTeamPosDict[pair[0]] = pair[1]
    })
    data = data.slice(0, -1)
    let datazone = document.querySelector(".teams-table-data")
    datazone.innerHTML = ""
    let teamData = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] }
    if (game_version === 2024 && custom_team) {
        teamData[32] = []
    }
    data.forEach(function (driver) {
        let races = driver.slice(3)
        races.forEach(function (race) {
            let team = race[race.length - 1]
            teamData[team].push(race)
        })
    })
    for (let team in teamData) {
        //order the rray by the firit element of each elmeent
        teamData[team].sort((a, b) => a[0] - b[0])
        let seasonLong = races_ids.length * 2
        let racesDone = teamData.length
        //push [] until the length is the same as the
        while (teamData[team].length < seasonLong) {
            teamData[team].push([])
        }
    }
    for (let team in combined_dict) {
        if (f1_teams.includes(parseInt(team))) {
            let pos = pairTeamPosDict[team]
            new_addTeam(teamData[team], combined_dict[team], pos, team)
        }
    }
    new_color_teams_table()
    order_teams_table()
    manage_teams_table_logos()
    manage_teams_table_names()
}

function new_addTeam(teamData, name, pos, id) {
    let data = document.querySelector(".teams-table-data")
    let row = document.createElement("div")
    row.classList = "teams-table-row"
    let nameDiv = document.createElement("div");
    let teamName = document.createElement("span")
    let engineName = document.createElement("span")
    engineName.classList = "teams-table-engine-name bold-font"
    engineName.textContent = engine_names[engine_allocations[id]]
    nameDiv.dataset.teamid = id
    nameDiv.classList = "teams-table-team bold-font"
    teamName.innerText = name.toUpperCase()
    nameDiv.appendChild(teamName)
    nameDiv.appendChild(engineName)
    row.appendChild(nameDiv)
    let posDiv = document.createElement("div")
    posDiv.classList = "teams-table-position bold-font"
    posDiv.innerText = pos
    row.appendChild(posDiv)
    let logoDiv = document.createElement("div")
    logoDiv.classList = "teams-table-logo"
    let logo = document.createElement("img")
    logo.classList = "teams-table-logo-inner"
    logo.dataset.teamid = id
    logoDiv.classList.add(team_dict[id] + "iconback")
    logo.setAttribute("src", logos_disc[id])
    logoDiv.appendChild(logo)
    row.appendChild(logoDiv)
    row.appendChild(nameDiv)
    let driverCounted = 0
    let teampoints = 0
    //only take pair indexes
    if (teamData !== undefined) {
        teamData.forEach(function (race, index) {
            if (index % 2 === 0) {
                let raceDiv = document.createElement("div")
                raceDiv.classList = "teams-table-normal"
                if (race.length > 0) {
                    let driver1 = teamData[index]
                    let driver2 = teamData[index + 1]
                    raceDiv.dataset.raceid = driver1[0]
                    let driver1Points = 0
                    let driver2Points = 0
                    let driver1Pos = 0
                    let driver2Pos = 0
                    if (driver1[2] === -1) {
                        driver1Points = 0
                        driver1Pos = "DNF"
                    }
                    else {
                        driver1Points = driver1[2]
                        driver1Pos = driver1[1]
                    }
                    if (driver2[2] === -1) {
                        driver2Points = 0
                        driver2Pos = "DNF"
                    }
                    else {
                        driver2Points = driver2[2]
                        driver2Pos = driver2[1]
                    }
                    raceDiv.dataset.points = parseInt(driver1Points) + parseInt(driver2Points)
                    raceDiv.dataset.pos1 = driver1Pos
                    raceDiv.dataset.pos2 = driver2Pos
                    raceDiv.dataset.quali1 = driver1[4]
                    raceDiv.dataset.quali2 = driver2[4]
                    raceDiv.dataset.fastlap1 = driver1[3]
                    raceDiv.dataset.fastlap2 = driver2[3]
                    raceDiv.dataset.gapToWinner1 = driver1[5]
                    raceDiv.dataset.gapToWinner2 = driver2[5]
                    raceDiv.dataset.gapToPole1 = driver1[6]
                    raceDiv.dataset.gapToPole2 = driver2[6]
                    teampoints += parseInt(raceDiv.dataset.points)
                    if (race.length > 8) {
                        let d1SprintPoints = 0
                        let d2SprintPoints = 0
                        let d1SprintPos = 0
                        let d2SprintPos = 0
                        if (driver1[5] === -1) {
                            d1SprintPoints = 0
                            d1SprintPos = "DNF"
                        }
                        else {
                            d1SprintPoints = driver1[7]
                            d1SprintPos = driver1[8]
                        }
                        if (driver2[5] === -1) {
                            d2SprintPoints = 0
                            d2SprintPos = "DNF"
                        }
                        else {
                            d2SprintPoints = driver2[7]
                            d2SprintPos = driver2[8]
                        }
                        raceDiv.dataset.sprintpoints = parseInt(d1SprintPoints) + parseInt(d2SprintPoints)
                        raceDiv.dataset.sprintpos1 = d1SprintPos
                        teampoints += parseInt(raceDiv.dataset.sprintpoints)
                        raceDiv.dataset.sprintpos2 = d2SprintPos

                    }
                }
                else {
                    raceDiv.innerText = "-"
                }
                let newText = manageTeamsText(raceDiv)
                raceDiv.innerHTML = newText.innerHTML
                row.appendChild(raceDiv)
            }

        })
    }
    let pointsDiv = document.createElement("div")
    pointsDiv.classList = "teams-table-points bold-font"
    pointsDiv.innerText = teampoints
    row.appendChild(pointsDiv)
    data.appendChild(row)
}


function new_addDriver(driver, races_done, odd) {
    let data = document.querySelector(".drivers-table-data")
    let row = document.createElement("div")
    row.classList = "drivers-table-row"
    if (odd) {
        row.classList.add("odd")
    }
    let nameDiv = document.createElement("div");
    nameDiv.classList = "drivers-table-driver"
    let name = driver[0].split(" ")
    let nameContainer = document.createElement("div")
    nameContainer.className = "name-container"
    let spanName = document.createElement("span")
    let spanLastName = document.createElement("span")
    spanName.textContent = insert_space(name[0]) + " "
    spanLastName.textContent = name.slice(1).join(" ").toUpperCase()
    spanLastName.classList.add("bold-font")
    spanLastName.dataset.teamid = driver[1]
    row.dataset.teamid = driver[1]
    nameContainer.appendChild(spanName)
    nameContainer.appendChild(spanLastName)
    nameDiv.appendChild(nameContainer)
    manageColor(spanLastName, spanLastName)
    let posDiv = document.createElement("div")
    posDiv.classList = "drivers-table-position bold-font"
    posDiv.innerText = driver[2]
    row.appendChild(posDiv)
    let logoDiv = document.createElement("div")
    logoDiv.classList = "drivers-table-logo-div"
    let logo = document.createElement("img")
    logo.classList = "drivers-table-logo"
    logo.dataset.teamid = driver[1]
    if (driver[1] === 1) { //ferrari
        logo.classList.add("logo-ferrari-table")
    }
    if (driver[1] === 2) { //mclaren
        logo.classList.add("logo-reduce")
    }
    if (driver[1] === 3) { //redbull
        logo.classList.add("logo-up-down-mid")
    }
    if (driver[1] === 6) {
        logo.classList.add("logo-williams-table")
    }
    if (driver[1] === 4 || driver[1] === 7) { //mercedes  haas
        logo.classList.add("logo-merc-table")
    }
    if (driver[1] === 5) { //different to aston
        logo.classList.add(driversTableLogosDict[alpineReplace])
    }
    if (driver[1] === 8) { //alphatauri
        logo.classList.add(driversTableLogosDict[alphaReplace])
    }
    if (driver[1] === 9) { //alfa
        logo.classList.add(driversTableLogosDict[alfaReplace])
    }
    if (driver[1] === 10 || driver[1] === 32) {
        logo.classList.add("logo-up-down-little")
    }
    logoDiv.classList.add(team_dict[driver[1]] + "hoverback")
    logo.setAttribute("src", logos_disc[driver[1]])
    logoDiv.appendChild(logo)
    row.appendChild(logoDiv)
    row.appendChild(nameDiv)
    let driverpoints = 0
    races_ids.forEach(function (raceid) {
        let raceDiv = document.createElement("div")
        raceDiv.classList = "drivers-table-normal"
        if (races_done.includes(raceid)) {
            let index = races_done.indexOf(raceid)
            let race = driver[index + 3]
            raceDiv.dataset.pos = race[1]
            raceDiv.dataset.points = race[2]
            raceDiv.dataset.fastlap = race[3]
            raceDiv.dataset.qualy = race[4]
            raceDiv.dataset.gapToWinner = race[5]
            raceDiv.dataset.gapToPole = race[6]
            if (race.length > 8) { //sprint 
                raceDiv.dataset.sprintpos = race[8]
                raceDiv.dataset.sprintpoints = race[7]
                if (raceDiv.dataset.sprintpoints !== "-1") {
                    driverpoints += parseInt(raceDiv.dataset.sprintpoints)
                }
            }
            if (raceDiv.dataset.points !== "-1") {
                driverpoints += parseInt(raceDiv.dataset.points)
            }
            raceDiv = manageText(raceDiv)
            row.appendChild(raceDiv)
        }
        else {
            raceDiv.innerText = "-"
            row.appendChild(raceDiv)
        }
    })
    let pointsDiv = document.createElement("div")
    pointsDiv.classList = "drivers-table-points bold-font"
    pointsDiv.innerText = driverpoints
    row.appendChild(pointsDiv)
    row.addEventListener("hover", function (elem) {
        if (elem.dataset.teamid === 2) {
            let logo = this.querySelector(".drivers-table-logo")
            logo.style.opacity = "0"
            let logo2 = this.querySelector(".drivers-table-logo").nextElementSibling
            logo2.style.opacity = "1"
        }
    })
    data.appendChild(row)
}

function add_marquees_viewer() {
    setTimeout(function () {
        document.querySelectorAll('#season_viewer .name-container').forEach(container => {
            let parentWidth = container.parentNode.clientWidth
            let containerWidth = container.scrollWidth
            if (containerWidth > parentWidth) {
                let name = container.firstChild

                let text = name.textContent.trim();
                let words = text.split(' ');

                if (words.length >= 1) {
                    let longestWordIndex = 0;
                    let longestWordLength = 0;

                    words.forEach((word, index) => {
                        if (word.length > longestWordLength) {
                            longestWordLength = word.length;
                            longestWordIndex = index;
                        }
                    });

                    words[longestWordIndex] = words[longestWordIndex].charAt(0) + ".";

                    name.textContent = words.join(' ');
                }

            }
        });
    }, 100);
}

function manageText(raceDiv) {
    if (raceDiv.innerText === "-") {
        return raceDiv
    }
    if (pointsOrPos === "points" || pointsOrPos === "pos") {
        let racePart = ""
        let sprintPart = ""
        if (raceDiv.dataset.points !== "-1") {
            if (pointsOrPos === "points") {
                racePart = raceDiv.dataset.points
            }
            else {
                racePart = raceDiv.dataset.pos
            }
        }
        else {
            racePart = "DNF"
        }
        if (raceDiv.dataset.points === "0" && pointsOrPos === "points") {
            racePart = ""
        }
        if (raceDiv.dataset.sprintpoints !== undefined) {
            if (raceDiv.dataset.sprintpoints !== "-1") {
                if (pointsOrPos === "points") {
                    sprintPart = raceDiv.dataset.sprintpoints
                }
                else {
                    sprintPart = raceDiv.dataset.sprintpos
                }
            }
            else {
                sprintPart = "DNF"
            }
        }
        if (raceDiv.dataset.sprintpoints === undefined || raceDiv.dataset.sprintpoints === "0") {
            raceDiv.innerText = racePart
        }
        else {
            raceDiv.innerText = racePart + "(" + sprintPart + ")"
        }
    }
    else if (pointsOrPos === "quali") {
        raceDiv.innerText = raceDiv.dataset.qualy
    }
    else if (pointsOrPos === "gapWinner") {
        if (raceDiv.dataset.pos === "-1") {
            raceDiv.innerText = "DNF"
        }
        else {
            raceDiv.innerText = raceDiv.dataset.gapToWinner
        }
    }
    else if (pointsOrPos === "gapPole") {
        raceDiv.innerText = raceDiv.dataset.gapToPole
    }


    return raceDiv

}

function manageTeamsText(raceDiv) {
    if (raceDiv.innerText === "-") {
        return raceDiv
    }
    if (pointsOrPos === "points") {
        if (raceDiv.dataset.sprintpoints !== undefined) {
            let racePart = raceDiv.dataset.points
            let sprintPart = "(" + raceDiv.dataset.sprintpoints + ")"
            if (racePart === "0") {
                racePart = ""
            }
            if (sprintPart === "0") {
                sprintPart = ""
            }
            raceDiv.innerText = racePart + sprintPart
        }
        else {
            let racePart = raceDiv.dataset.points
            if (racePart === "0") {
                racePart = ""
            }
            raceDiv.innerText = racePart
        }
    }
    else if (pointsOrPos === "pos") {
        let d1Pos = "DNF"
        let d2Pos = "DNF"
        let d1SprPos = ""
        let d2SprPos = ""
        if (raceDiv.dataset.pos1 !== "DNF") {
            d1Pos = raceDiv.dataset.pos1
        }
        if (raceDiv.dataset.pos2 !== "DNF") {
            d2Pos = raceDiv.dataset.pos2
        }
        if (raceDiv.dataset.sprintpos1 !== undefined) {
            d1SprPos = raceDiv.dataset.sprintpos1
        }
        if (raceDiv.dataset.sprintpos2 !== undefined) {
            d2SprPos = raceDiv.dataset.sprintpos2
        }

        let text = d1Pos + "<br>" + d2Pos
        if (d1SprPos !== "" && d2SprPos !== "") {
            text = d1Pos + "(" + d1SprPos + ")" + "<br>" + d2Pos + "(" + d2SprPos + ")"
        }
        raceDiv.innerHTML = text
    }
    else if (pointsOrPos === "quali") {
        raceDiv.innerHTML = raceDiv.dataset.quali1 + "<br>" + raceDiv.dataset.quali2
    }
    else if (pointsOrPos === "gapWinner") {
        let d1, d2;
        if (raceDiv.dataset.pos1 === "DNF") {
            d1 = "DNF"
        }
        else {
            d1 = raceDiv.dataset.gapToWinner1
        }
        if (raceDiv.dataset.pos2 === "DNF") {
            d2 = "DNF"
        }
        else {
            d2 = raceDiv.dataset.gapToWinner2
        }

        raceDiv.innerHTML = d1 + "<br>" + d2
    }
    else if (pointsOrPos === "gapPole") {
        raceDiv.innerHTML = raceDiv.dataset.gapToPole1 + "<br>" + raceDiv.dataset.gapToPole2
    }
    return raceDiv
}

function hoverListeners() {
    document.querySelectorAll(".drivers-table-row").forEach(function (row) {
        row.addEventListener("mouseenter", function () {
            if (this.dataset.teamid === "2" || this.dataset.teamid === "6" || (this.dataset.teamid === "5" && alpineReplace !== "alpine")
                || (this.dataset.teamid === "9" && alfaReplace === "sauber") || (this.dataset.teamid === "8" && (alphaReplace === "brawn" || alphaReplace === "hugo" || alphaReplace === "toyota"))) {

                let logo = this.querySelector(".drivers-table-logo");
                let new_src = logos_disc[this.dataset.teamid].slice(0, -4) + "2" + logo.src.slice(-4);
                logo.src = new_src
            }
        });
        row.addEventListener("mouseleave", function () {
            if (this.dataset.teamid === "2" || this.dataset.teamid === "6" || (this.dataset.teamid === "5" && alpineReplace !== "alpine")
                || (this.dataset.teamid === "9" && alfaReplace === "sauber") || (this.dataset.teamid === "8" && (alphaReplace === "brawn" || alphaReplace === "hugo" || alphaReplace === "toyota"))) {
                let logo = this.querySelector(".drivers-table-logo");
                let new_src = logos_disc[this.dataset.teamid].slice(0, -4) + logo.src.slice(-4);
                logo.src = new_src
            }
        });
    });
}





/**
 * Creates the year selector menu
 * @param {String} actualYear current year of the save
 */
function generateYearsMenu(actualYear) {
    document.querySelector("#yearInput").min = actualYear
    currentSeason = actualYear
    var yearMenu = document.querySelector("#yearMenu");
    var yearH2H = document.querySelector("#yearMenuH2H");
    var yearPrediction = document.querySelector("#yearPredictionMenu");
    var yearPredictionModal = document.querySelector("#yearPredictionModalMenu");
    yearMenu.innerHTML = ""
    yearH2H.innerHTML = ""
    yearPrediction.innerHTML = ""
    yearPredictionModal.innerHTML = ""
    for (let year = actualYear; year >= game_version; year--) {
        let a = document.createElement("a");
        a.textContent = year.toString();
        a.classList = "dropdown-item"
        a.style.cursor = "pointer"
        yearMenu.appendChild(a);
        a.addEventListener("click", function () {
            document.getElementById("yearButton").textContent = a.textContent
            let dataYear = {
                command: "yearSelected",
                year: a.textContent
            }
            isYearSelected = true
            manage_show_tables()
            socket.send(JSON.stringify(dataYear))
            add_marquees_viewer()
        })

        let a2 = document.createElement("a");
        a2.textContent = year.toString();
        a2.classList = "dropdown-item"
        a2.style.cursor = "pointer"
        yearH2H.appendChild(a2);
        a2.addEventListener("click", function () {
            resetH2H()
            document.querySelectorAll(".modal-team").forEach(function (elem) {
                elem.classList.remove("d-none")
            })
            document.getElementById("yearButtonH2H").textContent = a2.textContent
            let dataYear = {
                command: "yearSelectedH2H",
                year: a2.textContent
            }
            socket.send(JSON.stringify(dataYear))
        })
        let a3 = document.createElement("a");
        a3.textContent = year.toString();
        a3.classList = "dropdown-item"
        a3.style.cursor = "pointer"
        yearPrediction.appendChild(a3);
        a3.addEventListener("click", function () {
            document.getElementById("yearPredictionButton").textContent = a3.textContent
            document.querySelector("#mainPred").classList.remove("d-none")
            let dataYear = {
                command: "yearSelectedPrediction",
                year: a3.textContent
            }
            socket.send(JSON.stringify(dataYear))
        })
        let a4 = document.createElement("a");
        a4.textContent = year.toString();
        a4.classList = "dropdown-item"
        a4.style.cursor = "pointer"
        yearPredictionModal.appendChild(a4);
        a4.addEventListener("click", function () {
            document.getElementById("yearPredictionModalButton").textContent = a4.textContent
            let dataYear = {
                command: "yearSelectedPredictionModal",
                year: a4.textContent
            }
            socket.send(JSON.stringify(dataYear))
        })
    }
    yearMenu.childNodes[0].click()
}




