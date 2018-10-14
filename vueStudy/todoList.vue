import Store from './js/Storage'
  console.log(Store)      // 存在两个方法，一个fetch,一个save
  export default {
    name: 'App',
    data() {        // es6语法 和 function data(){return {message:''}} 性质一样
      return{
        message: '',
        todos: Store.fetch()        // 查看localStorage中fetch方法，如果存在数据直接渲染，反之是个空数组
      }
    },
    watch: {                       // 监听todos
      todos: {
        handler: function (todos) {
          Store.save(todos)
        },
        deep: true
      }
    },
    methods: {                // 调用的方法
      onEnter: function(){
        this.todos.push({todo: this.message, isfinish: false});
        this.message = '';
      },
      finishFn: function(todo){
        todo.isfinish =! todo.isfinish;
      }
    }
  }
