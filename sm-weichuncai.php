<?php 
/*
 * Plugin Name: WP伪春菜
 * Plugin URI: http://www.lmyoaoa.com/inn/?p=3134
 * Description: 为了WP的萌化，特制伪春菜插件一枚!
 * Version: 1.1
 * Author: lmyoaoa(油饼小明猪)
 * Author URI: http://www.lmyoaoa.com
 */

load_plugin_textdomain('weichuncai', PLUGINDIR . '/' . dirname(plugin_basename(__FILE__)) . '/lang');
$wcc = get_option('sm-weichuncai');

//获得春菜的详细数据与js交互
function dataToJs(){
	global $wcc;
	if($_GET['a'] == 'getdata'){
		$lifetime = get_wcc_lifetime($wcc['lifetime'][$wcc['defaultccs']]);
		$wcc['showlifetime'] = '我已经与主人 '.$wcc["adminname"].' 一起生存了 <font color="red">'.$lifetime["day"].'</font> 天 <font color="red">'.$lifetime["hours"].'</font> 小时 <font color="red">'.$lifetime["minutes"].'</font> 分钟 <font color="red">'.$lifetime["seconds"].'</font> 秒的快乐时光啦～*^_^*';
		$wcc = json_encode($wcc);
		echo $wcc;
		die();
	}
}
add_action('init', 'dataToJs');

//获得春菜
function get_chuncai(){
	echo '<link rel="stylesheet" type="text/css" href="wp-content/plugins/weichuncai/css/style.css">';
	echo '<script src="wp-content/plugins/weichuncai/js/common.js"></script>';
	$wcc = get_option('sm-weichuncai');
	if($wcc == ''){
		sm_init();
		$wcc = get_option('sm-weichuncai');
	}
	$path = 'wp-content/plugins/weichuncai/skin/'.$wcc[defaultccs].'/';
	$fpath1 = plugins_url('weichuncai/skin/'.$wcc[defaultccs].'/face1.gif');
	$fpath2 = plugins_url('weichuncai/skin/'.$wcc[defaultccs].'/face2.gif');
	$fpath3 = plugins_url('weichuncai/skin/'.$wcc[defaultccs].'/face3.gif');
	$fpath2 = file_exists($path.'face2.gif') ? $fpath2 : $fpath1;
	$fpath3 = file_exists($path.'face3.gif') ? $fpath3 : $fpath1;

	$notice_str = '&nbsp;&nbsp;'.$wcc['notice'].'<br />';
	echo '	<script>var path = "'.get_bloginfo('siteurl').'";
		window.onload=function(){var notice=document.getElementById("chuncaisaying"); notice.innerHTML=""; notice.innerHTML="'.$notice_str.'";
		createFace("'.$fpath1.'", "'.$fpath2.'", "'.$fpath3.'");
		}
		</script>';
}

add_filter('wp_head', 'get_chuncai');
wp_enqueue_script('jquery');
add_action('admin_menu', 'chuncaiadminPage');


function chuncaiadminPage(){
	$wcc = get_option('sm-weichuncai');
	if($wcc == ''){
		sm_init();
		$wcc = get_option('sm-weichuncai');
	}
	//////////去除第一版的默认春菜中华娘 V1.1以上版本使用= =///////////
/*	if(!empty($wcc[lifetime]['中华娘'])){
		unset($wcc[lifetime]['中华娘']);
		foreach($wcc['ccs'] as $k=>$v){
			if($v == '中华娘'){
				unset($wcc['ccs'][$k]);
			}
		}
		update_option('sm-weichuncai', $wcc);
	}
 */
	///////////++END++//////////
	if(function_exists('add_options_page')){
		add_options_page(__('伪春菜控制面板', "weichuncai"), __('伪春菜控制面板', "weichuncai"), 9, 'weichuncai/sm-options.php');
	}
}

//默认的春菜设置
function sm_init(){
	global $wcc;
	$lifetime = time();
	$wcc = array(
		'notice'=>'主人暂时还没有写公告呢，这是主人第一次使用伪春菜吧',
		'adminname'=>'',
		'isnotice'=>'',
		'ques'=>array('早上好', '中午好', '下午好', '晚上好', '晚安'),
		'ans'=>array('早上好～', '中午好～', '下午好～', '晚上好～', '晚安～'),
		'lifetime'=>array(
			'rakutori'=>$lifetime,
			'neko'=>$lifetime,
			'chinese_moe'=>$lifetime,
			),
		'ccs'=>array('rakutori','neko','chinese_moe'),
		'defaultccs'=>'rakutori',
		'foods'=>array('金坷垃', '咸梅干'),
		'eatsay'=>array('吃了金坷垃，一刀能秒一万八～！', '吃咸梅干，变超人！哦耶～～～'),
		'talkself'=>array(
			0=>array('嘎哦～','1'),
			),
	);
	update_option('sm-weichuncai', $wcc);
}

//获得伪春菜生存时间
function get_wcc_lifetime($starttime){
	$endtime = time();
	$lifetime = $endtime-$starttime;
	$day = intval($lifetime / 86400);
	$lifetime = $lifetime % 86400;
	$hours = intval($lifetime / 3600);
	$lifetime = $lifetime % 3600;
	$minutes = intval($lifetime / 60);
	$lifetime = $lifetime % 60;
	return array('day'=>$day, 'hours'=>$hours, 'minutes'=>$minutes, 'seconds'=>$lifetime);
}
function get_pic_path($name){
	$fpath1 = dirname(__FILE__).'/skin/'.$name.'/face1.gif';
	$fpath2 = dirname(__FILE__).'/skin/'.$name.'/face2.gif';
	$fpath3 = dirname(__FILE__).'/skin/'.$name.'/face3.gif';
	return array($fpath1, $fpath2, $fpath3);
}

function isset_face($array){
	foreach($array as $k=>$v){
		if(file_exists($v)){
			$narr[] = $v;
		}
	}
	if(empty($narr)){
		echo '<script>alert("'._e("您没有上传表情，暂时无法使用伪春菜的说").'");</script>>';
	}else{
		return $narr;
	}
}
?>
