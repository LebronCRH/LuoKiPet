import HelloWorld from '@/components/HelloWorld'
// Page Components
import Home from '@/page/home/home.vue'
import Guide from '@/page/home/guide.vue'
import Community from '@/page/home/childrens/community/community.vue'
import Petservice from '@/page/home/childrens/petservice/petservice.vue'
import ServiceShopDetails from '@/page/petservice/childrens/serviceshopdetails.vue'
import TicketBag from '@/page/petservice/childrens/ticketbag.vue'
import PetserviceIndex from '@/page/petservice/petserviceIndex.vue'
import ServiceDetails from '@/page/petservice/childrens/childrens/servicedetails.vue'
import ChangeLocation from '@/page/petservice/childrens/changelocation.vue'
import ConfirmOrder from '@/page/petservice/childrens/childrens/confirmorder.vue'
import ChangeOrderPhone from '@/page/petservice/childrens/childrens/changeorderphone.vue'
import Profile from '@/page/home/childrens/profile/profile.vue'
import Mall from '@/page/home/childrens/mall/mall.vue'
import articleIndex from '@/page/article/articleIndex.vue'
import petshowDetails from '@/page/petshow/childrens/petshowdetails.vue'
import petshowIndex from '@/page/petshow/petshowIndex.vue'
import ShopMap from '@/page/petservice/childrens/childrens/shopmap.vue'
import ShopStreetscape from '@/page/petservice/childrens/childrens/shopstreetscape.vue'
import loginIndex from '@/page/login/index.vue'
import OtherLogin from '@/page/login/otherlogin.vue'
import CreateUserFirst from '@/page/login/createuserfirst.vue'
import CreateUserSecond from '@/page/login/createusersecond.vue'
import CreateUserThirdly from '@/page/login/createuserthirdly.vue'
import ForgetPasswordFirst from '@/page/login/forgetpasswordfirst.vue'
import ForgetPasswordSecond from '@/page/login/forgetpasswordsecond.vue'
import ForgetPasswordThirdly from '@/page/login/forgetpasswordthirdly.vue'
import Login from '@/page/login/login.vue'
import LuoKiFriend from '@/page/luokifriend/index.vue'
import P2PChat from '@/page/luokifriend/P2PChat.vue'
import FriendChat from '@/page/luokifriend/friendchat.vue'
import CreatePhoto from '@/page/Release/CreatePhoto.vue'
import Setting from '@/page/home/childrens/profile/childrens/setting.vue' 
import Address from '@/page/home/childrens/profile/childrens/address.vue' 
import MyServiceOrder from '@/page/home/childrens/profile/childrens/myserviceorder.vue' 
import OrderDetails from '@/page/home/childrens/profile/childrens/orderdetails.vue' 
import EditAddress from '@/page/home/childrens/profile/childrens/editaddress.vue' 
import CreateArticle from '@/page/Release/CreateArticle.vue'
import CreateArticleQuill from '@/page/Release/CreateArticleQuill.vue'
import ManagerCreateArticle from '@/page/Release/ManagerCreateArticle.vue'
import ArticleView from '@/page/Release/ArticleView.vue'
import PetCategoryIndex from '@/page/petcategory/petcategoryIndex.vue'
import PetCategoryDetails from '@/page/petcategory/childrens/petcategorydetails.vue'
import ShareServiceShopDetails from '@/page/share/shareserviceshopdetails.vue'//服务店分享页面
//宠物帮助界面
import PetHelperIndex from '@/page/pethelper/pethelperIndex.vue'
import CeShi from '@/page/pethelper/ceshi.vue'
import PetSerach from '@/page/pethelper/petserach.vue'
import PetSeek from '@/page/pethelper/petseek.vue'
import PetActive from '@/page/pethelper/petactive.vue'
import PetAdopt from '@/page/pethelper/petadopt.vue'
import SwiperCeshi from '@/page/pethelper/swiperceshi.vue'
import App from '../App'
//我的宠物界面
import AddMyPet from '@/page/mypet/addpet.vue'
import PetCategorySelect from '@/page/mypet/petcategoryselect.vue'

//文章界面
import ArticleCategoryDetailsIndex from '@/page/article/articlecategorydetailsIndex.vue'
import ArticleCategoryDetails from '@/page/article/articlecategorydetails.vue'

// Routes
export default [
  { path: '/', component: App,
    children:[
    {
      path:'',
      component:Guide,
    },
    { 
      name:'home',
    	path: '/home', 
      component: Home,
      children: [{
            path:'community', //商铺安全认证页
            components:{
            	Conter:Community
            },
            },{
            path:'petservice', //商铺安全认证页
            components: {
            	Conter:Petservice
            },
            meta: { HeadStatus: true },
            },{
            path:'profile',
            components:{
              Conter:Profile
            },
            children:[{
              path:'setting',
              component:Setting,
              meta: { requiresAuth: true,keepAlive:false },
            },{
              name:'myserviceorder',
              path:'myserviceorder',
              component:MyServiceOrder,
              meta: { HeadStatus: true,keepAlive:true },
            },{
              path:'orderdetails/:orderid',
              component:OrderDetails,
              meta: { HeadStatus: true,keepAlive:false },
            },{
              path:'address',
              component:Address,
              children: [{
                path:'editaddress',
                component:EditAddress
              }]
            }]
            },{
              path:'mall',
              components:{
                Conter:Mall
              }
            }]
    },
    {
      path:'/petserviceIndex',
      component:PetserviceIndex,
      meta: { HeadStatus: true },
      children:[{
        path:'serviceshopdetails/:shopid',
        component:ServiceShopDetails,
        children: [{
          name:'servicedetails',
          path:'servicedetails/:serviceid',
          component:ServiceDetails,
          children:[{
            path:'confirmorder',
            component:ConfirmOrder,
            meta: { requiresAuth: true },
            children:[{
              path:'changeorderphone',
              component:ChangeOrderPhone
            }]
          }]
        },{
          path:'confirmorder',
          component:ConfirmOrder,
          children:[{
            path:'changeorderphone',
            component:ChangeOrderPhone
          }]
        },{
          path:'shopmap',
          component:ShopMap,
          meta: { HeadStatus: true },
          children:[{
            path:'shopstreetscape',
            component:ShopStreetscape
          }]
        }]
      },{
        path:'ticketbag',
        component:TicketBag,
        meta: { HeadStatus: true },
      },{
        // name:'changelocation',
        path:'changelocation',
        component:ChangeLocation,
        meta: { HeadStatus: true },
      }]
    },
    {
      name:'petcategoryIndex',
      path:'/petcategoryIndex',
      component:PetCategoryIndex,
      children:[{
        name:'petcategoryDetails',
        path:'petcategoryDetails/:petcateid',
        component:PetCategoryDetails
      }]
    },
    {
      name:'articleIndex',
      path:'/articleIndex',
      component:articleIndex,
    },
    {
      name:'petshowIndex',
      path:'/petshowIndex',
      component:petshowIndex,
      children:[{
        name:'petshowdetails',
        path:'petshowdetails/:detailsid',
        component:petshowDetails
      }]
    },
    {
      name:'loginIndex',
      path:'/loginIndex',
      component:loginIndex,
    },
    {
      name:'createuserfirst',
      path:'/createuserfirst',
      component:CreateUserFirst,
    },
    {
      name:'createusersecond',
      path:'/createusersecond',
      component:CreateUserSecond,
    },
    {
      name:'createuserthirdly',
      path:'/createuserthirdly',
      component:CreateUserThirdly
    },
    {
      name:'forgetpasswordfirst',
      path:'/forgetpasswordfirst',
      component:ForgetPasswordFirst,
    },
    {
      name:'forgetpasswordsecond',
      path:'/forgetpasswordsecond/:Phone',
      component:ForgetPasswordSecond,
    },
    {
      name:'forgetpasswordthirdly',
      path:'/forgetpasswordthirdly/:Phone',
      component:ForgetPasswordThirdly
    },
    {
      name:'login',
      path:'/login',
      component:Login
    },
    {
      name:'otherlogin',
      path:'/otherlogin',
      component:OtherLogin
    },
    {
      name:'luokifriend',
      path:'/luokifriend',
      component:LuoKiFriend,
      meta: { HeadStatus: true },
    },
    {
      name:'friendchat',
      path:'/friendchat',
      component:FriendChat
    },
    {
      name:'createphoto',
      path:'/createphoto',
      component:CreatePhoto,
      meta: { requiresAuth: true,HeadStatus: true}
    },
    {
      name:'createarticle',
      path:'/createarticle',
      component:CreateArticleQuill,
      meta: { requiresAuth: true,HeadStatus: true}
    },
    {
      name:'managercreatearticle',
      path:'/managercreatearticle',
      component:ManagerCreateArticle,
      meta: { requiresAuth: true,HeadStatus: true}
    },
    {
      name:'articleview',
      path:'/articleview',
      component:ArticleView
    },
    {
      name: 'chat',
      path: '/chat/:sessionId',
      component:P2PChat,
      meta: { HeadStatus: true },
    },
    {//服务店分享页面
      name:'shareserviceshopdetails',
      path:'/shareserviceshopdetails/:shopid',
      component:ShareServiceShopDetails,
    },
    {
      name:'pethelperIndex',
      path:'/pethelperIndex',
      component:PetHelperIndex,
    },
    {
      name:'petserach',
      path:'/petserach',
      component:PetSerach,
    },
    {
      name:'petseek',
      path:'/petseek',
      component:PetSeek,
    },
    {
      name:'petadopt',
      path:'/petadopt',
      component:PetAdopt,
    },
    {
      name:'petactive',
      path:'/petactive',
      component:PetActive,
    },
    {
      name:'ceshi',
      path:'/ceshi',
      component:CeShi,
    },
    {
      name:'swiperceshi',
      path:'/swiperceshi',
      component:SwiperCeshi,
    },
    {
      name:'addmypet',
      path:'/addmypet',
      component:AddMyPet,
    },
    {
      name:'petcategoryselect',
      path:'/petcategoryselect',
      component:PetCategorySelect,
    },
    {
      name:'articlecategorydetailsIndex',
      path:'/articlecategorydetailsIndex',
      component:ArticleCategoryDetailsIndex,
    },
    {
      name:'articlecategorydetails',
      path:'/articlecategorydetails/:articleid',
      component:ArticleCategoryDetails,
    },
  ]
  },
]
