
export const cleanEvents = (events) => {
  return events.filter(event => {
    return event.title != "N/A" && event.location != "N/A" && event.date != "N/A"
  })
}