const crypto = require('crypto');
function getOption(userId) {
    let partnerCode = "MOMOOKYG20220406";
    let partnerClientId = userId;
    let accessKey = "PIARbaEf2koobiAd";
    let secretkey = "kGNK3Eo7sqrRZzXKfrBSpDD3rvwcYd6t";
    let requestId = partnerCode + new Date().getTime();
    let orderId = requestId;
    let orderInfo = "Figure Pro Package";
    let redirectUrl = "http://localhost:3000/payment/momo_callBack";
    let ipnUrl = "http://localhost:3000/payement/momo_callBack";
    let amount = "250000";
    let requestType = "captureWallet"
    let extraData = "";
    let rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerClientId=" + partnerClientId + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    let signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        partnerClientId: partnerClientId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'vi'
    });
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    return {options,requestBody};
}
module.exports = {getOption};