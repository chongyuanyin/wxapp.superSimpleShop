var app = getApp();

Page({
    "data": {
        "items": [],
        "inEditMode": false,
        "selected": [],
        "quantity": []
        },

    reload: function() {
        var items = [];
        var quantity = [];
        for (var i=0; i<app.deals.length; i++) {
            if (app.deals[i].inCartQuantity > 0) {
                items.push(app.deals[i]);
                quantity.push(
                    // "pid": app.deals[i].pid,
                    // "qty": app.deals[i].inCartQuantity
                    app.deals[i].inCartQuantity
                );
            }
        }
        // console.log(items);
        this.setData({
            "items": items,
            "quantity": quantity
        });
    },

    onLoad: function() {
        this.reload();
    },

    onShow: function() {
        this.reload();
    },

    selectItems: function(e) {
        // console.log(e.detail);
        this.data.selected = e.detail.value;
    },

    deleteItems: function(e) {
        var items = [];
        for (var i=0; i<app.deals.length; i++) {
            for (var j=0; j<this.data.selected.length; j++) {
                if (app.deals[i].pid == this.data.selected[j]) {
                    app.deals[i].inCartQuantity = 0;
                    break;
                }
            }
        }

        app.saveData();
        this.reload();
    },

    edit: function() {
        if (this.data.inEditMode) {
            var items = [];
            for (var i=0; i<app.deals.length; i++) {
                for (var j=0; j<this.data.items.length; j++) {
                    if (app.deals[i].pid == this.data.items[j].pid) {
                        app.deals[i].inCartQuantity = this.data.quantity[j];
                    }
                }
            }

            this.reload();

            this.setData({
                "inEditMode": false
            });

            console.log(app.deals);
        } else {
            this.setData({
                "inEditMode": true
            });
        }
    },

    editQty: function(e) {
        var ind = parseInt(e.currentTarget.id.slice(3));
        this.data.quantity[ind] = e.detail.value;
        console.log(this.data.quantity);
    },

    pay: function(e) {
        console.log("before pay");
        wx.requestPayment({
          timeStamp: +new Date(),
          nonceStr: '9999999',
          package: 'prepay_id=123456',
          signType: 'MD5',
          paySign: 'String3',
          success: function(res){
            console.log("success");
          },
          fail: function() {
            console.log("fail");
          },
          complete: function() {
            console.log("done");
          }
        });
        console.log("after pay");
    }
})