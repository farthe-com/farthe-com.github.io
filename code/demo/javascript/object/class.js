// ES6 引入关键字class 

// 定义类
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        console.log('Hello, ' + this.name + '!');
    }

}

var xiaoming = new Student('小明');
xiaoming.hello();


// 继承
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        console.log('I am at grade ' + this.grade);
    }
}

var xiaohong = new PrimaryStudent('xiaohong', 99);
xiaohong.myGrade()