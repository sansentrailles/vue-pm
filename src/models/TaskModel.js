// import DateTimeHelper from '@/helpers/DateTimeHelper'
import {statuses} from '@/store/statuses'

export default class {
  constructor({id, title, text, date, status, projectId}) {
    // console.log(statuses)
    this.id = id
    this.title = title
    this.text = text
    this.date = date
    this.status = status
    this.projectId = projectId
  }

  get formattedDate() {
    const date = new Date(this.date)

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    return date.toLocaleDateString('ru-ru', options)
  }

  get statusObj() {
    return statuses.find(status => status.id == this.status)
  }
}
