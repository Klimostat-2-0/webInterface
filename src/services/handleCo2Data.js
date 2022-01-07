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

function getAbsoluteTimeline(start, end) {
    let date = roundDate(start)
    let result = [date]
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
    if(time.length != data.length) return
    let dataPointer = 0;
    let dayImportance = checkDayImportance(time)
    for(let i = 0; i < normTime.length; i++) {
        result.push([formatDate(dayImportance, normTime[i]), data[dataPointer]])
        if (normTime[i].getTime() >= roundDate(time[dataPointer]).getTime() && dataPointer < data.length-1) dataPointer++
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
    return new Date(currentDate.getTime()-(millsInOneHour*hoursAgo)).toString()
}

function filterNewData(data, newest){
    const newestAllowedDate = roundDate(newest).getTime()
    return data.filter(d => roundDate(new Date(d.timestamp)).getTime() <= newestAllowedDate)
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
    mapDataToTime, getValidTimeLine, checkDayImportance, formatDate, hoursAgoToTimestamp, filterNewData, analyseCo2, getAbsoluteTimeline
}