
var UserData = {
    name: "小逗逼",
    level: 1,
    vip: false
};

var Base64;

cc.Class({
    extends: cc.Component,

    properties: {
        btn_storage:{
            default: null,
            type: cc.Button
        },
        btn_read: {
            default: null,
            type: cc.Button
        },
        btn_remove: {
            default: null,
            type: cc.Button
        },
        btn_clear: {
            default: null,
            type: cc.Button
        },
        label_control: {
            default: null,
            type: cc.Label
        },
        label_cipherData: {
            default: null,
            type: cc.Label
        },
        label_decryptionData: {
            default: null,
            type: cc.Label
        },
        userdata_name:{
            default: null,
            type: cc.EditBox
        },
        userdata_level:{
            default: null,
            type: cc.EditBox
        },
        userdata_vip:{
            default: null,
            type: cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function () {
        this.userdata_name.string = UserData.name;
        this.userdata_level.string = UserData.level;
        this.userdata_vip.string = UserData.vip;
        Base64 = require("base64");
    },

    _readData: function () {
        var label_cipherData_text = "";
        var label_decryptionData_text = "";
        var dataText, decryptionText;
        for(var k in UserData) {
            var dataText = cc.sys.localStorage.getItem(k);
            if (dataText === null) {
                break;
            }
            decryptionText = decodeURI(atob(dataText));
            // Decrypt
            label_cipherData_text += k + ":" + dataText + "\n";
            label_decryptionData_text += k + ":" + decryptionText + "\n";
        }
        this.label_cipherData.string = label_cipherData_text;
        this.label_decryptionData.string = label_decryptionData_text;
    },

    saveUserDataEvent: function () {
        UserData.name = this.userdata_name.string;
        UserData.level = this.userdata_level.string;
        UserData.vip = this.userdata_vip.string;
        // Encrypt
        var dataText = JSON.stringify(UserData);
        var ciphertext;
        for(var k in UserData) {
            ciphertext = btoa(encodeURI(UserData[k]));
            cc.sys.localStorage.setItem(k, ciphertext);
        }
        this.label_control.string = "存储用户数据";
        this.label_cipherData.string = "存储完毕";
        this.label_decryptionData.string = "存储完毕";
    },
    
    readUserDataEvent: function () {
        this.label_control.string = "读取用户数据";
        this._readData();
    },

    removeUserDataEvent: function () {
        cc.sys.localStorage.removeItem("vip");
        this.label_control.string = "移除用户数据";
        this._readData();
    },

    clearUserDataEvent: function () {
        cc.sys.localStorage.clear();
        this.label_control.string = "清空用户数据";
        this._readData();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
