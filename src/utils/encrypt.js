// const CryptoJS = require('crypto-js');  //引用AES源码js
import CryptoJS from 'crypto-js'; //引用AES源码js
//window.console.log(CryptoJS);
// const key = CryptoJS.enc.Utf8.parse("1de23e756aaf3cc2"); //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('1de23e756aaf3cc2'); //十六位十六进制数作为密钥偏移量

// //解密方法
// export function Decrypt(word) {
//     let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
//     let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//     let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//     let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//     return decryptedStr.toString();
// }

// //加密方法
// export function Encrypt(word) {
//     let srcs = CryptoJS.enc.Utf8.parse(word);
//     let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
//     return encrypted.ciphertext.toString().toUpperCase();
// }

var key = CryptoJS.enc.Latin1.parse('1de23e756aaf3cc2');
var iv = CryptoJS.enc.Latin1.parse('1de23e756aaf3cc2');

export function Encrypt(word) {
    var encrypted = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
}
export function Decrypt(word) {
    var key = CryptoJS.enc.Utf8.parse("1de23e756aaf3cc2");
    var decrypted = CryptoJS.AES.decrypt(word, key, { iv: iv, padding: CryptoJS.pad.ZeroPadding });
    return decrypted.toString(CryptoJS.enc.Utf8)
}