const STATUS_NEW = 1
const STATUS_IN_PROGRESS = 2
const STATUS_FINISHED = 3
const STATUS_CANCELLED = 4

export const statusConst = {
  STATUS_NEW,
  STATUS_IN_PROGRESS,
  STATUS_FINISHED,
  STATUS_CANCELLED,
  DEFAULT_STATUS: STATUS_NEW
}

export const statuses = [
  {
    id: statusConst.STATUS_NEW,
    title: 'Новая',
    icon: 'crop_din'
  },
  {
    id: statusConst.STATUS_IN_PROGRESS,
    title: 'В работе',
    icon: 'autorenew'
  },
  {
    id: statusConst.STATUS_FINISHED,
    title: 'Завершена',
    icon: 'done'
  },
  {
    id: statusConst.STATUS_CANCELLED,
    title: 'Отменена',
    icon: 'block'
  }
]

// export default {
//   statuses,
//   statusConst
  // STATUS_NEW,
  // STATUS_IN_PROGRESS,
  // STATUS_FINISHED,
  // STATUS_CANCELLED,
  // DEFAULT_STATUS: STATUS_NEW
// }