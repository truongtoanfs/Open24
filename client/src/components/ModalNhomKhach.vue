<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md" class="z-20">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <div class="font-normal px-2">
                <span @click="activeTab = 'infoTab'" :class="activeTab === 'infoTab' ? 'text-open24-main border-open24-main border-solid' : ''" class="inline-block py-2 px-3 border-b-2 border-transparent">Thông tin nhóm</span>
                <span @click="activeTab = 'conditionTab'" :class="activeTab === 'conditionTab' ? 'text-open24-main border-open24-main border-solid' : ''" class="inline-block py-2 px-3 border-b-2 border-transparent">Điều kiện nâng nhóm</span>
            </div>
            <div v-if="activeTab === 'infoTab'" class="pt-6 border-t border-gray-300">
                <BaseInputGroup label="Tên nhóm" required class="mb-2" />
                <BaseInputGroupToggle label="giảm giá" class="mb-2" />
                <div class="flex mb-2">
                    <label class="form-group__label">Chi nhánh</label>
                    <div v-click-outside="closeDropdown" class="relative flex-cover">
                        <div ref="brachesOutput" @click.stop="isOpenBranchList = !isOpenBranchList" class="w-full min-h-8 leading-6 font-13 font-normal border border-solid border-gray-300 rounded">
                            <ul class="flex flex-wrap items-center h-full">
                                <li v-if="selectedBranchesList.length === 0" class="bg-gray-200 h-full leading-7 mx-px my-0.5 rounded flex items-center">
                                    <span class="px-4">Tất cả</span>
                                </li>
                                <li v-for="branch in selectedBranchesList" :key="branch.id" class="bg-gray-200 h-full leading-7 mx-px my-0.5 rounded flex items-center">
                                    <span class="pl-2.5">{{ branch.name }}</span>
                                    <span @click.stop="updateBranch(branch.id)" class="px-2.5 hover:text-red-500"><i class="fas fa-times"></i></span>
                                </li>
                            </ul>
                        </div>
                        <div v-if="isOpenBranchList" class="absolute z-20 py-1 px-2 w-full max-h-56 overflow-auto rounded-md bg-white shadow-lg text-sm font-normal">
                            <div class="relative border-b border-solid border-gray-300 mt-0.5">
                                <span class="absolute inset-y-0 left-0 flex items-center text-sm"><i class="fas fa-search text-gray-700"></i></span>
                                <input placeholder="Tìm kiếm chi nhánh" v-model="brachFilterInput" type="text" class="w-full h-8 pl-6 border-0 focus:outline-none placeholder-gray-500">
                            </div>
                            <button @click="selectAllBranch(), brachFilterInput = ''" class="px-3 py-1 rounded border-b border-solid border-gray-200 hover:bg-gray-200">TẤT CẢ</button>
                            <ul class="max-h-36 overflow-y-auto divide-y divide-gray-300">
                                <li v-for="branch in branchFilterList" :key="branch.id" @click="updateBranch(branch.id), brachFilterInput = ''" class="relative py-1.5 px-2 cursor-default select-none hover:bg-gray-200 rounded-sm">
                                    <span>
                                        {{ branch.name }}
                                    </span>
                                    <span v-if="selectedBranchesIndexList.includes(branch.id)" class="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <i class="fas fa-check text-blue-600" />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <BaseTextareaGroup label="Ghi chú" />
            </div>
            <div v-else class="pt-6 border-t border-gray-300">
                <p class="mb-4">Điều kiện khách hàng nâng nhóm:</p>
                <template v-for="(conditionElm, elmIndex) in numberOfConditionElms" :key="elmIndex">
                    <div class="flex flex-wrap items-center mb-1 border-b border-gray-200 sm:border-b-0">
                        <BaseSelectBox :selectList="nangNhomConditionList" class="mr-3 min-w-max" />
                        <BaseSelectBox inputWidth="w-24" :selectList="comparisonOperatorList" class="my-1 mr-3" />
                        <input type="text" class="input w-1/3 my-1 mr-1" value="0">
                        <span @click="removeConditionELm(elmIndex)" class="text-red-500 px-3 py-1.5 cursor-pointer hover:bg-gray-200 rounded">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                </template>
                <ButtonAddNew @click="addConditionELm()" text="Thêm điều kiện" class="mt-1" />
                <div class="font-normal leading-6 mt-3 px-2 bg-gray-200 xl:px-0.5">
                    <div class="py-3 border-b border-gray-300 xl:flex xl:items-start">
                        <p class="pl-0.5 mr-2.5 xl:whitespace-nowrap">Cập nhật lại danh sách khách hàng theo điều kiện trên:</p>
                        <div class="flex items-center">
                            <label class="flex items-center mr-3.5">
                                <input type="radio" name="updateWithCondition" class="mr-1">
                                <span>Có</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="updateWithCondition" class="mr-1">
                                <span>Không</span>
                            </label>
                        </div>
                    </div>
                    <div class="py-3 xl:flex xl:items-start">
                        <p class="pl-0.5 mr-2.5 xl:whitespace-nowrap">Hệ thống tự động cập nhật khách hàng khi thêm mới (nếu đủ điều kiện):</p>
                        <div class="flex items-center">
                            <label class="flex items-center mr-3.5">
                                <input type="radio" name="autoUpdate" class="mr-1">
                                <span>Có</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="autoUpdate" class="mr-1">
                                <span>Không</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import { ref, computed, watch } from 'vue';
    import  { useStore } from 'vuex';
    import removeAccents from '../composables/useRemoveAccents';
    import useNumberLocal from '../composables/useNumberToLocalString';
    import BaseModal from './BaseModal.vue';
    import BaseInputGroup from './BaseInputGroup.vue';
    import BaseInputGroupToggle from './BaseInputGroupToggle.vue';
    import BaseTextareaGroup from './BaseTextareaGroup.vue';
    import BaseSelectBox from './BaseSelectBox.vue';
    import ButtonAddNew from './ButtonAddNew.vue';

    export default {
        components: {
            BaseModal,
            BaseInputGroup,
            BaseInputGroupToggle,
            BaseTextareaGroup,
            BaseSelectBox,
            ButtonAddNew,
        },
        props: {
            modalTitle: String, 
        },

        emits: ["closeModal"],
        setup() {
            const activeTab = ref('infoTab');
            const isOpenBranchList = ref(false);
            const store = useStore();
            const branches = computed(() => store.state.branches);
            const branchFilterList = ref(branches.value);
            const selectedBranchesList = ref([]);
            const selectedBranchesIndexList = ref([]);

            const brachFilterInput = ref('');

            watch(brachFilterInput, (newValue, oldValue) => {
                if(newValue.length === 0) {
                    branchFilterList.value = branches.value;
                } else {
                    branchFilterList.value = branches.value.filter(branch => {
                        const branchNameNoAccents = removeAccents(branch.name);
                        const inputNoAccents = removeAccents(newValue);
                        return branchNameNoAccents.toUpperCase().includes(inputNoAccents.toUpperCase());
                    })
                }
            })
            
            function updateBranch(branchIndex) {
                const indexInSelectedList = selectedBranchesIndexList.value.indexOf(branchIndex);
                
                if(indexInSelectedList === -1) {
                    selectedBranchesIndexList.value.push(branchIndex);
                    selectedBranchesList.value.push(branches.value[branchIndex]);
                } else {
                    selectedBranchesIndexList.value.splice(indexInSelectedList, 1);
                    selectedBranchesList.value.splice(indexInSelectedList, 1);
                }
            }
            
            function selectAllBranch() {
                selectedBranchesIndexList.value = [];
                selectedBranchesList.value = [];
            }

            function closeBranchList() {
                isOpenBranchList.value = false;
            }

            const nangNhomConditionList = ['Tổng mua (trừ trả hàng)', 'Tổng mua', 'Thời gian mua hàng', 'Số lần mua hàng', 'Công nợ hiện tại', 'Tháng sinh'];
            const comparisonOperatorList = ['>', '>=', '=', '<=', '<', 'Khác'];
            const numberOfConditionElms = ref([0]);//khởi tạo vs 1 phần tử có chỉ số 0
            function addConditionELm() {
                const elmIndex = numberOfConditionElms.value.length;
                numberOfConditionElms.value.push(elmIndex);
            }
            function removeConditionELm(elmIndex) {
                numberOfConditionElms.value.splice(elmIndex, 1);
            }
            return {
                activeTab,
                isOpenBranchList,
                branchFilterList,
                selectedBranchesList,
                selectedBranchesIndexList,
                updateBranch,
                selectAllBranch,
                brachFilterInput,
                closeBranchList,
                nangNhomConditionList,
                comparisonOperatorList,
                numberOfConditionElms,
                addConditionELm,
                removeConditionELm
            }
        }
    }
</script>

<style>
    .min-h-8 {
        min-height: 32px;
    }
</style>