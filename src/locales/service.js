class CommonService {
  static getPermission = (permissions, ids) => {
    let flag = new Array(ids.length).fill(false)
    ids.forEach((id, index) => {
      const hasPermission = permissions.find(
        (permission) => id === permission.id
      )
      if (hasPermission) {
        flag[index] = true
      }
    })
    return flag
  }
}

export default CommonService
