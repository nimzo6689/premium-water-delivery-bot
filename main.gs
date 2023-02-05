function main() {

  const pwClient = new PremiumWaterClient();
  const deliveryModel = pwClient.retrieveDeliveryModel();
  const nextDeliveryDate = Utils.convertToThisSunday(pwClient.retrieveMaxBreakTime(deliveryModel));

  if (nextDeliveryDate.toDateString() == new Date(deliveryModel.deliveryDate).toDateString()) {
    console.log("既に次回の配送日を延期済み。");
    return;
  }

  const nextDeliveryDateStr = Utils.convertDateToYYYY_MM_DD(nextDeliveryDate);
  pwClient.extendDeliveryDate(nextDeliveryDateStr);

  console.log("次回配送日の更新が完了しました。");

  if (Config.TT_ENABLE_FLAG == "ON") {
    TimeTreeClient.registerDeliveryDate(nextDeliveryDateStr);
  }
  
}
