export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const date = new Date(dateString);

  return {
    dateTime: date.toLocaleString("es-ES", dateTimeOptions),
    dateOnly: date.toLocaleDateString("es-ES", dateOptions),
    timeOnly: date.toLocaleTimeString("es-ES", timeOptions),
  };
};

export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 4
): number[] => {
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};