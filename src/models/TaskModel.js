// import DateTimeHelper from '@/helpers/DateTimeHelper'
import {statuses} from '@/store/statuses'

export default class {
  constructor({id, title, text, date, status, projectId, isCompleted}) {
    this.id = id
    this.title = title
    this.text = text
    this.date = date
    this.status = status
    this.isCompleted = isCompleted
    this.projectId = projectId
  }

  get formattedDate() {
    const date = new Date(this.date)

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    };

    return date.toLocaleDateString('ru-ru', options)
  }

  get statusObj() {
    return statuses.find(status => status.id == this.status)
  }

  get timestamp() {
    const date = new Date(this.date)
    // eslint-disable-next-line no-console
    // console.log(date)
    return date.getTime()
  }
}
