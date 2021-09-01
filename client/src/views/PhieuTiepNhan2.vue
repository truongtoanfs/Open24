<template>
    <layout-main>
        <template #sidebar>
            <sidebar-item-chi-nhanh />
            <sidebar-item-date headerTitle="Ngày tiếp nhận">
                <i class="fas fa-icon"></i>
            </sidebar-item-date>
            <sidebar-item-date headerTitle="Ngày ra dự kiến">
                <i class="fas fa-icon"></i>
            </sidebar-item-date>
            <sidebar-item-date headerTitle="Ngày ra xuất xưởng">
                <i class="fas fa-icon"></i>
            </sidebar-item-date>
            <sidebar-item-trang-thai>
                <base-checkbox label="Đang sửa" />
                <base-checkbox label="Hoàn thành" />
                <base-checkbox label="Đã xuất xưởng" />
                <base-checkbox label="Hủy" />
            </sidebar-item-trang-thai>
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
            <base-search-box contentSearch="Theo mã, tên, biển số, số điện thoại" />
        </template>
        
        <template #main-table>
            <table-phieu-tiep-nhan></table-phieu-tiep-nhan>
        </template>
    </layout-main>
</template>

<script>
import 'LayoutMain' from '../components/LayoutMain.vue';
import 'SidebarItemChiNhanh' from '../components/sidebar/SidebarItemChiNhanh.vue';
import 'SidebarItemDate' from '../components/sidebar/SidebarItemDate.vue';
import 'SidebarItemTrangThai' from '../components/sidebar/SidebarItemTrangThai.vue';
import 'BaseCheckbox' from '../components/BaseCheckbox.vue';
import 'PageTitle' from '../components/PageTitle.vue';
import 'ButtonAddNew' from '../components/buttons/ButtonAddNew.vue';
import 'ButtonExport' from '../components/buttons/ButtonExport.vue';
import 'ButtonControlColumn' from '../components/buttons/ButtonControlColumn.vue';
import 'BaseSerchBox' from '../components/base/BaseSearchBox.vue';
import 'TablePhieuTiepNhan' from '../components/tables/TablePhieuTiepNhan.vue';

export default {
    components: {
        LayoutMain,
        SidebarItemChiNhanh,
        SidebarItemDate,
        SidebarItemTrangThai,
        BaseCheckbox,
        PageTitle,
        ButtonAddNew,
        ButtonExport,
        ButtonControlColumn,
        TablePhieuTiepNhan,
    },
}
</script>