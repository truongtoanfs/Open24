<template>
    <header class="fixed top-0 inset-x-0 z-20 font-medium text-open24-accent bg-open24-main bg-open24-main-gradient">
        <div class="flex items-center justify-between">
            <button class="py-2 px-3 xl:hidden" @click="isOpenSideNav = true">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div>
                <nav :class="isOpenSideNav ? 'block' : 'hidden'" class="fixed inset-y-0 left-0 side-nav-width z-20 overflow-auto bg-open24-main bg-open24-main-gradient xl:static xl:flex xl:overflow-visible xl:bg-none xl:bg-opacity-0">
                    <div class="flex items-center px-3 pt-1.5 pb-2 xl:py-1.5 xl:mx-3.5">
                        <button @click="isOpenSideNav = false" class="mr-9 xl:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <router-link to="/DashBoard" @click="isOpenSideNav = false">
                            <img class="h-7 cursor-pointer relative top-px" src="../assets/images/logo-open24.png" alt="open24 logo">
                        </router-link>
                    </div>

                    <template v-for="navItem in menuHeader" :key="navItem.ID">
                        <div v-if="navItem.SubMenu.length === 0" class="px-1 pb-1 xl:p-0">     
                            <router-link :to="navItem.url" @click="isOpenSideNav = false" class="flex items-center h-9 my-0.5 xl:h-full xl:my-0 xl:hover:bg-black xl:hover:bg-opacity-30 xl:px-2">
                                <span class="flex items-center mb-px"><i :class="[navItem.ClassName, navItem.url === 'DashBoard' ? 'text-base' : 'text-lg']" class="w-8 text-center mx-1 xl:w-6 xl:ml-0"></i>{{ navItem.Title }}</span>
                            </router-link>
                        </div>
                        <div v-else class="nav-item px-1 pb-1 xl:p-0 xl:relative group">      
                            <div @click="collapseNav($event)" class="nav-item__label flex items-center justify-between h-9 my-0.5 pr-1.5 rounded cursor-pointer xl:group-hover:bg-black xl:group-hover:bg-opacity-30 xl:h-full xl:my-0 xl:rounded-none xl:px-2">
                                <span class="flex items-center mb-px"><i :class="navItem.ClassName" class="text-lg w-8 text-center mx-1 xl:hidden"></i>{{ navItem.Title }}</span>
                                <i class="fas fa-angle-down pl-1 pt-0.5"></i>
                            </div>
                            <div class="nav-item__list hidden bg-open24-main bg-open24-main-gradient xl:group-hover:block xl:absolute xl:left-0 xl:top-full xl:z-50 xl:w-48 xl:rounded-b xl:shadow-separate">
                                <router-link v-for="subNavItem in navItem.SubMenu" :key="subNavItem.ID" @click="isOpenSideNav = false, closeNavActivation()" :to="subNavItem.url" class="flex items-center px-6 py-1 xl:px-1.5 xl:hover:bg-black xl:hover:bg-opacity-20">
                                    <i class="text-base w-6 text-center mr-1" :class="subNavItem.ClassName"></i> <span class="xl:mb-px">{{ subNavItem.Title }}</span>
                                </router-link>
                            </div>
                        </div>
                    </template>
                </nav>
                <div  v-if="isOpenSideNav" @click="isOpenSideNav = false" class="overlay bg-black bg-opacity-60"></div>
            </div>
            <div class="flex relative">
                <div @clickout="isOpenBranch = false" class="relative h-10 flex items-center">
                    <div @click="isOpenBranch = !isOpenBranch" class="flex items-center px-2 cursor-pointer">
                        <i class="fas fa-map-marker-alt text-lg pr-1"></i> <span>{{ selectedBranch }}</span>
                    </div>
                    <div v-if="isOpenBranch" class="absolute top-full right-0 z-50 w-56 p-1 bg-open24-base text-333 shadow-md border border-gray-400 rounded-b">
                        <div class="relative mt-0.5 mb-1">
                            <input type="text" v-model="branchInput" class="input" placeholder="Tìm kiếm chi nhánh" autofocus>
                            <span class="absolute top-1/2 transform -translate-y-2/4 right-3">
                                <i class="fas fa-search text-base"></i>
                            </span>
                        </div>
                        <ul v-for="branch in branchFilter" :key="branch.id">
                            <li @click="changeBranch(branch.TenDonVi), isOpenBranch = false" class="relative p-1.5 rounded-sm cursor-default select-none hover:bg-blue-100 hover:text-gray-900">
                                {{ branch.TenDonVi }}
                                <span v-if="selectedBranch === branch.TenDonVi" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <i class="fas fa-check text-open24-main" aria-hidden="true" />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div @clickout="isOpenNotify = false" class="h-10 flex items-center">
                    <div class="relative px-2 cursor-pointer" @click="isOpenNotify = !isOpenNotify">
                        <i class="fas fa-bell text-lg"></i>
                        <span v-if="numberOfNotify > 0" class="absolute -top-1 -right-2 block notify-badge-width px-1 h-5 text-center rounded-full text-open24-accent bg-red-500">{{ numberOfNotify }}</span>
                    </div>
                    <div v-if="isOpenNotify" class="navbar-notify-height absolute top-full right-0 z-20 bg-open24-base text-333 w-96 px-2.5 border-l border-gray-400 border-opacity-50">
                        <div class="flex items-center justify-between border-b border-gray-400 border-opacity-50 pt-0.5">
                            <h6 class="font-bold px-2">Thông báo</h6>
                            <div class="flex items-center relative">
                                <span @click="readAllNotify()" class="text-open24-main cursor-pointer hover:underline">Đánh dấu dã đọc</span><i class="fas fa-cog px-2 pt-2 pb-1 cursor-pointer text-base text-open24-main" @click="isOpenSettingNotify = !isOpenSettingNotify"></i>
                                <div v-if="isOpenSettingNotify" class="overlay" @click="isOpenSettingNotify = false"></div>
                                <div v-if="isOpenSettingNotify" class="absolute z-20 top-full right-0 border border-open24-main rounded-sm py-1 px-3 w-40 bg-open24-base ">
                                    <label class="flex items-center py-1 cursor-pointer">
                                        <input type="checkbox" class="w-4 h-4 mr-1.5">
                                        <span>Tồn kho</span>
                                    </label>
                                    <label class="flex items-center py-1 cursor-pointer">
                                        <input type="checkbox" class="w-4 h-4 mr-1.5">
                                        <span>Điều chuyển</span>
                                    </label>
                                    <label class="flex items-center py-1 cursor-pointer">
                                        <input type="checkbox" class="w-4 h-4 mr-1.5">
                                        <span>Lô hàng</span>
                                    </label>
                                    <label class="flex items-center py-1 cursor-pointer">
                                        <input type="checkbox" class="w-4 h-4 mr-1.5">
                                        <span>Sinh nhật</span>
                                    </label>
                                    <label class="flex items-center py-1 cursor-pointer">
                                        <input type="checkbox" class="w-4 h-4 mr-1.5">
                                        <span>Bảo dưỡng xe</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6 v-if="listNotify.length === 0" class="hidden text-center py-2">Không có thông báo</h6>
                            <ul v-else class="py-2 max-h-content-notify">
                                <li v-for="(notify, notifyIndex) in listNotify" :key="notifyIndex" :class="notify.DaDoc ? '' : 'bg-green-200 bg-opacity-30'" class="flex items-center p-1 py-2.5 mb-3">
                                    <div class="w-14 flex-shrink-0 mr-1.5"><img class="mx-auto" src="../assets/images/hetkho.png" style="height: 30px;"></div>
                                    <div>
                                        <p v-html="notify.NoiDungThongBao"></p>
                                        <span class="date-notify">{{ notify.NgayTao }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="absolute inset-x-0 bottom-0 text-center py-3 mx-2.5 border-t border-gray-400">
                            <button class="text-sm mb-1 font-medium hover:underline">Xem thêm</button>
                        </div>
                    </div>
                </div>
                <div @clickout="isOpenHelper = false" class="hidden relative h-10 xl:flex xl:items-center">
                    <div @click="isOpenHelper = !isOpenHelper" class="px-2 cursor-pointer">
                        <i class="fas fa-question-circle text-lg"></i>
                    </div>
                    <div v-if="isOpenHelper" class="absolute z-50 top-full right-0 w-56 p-1 bg-open24-main bg-open24-main-gradient text-sm shadow-separate">
                        <template v-for="helper in helperList" :key="helper.id">
                            <a v-if="!helper.isDeleteSystem" :href="helper.link" class="flex items-center px-2.5 py-1.5 rounded hover:bg-black hover:bg-opacity-30">
                                <img class="w-4 h-4 mr-2" :src="helper.iconUrl" alt="application icon"> <span>{{ helper.name }}</span>
                            </a>
                            <a v-if="helper.isDeleteSystem" :href="helper.link" @click="isOpenModalDeleteSystem = true, isOpenHelper = false" class="flex items-center px-2.5 py-1.5 rounded hover:bg-black hover:bg-opacity-30">
                                <img class="w-4 h-4 mr-2" :src="helper.iconUrl" alt="application icon"> <span>{{ helper.name }}</span>
                            </a>
                        </template>
                    </div>
                </div>
                
                <base-modal modalSize="md" v-if="isOpenModalDeleteSystem" @closeModal="isOpenModalDeleteSystem = false">
                    <template v-slot:modal-title>Xóa dữ liệu hệ thống</template>
                    <template v-slot:modal-content>
                        <base-input-group label="Nhập mật khẩu" />
                        <label class="flex items-center py-0.5 mt-2.5">
                            <input type="checkbox" name="" class="checkbox-size mr-2"> Giữ lại danh mục Hàng hóa
                        </label>
                        <label class="flex items-center py-0.5">
                            <input type="checkbox" name="" class="checkbox-size mr-2"> Giữ lại danh mục Khách hàng
                        </label>
                    </template>
                    <template v-slot:modal-footer>
                        <button-cancel @click="isOpenModalDeleteSystem = false" />
                        <button-agree @click="isOpenModalDeleteSystem = false" class="button-distance" />
                    </template>
                </base-modal>

                <div  @clickout="isOpenSetting = false" class="relative h-10 flex items-center">
                    <div @click="isOpenSetting = !isOpenSetting" class="px-3 cursor-pointer">
                        <img class="rounded-full w-7 h-7" src="../assets/images/men-user.png" alt="user logo">
                    </div>
                    <div v-if="isOpenSetting" class="absolute top-full right-0 z-50 shadow-separate w-56 px-2 py-0.5 rounded-bl bg-open24-main bg-open24-main-gradient">
                        <template v-for="setting in settingList" :key="setting.id">
                            <a v-if="!setting.isContainThemes" href="#" :class="setting.borderBottom ? 'border-b border-dotted border-gray-100' : ''" class="flex items-center py-1.5 px-1.5 rounded hover:bg-black hover:bg-opacity-30">
                                <i :class="setting.icon" class="text-base w-5 text-center mr-2"></i> {{ setting.name }}
                            </a>
                            <a v-if="setting.isContainThemes" href="javascript:void(0)" :class="setting.borderBottom ? 'border-b border-dotted border-gray-100' : ''" class="flex items-center group relative py-1.5 px-1.5 rounded hover:bg-black hover:bg-opacity-30">
                                <i :class="setting.icon" class="fas fa-palette text-base w-5 text-center mr-2"></i> {{ setting.name }}
                                <ul class="hidden absolute top-0 right-full w-36 p-1.5 group-hover:grid grid-cols-3 gap-2 bg-open24-main bg-open24-main-gradient shadow-separate rounded sm:w-60 sm:grid-cols-4 sm:gap-2.5 sm:p-2.5">
                                    <li class="w-10 h-10 bg-open24-main border border-gray-100 hover:outline-highlight sm:w-12 sm:h-12" v-for="(theme, index) in themeList" :key="index" :class="[theme.includes('gradient') ? 'bg-open24-main-gradient' : '', theme]" @click="$emit('changeTheme', theme)"></li>
                                </ul>
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import BaseModal from './base/BaseModal.vue';
import BaseInputGroup from './base/BaseInputGroup.vue';
import ButtonAgree from './buttons/ButtonAgree.vue';
import ButtonCancel from './buttons/ButtonCancel.vue';
import ButtonAddNew from './buttons/ButtonAddNew.vue';
import { InitHeaderMenu, GetListDonVi_User, GetThongBao } from '../data';
import { ref, reactive, toRefs, computed } from 'vue';
import * as Device from '../composables/checkDevices';
import filterData from '../composables/useFilterData';
import { useStore } from 'vuex';

export default {
    components: {
        BaseModal, BaseInputGroup, ButtonAgree, ButtonCancel, ButtonAddNew,
    },
    emits: ['changeTheme'],
    setup(props, context) {
        const menuHeader = InitHeaderMenu.dataSoure.Menu;
        const helperList = [
            {
                id: 1,
                name: 'Tải Teamviewer',
                link: 'https://get.teamviewer.com/qgvaru2',
                iconUrl: '/src/assets/images/teamview.png',
                isDeleteSystem: false,
            },
            {
                id: 2,
                name: 'Tải Ultraviewer',
                link: 'http://dl2.ultraviewer.net/UltraViewer_setup_6.1_vi.exe',
                iconUrl: '/src/assets/images/ultraviewer.png',
                isDeleteSystem: false,
            },
            {
                id: 3,
                name: 'Hướng dẫn sử dụng',
                link: 'https://open24.vn/huong-dan-su-dung',
                iconUrl: '/src/assets/images/huong-dan-su-dung.png',
                isDeleteSystem: false,
            },
            {
                id: 4,
                name: 'Xóa dữ liệu hệ thống',
                link: 'javascript:void(0)',
                iconUrl: '/src/assets/images/xoa-du-lieu.png',
                isDeleteSystem: true,
            },
            {
                id: 5,
                name: 'Tạo shortcut in nhanh',
                link: 'javascript:void(0)',
                iconUrl: '/src/assets/images/tao-shortcut.png',
                isDeleteSystem: false,
            },
            
        ];
        const settingList = [
            {
                id: 1,
                name: 'Test',
                icon: 'fas fa-user',
                borderBottom: true,
                isContainThemes: false,
            },
            {
                id: 2,
                name: 'Cài đặt cửa hàng',
                icon: 'fas fa-store-alt',
                borderBottom: false,
                isContainThemes: false,
            },
            {
                id: 3,
                name: 'Cài đặt sơ đồ',
                icon: 'fas fa-map-marker-alt',
                borderBottom: false,
                isContainThemes: false,
            },
            {
                id: 4,
                name: 'Cài đặt mẫu in',
                icon: 'fas fa-print',
                borderBottom: false,
                isContainThemes: false,
            },
            {
                id: 5,
                name: 'Cài đặt hoa hồng',
                icon: 'fas fa-user-cog',
                borderBottom: false,
                isContainThemes: false,
            },
            {
                id: 6,
                name: 'Cài đặt khuyến mại',
                icon: 'fas fa-gift',
                borderBottom: false,
                isContainThemes: false,
            },
            {
                id: 7,
                name: 'Nhật ký sử dụng',
                icon: 'fas fa-bookmark',
                borderBottom: false,
                isContainThemes: false,
            },
            {
                id: 8,
                name: 'Chủ đề',
                icon: 'fas fa-palette',
                borderBottom: true,
                isContainThemes: true,
            },
            {
                id: 9,
                name: 'Đăng xuất',
                icon: 'fas fa-sign-out-alt',
                borderBottom: false,
                isContainThemes: false,
            },
        ];
        const showStates = reactive({
            isOpenSideNav: false,
            isOpenBranch: false,
            isOpenNotify: false,
            isOpenSettingNotify: false,
            isOpenHelper: false,
            isOpenSetting: false,
            isOpenModalDeleteSystem: false,
        });

        // Đóng mở Nav trên các các thiết bị < 1280 
        function collapseNav(event) {
            if (!Device.isPrefix('xl')) {//chỉ áp dụng cho thiết bị nhỏ hơn beakpoint xl:1280 của tailwind 
                const navItem = event.currentTarget;

                if (!navItem.parentElement.classList.contains('active')) {
                    closeNavActivation();
                }
                navItem.parentElement.classList.toggle('active');
                navItem.nextElementSibling.classList.toggle('hidden');
            }
        }
        function closeNavActivation() {
            const itemActivation = document.querySelector('.nav-item.active');
            if (itemActivation) {
                itemActivation.classList.remove('active');
                itemActivation.querySelector('.nav-item__list').classList.add('hidden');
            }
        }
        // section chi nhánh
        const store = useStore();
        store.dispatch('getChiNhanhList');
        const chiNhanhList = computed(() => store.getters.chiNhanhList);
        const selectedBranch = ref(chiNhanhList.value[0].TenDonVi);
        const branchInput = ref('');
        function changeBranch(branchName) {
            selectedBranch.value = branchName;
            branchInput.value = '';
        }
        const branchFilter = computed(() => {
            return filterData(branchInput.value, chiNhanhList.value, ['TenDonVi']);
        })
        // section notify
        const listNotify = ref(GetThongBao.dataSoure.ListThongBao);
        const numberOfNotify =  ref(GetThongBao.dataSoure.CountTB);
        function readAllNotify() {
            numberOfNotify.value = 0;
            listNotify.value = listNotify.value.map(item => {
                return {
                    DaDoc: true,
                    NoiDungThongBao: item.NoiDungThongBao,
                    NgayTao: item.NgayTao,
                    Image: item.Image,
                }
            })
        }

        const themeList = ['blue-theme', 'sky-theme', 'green-theme', 'red-theme', 'orange-theme', 'pink-theme', 'brown-theme', 'grey-theme',
        'sky-gradient-theme', 'pink-gradient-theme', 'cyan-gradient-theme', 'indigo-gradient-theme', 'rose-gradient-theme'];

        return {
            menuHeader,
            themeList,
            ...toRefs(showStates),
            collapseNav,
            closeNavActivation,
            branchFilter,
            selectedBranch,
            branchInput,
            changeBranch,
            helperList,
            settingList,
            listNotify,
            numberOfNotify,
            readAllNotify,
        }
    }
}
</script>

<style scoped>
    .side-nav-width {
        width: 230px;
    }

    .nav-item.active .nav-item__label {
        background: rgba(0, 0, 0, 0.3);
    }

    .navbar-notify-height {
        height: calc(100vh - 40px);
    }

    .notify-badge-width {
        min-width: 20px;
    }

    .max-h-content-notify {
        max-height: calc(100vh - 130px);
        overflow: auto;
    }
    .date-notify {
        font-size: 11px;
        color: #727070;
        font-style: italic;
    }

    @media screen and (min-width: 1280px) {
        .side-nav-width {
            width: 100%;
        }
    }
</style>
