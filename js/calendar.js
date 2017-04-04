

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


var calendar = function(){
  var util = {
      /**
       * 根据当前年月，计算下一个月的年月
       * @para year {int} eg: 2014 YYYY
       * @para month {int} eg: 12 MM/M
       * @return {object}
       */
      getNextMonthDate: function( year, month ) {
          if ( month > 12 ) {
              year = year + Math.floor( ( month - 1 ) / 12 );

              if ( month % 12 == 0 ) {
                  month = 12;
              } else {
                  month = month % 12;
              }
          }

          return {
              year: year,
              month: month
          }
      },

      /**
       * 处理小于10的数字前自动加0
       * @para num {num} int
       * return {string} '02'
       */
      formatNum: function( num ) {
          if ( num < 10 ) {
              num = '0' + num;
          }

          return num;
      },

      /**
       * 连接年月日，连接符为`-`
       * return {string} yyyy-mm-dd
       */
      joinDate: function( year, month, day ) {
          var formatNum = util.formatNum;

          return year + '-' + formatNum( month ) + '-' + formatNum( day );
      },

      /**
       * 将格式化后日期转化为数字，便于日期计算
       * @para date {string|date object} yyyy-mm-dd|日期对象
       * return {string} yyyymmdd
       */
      dateToNum: function( date ) {
          var rst = '';
          if ( typeof date == 'string' ) {
              rst = date.split( '-' ).join( '' );
          } else {
              rst = util.formatDate( date ).split( '-' ).join( '' );
          }

          return rst;
      },

      /**
       * 格式化日期对象
       * @para {date object} 日期对象
       * return {string} yyyy-mm-dd
       */
      formatDate: function( dateObj ) {
          var year = dateObj.getFullYear(),
              month = dateObj.getMonth() + 1,
              day = dateObj.getDate();

          return util.joinDate( year, month, day );
      },

      /**
       * 获取当前日期的下一天
       * @para date {string|date object} yyyy-mm-dd|日期对象
       * @para num {int} 获取指定日期之后的几天
       * return {string} yyyy-mm-dd
       */
      getNextDate: function( date, num ) {
          return util.formatDate( new Date( +new Date( date ) + num * 86400000 ) );
      },
  };
  var tpl = [
      '<div class="cal-wrap">',
          '<h2>{%date%}</h2>',
          '{%week%}',
          '<ul class="day">',
              '{%day%}',
          '</ul>',
      '</div>'
  ].join( '' );

  var weekTpl = [
      '<ul class="week">',
          '<li>一</li>',
          '<li>二</li>',
          '<li>三</li>',
          '<li>四</li>',
          '<li>五</li>',
          '<li class="wk">六</li>',
          '<li class="wk">日</li>',
      '</ul>'
  ].join( '' );

  var holidaysMap = [
      {
          name: '今天',
          date: [ util.formatDate( new Date() ) ]
      },
      {
          name: '明天',
          date: [ util.formatDate( new Date( +new Date() + 86400000 ) ) ]
      },
      {
          name: '后天',
          date: [ util.formatDate( new Date( +new Date() + 2 * 86400000 ) ) ]
      },
      {
          name: '圣诞节',
          date: [ '2014-12-25', '2015-12-25', '2016-12-25', '2017-12-25', '2018-12-25', '2019-12-25', '2020-12-25' ]
      },
      {
          name: '情人节',
          date: [ '2015-02-14', '2016-02-14', '2017-02-14', '2018-02-14', '2019-02-14', '2020-02-14' ]
      },
      {
          name: '元旦',
          date: [ '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01', '2019-01-01', '2020-01-01' ]
      },
      {
          name: '除夕',
          date: [ '2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-2' ]
      },
      {
          name: '春节',
          date: [ '2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25' ]
      },
      {
          name: '元宵节',
          date: [ '2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-18' ]
      },
      {
          name: '清明节',
          date: [ '2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04' ]
      },
      {
          name: '五一',
          date: [ '2015-05-01', '2016-05-01', '2017-05-01', '2018-05-01', '2019-05-01', '2020-05-01' ]
      },
      {
          name: '端午节',
          date: [ '2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25' ]
      },
      {
          name: '中秋节',
          date: [ '2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01' ]
      },
      {
          name: '国庆节',
          date: [ '2015-10-01', '2016-10-01', '2017-10-01', '2018-10-01', '2019-10-01', '2020-10-01' ]
      }
  ];

  //初始化日历年月
  var now = new Date();
  var year = now.getFullYear();//取年
  var month = now.getMonth() + 1;//取月
  var minDate = '';//显示最小月
  var maxDate = '';//显示最大月
  var step = '12';//显示12个月

  function init(id){
    var _id = id;
    //渲染数据
    render(_id);
  }

  /**
   * 根据日期对象渲染日历
   * @para {date object} 日期对象
   */
  function render(id){
    var _id = id;
    var tmpTplArr = [];
    for ( var i = 0; i < step; i++ ) {
        var curMonth = month + i,
            curDate = util.getNextMonthDate( year, curMonth ),
            dateStr = curDate.year + '年' + util.formatNum( curDate.month ) + '月',
            dayList = getDayList( curDate.year, curDate.month ),
            week = '';
        //week = weekTpl;//渲染星期
        var curTpl = tpl.replace( '{%date%}', dateStr )
            .replace( '{%week%}', week )
            .replace( '{%day%}', dayList );
        tmpTplArr.push( curTpl );
    }
    $(_id).html( tmpTplArr.join( '' ) );
    setSelectDate(_id,now);//默认选中今天
  }
  /**
   * 根据当前年月，获取日期列表html字体串
   * @para year {int} eg: 2014 YYYY
   * @para month {int} eg: 12 MM/M
   * @return {string}
   */
  function getDayList( year, month ) {
      var _year = year,
          _month = month,
          days = new Date( _year, _month, 0 ).getDate(),
          firstDay = Math.abs( new Date( _year, _month - 1, 1 ).getDay() ),

          dateToNum = util.dateToNum,
          joinDate = util.joinDate,

          tmpEptArr = [];
          tmpDayDataArr = [],
          tmpDayTplArr = [];

      //如果是星期天
      if ( firstDay == 0 ) {
          firstDay = 7;
      }

      //插入空白字符
      for ( var i = 0; i < firstDay - 1; i++ ) {
          tmpEptArr.push( '<li class="ept"></li>' );
      }

      for ( var i = 0; i < days; i++ ) {
          var day = i + 1,
              date = joinDate( year, month, day ),
              wkDay = new Date( date ).getDay(),
              dateNum = dateToNum( date ),
              jrClassName = 'jr';

          //默认不做任何处理
          tmpDayDataArr.push( {
              class: '',
              date: date,
              day: day,
              name: ''
          } );

          //双休单独标注出
          if ( wkDay == 6 || wkDay == 0 ) {
              jrClassName = 'jr wk';
              tmpDayDataArr[ i ][ 'class' ] = 'wk';
          }

          //不在指定范围内的日期置灰
          if ( ( minDate && dateNum < dateToNum( minDate ) ) ||
              ( maxDate && dateNum > dateToNum( maxDate ) )
          ) {
              jrClassName = 'iv';
              tmpDayDataArr[ i ][ 'class' ] = 'iv';
          }

          //节假日处理
          for ( var k = 0, hlen = holidaysMap.length; k < hlen; k++ ) {
              var name = holidaysMap[ k ][ 'name' ],
                  dateArr = holidaysMap[ k ][ 'date' ];

              for ( var j = 0, len = dateArr.length; j < len; j++ ) {
                  var item = dateArr[ j ];

                  if ( dateNum == dateToNum( item ) ) {
                      tmpDayDataArr[ i ][ 'class' ] = jrClassName;
                      tmpDayDataArr[ i ][ 'name' ] = name;
                      break;
                  }
              }
          }

          //初始化当前选中日期状态
          if ( dateNum == dateToNum( now ) ) {
              tmpDayDataArr[ i ][ 'class' ] += ' cur';
          }
      }

      //生成日期模板字符串
      for ( var i = 0, len = tmpDayDataArr.length; i < len; i++ ) {
          var item = tmpDayDataArr[ i ];
          tmpDayTplArr.push(
              '<li class="' + item.class + '" data-date="' + item.date + '">' +
                  '<i>' + item.name + '</i><i class="date">' + item.day + '</i><i></i>' +
              '</li>'
          );
      }

      return tmpEptArr.concat( tmpDayTplArr ).join( '' );
  }
  /**
   * 设置选中日期格式(单程)
   * @para {date object|date string} YYYY-MM-DD
   */
  function setSelectDate(id,date) {
      var _id = id,
          _date = ( typeof date == 'string' ) ? date : util.formatDate( date ),
          dateNum = util.dateToNum( _date ),
          lastSltItem = $(_id).find( 'li.cur' ),
          curSltItem = $( $(_id)[ 0 ].querySelector( 'li[data-date="' + _date + '"]' ) );

      //先移到上次选中日期高亮
      if ( lastSltItem.length ) {
          var lastDateNameEl = $( lastSltItem.find( 'i' )[ 1 ] );

          lastSltItem.removeClass( 'cur' );
          if ( !lastSltItem.hasClass( 'jr' ) ) {
              lastDateNameEl.text( '' );
          }
      }

      //添加当前选中日期高亮
      if ( curSltItem.length ) {
          var curDateNameEl = $( curSltItem.find( 'i' )[ 1 ] );

          curSltItem.addClass( 'cur' );
          if ( !curSltItem.hasClass( 'jr' ) ) {
              curDateNameEl.text(  );
          }
      }
  }
  return{
    init:init
  }
}();

/**
* 日历扩展
* @author 2662175556@qq.com
**/
var calendarExtend = function(){
  var _dateList = []; //存放出发和到达日期

  /**
  * 初始化
  * @para id DOM容器ID
  * @para type 日历类型 oneway:单程 return:往返
  * @para priceArr 价格日历数据
  **/
  function init(id,type,priceArr){
    var _id = id;
    var _type = type;
    priceMap(_id,priceArr);
    curInit();
    events(_id,_type);
  }
  /*
  * 价格遍历
  */
  function priceMap(id,priceArr){
    var _id = id;
    var _priceArr = priceArr;
    var liDom = $(_id).find('ul.day li');
    liDom.each(function(){
      var date = $(this).data('date');
      for(var i = 0,len = _priceArr.length;i<len;i++){
        if(date == _priceArr[i].Date){
          $(this).find('i:last').html(_priceArr[i].Price);
        }
      }
    })
  }
  /**
  * 初始化日历数组 _dateList
  **/
  function curInit(){
    var now = new Date().Format('yyyy-MM-dd');
    _dateList[0] = ([now,new Date(now).getTime()]);
  }
  /**
  * 工具函数，数组排序
  * @para dateArr 出发和到达的日期
  **/
  function dateSort(dateArr){
    var _dateArr = dateArr;
    var a = _dateArr[0];
    var b = _dateArr[1];
    if(a[1]>b[1]){
      _dateArr = [];
      _dateArr.push(b);
      _dateArr.push(a);
    }else{
      _dateArr = [];
      _dateArr.push(a);
      _dateArr.push(b);
    }
    return _dateArr;
  }
  /**
  * 往返日历时，选中日期区间
  * @para dateArr 出发和到达的日期
  **/
  function selectDom(id,dateArr){
    var _id = id;
    var _dateArr = dateSort(dateArr);
    //渲染日期区间样式
    var startDate = _dateArr[0][1];
    var endDate = _dateArr[1][1];
    var liDom = $(_id).find('ul.day li');
    liDom.each(function(){
      var thisDate = $(this).data('date');
      var thisTime = new Date(thisDate).getTime();
      if(thisTime<=endDate&&thisTime>=startDate){
        $(this).addClass('cur')
      }
    })
  }
  /**
  * 单程日历
  **/
  function onewayFlag(id){
    var _id = id;
    $(_id).on('click','ul.day li',function(){
      var _dom = $(_id).find('li.cur');//初始dom
      var _this = $(this);
      var _now = _this.data('date');//当前dom

      if(_now){
        _dom.removeClass('cur')
        _this.addClass('cur');
        //console.log(_now);
      }
    })
  }
  /**
  * 往返日历
  **/
  function returnFlag(id){
    var _id = id;
    $(_id).on('click','ul.day li',function(){
      var _dom = $(_id).find('li.cur');//初始dom
      var _this = $(this);
      var _now = _this.data('date');//当前dom
      var _nowTime = new Date(_now).getTime();
      var _dom1 = $(_id).find('li.cur').eq(0);
      var _dom2 = $(_id).find('li.cur').eq(1);

      if(_now&&_dateList.length == 1){
        _dateList[1] = ([_this.data('date'),new Date(_now).getTime()]);
        _this.addClass('cur');
        selectDom(_id,_dateList);
      }else if(_now&&_dateList.length == 2){

        if(_nowTime>_dateList[1][1]){
          _dateList.pop();
          _dateList.push([_this.data('date'),new Date(_now).getTime()]);
          _dom2.removeClass('cur');
          _this.addClass('cur');
          selectDom(_id,_dateList);
        }else if(_nowTime<_dateList[0][1]){
          _dateList.shift();
          _dateList.unshift([_this.data('date'),new Date(_now).getTime()]);
          _dom1.removeClass('cur');
          _this.addClass('cur');
          selectDom(_id,_dateList);
        }else{
          _dateList = [];
          _dateList.push([_this.data('date'),new Date(_now).getTime()]);
          _dateList.push([_this.data('date'),new Date(_now).getTime()]);
          _dom.removeClass('cur')
          _this.addClass('cur');
        }
      }
      //console.log(_dateList);
    });
  }
  /**
  * 输出日期
  **/
  function getValue(){
    return _dateList;
  }
  /**
  * 初始化事件
  **/
  function events(id,type){
    var _id = id;
    if(type=='return'){
      returnFlag(_id)
    }else{
      onewayFlag(_id)
    }
  }
  return{
    init:init,
    getValue:getValue
  }
}()
