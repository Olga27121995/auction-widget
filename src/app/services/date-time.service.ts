import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export class DateTimeService {
    public static getTimeFormat(date: Date): string {
        const options: DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };

        return date.toLocaleString('ru', options);
    }
}
