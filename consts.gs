class Consts {

  // -- Premium Water ----------------------
  static get PW_BASE_URL() {
    return "https://premium-water.net/mypage";
  }

  static get PW_EDIT_TIME_URL() {
    return `${Consts.PW_BASE_URL}/delivery_next_time/edit_time`;
  }

  static get PW_BREAK_TIME_URL() {
    return `${Consts.PW_BASE_URL}/common/ajax_get_next_delivery_day_break_time`;
  }

  // -- TimeTree ----------------------
  static get TT_EVENTS_URL() {
    return `https://timetreeapis.com/calendars/${Config.TT_CALENDAR_ID},${Config.TT_LABEL_ID}/events`;
  }

}
