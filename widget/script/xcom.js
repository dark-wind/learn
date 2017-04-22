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
            //todo 删除
            ret.role = 'user';
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
    var type = $api.byId('society-type').value;
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
        url: serve + '/society/add',
        method: 'post',
        data: {
            values: {
                name: name,
                logo: logo,
                label: label,
                note: note,
                type: type
            },
        }
    }, function (ret, err) {
        if (ret) {
            if (ret.code == 'ok') {
                api.openWin({
                    name: 'active',
                    url: 'society_my_society.html',
                    animation: {
                        type: "push", //动画类型（详见动画类型常量）
                        duration: 400 //动画过渡时间，默认300毫秒
                    }
                });
            }
        } else {
            api.alert({msg: '添加失败，服务器可能开小差了'});
        }
    });

    api.hideProgress();
}

function SocietyList() {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
        url: serve + '/society/list',
        method: 'get',
        data: {
            values: {
                page: 1,
                limit: 10
            },
        }
    }, function (ret, err) {

        if (ret) {
            var html = '';
            for (x in ret.data) {
                html += ''
                    + '<div class="aui-media-list-item-inner" onclick="confirm(' + ret.data[x].id + ')">'
                    + '<div class="aui-list-item-media">'
                    + '<img src="../../image/logo/12.png" class="aui-img-round aui-list-img-sm">'
                    + '</div>'
                    + '<div class="aui-list-item-inner aui-list-item-arrow">'
                    + '<div class="aui-list-item-text">'
                    + '<div class="aui-list-item-title aui-font-size-14">' + ret.data[x].name + '</div>'
                    + '<div class="aui-list-item-right">' + ret.data[x].hot + '</div>'
                    + '</div>'
                    + '<div class="aui-list-item-text">'
                    + ret.data[x].note
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $api.html($api.byId('society-list'), html);
            }
        } else {
            api.alert({msg: '刷新失败，服务器可能开小差了'});
        }
    });

    api.hideProgress();

}

function confirm(id) {
    var title = '确认加入';
    var msg = '确认加入该社团';
    api.confirm({
        title: title,
        msg: msg,
        buttons: ['确定', '取消']
    }, function (ret, err) {
        if (ret.buttonIndex == 1) {
            api.alert({msg: '已确认'});
            join(id);

        }
    });
}

function join(id) {
    api.ajax({
        url: serve + '/society/apply',
        method: 'post',
        data: {
            values: {
                society_id: id,
            },
        }
    }, function (ret, msg) {
        api.alert({msg: JSON.stringify(ret)});
        if (ret) {
            if (ret.code == 'ok') {
                api.openWin({
                    name: 'society',
                    url: 'users_my_society.html',
                    animation: {
                        type: "push", //动画类型（详见动画类型常量）
                        duration: 400 //动画过渡时间，默认300毫秒
                    }
                });
            }
        }
    });
}

function UserSociety() {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: '先喝杯茶...',
        modal: false
    });
    api.ajax({
        url: serve + '/user/list',
        method: 'get',
        data: {
            values: {
                // page: 1,
                // limit: 10
            },
        }
    }, function (ret, err) {

        if (ret) {
            var html = '';
            for (x in ret.data) {
                html += ''
                    + '<div class="aui-media-list-item-inner" >'
                    + '<div class="aui-list-item-media">'
                    + '<img src="../../image/logo/12.png" class="aui-img-round aui-list-img-sm">'
                    + '</div>'
                    + '<div class="aui-list-item-inner aui-list-item-arrow">'
                    + '<div class="aui-list-item-text">'
                    + '<div class="aui-list-item-title aui-font-size-14">' + ret.data[x].name + '</div>'
                    + '<div class="aui-list-item-right">' + ret.data[x].hot + '</div>'
                    + '</div>'
                    + '<div class="aui-list-item-text">'
                    + ret.data[x].note
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $api.html($api.byId('society-list'), html);
            }
        } else {
            api.alert({msg: '刷新失败，服务器可能开小差了'});
        }
    });

    api.hideProgress();
}