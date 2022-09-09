import moment from "moment"

export const convertDate = (value) => {
    return moment(value?.toString()).format('DD-MM-YYYY')
}
export const convertDateDefault = (value) => {
    return moment(value?.toString()).format('YYYY-MM-DD')
}
export const convertMonth = (value) => {
    return moment(value?.toString()).format('MM-YYYY')
}

export const convertTimeDate = (value) => {
    return moment(value).format('HH:MM DD/MM/YYYY')
}

export const convertTimeDateNotYear = (value) => {
    return moment(value).format('HH:MM DD/MM')
}

export const convertDateTime = (time) => {
    let hours = new Date(time).getHours()
    let minutes = new Date(time).getMinutes()
    let date = new Date(time).getDate()
    let month = new Date(time).getMonth() + 1
    const year = new Date(time).getFullYear()
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (date < 10) {
        date = `0${date}`
    }
    if (month < 10) {
        month = `0${month}`
    }
    return `${date}/${month}/${year}  ${hours}:${minutes}`
}
