import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

export const formatDate = (
  date: string,
  currentFormat: string,
  targetFormat: string
) => {
  return dayjs(date, currentFormat).format(targetFormat)
}
