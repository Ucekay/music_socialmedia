import {
  differenceInDays,
  format,
  formatDistanceToNow,
  parseISO,
} from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatCreatedAt = (dateString: string) => {
  const date = parseISO(dateString);
  const jsDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const now = new Date();
  const formattedDate = format(jsDate, 'yyyy/MM/dd', { locale: ja });
  const formattedTime = format(jsDate, 'HH:mm', { locale: ja });
  const daysDifference = differenceInDays(now, jsDate);
  const timeAgo = formatDistanceToNow(date, { addSuffix: false, locale: ja });

  return { formattedDate, formattedTime, timeAgo, daysDifference };
};
