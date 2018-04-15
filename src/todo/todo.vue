<template>
    <section class="real-app">
        <input 
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么呢"
            @keyup.enter="addTodo"
        >
        <item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @del="deleteTodo"></item>
        <tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAllCompleted="clearAllCompleted"></tabs>
    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
    components: {
        Item, Tabs
    },
    data() {
        return {
            todos: [],
            filter: 'all'
        }
    },
    // 计算
    computed: {
        filteredTodos() {
            if (this.filter === 'all') {
                return this.todos;
            }
            const completed = this.filter === 'completed';
            // 将todos数组中，completed为true的值过滤出来，并返回一个新数组
            return this.todos.filter(todo => completed === todo.completed);
        }
    },
    methods: {
        addTodo(e) {
            if (e.target.value.trim()) {
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                });
                e.target.value = '';
            } else {
                alert('傻X，输入不能为空 !-_-');
            }
        },
        deleteTodo(id) {
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
        },
        toggleFilter(state) {
            this.filter = state;
        },
        clearAllCompleted() {
            // 给todos赋一个新的值（即todo.completed为false的值）
            this.todos = this.todos.filter(todo => todo.completed === false)
        }
    }
}
</script>

<style lang="stylus" scoped>
.real-app
    width 600px
    margin 20px auto
    box-shadow 0 0 5px #666666
    .add-input
        position relative
        width 100%
        font-size 24px
        line-height 1.4em
        border none
        outline none 
        padding 16px 16px 16px 60px
        box-shadow inset 0 -2px 1px rgba(0,0,0,0.6)
        box-sizing border-box

</style>