# Sử dụng vue-x để quản lý dữ liệu cho toàn bộ app
+ Chia nhỏ dữ liệu thành các module sau đó import vào file index
+ Cách s/d vueX
    1. The component dispatches Actions
    2. Actions commit Mutations.
    3. Mutations mutate the Module State.
    4. Getters get changed after watched values on the state have changed.
    A component reads the State and Getters as computed values (read-only).