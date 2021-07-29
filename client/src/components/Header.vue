<template>
    <nav class=" text-white font-medium" :style="{background: primaryColor}">
        <div class="flex justify-between items-center">
            <div class="py-2 px-3 xl:hidden cursor-pointer" @click="isOpenSideNav = !isOpenSideNav">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>

            <div id="side-nav">
                <div :class="isOpenSideNav ? 'block' : 'hidden'" :style="{background: primaryColor}" class="side-nav__content fixed inset-y-0 left-0 z-20 overflow-auto xl:static xl:flex xl:overflow-visible">
                    <div class="flex items-center px-3 pt-1.5 pb-2 xl:py-1.5 xl:mx-3.5">
                        <span @click="isOpenSideNav = !isOpenSideNav" class="mr-9 cursor-pointer xl:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </span>
                        <a href="/tongQuan" @click="isOpenSideNav = false">
                            <img class="h-7 cursor-pointer relative top-px" src="../assets/images/logo-open24.png" alt="open24 logo">
                        </a>
                    </div>

                    <div class=" px-1 pb-1 xl:p-0">     
                        <router-link @click="isOpenSideNav = false" to="/tongQuan" class="flex items-center h-9 my-0.5 xl:h-full xl:my-0 xl:hover:bg-black xl:hover:bg-opacity-30 xl:px-2">
                            <span class="flex items-center mb-px"><i class="fas fa-laptop text-base w-8 text-center mx-1 xl:w-6 xl:ml-0"></i>Tổng Quan</span>
                        </router-link>
                    </div>

                    <div class=" px-1 pb-1 xl:p-0">     
                        <router-link @click="isOpenSideNav = false" to="/banLamViec" class="flex items-center h-9 my-0.5 xl:h-full xl:my-0 xl:hover:bg-black xl:hover:bg-opacity-30 xl:px-2">
                            <span class="flex items-center mb-px"><i class="fas fa-car text-lg w-8 text-center mx-1 xl:w-6 xl:ml-0"></i>Bàn làm việc</span>
                        </router-link>
                    </div>

                    <div class="nav-item px-1 pb-1 xl:p-0 xl:relative group" v-for="(navbarItem, index) in navbarItems" :key="index">      
                        <div @click="collapseNav($event)" class="nav-item__label flex items-center justify-between h-9 my-0.5 pr-1.5 rounded cursor-pointer xl:group-hover:bg-black xl:group-hover:bg-opacity-30 xl:h-full xl:my-0 xl:rounded-none xl:px-2">
                            <span class="flex items-center mb-px"><i class="w-8 text-center mx-1 xl:hidden" :class="navbarItem.symbolIcon"></i>{{ navbarItem.name }}</span>
                            <i class="fas fa-angle-down pl-1 pt-0.5"></i>
                        </div>
                        <div :style="{background: primaryColor}" class="nav-item__list hidden xl:group-hover:block xl:absolute xl:left-0 xl:top-full xl:w-48 xl:rounded-b xl:shadow-separate">
                            <router-link @click="isOpenSideNav = false, closeNavActivation()" :to="navItem.url" class="flex items-center px-6 py-1 xl:px-1.5 xl:hover:bg-black xl:hover:bg-opacity-20" v-for="(navItem, index) in navbarItem.navList" :key="index">
                                <i class="text-base w-6 text-center mr-1" :class="navItem.icon"></i> <span class="xl:mb-px">{{ navItem.text }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="fixed inset-0 z-10 bg-black bg-opacity-60"  v-if="isOpenSideNav" @click="isOpenSideNav = false"></div>
            </div>
            <div class="flex relative">
                <Listbox as="div" v-model="selectedBranch" class="relative h-10 flex items-center">
                    <ListboxButton as="div" class="flex items-center px-2 cursor-pointer">
                        <i class="fas fa-map-marker-alt text-lg pr-1"></i> <span>{{ selectedBranch.name }}</span>
                    </ListboxButton>
                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute top-full right-0 w-56 p-1 bg-white text-gray-600 shadow-md focus:outline-none border border-solid border-gray-400 rounded-b">
                            <div class="relative mb-1">
                                <input type="text" v-model="branchInput" class="w-full py-1.5 pl-3 pr-5 rounded border border-solid border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 shadow-sm" placeholder="Tìm kiếm chi nhánh">
                                <span class="absolute top-1/2 transform -translate-y-2/4 right-3">
                                    <i class="fas fa-search text-base"></i>
                                </span>
                            </div>
                            <ListboxOption as="template" v-for="branch in branchFilter" :key="branch.id" :value="branch" v-slot="{ active, selected }">
                                <li :class="[active ? 'bg-blue-100 text-gray-900' : '', selected ? 'font-semibold' : '']" class="relative p-1.5 rounded-sm cursor-default select-none" :data-branch="branch.name">
                                    {{ branch.name }}
                                    <span v-if="selected" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                                        <i class="fas fa-check text-blue-600" aria-hidden="true" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </Listbox>
                <div class="h-10 flex items-center">
                    <div class="px-2 cursor-pointer" @click="isOpenNotify = !isOpenNotify">
                        <i class="fas fa-bell text-lg"></i>
                    </div>
                    <div v-if="isOpenNotify" class="fixed inset-0 z-10" @click="isOpenNotify = false"></div>
                    <div v-show="isOpenNotify" class="navbar__notify absolute top-full right-0 z-20 bg-white text-333 w-96 px-2.5 border-l border-solid border-gray-400 border-opacity-50">
                        <div class="flex items-center justify-between border-b border-solid border-gray-400 border-opacity-50 pt-0.5">
                            <h6 class="font-bold px-2">Thông báo</h6>
                            <div class="flex items-center relative">
                                <span class="text-blue-800 cursor-pointer">Đánh dấu dã đọc</span><i class="fas fa-cog px-2 pt-2 pb-1 cursor-pointer text-base text-blue-800" @click="isOpenSettingNotify = !isOpenSettingNotify"></i>
                                <div v-if="isOpenSettingNotify" class="fixed inset-0 z-10" @click="isOpenSettingNotify = false"></div>
                                <div v-show="isOpenSettingNotify" class="absolute z-20 top-full right-0 border border-solid border-blue-800 rounded-sm py-1 px-3 w-40 bg-white ">
                                    <div class="flex items-center py-1">
                                        <input type="checkbox" id="checkbox-ton-kho" class="w-4 h-4 mr-1.5">
                                        <label class="cursor-pointer" for="checkbox-ton-kho">Tồn kho</label>
                                    </div>
                                    <div class="flex items-center py-1">
                                        <input type="checkbox" id="checkbox-dieu-chuyen" class="w-4 h-4 mr-1.5">
                                        <label class="cursor-pointer" for="checkbox-dieu-chuyen">Điều chuyển</label>
                                    </div>
                                    <div class="flex items-center py-1">
                                        <input type="checkbox" id="checkbox-lo-hang" class="w-4 h-4 mr-1.5">
                                        <label class="cursor-pointer" for="checkbox-lo-hang">Lô hàng</label>
                                    </div>
                                    <div class="flex items-center py-1">
                                        <input type="checkbox" id="checkbox-sinh-nhat" class="w-4 h-4 mr-1.5">
                                        <label class="cursor-pointer" for="checkbox-sinh-nhat">Sinh nhật</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6 class="text-center py-2">Không có thông báo</h6>
                        </div>
                    </div>
                </div>
                <Menu as="div" class="hidden xl:flex relative h-10 items-center">
                    <MenuButton as="div" class="px-2 cursor-pointer">
                        <i class="fas fa-question-circle text-lg"></i>
                    </MenuButton>
                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <MenuItems :style="{background: primaryColor}" class="absolute z-20 top-full right-0 w-56 p-1 text-sm shadow-separate focus:outline-none">
                        <div class="py-1">
                        <MenuItem v-slot="{ active }">
                            <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center px-2.5 py-1.5 rounded">
                                <img class="w-4 h-4 mr-2" src="../assets/images/teamview.png" alt=""> <span>Tải Teamviewer</span>
                            </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center px-2.5 py-1.5 rounded">
                                <img class="w-4 h-4 mr-2" src="../assets/images/ultraviewer.png" alt=""> <span>Tải Ultraviewer</span>
                            </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center px-2.5 py-1.5 rounded">
                                <img class="w-4 h-4 mr-2" src="../assets/images/huong-dan-su-dung.png" alt=""> <span>Hướng dẫn sử dụng</span>
                            </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a @click="isOpenDeleteData = true" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center px-2.5 py-1.5 rounded select-none cursor-pointer">
                                <img class="w-4 h-4 mr-2" src="../assets/images/xoa-du-lieu.png" alt=""> <span>Xóa dữ liệu hệ thống</span>
                            </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center px-2.5 py-1.5 rounded">
                                <img class="w-4 h-4 mr-2" src="../assets/images/tao-shortcut.png" alt=""> <span>Tạo shortcut in nhanh</span>
                            </a>
                        </MenuItem>
                        </div>
                    </MenuItems>
                    </transition>
                </Menu>
                <div v-if="isOpenDeleteData">
                    <div class="fixed inset-0 bg-black opacity-30" />
                    <div class="fixed inset-0 z-10 flex items-start justify-center">
                        <div class="modal-width mt-16 rounded bg-white">
                            <div :style="{background: primaryColor}" class="flex items-center justify-between text-white text-lg pl-4">
                                <h2 class="font-medium">Xóa dữ liệu hệ thống</h2>
                                <span class="px-4 py-1.5 cursor-pointer" @click="isOpenDeleteData = false"><i class="fas fa-times"></i></span>
                            </div>
                            <div class="px-4 pt-5 pb-3 font-medium text-sm text-333">
                                <div class="relative flex">
                                    <label class="w-32">Mật khẩu</label>
                                    <input type="text" class="flex-cover px-2 py-1 border border-solid border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm">
                                    <i class="fas fa-info-circle absolute top-1/2 transform -translate-y-1/2 right-0 pr-2" title="Mật khẩu đăng nhập phần mềm"></i>
                                </div>
                                <label class="flex items-center py-0.5 mt-2.5">
                                    <input type="checkbox" name="" id="" class="mr-2 h-4 w-4"> Giữ lại danh mục Hàng hóa
                                </label>
                                <label class="flex items-center py-0.5">
                                    <input type="checkbox" name="" id="" class="mr-2 h-4 w-4"> Giữ lại danh mục Khách hàng
                                </label>
                            </div>
                            <div class="p-4 text-right">
                                <button @click="isOpenDeleteData = false" class="bg-red-500 hover:bg-red-400 text-white text-sm px-2 py-2 rounded mr-2.5"><i class="fas fa-ban mr-0.5"></i> Hủy bỏ</button>
                                <button @click="isOpenDeleteData = false" class="bg-blue-500 hover:bg-blue-400 text-white text-sm px-2 rounded py-2"><i class="far fa-check-square mr-0.5"></i> Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu as="div" class="relative h-10 flex items-center">
                    <MenuButton as="div" class="px-3 cursor-pointer">
                        <img class="rounded-full w-7 h-7" src="../assets/images/men-user.png" alt="">
                    </MenuButton>
                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <MenuItems :style="{background: primaryColor}" class="absolute top-full right-0 shadow-separate w-56 px-2 py-0.5 focus:outline-none">
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded border-b border-dotted border-gray-100">
                                    <i class="fas fa-user text-base w-5 text-center mr-2"></i> Test
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded">
                                    <i class="fas fa-store-alt text-base w-5 text-center mr-2"></i> Cài đặt cửa hàng
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded">
                                    <i class="fas fa-map-marker-alt text-base w-5 text-center mr-2"></i> Cài đặt sơ đồ
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded">
                                    <i class="fas fa-print text-base w-5 text-center mr-2"></i> Cài đặt mẫu in
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded">
                                    <i class="fas fa-user-cog text-base w-5 text-center mr-2"></i> Cài đặt hoa hồng
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded">
                                    <i class="fas fa-gift text-base w-5 text-center mr-2"></i> Cài đặt khuyến mại
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded">
                                    <i class="fas fa-bookmark text-base w-5 text-center mr-2"></i> Nhập ký sử dụng
                                </a>
                            </MenuItem>
                            <a href="javascript:void(0)" class="group relative flex items-center py-1.5 px-1.5 rounded border-b border-dotted border-gray-100 xl:hidden">
                                <i class="fas fa-palette text-base w-5 text-center mr-2"></i> Chủ đề
                                <ul :style="{background: primaryColor}" class="hidden absolute top-0 right-full w-44 p-2 group-hover:grid grid-cols-3 gap-2 shadow-separate rounded sm:w-60 sm:grid-cols-4 sm:gap-2.5 sm:p-2.5">
                                    <li class="w-12 h-12 border border-solid border-gray-100 hover:outline-highlight" v-for="theme in themes" :key="theme.name" :data-theme="theme.name" :style="{background: theme.primaryColor}" @click.stop="changeTheme($event)"></li>
                                </ul>
                            </a>
                            <MenuItem v-slot="{ active }">
                                <a href="javascript:void(0)" :class="active ? 'bg-black bg-opacity-30' : ''" class="hidden group relative py-1.5 px-1.5 rounded border-b border-dotted border-gray-100 xl:flex xl:items-center">
                                    <i class="fas fa-palette text-base w-5 text-center mr-2"></i> Chủ đề
                                    <ul :class="active ? 'grid' : 'hidden'" :style="{background: primaryColor}" class="absolute top-0 right-full w-44 p-2 grid-cols-3 gap-2 shadow-separate rounded sm:w-60 sm:grid-cols-4 sm:gap-2.5 sm:p-2.5 xl:group-hover:grid">
                                        <li class="w-12 h-12 border border-solid border-gray-100 hover:outline-highlight" v-for="theme in themes" :key="theme.name" :data-theme="theme.name" :style="{background: theme.primaryColor}" @click.stop="changeTheme($event)"></li>
                                    </ul>
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="" :class="active ? 'bg-black bg-opacity-30' : ''" class="flex items-center py-1.5 px-1.5 rounded">
                                    <i class="fas fa-sign-out-alt text-base w-5 text-center mr-2"></i> Đăng xuất
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </nav>
</template>

<script>
    import { ref, reactive, toRefs, watch, onMounted, computed } from 'vue';
    import * as Device from '../mixins/checkDevices';
    import { navbarItems } from '../mixins/navbarItems';
    import { themes } from '../mixins/themes';
    import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
    export default {
        name: "Header",
        components: {
            Listbox, ListboxButton, ListboxOptions, ListboxOption,
            Menu, MenuButton, MenuItem, MenuItems,
        },
        setup() {
            let branches = [
                { id: 1, name: 'Ssoft Cầu giấy'},
                { id: 2, name: 'Chi nhánh 02'},
                { id: 3, name: 'Chi nhánh 03'},
                { id: 4, name: 'Chi nhánh 04'},
                { id: 5, name: 'Chi nhánh 05'},
            ];

            const branchInput = ref('');
            const branchFilter = ref(branches);
            const primaryTheme = reactive(JSON.parse(localStorage.getItem('primaryTheme')));

            const showStates = reactive({
                isOpenSideNav: false,
                isOpenNotify: false,
                isOpenSettingNotify: false,
                isOpenDeleteData: false,
            })

            const selectedBranch = ref(branches[0]);

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

            function changeTheme(event) {
                const selectedTheme = event.currentTarget.dataset.theme;
                const theme = themes.find(theme => theme.name === selectedTheme);
                primaryTheme.primaryColor = theme.primaryColor;
                primaryTheme.secondaryColor = theme.secondaryColor;
                localStorage.setItem('primaryTheme', JSON.stringify(theme));
            }

            watch(branchInput, (newValue, oldValue) => {
                if(newValue.length === 0) {
                    branchFilter.value = branches;
                    return;
                }
                branchFilter.value = branches.filter(branch => {
                    return branch.name.toUpperCase().includes(newValue.toUpperCase());
                })
            })

            return {
                ...toRefs(primaryTheme),
                navbarItems,
                themes,
                ...toRefs(showStates),
                collapseNav,
                closeNavActivation,
                changeTheme,
                branchFilter,
                selectedBranch,
                branchInput,
            }
        }
    }
</script>

<style scoped>
    .side-nav__content {
        width: 230px;
        box-shadow: 1px 1px 3px rgb(0 0 0 / 15%);
    }
    .side-nav__content::-webkit-scrollbar {
        width: 6px;
    }
    .side-nav__content::-webkit-scrollbar-thumb {
    background: #1cabfd; 
    border-radius: 10px;
    }

    .modal-width {
        width: 600px;
    }

    .nav-item.active .nav-item__label {
        background: rgba(0, 0, 0, 0.3);
    }

    .navbar__notify {
        height: calc(100vh - 40px);
    }

    @media screen and (min-width: 1280px) {
        .side-nav__content {
            width: 100%;
            box-shadow: none;
        }
    }
</style>