// JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象。

// JavaScript还可以用一种构造函数的方法来创建对象
function Student(name) {
    this.name = name;
    this.hello = function () {
        console.log('Hello, ' + this.name + '!');
    }
}

var xiaoming = new Student('小明');

console.log(xiaoming.name); // '小明'

// 不同的实例对象中hello是不同的函数
xiaoming.hello(); // Hello, 小明!