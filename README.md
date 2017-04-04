<h2>一款价格日历组件</h2>
<p>组件名称：价格日历（使用售票单程，往返取日期；酒店入住，离店取日期） </p>

<p>需求：<br />
1.手机端h5日历，默认显示12个月，可上下滚动<br />
2.显示节假日<br />
3.显示价格<br />
4.可单选，可选时间段</p>

<p>组件说明：组件分两部分<br />
var calendar = function(){...} //日历默认模块，显示日历，显示节假日等<br />
var calendarExtend = function(){...}//日历扩展，1.定义单程或往返的取日期，2.遍历价格</p>

<p>使用方法：<br />
calendar.init('#calendar');//日历模块初始化<br />
calendarExtend.init('#calendar','oneway',priceArr);//日历扩展模块初始化</p>

<p>参数说明：<br />
@para id //容器id<br />
@para type //取日期类型 oneway:'单程'  return:'往返'<br />
@para priceArr  //价格数据</p>
