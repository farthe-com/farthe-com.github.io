var app = new Vue({
    el: '#app',
    data() {
        return {
            // 引入的变量
            tableData,

            // tab切换
            currentChildren: [],
            defaultActive: '0',
            defaultActiveKey: "defaultActiveKey",

            // 翻页
            pagination: {
                list: [],
                pageSize: 10,
                currentPage: 1,
                total: 0,
            },

            // 搜索
            keywords: "",
            searchReuslt: []
        }
    },

    watch: {
        currentChildren() {
            this.pagination.total = this.currentChildren.length;
            this.pagination.currentPage = 1;
            this.handleCurrentChange();
        }
    },

    methods: {
        // tab切换
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
            this.currentChildren = tableData[key].children;
            localStorage.setItem(this.defaultActiveKey, key)
        },

        // 翻页
        handleCurrentChange() {
            const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
            const end = this.pagination.currentPage * this.pagination.pageSize;
            // console.log(start, end);

            this.pagination.list = this.currentChildren.slice(start, end);
        },

        // 搜索
        search() {
            // 正则忽略大小写
            const keywords = new RegExp(this.keywords.trim(), "i")

            this.searchReuslt = [];

            for (const child of tableData) {
                for (const item of child.children) {
                    if (item.desc.search(keywords) > -1 || item.name.search(keywords) > -1) {
                        this.searchReuslt.push(item)
                    }
                }
            }

            // console.log(this.searchReuslt);
            this.currentChildren = this.searchReuslt;
        }
    },

    created() {
        this.defaultActive = localStorage.getItem(this.defaultActiveKey) || '0';
        this.handleOpen(this.defaultActive);
    }
});