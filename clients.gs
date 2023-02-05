/**
 * Premium Water Web サイトのクライアント
 */
class PremiumWaterClient {

  constructor() {
    this.cookie = this.retrieveCookie();
  }

  /**
   * Premium Water の Cookie を取得
   */
  retrieveCookie() {

    const params = {
      method: "POST",
      followRedirects: false,
      muteHttpExceptions: true,
      payload: `login_id=${Config.PW_USER_NAME}&password=${Config.PW_PASSWORD}`
    };

    const logedInResponse = UrlFetchApp.fetch(Consts.PW_BASE_URL, params);
    const session = logedInResponse.getAllHeaders()['Set-Cookie'];

    const AUTHENTICATE_KEY = "_authenticate";
    const CI_SESSION_KEY = "ci_session";

    const sessionMap = session.reverse().flatMap(it => it.split(";")).map(it => it.split("="));
    const [_a, authenticate] = sessionMap.find(([k, _]) => k == AUTHENTICATE_KEY);
    const [_b, ciSession] = sessionMap.find(([k, _]) => k == CI_SESSION_KEY);

    return `${AUTHENTICATE_KEY}=${authenticate}; ${CI_SESSION_KEY}=${ciSession}`;
  }

  /**
   * Premium Water の配送スケジュール情報を取得
   */
  retrieveDeliveryModel() {

    const params = {
      method: "GET",
      followRedirects: false,
      muteHttpExceptions: true,
      headers: {
        "Cookie": this.cookie
      }
    };

    const deliveryTimeResponse = UrlFetchApp.fetch(Consts.PW_EDIT_TIME_URL, params);
    let $ = Cheerio.load(deliveryTimeResponse.getContentText());

    return ({
      // 前回配送日
      previousDeliveryDate: $('input[name=long_term_delivery_day_break_time]').val(),
      // 次回配送予定日
      deliveryDate: $('input[name=delivery_date]').val(),
      // 伝票番号
      orderDetailId: $('input[name=order_detail_id]').val(),
      // 契約者番号
      contractId: $('input[name=contract_id]').val(),
      // 最短配送可能日
      nearestDate: $('input[name=nearest_date]').val(),
      // 60日以上の最大延長可能日
      dateLimit: $('input[name=date_limit]').val()
    })
  }

  /**
   * Premium Water の無料最大延長可能日
   * 
   * @pram {Object} deliveryModel 配送スケジュール情報
   */
  retrieveMaxBreakTime(deliveryModel) {

    const params = {
      method: "POST",
      followRedirects: false,
      muteHttpExceptions: true,
      headers: {
        "Cookie": this.cookie,
        "x-requested-with": "XMLHttpRequest"
      },
      payload: {
        delivery_date: deliveryModel.previousDeliveryDate
      }
    };

    const breakTimeResponse = UrlFetchApp.fetch(Consts.PW_BREAK_TIME_URL, params);
    return new Date(JSON.parse(breakTimeResponse.getContentText()).data.next_delivery_date_break);
  }

  /**
   * Premium Water の次回配送日を変更する
   * 
   * @pram {Object} deliveryModel 配送スケジュール情報
   */
  extendDeliveryDate(deliveryModel) {

    const params = {
      method: "POST",
      followRedirects: false,
      muteHttpExceptions: true,
      headers: {
        "Cookie": this.cookie
      },
      payload: {
        form_action: "edit_delivery_cycle",
        order_detail_id: deliveryModel.orderDetailId,
        long_term_delivery_day_break_time: deliveryModel.previousDeliveryDate,
        next_delivery_time: "1",
        next_set_quantity: "1",
        delivery_cycle_id: "6",
        cycle_week: "7",
        delivery_time_id: "1",
        delivery_set_quantity: "1",
        action: "save",
        contract_id: deliveryModel.contractId,
        nearest_date: deliveryModel.nearestDate,
        date_limit: deliveryModel.dateLimit,
        delivery_date: nextDeliveryDateStr,
        next_delivery_date: nextDeliveryDateStr
      }
    };

    UrlFetchApp.fetch(Consts.PW_EDIT_TIME_URL, params);
    console.log(`次回配送日： ${params.payload.delivery_date}`);
  }
}

/**
 * Time Tree のクライアント
 * https://developers.timetreeapp.com/ja/docs/api/calendar-app
 */
class TimeTreeClient {

  /**
   * 次回配送日を登録する
   * 
   * @pram {String} deliveryDateStr 配送日（yyyy-mm-dd）
   */
  static registerDeliveryDate() {

    const params = {
      method: "POST",
      followRedirects: false,
      muteHttpExceptions: true,
      headers: {
        "Accept": "application/vnd.timetree.v1+json",
        "Authorization": `Bearer ${Config.TT_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify({
        data: {
          attributes: {
            category: "schedule",
            title: "Premium Water 配送日",
            all_day: false,
            start_at: `${deliveryDateStr}T00:00:00.000Z`,
            end_at: `${deliveryDateStr}T03:00:00.000Z`,
            description: "Google Apps Script から自動登録。"
          },
          relationships: {
            label: {
              data: {
                id: Config.TT_LABEL_ID,
                type: "label"
              }
            }
          }
        }
      }),
    };

    UrlFetchApp.fetch(Consts.TT_EVENTS_URL, params);
    console.log("TimeTree に次回配送日時を登録完了。");
  }
}
