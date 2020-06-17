<template>
    <div>
        <component :is="customName"></component>
    </div>
</template>

<script>
    import Chaodigou from '@components/customPage/Chaodigou.vue';
    import VipOpening from '@/components/customPage/VipOpening'
    export default {
        name: "custompage",
        data(){
            return{
                customId: 1,
                customName: ''
            }
            
        },              
        components: {
            Chaodigou,
            VipOpening
        },
        created() {
            this.customId =  this.$route.params.customId || 1;
            switch(+this.customId) {
                case 1: this.customName = 'Chaodigou';break; 
                case 2: this.customName = 'VipOpening';break; 
            }
        },
        methods:{

        },
        mounted() {

        },
        updated() {

        }
    }
</script>

<style scoped>

</style>