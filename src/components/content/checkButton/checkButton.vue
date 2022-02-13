<!-- 勾选按钮组件 -->
<template>
    <div class='checkbutton' :class="{check:isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>

export default {
    name: 'checkButton',
    data() {
        return {

        }
    },
    props:{
        isChecked:{
            type:Boolean,
            default(){
                return false
            }
        }
    }
}
</script>
<style scoped>
    .checkbutton{
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #aaa;

    }
    .check{
        background-color: var(--color-tint);
        border-color: var(--color-tint);
    }
</style>