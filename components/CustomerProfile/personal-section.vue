<template>
    <div class="mb-2  d-flex flex-column align-items-center border"
        :style="`width: 1112.2px;height: ${dynamicHeight}; background-color: white;`">
        <!--  -->
        <div class="d-flex align-items-center justify-content-between " style="width: 1112.2px; padding: 24px;">
            <div class="">
                <slot name="header-icon"></slot>
                <slot name="header-title"></slot>
            </div>
            <div>
                <a v-if="showMoreinfoFlag===false" @click="showMoreInfo($event)" href="">
                    <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-down-arrows-dreamstale-lineal-dreamstale.png" />
                </a>
                <a v-if="showMoreinfoFlag===true" @click="hideInfo($event)" href="">
                    <img
                        src="https://img.icons8.com/external-those-icons-lineal-those-icons/32/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" />
                </a>
            </div>
        </div>

        <!--  -->

        <div class="d-flex flex-column " v-if="showMoreinfoFlag===true">
            <div class="d-flex justify-content-between " style="width: 1016.2px;height: 20px; background-color: white;">
                <slot name="body-data-labels"></slot>
            </div>
            <div class="d-flex justify-content-between " style="width: 1016.2px;height: 20px; background-color: white;">
                <slot name="body-data-values"></slot>                
            </div>
        </div>

        <div v-if="showMoreinfoFlag===true" class="d-flex align-items-end mt-3" style="width: 1012.2px;">
            <b-button style="height: 40px;width: 142px;" variant="success">
                <p>
                    Edit Info
                </p>
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        if (!process.server) {
            this.$auth.getUser().then(user => {
                console.log(user);
                this.email = user.profile.email
            })
        }
    },
    data: () => ({
        dynamicHeight: '88px',
        showMoreinfoFlag: false,
        email: '',
        currentMode: 'PESONAL_DATA',
        mode: {
            personalData: 'PESONAL_DATA',
            myOrders: 'MY_ORDERS'
        }
    }),

    methods: {
        toggleToPersonalData(e) {
            e.preventDefault();
            this.currentMode = this.mode.personalData;
        },
        toggleToMyOrder(e) {
            e.preventDefault();
            this.currentMode = this.mode.myOrders;
        },
        showMoreInfo(e) {
            e.preventDefault()
            this.showMoreinfoFlag = true
            this.dynamicHeight = '210px'
        },
        hideInfo(e) {
            e.preventDefault()
            this.showMoreinfoFlag = false
            this.dynamicHeight = '88px'
        }
    },
}
</script>