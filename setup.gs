function setup() {
  const props = PropertiesService.getScriptProperties();

  if (pros.getProperty("PW_USER_NAME") == null) {
    props.setProperty("PW_USER_NAME", "");
  }

  if (pros.getProperty("PW_PASSWORD") == null) {
    props.setProperty("PW_PASSWORD", "");
  }

  if (pros.getProperty("TT_ENABLE_FLAG") == null) {
    props.setProperty("TT_ENABLE_FLAG", "");
  }

  if (pros.getProperty("TT_ACCESS_TOKEN") == null) {
    props.setProperty("TT_ACCESS_TOKEN", "");
  }

  if (pros.getProperty("TT_CALENDAR_ID") == null) {
    props.setProperty("TT_CALENDAR_ID", "");
  }

  if (pros.getProperty("TT_LABEL_ID") == null) {
    props.setProperty("TT_LABEL_ID", "");
  }
}
