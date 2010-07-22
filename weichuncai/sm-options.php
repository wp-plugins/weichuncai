<div class="wrap">
<?php
$wcc = get_option('sm-weichuncai');
if($_POST['subnotice']){
	$wcc = get_option('sm-weichuncai');
	$wcc['notice'] = 	$_POST['notice'];
	$wcc['adminname'] = 	$_POST['adminname'];
	$wcc['isnotice'] = 	$_POST['isnotice'];
	$wcc['ques'] =		$_POST['ques'];
	$wcc['ans'] =		$_POST['ans'];
	$wccnew = $_POST['wccnew'];
	if($wccnew != ''){
		$wcc['lifetime'][$wccnew] =	time();
		$wcc['ccs'][] = $wccnew;
	}
	update_option('sm-weichuncai', $wcc);
	$msg = __('设置已保存!', 'weichuncai');
}elseif($_POST['editchuncai']){
	$wcc = get_option('sm-weichuncai');
	$wcc['defaultccs'] = $_POST['defaultccs'];
	update_option('sm-weichuncai', $wcc);
	$msg = __('春菜更新成功!', 'weichuncai');
}

if($_GET['del']){
	$id = $_GET['ccsid'];
	$pic = get_pic_path($wcc['ccs'][$id]);
	foreach($pic as $k=>$v){
		if(file_exists($v)){@unlink($v);}
	}
	$dir = dirname(__FILE__).'/skin/'.$wcc['ccs'][$id].'/';
	@rmdir($dir);
	unset($wcc['lifetime'][$wcc['ccs'][$id]]);
	unset($wcc['ccs'][$id]);
	update_option('sm-weichuncai', $wcc);
	echo '<script>window.location.href="?page=weichuncai/sm-options.php";</script>';
}
if($_POST['additional']){
	$wcc['foods'] = $_POST['foods'];
	$wcc['eatsay'] = $_POST['eatsay'];
	update_option('sm-weichuncai', $wcc);
	$msg = __('附加设置更新成功!', 'weichuncai');
}
if(isset($msg)){
	echo '<div id="message" class="updated fade"><p>'.$msg.'</p></div>';
}
?>
<h1><?php _e("伪春菜控制面板", "weichuncai"); ?></h1>
<hr>
<form action="" method="post">
<h4><?php _e("设置默认春菜", "weichuncai"); ?></h4>
<p>
<?php
	foreach($wcc['ccs'] as $k=>$v){
		if($v == $wcc['defaultccs']){
			echo '<div style="float:left;padding:3px;text-align:center; width:168px;"><img src="../wp-content/plugins/weichuncai/skin/'.$v.'/face1.gif"><p><input type="radio" name="defaultccs" value="'.$v.'" checked> '.$v.'</p></div>';
		}else{
			$isdelcc = __("删除？", "weichuncai");
			echo '<div style="float:left;padding:3px;text-align:center; width:168px;position:relative;"><img src="../wp-content/plugins/weichuncai/skin/'.$v.'/face1.gif"><p><input type="radio" name="defaultccs" value="'.$v.'"> '.$v.'(<a href="?page=weichuncai/sm-options.php&del=del&ccsid='.$k.'">'.$isdelcc.'</a>)</p></div>';
		}
	}
?>
</p>


<p style="clear:left;" class="submit"><input class="button-primary" type="submit" name="editchuncai" value="<?php _e('更新春菜', 'weichuncai'); ?>"></p>
</form>

<hr>
<h4><?php _e('春菜基本设置', 'weichuncai'); ?></h4>
<form action="" method="post">
	<label>1. <?php _e('你希望伪春菜如何称呼你呢？', 'weichuncai'); ?></label>
	<p><input type="text" name="adminname" value="<?php echo $wcc['adminname']; ?>"></p>
	<!--label>2. <?php _e('是否默认显示公告(选是的话打开博客是伪春菜不说话而是先显示博客公告)', 'weichuncai'); ?></label>
	<p>
<?php
	if($wcc['isnotice'] == 1){
?>
		<input type="radio" name="isnotice" value="1" checked> <?php _e('默认显示公告 ', 'weichuncai'); ?>
		<input type="radio" name="isnotice" value="0"> <?php _e('默认不显示公告', 'weichuncai'); ?>
<?php
	}else{
?>
		<input type="radio" name="isnotice" value="1"> <?php _e('默认显示公告 ', 'weichuncai'); ?>
		<input type="radio" name="isnotice" value="0" checked> <?php _e('默认不显示公告', 'weichuncai'); ?>
<?php
	}
?>
	</p-->
	<label>3. <?php _e('公告：', 'weichuncai'); ?></label>
	<p><textarea name="notice" cols="40" rows="7"><?php echo $wcc['notice']; ?></textarea></p>

	<label>4. <?php _e('对话回应', 'weichuncai'); ?><p style="color:red">(<?php _e('在这里设置了问题与回答后，在前台的聊天功能中输入相关问题伪春菜就会回答，如输入：早上好，伪春菜会回答：“早上好～”,暂时最多只支持5个问答', 'weichuncai'); ?>)</p></label>
<?php
	$i = 1;
	foreach($wcc['ques'] as $k=>$v){
		echo '<p>问'.$i.'：<input type="text" name="ques['.$k.']" value="'.$v.'"> 答'.$i.'：<input type="text" name="ans['.$k.']" value="'.$wcc["ans"][$k].'"></p>';
		$i++;
	}
?>

<h4><?php _e('添加新春菜', 'weichuncai'); ?></h4>
<label><label><?php _e('说明步骤：', 'weichuncai'); ?></label>
					<p>1. <?php _e('先在本地新建文件夹，在文件夹中添加你们喜欢的角色图片，文件命名格式为face1.gif / face2.gif / face3.gif', 'weichuncai'); ?></p>
					<p>2. <?php _e('上传新春菜的皮肤文件夹到插件目录下的skin目录', 'weichuncai'); ?></p>
					<p>3. <?php _e('在下面“新春菜名字”输入春菜名字（跟你上传的文件夹名字相同）', 'weichuncai'); ?></p>
<p><p style="color:red"><?php _e('注意：', 'weichuncai'); ?></p>
<p>1.<?php _e('图片一定要是GIF格式，大小为宽:160px 高:160px.', 'weichuncai'); ?></p>
			<p>2.<?php _e('face1.gif对应普通状态下的表情，face2.gif对应高兴时的表情，face3对应悲伤时春菜的表情。', 'weichuncai'); ?></p>
<p>3. <?php _e('图片可以只有一张，但一定要命名成face1.gif', 'weichuncai'); ?></p></p></label>
<label><?php _e('新春菜名字：', 'weichuncai'); ?><input type="text" name="wccnew"></label>

<p class="submit"><input class="button-primary" type="submit" name="subnotice" value="<?php _e('更新设置', 'weichuncai'); ?>"></p>
</form>
<hr>
<h4><?php _e('附加设置', 'weichuncai'); ?></h4>

<form action="" method="post">
	<label><?php _e('零食：', 'weichuncai'); ?>
<?php
	$fom = 1;
	for($fo=0; $fo < 5; $fo++){
		echo '<p>'.__('零食', 'weichuncai').$fom.'：<input type="text" name="foods['.$fo.']" value="'.$wcc["foods"][$fo].'"> '.__('回答', 'weichuncai').$fom.'：<input type="text" name="eatsay['.$fo.']" value="'.$wcc["eatsay"][$fo].'"></p>';
		++$fom;
	}
?>
	</label>
<p class="submit"><input class="button-primary" type="submit" name="additional" value="<?php _e('保存附加设置', 'weichuncai'); ?>" /></p>
</form>
<hr>
<h4><?php _e('基本状态', 'weichuncai'); ?></h4>
<?php
	foreach($wcc['lifetime'] as $key=>$val){
		$lifetime = get_wcc_lifetime($wcc['lifetime'][$key]);
		echo '<p>'.__('春菜', 'weichuncai').' <font color="red">'.$key.'</font> '.__("已经与主人一起生存了 ", "weichuncai").$lifetime["day"].__(" 天 ", "weichuncai").$lifetime["hours"].__(" 小时 ", "weichuncai").$lifetime["minutes"].__(" 分钟 ", "weichuncai").$lifetime["seconds"].__(" 秒的快乐时光。", "weichuncai").'</p>';
	}
?>

<p>
</p>
</div>
