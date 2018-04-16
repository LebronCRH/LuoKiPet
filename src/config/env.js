/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''; 
let routerMode = 'history';
let imgBaseUrl = 'http://120.78.183.108:6786/Images/ServiceShop/';
let socketBaseUrl='http://www.joingp.com:3000/';


if (process.env.NODE_ENV == 'development') {
	baseUrl='http://120.78.183.108:6786';
	// baseUrl='http://localhost:8084';

}else if(process.env.NODE_ENV == 'production'){

	baseUrl='http://120.78.183.108:6786';
	// baseUrl='http://localhost:8084';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	socketBaseUrl,
}