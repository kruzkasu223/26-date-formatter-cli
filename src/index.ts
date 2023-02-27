import prompts from "prompts"
import { formatDate } from "./formatDate"
import { DEFAULT_FORMAT_OPTIONS } from "./constants"
import { bgRed, bgCyan, blue, green } from "kleur"

const defaultFormatOptions = DEFAULT_FORMAT_OPTIONS.map((format) => ({
  title: format,
  value: format,
}))

console.clear()
console.log(bgCyan().bold("26/27 - Date Formatter CLI"))
;(async () => {
  const values = {
    date: "",
    currentFormat: "",
    targetFormat: "",
  }
  const { date } = await prompts([
    {
      type: "text",
      name: "date",
      message: "Enter a date",
    },
  ])
  values.date = date

  const { currentFormatSelect } = await prompts({
    type: "select",
    name: "currentFormatSelect",
    message: "Select the current format",
    choices: defaultFormatOptions,
  })
  values.currentFormat = currentFormatSelect

  if (currentFormatSelect === "other") {
    const { currentFormatText } = await prompts({
      type: "text",
      name: "currentFormatText",
      message: "Enter the current format",
    })
    values.currentFormat = currentFormatText
  }

  const { targetFormatSelect } = await prompts({
    type: "select",
    name: "targetFormatSelect",
    message: "Select the target format",
    choices: defaultFormatOptions,
  })
  values.targetFormat = targetFormatSelect

  if (targetFormatSelect === "other") {
    const { targetFormatText } = await prompts({
      type: "text",
      name: "targetFormatText",
      message: "Enter the target format",
    })
    values.targetFormat = targetFormatText
  }

  if (!values.date || !values.currentFormat || !values.targetFormat)
    return console.log(bgRed().bold("Please enter valid values."))

  const formattedDate = formatDate(
    values.date,
    values.currentFormat,
    values.targetFormat
  )

  if (!formattedDate || formattedDate === "Invalid Date")
    return console.log(bgRed().bold("Please enter valid values."))

  console.log(
    "Date formatted from",
    blue(values.date),
    "to",
    green().bold().underline(formattedDate)
  )
})()
