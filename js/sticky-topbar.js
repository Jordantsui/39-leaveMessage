!function(){
  var view = document.querySelector('#topNavBar')

  var controller = {
    view: null,
    init: function(view){
      this.view = view
      this.bindEvents()
      // this.bindEvnets.call(this)
    },
    bindEvents: function(){
      var view = this.view
      window.addEventListener('scroll', (x) => {
        if(window.scrollY > 0){
          this.active()
        }else{
          this.deactive()
        }
      })  //}.bind(this))    如果不这样写，window.addEventListener这段代码的this是“滚动的元素”，与上面 view = this.view 的this不一样
      //bind(this)之后，这里的this即view = this.view 的this，但是很绕，所以我们可采用箭头函数
      // 箭头函数没有 this，this.active()里面的this与上面view = this.view保持一致 （箭头函数内外this不变）
    },
    active: function(){
      this.view.classList.add('sticky')
    },
    deactive: function(){
      this.view.classList.remove('sticky')
    }

  }
  controller.init(view)
  // controller.init.call(controller, view)
  //在这里，就已经决定了 this.view = view 这一句的this 是 controller
}.call()
