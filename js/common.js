var smjq = jQuery;
var _typei = 0;
var weichuncai_text = '';
smjq(document).ready(function(){
    var getwidth = smWCC.getCookie("historywidth");
    var getheight = smWCC.getCookie("historyheight");
    if(getwidth != null && getheight != null){
        var width = getwidth;
        var height = getheight;
    }else{
        var width = document.documentElement.clientWidth- 200 - imagewidth;
        var height = document.documentElement.clientHeight- 180 - imageheight;
        if(parseInt(height) > 2000) {
            var height = smjq(window).height() - 180 - imageheight;
        }
    }

    var cwidth = document.documentElement.clientWidth-100;
    var cheight = document.documentElement.clientHeight-20;
    var moveX = 0;
    var moveY = 0;
    var moveTop = 0;
    var moveLeft = 0;
    var moveable = false;
    var docMouseMoveEvent = document.onmousemove;
    var docMouseUpEvent = document.onmouseup;

    smjq("body").append('<div id="smchuncai" onfocus="this.blur();" style="color:#626262;z-index:99999;"><div id="chuncaiface"></div><div id="dialog_chat"><div id="chat_top"></div><div id="dialog_chat_contents"><div id="dialog_chat_loading"></div><div id="tempsaying"></div><div id="showchuncaimenu"><ul class="wcc_mlist" id="shownotice">显示公告</ul><ul class="wcc_mlist" id="chatTochuncai">聊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天</ul><ul class="wcc_mlist" id="foods">吃 零 食</ul><ul class="wcc_mlist" id="blogmanage">博客后台</ul><ul class="wcc_mlist" id="lifetimechuncai">生存时间</ul><ul class="wcc_mlist" id="closechuncai">关闭春菜</ul></div><div><ul id="chuncaisaying"></ul></div><div id="getmenu"> </div></div><div id="chat_bottom"></div></div></div>');
    smjq("#smchuncai").append('<div id="addinput"><div id="inp_l"><input id="talk" type="text" name="mastersay" onkeydown="if(event.keyCode==13){smWCC.submitTalk(this);}" value="" /> <input id="talkto" type="button" value=" " /></div><div id="inp_r"> X </div></div>');
    smjq("body").append('<div id="callchuncai">召唤春菜</div>');
    //判断春菜是否处于隐藏状态
    var is_closechuncai = smWCC.getCookie("is_closechuncai");
    if(is_closechuncai == 'close'){
        smWCC.closechuncai_init();
    }
    //设置初始状态
    smWCC.getdata("getnotice");
    smWCC.setFace(1);

    smjq("#smchuncai").css('left', width+'px');
    smjq("#smchuncai").css('top', height+'px');
    smjq("#smchuncai").css('width', imagewidth+'px');
    smjq("#smchuncai").css('height', imageheight+'px');
    smjq("#callchuncai").attr("style", "top:"+cheight+"px; left:"+cwidth+"px; text-align:center;");

    smcc = document.getElementById("smchuncai");
    smcc.onmousedown = function(){
        var ent = smWCC.getEvent();
        moveable = true;
        moveX = ent.clientX;
        moveY = ent.clientY;
        var obj = document.getElementById("smchuncai");
        moveTop = parseInt(obj.style.top);
        moveLeft = parseInt(obj.style.left);
        if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
            window.getSelection().removeAllRanges();
        }			
        document.onmousemove = function(){
            if(moveable){
                var ent = smWCC.getEvent();
                var x = moveLeft + ent.clientX - moveX;
                var y = moveTop + ent.clientY - moveY;
                var w = 200;
                var h = 200;	//w,h为浮层宽高
                obj.style.left = x + "px";
                obj.style.top = y + "px";
            }
        };
        document.onmouseup = function(){
            if(moveable){
                var historywidth = obj.style.left;
                var historyheight = obj.style.top;
                historywidth = historywidth.replace('px', '');
                historyheight = historyheight.replace('px', '');
                smWCC.setCookie("historywidth", historywidth, 60*60*24*30*1000);
                smWCC.setCookie("historyheight", historyheight, 60*60*24*30*1000);
                document.onmousemove = docMouseMoveEvent;
                document.onmouseup = docMouseUpEvent;
                moveable = false; 
                moveX = 0;
                moveY = 0;
                moveTop = 0;
                moveLeft = 0;
            }
        }
    };
    smjq("#getmenu").click(function(){
            smWCC.chuncaiMenu();
            smWCC.setFace(1);
            });
    smjq("#shownotice").click(function(){
            smWCC.getdata("getnotice");
            smWCC.setFace(1);
    });
    smjq("#closechuncai").click(function(){
            smWCC.setFace(3);
            smWCC.closechuncai();
            });
    smjq("#callchuncai").click(function(){
            smWCC.setFace(2);
            smWCC.callchuncai();
            smWCC.setCookie("is_closechuncai", '', 60*60*24*30*1000);
            });
    smjq("#shownotice").click(function(){
            smWCC.setFace(1);
            smWCC.closeChuncaiMenu();
            });
    smjq("#lifetimechuncai").click(function(){
            smWCC.closeChuncaiMenu();
            smWCC.closeNotice();
            smWCC.setFace(2);
            smWCC.getdata('showlifetime');
            });
    smjq("#chatTochuncai").click(function(){
            smWCC.showInput();
            });
    smjq("#inp_r").click(function(){
            smWCC.closeInput();
            smWCC.chuncaiSay('不聊天了吗？(→_→)');
            smWCC.setFace(3);
            });
    smjq("#talkto").click(function(){
            smWCC.getdata("talking");
            });
    smjq("#blogmanage").click(function(){
            smWCC.closeChuncaiMenu();
            smWCC.closeNotice();
            smjq("#getmenu").css("display", "none");
            smWCC.chuncaiSay("马上就跳转到后台管理页面去了哦～～～");
            smWCC.setFace(2);
            setTimeout(function(){
                window.location.href = path+'/wp-admin/';
                }, 2000);
            });
    smjq("#foods").click(function(){
            smWCC.closeChuncaiMenu();
            smWCC.closeNotice();
            smWCC.getdata("foods");
            });
    document.onmousemove = function(){
        smWCC.stoptime();
        smWCC.tol = 0;
        smWCC.setTime();
        //smWCC.chuncaiSay("啊，野生的主人出现了！ ～～～O口O");
    }
    smWCC.talkSelf(smWCC.talktime);
    document.getElementById("smchuncai").onmouseover = function(){
        if(smWCC.talkobj){
            clearTimeout(smWCC.talkobj);
        }
        smWCC.talktime = 0;
        smWCC.talkSelf(smWCC.talktime);
    }
});


!function($) {
    var smWCC = function() {
        this.talktime = 0;
        //设置自言自语频率（单位：秒）
        this.talkself = 60;
        this.talkobj;
        this.tsi = 0;
        this.talkself_arr = [
            ["白日依山尽，黄河入海流，欲穷千里目，更上.....一层楼？", "1"],
            ["我看见主人熊猫眼又加重了！", "3"],
            ["我是不是很厉害呀～～？", "2"],
            ["5555...昨天有个小孩子跟我抢棒棒糖吃.....", "3"],
            ["昨天我好像看见主人又在众人之前卖萌了哦～", "2"]
        ];
        this.timenum;
        this.tol=0;
        //10分钟后页面没有响应就停止活动
        this.goal = 10*60;
        this.eattimes = 0;
    }

    smWCC.prototype = {
        constructor: smWCC,
        getEvent: function() {
            return window.event || arguments.callee.caller.arguments[0];
        },
        eatfood: function(obj){
            var gettimes = this.getCookie("eattimes");
            if(parseInt(gettimes) > parseInt(9)){
                this.chuncaiSay("主人是个大混蛋！！");
                this.setFace(3);
                this.closechuncai_evil();
            }else if(parseInt(gettimes) > parseInt(7)){
                this.chuncaiSay(".....................肚子要炸了，死也不要再吃了～～！！！TAT");
                this.setFace(3);
            }else if(parseInt(gettimes) == parseInt(5)){
                this.chuncaiSay("我已经吃饱了，不要再吃啦......");
                this.setFace(3);
            }else if(parseInt(gettimes) == parseInt(3)){
                this.chuncaiSay("多谢款待，我吃饱啦～～～ ╰（￣▽￣）╭");
                this.setFace(2);
            }else{
                var id = obj.replace("f",'');
                this.getdata('eatsay', id);
            }
            this.eattimes++;
            this.setCookie("eattimes", this.eattimes, 60*10*1000);
        },
        chuncaiMenu: function(){
            this.clearChuncaiSay();
            this.closeInput();
            this.chuncaiSay("准备做什么呢？");
            smjq("#showchuncaimenu").css("display", "block");
            smjq("#getmenu").css("display", "none");
            smjq("#chuncaisaying").css("display", "none");
        },
        closeChuncaiMenu: function(){
            this.clearChuncaiSay();
            smjq("#showchuncaimenu").css("display", "none");
            this.showNotice();
            smjq("#getmenu").css("display", "block");
        },
        showNotice: function(){
            smjq("#chuncaisaying").css("display", "block");
        },
        closechuncai: function(){
            this.stopTalkSelf();
            this.chuncaiSay("记得再叫我出来哦...");
            smjq("#showchuncaimenu").css("display", "none");
            setTimeout(function(){
                    smjq("#smchuncai").fadeOut(1200);
                    smjq("#callchuncai").css("display", "block");}, 2000);
            //保存关闭状态的春菜
            this.setCookie("is_closechuncai", 'close', 60*60*24*30*1000);
        },
        closechuncai_evil: function(){
            this.stopTalkSelf();
            smjq("#showchuncaimenu").css("display", "none");
            setTimeout(function(){
                    smjq("#smchuncai").fadeOut(1200);
                    smjq("#callchuncai").css("display", "block");}, 2000);
        },
        closechuncai_init: function(){
            this.stopTalkSelf();
            smjq("#showchuncaimenu").css("display", "none");
            setTimeout(function(){
                    smjq("#smchuncai").css("display", "none");
                    smjq("#callchuncai").css("display", "block");}, 30);
        },
        callchuncai:function(){
            this.talkSelf(this.talktime);
            smjq("#smchuncai").fadeIn('normal');
            smjq("#callchuncai").css("display", "none");
            this.closeChuncaiMenu();
            this.closeNotice();
            this.chuncaiSay("我回来啦～");
            this.setCookie("is_closechuncai", '', 60*60*24*30*1000);
        },
        chuncaiSay: function(s){
            this.clearChuncaiSay();
            smjq("#tempsaying").append(s);
            smjq("#tempsaying").css("display", "block");
            weichuncai_text = s;
            this.typeWords();
        },
        clearChuncaiSay: function(){
            document.getElementById("tempsaying").innerHTML = '';
        },
        closeNotice: function(){
            smjq("#chuncaisaying").css("display", "none");
        },
        showInput: function(){
            this.closeChuncaiMenu();
            this.closeNotice();
            this.chuncaiSay("............?");
            smjq("#addinput").css("display", "block");
        },
        closeInput: function(){
            this.setFace(3);
            smjq("#addinput").css("display", "none");
        },
        clearInput: function(){
            document.getElementById("talk").value = '';
        },
        createFace: function(a, b, c){
            smjq("head").append('<div id="hiddenfaces"><img id="hf1" src="'+a+'" /><img id="hf2" src="'+b+'" /><img id="hf3" src="'+c+'" /></div>');
            this.setFace(1);
        },
        setFace: function(num){
            obj = document.getElementById("hf"+num).src;
            smjq("#chuncaiface").attr("style", "background:url("+obj+") no-repeat scroll 50% 0% transparent; width:"+imagewidth+"px;height:"+imageheight+"px;");
        },
        getdata: function(el, id){
            var p = this;
            smjq.ajax({
                type:	'GET',
                url:	path+'/?a=getdata',
                cache:	'false',
                dataType: 'html',
                contentType: 'application/json; charset=utf8',
                beforeSend: function(){
                    //smjq("#dialog_chat").fadeOut("normal");
                    smjq("#tempsaying").css('display', "none");
                    smjq("#dialog_chat_loading").fadeIn("normal");
                },
                success: function(data){
                    smjq("#dialog_chat_loading").css('display', "none");
                    //smjq("#dialog_chat").fadeIn("normal");
                    smjq("#tempsaying").css('display', "");
                    var dat = eval("("+data+")");
                    if(el == 'defaultccs'){
                        p.chuncaiSay(dat.defaultccs);
                    }else if(el == 'getnotice'){
                        p.chuncaiSay(dat.notice);
                        p.setFace(1);
                    }else if(el == 'showlifetime'){
                        p.chuncaiSay(dat.showlifetime);
                    }else if(el == 'talking'){
                        var talkcon = smjq("#talk").val();
                        var i = p.in_array(talkcon, dat.ques);
                        var types = typeof(i);
                        if(types != 'boolean'){
                            p.chuncaiSay(dat.ans[i]);
                            p.setFace(2);
                        }else{
                            p.chuncaiSay('.......................嗯？');
                            p.setFace(3);
                        }
                        p.clearInput();
                    }else if(el == 'foods'){
                        var str='';
                        var arr = dat.foods;
                        var preg = /function/;	
                        for(var i in arr){
                            if(arr[i] != '' && !preg.test(arr[i]) ){
                                str +='<ul id="f'+i+'" class="eatfood" onclick="smWCC.eatfood(this.id)">'+arr[i]+'</ul>';
                            }
                        }
                        p.chuncaiSay(str);
                    }else if(el = "eatsay"){
                        var str = dat.eatsay[id];
                        p.chuncaiSay(str);
                        p.setFace(2);
                    }else if(el = "talkself"){
                        var arr = dat.talkself;
                        return arr;
                    }
                },
                error: function(){
                    p.chuncaiSay('好像出错了，是什么错误呢...请联系管理猿');
                }
                });
        },
        in_array: function(str, arr){
            for(var i in arr){
                if(arr[i] == str){
                    return i;
                }
            }
            return false;
        },
        setTime: function(){
            this.tol++;
            this.timenum = window.setTimeout("smWCC.setTime('"+this.tol+"')", 1000);
            if(parseInt(this.tol) == parseInt(this.goal)){
                this.stopTalkSelf();
                this.closeChuncaiMenu();
                this.closeNotice();
                this.closeInput();
                this.chuncaiSay("主人跑到哪里去了呢....");
                this.setFace(3);
                this.stoptime();
            }
        },
        stoptime: function(){
            if(this.timenum){
                clearTimeout(this.timenum);
            }
        },
        talkSelf: function(talktime){
            talktime++;
            var tslen = this.talkself_arr.length;
            var yushu = talktime % this.talkself;
            if(parseInt(yushu) == parseInt(9)){
                this.closeChuncaiMenu();
                this.closeNotice();
                this.closeInput();
                this.tsi = Math.floor(Math.random() * this.talkself_arr.length + 1)-1;
                this.chuncaiSay(this.talkself_arr[this.tsi][0]);
                this.setFace(this.talkself_arr[this.tsi][1]);
            }
            this.talkobj = window.setTimeout("smWCC.talkSelf("+talktime+")", 1000);
        },
        stopTalkSelf: function(){
            if(this.talkobj){
                clearTimeout(this.talkobj);
            }
        },
        arrayShuffle: function(arr){
            var result = [],
            len = arr.length;
            while(len--){
                result[result.length] = arr.splice(Math.floor(Math.random()*(len+1)),1);
            }
            return result;
        },
        typeWords: function() {
            var p = 1;
            var str = weichuncai_text.substr(0,_typei);
            var w = weichuncai_text.substr(_typei,1);
            if(w=="<"){
                str += weichuncai_text.substr(_typei,weichuncai_text.substr(_typei).indexOf(">")+1);
                p= weichuncai_text.substr(_typei).indexOf(">")+1;
            }
            _typei+=p;
            document.getElementById("tempsaying").innerHTML = str;
            txtst = setTimeout("smWCC.typeWords()",20);
            if (_typei> weichuncai_text.length){
                clearTimeout(txtst);
                _typei = 0;
            }
        },
        setCookie: function(name, val, ex){
            var times = new Date();
            times.setTime(times.getTime() + ex);
            if(ex == 0){
                document.cookie = name+"="+val+";";
            }else{
                document.cookie = name+"="+val+"; expires="+times.toGMTString();
            }
        },
        getCookie: function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));   
            if(arr != null) return unescape(arr[2]); return null;
        },
        submitTalk: function() {
            this.getdata("talking");
        }
    }

    window.smWCC = new smWCC();
}(window.jQuery);
