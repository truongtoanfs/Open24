# setup
    cd client
    npm run dev

# Cách làm
    + Những chỗ bị lặp lại ở nhiều nơi e sẽ tách thành componenent rồi đặt vào folder tương ứng theo chức năng
# Phần hoàn thành: toàn bộ trang Danh Sách Xe
# Những chỗ chưa làm trong trang Danh sách xe:
    + 2 modal trong lịch sử sửa chữa
    + Ô ngày sinh trong modal Thêm mới khác hàng
    + Ô search bảng
    + Nút xuất file
    + Phần pagination của bảng cái này mỗi khi bấm nút chuyển trang hoặc chọn số bản ghi hiển thị nó lấy dữ từ api cập nhật nên nó chưa hoạt động
    + Phần hiển thị hình ảnh trang các modal cập nhật: link url nó sai nên tạm thời chưa hiển thị được

# Cấu trúc folder
+ api: chứa các setup api để giao tiếp vs server
+ assets: chứa font và images
+ components:
    * Folder base: chứa các component cơ sở để tạo ra các component khác
    * Các folder còn lại: chứa các component theo loại
    * Những chỗ nào chưa biết đặt đâu thì tạm thời e để ở ngoài
+ composables: Chứa các hàm để import vào trong component
+ constants: Chứa các hằng số
+ data: Tạm thời chứa dữ liệu thay cho api
+ directive: Chứa các directive custom
+ layout: Các trang layout có dạng bảng thì e sử dụng LayoutMain.vue và thêm nội dung tương ứng vào
+ router : Chứa các router
+ store: sử dụng vueX dùng để chứa các trạng thái global
+ style: Chứa các css global của tailwind.css
+ views: Chứa các component mà khi khớp với các url sẽ hiển thị
(!) Nhiều folder e mới chỉ đặt đấy thôi chứ chưa có nội dung



