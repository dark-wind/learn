/**
 * Created by darkwindcc on 17-4-22.
 */

var serve = 'http://192.168.1.114:8000';

//前端登陆代码
function login() {
    var name = $api.byId('username').value;
    var pwd = $api.byId('password').value;
    if (name == "") {
        api.toast({
            msg: '请输入用户名！'
        });
        $api.byId('username').focus();
        return;
    }
    if (pwd == "") {
        api.toast({
            msg: '请输入密码！'
        });
        $api.byId('password').focus();
        return;
    }
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });

    //获取用户信息
    api.ajax({
        url: serve + '/user/login',
        method: 'post',
        data: {
            values: {
                email: name,
                password: pwd
            },
        }
    }, function (ret, err) {
        if (ret) {
            if (ret.role == 'user') {
                api.openWin({
                    name: 'user',
                    url: './html/user/user_common.html',
                    animation: {
                        type: "push", //动画类型（详见动画类型常量）
                        duration: 400 //动画过渡时间，默认300毫秒
                    }
                });
            } else if (ret.role == 'admin') {
                api.openWin({
                    name: 'society',
                    url: './html/society/society_common.html',
                    animation: {
                        type: "push", //动画类型（详见动画类型常量）
                        duration: 400 //动画过渡时间，默认300毫秒
                    }
                });
            } else {
                api.alert({msg: JSON.stringify(ret.error)});
            }
        } else {
            api.alert({msg: JSON.stringify(err)});
        }
    });

    api.hideProgress();


}

function activeAdd() {
    var title = '';
    var content = '';
    var address = '';
    var time = '';
    var type = '';
}

function societyCreate() {
    var name = $api.byId('name').value;
    var logo = '12';
    var label = '死神，完美主义';
    var note = $api.byId('note').value;
    var type = 'music';
    // var type = $api.byId('type').value;
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
        url: serve + '/user/login',
        method: 'post',
        data: {
            values: {
                name: name,
                logo: logo,
                label: label,
                note: note,
                type: type,
            },
        }
    }, function (ret, err) {
        if (ret) {
            api.alert({msg: ret.msg});
            if (ret.code == 'ok') {
                api.openWin({
                    name: 'active',
                    url: 'society_active.html',
                    animation: {
                        type: "push", //动画类型（详见动画类型常量）
                        duration: 400 //动画过渡时间，默认300毫秒
                    }
                });
            }
        } else {
            api.alert({msg: JSON.stringify(err)});
        }
    });

    api.hideProgress();


}