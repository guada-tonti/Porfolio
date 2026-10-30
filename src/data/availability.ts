// Edit weeklyAvailability to manage your schedule. No backend is required.
// Keys are real ISO dates (YYYY-MM-DD): always the MONDAY starting that week.
// Work weeks run Monday–Friday and are never split or duplicated.
// Each week belongs to the month containing its Wednesday (most working days).
// Its full Monday–Friday range and Monday-based configuration key are preserved.
// Missing entries mean "To be confirmed",
// never "Available". Months three or more months ahead are closed unless explicitly opened below.
export type AvailabilityStatus = 'available' | 'fulltime' | 'limited' | 'unavailable';

// DEMO ONLY: these are sample states, NOT real bookings or availability.
// Replace them with your actual schedule. Turn this flag off when ready to publish.
export const availabilityIsExample = true;
export const weeklyAvailability: Record<string, AvailabilityStatus> = {
  '2026-10-05': 'unavailable',
  '2026-10-12': 'unavailable',
  '2026-10-19': 'unavailable',
  '2026-10-26': 'unavailable',
  '2026-11-02': 'unavailable',
  '2026-11-09': 'unavailable',
  '2026-11-16': 'unavailable',
  '2026-11-23': 'available',
  '2026-11-30': 'available', // Same state for Nov 30 and Dec 1–4.
  '2026-12-07': 'available',
  '2026-12-14': 'limited',
  '2026-12-21': 'unavailable',
  '2026-12-28': 'unavailable',
  '2027-01-04': 'fulltime',
  '2027-01-11': 'fulltime',
  '2027-01-18': 'fulltime',
  '2027-01-25': 'fulltime',
  '2027-02-01': 'fulltime',
  '2027-02-08': 'fulltime',
  '2027-02-15': 'fulltime',
  '2027-02-22': 'fulltime',
  '2027-03-01': 'fulltime',
  '2027-03-08': 'fulltime',
  '2027-03-15': 'fulltime',
  '2027-03-22': 'fulltime',
  '2027-03-29': 'fulltime',
};

// Explicitly opened months, in addition to the automatic two-month window.
export const openAvailabilityMonths: readonly string[] = ['2027-01', '2027-02', '2027-03'];

export const availabilityTimeZone = 'America/Argentina/Buenos_Aires';
export function currentAvailabilityMonth(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: availabilityTimeZone, year: 'numeric', month: '2-digit',
  }).formatToParts(now);
  return `${parts.find(part => part.type === 'year')!.value}-${parts.find(part => part.type === 'month')!.value}`;
}
const isoDate = (date: Date) => date.toISOString().slice(0, 10);
export function getAvailabilityCalendar(monthKey: string, offsets: readonly number[] = [1, 2, 3]) {
  const [year, month] = monthKey.split('-').map(Number);
  const opening = new Date(Date.UTC(year, month, 1));
  const months = offsets.map(offset => {
    const start = new Date(Date.UTC(year, month - 1 + offset, 1));
    const end = new Date(Date.UTC(year, month + offset, 0));
    const monday = new Date(start);
    monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
    const monthId = isoDate(start).slice(0, 7);
    const closed = offset >= 3 && !openAvailabilityMonths.includes(monthId);
    const weeks = [];
    for (const cursor = new Date(monday); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 7)) {
      const weekEnd = new Date(cursor);
      weekEnd.setUTCDate(weekEnd.getUTCDate() + 4);
      const id = isoDate(cursor);
      const wednesday = new Date(cursor);
      wednesday.setUTCDate(wednesday.getUTCDate() + 2);
      if (wednesday.getUTCMonth() !== start.getUTCMonth() || wednesday.getUTCFullYear() !== start.getUTCFullYear()) continue;
      weeks.push({
        id,
        start: new Date(cursor),
        end: weekEnd,
        status: closed ? 'closed' as const : weeklyAvailability[id] ?? 'unconfirmed' as const,
      });
    }
    return { id: monthId, date: start, closed, weeks };
  });
  return { opening, months };
}
