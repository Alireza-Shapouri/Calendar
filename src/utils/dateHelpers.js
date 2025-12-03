import moment from 'moment-jalaali'
import momentHijri from 'moment-hijri'
import { JALALI_MONTHS, HIJRI_MONTHS, GREGORIAN_MONTHS } from './constants'

/**
 * Format Jalali date
 */
export function formatJalaliDate(jDate) {
    const m = moment(jDate, 'jYYYY/jMM/jDD')
    return `${m.jDate()} ${JALALI_MONTHS[m.jMonth()]} ${m.jYear()}`
}

/**
 * Format Hijri date
 */
export function formatHijriDate(hDate) {
    const m = momentHijri(hDate, 'iYYYY/iMM/iDD')
    return `${m.iDate()} ${HIJRI_MONTHS[m.iMonth()]} ${m.iYear()}`
}

/**
 * Format Gregorian date
 */
export function formatGregorianDate(gDate) {
    const date = new Date(gDate)
    return `${date.getDate()} ${GREGORIAN_MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

/**
 * Get day name in Persian
 */
export function getPersianDayName(dayIndex) {
    const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه']
    return days[dayIndex]
}

/**
 * Get day name in Arabic
 */
export function getArabicDayName(dayIndex) {
    const days = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
    return days[dayIndex]
}

/**
 * Get day name in English
 */
export function getEnglishDayName(dayIndex) {
    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    return days[dayIndex]
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1, date2) {
    if (!date1 || !date2) return false
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

/**
 * Check if date is today
 */
export function isToday(date) {
    return isSameDay(date, new Date())
}
