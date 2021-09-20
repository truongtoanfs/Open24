<template>
    <layout-main>
        <template #sidebar="{ isCollapseAll }">
            <sidebar-item-multi-select headerText="Chi nhánh" searchLabel="Tìm kiếm chi nhánh" :isCollapseAll="isCollapseAll" :filterData="chiNhanhList" keywordFilter="TenDonVi" >
                <template #header-icon><i class="fab fa-fort-awesome"></i></template>
            </sidebar-item-multi-select>
            <sidebar-item-checkbox class="mb-0.5" headerText="Trạng thái" :isCollapseAll="isCollapseAll">
                <template #header-icon>
                    <i class="far fa-stop-circle"></i>
                </template>
                <template #content>
                    <base-checkbox label="Đang sửa" class="pt-2" />
                    <base-checkbox label="Hoàn thành" class="pt-2" />
                    <base-checkbox label="Đã xuất xưởng" class="pt-2" />
                    <base-checkbox label="Hủy" class="pt-2 pb-1" />
                </template>
            </sidebar-item-checkbox>
        </template>

        <template #page-title>
            <page-title titleText="Danh sách phiếu tiếp nhận" />
        </template>

        <template #control-buttons-group>
            <button-add-new />
            <button-export />
            <button-control-column />
        </template>

        <template #table-search>
            <base-search-box class="w-full max-w-xs md:w-80" contentSearch="Theo mã, tên, biển số, số điện thoại ..." />
        </template>
        
        <template #main-table>
            <table-phieu-tiep-nhan></table-phieu-tiep-nhan>
        </template>
    </layout-main>
</template>

<script>
import LayoutMain from '../../layout/LayoutMain.vue';
import SidebarItemMultiSelect from '../../components/sidebar/SidebarItemMultiSelect.vue';
import SidebarItemCheckbox from '../../components/sidebar/SidebarItemCheckbox.vue';
import BaseCheckbox from '../../components/base/BaseCheckbox.vue';
import PageTitle from '../../components/PageTitle.vue';
import ButtonAddNew from '../../components/buttons/ButtonAddNew.vue';
import ButtonExport from '../../components/buttons/ButtonExport.vue';
import ButtonControlColumn from '../../components/buttons/ButtonControlColumn.vue';
import BaseSearchBox from '../../components/base/BaseSearchBox.vue';

import TablePhieuTiepNhan from '../../components/tables/TablePhieuTiepNhan.vue';
import { GetListDonVi_User } from '../../data';

export default {
    components: {
        LayoutMain,
        SidebarItemMultiSelect,
        SidebarItemCheckbox,
        BaseCheckbox,
        PageTitle,
        ButtonAddNew,
        ButtonExport,
        ButtonControlColumn,
        BaseSearchBox,
        TablePhieuTiepNhan,
    },
    setup() {
        const chiNhanhList = GetListDonVi_User;

        return {
            chiNhanhList,
        }
    }
}
</script>