// 按照约定，构造函数首字母应当大写，而普通函数首字母应当小写
function Student(props) {
    this.name = props.name || "student"; // 设置默认值 
}

// 把hello函数移动到实例对象共同的原型上
Student.prototype.hello = function () {
    console.log('Hello, ' + this.name + '!');
};

function createStudent(props) {
    return new Student(props || {})
}

var xiaoming = createStudent({
    name: '小明'
});

xiaoming.hello()
// Hello, 小明!