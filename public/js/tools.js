var ajaxUrl = '';
if (location.host.search('testqymk') > -1) {
    ajaxUrl = 'https://testqymk.cmicrwx.cn/'
        // ajaxUrl = "http://localhost:8080/testApi/"
} else if (location.host.search('localhost') > -1) {
    ajaxUrl = 'https://testqymk.cmicrwx.cn/'
        // ajaxUrl = "http://localhost:8080/testApi/"
} else {
    ajaxUrl = '/'
}

function getSerialRsa(orgdata, attArr) {
    //除了默认的，要加密的属性(数组)
    var orgdataObj = {};
    var newOrgData = '';
    //var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9lJvRhrvCgKnLQv58ZM2aHPor flwl6Qf+eLjErx1CZFwEBYJH1vwa57vygUKv4ZtTBV2myCgi0a6/mSuqEcxtrkZs VbS28/KiNy9RtPi/Q2lNEr6nP8Qz3D8/F0QlB+kSYVHX1Rq1+ytwplvTJl4LYASB YAEhJD8N+XwbzSCV8wIDAQAB';
    var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDy+VWRStA4DS2WnhoP2ZlpDplsH 00wXUCT8ySt/TaxIHFx4ZK/WXMYTpqVeLSc4Jt2GQh/KUGFKLUI7NSaYozglsBgQ CvcROKEBhNFKxazKL2pWTtcXdrmUG00Kk7ekPjqX/chJI5QXwNYtLuLA2FrwMwAv D4MqhlChbcohWwOdQIDAQAB';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    orgdata = orgdata.split('&');
    for (var i = 0; i < orgdata.length; i++) {
        var item = orgdata[i].split('=');
        if (item[0] == 'password' || item[0] == 'repassword' || item[0] == 'account' || item[0] == 'phone') {
            item[1] = encrypt.encrypt(item[1]);
            item[1] = encodeURIComponent(encodeURIComponent(item[1]));
        }
        if (attArr) {
            for (var j = 0; j < attArr.length; j++) {
                if (item[0] == attArr[j]) {
                    item[1] = encrypt.encrypt(item[1]);
                    item[1] = encodeURIComponent(encodeURIComponent(item[1]));
                }
            }
        }
        newOrgData = newOrgData + item.join("=") + "&";
    }
    newOrgData = newOrgData.slice(0, -1);
    return newOrgData;
}

function getSingleRsa(data) {
    // var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9lJvRhrvCgKnLQv58ZM2aHPor flwl6Qf+eLjErx1CZFwEBYJH1vwa57vygUKv4ZtTBV2myCgi0a6/mSuqEcxtrkZs VbS28/KiNy9RtPi/Q2lNEr6nP8Qz3D8/F0QlB+kSYVHX1Rq1+ytwplvTJl4LYASB YAEhJD8N+XwbzSCV8wIDAQAB';
    var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDy+VWRStA4DS2WnhoP2ZlpDplsH 00wXUCT8ySt/TaxIHFx4ZK/WXMYTpqVeLSc4Jt2GQh/KUGFKLUI7NSaYozglsBgQ CvcROKEBhNFKxazKL2pWTtcXdrmUG00Kk7ekPjqX/chJI5QXwNYtLuLA2FrwMwAv D4MqhlChbcohWwOdQIDAQAB';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    data = encrypt.encrypt(data);
    data = encodeURIComponent(data);
    return data;
}

function getPhoneNum(callback) {
    var test = (location.href.search('/qymk.cmicrwx.cn/') == -1) && (location.href.search('/grayqymk.cmicrwx.cn/') == -1) && (location.href.search('/testqymk.cmicrwx.cn/') == -1) ;
    var appId = test ? "000314" : "300011965167";
    var version = '1.2';
    var sign = YDRZ.getSign(appId, version);
    var newSign;
    var info = {
            preSign: sign
        }
        //window.console.log(info.preSign);
    $.ajax({
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        url: ajaxUrl + "api/cmpp/getSign",
        type: 'post',
        data: JSON.stringify(info),
    }).then(function(res) {
        res = getJson(res);
        if (!res.data.sign) {
           window.console.log('取号错误1：', res);
            callback(false);
            return;
        }
        newSign = res.data.sign;
        var YDRZ_data = {
            version: version,
            appId: appId,
            sign: newSign,
            openType: '1',
            expandParams: 'phoneNum=13802885443',
            isTest: test ? '0' : '1',
        };
        //window.console.log('YDRZ_data',YDRZ_data);
        YDRZ.getTokenInfo({
            data: YDRZ_data,
            success: function(res) {
                if (res.code == "000000") {
                    var info = {
                        token: res.token,
                        userInformation: res.userInformation
                    };
                    // callback(info);
                    $.ajax({
                        dataType: 'json',
                        headers: { 'Content-Type': 'application/json;charset=utf8' },
                        url: ajaxUrl + 'api/cmpp/getUserInfo',
                        type: 'post',
                        data: JSON.stringify(info)
                    }).then(function(res) {
                       window.console.log(res);
                        res = getJson(res);
                        if (res.resultCode == 0) {
                            callback(res.data);
                        } else {
                           window.console.log('取号错误2：', res);
                            callback(false);
                        }
                    })
                } else {
                   window.console.log('取号错误3：', res);
                    callback(false);
                }
            },
            error: function(res) {
               window.console.log('取号错误4：', res);
                callback(false);
            }
        })
    }, function(err) {
       window.console.log('取号错误5：', err);
        callback(false);
    })

    function getJson(data) {
        if (typeof data === "string") {
            try {
                data = data === "" ? {} : JSON.parse(data);
            } catch (err) {
               window.console.log("data数据格式错误", err)
                data = {};
            }
        }
        return data;
    }
}

function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function init_login() {
    if (sessionStorage.getItem("getPhoneFlag")) {
        return false;
    } else {
        sessionStorage.setItem("getPhoneFlag", true);
    }
    var verifyId = ''; //图形验证码
    var pop = $('.pop').pop();
    //账号登录体系
    var phone, phoneMask, token;
    if (is_weixin()) {
        //openid是否第一次登录
        $.ajax({
            url: '/mobile.php/index/isFL_openid/channel/lsc',
            type: 'post',
        }).then(function(res) {
           window.console.log(res);
            //不是第一次登陆
            if (res.status !== 1) {
                //是否正式账号
                $.ajax({
                    url: '/mobile.php/index/isOfficial/channel/lsc',
                    type: 'post',
                }).then(function(res) {
                    //不是正式账号
                    res = getJson(res);
                   window.console.log(res.status)
                    if (res.status !== 1) {
                        startGetPhone();
                    }
                })
            } else {
                startGetPhone();
            }
        })

        function startGetPhone() {
            //智能取号之后的流程
            getPhoneNum(function(res, account) {
               window.console.log(res)
                    //是否取号成功
                if (res) {
                    phone = res.mobile;
                    phoneMask = res.body.msisdnmask;
                    token = account.token;
                    //手机号是否已有账号
                    if (account && account.phone) {
                        pop.addClass('pop-bindTip').open('', getInterfaceHtml(phoneMask, 2));
                        $(".pop-bindTip").find(".pop-change-num").on("click", function() {
                           window.console.log("换号码");
                            changePhone(function(res, phone) {
                                res = getJson(res);
                               window.console.log(res)
                               window.console.log("确定");
                                $.ajax({
                                    url: '/mobile.php/subscriber/bind_phone/channel/lsc',
                                    type: 'post',
                                    data: {
                                        phone: getSingleRsa(phone),
                                        token: res.account.token
                                            //来自phone_verify的token
                                    }
                                }).then(function(res) {
                                    if (res.status === 1) {
                                       window.console.log("覆盖成功")
                                        window.location.href = location.href
                                    } else {
                                       window.console.log("覆盖失败")
                                    }
                                    pop.close();
                                })
                            }, function() {
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".confirm").on("click", function() {
                           window.console.log("覆盖为手机账号信息");
                           window.console.log(phone)
                            $.ajax({
                                url: '/mobile.php/subscriber/bind_phone/channel/lsc',
                                type: 'post',
                                data: {
                                    // phone:getSingleRsa(phone),
                                    phone: phone,
                                    token: token
                                        //来自mobileR的token
                                }
                            }).then(function(res) {
                                if (res.status === 1) {
                                   window.console.log("覆盖成功")
                                    window.location.href = location.href
                                } else {
                                   window.console.log("覆盖失败")
                                }
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".deny").on("click", function() {
                           window.console.log("保持非正式账号");
                            pop.close();
                        })
                    } else {
                        pop.addClass('pop-bindTip').open('', getInterfaceHtml(phoneMask, 1));
                        $(".pop-bindTip").find(".pop-change-num").on("click", function() {
                           window.console.log("换号码");
                            changePhone(function(res, phone) {
                               window.console.log("确定");
                                res = getJson(res);
                                $.ajax({
                                    url: '/mobile.php/subscriber/bind_phone/channel/lsc',
                                    type: 'post',
                                    data: {
                                        phone: phone,
                                        // phone:getSingleRsa(phone),
                                        token: res.account.token
                                    }
                                }).then(function(res) {
                                    if (res.status === 1) {
                                       window.console.log("绑定成功")
                                    } else {
                                       window.console.log("绑定失败")
                                    }
                                    pop.close();
                                })
                            }, function() {
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".confirm").on("click", function() {
                           window.console.log("绑定");
                            $.ajax({
                                url: '/mobile.php/subscriber/bind_phone/channel/lsc',
                                type: 'post',
                                data: {
                                    phone: phone,
                                    // phone:getSingleRsa(phone),
                                    token: token
                                }
                            }).then(function(res) {
                                if (res.status === 1) {
                                   window.console.log("绑定成功")
                                } else {
                                   window.console.log("绑定失败")
                                }
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".deny").on("click", function() {
                           window.console.log("保持非正式账号");
                            pop.close();
                        })
                    }
                }
            })
        }
    } else {
        //非微信
        if (localStorage.getItem("notFirstTime")) {
            //不是第一次
            //是否正式账号
            $.ajax({
                url: '/mobile.php/subscriber/isOfficial/channel/lsc',
                type: 'post',
            }).then(function(res) {
                res = getJson(res);
                //不是正式账号
                if (res.status !== 1) {
                    startGetPhone();
                }
            })
        } else {
            //第一次
            localStorage.setItem("notFirstTime", true);
            startGetPhone();
        }

        function startGetPhone() {
            //智能取号之后的流程
            getPhoneNum(function(res, account) {
               window.console.log(res)
                    //是否取号成功
                    // if (true) {
                if (res) {
                    phone = res.mobile; //已加密的phone
                    phoneMask = res.body.msisdnmask;
                    token = account.token;
                    //手机号是否已有账号
                    if (account && account.phone) {
                        pop.addClass('pop-bindTip').open('', getInterfaceHtml(phoneMask, 4));
                        $(".pop-bindTip").find(".pop-change-num").on("click", function() {
                           window.console.log("换号码");
                            changePhone(function(res, phone) {
                               window.console.log("确定");
                                res = getJson(res);
                                $.ajax({
                                    url: '/mobile.php/subscriber/phoneLogin/channel/lsc',
                                    type: 'post',
                                    data: {
                                        phone: getSingleRsa(phone),
                                        token: res.account.token
                                    }
                                }).then(function(res) {
                                    if (res.status === 1) {
                                       window.console.log("登录成功")
                                        window.location.href = location.href
                                    } else {
                                        alert("登录失败")
                                    }
                                    pop.close();
                                })
                            }, function() {
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".confirm").on("click", function() {
                           window.console.log("登录正式账号");
                            $.ajax({
                                url: '/mobile.php/subscriber/phoneLogin/channel/lsc',
                                type: 'post',
                                data: {
                                    phone: phone,
                                    // phone:getSingleRsa(phone),
                                    token: token
                                }
                            }).then(function(res) {
                                if (res.status === 1) {
                                   window.console.log("登录成功");
                                    window.location.href = location.href;
                                } else {
                                    alert("登录失败")
                                }
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".deny").on("click", function() {
                           window.console.log("生成游客账号");
                            pop.close();
                        })
                    } else {
                        pop.addClass('pop-bindTip').open('', getInterfaceHtml(phoneMask, 3));
                        $(".pop-bindTip").find(".pop-change-num").on("click", function() {
                           window.console.log("换号码");
                            changePhone(function(res, phone) {
                               window.console.log("确定");
                                res = getJson(res);
                                $.ajax({
                                    url: '/mobile.php/subscriber/phoneLogin/channel/lsc',
                                    type: 'post',
                                    data: {
                                        phone: getSingleRsa(phone),
                                        token: res.account.token
                                    }
                                }).then(function(res) {
                                    if (res.status === 1) {
                                       window.console.log("登录成功")
                                        window.location.href = location.href;
                                    } else {
                                        alert("登录失败")
                                    }
                                    pop.close();
                                })
                            }, function() {
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".confirm").on("click", function() {
                           window.console.log("生成正式账号");
                            $.ajax({
                                url: '/mobile.php/subscriber/phoneLogin/channel/lsc',
                                type: 'post',
                                data: {
                                    phone: phone,
                                    // phone:getSingleRsa(phone),
                                    token: token
                                }
                            }).then(function(res) {
                                if (res.status === 1) {
                                   window.console.log("登录成功")
                                    window.location.href = location.href;
                                } else {
                                    alert("登录失败")
                                }
                                pop.close();
                            })
                        })
                        $(".pop-bindTip").find(".deny").on("click", function() {
                           window.console.log("生成游客账号");
                            pop.close();
                        })
                    }
                }
            })
        }

    }

    //获取图形验证码
    function getImgCode(ele) {
        $.ajax({
            type: 'post',
            // url: '{:U("Subscriber/java_getVerifyCode")}',
            url: '/mobile.php/subscriber/java_getverifycode',
            dataType: 'json',
            success: function(res) {
                res = typeof res === "string" ? res == "" ? {} : JSON.parse(res) : res;
                if (res.resultCode === 0) {
                    ele.attr('src', res.data.verifyCodeStr);
                    verifyId = res.data.verifyId;
                } else {
                    layer.msg('无法获取图形验证码');
                }
            },
            error: function() {
                layer.msg('无法获取图形验证码');
            }
        })
    }

    // 获取手机验证码
    function getcode(ele, type) {
        $(ele).click(function() {
            var that = $(this),
                parent = that.closest('.pop-content');
            if (that.hasClass('disabled')) { return false; }
            var phone = $.trim(parent.find('.account').val());
            parent.find('.pop-error').stop(true).fadeOut(200).text('');
            if (phone && /^1[34578][0-9]{9}$/.test(phone)) {
                // ajax
                var imgcode = $.trim(parent.find("#imgCodeInput").val());
                if (!imgcode) {
                    parent.find('.pop-error').stop(true).fadeIn(200).text('请输入图形验证码');
                    return false;
                }
                $.ajax({
                    type: "POST",
                    url: checkaccount,
                    data: { account: getSingleRsa(phone) },
                    dataType: "json",
                    success: function(data) {
                       window.console.log(data);
                        // if(data.status === 1){
                        if (data.code && type != 1) {
                            parent.find('.pop-error').stop(true).fadeIn(200).text('该手机已被占用');
                            return false;
                        } else {
                            $.ajax({
                                type: "POST",
                                url: java_sendcodeurl,
                                data: {
                                    phone: getSingleRsa(phone),
                                    verifyCode: imgcode,
                                    verifyId: verifyId
                                },
                                dataType: "json",
                                success: function(data) {
                                    if (data.status === 1) {
                                        clock(ele);
                                    } else {
                                        parent.find('.pop-error').stop(true).fadeIn(200).text(data.msg);
                                    }
                                },
                                error: function() {
                                    alert("服务器错误");
                                    return false;
                                }
                            });
                        }
                    },
                    error: function() {
                        alert("服务器错误");
                        return false;
                    }
                });
            } else {
                parent.find('.pop-error').stop(true).fadeIn(200).text('请输入正确的手机号');
            }
            return false;
        });
    }

    //弹出切换手机页面并绑定事件
    function changePhone(confFun, denyFun) {
        pop.removeClass('pop-bindTip').addClass('pop-login-phone').open('', getInterfaceHtml(phoneMask, 5));
        getImgCode($('.pop-login-phone').find(".img-code"));
        $('.pop-login-phone').find(".img-code").on("click", function() {
            getImgCode($(this));
        })
        getcode($('.pop-login-phone').find(".get-code"))
        $('.pop-login-phone').find(".btn-clear").on("click", function() {
            $(this).siblings("input").val("");
        })
        $(".pop-login-phone").find(".confirm").on("click", function() {
            phone = $.trim($(".pop-login-phone").find(".account").val());
            var codeInput = $.trim($("#codeInput").val());
            if (phone && /^1[34578][0-9]{9}$/.test(phone)) {
                $.ajax({
                    url: '/mobile.php/index/phone_verify/channel/lsc',
                    type: 'post',
                    data: {
                        account: getSingleRsa(phone),
                        verify: codeInput
                    }
                }).then(function(res) {
                    res = getJson(res);
                    if (res.status == 1) {
                        confFun(res, phone);
                    } else {
                        $(".pop-content").find('.pop-error').stop(true).fadeIn(200).text('验证错误');
                    }
                })
            } else {
                $(".pop-content").find('.pop-error').stop(true).fadeIn(200).text('请输入正确的手机号');
            }
        })
        $(".pop-login-phone").find(".deny").on("click", function() {
            denyFun();
        })
    }

    function getInterfaceHtml(phoneMask, type) {
        var str = '';
        var text = [
            ['使用' + phoneMask + '作为绑定手机号,保障账号安全。', '绑定，更安全', '下次吧'],
            ['手机号' + phoneMask + '已注册账号,是否关联并获取已有账号信息', '是', '否'],
            ['使用' + phoneMask + '作为登录手机号，立即获得1000积分，开启不差钱的人生？', '拿积分', '下次吧'],
            ['手机' + phoneMask + '已作为账号存在，是否直接登录？', '是', '否'],
        ];
        type = type - 1;
        switch (type) {
            case 0:
                ;
            case 1:
                ;
            case 2:
                ;
            case 3:
                str = '<div class="pop-login-bg"></div><div class="pop-content">' + text[type][0] + '</div><div class="pop-change-num">换其他号码</div><div><div class="pop-btn confirm">' + text[type][1] + '</div><div class="pop-btn deny">' + text[type][2] + '</div></div>';
                break;
            case 4:
                str = '<div class="pop-login-bg"></div><div class="pop-content"><div class="pop-input-row"><div class="pop-img-wrapper"><img src="/Public/Mobile/images/login_phone.png"></div><div class="pop-input-wrapper"><input type="text" class="account" placeholder="请输入手机号"><img class="btn-clear" src="/Public/Mobile/images/closed_icon.png"></div></div><div class="pop-input-row"><div class="pop-img-wrapper"><img src="/Public/Mobile/images/login_code.png"></div><div class="pop-input-wrapper"><input type="text" id="imgCodeInput" placeholder="请输入图片验证码"><img class="img-code" src=""></div></div><div class="pop-input-row"><div class="pop-img-wrapper"><img src="/Public/Mobile/images/login_code.png"></div><div class="pop-input-wrapper"><input type="text" id="codeInput" placeholder="请输入验证码"><div class="get-code">获取验证码</div></div></div><div class="pop-error"></div></div><div><div class="pop-btn confirm">确定</div><div class="pop-btn deny">下次吧</div></divdiv>';
                break;
        }
        return str;
    }

    function getJson(data) {
        if (typeof data === "string") {
            try {
                data = data === "" ? {} : JSON.parse(data);
            } catch (err) {
               window.console.log("data数据格式错误", err)
                data = {};
            }
        }
        return data;
    }
}

function collectFunc(id) {
    //window.console.log(id);
    $.ajax({
        url: '/mobile.php/count/count/game_id/100/channel/lsc',
        type: 'post',
        dataType: 'json',
        data: {
            game_id: id,
            channel: 'lsc'
        },
        success: function(data) {
           window.console.log('统计成功', id);
        },
        error: function() {

        }
    })
}
