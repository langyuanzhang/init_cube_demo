# init_cube_demo
使用滴滴cube-ui 开发vue项目的基础环境



###### 服务器根据code获取微信用户授权信息

```php 
class Api extends Controller
{
    public $configData='aaa';//微信这里声明

	public function _initialize()
	{
      	header('Access-Control-Allow-Origin:*');//允许所有来源访问
        header('Access-Control-Allow-Method:POST,GET');//允许访问的方式
        $this->configData=111;//微信这里赋值
	}
  
  	/**
     * 服务器端获取code测试
     */
    public function test(){

        //scope=snsapi_userinfo实例
        $appid='wxde6f061ac193e843';
        $redirect_uri = urlencode ( 'http://lzwz.ggyyun.com/index.html');
        $url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=$appid&redirect_uri=$redirect_uri&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        header("Location:".$url);
        // return 1;
    }

    /**
     * 根据code获取openid等个人信息
     */
    public function testgetUserInfo(){
 
        $appid = "wxde6f061ac193e843";   
        $secret = "e40341c1dc3c74645646f7139585468e";  
        $code = $_GET["code"];
        
        //第一步:取得openid和access_token
        $oauth2Url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$secret&code=$code&grant_type=authorization_code";
        $oauth2 = $this->getJson($oauth2Url);
        
        //第二步:根据全局access_token和openid查询用户信息  
        $access_token = $oauth2["access_token"];  
        $openid = $oauth2['openid']; 
        $get_user_info_url = "https://api.weixin.qq.com/sns/userinfo?access_token=$access_token&openid=$openid&lang=zh_CN";
        $userinfo = $this->getJson($get_user_info_url);

        //业务部分，用户信息插入或更新数据库
        $user=Db::name('wx_user')->where('openid', $userinfo['openid'])->find();
		return json_code(200,'请求成功',$user);
        
    }
    /**发送网络请求 */
    public function getJson($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        return json_decode($output, true);
    }
}

```