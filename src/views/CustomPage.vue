<template>
    <div>
        <component :is="customName"></component>
    </div>
</template>

<script>
    import Chaodigou from '@components/customPage/Chaodigou.vue';
    // import VipOpening from '@/components/customPage/VipOpening'
    import Outdated from '@/components/customPage/Outdated'
    import Activity717 from '@components/customPage/activity717'
    import NewStarVip from '@components/customPage/NewStarVip'
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
            // VipOpening,
            Outdated,
            Activity717,
            NewStarVip
        },
        created() {
            this.customId =  this.$route.params.customId || 1;
            this.customId = parseInt(this.customId );
            switch(+this.customId) {
                case 1: this.customName = 'Chaodigou';break; 
                // case 2: this.customName = 'VipOpening';break; 
                case 2: this.customName = 'Outdated';break; 
                case 3: this.customName = 'Activity717';break; 
                case 4: this.customName = 'NewStarVip';break;
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