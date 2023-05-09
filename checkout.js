
function postToFlutterClient(data){
    flutterClient.postMessage(JSON.stringify(data));
}

function showpaymentModal(squadPayload){
    squadPay(squadPayload)
}

function squadPay(payload) {
    try{
        const squadInstance = new squad({
          onClose: () =>  postToFlutterClient({"returnToClient": true, "message": "SDK closed..."}),
          onLoad: () =>  postToFlutterClient({"returnToClient": false, "message": "SDK initialized...."}),
          onSuccess: () =>  postToFlutterClient({"returnToClient": true, "message": "Success..."}),
          key: payload.key,
          email: payload.email,
          amount: payload.amount,
          transaction_ref: payload.transactionRef,
          currency_code: payload.currencyCode,
          payment_channels: payload.paymentChannels || [],
          customer_name: payload.customerEmail || null,
          callback_url: payload.callback_url || null,
          metadata: payload.metadata || null,
          pass_charge: payload.passCharge || false
    
        });
        squadInstance.setup();
        squadInstance.open();

    }
    catch(e){
        postToFlutterClient({"returnToClient": true, "message": "Error initializing SDK..."});
    }
  
}







