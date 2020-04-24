// 面向对象编程
// https://www.liaoxuefeng.com/wiki/1022910821149312/1023022126220448


// JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。

var Student = {
    name: 'student',
    age: 23,
    sayHello: function () {
        console.log(`${this.name} ${this.age}`);
    }
}

var xiaoming = {
    name: '小明'
};

// 把xiaoming的原型指向了对象Student
// 看上去xiaoming仿佛是从Student继承下来的
xiaoming.__proto__ = Student;

xiaoming.sayHello()