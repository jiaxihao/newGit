const STORAGE_KEY = 'todos-vuejs'
export default  {
  fetch () {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save (todos) {    // watch所监听的函数名称
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
