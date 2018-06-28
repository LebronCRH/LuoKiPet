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
import ArticleView from '@/page/Release/ArticleView.vue'
import PetCategoryIndex from '@/page/petcategory/petcategoryIndex.vue'
import PetCategoryDetails from '@/page/petcategory/childrens/petcategorydetails.vue'
import App from '../App'

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
            },{
            path:'profile',
            components:{
              Conter:Profile
            },
            children:[{
              path:'setting',
              component:Setting
            },{
              path:'myserviceorder',
              component:MyServiceOrder
            },{
              path:'orderdetails/:orderid',
              component:OrderDetails
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
          children:[{
            path:'shopstreetscape',
            component:ShopStreetscape
          }]
        }]
      },{
        path:'ticketbag',
        component:TicketBag,
      },{
        // name:'changelocation',
        path:'changelocation',
        component:ChangeLocation,
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
      name:'luokifriend',
      path:'/luokifriend',
      component:LuoKiFriend
    },
    {
      name:'friendchat',
      path:'/friendchat',
      component:FriendChat
    },
    {
      name:'createphoto',
      path:'/createphoto',
      component:CreatePhoto
    },
    {
      name:'createarticle',
      path:'/createarticle',
      component:CreateArticle
    },
    {
      name:'articleview',
      path:'/articleview',
      component:ArticleView
    },
    {
      name: 'chat',
      path: '/chat/:sessionId',
      component:P2PChat
    },
  ]
  },
]
