class Config {

  // -- Premium Water ----------------------
  /**
   * ログインID
   */
  static get PW_USER_NAME() {
    return ScriptProperties.getProperty("PW_USER_NAME");
  }

  /**
   * パスワード
   */
  static get PW_PASSWORD() {
    return ScriptProperties.getProperty("PW_PASSWORD");
  }

  // -- TimeTree ----------------------
  /**
   * Time Tree 連携の有効フラグ（ON: 有効, それ以外: 無効）
   */
  static get TT_ENABLE_FLAG() {
    return ScriptProperties.getProperty("TT_ENABLE_FLAG");
  }

  /**
   * Personal Access Tokens
   * スコープ: カレンダー(読み取り), 予定(書き込み)
   * https://timetreeapp.com/developers/personal_access_tokens
   */
  static get TT_ACCESS_TOKEN() {
    return ScriptProperties.getProperty("TT_ACCESS_TOKEN");
  }

  /**
   * カレンダーID
   * https://developers.timetreeapp.com/ja/docs/api/calendar-app#get-a-calendar
   */
  static get TT_CALENDAR_ID() {
    return ScriptProperties.getProperty("TT_CALENDAR_ID");
  }

  /**
   * ラベルID
   * "カレンダーID," の後ろに続く番号（1~9）
   */
  static get TT_LABEL_ID() {
    return ScriptProperties.getProperty("TT_LABEL_ID");
  }
}
