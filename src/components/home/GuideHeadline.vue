<template>
    <div class="guide-headline">
            <span class="name">{{info.name}}</span>
            <router-link v-show="info.id" class="link" tag='span'  :to="{name: 'sort', params: {type:info.id}}"><span style="padding-right:0.1rem">更多</span>></router-link>
        </div>
</template>

<script>
    export default {
        name: "guide-headline",
        props:['info'],
    }
</script>

<style lang="less" scoped>
    .guide-headline{
            padding:0.47rem 0 0.2rem;
            margin-bottom: 0.1rem;
            display: flex;
            justify-content: space-between;
            .name{
                font-size: 0.32rem;
                font-weight: bold;
                color: #0f0b1a;

            }
            .link{
                font-size: 0.22rem;
                color: #1F1F1F;

            }
        }
</style>