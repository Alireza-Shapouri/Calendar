import { ref, computed, watch } from 'vue'

// Global state
const reminders = ref([])
const notifications = ref([])

export function useReminders() {
    // Load reminders from localStorage
    const loadReminders = () => {
        const saved = localStorage.getItem('reminders')
        if (saved) {
            reminders.value = JSON.parse(saved)
        }
    }

    // Save reminders to localStorage
    const saveReminders = () => {
        localStorage.setItem('reminders', JSON.stringify(reminders.value))
    }

    // Add a new reminder
    const addReminder = (reminder) => {
        const newReminder = {
            id: Date.now(),
            date: reminder.date,
            time: reminder.time,
            title: reminder.title,
            description: reminder.description,
            created: new Date().toISOString()
        }
        reminders.value.push(newReminder)
        saveReminders()
        return newReminder
    }

    // Update a reminder
    const updateReminder = (id, updates) => {
        const index = reminders.value.findIndex(r => r.id === id)
        if (index !== -1) {
            reminders.value[index] = { ...reminders.value[index], ...updates }
            saveReminders()
        }
    }

    // Delete a reminder
    const deleteReminder = (id) => {
        reminders.value = reminders.value.filter(r => r.id !== id)
        saveReminders()
    }

    // Get reminders for a specific date
    const getRemindersForDate = (date) => {
        return reminders.value.filter(r => {
            const reminderDate = new Date(r.date)
            return reminderDate.getFullYear() === date.getFullYear() &&
                reminderDate.getMonth() === date.getMonth() &&
                reminderDate.getDate() === date.getDate()
        })
    }

    // Show notification
    const showNotification = (reminder) => {
        // In-app notification
        const notification = {
            id: Date.now(),
            reminder,
            timestamp: new Date()
        }
        notifications.value.push(notification)

        // Browser notification
        if (Notification.permission === 'granted') {
            new Notification(reminder.title, {
                body: reminder.description || 'زمان یادآوری فرا رسیده است',
                icon: '/favicon.ico' // Assuming there is a favicon
            })
        }

        // Play sound (simple beep or alert sound if available)
        try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3') // Simple bell sound
            audio.play().catch(e => console.log('Audio play failed', e))
        } catch (e) {
            console.log('Audio not supported')
        }

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            dismissNotification(notification.id)
        }, 10000)
    }

    // Dismiss notification
    const dismissNotification = (id) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }

    // Check for due reminders
    const checkReminders = () => {
        const now = new Date()
        reminders.value.forEach(reminder => {
            const reminderDateTime = new Date(reminder.date)
            if (reminder.time) {
                const [hours, minutes] = reminder.time.split(':')
                reminderDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
            }

            // Check if reminder is due
            // Trigger if time has passed (diff <= 0) AND it was less than 1 minute ago (diff > -60000)
            // This ensures we catch it even if the interval ticks slightly after the exact minute
            const diff = reminderDateTime - now

            // Debug log
            // console.log(`Checking reminder: ${reminder.title}, Due: ${reminderDateTime}, Diff: ${diff}`)

            if (diff <= 0 && diff > -60000 && !reminder.notified) {
                showNotification(reminder)
                reminder.notified = true
                saveReminders()
            }
        })
    }

    // Start checking reminders every minute
    let reminderInterval
    const startReminderCheck = () => {
        loadReminders()

        // Request permission
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission()
        }

        if (!reminderInterval) {
            reminderInterval = setInterval(checkReminders, 10000) // Check every 10 seconds
        }
        checkReminders() // Check immediately
    }

    const stopReminderCheck = () => {
        if (reminderInterval) {
            clearInterval(reminderInterval)
            reminderInterval = null
        }
    }

    return {
        reminders,
        notifications,
        addReminder,
        updateReminder,
        deleteReminder,
        getRemindersForDate,
        showNotification,
        dismissNotification,
        startReminderCheck,
        stopReminderCheck,
        loadReminders
    }
}
