class Utils {

  /**
   * Date オブジェクトから YYYY-MM-DD に変換する
   */
  static convertDateToYYYY_MM_DD(targetDate) {
    const nextDelivMonth = `0${(targetDate.getMonth() + 1)}`.slice(-2);
    const nextDelivDate = `0${(targetDate.getDate())}`.slice(-2);
    return `${targetDate.getFullYear()}-${nextDelivMonth}-${nextDelivDate}`;
  }

  /**
   * 今週の日曜日を取得する
   */
  static convertToThisSunday(targetDate) {
    const retVal = new Date(targetDate)
    retVal.setDate(retVal.getDate() - retVal.getDay());
    return retVal;
  }
}
