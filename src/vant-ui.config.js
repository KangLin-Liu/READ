import { Col,Row,Image,Search,Swipe,SwipeItem,Grid,GridItem,Panel,Card,Cell,Tabbar,TabbarItem,Tab,Tabs,NavBar,Button,Tag,Divider,Icon,Empty,List,SwipeCell,Dialog,Toast,Collapse,CollapseItem } from 'vant'

let arr = [Col,Row,Image,Search,Swipe,SwipeItem,Grid,GridItem,Panel,Card,Cell,Tabbar,TabbarItem,Tab,Tabs,NavBar,Button,Tag,Divider,Icon,Empty,List,SwipeCell,Dialog,Toast,Collapse,CollapseItem];

export default function (Vue) {
    arr.forEach(component => Vue.use(component))
}