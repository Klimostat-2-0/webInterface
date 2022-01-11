function getAbsoluteTimeline(start, end) {
    let date = roundDate(start)
    let result = []
    let endDate = roundDate(end)
    if(start.getTime() > end.getTime()){
        return
    }
    for(let i = 0; ; i++){
        if(date >= endDate) return result
        date = roundDate(new Date(date.getTime() + 60000))
        result.push(date)
    }
}

function roundDate (date) {
    let interval = 60000
    return new Date(Math.floor(date.getTime() / interval) * interval);
};

function formatDate(dayIsImportant, date) {
    if(dayIsImportant) {
        return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + (date.getMonth()+1)
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
    if(time.length != data.length) return
    let dayImportance = checkDayImportance(time)
    for(let i = 0; i < time.length; i++) {
        result.push([formatDate(dayImportance, time[i]), data[i]])
    }
    return result
}
function isCurrentDay(date){
    let currentDay = new Date()
    return date.getDate() == currentDay.getDate() &&
            date.getMonth() == currentDay.getMonth() &&
            date.getFullYear() == currentDay.getFullYear()
}

function hoursAgoToTimestamp(hoursAgo, currentDate=new Date()){
    let millsInOneHour = 1000*60*60
    return roundDate(new Date(currentDate.getTime()-(millsInOneHour*hoursAgo)))
}

function addMinutes(minutes, currentDate){
    let millsInOneMin = 1000*60
    return roundDate(new Date(currentDate.getTime()+(millsInOneMin*minutes))).toString()
}

function analyseCo2(data, co2Limit, co2Reset){
    let res = [0, 0, 0]
    data.map(element => element[1]).forEach((element) => {
          if(element>co2Limit) res[2]++
          else if(element<co2Reset) res[0]++
          else res[1]++
      })
      return res
}

export default {
    mapDataToTime, checkDayImportance, formatDate, addMinutes,
    hoursAgoToTimestamp, analyseCo2, getAbsoluteTimeline, roundDate
}