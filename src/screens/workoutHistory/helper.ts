export function formatDateToDDMMYYYY(dateStr: string) {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
}