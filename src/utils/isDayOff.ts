import axios from 'axios';

const holidayCache: { [key: string]: boolean[] } = {};

const fetchHolidaysForMonth = async (year: number, month: number): Promise<boolean[]> => {
  const cacheKey = `${year}-${month}`;
  if (holidayCache[cacheKey]) {
    return holidayCache[cacheKey];
  }

  try {
    const response = await axios.get(`/api/getdata?year=${year}&month=${month}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = response.data.toString();

    if (response.status === 200 && typeof responseData === 'string') {
      const holidays = responseData.split('').map((day: string) => day === '1');
      holidayCache[cacheKey] = holidays;
      return holidays;
    } else {
      console.error('Error fetching holiday data:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch holiday data:', error);
    return [];
  }
};

const isHoliday = async (date: Date): Promise<boolean> => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const holidays = await fetchHolidaysForMonth(year, month);
  return holidays[day - 1] || false;
};

export default isHoliday;
