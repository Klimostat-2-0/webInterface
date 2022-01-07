function getValidTimeLine(data) {
    let date
    let result = []
    if(data.length > 0) {
        date = roundDate(data[0])
        result.push(date)
    }
    for (const element of data.slice(1)) {
        if(Math.abs(element.getTime()-date.getTime()) > 100000 ){
            for(let i = 0; i < parseInt((Math.abs(element.getTime()-date.getTime())/60000)); i++) {
                result.push("No values")
            }
        }
         date = roundDate(element)
         result.push(date)
      }
      return result
}

function roundDate (date) {
    let interval = 60000
    return new Date(Math.round(date.getTime() / interval) * interval);
};

function formatDate(dayIsImportant, date) {
    if(dayIsImportant) {
        return date.getHours() + ":" + date.getMinutes() + " " + (date.getMonth()+1) + "." + date.getDate()
    } else {
        return date.getHours() + ":" + date.getMinutes()
    }
}

function checkDayImportance(time){
    if(time[0].getDate() != time[time.length-1].getDate() || time[0].getMonth() != time[time.length-1].getMonth()
    || !isCurrentDay(time[0])) {return true}
    return false
}

function mapDataToTime(normTime, time, data) {
    let result = []
    let timelineCounter = 0;
    let dayImportance = checkDayImportance(time)
    for(let i = 0; i < data.length; i++){
        if (normTime.length > timelineCounter) {
            if(typeof normTime[timelineCounter] == 'object' && normTime[timelineCounter].getTime() == roundDate(time[i]).getTime()){
                result.push([formatDate(dayImportance, normTime[timelineCounter]), data[i]])
            }else{
                result.push([normTime[timelineCounter], data[i]])
                i--
            }
        }
        timelineCounter++
    }
    return result
}
function isCurrentDay(date){
    let currentDay = new Date()
    return date.getDate() == currentDay.getDate() &&
            date.getMonth() == currentDay.getMonth() &&
            date.getFullYear() == currentDay.getFullYear()
  }
function hoursAgoToTimestamp(hoursAgo){
    let currentDay = new Date()
    let millsInOneHour = 1000*60*60
    return new Date(currentDay.getTime()-(millsInOneHour*hoursAgo)).toString()
}

function filterNewData(data, newest){
    const newestAllowedDate = roundDate(new Date(newest)).getTime()
    return data.filter(d => roundDate(new Date(d.timestamp)).getTime() <= newestAllowedDate)
}

function generateEmptyRequestData(timestamp, station){
    return {
        "timestamp": timestamp,
        "temperature": 20,
        "humidity": 20,
        "co2": 200,
        "station": station,
        "id": "61d7eb4db1e5a37311406e53"
    }
}

export default {
    mapDataToTime, getValidTimeLine, checkDayImportance, formatDate, hoursAgoToTimestamp, filterNewData, generateEmptyRequestData
}