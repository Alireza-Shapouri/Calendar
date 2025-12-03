import moment from 'moment-jalaali'
import momentHijri from 'moment-hijri'

/**
 * Convert Jalali to Gregorian
 */
export function jalaliToGregorian(jYear, jMonth, jDay) {
    const m = moment(`${jYear}/${jMonth + 1}/${jDay}`, 'jYYYY/jMM/jDD')
    return {
        year: m.year(),
        month: m.month(),
        day: m.date(),
        date: m.toDate()
    }
}

/**
 * Convert Gregorian to Jalali
 */
export function gregorianToJalali(gYear, gMonth, gDay) {
    const m = moment(`${gYear}/${gMonth + 1}/${gDay}`, 'YYYY/MM/DD')
    return {
        year: m.jYear(),
        month: m.jMonth(),
        day: m.jDate()
    }
}

/**
 * Convert Gregorian to Hijri
 */
export function gregorianToHijri(gYear, gMonth, gDay) {
    const m = momentHijri(`${gYear}/${gMonth + 1}/${gDay}`, 'YYYY/MM/DD')
    return {
        year: m.iYear(),
        month: m.iMonth(),
        day: m.iDate()
    }
}

/**
 * Convert Hijri to Gregorian
 */
export function hijriToGregorian(hYear, hMonth, hDay) {
    const m = momentHijri(`${hYear}/${hMonth + 1}/${hDay}`, 'iYYYY/iMM/iDD')
    return {
        year: m.year(),
        month: m.month(),
        day: m.date(),
        date: m.toDate()
    }
}

/**
 * Convert Jalali to Hijri
 */
export function jalaliToHijri(jYear, jMonth, jDay) {
    const gregorian = jalaliToGregorian(jYear, jMonth, jDay)
    return gregorianToHijri(gregorian.year, gregorian.month, gregorian.day)
}

/**
 * Convert Hijri to Jalali
 */
export function hijriToJalali(hYear, hMonth, hDay) {
    const gregorian = hijriToGregorian(hYear, hMonth, hDay)
    return gregorianToJalali(gregorian.year, gregorian.month, gregorian.day)
}

/**
 * Get all date conversions for a given date
 */
export function getAllConversions(date) {
    const gregorian = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
    }

    const jalali = gregorianToJalali(gregorian.year, gregorian.month, gregorian.day)
    const hijri = gregorianToHijri(gregorian.year, gregorian.month, gregorian.day)

    return {
        gregorian,
        jalali,
        hijri
    }
}
