/*
var APP_ID = '11tOueDUPFUB281mT5Wg2rxV-gzGzoHsz';
var APP_KEY = 'Kot53NmC0sTfmjmGvX2kDJhX';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
console.log('运行到这里没有报错')

//这一段从数据库中读数据，展示出来
var query=new AV.Query('Message');
query.find()
  .then(
    function(messages){
      //这一段find()是直接从官网上copy过来的，具体作用不了解，messages是参数的名字，目前来看，find()的作用即是得到messages
      console.log(messages)
      console.log(messages[0].attributes)
      console.log(messages[1].attributes)
      //messages是个数组，0是第一条留言，1是第二条留言，每条留言都是一个对象，对象的attributes属性的形式为 {name:'xxx',content:'111'}
      let array=messages.map((item)=>item.attributes)
      array.forEach((item)=>{
        let li=document.createElement('li')
        li.innerText=`${item.name}:${item.content}`
        let messageList=document.querySelector('#messageList')
        messageList.append(li)   //append 作用等同于于 appendChild
      })
    },
    function(error){
      //这个异常处理处理的是find()出现的异常
    })
  .then(()=>{},(error)=>{
    console.log(error)
    //这个异常处理处理的上一个“then和异常处理”出现的异常
  });


//这一段代码从输入框中读数据，存储到服务器中，与此同时，也显示在网页上
let myForm=document.querySelector('#postMessageForm')

myForm.addEventListener('submit',function(e){
  e.preventDefault()
  let content=myForm.querySelector('input[name=content]').value
  //注意选择器的用法
  let name=myForm.querySelector('input[name=name]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    'name':name,
    'content': content
  }).then(function(object){
    //window.location.reload()  表示刷新页面
    //注意，下面的这四句表示增添一个'li'，不刷新页面，即可增加留言
    let li=document.createElement('li')
    li.innerText=`${object.attributes.name}:${object.attributes.content}`
    let messageList=document.querySelector('#messageList')
    messageList.append(li)
    myForm.querySelector('input[name=content]').value=''
    //表示清空输入框
    console.log('object:')
    console.log(object)
  })
})
*/


/*
//创建TestObject表
//'TestObject'是表名；TestObject是变量名，可变。
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
var testObject = new TestObject();
//数据内容是words: 'Hello World!'，保存
//若保存成功，则运行 alert
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/


//MVC是一种组织代码的思想
!function () {
  var model = {  //跟数据有关的要用model
    // 获取数据
    init: function () {
      var APP_ID = '11tOueDUPFUB281mT5Wg2rxV-gzGzoHsz'
      var APP_KEY = 'Kot53NmC0sTfmjmGvX2kDJhX'
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find() // Promise 对象
    },
    // 创建数据
    save: function (name, content) {
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({  // Promise 对象
        'name': name,
        'content': content
      })
    }
  }

  var view = document.querySelector('section.message')    //视图


  var controller = {     //控制器
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model

      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        }
      )
    },
    bindEvents: function () {
      this.form.addEventListener('submit', function (e) {
        e.preventDefault()
        this.saveMessage()
      }.bind(this))
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        console.log(object)
      })
    }

  }

  controller.init(view, model)

}.call()

