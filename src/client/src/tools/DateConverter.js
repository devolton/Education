
import { format } from 'date-fns';

export class DateConverter {
     static addOrdinalSuffix(date) {
        const suffix = ['th', 'st', 'nd', 'rd'][((date + 90) % 100 - 10) % 10] || 'th';
        return date + suffix;
    }


     static formatDate(date) {
        const dayWithSuffix = this.addOrdinalSuffix(date.getDate());
        return `${dayWithSuffix} ${format(date, 'MMMM, yyyy')}`;
    }
    static formatDateTime(dateString) {
        const date = new Date(dateString);
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

        const timeFormatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        const formattedDate = dateFormatter.format(date); // Пример: November 18, 2024
        const formattedTime = timeFormatter.format(date); // Пример: 12:36 PM

        return `${formattedDate} at ${formattedTime}`;
    }
}